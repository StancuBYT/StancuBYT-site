const { onRequest } = require("firebase-functions/v2/https");

exports.etherscanProxy = onRequest(async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(204).send("");

    const apiKey = process.env.ETHERSCAN_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing ETHERSCAN_API_KEY secret" });

    const module = String(req.query.module || "").trim();
    const action = String(req.query.action || "").trim();
    const contractaddress = String(req.query.contractaddress || "").trim();

    if (!module || !action) return res.status(400).json({ error: "Missing module/action" });

    const allow = new Set([
      "stats:tokensupply",
      "stats:tokenholderlist",
      "stats:tokentx",
      "stats:ethprice"
    ]);

    const key = `${module}:${action}`;
    if (!allow.has(key)) return res.status(403).json({ error: `Action not allowed: ${key}` });

    const needsContract = new Set([
      "stats:tokensupply",
      "stats:tokenholderlist",
      "stats:tokentx"
    ]);

    if (needsContract.has(key) && !contractaddress) {
      return res.status(400).json({ error: "Missing contractaddress" });
    }

    const params = new URLSearchParams();
    params.set("module", module);
    params.set("action", action);
    if (needsContract.has(key)) params.set("contractaddress", contractaddress);

    for (const k of ["page", "offset", "sort"]) {
      if (req.query[k]) params.set(k, String(req.query[k]));
    }

    params.set("apikey", apiKey);

    const url = `https://api.etherscan.io/api?${params.toString()}`;
    const r = await fetch(url);
    const txt = await r.text();

    return res.status(200).type("application/json").send(txt);
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
});


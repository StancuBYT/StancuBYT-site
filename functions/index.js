const { onRequest } = require("firebase-functions/v2/https");

exports.etherscanProxy = onRequest(async (req, res) => {
  try {
    // CORS (pentru GitHub Pages / domeniu)
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    const apiKey = process.env.ETHERSCAN_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Missing ETHERSCAN_API_KEY secret" });
      return;
    }

    const module = String(req.query.module || "").trim();
    const action = String(req.query.action || "").trim();
    const contractaddress = String(req.query.contractaddress || "").trim();

    if (!module || !action) {
      res.status(400).json({ error: "Missing module/action" });
      return;
    }

    // allowlist (doar ce ai nevoie)
    const allow = new Set([
      "stats:tokesupply", // typo protection (optional)
      "stats:tokensupply",
      "stats:tokenholderlist",
      "stats:tokentx",
      "stats:ethprice"
    ]);

    const key = `${module}:${action}`;
    if (!allow.has(key)) {
      res.status(403).json({ error: `Action not allowed: ${key}` });
      return;
    }

    // doar unele actiuni cer contractaddress
    const needsContract = new Set([
      "stats:tokensupply",
      "stats:tokenholderlist",
      "stats:tokentx"
    ]);

    // accept si typo protection
    const normalizedAction = (action === "tokesupply") ? "tokensupply" : action;
    const normalizedKey = `${module}:${normalizedAction}`;

    if (needsContract.has(normalizedKey) && !contractaddress) {
      res.status(400).json({ error: "Missing contractaddress" });
      return;
    }

    const params = new URLSearchParams();
    params.set("module", module);
    params.set("action", normalizedAction);

    if (needsContract.has(normalizedKey)) {
      params.set("contractaddress", contractaddress);
    }

    // optional passthrough (page/offset/sort)
    for (const k of ["page", "offset", "sort"]) {
      if (req.query[k]) params.set(k, String(req.query[k]));
    }

    params.set("apikey", apiKey);

    const url = `https://api.etherscan.io/api?${params.toString()}`;
    const r = await fetch(url);
    const txt = await r.text();

    res.status(200).type("application/json").send(txt);
  } catch (e) {
    res.status(500).json({ error: String(e?.message || e) });
  }
});


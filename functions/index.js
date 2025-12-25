/**
 * Firebase Cloud Function: etherscanProxy
 * - ascunde API key-ul Etherscan (nu apare in index.html)
 * - suport GET cu query: module, action, contractaddress, address, etc.
 *
 * Runtime: Node 20
 */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Optional: foloseste functions config (firebase functions:config:set etherscan.key="...").
// Sau environment variable: ETHERSCAN_API_KEY / ETHERSCAN_KEY
let functionsConfigKey = null;
try {
  const functions = require("firebase-functions");
  functionsConfigKey = functions.config()?.etherscan?.key || null;
} catch (e) {}

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || process.env.ETHERSCAN_KEY || functionsConfigKey || "";

function setCors(res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
}

exports.etherscanProxy = onRequest(async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).send("");

  try {
    const url = new URL("https://api.etherscan.io/api");

    for (const [k, v] of Object.entries(req.query || {})) {
      if (typeof v === "undefined") continue;
      const val = Array.isArray(v) ? v[0] : v;
      url.searchParams.set(k, String(val));
    }

    if (!url.searchParams.get("apikey")) {
      if (!ETHERSCAN_API_KEY) {
        return res.status(500).json({
          status: "0",
          message: "Missing ETHERSCAN_API_KEY in Cloud Function env/config",
          result: ""
        });
      }
      url.searchParams.set("apikey", ETHERSCAN_API_KEY);
    }

    const r = await fetch(url.toString(), { method: "GET" });
    const text = await r.text();

    res.status(r.status).set("Content-Type", "application/json").send(text);
  } catch (e) {
    logger.error("etherscanProxy error", e);
    res.status(500).json({ status: "0", message: "Proxy error", result: String(e?.message || e) });
  }
});

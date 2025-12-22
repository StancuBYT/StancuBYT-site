/**
 * Firebase Cloud Function: etherscanProxy
 * - Keeps Etherscan API key server-side (secret)
 * - Simple allowlist for supported endpoints to prevent abuse
 *
 * Deploy (recommended):
 *   firebase functions:secrets:set ETHERSCAN_API_KEY
 *   firebase deploy --only functions
 */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const ETHERSCAN_API_KEY = "ETHERSCAN_API_KEY";
const BASE = "https://api.etherscan.io/api";

function pick(obj, keys){
  const out = {};
  for (const k of keys){
    if (obj[k] !== undefined && obj[k] !== null && String(obj[k]).length){
      out[k] = String(obj[k]);
    }
  }
  return out;
}

function buildUrl(params, apiKey){
  const usp = new URLSearchParams(params);
  if (apiKey) usp.set("apikey", apiKey);
  return BASE + "?" + usp.toString();
}

exports.etherscanProxy = onRequest(
  {
    region: "us-central1",
    cors: true,
    secrets: [ETHERSCAN_API_KEY],
  },
  async (req, res) => {
    try{
      // Basic validation
      const q = req.query || {};
      const module = String(q.module || "");
      const action = String(q.action || "");

      // Allowlist (add more if needed)
      const ALLOW = new Set([
        "stats:tokensupply",
        "token:tokenholderlist",
        "account:tokentx",
      ]);

      const key = `${module}:${action}`;
      if (!ALLOW.has(key)){
        return res.status(400).json({
          status: "0",
          message: "NOT_ALLOWED",
          result: `Endpoint not allowed: ${key}`,
        });
      }

      // Only pass through safe parameters per endpoint
      let params = { module, action };

      if (key === "stats:tokensupply"){
        params = { ...params, ...pick(q, ["contractaddress"]) };
      } else if (key === "token:tokenholderlist"){
        params = { ...params, ...pick(q, ["contractaddress", "page", "offset"]) };
      } else if (key === "account:tokentx"){
        params = { ...params, ...pick(q, ["contractaddress", "address", "page", "offset", "sort", "startblock", "endblock"]) };
      }

      // Require contractaddress for all current endpoints
      if (!params.contractaddress){
        return res.status(400).json({
          status: "0",
          message: "MISSING_PARAM",
          result: "contractaddress is required",
        });
      }

      const apiKey = process.env[ETHERSCAN_API_KEY] || "";
      const url = buildUrl(params, apiKey);

      const upstream = await fetch(url, { method: "GET" });
      const bodyText = await upstream.text();

      res.set("Cache-Control", "no-store");
      res.status(upstream.status);

      // Try JSON; if it fails, return raw
      try{
        const json = JSON.parse(bodyText);
        return res.json(json);
      }catch(e){
        logger.warn("Upstream non-JSON response", { url, status: upstream.status });
        return res.send(bodyText);
      }
    }catch(err){
      logger.error("etherscanProxy error", err);
      return res.status(500).json({ status:"0", message:"SERVER_ERROR", result: String(err?.message || err) });
    }
  }
);

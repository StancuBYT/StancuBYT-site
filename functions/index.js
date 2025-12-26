const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.hitCounter = onRequest(
  { region: "europe-west1" },
  async (req, res) => {
    // CORS simplu (pentru GitHub Pages / domeniu)
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(204).send("");

    try {
      const db = admin.firestore();
      const ref = db.doc("site_meta/visits");

      const snap = await db.runTransaction(async (tx) => {
        const doc = await tx.get(ref);
        const current = doc.exists ? (doc.data().count || 0) : 0;
        const next = current + 1;

        tx.set(ref, { count: next, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
        return next;
      });

      return res.status(200).json({ ok: true, count: snap });
    } catch (e) {
      return res.status(500).json({ ok: false, error: String(e) });
    }
  }
);


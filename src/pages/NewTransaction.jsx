import { useState } from "react";
import { predictFraud } from "../services/api";

export default function NewTransaction({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [client, setClient] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!amount || !client) {
      alert("⚠ Please fill all fields!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // 📡 send to AI backend
      const res = await predictFraud({
        amount: Number(amount),
        client: client,
      });

      const type = res.data.type;
      setResult(type);

      // 📊 رجّع للـ dashboard (ربط data)
      if (onAdd) {
        onAdd({
          id: Date.now(),
          amount: Number(amount),
          client: client,
          type: type,
          date: new Date().toISOString().split("T")[0],
        });
      }

      // 🚨 alert
      if (type === "Fraud") {
        alert("🚨 FRAUD DETECTED!");
      } else {
        alert("✅ Normal Transaction");
      }

      // reset form
      setAmount("");
      setClient("");

    } catch (err) {
      console.error(err);
      alert("❌ Backend error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>💳 New Transaction AI</h2>

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        placeholder="Client"
        value={client}
        onChange={(e) => setClient(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Predict"}
      </button>

      {result && (
        <div style={{ marginTop: 10 }}>
          Result: <b>{result}</b>
        </div>
      )}
    </div>
  );
}
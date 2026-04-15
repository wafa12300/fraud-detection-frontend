import React, { useState } from "react";
import { addTransaction } from "../services/api";

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
      const res = await addTransaction({
        amount: Number(amount),
        client,
      });

      const type = res.data.type;

      setResult(type);

      // 🚀 SEND TO DASHBOARD (IMPORTANT)
      if (onAdd) {
        onAdd({
          id: Date.now(),
          amount: "$" + amount,
          type,
          clientId: Number(client),
          date: new Date().toISOString().split("T")[0],
        });
      }

      // reset form
      setAmount("");
      setClient("");

    } catch (error) {
      alert("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 420px;
          margin: auto;
          padding: 30px;
          background: white;
          border-radius: 18px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
          text-align: center;
          transition: 0.3s;
        }

        .container:hover {
          transform: translateY(-3px);
        }

        h2 {
          margin-bottom: 18px;
          font-size: 22px;
        }

        input {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          outline: none;
          transition: 0.2s;
        }

        input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79,70,229,0.2);
        }

        button {
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border: none;
          border-radius: 10px;
          background: #4f46e5;
          color: white;
          cursor: pointer;
          font-weight: bold;
          transition: 0.2s;
        }

        button:hover {
          background: #4338ca;
        }

        button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .result {
          margin-top: 18px;
          padding: 12px;
          border-radius: 12px;
          font-weight: bold;
          animation: pop 0.3s ease;
        }

        .fraud {
          background: #fee2e2;
          color: #991b1b;
        }

        .normal {
          background: #dcfce7;
          color: #166534;
        }

        @keyframes pop {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="container">

        <h2>💳 AI Fraud Detection</h2>

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          placeholder="Client ID"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Analyzing..." : "Predict Transaction"}
        </button>

        {result && (
          <div className={`result ${result === "Fraud" ? "fraud" : "normal"}`}>
            {result === "Fraud"
              ? "🚨 Fraud Detected!"
              : "✅ Normal Transaction"}
          </div>
        )}

      </div>
    </>
  );
}
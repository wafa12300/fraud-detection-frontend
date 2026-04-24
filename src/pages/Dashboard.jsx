<<<<<<< HEAD
<h1>🚀 FRAUD DASHBOARD TEST</h1>
=======
import React, { useState } from "react";
import { predictFraud } from "../services/api";
import StatCard from "../components/StatCard";
import FraudChart from "../components/FraudChart";

export default function Dashboard() {

  const [form, setForm] = useState({
    amount: "",
    oldbalanceOrg: "",
    newbalanceOrig: "",
    oldbalanceDest: "",
    newbalanceDest: "",
    time: "",
    country_risk: ""
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handlePredict = async () => {
    const res = await predictFraud(form);
    setResult(res);

    setHistory((prev) => [
      ...prev,
      { ...res, time: new Date().toLocaleTimeString() }
    ]);
  };

  const fraudCount = history.filter(h => h.fraud).length;
  const normalCount = history.filter(h => !h.fraud).length;

  return (
    <div style={{ padding: 20 }}>

      <h1>🚀 Fraud Detection Dashboard</h1>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10 }}>
        <StatCard title="Fraud" value={fraudCount} color="red" />
        <StatCard title="Normal" value={normalCount} color="green" />
      </div>

      {/* Form */}
      <div style={{ marginTop: 20 }}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            type="number"
            onChange={handleChange}
            style={{ display: "block", margin: 5 }}
          />
        ))}

        <button onClick={handlePredict}>
          Predict
        </button>
      </div>

      {/* Result */}
      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>
            {result.fraud ? "🔴 FRAUD" : "🟢 NORMAL"}
          </h2>
          <p>Score: {result.fraud_score}</p>
        </div>
      )}

      {/* Chart */}
      <FraudChart data={history} />
    </div>
  );
}
>>>>>>> cc8503a (update)

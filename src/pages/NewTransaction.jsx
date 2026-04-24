import React, { useState } from "react";
import { predictFraud } from "../services/api";

export default function NewTransaction() {

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await predictFraud(form);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert("Error connecting to API");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>💳 New Transaction</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          type="number"
          name={key}
          placeholder={key}
          onChange={handleChange}
        />
      ))}

      <button onClick={handleSubmit}>
        {loading ? "Loading..." : "Check Fraud"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>
            {result.fraud ? "🔴 FRAUD" : "🟢 NORMAL"}
          </h3>
          <p>Score: {result.fraud_score}</p>
        </div>
      )}
    </div>
  );
}
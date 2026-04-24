import React from "react";

export default function FraudChart({ data }) {

  const fraud = data.filter(d => d.fraud).length;
  const normal = data.filter(d => !d.fraud).length;

  return (
    <div style={{ marginTop: 30 }}>
      <h3>📊 Live Stats</h3>

      <p>🔴 Fraud: {fraud}</p>
      <p>🟢 Normal: {normal}</p>
    </div>
  );
}
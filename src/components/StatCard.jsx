import React from "react";

export default function StatCard({ title, value, color }) {
  return (
    <div style={{
      padding: 15,
      background: "#f5f5f5",
      borderRadius: 10,
      width: 120,
      textAlign: "center"
    }}>
      <h3 style={{ color }}>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}
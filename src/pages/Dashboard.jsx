import React, { useState } from "react";

export default function Dashboard() {
  const [testMode] = useState(true);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 FRAUD DASHBOARD TEST</h1>

      <p>Status: {testMode ? "Frontend Connected" : "Offline"}</p>

      <div style={{ marginTop: "20px" }}>
        <h3>📊 System Overview</h3>
        <ul>
          <li>Frontend: React Running</li>
          <li>Backend: API Connected (FastAPI)</li>
          <li>AI Model: Ready</li>
        </ul>
      </div>
    </div>
  );
}
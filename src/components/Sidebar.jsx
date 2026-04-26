export default function Sidebar({
  active,
  setActive,
  logout,
  darkMode,
  setDarkMode,
  fraudCount = 0,
  totalTransactions = 0
}) {
  return (
    <>
      <style>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: linear-gradient(180deg, #0f172a, #1e293b);
          color: white;
          display: flex;
          flex-direction: column;
          padding: 20px;
        }

        .item {
          padding: 10px;
          cursor: pointer;
          border-radius: 8px;
        }

        .item:hover {
          background: rgba(255,255,255,0.08);
        }

        .active {
          background: #4f46e5;
        }

        .box {
          margin-top: 20px;
          padding: 12px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }

        .logout {
          margin-top: auto;
          padding: 10px;
          background: red;
          border: none;
          color: white;
          border-radius: 10px;
          cursor: pointer;
        }

        .darkBtn {
          margin-top: 15px;
          padding: 10px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          background: ${darkMode ? "#fbbf24" : "#1f2937"};
          color: white;
        }
      `}</style>

      <div className="sidebar">

        <h2>💳 Fraud System</h2>

        <div>
          <div className={`item ${active === "dashboard" ? "active" : ""}`}
            onClick={() => setActive("dashboard")}>
            Dashboard
          </div>

          <div className={`item ${active === "clients" ? "active" : ""}`}
            onClick={() => setActive("clients")}>
            Clients
          </div>

          <div className={`item ${active === "analytics" ? "active" : ""}`}
            onClick={() => setActive("analytics")}>
            Analytics
          </div>

          <div className={`item ${active === "history" ? "active" : ""}`}
            onClick={() => setActive("history")}>
            Transactions History
          </div>

          <div className={`item ${active === "settings" ? "active" : ""}`}
            onClick={() => setActive("settings")}>
            Settings
          </div>
        </div>

        <div className="box">
          📦 Total Transactions: {totalTransactions}
          <br /><br />
          🚨 Fraud: {fraudCount}
        </div>

        <button className="darkBtn"
          onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button className="logout"
          onClick={logout}>
          Logout
        </button>

      </div>
    </>
  );
}
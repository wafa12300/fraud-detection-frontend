export default function Sidebar({ active, setActive, setToken, darkMode, setDarkMode }) {
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

        .logo {
          text-align: center;
          margin-bottom: 35px;
          font-size: 22px;
          font-weight: bold;
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .item {
          padding: 12px;
          border-radius: 10px;
          cursor: pointer;
          color: #cbd5e1;
          transition: 0.3s;
        }

        .item:hover {
          background: rgba(255,255,255,0.08);
          transform: translateX(5px);
        }

        .active {
          background: #4f46e5;
          color: white;
          font-weight: bold;
        }

        .logout {
          margin-top: auto;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #ef4444;
          color: white;
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

        <div className="logo">💳 Fraud System</div>

        <div className="menu">
          <div className={`item ${active === "dashboard" ? "active" : ""}`}
            onClick={() => setActive("dashboard")}>
            Dashboard
          </div>

          <div className={`item ${active === "analytics" ? "active" : ""}`}
            onClick={() => setActive("analytics")}>
            Analytics
          </div>

          <div className={`item ${active === "clients" ? "active" : ""}`}
            onClick={() => setActive("clients")}>
            Clients
          </div>

          <div className={`item ${active === "settings" ? "active" : ""}`}
            onClick={() => setActive("settings")}>
            Settings
          </div>
        </div>

        {/* 🌙 DARK MODE BUTTON */}
        <button
          className="darkBtn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button className="logout" onClick={() => setToken(null)}>
          Logout
        </button>

      </div>
    </>
  );
}
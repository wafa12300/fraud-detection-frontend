export default function Sidebar({ active, setActive, setToken }) {
  return (
    <>
      <style>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: linear-gradient(180deg, #111827, #1f2937);
          color: white;
          display: flex;
          flex-direction: column;
          padding: 20px;
        }

        .logo {
          text-align: center;
          margin-bottom: 40px;
          font-size: 20px;
          font-weight: bold;
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 15px;
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
          transition: 0.3s;
        }

        .logout:hover {
          background: #dc2626;
          transform: scale(1.05);
        }
      `}</style>

      <div className="sidebar">

        <h2 className="logo">💳 Fraud System</h2>

        <div className="menu">

          <div
            className={active === "dashboard" ? "item active" : "item"}
            onClick={() => setActive("dashboard")}
          >
            Dashboard
          </div>

          <div
            className={active === "analytics" ? "item active" : "item"}
            onClick={() => setActive("analytics")}
          >
            Analytics
          </div>

          <div
            className={active === "clients" ? "item active" : "item"}
            onClick={() => setActive("clients")}
          >
            Clients
          </div>

          <div
            className={active === "settings" ? "item active" : "item"}
            onClick={() => setActive("settings")}
          >
            Settings
          </div>

        </div>

        <button className="logout" onClick={() => setToken(null)}>
          Logout
        </button>

      </div>
    </>
  );
}
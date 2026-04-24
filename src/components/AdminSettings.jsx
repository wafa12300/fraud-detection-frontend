export default function AdminSettings({ darkMode, setDarkMode }) {

  const changePassword = () => {
    alert("Password changed successfully 🔐");
  };

  return (
    <>
      <style>{`
        .settings {
          padding: 20px;
          max-width: 500px;
          margin: auto;
        }

        .card {
          background: ${darkMode ? "#0f172a" : "white"};
          color: ${darkMode ? "white" : "black"};
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          transition: 0.3s;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #ddd;
          border-radius: 8px;
          outline: none;
        }

        .btn {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 10px;
          font-weight: bold;
        }

        .save {
          background: #22c55e;
          color: white;
        }

        .toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding: 10px;
          background: ${darkMode ? "#1e293b" : "#f3f4f6"};
          border-radius: 10px;
        }

        .switch {
          width: 50px;
          height: 25px;
          background: ${darkMode ? "#22c55e" : "#ccc"};
          border-radius: 20px;
          position: relative;
          cursor: pointer;
        }

        .circle {
          width: 22px;
          height: 22px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 1.5px;
          left: ${darkMode ? "26px" : "2px"};
          transition: 0.3s;
        }
      `}</style>

      <div className="settings">
        <div className="card">

          <h2>⚙️ Admin Settings</h2>


          {/* PASSWORD */}
          <input type="password" placeholder="Current password" />
          <input type="password" placeholder="New password" />

          <button className="btn save" onClick={changePassword}>
            Save Changes
          </button>

        </div>
      </div>
    </>
  );
}
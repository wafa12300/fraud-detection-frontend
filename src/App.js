import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NewTransaction from "./pages/NewTransaction";

function App() {
  const [token, setToken] = useState(null);
  const [active, setActive] = useState("dashboard");

  const [blocked, setBlocked] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const handleFraud = (data) => {
    if (data.fraud) {
      setBlocked([...blocked, data.clientId]);

      setAlerts([
        ...alerts,
        {
          type: "FRAUD",
          message: "🚨 Fraud detected! Card blocked",
          time: new Date().toLocaleTimeString()
        }
      ]);
    }
  };

  if (!token) return <Login setToken={setToken} />;

  return (
    <>
      {active === "dashboard" && (
        <Dashboard alerts={alerts} blocked={blocked} />
      )}

      {active === "transaction" && (
        <NewTransaction onFraud={handleFraud} />
      )}
    </>
  );
}

export default App;
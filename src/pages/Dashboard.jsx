import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionTable from "../components/TransactionTable";
import FraudChart from "../components/FraudChart";
import ClientTable from "../components/ClientTable";
import AdminSettings from "../components/AdminSettings";
import TransactionsHistory from "../components/TransactionsHistory";

import { getClients, predictFraud, blockClient } from "../services/api";

export default function Dashboard({ logout }) {

  const [active, setActive] = useState("dashboard");
  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState("error"); // ✅ error | warning | success
  const [darkMode, setDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [clientId, setClientId] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const loadData = async () => {
    try {
      const res = await getClients();
      setClients(res.data || []);
    } catch {
      setClients([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showAlert = (msg, type = "error", duration = 4000) => {
    setAlert(msg);
    setAlertType(type);
    setTimeout(() => setAlert(null), duration);
  };

  const addTransaction = async () => {
    if (!amount || !clientId) {
      showAlert("❌ Please select a client and enter amount", "error");
      return;
    }

    // ✅ check if client is blocked BEFORE sending to backend
    const selectedClient = clients.find(c => c.CustomerId === Number(clientId));
    if (selectedClient?.is_blocked) {
      showAlert("🚫 This client is blocked and cannot make transactions!", "warning", 5000);
      return;
    }

    try {
      const res = await predictFraud({
        amount: Number(amount),
        clientId: Number(clientId),
      });

      // ✅ handle blocked response from backend too
      if (res.data.type === "Blocked" || res.data.error === "Client is blocked") {
        showAlert("🚫 This client is blocked and cannot make transactions!", "warning", 5000);
        return;
      }

      const type = res.data.type;
      const client = clients.find(c => c.CustomerId === Number(clientId));

      const newTx = {
        id: Date.now(),
        amount: Number(amount),
        clientId: Number(clientId),
        clientName: client?.Surname || "Unknown",
        type,
        date: today,
        time: new Date().toLocaleTimeString(),
      };

      setTransactions(prev => [newTx, ...prev]);

      if (type === "Fraud") {
        await blockClient(Number(clientId));
        await loadData();
        showAlert("🚨 FRAUD DETECTED — Client has been blocked!", "error", 5000);
      } else {
        showAlert("✅ Transaction Normal", "success", 3000);
      }

      setAmount("");
      setClientId("");
      setShowForm(false);

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      showAlert("❌ Backend Error: " + (err.response?.data?.detail || err.message), "error", 5000);
    }
  };

  const normal = transactions.filter(t => t.type === "Normal").length;
  const fraud = transactions.filter(t => t.type === "Fraud").length;

  const alertColors = {
    error: "#dc2626",
    warning: "#d97706",
    success: "#16a34a"
  };

  return (
    <div style={{ display: "flex" }}>

      <Sidebar
        active={active}
        setActive={setActive}
        logout={logout}
        fraudCount={fraud}
        totalTransactions={transactions.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div style={{
        flex: 1,
        padding: 20,
        background: darkMode ? "#0f172a" : "#f8fafc",
        color: darkMode ? "white" : "black",
        minHeight: "100vh"
      }}>

        <h1>🚀 Fraud AI Dashboard</h1>

        {/* ✅ Alert with dynamic color */}
        {alert && (
          <div style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: alertColors[alertType],
            color: "white",
            padding: "12px 20px",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: "bold",
            zIndex: 9999,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}>
            {alert}
          </div>
        )}

        {active === "dashboard" && (
          <>
            <button onClick={() => setShowForm(!showForm)}>
              ➕ New Transaction
            </button>

            {showForm && (
              <div style={{ marginTop: 10 }}>
                <input
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                >
                  <option value="">Select Client</option>
                  {clients.map(c => (
                    <option
                      key={c.CustomerId}
                      value={c.CustomerId}
                      style={{ color: c.is_blocked ? "red" : "inherit" }}
                    >
                      {c.is_blocked ? "🔴 " : "🟢 "}{c.Surname} ({c.Geography})
                    </option>
                  ))}
                </select>
                <button onClick={addTransaction}>Submit</button>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <StatCard title="Total" value={transactions.length} />
              <StatCard title="Normal" value={normal} />
              <StatCard title="Fraud" value={fraud} />
            </div>

            <TransactionTable transactions={transactions} />
          </>
        )}

        {active === "clients" && <ClientTable />}

        {active === "analytics" && (
          <FraudChart normalCount={normal} fraudCount={fraud} />
        )}

        {active === "history" && (
          <TransactionsHistory transactions={transactions} />
        )}

        {active === "settings" && <AdminSettings />}

      </div>
    </div>
  );
}
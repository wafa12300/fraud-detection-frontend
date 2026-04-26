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
  const [alertType, setAlertType] = useState("error");
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
    <div style={{ display: "flex", background: "#0f172a", minHeight: "100vh" }}>

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
        padding: "30px 36px",
        background: "#0f172a",
        color: "white",
        minHeight: "100vh"
      }}>

        {/* ✅ Header */}
        <div style={{
          textAlign: "center",
          marginBottom: 36,
          padding: "24px",
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          borderRadius: 16,
          border: "1px solid #334155",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
        }}>
          <h1 style={{
            margin: 0,
            fontSize: 32,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            🤖 Fraud AI Dashboard
          </h1>
          <p style={{ color: "#64748b", margin: "8px 0 0 0", fontSize: 14 }}>
            Real-time fraud detection & client management
          </p>
        </div>

        {/* ✅ Alert */}
        {alert && (
          <div style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: alertColors[alertType],
            color: "white",
            padding: "14px 22px",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: "bold",
            zIndex: 9999,
            boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
            animation: "fadeIn 0.3s ease"
          }}>
            {alert}
          </div>
        )}

        {active === "dashboard" && (
          <>
            {/* ✅ New Transaction Button */}
            <div style={{ marginBottom: 20 }}>
              <button
                onClick={() => setShowForm(!showForm)}
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
                  transition: "0.2s"
                }}
              >
                ➕ New Transaction
              </button>
            </div>

            {/* ✅ Form */}
            {showForm && (
              <div style={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: 14,
                padding: "20px 24px",
                marginBottom: 24,
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap"
              }}>
                <input
                  placeholder="💰 Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: 160,
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "1px solid #334155",
                    background: "#0f172a",
                    color: "white",
                    fontSize: 14
                  }}
                />
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  style={{
                    flex: 2,
                    minWidth: 200,
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "1px solid #334155",
                    background: "#0f172a",
                    color: "white",
                    fontSize: 14,
                    cursor: "pointer"
                  }}
                >
                  <option value="">👤 Select Client</option>
                  {clients.map(c => (
                    <option key={c.CustomerId} value={c.CustomerId}>
                      {c.is_blocked ? "🔴 " : "🟢 "}{c.Surname} ({c.Geography})
                    </option>
                  ))}
                </select>
                <button
                  onClick={addTransaction}
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "white",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(16,185,129,0.3)"
                  }}
                >
                  🚀 Submit
                </button>
              </div>
            )}

            {/* ✅ Stat Cards */}
            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              <StatCard
                title="Total Transactions"
                value={transactions.length}
                icon="📊"
                color={{ bg: "#1e293b", accent: "#3b82f6" }}
              />
              <StatCard
                title="Normal"
                value={normal}
                icon="✅"
                color={{ bg: "#052e16", accent: "#22c55e" }}
              />
              <StatCard
                title="Fraud Detected"
                value={fraud}
                icon="🚨"
                color={{ bg: "#450a0a", accent: "#ef4444" }}
              />
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
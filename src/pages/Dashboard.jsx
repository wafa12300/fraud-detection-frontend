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
const addTransaction = async () => {
    if (!amount || !clientId) {
      setAlert("❌ Please select a client and enter amount");
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      const res = await predictFraud({
        amount: Number(amount),
        clientId: Number(clientId),
      });

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
      setAlert(type === "Fraud" ? "🚨 FRAUD DETECTED" : "✅ Transaction Normal");

      if (type === "Fraud") {
        await blockClient(Number(clientId));
        await loadData();
      }

      setTimeout(() => setAlert(null), 3000);
      setAmount("");
      setClientId("");
      setShowForm(false);

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      setAlert("❌ Backend Error: " + (err.response?.data?.detail || err.message));
      setTimeout(() => setAlert(null), 5000);
    }
  };
  const normal = transactions.filter(t => t.type === "Normal").length;
  const fraud = transactions.filter(t => t.type === "Fraud").length;

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

        {alert && (
          <div style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "red",
            color: "white",
            padding: 10,
            borderRadius: 8
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
                    <option key={c.CustomerId} value={c.CustomerId}>
                      {c.Surname} ({c.Country})
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

        {/* ✅ ما نعديش clients كـ prop — ClientTable تتحكم بروحها */}
        {active === "clients" && (
          <ClientTable />
        )}

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
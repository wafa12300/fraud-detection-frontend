import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionTable from "../components/TransactionTable";
import FraudChart from "../components/FraudChart";
import ClientTable from "../components/ClientTable";
import AdminSettings from "../components/AdminSettings";

import { predictFraud, getClients } from "../services/api";

export default function Dashboard({ setToken }) {

  const today = new Date().toISOString().split("T")[0];

  const [active, setActive] = useState("dashboard");
  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [alert, setAlert] = useState(null);

  // 📥 load clients from backend
  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await getClients();
        setClients(res.data);
      } catch (err) {
        console.log("Backend error:", err);
      }
    };

    loadClients();
  }, []);

  // 🤖 AI transaction
  const addTransaction = async (amount, clientId) => {
    try {
      const res = await predictFraud({
        amount: Number(amount),
        clientId: Number(clientId),
      });

      const result = res.data.type;

      const newTx = {
        id: Date.now(),
        amount: "$" + amount,
        type: result,
        date: today,
        clientId: Number(clientId),
      };

      setTransactions(prev => [newTx, ...prev]);

      // 🚨 FRAUD ACTION
      if (result === "Fraud") {
        setClients(prev =>
          prev.map(c =>
            c.id === Number(clientId)
              ? { ...c, blocked: true }
              : c
          )
        );

        setAlert("🚨 FRAUD DETECTED");
        setTimeout(() => setAlert(null), 3000);
      }

    } catch (err) {
      alert("❌ Backend not connected");
    }
  };

  const normal = transactions.filter(t => t.type === "Normal").length;
  const fraud = transactions.filter(t => t.type === "Fraud").length;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      <Sidebar active={active} setActive={setActive} setToken={setToken} />

      <div style={{ flex: 1, padding: 20 }}>

        <h1>🚀 Fraud AI Dashboard</h1>

        {active === "dashboard" && (
          <>
            <div style={{ display: "flex", gap: 10 }}>
              <StatCard title="Total" value={transactions.length} color="blue" />
              <StatCard title="Normal" value={normal} color="green" />
              <StatCard title="Fraud" value={fraud} color="red" />
            </div>

            <TransactionTable transactions={transactions} clients={clients} />

            <button onClick={() => addTransaction(500, 1)}>
              ➕ Test AI Transaction
            </button>
          </>
        )}

        {active === "clients" && (
          <ClientTable clients={clients} />
        )}

        {active === "analytics" && (
          <FraudChart normalCount={normal} fraudCount={fraud} />
        )}

        {active === "settings" && <AdminSettings />}

        {alert && (
          <div style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "red",
            color: "white",
            padding: 10,
            borderRadius: 10
          }}>
            {alert}
          </div>
        )}

      </div>
    </div>
  );
}
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionTable from "../components/TransactionTable";
import FraudChart from "../components/FraudChart";
import ClientTable from "../components/ClientTable";
import AdminSettings from "../components/AdminSettings";

export default function Dashboard({ setToken }) {

  const today = new Date().toISOString().split("T")[0];

  // 🌙 DARK MODE
  const [darkMode, setDarkMode] = useState(false);

  // 📌 NAV
  const [active, setActive] = useState("dashboard");

  // 🚨 ALERT
  const [alert, setAlert] = useState(null);

  // ➕ MODAL
  const [open, setOpen] = useState(false);

  // FORM
  const [form, setForm] = useState({
    amount: "",
    type: "Normal",
    clientId: 1,
  });

  // CLIENTS
  const [clients, setClients] = useState([
    { id: 1, name: "Ali", email: "ali@test.com", blocked: false },
    { id: 2, name: "Sara", email: "sara@test.com", blocked: false },
  ]);

  // TRANSACTIONS
  const [transactions, setTransactions] = useState([
    { id: 1, amount: "$200", type: "Normal", date: today, clientId: 1 },
    { id: 2, amount: "$500", type: "Fraud", date: today, clientId: 2 },
  ]);

  // BLOCK / UNBLOCK
  const blockClient = (id) => {
    setClients(prev =>
      prev.map(c =>
        c.id === id ? { ...c, blocked: true } : c
      )
    );
  };

  const unblockClient = (id) => {
    setClients(prev =>
      prev.map(c =>
        c.id === id ? { ...c, blocked: false } : c
      )
    );
  };

  // ➕ ADD TRANSACTION (FIXED)
  const addTransaction = () => {
    if (!form.amount) {
      alert("Fill fields!");
      return;
    }

    const isFraud = Math.random() > 0.7;
    const clientId = Number(form.clientId);

    const newTx = {
      id: Date.now(),
      amount: "$" + form.amount,
      type: isFraud ? "Fraud" : "Normal",
      date: today,
      clientId,
    };

    setTransactions(prev => [newTx, ...prev]);

    // reset form (IMPORTANT FIX)
    setForm({ amount: "", type: "Normal", clientId: 1 });
    setOpen(false);

    // 🚨 FRAUD ALERT
    if (isFraud) {
      setClients(prev =>
        prev.map(c =>
          c.id === clientId ? { ...c, blocked: true } : c
        )
      );

      setAlert({
        title: "🚨 FRAUD DETECTED",
        message: "Client blocked automatically!"
      });

      setTimeout(() => setAlert(null), 4000);
    }
  };

  const normal = transactions.filter(t => t.type === "Normal").length;
  const fraud = transactions.filter(t => t.type === "Fraud").length;

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: darkMode ? "#0f172a" : "#f3f4f6",
      color: darkMode ? "white" : "black",
    }}>

      {/* SIDEBAR */}
      <Sidebar
        active={active}
        setActive={setActive}
        setToken={setToken}
        darkMode={darkMode}
      />

      <div style={{ flex: 1, padding: 20 }}>

        <h1 style={{ textAlign: "center" }}>
          🚀 Fraud Dashboard
        </h1>

        {/* DASHBOARD */}
        {active === "dashboard" && (
          <>
            <button
              onClick={() => setOpen(true)}
              style={{
                padding: "10px 15px",
                background: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                marginBottom: 20,
              }}
            >
              ➕ New Transaction
            </button>

            <div style={{ display: "flex", gap: 10 }}>
              <StatCard title="Total" value={transactions.length} color="blue" />
              <StatCard title="Normal" value={normal} color="green" />
              <StatCard title="Fraud" value={fraud} color="red" />
            </div>

            <TransactionTable
              transactions={transactions}
              clients={clients}
            />
          </>
        )}

        {/* CLIENTS */}
        {active === "clients" && (
          <ClientTable
            clients={clients}
            blockClient={blockClient}
            unblockClient={unblockClient}
          />
        )}

        {/* ANALYTICS */}
        {active === "analytics" && (
          <FraudChart
            normalCount={normal}
            fraudCount={fraud}
          />
        )}

        {/* SETTINGS */}
        {active === "settings" && (
          <AdminSettings
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}

        {/* MODAL */}
        {open && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <div style={{
              background: "white",
              padding: 20,
              borderRadius: 12,
              width: 320,
            }}>

              <h3>➕ Add Transaction</h3>

              <input
                placeholder="Amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option value="Normal">Normal</option>
                <option value="Fraud">Fraud</option>
              </select>

              <select
                value={form.clientId}
                onChange={(e) =>
                  setForm({ ...form, clientId: e.target.value })
                }
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <button onClick={addTransaction} style={{
                width: "100%",
                padding: 10,
                background: "#22c55e",
                color: "white",
                border: "none",
                marginTop: 10,
              }}>
                Save
              </button>

              <button onClick={() => setOpen(false)} style={{
                width: "100%",
                padding: 10,
                background: "#ef4444",
                color: "white",
                border: "none",
                marginTop: 5,
              }}>
                Close
              </button>

            </div>
          </div>
        )}

        {/* ALERT */}
        {alert && (
          <div style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}>
            <h3 style={{ color: "red" }}>{alert.title}</h3>
            <p>{alert.message}</p>
          </div>
        )}

      </div>
    </div>
  );
}
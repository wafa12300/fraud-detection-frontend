import { useState, useEffect } from "react";
import { blockClient, unblockClient, deleteClient, getClients } from "../services/api";

export default function ClientTable() {

  const [clients, setClients] = useState([]);

  // ✅ تجيب البيانات بروحها
  const loadClients = async () => {
    try {
      const res = await getClients();
      setClients(res.data || []);
    } catch (err) {
      console.error("Load error:", err);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleBlock = async (id) => {
    try {
      await blockClient(id);
      await loadClients(); // ✅ reload من MongoDB
    } catch (err) {
      console.error("Block error:", err.response?.status);
    }
  };

  const handleUnblock = async (id) => {
    try {
      await unblockClient(id);
      await loadClients(); // ✅ reload من MongoDB
    } catch (err) {
      console.error("Unblock error:", err.response?.status);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("تأكد تحذف هذا الكلاينت؟")) return;
    try {
      await deleteClient(id);
      await loadClients(); // ✅ reload من MongoDB
    } catch (err) {
      console.error("Delete error:", err.response?.status);
    }
  };

  return (
    <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#1e293b", color: "white" }}>
          <th style={{ padding: 10 }}>ID</th>
          <th style={{ padding: 10 }}>Surname</th>
          <th style={{ padding: 10 }}>Country</th>
          <th style={{ padding: 10 }}>Balance</th>
          <th style={{ padding: 10 }}>Status</th>
          <th style={{ padding: 10 }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((c) => (
          <tr
            key={c.CustomerId}
            style={{ borderBottom: "1px solid #e2e8f0", textAlign: "center" }}
          >
            <td style={{ padding: 10 }}>{c.CustomerId}</td>
            <td style={{ padding: 10 }}>{c.Surname}</td>
            <td style={{ padding: 10 }}>{c.Country}</td>
            <td style={{ padding: 10 }}>{c.Balance}</td>
            <td style={{
              padding: 10,
              color: c.blocked ? "red" : "green",
              fontWeight: "bold"
            }}>
              {c.blocked ? "🔴 Blocked" : "🟢 Active"}
            </td>
            <td style={{ padding: 10 }}>
              <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                {c.blocked ? (
                  <button
                    onClick={() => handleUnblock(c.CustomerId)}
                    style={{
                      background: "green",
                      color: "white",
                      padding: "5px 12px",
                      borderRadius: 4,
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    ✅ Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlock(c.CustomerId)}
                    style={{
                      background: "orange",
                      color: "white",
                      padding: "5px 12px",
                      borderRadius: 4,
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    🚫 Block
                  </button>
                )}
                <button
                  onClick={() => handleDelete(c.CustomerId)}
                  style={{
                    background: "#dc2626",
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: 4,
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
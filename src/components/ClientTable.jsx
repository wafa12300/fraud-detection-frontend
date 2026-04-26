import { useState, useEffect } from "react";
import { blockClient, unblockClient, deleteClient, getClients } from "../services/api";

export default function ClientTable() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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
      await loadClients();
    } catch (err) {
      console.error("Block error:", err.response?.status);
    }
  };

  const handleUnblock = async (id) => {
    try {
      await unblockClient(id);
      await loadClients();
    } catch (err) {
      console.error("Unblock error:", err.response?.status);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("تأكد تحذف هذا الكلاينت؟")) return;
    try {
      await deleteClient(id);
      await loadClients();
    } catch (err) {
      console.error("Delete error:", err.response?.status);
    }
  };

  const filtered = clients.filter((c) => {
    const status = c.is_blocked ? "blocked" : "active";
    const matchSearch =
      c.Surname?.toLowerCase().includes(search.toLowerCase()) ||
      c.CustomerId?.toString().includes(search) ||
      c.Geography?.toLowerCase().includes(search.toLowerCase()) ||
      status.includes(search.toLowerCase());

    const matchFilter =
      filter === "all" ? true :
      filter === "blocked" ? c.is_blocked :
      !c.is_blocked;

    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, marginTop: 10 }}>
        <input
          placeholder="🔍 Search by name, ID, country, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #334155",
            background: "#0f172a",
            color: "white",
            fontSize: 14
          }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #334155",
            background: "#0f172a",
            color: "white",
            fontSize: 14,
            cursor: "pointer"
          }}
        >
          <option value="all">All ({clients.length})</option>
          <option value="active">🟢 Active ({clients.filter((c) => !c.is_blocked).length})</option>
          <option value="blocked">🔴 Blocked ({clients.filter((c) => c.is_blocked).length})</option>
        </select>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: 20, color: "#94a3b8" }}>
                No clients found
              </td>
            </tr>
          ) : (
            filtered.map((c) => (
              <tr key={c.CustomerId} style={{ borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>
                <td style={{ padding: 10 }}>{c.CustomerId}</td>
                <td style={{ padding: 10 }}>{c.Surname}</td>
                <td style={{ padding: 10 }}>{c.Geography}</td>
                <td style={{ padding: 10 }}>{c.Balance}</td>
                <td style={{ padding: 10, color: c.is_blocked ? "red" : "green", fontWeight: "bold" }}>
                  {c.is_blocked ? "🔴 Blocked" : "🟢 Active"}
                </td>
                <td style={{ padding: 10 }}>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                    {c.is_blocked ? (
                      <button
                        onClick={() => handleUnblock(c.CustomerId)}
                        style={{ background: "green", color: "white", padding: "5px 12px", borderRadius: 4, border: "none", cursor: "pointer" }}
                      >
                        ✅ Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlock(c.CustomerId)}
                        style={{ background: "orange", color: "white", padding: "5px 12px", borderRadius: 4, border: "none", cursor: "pointer" }}
                      >
                        🚫 Block
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(c.CustomerId)}
                      style={{ background: "#dc2626", color: "white", padding: "5px 12px", borderRadius: 4, border: "none", cursor: "pointer" }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <p style={{ color: "#94a3b8", marginTop: 10, fontSize: 13 }}>
        Showing {filtered.length} of {clients.length} clients
      </p>
    </div>
  );
}
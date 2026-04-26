export default function TransactionTable({ transactions = [] }) {
  return (
    <div style={{ marginTop: 20, overflowX: "auto" }}>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>

        {/* HEADER */}
        <thead>
          <tr style={{ background: "#111827", color: "white" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Client</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Time</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                No transactions yet
              </td>
            </tr>
          ) : (
            transactions.map((t) => (
              <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>

                <td style={tdStyle}>{t.id}</td>

                {/* FIX: safe client name */}
                <td style={tdStyle}>
                  {t.clientName || t.clientId || "Unknown"}
                </td>

                <td style={tdStyle}>{t.amount}</td>

                {/* FRAUD COLOR */}
                <td style={{
                  ...tdStyle,
                  color: t.type === "Fraud" ? "red" : "green",
                  fontWeight: "bold"
                }}>
                  {t.type}
                </td>

                <td style={tdStyle}>{t.date}</td>

                <td style={{ ...tdStyle, fontFamily: "monospace" }}>
                  {t.time || "-"}
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}

// ======================
// STYLES
// ======================
const thStyle = {
  padding: "12px",
  textAlign: "left"
};

const tdStyle = {
  padding: "12px",
  textAlign: "left"
};
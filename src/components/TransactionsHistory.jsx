export default function TransactionsHistory({ transactions = [] }) {
  return (
    <div style={{ padding: 20 }}>

      <h2>📊 Transactions History</h2>

      <table style={{
        width: "100%",
        marginTop: 20,
        borderCollapse: "collapse",
        background: "white"
      }}>

        <thead>
          <tr style={{ background: "#111827", color: "white" }}>
            <th>ID</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                No transactions yet
              </td>
            </tr>
          ) : (
            transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.clientName}</td>
                <td>{t.amount}</td>

                <td style={{
                  color: t.type === "Fraud" ? "red" : "green",
                  fontWeight: "bold"
                }}>
                  {t.type}
                </td>

                <td>{t.date}</td>
                <td>{t.time}</td>
              </tr>
            ))
          )}
        </tbody>

      </table>

    </div>
  );
}
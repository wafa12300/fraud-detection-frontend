export default function TransactionTable({ transactions = [], clients = [] }) {
  return (
    <>
      <style>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #f3f4f6;
        }

        .fraud {
          color: red;
          font-weight: bold;
        }

        .normal {
          color: green;
          font-weight: bold;
        }
      `}</style>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Client</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(t => {
            const client = clients.find(c => c.id === t.clientId);

            return (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.amount}</td>
                <td className={t.type === "Fraud" ? "fraud" : "normal"}>
                  {t.type}
                </td>
                <td>{client ? client.name : "Unknown"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
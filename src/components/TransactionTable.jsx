export default function TransactionTable({ transactions = [], clients = [] }) {
  return (
    <>
      <style>{`
        .table-container {
          background: white;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
          margin-top: 20px;
          overflow-x: auto;
          transition: 0.3s;
        }

        .table-container:hover {
          transform: translateY(-2px);
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Segoe UI', sans-serif;
        }

        .table thead {
          background: linear-gradient(90deg, #111827, #1f2937);
          color: white;
        }

        .table th {
          padding: 14px;
          text-align: left;
          font-size: 13px;
          letter-spacing: 0.5px;
        }

        .table td {
          padding: 14px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 14px;
        }

        .table tbody tr {
          transition: all 0.25s ease;
        }

        .table tbody tr:hover {
          background: #f9fafb;
          transform: scale(1.01);
        }

        /* FRAUD ROW */
        .fraud-row {
          background: #fff1f2;
          border-left: 4px solid #ef4444;
        }

        /* AMOUNT */
        .amount {
          font-weight: bold;
          color: #111827;
        }

        /* BADGE */
        .badge {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: bold;
          display: inline-block;
        }

        .badge.normal {
          background: #dcfce7;
          color: #166534;
        }

        .badge.fraud {
          background: #fee2e2;
          color: #991b1b;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        /* CLIENT */
        .client {
          font-weight: 500;
          color: #374151;
        }

        .unknown {
          color: #9ca3af;
          font-style: italic;
        }

        /* DATE */
        .date {
          color: #6b7280;
          font-size: 13px;
        }

        /* EMPTY STATE */
        .empty {
          text-align: center;
          padding: 30px;
          color: #9ca3af;
          font-size: 14px;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .table th, .table td {
            font-size: 12px;
            padding: 10px;
          }
        }
      `}</style>

      <div className="table-container">

        <table className="table">

          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Client</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  🚫 No transactions yet
                </td>
              </tr>
            ) : (
              transactions.map((t) => {
                const client = clients.find(c => c.id === t.clientId);

                return (
                  <tr
                    key={t.id}
                    className={t.type === "Fraud" ? "fraud-row" : ""}
                  >

                    <td>#{t.id}</td>

                    <td className="amount">{t.amount}</td>

                    <td>
                      <span className={`badge ${t.type === "Fraud" ? "fraud" : "normal"}`}>
                        {t.type === "Fraud" ? "⚠ Fraud" : "✔ Normal"}
                      </span>
                    </td>

                    <td className={client ? "client" : "unknown"}>
                      {client ? client.name : "Unknown"}
                    </td>

                    <td className="date">{t.date}</td>

                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>
    </>
  );
}
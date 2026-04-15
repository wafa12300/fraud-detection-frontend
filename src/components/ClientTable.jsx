import { useState } from "react";

export default function ClientTable({ clients = [], blockClient, unblockClient }) {
  const [search, setSearch] = useState("");

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        .container {
          background: white;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          margin-top: 20px;
        }

        .search {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 10px;
          border: 1px solid #ddd;
          outline: none;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          font-family: Arial;
        }

        .table thead {
          background: #111827;
          color: white;
        }

        .table th {
          padding: 12px;
          text-align: left;
        }

        .table td {
          padding: 12px;
          border-bottom: 1px solid #eee;
        }

        .table tbody tr {
          transition: 0.2s;
        }

        .table tbody tr:hover {
          background: #f3f4f6;
        }

        .badge {
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: bold;
        }

        .active {
          background: #dcfce7;
          color: #166534;
        }

        .blocked {
          background: #fee2e2;
          color: #991b1b;
        }

        .btn {
          padding: 6px 10px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: white;
          font-size: 12px;
        }

        .block {
          background: #ef4444;
        }

        .unblock {
          background: #22c55e;
        }

        @media (max-width: 768px) {
          .table th, .table td {
            font-size: 12px;
            padding: 8px;
          }
        }
      `}</style>

      <div className="container">

        {/* SEARCH */}
        <input
          className="search"
          placeholder="🔍 Search client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>

                <td>{c.name}</td>

                <td>{c.email}</td>

                <td>
                  <span className={`badge ${c.blocked ? "blocked" : "active"}`}>
                    {c.blocked ? "BLOCKED" : "ACTIVE"}
                  </span>
                </td>

                <td>
                  {c.blocked ? (
                    <button
                      className="btn unblock"
                      onClick={() => unblockClient(c.id)}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="btn block"
                      onClick={() => blockClient(c.id)}
                    >
                      Block
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </>
  );
}
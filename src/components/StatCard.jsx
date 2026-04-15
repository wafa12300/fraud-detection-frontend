export default function StatCard({ title, value, color }) {
  return (
    <>
      <style>{`
        .card {
          background: white;
          padding: 18px;
          border-radius: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card h4 {
          color: gray;
          font-size: 14px;
        }

        .card h2 {
          font-size: 22px;
          font-weight: bold;
        }

        .bar {
          width: 6px;
          height: 40px;
          border-radius: 10px;
        }
      `}</style>

      <div className="card">
        <div>
          <h4>{title}</h4>
          <h2>{value}</h2>
        </div>
        <div className="bar" style={{ background: color }}></div>
      </div>
    </>
  );
}
export default function StatCard({ title, value, color, icon }) {
  return (
    <>
      <style>{`
        .card {
          padding: 20px 24px;
          border-radius: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          transition: 0.3s;
          flex: 1;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.25);
        }
        .card h4 {
          color: #94a3b8;
          font-size: 13px;
          margin: 0 0 6px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .card h2 {
          font-size: 28px;
          font-weight: bold;
          margin: 0;
          color: white;
        }
        .card-icon {
          font-size: 32px;
          opacity: 0.85;
        }
        .bar {
          width: 5px;
          height: 50px;
          border-radius: 10px;
        }
      `}</style>

      <div className="card" style={{ background: color.bg, borderLeft: `4px solid ${color.accent}` }}>
        <div>
          <h4>{title}</h4>
          <h2>{value}</h2>
        </div>
        <div className="card-icon">{icon}</div>
      </div>
    </>
  );
}
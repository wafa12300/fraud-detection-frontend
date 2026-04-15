import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line,
  AreaChart, Area
} from "recharts";

export default function FraudChart({ normalCount = 0, fraudCount = 0 }) {

  // 📊 PIE + BAR DATA
  const data = [
    { name: "Normal", value: normalCount },
    { name: "Fraud", value: fraudCount },
  ];

  const barData = [
    { type: "Normal", count: normalCount },
    { type: "Fraud", count: fraudCount },
  ];

  // 📈 SIMULATED TIME DATA (PFE STYLE)
  const trendData = [
    { day: "Mon", fraud: 2 },
    { day: "Tue", fraud: 5 },
    { day: "Wed", fraud: 3 },
    { day: "Thu", fraud: 8 },
    { day: "Fri", fraud: 6 },
    { day: "Sat", fraud: 9 },
    { day: "Sun", fraud: fraudCount },
  ];

  const colors = ["#22c55e", "#ef4444"];

  const isEmpty = normalCount === 0 && fraudCount === 0;

  return (
    <>
      <style>{`
        .analytics {
          background: white;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          margin-top: 20px;
        }

        .title {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 20px;
        }

        .charts {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
        }

        .empty {
          text-align: center;
          color: gray;
          padding: 40px;
        }
      `}</style>

      <div className="analytics">

        <div className="title">📊 Fraud Analytics Pro Max</div>

        {isEmpty ? (
          <div className="empty">No data available 📉</div>
        ) : (
          <div className="charts">

            {/* 🥧 PIE CHART */}
            <PieChart width={250} height={250}>
              <Pie data={data} dataKey="value" outerRadius={90} label>
                {data.map((_, i) => (
                  <Cell key={i} fill={colors[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            {/* 📊 BAR CHART */}
            <BarChart width={300} height={250} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" />
            </BarChart>

            {/* 📈 LINE CHART (TREND) */}
            <LineChart width={350} height={250} data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="fraud" stroke="#ef4444" strokeWidth={3} />
            </LineChart>

            {/* 🌊 AREA CHART */}
            <AreaChart width={350} height={250} data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="fraud" fill="#fca5a5" stroke="#ef4444" />
            </AreaChart>

          </div>
        )}

      </div>
    </>
  );
}
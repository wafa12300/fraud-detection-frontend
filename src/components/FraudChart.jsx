import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function FraudChart({
  transactions = [],
}) {
  // 🔥 protection (important)
  const safeTx = Array.isArray(transactions) ? transactions : [];

  const normal = safeTx.filter(t => t.type === "Normal").length;
  const fraud = safeTx.filter(t => t.type === "Fraud").length;

  const data = [
    { name: "Normal", value: normal },
    { name: "Fraud", value: fraud },
  ];

  const colors = ["#22c55e", "#ef4444"];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" label>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
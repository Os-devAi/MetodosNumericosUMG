import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Scatter
} from "recharts";

function Grafica({ resultado }) {

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-[28px] p-8 h-[700px]">

      <h2 className="text-3xl font-semibold mb-8 text-white">
        Visualización Gráfica
      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <LineChart data={resultado.grafica}>

          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

          <XAxis dataKey="x" stroke="#94A3B8" />

          <YAxis stroke="#94A3B8" />

          <Tooltip
            contentStyle={{
              background: "#111827",
              border: "1px solid rgba(148,163,184,0.18)",
              borderRadius: "16px",
              color: "#e2e8f0"
            }}
          />

          <Line
            type="monotone"
            dataKey="y"
            stroke="#cbd5e1"
            strokeWidth={3}
            dot={false}
          />

          <Scatter
            data={resultado.puntos_originales}
            fill="#64748b"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default Grafica;
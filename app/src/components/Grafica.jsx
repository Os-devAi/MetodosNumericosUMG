import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Scatter,
} from "recharts";

function Grafica({ resultado, evalPoint }) {

  return (

    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <span className="text-sm font-medium text-[#050919]">
            Análisis Visual
          </span>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Gráfica de Interpolación
          </h2>

        </div>
      </div>

      {/* Chart */}
      <div className="h-[560px] rounded-3xl bg-slate-50 p-6 border border-slate-100">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={resultado.grafica}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#E2E8F0"
            />

            {/* Axis */}
            <XAxis
              dataKey="x"
              stroke="#94A3B8"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              stroke="#94A3B8"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{
                stroke: "#CBD5E1",
                strokeWidth: 1,
              }}
              contentStyle={{
                borderRadius: "18px",
                border: "1px solid #E2E8F0",
                background: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
                color: "#0F172A",
                padding: "12px",
              }}
            />

            {/* Polynomial line */}
            <Line
              type="monotone"
              dataKey="y"
              stroke="#0F172A"
              strokeWidth={3.5}
              dot={false}
            />

            {/* Original points */}
            <Scatter
              data={resultado.puntos_originales}
              fill="#7C3AED"
            />

            {/* Evaluated point */}
            {evalPoint && evalPoint.y !== null && !isNaN(evalPoint.y) && (
              <Scatter
                name="Punto Evaluado"
                data={[evalPoint]}
                fill="#EF4444"
                shape="circle"
              />
            )}

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Grafica;
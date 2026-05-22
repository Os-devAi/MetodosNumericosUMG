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

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Representación visual del polinomio interpolante y los puntos originales.
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[560px] rounded-3xl bg-slate-50 p-6 border border-slate-100">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={resultado.grafica}
            margin={{
              top: 30,
              right: 40,
              left: 20,
              bottom: 20,
            }}
          >

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#E2E8F0"
            />

            {/* X Axis */}
            <XAxis
              dataKey="x"
              type="number"
              stroke="#94A3B8"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[
                (dataMin) =>
                  dataMin - Math.abs(dataMin * 0.2 || 1),

                (dataMax) =>
                  dataMax + Math.abs(dataMax * 0.2 || 1),
              ]}
            />

            {/* Y Axis */}
            <YAxis
              type="number"
              stroke="#94A3B8"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[
                (dataMin) =>
                  dataMin - Math.abs(dataMin * 0.2 || 1),

                (dataMax) =>
                  dataMax + Math.abs(dataMax * 0.2 || 1),
              ]}
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
              formatter={(value) => [
                Number(value).toFixed(6),
              ]}
            />

            {/* Polynomial line */}
            <Line
              type="natural"
              dataKey="y"
              stroke="#0F172A"
              strokeWidth={3.5}
              dot={false}
              activeDot={{
                r: 6,
              }}
            />

            {/* Original points */}
            <Scatter
              name="Puntos Originales"
              data={resultado.puntos_originales}
              fill="#7C3AED"
            />

            {/* Evaluated point */}
            {evalPoint &&
              evalPoint.y !== null &&
              !isNaN(evalPoint.y) && (
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
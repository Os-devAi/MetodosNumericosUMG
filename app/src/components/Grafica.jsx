import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Scatter,
  Legend,
} from "recharts";

function Grafica({ resultado, evalPoint }) {
  // Combinar los puntos para calcular dinámicamente un dominio limpio si es necesario
  const tienePuntoEvaluado = evalPoint && evalPoint.y !== null && !isNaN(evalPoint.y);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Análisis Visual
          </span>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
            Gráfica de Interpolación
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Representación visual del polinomio interpolante y los puntos originales.
          </p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-[560px] rounded-3xl bg-slate-50 p-6 border border-slate-100 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            margin={{
              top: 30,
              right: 30,
              left: 10,
              bottom: 10,
            }}
          >
            {/* Cuadrícula limpia de fondo */}
            <CartesianGrid
              strokeDasharray="6 6"
              stroke="#E2E8F0"
              vertical={true}
            />

            {/* Eje X */}
            <XAxis
              dataKey="x"
              type="number"
              stroke="#94A3B8"
              tick={{ fill: "#64748B", fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              domain={["dataMin - 1", "dataMax + 1"]}
              allowDataOverflow={false}
            />

            {/* Eje Y */}
            <YAxis
              dataKey="y"
              type="number"
              stroke="#94A3B8"
              tick={{ fill: "#64748B", fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              domain={["dataMin - 2", "dataMax + 2"]}
              allowDataOverflow={false}
            />

            {/* Tooltip moderno flotante */}
            <Tooltip
              cursor={{
                stroke: "#94A3B8",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: "20px",
                border: "1px solid #E2E8F0",
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 12px 34px rgba(15, 23, 42, 0.06)",
                padding: "14px",
              }}
              itemStyle={{ fontSize: "13px", color: "#334155" }}
              labelStyle={{ fontSize: "12px", fontWeight: 600, color: "#0F172A", marginBottom: "4px" }}
              formatter={(value, name) => [
                Number(value).toFixed(5),
                name === "y" ? "Polinomio P(x)" : name
              ]}
              labelFormatter={(label) => `Coordenada X: ${Number(label).toFixed(4)}`}
            />

            {/* Leyenda minimalista en la parte superior */}
            <Legend
              verticalAlign="top"
              height={40}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                fontSize: "13px",
                fontWeight: 500,
                paddingBottom: "20px",
              }}
            />

            {/* Línea suave continua del Polinomio (Data del backend) */}
            <Line
              name="Polinomio Interpolante"
              data={resultado.grafica}
              type="monotone"
              dataKey="y"
              stroke="#0F172A"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                stroke: "#0F172A",
                strokeWidth: 2,
                fill: "#FFF",
              }}
              legendType="line"
            />

            {/* Nube de puntos originales ingresados */}
            <Scatter
              name="Puntos Originales"
              data={resultado.puntos_originales}
              dataKey="y"
              fill="#7C3AED"
              shape="circle"
              legendType="circle"
            />

            {/* Punto interactivo evaluado por el usuario en tiempo real */}
            {tienePuntoEvaluado && (
              <Scatter
                name="Punto Evaluado"
                data={[evalPoint]}
                dataKey="y"
                fill="#EF4444"
                shape="circle"
                legendType="circle"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Grafica;
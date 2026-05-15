import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

import StepsTimeline from "./StepsTimeline";
import Grafica from "./Grafica";

function ResultadoCard({ resultado }) {

  return (

    <div className="mt-10 grid gap-8 xl:grid-cols-2">

      {/* LEFT */}
      <div className="space-y-8">

        {/* Polinomio */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-8">

            <span className="text-sm font-medium text-blue-600">
              Resultado
            </span>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Polinomio Interpolante
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Expresión matemática final obtenida mediante el método seleccionado.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 overflow-auto">

            <div className="text-slate-800">
              <BlockMath math={resultado.latex} />
            </div>

          </div>

        </div>

        {/* Pasos */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-8">

            <span className="text-sm font-medium text-violet-600">
              Desarrollo Matemático
            </span>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Explicación Paso a Paso
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Desarrollo completo del procedimiento matemático.
            </p>

          </div>

          <StepsTimeline
            metodo={resultado.metodo}
            pasos={resultado.pasos}
          />

        </div>

      </div>

      {/* RIGHT */}
      <Grafica resultado={resultado} />

    </div>

  );
}

export default ResultadoCard;
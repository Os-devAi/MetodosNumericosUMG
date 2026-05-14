import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

import StepsTimeline from "./StepsTimeline";
import Grafica from "./Grafica";

function ResultadoCard({ resultado }) {

  return (
    <div className="mt-10 grid xl:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="bg-slate-950/70 border border-slate-800 rounded-[28px] p-8">
          <h2 className="text-3xl font-semibold mb-6 text-white">
            Polinomio Resultante
          </h2>
          <div className="bg-[#0e1320] rounded-3xl p-8 overflow-auto border border-slate-800">

            <BlockMath math={resultado.latex} />

          </div>

        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-[28px] p-8">
          <h2 className="text-3xl font-semibold mb-8 text-white">
            Explicación Paso a Paso
          </h2>
          <StepsTimeline metodo={resultado.metodo} pasos={resultado.pasos} />
        </div>

      </div>

      {/* RIGHT */}
      <Grafica resultado={resultado} />

    </div>
  );
}

export default ResultadoCard;
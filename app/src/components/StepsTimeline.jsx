import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

function StepsTimeline({ metodo, pasos }) {

  // =========================================
  // LAGRANGE
  // =========================================

  if (metodo === "lagrange") {

    return (

      <div className="space-y-8">

        {pasos.map((paso, index) => (

          <div
            key={index}
            className="relative pl-10"
          >

            {/* Line */}
            {index !== pasos.length - 1 && (

              <div className="
                absolute
                left-[11px]
                top-8
                h-full
                w-[2px]
                bg-slate-200
              "></div>

            )}

            {/* Dot */}
            <div className="
              absolute
              left-0
              top-1
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-xs
              font-semibold
              text-white
              shadow-sm
            ">

              {index + 1}

            </div>

            {/* Content */}
            <div className="
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              p-6
            ">

              <div className="mb-5">

                <h3 className="
                  text-xl
                  font-semibold
                  tracking-tight
                  text-slate-900
                ">

                  Polinomio {paso.termino}

                </h3>

                <p className="
                  mt-2
                  text-sm
                  leading-7
                  text-slate-500
                ">

                  Construcción del polinomio base de Lagrange
                  utilizando los puntos dados.

                </p>

              </div>

              {/* Formula */}
              <div className="
                overflow-auto
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
              ">

                <div className="text-slate-800">

                  <BlockMath math={paso.valor} />

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    );

  }

  // =========================================
  // NEWTON Y NEVILLE
  // =========================================

  return (

    <div className="space-y-6">

      {pasos.map((fila, i) => (

        <div
          key={i}
          className="
            rounded-3xl
            border
            border-slate-200
            bg-slate-50
            p-6
          "
        >

          {/* Header */}
          <div className="mb-5">

            <span className="
              text-sm
              font-medium
              text-violet-600
            ">

              Iteración {i + 1}

            </span>

            <h3 className="
              mt-2
              text-xl
              font-semibold
              tracking-tight
              text-slate-900
            ">

              Desarrollo del cálculo

            </h3>

          </div>

          {/* Values */}
          <div className="flex flex-wrap gap-3">

            {Array.isArray(fila) ? (

              fila.map((valor, j) => (

                <div
                  key={j}
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-slate-700
                    shadow-sm
                  "
                >

                  {String(valor)}

                </div>

              ))

            ) : (

              <div className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                text-slate-700
                shadow-sm
              ">

                {String(fila)}

              </div>

            )}

          </div>

        </div>

      ))}

    </div>

  );

}

export default StepsTimeline;
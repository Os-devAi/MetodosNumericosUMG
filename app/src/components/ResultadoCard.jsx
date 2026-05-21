import { useState, useEffect } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

import StepsTimeline from "./StepsTimeline";
import { evaluatePolynomial } from "../utils/mathEvaluator";

function ResultadoCard({ resultado, setEvalPoint }) {
  const [xEval, setXEval] = useState("");
  const [yEval, setYEval] = useState(null);

  useEffect(() => {
    setXEval("");
    setYEval(null);
    if (setEvalPoint) {
      setEvalPoint(null);
    }
  }, [resultado, setEvalPoint]);

  const handleXEvalChange = (e) => {
    const value = e.target.value;
    setXEval(value);

    const parsedX = parseFloat(value);
    if (value.trim() !== "" && !isNaN(Number(value))) {
      const result = evaluatePolynomial(resultado.polinomio, parsedX);
      setYEval(result);
      if (result !== null && setEvalPoint) {
        setEvalPoint({ x: parsedX, y: result });
      } else if (setEvalPoint) {
        setEvalPoint(null);
      }
    } else {
      setYEval(null);
      if (setEvalPoint) {
        setEvalPoint(null);
      }
    }
  };

  const formatResult = (val) => {
    if (val === null) return "";
    if (val % 1 === 0) return val.toString();
    return parseFloat(val.toFixed(6)).toString();
  };

  return (

    <div className="mt-10 space-y-8">

      <div className="space-y-8">

        {/* Polinomio */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-8">

            <span className="text-sm font-medium text-[#050919]">
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

          <div className="mt-8 pt-8 border-t border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900">
              Evaluar Polinomio
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Evalúa la función interpolada en cualquier valor de X.
            </p>

            <div className="mt-6 flex flex-col md:flex-row md:items-center gap-6">
              {/* Input de X */}
              <div className="w-full md:w-64">
                <label htmlFor="eval-x-input" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Valor de X
                </label>
                <div className="relative">
                  <input
                    id="eval-x-input"
                    type="text"
                    value={xEval}
                    onChange={handleXEvalChange}
                    placeholder="Ej. 2.5"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-slate-300
                      bg-slate-50
                      pl-4
                      pr-10
                      py-4
                      text-slate-700
                      placeholder:text-slate-400
                      outline-none
                      transition
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                  {xEval && (
                    <button
                      onClick={() => {
                        setXEval("");
                        setYEval(null);
                        if (setEvalPoint) {
                          setEvalPoint(null);
                        }
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      title="Limpiar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Resultado de la evaluación */}
              <div className="flex-1 rounded-2xl bg-blue-50/50 border border-blue-100 p-5 flex flex-col justify-center min-h-[88px]">
                <span className="text-xs font-medium text-[#050919] uppercase tracking-wider mb-1">
                  Resultado P(X)
                </span>
                <div className="overflow-auto py-1">
                  {xEval.trim() !== "" && !isNaN(Number(xEval)) && yEval !== null ? (
                    <div className="text-slate-800 font-medium">
                      <BlockMath math={`P\\left(${xEval}\\right) = ${resultado.latex.replace(/\bx\b/g, `\\left(${xEval}\\right)`)} = ${formatResult(yEval)}`} />
                    </div>
                  ) : (
                    <span className="text-sm text-slate-500 italic">
                      {xEval.trim() === "" 
                        ? "Ingresa un valor de X para evaluar el polinomio." 
                        : "Ingresa un número válido para evaluar."}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Pasos */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-8">

            <span className="text-sm font-medium text-[#050919]">
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

      {/* <Grafica resultado={resultado} /> */}

    </div>

  );
}

export default ResultadoCard;
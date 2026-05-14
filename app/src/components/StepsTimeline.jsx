import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

function StepsTimeline({ metodo, pasos }) {

    // =========================================
    // LAGRANGE
    // =========================================

    if (metodo === "lagrange") {

        return (

            <div className="space-y-6">

                {pasos.map((paso, index) => (

                    <div
                        key={index}
                        className="relative pl-10 border-l border-slate-700"
                    >

                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-500"></div>

                        <div className="bg-[#0b111a] rounded-2xl p-6 border border-slate-800">

                            <h3 className="text-xl font-semibold text-slate-100 mb-4">
                                Polinomio {paso.termino}
                            </h3>

                            <p className="text-slate-400 mb-4">
                                Construcción del polinomio base de Lagrange.
                            </p>

                            <div className="bg-slate-950 rounded-2xl p-6 overflow-auto border border-slate-800">

                                <BlockMath math={paso.valor} />

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

        <div className="space-y-5">

            {pasos.map((fila, i) => (

                <div
                    key={i}
                    className="bg-[#0b111a] border border-slate-800 rounded-2xl p-5"
                >

                    <h3 className="text-lg font-semibold text-slate-100 mb-4">
                        Iteración {i + 1}
                    </h3>

                    <div className="flex flex-wrap gap-3">

                        {Array.isArray(fila) ? (

                            fila.map((valor, j) => (

                                <div
                                    key={j}
                                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200"
                                >

                                    {String(valor)}

                                </div>

                            ))

                        ) : (

                            <div className="bg-slate-950 rounded-xl p-4 text-slate-200">
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
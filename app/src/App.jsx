import { useState } from "react";

import MetodoForm from "./components/MetodoForm";
import ResultadoCard from "./components/ResultadoCard";

function App() {

  const [resultado, setResultado] = useState(null);

  return (
    <div className="min-h-screen bg-[#0d121a] text-slate-100">
      <div className="relative z-10">
        <nav className="border-b border-white/10">
          <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                NumériX
              </h1>
              <div className="mt-1 text-sm text-slate-400">
                Métodos Numéricos • UMG 2026
              </div>
            </div>
          </div>
        </nav>

        <section className="container mx-auto px-6 pt-16 pb-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950/50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              Interpolación Numérica
            </span>
            <h1 className="mt-8 text-5xl font-semibold leading-tight text-white">
              Métodos Numéricos Visuales e Interactivos
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Resuelve problemas de interpolación con explicaciones paso a paso y gráficas claras, en un entorno sobrio y enfocado.
            </p>
          </div>
        </section>

        <main className="container mx-auto px-6 pb-20">

          <MetodoForm setResultado={setResultado} />

          {resultado && (
            <ResultadoCard resultado={resultado} />
          )}

        </main>

      </div>

    </div>
  );
}

export default App;
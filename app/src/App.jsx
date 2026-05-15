import { useState } from "react";

import MetodoForm from "./components/MetodoForm";
import ResultadoCard from "./components/ResultadoCard";

function App() {

  const [resultado, setResultado] = useState(null);

  return (

    <div className="min-h-screen bg-[#F5F7FB] text-slate-800">

      {/* Background decorativo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-40"></div>

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-100 rounded-full blur-3xl opacity-40"></div>

      </div>

      <div className="relative z-10">

        {/* Navbar */}
        <nav className="backdrop-blur-xl bg-white/70 border-b border-slate-200 sticky top-0 z-50">

          <div className="container mx-auto px-6 py-5 flex items-center justify-between">

            <div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                NumériX
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Métodos Numéricos • UMG 2026
              </p>

            </div>

          </div>

        </nav>

        {/* Hero */}
        <section className="container mx-auto px-6 pt-16 pb-10">

          <div className="max-w-3xl">

            <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium tracking-wide text-slate-500 shadow-sm">
              Interpolación Numérica
            </span>

            <h1 className="mt-6 text-5xl font-bold tracking-tight leading-tight text-slate-900">

              Métodos Numéricos
              <span className="block text-blue-600">
                visuales y prácticos
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">

              Calcula polinomios de interpolación utilizando los métodos de
              Lagrange, Newton y Neville con visualización gráfica
              y explicación paso a paso.

            </p>

          </div>

        </section>

        {/* Main */}
        <main className="container mx-auto px-6 pb-24">

          <div className="space-y-10">

            <MetodoForm setResultado={setResultado} />

            {resultado && (
              <ResultadoCard resultado={resultado} />
            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default App;
function TablaPasos({ pasos }) {

  return (
    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Pasos
      </h2>

      <div className="max-h-[300px] overflow-auto rounded-2xl border border-slate-800">

        <pre className="p-4 text-sm text-cyan-300">
          {JSON.stringify(pasos, null, 2)}
        </pre>

      </div>
    </div>
  );
}

export default TablaPasos;
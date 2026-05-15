import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

function StepsTimeline({ metodo, pasos }) {
  const renderFormula = (formula) => {
    if (!formula) return null;
    return (
      <div className="overflow-auto rounded-2xl border border-slate-200 bg-white p-6">
        <div className="text-slate-800">
          <BlockMath math={formula} />
        </div>
      </div>
    );
  };

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, idx) => (
            <span
              key={idx}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
            >
              {String(item)}
            </span>
          ))}
        </div>
      );
    }

    return (
      <span className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
        {String(value)}
      </span>
    );
  };

  const renderField = (label, value) => {
    if (value == null) return null;

    const isLatex = typeof value === "string" && value.includes("\\");

    return (
      <div className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {isLatex ? (
          <div className="overflow-auto rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-slate-800">
              <BlockMath math={value} />
            </div>
          </div>
        ) : typeof value === "string" || typeof value === "number" ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {String(value)}
          </div>
        ) : (
          renderValue(value)
        )}
      </div>
    );
  };

  const renderOperations = (operations) => {
    if (!Array.isArray(operations) || operations.length === 0) {
      return null;
    }

    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5">
        <span className="text-sm font-medium text-slate-700">Operaciones</span>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          {operations.map((op, idx) => {
            const isLatexOp = typeof op === "string" && op.includes("\\");
            return (
              <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                {isLatexOp ? (
                  <BlockMath math={op} />
                ) : (
                  <span>{op}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLagrangeStep = (paso, index) => (
    <div key={index} className="relative pl-10">
      {index !== pasos.length - 1 && (
        <div className="absolute left-[11px] top-8 h-full w-[2px] bg-slate-200"></div>
      )}

      <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white shadow-sm">
        {index + 1}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <div className="mb-5">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            {paso.titulo || `Paso ${index + 1}`}
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            {paso.descripcion || "Detalle del cálculo de Lagrange."}
          </p>
        </div>

        {renderField("Fórmula general", paso.formula_general)}

        {paso.factores && paso.factores.length > 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <span className="text-sm font-medium text-slate-700">Factores usados</span>
            <div className="mt-4 space-y-3">
              {paso.factores.map((factor, factorIndex) => (
                <div key={factorIndex} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
                  <div className="font-semibold text-slate-800">Factor {factorIndex + 1}</div>
                  <div className="mt-1">Numerador: <span className="font-medium">{factor.numerador}</span></div>
                  <div>Denominador: <span className="font-medium">{factor.denominador}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {renderField("Polinomio base sin simplificar", paso.formula_sin_simplificar)}
          {renderField("Polinomio base simplificado", paso.formula_simplificada)}
        </div>

        {renderField("Término multiplicado", paso.termino_multiplicado)}
        {renderField("Valor de Y", paso.valor_y)}
        {renderOperations(paso.operaciones)}
      </div>
    </div>
  );

  const renderNewtonNevilleStep = (paso, index) => (
    <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <div className="mb-5">
        <span className="text-sm font-medium text-violet-600">Paso {index + 1}</span>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
          {paso.titulo || "Desarrollo del cálculo"}
        </h3>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          {paso.descripcion || "Detalle de las operaciones realizadas."}
        </p>
      </div>

      {renderField("Fórmula general", paso.formula_general)}
      {renderField("Numerador", paso.numerador)}
      {renderField("Denominador", paso.denominador)}
      {renderField("Resultado", paso.resultado)}
      {renderField("Fórmula resultante", paso.formula)}
      {renderOperations(paso.operaciones)}
    </div>
  );

  if (metodo === "lagrange") {
    return <div className="space-y-8">{pasos.map(renderLagrangeStep)}</div>;
  }

  return <div className="space-y-6">{pasos.map(renderNewtonNevilleStep)}</div>;
}

export default StepsTimeline;

function TablaPasos({ pasos }) {

  return (

    <div className="mt-8">

      {/* Header */}
      <div className="mb-6">

        <span className="text-sm font-medium text-blue-600">
          Procedimiento
        </span>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Tabla de Iteraciones
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-500">
          Valores generados durante el desarrollo del método numérico.
        </p>

      </div>

      {/* Table */}
      <div className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      ">

        <div className="overflow-x-auto">

          <table className="min-w-full divide-y divide-slate-200">

            <thead className="bg-slate-50">

              <tr>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  text-slate-700
                ">
                  Iteración
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  text-slate-700
                ">
                  Valores
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">

              {pasos.map((fila, index) => (

                <tr
                  key={index}
                  className="hover:bg-slate-50 transition-colors"
                >

                  {/* Iteration */}
                  <td className="
                    whitespace-nowrap
                    px-6
                    py-5
                    text-sm
                    font-medium
                    text-slate-900
                  ">

                    Paso {index + 1}

                  </td>

                  {/* Values */}
                  <td className="px-6 py-5">

                    <div className="flex flex-wrap gap-2">

                      {Array.isArray(fila) ? (

                        fila.map((valor, i) => (

                          <span
                            key={i}
                            className="
                              rounded-xl
                              border
                              border-slate-200
                              bg-slate-50
                              px-3
                              py-2
                              text-sm
                              text-slate-700
                            "
                          >

                            {String(valor)}

                          </span>

                        ))

                      ) : (

                        <span className="
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          px-3
                          py-2
                          text-sm
                          text-slate-700
                        ">

                          {String(fila)}

                        </span>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default TablaPasos;
import { useState } from "react";
import { api } from "../services/api";

function MetodoForm({ setResultado }) {

  const [metodo, setMetodo] = useState("lagrange");

  const [x, setX] = useState("1,2,3");

  const [y, setY] = useState("2,4,8");

  const [loading, setLoading] = useState(false);

  const resetear = () => {

    setMetodo("lagrange");
    setX("1,2,3");
    setY("2,4,8");
    setResultado(null);

  };

  const enviar = async () => {

    try {

      setLoading(true);

      const puntos_x = x.split(",").map(Number);

      const puntos_y = y.split(",").map(Number);

      const res = await api.post(`/resolver/${metodo}`, {
        puntos_x,
        puntos_y,
      });

      setResultado(res.data);

    } catch (error) {

      alert(error.response?.data?.detail || "Ocurrió un error");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}
      <div className="mb-8">

        <span className="text-sm font-medium text-[#050919]">
          Configuración
        </span>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Resolver Interpolación
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Ingresa los puntos del problema y selecciona el método numérico
          que deseas utilizar.
        </p>

      </div>

      {/* Form */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Método */}
        <div>

          <label className="mb-3 block text-sm font-medium text-slate-700">
            Método
          </label>

          <select
            value={metodo}
            onChange={(e) => setMetodo(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              bg-slate-50
              px-4
              py-4
              text-slate-700
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          >
            <option value="lagrange">
              Lagrange
            </option>

            <option value="newton">
              Newton
            </option>

            <option value="neville">
              Neville
            </option>

          </select>

        </div>

        {/* X */}
        <div>

          <label className="mb-3 block text-sm font-medium text-slate-700">
            Valores de X
          </label>

          <input
            type="text"
            value={x}
            onChange={(e) => setX(e.target.value)}
            placeholder="1,2,3"
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              bg-slate-50
              px-4
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

        </div>

        {/* Y */}
        <div>

          <label className="mb-3 block text-sm font-medium text-slate-700">
            Valores de Y
          </label>

          <input
            type="text"
            value={y}
            onChange={(e) => setY(e.target.value)}
            placeholder="2,4,8"
            className="
              w-full
              rounded-2xl
              border
              border-slate-300
              bg-slate-50
              px-4
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

        </div>

      </div>

      {/* Example*/}
      <div className="mt-8 flex items-center justify-between">

        <div className="text-sm text-slate-400">
          Ejemplo:
          <span className="ml-2 font-medium text-slate-600">
            X = 1,2,3 | Y = 2,4,8
          </span>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={resetear}
            className="
            rounded-2xl
            bg-[#050919]
            px-8
            py-4
            mr-4
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-red-700
            hover:shadow-lg
            hover:shadow-blue-100
            hover:scale-[1.02]
            hover:translate-y-[-2px]
            hover:cursor-pointer
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
          >

            Reiniciar

          </button>

          <button
            onClick={enviar}
            disabled={loading}
            className="
            rounded-2xl
            bg-[#050919]
            px-8
            py-4
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-red-700
            hover:shadow-lg
            hover:shadow-blue-100
            hover:scale-[1.02]
            hover:translate-y-[-2px]
            hover:cursor-pointer
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
          >

            {loading ? "Resolviendo..." : "Resolver Método"}

          </button>
        </div>

      </div>

    </div>
  );
}

export default MetodoForm;
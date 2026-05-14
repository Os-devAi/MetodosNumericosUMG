import { useState } from "react";
import { api } from "../services/api";

function MetodoForm({ setResultado }) {

  const [metodo, setMetodo] = useState("lagrange");

  const [x, setX] = useState("1,2,3");
  const [y, setY] = useState("2,4,8");

  const [loading, setLoading] = useState(false);

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

      alert(error.response?.data?.detail);

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-[28px] p-8 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">

      <div className="grid lg:grid-cols-3 gap-5">

        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Método
          </label>

          <select
            value={metodo}
            onChange={(e) => setMetodo(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-slate-600"
          >
            <option value="lagrange">Lagrange</option>
            <option value="newton">Newton</option>
            <option value="neville">Neville</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Valores de X
          </label>

          <input
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl p-4"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Valores de Y
          </label>

          <input
            value={y}
            onChange={(e) => setY(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl p-4"
          />
        </div>

      </div>

      <button
        onClick={enviar}
        disabled={loading}
        className="mt-8 w-full py-5 rounded-2xl bg-slate-100 text-slate-950 font-semibold text-lg hover:bg-slate-200 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Resolviendo..." : "Resolver Método"}
      </button>

    </div>
  );
}

export default MetodoForm;
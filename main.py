from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import sympy as sp
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API de Métodos Numéricos - UMG 2026")

# Permitir que React se conecte a Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PuntosInput(BaseModel):
    puntos_x: List[float]
    puntos_y: List[float]

def generar_datos_grafica(polinomio_sym, x_min, x_max):
    """Genera 100 puntos entre el mínimo y máximo para la curva de React"""
    x_vars = sp.symbols('x')
    f_np = sp.lambdify(x_vars, polinomio_sym, 'numpy')
    
    margin = (x_max - x_min) * 0.2 if x_max != x_min else 1
    x_vals = np.linspace(x_min - margin, x_max + margin, 100)
    y_vals = f_np(x_vals)
    
    return [{"x": float(xi), "y": float(yi)} for xi, yi in zip(x_vals, y_vals)]

@app.post("/resolver/{metodo}")
async def resolver(metodo: str, data: PuntosInput):
    # Validación de seguridad: No X repetidas
    if len(data.puntos_x) != len(set(data.puntos_x)):
        raise HTTPException(status_code=400, detail="Existen valores de X duplicados")

    x = sp.symbols('x')
    n = len(data.puntos_x)
    px, py = data.puntos_x, data.puntos_y
    pasos = []
    resultado_sym = None

    # --- LÓGICA DE LAGRANGE ---
    if metodo == "lagrange":
        polinomio_final = 0
        for i in range(n):
            li = 1
            for j in range(n):
                if i != j:
                    li *= (x - px[j]) / (px[i] - px[j])
            termino = py[i] * li
            polinomio_final += termino
            pasos.append({"termino": f"L_{i}", "valor": str(sp.simplify(li))})
        resultado_sym = sp.expand(polinomio_final)

    # --- LÓGICA DE NEVILLE ---
    elif metodo == "neville":
        tabla = [[None for _ in range(n)] for _ in range(n)]
        for i in range(n):
            tabla[i][0] = sp.Rational(str(py[i]))
        
        for j in range(1, n):
            for i in range(j, n):
                den = px[i] - px[i-j]
                num = (x - px[i-j]) * tabla[i][j-1] - (x - px[i]) * tabla[i-1][j-1]
                tabla[i][j] = sp.simplify(num / den)
        
        resultado_sym = sp.expand(tabla[n-1][n-1])
        pasos = [[str(val) if val else "-" for val in fila] for fila in tabla]

    # --- LÓGICA DE NEWTON ---
    elif metodo == "newton":
        tabla_diff = np.zeros((n, n))
        tabla_diff[:, 0] = py
        for j in range(1, n):
            for i in range(n - j):
                tabla_diff[i][j] = (tabla_diff[i+1][j-1] - tabla_diff[i][j-1]) / (px[i+j] - px[i])
        
        pol_newton = tabla_diff[0][0]
        acumulado = 1
        for i in range(1, n):
            acumulado *= (x - px[i-1])
            pol_newton += tabla_diff[0][i] * acumulado
        
        resultado_sym = sp.expand(pol_newton)
        pasos = tabla_diff.tolist()

    else:
        raise HTTPException(status_code=404, detail="Método no encontrado")

    # Respuesta unificada para React
    return {
        "metodo": metodo,
        "polinomio": str(resultado_sym),
        "latex": sp.latex(resultado_sym),
        "pasos": pasos,
        "grafica": generar_datos_grafica(resultado_sym, min(px), max(px)),
        "puntos_originales": [{"x": xi, "y": yi} for xi, yi in zip(px, py)]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
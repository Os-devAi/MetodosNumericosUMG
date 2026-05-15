from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import sympy as sp
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="API de Métodos Numéricos - UMG 2026"
)

# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# MODELOS
# =========================================================

class PuntosInput(BaseModel):
    puntos_x: List[float]
    puntos_y: List[float]

# =========================================================
# GENERAR DATOS PARA LA GRÁFICA
# =========================================================

def generar_datos_grafica(polinomio_sym, x_min, x_max):

    x_vars = sp.symbols('x')

    f_np = sp.lambdify(x_vars, polinomio_sym, 'numpy')

    margin = (x_max - x_min) * 0.2 if x_max != x_min else 1

    x_vals = np.linspace(
        x_min - margin,
        x_max + margin,
        200
    )

    y_vals = f_np(x_vals)

    datos = []

    for xi, yi in zip(x_vals, y_vals):

        try:

            datos.append({
                "x": float(xi),
                "y": float(yi)
            })

        except:
            pass

    return datos

# =========================================================
# ENDPOINT PRINCIPAL
# =========================================================

@app.post("/resolver/{metodo}")
async def resolver(metodo: str, data: PuntosInput):

    # =====================================================
    # VALIDACIONES
    # =====================================================

    if len(data.puntos_x) != len(data.puntos_y):

        raise HTTPException(
            status_code=400,
            detail="La cantidad de valores X y Y debe coincidir"
        )

    if len(data.puntos_x) != len(set(data.puntos_x)):

        raise HTTPException(
            status_code=400,
            detail="Existen valores de X duplicados"
        )

    # =====================================================
    # VARIABLES
    # =====================================================

    x = sp.symbols('x')

    n = len(data.puntos_x)

    px = data.puntos_x
    py = data.puntos_y

    pasos = []

    resultado_sym = None

    # =====================================================
    # MÉTODO DE LAGRANGE
    # =====================================================

    if metodo == "lagrange":

        polinomio_final = 0

        for i in range(n):

            li = 1

            factores = []

            for j in range(n):

                if i != j:

                    factor = (
                        (x - px[j])
                        /
                        (px[i] - px[j])
                    )

                    factores.append({
                        "numerador": f"(x - {px[j]})",
                        "denominador": f"({px[i]} - {px[j]})"
                    })

                    li *= factor

            termino = py[i] * li

            polinomio_final += termino

            pasos.append({

                "tipo": "lagrange",

                "paso": i + 1,

                "titulo":
                    f"Construcción de L_{i}(x)",

                "descripcion":
                    f"Se construye el polinomio base "
                    f"L_{i}(x) utilizando todos "
                    f"los puntos excepto x{i}.",

                "formula_general":
                    r"L_i(x)=\prod_{j \neq i}\frac{x-x_j}{x_i-x_j}",

                "factores":
                    factores,

                "formula_sin_simplificar":
                    sp.latex(li),

                "formula_simplificada":
                    sp.latex(sp.simplify(li)),

                "termino_multiplicado":
                    sp.latex(termino),

                "valor_y":
                    py[i]
            })

        resultado_sym = sp.expand(polinomio_final)

    # =====================================================
    # MÉTODO DE NEVILLE
    # =====================================================

    elif metodo == "neville":

        tabla = [[None for _ in range(n)] for _ in range(n)]

        for i in range(n):

            tabla[i][0] = sp.Rational(str(py[i]))

        contador = 1

        for j in range(1, n):

            for i in range(j, n):

                den = px[i] - px[i-j]

                num = (
                    (x - px[i-j]) * tabla[i][j-1]
                    -
                    (x - px[i]) * tabla[i-1][j-1]
                )

                resultado = sp.simplify(num / den)

                tabla[i][j] = resultado

                pasos.append({

                    "tipo": "neville",

                    "paso": contador,

                    "titulo":
                        f"Interpolación P[{i-j},{i}]",

                    "descripcion":
                        "Se aplica la fórmula recursiva "
                        "de Neville para construir "
                        "una interpolación más precisa.",

                    "formula_general":
                        r"P_{i,j}(x)=\frac{(x-x_i)P_{i+1,j}(x)-(x-x_j)P_{i,j-1}(x)}{x_j-x_i}",

                    "numerador":
                        sp.latex(num),

                    "denominador":
                        str(den),

                    "resultado":
                        sp.latex(resultado)
                })

                contador += 1

        resultado_sym = sp.expand(tabla[n-1][n-1])

    # =====================================================
    # MÉTODO DE NEWTON
    # =====================================================

    elif metodo == "newton":

        tabla_diff = np.zeros((n, n))

        tabla_diff[:, 0] = py

        contador = 1

        # -------------------------------------------------
        # DIFERENCIAS DIVIDIDAS
        # -------------------------------------------------

        for j in range(1, n):

            for i in range(n - j):

                numerador = (
                    tabla_diff[i+1][j-1]
                    -
                    tabla_diff[i][j-1]
                )

                denominador = (
                    px[i+j]
                    -
                    px[i]
                )

                resultado = numerador / denominador

                tabla_diff[i][j] = resultado

                pasos.append({

                    "tipo": "newton",

                    "paso": contador,

                    "titulo":
                        f"Diferencia dividida f[{i},{i+j}]",

                    "descripcion":
                        "Se calcula una diferencia "
                        "dividida para construir "
                        "el polinomio de Newton.",

                    "formula_general":
                        r"f[x_i,\ldots,x_j]=\frac{f[x_{i+1},\ldots,x_j]-f[x_i,\ldots,x_{j-1}]}{x_j-x_i}",

                    "numerador":
                        float(numerador),

                    "denominador":
                        float(denominador),

                    "resultado":
                        float(resultado)
                })

                contador += 1

        # -------------------------------------------------
        # CONSTRUCCIÓN DEL POLINOMIO
        # -------------------------------------------------

        pol_newton = tabla_diff[0][0]

        acumulado = 1

        for i in range(1, n):

            acumulado *= (x - px[i-1])

            termino = tabla_diff[0][i] * acumulado

            pasos.append({

                "tipo": "newton_polinomio",

                "paso": contador,

                "titulo":
                    f"Término {i} del polinomio",

                "descripcion":
                    "Se agrega un nuevo término "
                    "al polinomio interpolante.",

                "formula":
                    sp.latex(sp.expand(termino))
            })

            pol_newton += termino

            contador += 1

        resultado_sym = sp.expand(pol_newton)

    # =====================================================
    # ERROR
    # =====================================================

    else:

        raise HTTPException(
            status_code=404,
            detail="Método no encontrado"
        )

    # =====================================================
    # RESPUESTA
    # =====================================================

    return {

        "metodo": metodo,

        "polinomio":
            str(resultado_sym),

        "latex":
            sp.latex(resultado_sym),

        "grado":
            int(sp.degree(resultado_sym)),

        "pasos":
            pasos,

        "grafica":
            generar_datos_grafica(
                resultado_sym,
                min(px),
                max(px)
            ),

        "puntos_originales": [
            {
                "x": float(xi),
                "y": float(yi)
            }
            for xi, yi in zip(px, py)
        ]
    }

# =========================================================
# MAIN
# =========================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True
    )
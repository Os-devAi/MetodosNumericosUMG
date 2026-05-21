/**
 * Evalúa una expresión polinomial en formato string de Python/Sympy (por ejemplo, "1.5*x**2 - 2.5*x + 3.0")
 * en un valor específico de x de manera segura y sin usar eval().
 * 
 * @param {string} expr - Expresión polinomial (de Sympy: str(resultado_sym))
 * @param {number} xVal - Valor numérico para evaluar x
 * @returns {number|null} El resultado de la evaluación o null si hay un error
 */
export function evaluatePolynomial(expr, xVal) {
  if (!expr) return null;

  // Limpiar espacios y normalizar
  let s = expr.replace(/\s+/g, '');
  
  // Reemplazar la variable 'x' con el valor numérico rodeado de paréntesis
  // Se usa \bx\b para asegurar que solo se reemplace la variable 'x' y no letras individuales de otras funciones si existieran.
  s = s.replace(/\bx\b/g, `(${xVal})`);

  // Tokenización: separar en números, operadores y paréntesis
  const tokens = [];
  let i = 0;
  
  while (i < s.length) {
    const c = s[i];
    
    // Paréntesis y operadores simples de 1 caracter
    if (c === '(' || c === ')' || c === '+' || c === '-') {
      tokens.push(c);
      i++;
      continue;
    }
    
    // Exponente o multiplicación
    if (c === '*') {
      if (s[i + 1] === '*') {
        tokens.push('**');
        i += 2;
      } else {
        tokens.push('*');
        i++;
      }
      continue;
    }
    
    // División
    if (c === '/') {
      tokens.push('/');
      i++;
      continue;
    }
    
    // Números enteros, decimales y con notación científica (ej: 1.23e-5)
    const remaining = s.substring(i);
    const match = remaining.match(/^[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/);
    if (match) {
      const numStr = match[0];
      tokens.push(parseFloat(numStr));
      i += numStr.length;
      continue;
    }
    
    // Si hay un caracter no reconocido, avanzamos para evitar ciclos infinitos
    i++;
  }

  // Analizador sintáctico descendente recursivo (Recursive Descent Parser)
  let tokenIdx = 0;
  
  function peek() {
    return tokens[tokenIdx];
  }
  
  function consume(expected) {
    if (peek() === expected) {
      tokenIdx++;
      return true;
    }
    return false;
  }
  
  function parseExpression() {
    let val = parseTerm();
    while (true) {
      if (consume('+')) {
        val += parseTerm();
      } else if (consume('-')) {
        val -= parseTerm();
      } else {
        break;
      }
    }
    return val;
  }
  
  function parseTerm() {
    let val = parsePower();
    while (true) {
      if (consume('*')) {
        val *= parsePower();
      } else if (consume('/')) {
        val /= parsePower();
      } else {
        break;
      }
    }
    return val;
  }

  function parsePower() {
    let val = parseFactor();
    if (consume('**')) {
      val = Math.pow(val, parsePower());
    }
    return val;
  }
  
  function parseFactor() {
    const t = peek();
    
    if (typeof t === 'number') {
      tokenIdx++;
      return t;
    }
    
    if (consume('-')) {
      return -parseFactor();
    }
    
    if (consume('+')) {
      return parseFactor();
    }
    
    if (consume('(')) {
      const val = parseExpression();
      consume(')');
      return val;
    }
    
    return 0; // valor por defecto
  }

  try {
    const result = parseExpression();
    return isNaN(result) ? null : result;
  } catch (err) {
    console.error("Error al evaluar el polinomio:", err);
    return null;
  }
}

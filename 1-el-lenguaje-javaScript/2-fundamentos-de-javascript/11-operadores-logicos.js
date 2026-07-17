/*==============================================================================
    OPERADORES LÓGICOS
==============================================================================*/

/*
Los operadores lógicos permiten combinar o invertir condiciones.

JavaScript tiene cuatro operadores lógicos:

||  OR (O)

&&  AND (Y)

!   NOT (NO)

??  Nullish Coalescing (se estudia por separado)

IMPORTANTE

Aunque se llaman operadores lógicos, pueden trabajar con valores de
cualquier tipo, no solo booleanos.
*/

/*==============================================================================
    OPERADOR OR (||)
==============================================================================*/

/*
¿Qué hace?

Devuelve true si al menos uno de los operandos es verdadero.

Sintaxis:

condición1 || condición2
*/

/*
Tabla de verdad

true  || true   -> true

true  || false  -> true

false || true   -> true

false || false  -> false
*/

/*
Ejemplos
*/

console.log(true || false);   // true

console.log(false || false);  // false

/*
Uso común

Comprobar si al menos una condición se cumple.
*/

let hour = 9;

if (hour < 10 || hour > 18) {
    console.log("La oficina está cerrada.");
}

/*------------------------------------------------------------------------------
    OR devuelve el primer valor truthy
------------------------------------------------------------------------------*/

/*
Además de trabajar con booleanos, || devuelve el primer valor truthy
que encuentre.

Si todos los valores son falsy, devuelve el último.
*/

console.log(1 || 0);                   // 1

console.log(null || 5);                // 5

console.log(null || 0 || "Hola");      // "Hola"

console.log(undefined || null || 0);   // 0

/*
Esto permite asignar valores por defecto.
*/

let firstName = "";
let lastName = "";
let nickName = "SuperCoder";

console.log(firstName || lastName || nickName || "Anónimo");

/*------------------------------------------------------------------------------
    Cortocircuito (Short-Circuit)
------------------------------------------------------------------------------*/

/*
OR deja de evaluar cuando encuentra el primer valor truthy.

Todo lo que esté a la derecha ya no se ejecuta.
*/

true || console.log("No se ejecuta");

false || console.log("Sí se ejecuta");

/*==============================================================================
    OPERADOR AND (&&)
==============================================================================*/

/*
¿Qué hace?

Devuelve true únicamente cuando todas las condiciones son verdaderas.

Sintaxis:

condición1 && condición2
*/

/*
Tabla de verdad

true  && true   -> true

true  && false  -> false

false && true   -> false

false && false  -> false
*/

/*
Ejemplo
*/

let age = 20;
let hasLicense = true;

if (age >= 18 && hasLicense) {
    console.log("Puede conducir.");
}

/*------------------------------------------------------------------------------
    AND devuelve el primer valor falsy
------------------------------------------------------------------------------*/

/*
&& devuelve el primer valor falsy que encuentre.

Si todos son truthy, devuelve el último valor.
*/

console.log(1 && 5);             // 5

console.log(1 && 0);             // 0

console.log(null && 5);          // null

console.log(1 && 2 && 3);        // 3

console.log(1 && 2 && null);     // null

/*------------------------------------------------------------------------------
    Cortocircuito
------------------------------------------------------------------------------*/

/*
AND deja de evaluar cuando encuentra el primer valor falsy.
*/

false && console.log("No se ejecuta");

true && console.log("Sí se ejecuta");

/*==============================================================================
    PRECEDENCIA
==============================================================================*/

/*
El operador && tiene mayor prioridad que ||.

Ejemplo:

true || false && false

equivale a:

true || (false && false)
*/

/*
Si existen dudas, utiliza paréntesis.
*/

console.log((true || false) && false);

/*==============================================================================
    OPERADOR NOT (!)
==============================================================================*/

/*
¿Qué hace?

Invierte un valor booleano.

Sintaxis:

!valor
*/

console.log(!true);   // false

console.log(!false);  // true

console.log(!0);      // true

console.log(!1);      // false

/*------------------------------------------------------------------------------
    Doble negación (!!)
------------------------------------------------------------------------------*/

/*
La doble negación convierte cualquier valor en booleano.

Es equivalente a Boolean().
*/

console.log(!!"Hola");     // true

console.log(!!"");         // false

console.log(!!0);          // false

console.log(!!100);        // true

console.log(Boolean("Hola")); // true

console.log(Boolean(null));   // false

/*==============================================================================
    ¿IF O &&?
==============================================================================*/

/*
Aunque técnicamente es posible usar && para ejecutar código:

condición && hacerAlgo();

No es recomendable.

Es mucho más legible utilizar if.
*/

let x = 5;

if (x > 0) {
    console.log("Mayor que cero");
}

/*
Evita escribir:

x > 0 && console.log("Mayor que cero");
*/
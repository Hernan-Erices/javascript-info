/*==============================================================================
    EJECUCIÓN CONDICIONAL
    if, else, else if y operador ternario (?)
==============================================================================*/

/*
Muchas veces necesitamos que el programa tome decisiones.

Dependiendo de si una condición es verdadera o falsa, JavaScript puede
ejecutar un bloque de código diferente.

Para ello existen:

- if
- else
- else if
- Operador ternario (?)
*/

/*==============================================================================
    SENTENCIA IF
==============================================================================*/

/*
¿Qué hace?

Ejecuta un bloque de código únicamente si una condición es verdadera.

Sintaxis:

if (condición) {
    // código
}
*/

let year = prompt("¿En qué año se publicó ECMAScript 2015?");

if (year == 2015) {
    console.log("¡Correcto!");
}

/*
Si la condición es false, el bloque no se ejecuta.
*/

/*
Siempre es recomendable utilizar llaves {}, incluso cuando el bloque
contiene una sola instrucción, ya que mejora la legibilidad del código.
*/

/*==============================================================================
    CONVERSIÓN A BOOLEAN
==============================================================================*/

/*
La condición del if siempre se convierte a un valor booleano.

Valores falsy:

false
0
-0
0n
""
null
undefined
NaN

Todos los demás valores son truthy.
*/

if (1) {
    console.log("Este código siempre se ejecuta.");
}

if (0) {
    console.log("Este código nunca se ejecuta.");
}

/*
También podemos guardar el resultado de una comparación en una variable.
*/

let age = 20;

let isAdult = age >= 18;

if (isAdult) {
    console.log("Es mayor de edad.");
}

/*==============================================================================
    ELSE
==============================================================================*/

/*
¿Qué hace?

Permite ejecutar un bloque cuando la condición del if es falsa.

Sintaxis:

if (condición) {

} else {

}
*/

let password = "1234";

if (password === "admin") {
    console.log("Acceso permitido.");
} else {
    console.log("Acceso denegado.");
}

/*==============================================================================
    ELSE IF
==============================================================================*/

/*
Se utiliza cuando existen varias condiciones posibles.

JavaScript evalúa las condiciones de arriba hacia abajo y ejecuta la
primera que sea verdadera.
*/

let score = 85;

if (score >= 90) {
    console.log("Excelente");
} else if (score >= 70) {
    console.log("Aprobado");
} else {
    console.log("Reprobado");
}

/*
Puede haber tantos bloques else if como sean necesarios.

El bloque else es opcional.
*/

/*==============================================================================
    OPERADOR TERNARIO (?)
==============================================================================*/

/*
El operador ternario permite devolver un valor dependiendo de una condición.

Sintaxis:

condición ? valorSiTrue : valorSiFalse
*/

/*
Ejemplo usando if...else
*/

let age2 = 20;

let accessAllowed;

if (age2 >= 18) {
    accessAllowed = true;
} else {
    accessAllowed = false;
}

console.log(accessAllowed);

/*
El mismo ejemplo utilizando el operador ternario.
*/

let accessAllowed2 = (age2 >= 18) ? true : false;

console.log(accessAllowed2);

/*
Como la comparación ya devuelve true o false, también puede escribirse así:
*/

let accessAllowed3 = age2 >= 18;

console.log(accessAllowed3);

/*==============================================================================
    TERNARIOS ANIDADOS
==============================================================================*/

/*
Es posible encadenar varios operadores ternarios, aunque un exceso puede
hacer que el código sea difícil de leer.
*/

let edad = 20;

let message =
    (edad < 3) ? "Hola, bebé." :
    (edad < 18) ? "Hola." :
    (edad < 100) ? "Bienvenido." :
    "Edad poco común.";

console.log(message);

/*
El mismo código usando if...else suele ser más fácil de entender.
*/

if (edad < 3) {
    message = "Hola, bebé.";
} else if (edad < 18) {
    message = "Hola.";
} else if (edad < 100) {
    message = "Bienvenido.";
} else {
    message = "Edad poco común.";
}

/*==============================================================================
    ¿IF O TERNARIO?
==============================================================================*/

/*
Usa if cuando:

- Debes ejecutar diferentes bloques de código.

- Hay varias instrucciones.

- Existen muchas condiciones.

Ejemplo:
*/

let company = "Netscape";

if (company === "Netscape") {
    console.log("Correcto.");
} else {
    console.log("Incorrecto.");
}

/*
Usa el operador ternario cuando:

- Solo necesitas devolver un valor.

Ejemplo:
*/

let color = (age2 >= 18) ? "verde" : "rojo";

/*
Evita usar el operador ternario para ejecutar grandes bloques de código,
ya que disminuye la legibilidad.
*/

/*==============================================================================
    RESUMEN
==============================================================================*/

/*
if

Ejecuta un bloque si una condición es verdadera.

----------------------------------------

else

Se ejecuta cuando la condición del if es falsa.

----------------------------------------

else if

Permite comprobar múltiples condiciones.

Solo se ejecuta la primera condición verdadera.

----------------------------------------

Operador ternario

condición ? valor1 : valor2

Devuelve un valor según una condición.

----------------------------------------

BUENAS PRÁCTICAS

- Usa llaves {} siempre en los bloques if.

- Utiliza if para ejecutar código.

- Utiliza el operador ternario únicamente para asignar o devolver valores.

- Evita anidar demasiados operadores ternarios porque dificultan la lectura.
*/

/*==============================================================================
    TIPOS DE DATOS EN JAVASCRIPT
==============================================================================*/

/*
En JavaScript un valor siempre tiene un tipo de dato.

Ejemplos:
- Número
- Cadena de texto (String)
- Booleano
- null
- undefined
- BigInt
- Symbol
- Object

JavaScript es un lenguaje de tipado dinámico, lo que significa que una misma
variable puede almacenar diferentes tipos de datos durante la ejecución.
*/

let message = "Hello";
message = 123456;

/*==============================================================================
    NUMBER
==============================================================================*/

/*
El tipo Number representa tanto números enteros como decimales.

Ejemplos:
*/

let entero = 123;
let decimal = 12.345;

/*
Operaciones básicas:
*/

console.log(5 + 2);
console.log(5 - 2);
console.log(5 * 2);
console.log(5 / 2);

/*--------------------------------------
    Valores especiales
--------------------------------------*/

/*
Infinity

Representa el infinito matemático.
Puede obtenerse al dividir un número entre cero.
*/

console.log(1 / 0);       // Infinity
console.log(Infinity);    // Infinity

/*
NaN (Not a Number)

Representa un error en un cálculo matemático.
*/

console.log("Hola" / 2); // NaN

/*
NaN es "pegajoso": cualquier operación matemática con NaN devuelve NaN.
*/

console.log(NaN + 1);          // NaN
console.log(3 * NaN);          // NaN
console.log("Hola" / 2 - 1);   // NaN

/*
JavaScript nunca genera un error fatal por una operación matemática.
En el peor de los casos devuelve NaN.
*/

/*==============================================================================
    BIGINT
==============================================================================*/

/*
Number solo puede representar enteros con precisión hasta:

±(2^53 - 1)

Número máximo seguro:
*/

console.log(Number.MAX_SAFE_INTEGER);

/*
Después de ese límite se pierde precisión.
*/

console.log(9007199254740991 + 1);
console.log(9007199254740991 + 2);

/*
Para trabajar con enteros extremadamente grandes existe BigInt.

Se crea agregando una "n" al final del número.
*/

const bigInt = 1234567890123456789012345678901234567890n;

/*==============================================================================
    STRING
==============================================================================*/

/*
Las cadenas de texto pueden escribirse con:

- Comillas dobles
- Comillas simples
- Backticks (`)

Los backticks permiten insertar variables y expresiones usando ${}.
*/

let str = "Hello";
let str2 = 'Hola';

let nombre = "John";

console.log(`Hola ${nombre}`);
console.log(`Resultado: ${1 + 2}`);

/*==============================================================================
    BOOLEAN
==============================================================================*/

/*
Solo existen dos valores:

true
false

Se utilizan para representar respuestas de sí o no.
*/

let nameFieldChecked = true;
let ageFieldChecked = false;

/*
También son el resultado de comparaciones.
*/

let isGreater = 4 > 1;

console.log(isGreater); // true

/*==============================================================================
    NULL
==============================================================================*/

/*
null representa:

- Nada
- Vacío
- Valor desconocido

No significa una referencia nula como en otros lenguajes.
*/

let age = null;

/*==============================================================================
    UNDEFINED
==============================================================================*/

/*
undefined significa:

"No se ha asignado ningún valor."

Una variable declarada pero sin valor tiene undefined automáticamente.
*/

let user;

console.log(user); // undefined

/*
Aunque es posible asignarlo manualmente, no es recomendable.
*/

let score = 100;

score = undefined;

console.log(score);

/*
Se recomienda usar:

null -> cuando queremos indicar que el valor está vacío.

undefined -> cuando una variable aún no ha recibido un valor.
*/

// ===============================
// Objetos (object) y Símbolos (symbol)
// ===============================

// Los objetos (object) almacenan colecciones de datos y estructuras más complejas.
// Los símbolos (symbol) crean identificadores únicos para los objetos.

// ===============================
// Operador typeof
// ===============================

// El operador 'typeof' devuelve el tipo de un valor en forma de cadena.
// Es útil para identificar el tipo de una variable.

// Ejemplos:
typeof 0;          // "number"
typeof "Hola";     // "string"
typeof true;       // "boolean"
typeof Symbol();   // "symbol"
typeof Math;       // "object"
typeof null;       // "object" -> Error histórico de JavaScript (null NO es un objeto)
typeof alert;      // "function"

// También puede escribirse como:
// typeof(valor)
// Pero la forma más utilizada es:
// typeof valor

// Nota: 'typeof' es un operador, no una función.
/*==============================================================================
    CONVERSIÓN DE TIPOS (TYPE CONVERSION)
==============================================================================*/

/*
JavaScript realiza conversiones de tipos de forma automática cuando es
necesario.

Por ejemplo:

- alert() convierte cualquier valor en una cadena de texto.
- Las operaciones matemáticas convierten los valores en números.

Sin embargo, también podemos realizar conversiones de forma explícita
utilizando funciones como:

- String()
- Number()
- Boolean()
*/

/*==============================================================================
    CONVERSIÓN A STRING
==============================================================================*/

/*
¿Qué hace?

Convierte cualquier valor a una cadena de texto (string).

Sintaxis:

String(valor)

Valor de retorno:

Devuelve un string.
*/

let value = true;

console.log(typeof value); // boolean

value = String(value);

console.log(typeof value); // string
console.log(value);        // "true"

/*
Ejemplos
*/

console.log(String(123));        // "123"
console.log(String(false));      // "false"
console.log(String(null));       // "null"
console.log(String(undefined));  // "undefined"

/*
NOTA

La conversión a string suele ser muy intuitiva: simplemente obtiene la
representación en texto del valor.
*/

/*==============================================================================
    CONVERSIÓN A NUMBER
==============================================================================*/

/*
¿Qué hace?

Convierte un valor a número.

Sintaxis:

Number(valor)

Valor de retorno:

Devuelve un número.

Si la conversión no es posible, devuelve NaN.
*/

/*
JavaScript también convierte automáticamente a número cuando realiza
operaciones matemáticas.
*/

console.log("6" / "2"); // 3

/*
Conversión explícita
*/

let str = "123";

console.log(typeof str); // string

let num = Number(str);

console.log(typeof num); // number
console.log(num);        // 123

/*
Si la cadena no representa un número válido, el resultado será NaN.
*/

let age = Number("Hola");

console.log(age); // NaN

/*------------------------------------------------------------------------------
    Reglas de conversión a Number
------------------------------------------------------------------------------*/

/*

Valor                Resultado

undefined ----------> NaN

null ---------------> 0

true ---------------> 1

false --------------> 0

"" -----------------> 0

"   " --------------> 0

"123" --------------> 123

"123abc" -----------> NaN

*/

/*
Ejemplos
*/

console.log(Number("   123   ")); // 123

console.log(Number("123abc"));    // NaN

console.log(Number(true));        // 1

console.log(Number(false));       // 0

console.log(Number(null));        // 0

console.log(Number(undefined));   // NaN

/*
IMPORTANTE

null y undefined no se comportan igual:

null       -> 0
undefined  -> NaN
*/

/*==============================================================================
    CONVERSIÓN A BOOLEAN
==============================================================================*/

/*
¿Qué hace?

Convierte un valor a true o false.

Sintaxis:

Boolean(valor)

Valor de retorno:

Devuelve un valor booleano.
*/

/*
Se utiliza frecuentemente en:

- Condiciones (if)
- Operadores lógicos
- Bucles
*/

/*------------------------------------------------------------------------------
    Valores que se convierten en false
------------------------------------------------------------------------------*/

/*

false

0

-0

0n

""

null

undefined

NaN

*/

/*
Todos los demás valores se convierten en true.
*/

/*
Ejemplos
*/

console.log(Boolean(1));          // true

console.log(Boolean(0));          // false

console.log(Boolean("Hola"));     // true

console.log(Boolean(""));         // false

console.log(Boolean(null));       // false

console.log(Boolean(undefined));  // false

console.log(Boolean(NaN));        // false

/*------------------------------------------------------------------------------
    Casos que suelen confundir
------------------------------------------------------------------------------*/

/*
La cadena "0" NO es false.

Como es una cadena que contiene caracteres, se considera verdadera.
*/

console.log(Boolean("0")); // true

/*
Lo mismo ocurre con una cadena que solo contiene espacios.
*/

console.log(Boolean(" ")); // true

/*
Cualquier string que no esté vacío se convierte en true.
*/
/* ==========================================================
    VARIABLES
    ==========================================================

    Las variables almacenan información que puede cambiar durante
    la ejecución del programa (usuarios, mensajes, productos, etc.).

    Declaración:
*/

let message;

// Asignación de un valor
message = "Hello";

// Declarar y asignar en una sola línea (recomendado)
let greeting = "Hello!";

// Declarar varias variables (posible, pero poco recomendable)
let user = "John", age = 25, text = "Hi";

// Las variables pueden cambiar su valor
let word = "Hello";
word = "World";

// Copiar el valor de una variable a otra
let hello = "Hello World!";
let copy = hello;


/* ==========================================================
    NOMENCLATURA DE VARIABLES
    ==========================================================

    Reglas:
    - Solo pueden contener letras, números, $ y _.
    - No pueden comenzar con un número.

    Se recomienda usar camelCase para nombres compuestos.
*/

let userName;
let test123;
let $ = 1;
let _ = 2;

// JavaScript distingue mayúsculas y minúsculas:
// apple y APPLE son variables diferentes.

// Se permiten caracteres no latinos, aunque no se recomienda.


/* ==========================================================
    PALABRAS RESERVADAS
    ==========================================================

    No pueden utilizarse como nombres de variables.

    Ejemplos:
    let
    const
    class
    return
    function
*/


/* ==========================================================
    MODO ESTRICTO (use strict)
    ==========================================================

    En modo estricto todas las variables deben declararse.

    Incorrecto:
*/

"use strict";

// num = 5; // Error: la variable no fue declarada


/* ==========================================================
    CONSTANTES (const)
    ==========================================================

    Una constante no puede cambiar su valor después de ser creada.
*/

const myBirthday = "18.04.1982";

// myBirthday = "01.01.2001"; // Error


/* ==========================================================
    CONSTANTES EN MAYÚSCULAS
    ==========================================================

    Se utilizan para valores fijos conocidos antes de ejecutar
    el programa (por ejemplo, colores o valores matemáticos).
*/

const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

let color = COLOR_ORANGE;

/*
    Se escriben en MAYÚSCULAS cuando representan valores
    constantes definidos directamente en el código.
*/


/* ==========================================================
    BUENAS PRÁCTICAS AL NOMBRAR VARIABLES
    ==========================================================

    -Usa nombres claros y descriptivos.
        .userName
        shoppingCart
        currentUser

    -Usa camelCase para varias palabras.

    -Evita nombres como:
        a, b, x, temp (si no son necesarios).

    -Mantén una nomenclatura consistente en todo el proyecto.
*/
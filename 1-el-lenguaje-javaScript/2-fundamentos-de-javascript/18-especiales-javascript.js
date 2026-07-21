/*==============================================================================
    ESPECIAL DE JAVASCRIPT (RESUMEN)
==============================================================================*/

/*
Este archivo resume los conceptos fundamentales de JavaScript vistos
hasta el momento.

Su objetivo es servir como una guía rápida de repaso antes de continuar
con temas más avanzados.

Los temas resumidos son:

- Estructura del código.
- Modo estricto.
- Variables.
- Tipos de datos.
- Interacción con el usuario.
- Operadores.
- Comparaciones.
- Condicionales.
- Bucles.
- Switch.
- Funciones.
*/

/*==============================================================================
    1. ESTRUCTURA DEL CÓDIGO
==============================================================================*/

/*
JavaScript organiza el código en sentencias.

Normalmente cada sentencia termina con un punto y coma (;).
*/

let a = 10;
let b = 20;

/*
Aunque JavaScript puede insertar automáticamente los puntos y coma
(ASI - Automatic Semicolon Insertion), NO es recomendable depender
de ello.

Siempre es una buena práctica escribirlos explícitamente para evitar
errores difíciles de detectar.
*/

console.log("Hola");
console.log("Mundo");

/*
Existen casos donde omitir el punto y coma puede producir errores.
*/

console.log("Esto funciona")

[1, 2, 3].forEach(console.log); // Error inesperado sin el ;

/*
Los bloques de código NO necesitan punto y coma.
*/

if (true) {
    console.log("Hola");
}

function greet() {
    console.log("Hola");
}

/*==============================================================================
    2. MODO ESTRICTO ("use strict")
==============================================================================*/

/*
El modo estricto activa un comportamiento más seguro y moderno
de JavaScript.

Se recomienda usarlo siempre en proyectos nuevos.
*/

"use strict";

/*
Beneficios:

- Detecta errores comunes.

- Evita malas prácticas.

- Hace el código más seguro.

- Es obligatorio para algunas características modernas del lenguaje.
*/

/*==============================================================================
    3. VARIABLES
==============================================================================*/

/*
Existen tres formas de declarar variables.
*/

/*
let

Permite modificar posteriormente el valor.
*/

let age = 25;

age = 26;

/*
const

Crea una constante cuyo valor no puede reasignarse.
*/

const PI = 3.1416;

/*
PI = 5; // Error
*/

/*
var

Forma antigua de declarar variables.

Hoy prácticamente siempre se utiliza let o const.
*/

var oldVariable = "JavaScript";

/*
Regla general:

- Usa const por defecto.

- Usa let únicamente cuando el valor cambie.

- Evita usar var.
*/

/*==============================================================================
    4. TIPOS DE DATOS
==============================================================================*/

/*
JavaScript posee 8 tipos de datos principales.
*/

/*
1. Number
*/

let number = 100;

/*
2. BigInt
*/

let big = 12345678901234567890n;

/*
3. String
*/

let text = "Hola";

/*
4. Boolean
*/

let active = true;

/*
5. Null

Representa un valor vacío.
*/

let value = null;

/*
6. Undefined

Representa una variable sin valor asignado.
*/

let user;

/*
7. Object

Colección de datos.
*/

let person = {
    name: "Juan",
    age: 25
};

/*
8. Symbol

Identificador único.

Lo estudiaremos más adelante.
*/

/*==============================================================================
    TYPEOF
==============================================================================*/

/*
typeof devuelve el tipo de un valor.
*/

console.log(typeof 10);          // number
console.log(typeof "Hola");      // string
console.log(typeof true);        // boolean
console.log(typeof undefined);   // undefined
console.log(typeof {});          // object

/*
Curiosidades importantes:
*/

console.log(typeof null); // object (error histórico del lenguaje)

console.log(typeof function(){}); // function

/*==============================================================================
    5. INTERACCIÓN CON EL USUARIO
==============================================================================*/

/*
JavaScript proporciona tres funciones para interactuar con el usuario
desde el navegador.
*/

/*
alert()

Muestra un mensaje.
*/

alert("Hola");

/*
prompt()

Solicita un dato al usuario.
*/

let name = prompt("¿Cuál es tu nombre?");

/*
confirm()

Devuelve true o false dependiendo de la respuesta.
*/

let accepted = confirm("¿Aceptas los términos?");

/*
Las tres funciones son MODALES.

Mientras están abiertas, el usuario no puede interactuar con la página.
*/

/*==============================================================================
    6. OPERADORES
==============================================================================*/

/*-------------------------------
    OPERADORES ARITMÉTICOS
--------------------------------*/

let x = 10;
let y = 3;

x + y;
x - y;
x * y;
x / y;
x % y;
x ** y;

/*-------------------------------
    CONCATENACIÓN
--------------------------------*/

console.log("Hola " + "Mundo");

console.log("Edad: " + 25);

/*-------------------------------
    ASIGNACIÓN
--------------------------------*/

let score = 10;

score += 5;
score -= 2;
score *= 2;
score /= 2;

/*-------------------------------
    OPERADOR TERNARIO
--------------------------------*/

let ageUser = 20;

let access = ageUser >= 18
    ? "Permitido"
    : "Denegado";

/*-------------------------------
    OPERADORES LÓGICOS
--------------------------------*/

/*
OR ||

Devuelve el primer valor truthy.
*/

console.log(null || "" || "Juan");

/*
AND &&

Devuelve el primer valor falsy.
*/

console.log(10 && "Hola" && true);

/*
NOT !
*/

console.log(!true);

/*-------------------------------
    NULLISH COALESCING ??
--------------------------------*/

/*
Devuelve el primer valor definido
(distinto de null y undefined).
*/

let username = null;

console.log(username ?? "Invitado");

/*==============================================================================
    7. COMPARACIONES
==============================================================================*/

/*
Operadores disponibles:

>

<

>=

<=

==

===

!=

!==
*/

console.log(5 > 2);

console.log(5 === 5);

console.log(5 !== 10);

/*
IMPORTANTE

=== compara valor y tipo.

Es el operador recomendado.
*/

console.log(0 == false);   // true

console.log(0 === false);  // false

/*
Las cadenas se comparan carácter por carácter utilizando Unicode.
*/

console.log("Z" > "A");

/*==============================================================================
    8. CONDICIONALES
==============================================================================*/

/*
if
*/

let temperature = 30;

if (temperature > 25) {

    console.log("Hace calor");

}

/*
if...else
*/

if (temperature > 25) {

    console.log("Calor");

} else {

    console.log("Frío");

}

/*
else if
*/

if (temperature > 30) {

    console.log("Mucho calor");

} else if (temperature > 20) {

    console.log("Temperatura agradable");

} else {

    console.log("Hace frío");

}

/*==============================================================================
    9. BUCLES
==============================================================================*/

/*
while
*/

let i = 0;

while (i < 3) {

    console.log(i);

    i++;

}

/*
do...while
*/

let j = 0;

do {

    console.log(j);

    j++;

} while (j < 3);

/*
for
*/

for (let k = 0; k < 3; k++) {

    console.log(k);

}

/*
break

Sale completamente del bucle.
*/

/*
continue

Salta únicamente la iteración actual.
*/

/*==============================================================================
    10. SWITCH
==============================================================================*/

/*
switch compara utilizando igualdad estricta (===).
*/

let option = 2;

switch (option) {

    case 1:
        console.log("Opción 1");
        break;

    case 2:
        console.log("Opción 2");
        break;

    default:
        console.log("Otra opción");

}

/*==============================================================================
    11. FUNCIONES
==============================================================================*/

/*-------------------------------
    Function Declaration
--------------------------------*/

function add(a, b) {

    return a + b;

}

/*-------------------------------
    Function Expression
--------------------------------*/

const subtract = function(a, b) {

    return a - b;

};

/*-------------------------------
    Arrow Function
--------------------------------*/

const multiply = (a, b) => a * b;

/*
Arrow Function multilínea
*/

const divide = (a, b) => {

    if (b === 0) {

        return "No se puede dividir por cero";

    }

    return a / b;

};

/*==============================================================================
    PARÁMETROS POR DEFECTO
==============================================================================*/

function greet(user = "Invitado") {

    console.log(`Hola ${user}`);

}

greet();

greet("Juan");

/*==============================================================================
    RETURN
==============================================================================*/

/*
Toda función devuelve un valor.

Si no se especifica return, JavaScript devuelve undefined.
*/

function example() {

}

console.log(example()); // undefined

/*==============================================================================
    VARIABLES LOCALES
==============================================================================*/

/*
Las variables declaradas dentro de una función solo existen
dentro de esa función.
*/

function test() {

    let message = "Hola";

    console.log(message);

}

test();

// console.log(message); // Error

/*==============================================================================
    NOTAS IMPORTANTES
==============================================================================*/

/*
- Utiliza siempre === y !== para comparar valores.

- Prefiere const antes que let.

- Usa Arrow Functions para funciones pequeñas y callbacks.

- Usa Function Declaration para funciones principales.

- Finaliza las sentencias con punto y coma.

- Activa siempre "use strict" en proyectos modernos.

- Escribe código legible antes que código corto.
*/
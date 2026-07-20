/*==============================================================================
    EXPRESIONES DE FUNCIÓN (FUNCTION EXPRESSIONS)
==============================================================================*/

/*
Hasta ahora hemos creado funciones utilizando la sintaxis:

function saludar() {
    ...
}

Esta forma recibe el nombre de Function Declaration.

Sin embargo, existe otra manera de crear funciones:

las Expresiones de Función (Function Expressions).
*/

/*
Sintaxis
*/

let sayHi = function () {
    console.log("Hola");
};

/*
En este caso:

1. Se crea una función.

2. Esa función se guarda dentro de una variable.

La variable ahora contiene una función y puede ejecutarse
igual que cualquier otra.
*/

sayHi();

/*==============================================================================
    LAS FUNCIONES SON VALORES
==============================================================================*/

/*
En JavaScript una función es un valor, igual que un número,
una cadena o un booleano.

La diferencia es que representa una acción.
*/

function greet() {
    console.log("Hola");
}

console.log(greet);

/*
No aparece "Hola".

Se imprime la función porque NO estamos ejecutándola.

Para ejecutarla debemos usar paréntesis.
*/

greet();

/*==============================================================================
    COPIAR UNA FUNCIÓN
==============================================================================*/

function greet() {
    console.log("Hola");
}

let another = greet;

/*
No copiamos el resultado.

Copiamos la función completa.
*/

another();

greet();

/*
IMPORTANTE

No escribimos:

let another = greet();

porque eso ejecutaría la función inmediatamente.
*/

/*==============================================================================
    PASAR FUNCIONES COMO PARÁMETROS
==============================================================================*/

/*
Como una función es un valor,
también puede enviarse como argumento.
*/

function greet() {
    console.log("Hola");
}

function execute(action) {

    action();

}

execute(greet);

/*==============================================================================
    CALLBACKS
==============================================================================*/

/*
Una callback es una función que se pasa como argumento
para que otra función la ejecute más adelante.
*/

function ask(question, yes, no) {

    if (confirm(question)) {

        yes();

    } else {

        no();

    }

}

function accepted() {
    console.log("Aceptaste");
}

function rejected() {
    console.log("Cancelaste");
}

ask(
    "¿Aceptar?",
    accepted,
    rejected
);

/*
accepted y rejected NO se ejecutan aquí.

Solo se entregan a ask.

Será ask quien decida cuándo ejecutarlas.
*/

/*==============================================================================
    FUNCIONES ANÓNIMAS
==============================================================================*/

/*
Una función puede no tener nombre.

A estas funciones se les llama funciones anónimas.
*/

let hello = function () {

    console.log("Hola");

};

ask(

    "¿Aceptar?",

    function () {

        console.log("Sí");

    },

    function () {

        console.log("No");

    }

);

/*==============================================================================
    DECLARACIÓN DE FUNCIÓN VS EXPRESIÓN DE FUNCIÓN
==============================================================================*/

/*
Aunque ambas permiten crear funciones, existen diferencias importantes
en su sintaxis, comportamiento y momento de creación.

Comprender estas diferencias es fundamental para escribir código
más claro y evitar errores difíciles de detectar.
*/

/*------------------------------------------------------------------------------
    1. FUNCTION DECLARATION
------------------------------------------------------------------------------*/

/*
Una Function Declaration (Declaración de Función) se define como una
instrucción independiente dentro del código.
*/

function sum(a, b) {
    return a + b;
}

/*
Características:

- Tiene un nombre obligatorio.

- Se crea antes de que el código comience a ejecutarse (Hoisting).

- Puede llamarse antes de su declaración.

- Es la forma recomendada para declarar funciones principales
del programa.
*/

/*------------------------------------------------------------------------------
    2. FUNCTION EXPRESSION
------------------------------------------------------------------------------*/

/*
Una Function Expression (Expresión de Función) crea la función como
parte de una expresión, normalmente durante una asignación.
*/

let sumNumbers = function(a, b) {
    return a + b;
};

/*
Características:

- Puede ser anónima o tener nombre.

- Se crea únicamente cuando la ejecución llega a esa línea.

- No puede utilizarse antes de ser creada.

- Es muy utilizada para callbacks, funciones condicionales
y funciones que se almacenan en variables.
*/

/*------------------------------------------------------------------------------
    DIFERENCIA PRINCIPAL
------------------------------------------------------------------------------*/

/*
La diferencia más importante entre ambas NO es la sintaxis.

La verdadera diferencia está en el momento en que JavaScript crea
la función.

------------------------------------------------------------

Function Declaration

La función existe desde que comienza la ejecución del script.

------------------------------------------------------------

Function Expression

La función no existe hasta que la ejecución llega a la línea donde
fue creada.
*/

/*==============================================================================
    HOISTING (ELEVACIÓN)
==============================================================================*/

/*
Las Function Declarations son "elevadas" (hoisted).

Antes de ejecutar el programa, JavaScript busca todas las
Function Declarations y las registra en memoria.

Por eso pueden llamarse antes de aparecer en el código.
*/

sayHello("Juan");

function sayHello(name) {

    console.log(`Hola ${name}`);

}

/*
Aunque la llamada aparece antes de la función, el código funciona
correctamente porque JavaScript ya había creado esa función durante
la fase de preparación del programa.
*/

/*------------------------------------------------------------------------------
    FUNCTION EXPRESSION Y HOISTING
------------------------------------------------------------------------------*/

/*
Las Function Expressions NO disfrutan de este comportamiento.

La variable puede existir, pero la función aún no ha sido asignada.
*/

sayHi("Juan"); // Error

let sayHi = function(name) {

    console.log(`Hola ${name}`);

};

/*
¿Por qué ocurre el error?

Porque JavaScript ejecuta el código de arriba hacia abajo.

Cuando intenta ejecutar:

sayHi();

la variable todavía no contiene ninguna función.

La función será creada únicamente cuando la ejecución llegue
a esta línea:

let sayHi = function(...) { ... };
*/

/*==============================================================================
    ALCANCE DE BLOQUE (BLOCK SCOPE)
==============================================================================*/

/*
En modo estricto ("use strict"), una Function Declaration creada
dentro de un bloque ({}) solo existe dentro de ese bloque.

No puede utilizarse fuera de él.
*/

let age = 16;

if (age < 18) {

    function welcome() {

        console.log("¡Hola!");

    }

}

// welcome(); // Error

/*
La función welcome() únicamente existe dentro del bloque if.
*/

/*------------------------------------------------------------------------------
    LA FUNCIÓN EXISTE EN TODO EL BLOQUE
------------------------------------------------------------------------------*/

/*
Aunque la función solo vive dentro del bloque, sí puede utilizarse
antes de su declaración dentro del mismo bloque.
*/

let userAge = 16;

if (userAge < 18) {

    welcome();

    function welcome() {

        console.log("¡Hola!");

    }

    welcome();

}

/*
Ambas llamadas funcionan porque la Function Declaration se registra
antes de ejecutar el bloque.
*/

/*==============================================================================
    FUNCIONES CONDICIONALES
==============================================================================*/

/*
Supongamos que queremos crear una función diferente dependiendo
de una condición.
*/

let ageUser = 20;

if (ageUser < 18) {

    function greet() {

        console.log("Hola");

    }

} else {

    function greet() {

        console.log("Bienvenido");

    }

}

// greet(); // Error

/*
Aunque una de las funciones fue creada, ambas quedaron limitadas
al bloque donde fueron declaradas.

Fuera del if ya no existen.
*/

/*==============================================================================
    LA SOLUCIÓN: FUNCTION EXPRESSION
==============================================================================*/

/*
Cuando necesitamos crear una función condicional, lo recomendable
es utilizar una Function Expression.
*/

let agePerson = 20;

let welcome;

if (agePerson < 18) {

    welcome = function() {

        console.log("¡Hola!");

    };

} else {

    welcome = function() {

        console.log("¡Bienvenido!");

    };

}

welcome();

/*
Ahora sí funciona.

La variable welcome fue declarada fuera del bloque, por lo que
es accesible desde cualquier parte del programa.
*/

/*==============================================================================
    USANDO EL OPERADOR TERNARIO
==============================================================================*/

/*
El mismo ejemplo puede escribirse de forma más compacta utilizando
el operador condicional (?).
*/

let ageClient = 20;

let greetUser = (ageClient < 18)

    ? function() {

        console.log("¡Hola!");

    }

    : function() {

        console.log("¡Bienvenido!");

    };

greetUser();

/*
El operador ternario selecciona una de las dos funciones y la
asigna a la variable.

Después simplemente ejecutamos la función almacenada.
*/

/*==============================================================================
    ¿CUÁNDO USAR CADA UNA?
==============================================================================*/

/*
Usa Function Declaration cuando:

- La función forma parte principal del programa.

- Debe poder llamarse antes de su declaración.

- Quieres aprovechar el Hoisting.

Ejemplo:

function calculateTotal() { ... }

------------------------------------------------------------

Usa Function Expression cuando:

- Necesites guardar una función en una variable.

- Vayas a pasar una función como argumento (callback).

- La función dependa de una condición.

- Quieras crear funciones dinámicamente.

Ejemplo:

let calculateTotal = function() { ... };
*/

/*==============================================================================
    COMPARACIÓN RÁPIDA
==============================================================================*/

/*
Function Declaration

- Tiene nombre obligatorio.

- Se crea antes de ejecutar el programa.

- Tiene Hoisting.

- Puede llamarse antes de declararse.

- Ideal para funciones principales.

------------------------------------------------------------

Function Expression

- Puede ser anónima.

- Se crea cuando la ejecución llega a ella.

- No tiene Hoisting de la función.

- No puede llamarse antes de ser creada.

- Ideal para callbacks y funciones condicionales.
*/
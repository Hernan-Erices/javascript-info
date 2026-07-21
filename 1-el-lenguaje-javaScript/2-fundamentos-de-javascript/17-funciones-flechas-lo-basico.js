/*==============================================================================
    FUNCIONES FLECHA (ARROW FUNCTIONS)
==============================================================================*/

/*
Las funciones flecha (Arrow Functions) son una forma más corta y moderna
de escribir funciones en JavaScript.

Fueron introducidas en ES6 (ECMAScript 2015) y son muy utilizadas
en el desarrollo actual por su sintaxis sencilla y legible.

Son especialmente útiles para:

- Funciones pequeñas.
- Callbacks.
- Métodos como map(), filter(), reduce(), etc.

Sintaxis general:

let nombreFuncion = (parámetros) => expresión;
*/

/*==============================================================================
    SINTAXIS BÁSICA
==============================================================================*/

/*
Una función flecha recibe los parámetros a la izquierda del operador =>

y devuelve automáticamente el resultado de la expresión que está
a la derecha.
*/

let sum = (a, b) => a + b;

console.log(sum(5, 3)); // 8

/*
Equivale a escribir:
*/

let sum2 = function(a, b) {
    return a + b;
};

console.log(sum2(5, 3)); // 8

/*
Cuando la función solo contiene una expresión, el return es implícito.

Es decir, JavaScript devuelve automáticamente el resultado.
*/

/*==============================================================================
    UN SOLO PARÁMETRO
==============================================================================*/

/*
Si la función recibe únicamente un parámetro, los paréntesis son opcionales.
*/

let double = n => n * 2;

console.log(double(4)); // 8

/*
También podríamos escribir:

let double = (n) => n * 2;

Ambas formas son válidas.
*/

/*==============================================================================
    SIN PARÁMETROS
==============================================================================*/

/*
Si la función no recibe parámetros, los paréntesis son obligatorios.
*/

let sayHello = () => console.log("¡Hola!");

sayHello();

/*==============================================================================
    VARIOS PARÁMETROS
==============================================================================*/

/*
Cuando hay dos o más parámetros, los paréntesis son obligatorios.
*/

let multiply = (a, b) => a * b;

console.log(multiply(3, 4)); // 12

/*==============================================================================
    RETURN IMPLÍCITO
==============================================================================*/

/*
Si la función únicamente devuelve una expresión, no es necesario escribir
la palabra return.

JavaScript lo hace automáticamente.
*/

let square = n => n ** 2;

console.log(square(6)); // 36

/*
Equivale a:
*/

let square2 = function(n) {
    return n ** 2;
};

/*==============================================================================
    FUNCIONES FLECHA CON VARIAS LÍNEAS
==============================================================================*/

/*
Si la función necesita ejecutar varias instrucciones, debemos utilizar
llaves {}.

En este caso el return YA NO es automático.

Debe escribirse de forma explícita.
*/

let subtract = (a, b) => {

    let result = a - b;

    return result;

};

console.log(subtract(10, 4)); // 6

/*
Si olvidamos escribir return, la función devolverá undefined.
*/

let wrong = (a, b) => {

    let result = a + b;

};

console.log(wrong(2, 3)); // undefined

/*==============================================================================
    CREAR FUNCIONES DINÁMICAMENTE
==============================================================================*/

/*
Las funciones flecha también pueden asignarse condicionalmente
a una variable.
*/

let age = 20;

let welcome = (age >= 18)
    ? () => console.log("Bienvenido.")
    : () => console.log("No tienes acceso.");

welcome();

/*==============================================================================
    COMO CALLBACKS
==============================================================================*/

/*
Uno de los usos más comunes de las funciones flecha es como callbacks.

En lugar de escribir funciones anónimas largas, podemos escribirlas
de forma mucho más compacta.
*/

function ask(question, yes, no) {

    if (confirm(question)) {
        yes();
    } else {
        no();
    }

}

ask(

    "¿Aceptas los términos?",

    () => console.log("Aceptado."),

    () => console.log("Cancelado.")

);

/*
Sin funciones flecha el mismo código sería:
*/

ask(

    "¿Aceptas los términos?",

    function() {
        console.log("Aceptado.");
    },

    function() {
        console.log("Cancelado.");
    }

);

/*
Ambas versiones hacen exactamente lo mismo.

La versión con Arrow Functions simplemente es más corta.
*/

/*==============================================================================
    ¿CUÁNDO USAR FUNCIONES FLECHA?
==============================================================================*/

/*
Son ideales cuando la función:

- Es pequeña.

- Solo devuelve un valor.

- Se usa como callback.

- Se utiliza una sola vez.

Ejemplos comunes:

let numbers = [1,2,3];

numbers.map(n => n * 2);

numbers.filter(n => n > 1);

numbers.forEach(n => console.log(n));
*/

/*==============================================================================
    ¿CUÁNDO NO SON LA MEJOR OPCIÓN?
==============================================================================*/

/*
Aunque son muy populares, no siempre son la mejor elección.

Para funciones largas, con mucha lógica o que representan acciones
importantes del programa, suele ser más legible utilizar una
Function Declaration.

Por ejemplo:

function calculateSalary(employee) {

    // mucho código...

}

En estos casos una función tradicional suele ser más fácil de leer
y mantener.
*/

/*==============================================================================
    DIFERENCIAS ENTRE ARROW FUNCTIONS Y FUNCTION EXPRESSIONS
==============================================================================*/

/*
Ambas crean funciones cuando la ejecución llega a esa línea.

La diferencia principal entre ellas es la sintaxis.

------------------------------------------------------------

Function Expression

let sum = function(a, b) {
    return a + b;
};

------------------------------------------------------------

Arrow Function

let sum = (a, b) => a + b;

------------------------------------------------------------

La versión con flecha es simplemente una forma más corta y moderna
de escribir muchas expresiones de función.
*/
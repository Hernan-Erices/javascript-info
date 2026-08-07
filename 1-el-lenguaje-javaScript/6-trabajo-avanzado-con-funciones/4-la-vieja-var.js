"use strict";

/*=========================================================
                    LA VIEJA "var"
=========================================================

Este capítulo existe principalmente para comprender código antiguo de JavaScript.

Hoy en día, la forma recomendada de declarar variables es:

    - let
    - const

Sin embargo, durante muchos años JavaScript solo disponía
de "var", por lo que todavía es frecuente encontrarlo en
proyectos antiguos.

Aunque "var" puede parecer similar a "let", existen varias
diferencias importantes que pueden provocar comportamientos
inesperados si no se conocen.

Comprender estas diferencias resulta especialmente útil
cuando:

    - Lees código antiguo.
    - Mantienes aplicaciones heredadas.
    - Migras proyectos de var hacia let/const.
*/


/*=========================================================
        1. "var" NO TIENE ALCANCE DE BLOQUE
=========================================================

Las variables declaradas con let y const pertenecen al bloque
donde fueron creadas.

En cambio, var ignora completamente los bloques { }.

Si se declara dentro de un if, for o while, seguirá siendo
accesible fuera de ellos.

Dicho de otra manera:

    let  -> alcance de bloque
    const -> alcance de bloque
    var  -> alcance de función (o global)
*/


//----------------------------------------------------------
// Ejemplo con var
//----------------------------------------------------------

if (true) {
    var test = true;
}

alert(test); // true


/*
Aunque "test" fue creada dentro del if, sigue existiendo
después de que el bloque termina.

Esto ocurre porque var no crea un ámbito de bloque.
*/


//----------------------------------------------------------
// El mismo ejemplo usando let
//----------------------------------------------------------

if (true) {
    let message = "Hola";
}

alert(message); // ReferenceError


/*
Con let la variable desaparece al salir del bloque.

Este comportamiento evita que variables temporales permanezcan
visibles accidentalmente.
*/


/*=========================================================
        var tampoco respeta los bucles
=========================================================*/

for (var i = 0; i < 3; i++) {
    var number = i;
}

alert(i);       // 3
alert(number);  // 2


/*
Después del bucle ambas variables siguen existiendo.

Con let ocurriría lo contrario:

for (let i = 0; i < 3; i++) {
    ...
}

alert(i); // ReferenceError
*/


/*=========================================================
        Dentro de funciones
=========================================================

Aunque var ignora los bloques, sí respeta las funciones.

Es decir, una variable creada con var vive durante toda
la función donde fue declarada.
*/


function sayHi() {

    if (true) {
        var phrase = "Hello";
    }

  alert(phrase); // Hello
}

sayHi();

alert(phrase); // ReferenceError


/*
"phrase" atraviesa el if...

...pero no sale de la función.
*/


/*=========================================================
            RESUMEN DEL ALCANCE
=========================================================

                let / const        var

    Bloques          ✔            ✘
    Funciones        ✔            ✔
    Global           ✔            ✔

En código moderno prácticamente siempre utilizamos let y const.
*/


/*=========================================================
            2. var PERMITE REDECLARAR VARIABLES
=========================================================

Con let o const no podemos declarar dos veces una variable dentro del mismo ámbito.
*/


//----------------------------------------------------------
// let
//----------------------------------------------------------

let user = "Pedro";

// let user = "Juan"; // SyntaxError


/*
JavaScript detecta inmediatamente el problema.
*/


//----------------------------------------------------------
// var
//----------------------------------------------------------

var person = "Pedro";

var person = "Juan"; // permitido

alert(person); // Juan


/*
La segunda declaración simplemente reemplaza el valor.

No aparece ningún error.

Este comportamiento puede ocultar errores difíciles de detectar,
por lo que es otra razón para preferir let.
*/


/*=========================================================
            3. HOISTING (ELEVACIÓN)
=========================================================

Una de las diferencias más importantes.

Las declaraciones realizadas con var son elevadas ("hoisted") al comienzo de la función.

IMPORTANTE:

    Solo se eleva la DECLARACIÓN.

    NO la asignación.
*/


function example() {

    alert(message);

    var message = "Hola";
}

example();


/*
Resultado:

undefined

¿Por qué no aparece un ReferenceError?

Porque internamente JavaScript interpreta el código así:
*/


function exampleEquivalent() {

  var message; // ← declaración elevada

  alert(message); // undefined

  message = "Hola"; // ← asignación permanece aquí
}


/*
Es decir:

Antes de ejecutar cualquier línea de la función,
JavaScript ya conoce que existe "message".

Pero todavía no tiene ningún valor asignado.

Por eso su contenido inicial es undefined.
*/


/*=========================================================
        Otro ejemplo
=========================================================*/

function demo() {

    value = 10;

    var value;

    alert(value);
}

demo();


/*
Equivale a:

function demo() {

    var value;

    value = 10;

    alert(value);
}

El resultado será:

10
*/


/*=========================================================
IMPORTANTE

Declaración:

    var x;

se eleva.

Asignación:

    x = 5;

NO se mueve.

Esta diferencia suele provocar errores cuando se trabaja con código antiguo.
*/


/*=========================================================
        ¿Y let también tiene hoisting?
=========================================================

Sí.

Pero existe una diferencia enorme.

let también es elevada internamente, aunque permanece inaccesible hasta llegar a su declaración.

Ese período recibe el nombre de:

    Temporal Dead Zone (TDZ)

Por eso ocurre esto:
*/


// alert(price); // ReferenceError

let price = 100;


/*
Mientras que con var ocurre:

alert(cost); // undefined

var cost = 100;
*/


/*=========================================================
                4. IIFE
=========================================================

IIFE significa:

    Immediately Invoked Function Expression

    (Expresión de Función Invocada Inmediatamente)

Antes de que existiera let, los desarrolladores necesitaban crear variables privadas.

Como var no tenía alcance de bloque, una solución era crear
una función y ejecutarla inmediatamente.
*/


(function () {

    var message = "Hello";

    alert(message);

})();


/*
La función se crea...

...se ejecuta inmediatamente...

...y después desaparece.

Todas las variables creadas dentro permanecen privadas.
*/


/*=========================================================
            ¿Por qué tantos paréntesis?
=========================================================

JavaScript interpreta:

    function test() {}

como una declaración.

Y las declaraciones NO pueden ejecutarse inmediatamente.

Por eso se escriben entre paréntesis:

(function(){})();

Los paréntesis indican que se trata de una expresión,
no de una declaración.
*/


/*=========================================================
            Otras formas válidas de crear un IIFE
=========================================================*/


(function () {
    alert("Versión clásica");
})();


(function () {
    alert("Otra variante");
}());


!function () {
    alert("Usando !");
}();


+function () {
    alert("Usando +");
}();


/*
Todas hacen exactamente lo mismo:

1. Crear una función.
2. Ejecutarla inmediatamente.

La versión con paréntesis es la más conocida y la más utilizada.
*/


/*=========================================================
            ¿SIGUEN SIENDO ÚTILES LOS IIFE?
=========================================================

Prácticamente no.

Hoy tenemos:

    • let
    • const
    • módulos ES (import/export)

que proporcionan aislamiento del código de forma mucho
más limpia.

Los IIFE sobreviven principalmente porque existen enormes
cantidades de código antiguo que aún los utilizan.
*/


/*=========================================================
            COMPARACIÓN GENERAL
=========================================================

                var                 let / const
    -------------------------------------------------------

    Alcance       Función             Bloque

    Redeclarar    Sí                  No

    Hoisting      Sí                  Sí

    Uso antes
    e declarar   undefined           ReferenceError (TDZ)

    Uso actual    Código antiguo      Código moderno
*/


/*=========================================================
            RESUMEN
=========================================================
- var fue la forma original de declarar variables en JavaScript.

- No posee alcance de bloque, sino de función.

- Permite redeclarar variables sin producir errores.

- Sus declaraciones son elevadas (hoisting), pero las
    asignaciones permanecen en su posición original.

- Antes de la llegada de let y const se utilizaban IIFE
    para simular variables privadas.

- En el desarrollo moderno se recomienda utilizar siempre
    let y const, reservando el conocimiento de var para leer,
    mantener o migrar código heredado.
*/
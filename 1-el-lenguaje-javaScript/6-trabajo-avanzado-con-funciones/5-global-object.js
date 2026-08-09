"use strict";

/*=========================================================
        OBJETO GLOBAL
=========================================================

El objeto global proporciona variables, funciones y objetos que están disponibles desde cualquier parte del código.

Entre ellos encontramos:

    - Funciones integradas del lenguaje.
    - Objetos integrados como Array, Object, Promise, etc.
    - Valores y APIs proporcionados por el entorno.

El nombre del objeto global depende del entorno:

    Navegador  -> window
    Node.js    -> global
    Universal  -> globalThis

Desde JavaScript moderno, globalThis es el nombre estandarizado para acceder al objeto global.
*/


/*=========================================================
            1. globalThis
========================================================

globalThis permite acceder al objeto global sin importar en qué entorno se esté ejecutando el código.

Por ejemplo:
*/


alert("Hello");

// En un navegador:
window.alert("Hello");

// Forma universal:
globalThis.alert("Hello");


/*
En un navegador, window y globalThis hacen referencia
al mismo objeto global.

En Node.js, el objeto global es diferente, por lo que
globalThis resulta más portable.
*/


/*=========================================================
2. EL OBJETO GLOBAL EN EL NAVEGADOR
=========================================================

En un navegador podemos acceder directamente a las propiedades del objeto global.

Por ejemplo:
*/


alert("Hello");


// Es equivalente a:

window.alert("Hello");


/*
Cuando escribimos:

    alert(...)

JavaScript encuentra la función global alert.

Cuando escribimos:

    window.alert(...)

accedemos explícitamente a esa misma función a través
del objeto global.
*/


/*=========================================================
            3. VARIABLES var Y EL OBJETO GLOBAL
=========================================================

En scripts clásicos del navegador, las variables globales declaradas con var se convierten en propiedades de window.

IMPORTANTE:

    var     -> sí se convierte en propiedad de window
    let     -> no
    const   -> no

Esto es una particularidad histórica de JavaScript.
*/


var gVar = 5;

alert(gVar);        // 5
alert(window.gVar); // 5


/*
La variable global gVar y la propiedad window.gVar
hacen referencia al mismo valor.
*/


/*=========================================================
            4. DECLARACIONES DE FUNCIONES
=========================================================

En un script clásico del navegador, las declaraciones de funciones globales también pueden convertirse en propiedades del objeto global.
*/


function sayHi() {
    alert("Hello");
}

sayHi();

// Equivalente en el navegador:
window.sayHi();


/*
Esto se refiere a una declaración de función:

    function sayHi() {}

No debe confundirse con una expresión de función:

    const sayHi = function() {};

El comportamiento respecto al objeto global no es el mismo.
*/


/*=========================================================
        5. let Y const NO SE CONVIERTEN EN PROPIEDADES DE window
=========================================================

A diferencia de var, las variables globales declaradas
mediante let o const no se convierten en propiedades
del objeto global.
*/


let gLet = 5;
const gConst = 10;

alert(gLet);          // 5
alert(gConst);        // 10

alert(window.gLet);   // undefined
alert(window.gConst); // undefined


/*
Por eso no debemos asumir que toda variable global
es automáticamente una propiedad de window.
*/


/*=========================================================
6. CREAR EXPLÍCITAMENTE UNA PROPIEDAD GLOBAL
=========================================================

Si realmente necesitamos que un valor esté disponible
globalmente, podemos almacenarlo directamente en el
objeto global.
*/


window.currentUser = {
    name: "John"
};


// Podemos acceder directamente:

alert(currentUser.name); // John


// O explícitamente:

alert(window.currentUser.name); // John


/*
Acceder mediante window.currentUser puede ser más claro
cuando queremos indicar explícitamente que estamos usando
un valor global.
*/


/*=========================================================
            7. ¿DEBEMOS USAR VARIABLES GLOBALES?
=========================================================

Generalmente, no.

Las variables globales pueden ser modificadas desde
cualquier parte del programa, lo que aumenta el riesgo
de conflictos y errores difíciles de rastrear.

Es preferible que las funciones:

    entrada -> procesamiento -> resultado

reciban los datos que necesitan como argumentos y
devuelvan un resultado.

Ejemplo:
*/


function calculatePrice(price, tax) {
  return price + price * tax;
}

const finalPrice = calculatePrice(100, 0.19);


/*
Esto es más fácil de:

    - Entender.
    - Probar.
    - Mantener.
    - Reutilizar.

En general:

    Menos variables globales
        ↓
    Menos dependencias externas
        ↓
    Código más predecible
*/


/*=========================================================
            8. EL OBJETO GLOBAL Y LOS POLYFILLS
=========================================================

El objeto global también puede utilizarse para comprobar
si una característica existe en el entorno actual.

Esto fue especialmente importante cuando los navegadores
no soportaban todas las características modernas de
JavaScript.
*/


if (!window.Promise) {
    alert("Tu navegador es muy antiguo.");
}


/*
Aquí comprobamos si Promise existe en el objeto global.

Si no existe, significa que el entorno no proporciona
esa característica.
*/


/*=========================================================
            9. POLYFILL
=========================================================

Un polyfill es una implementación que proporciona una
característica moderna cuando el entorno no la soporta.

Conceptualmente:
*/


if (!window.Promise) {
 // window.Promise = //... // custom implementation of the modern language feature
}


/*
De esta manera, el código puede disponer de Promise incluso
en un entorno que originalmente no la implementaba.

Los polyfills fueron especialmente importantes para mantener
compatibilidad con navegadores antiguos.
*/


/*=========================================================
10. globalThis: LA FORMA UNIVERSAL
=========================================================

En código que puede ejecutarse en diferentes entornos,
globalThis es preferible a asumir que existe window.

Por ejemplo:
*/


globalThis.myValue = 42;

console.log(globalThis.myValue);


/*
En un navegador:

    globalThis === window

En otros entornos, globalThis hace referencia al objeto
global correspondiente a ese entorno.
*/


/*=========================================================
RESUMEN
=========================================================

El objeto global:

    - Contiene valores y funciones disponibles globalmente.
    - Incluye objetos integrados de JavaScript y APIs del entorno de ejecución.
    - Se llama window en navegadores.
    - Se llama global en Node.js.
    - Tiene el nombre universal globalThis.

Diferencias importantes:

    var
    -> en scripts clásicos del navegador puede convertirse
        en una propiedad de window.

    let / const
    -> no se convierten en propiedades de window.

Ejemplo:

    var a = 1;
    let b = 2;
    const c = 3;

    window.a // 1
    window.b // undefined
    window.c // undefined

Recomendaciones:

    - Preferir let y const.
    - Evitar variables globales innecesarias.
    - Usar globalThis cuando se necesita acceder al objeto global de forma independiente del entorno.
    - En código moderno, no depender del comportamiento histórico de var y window.
*/
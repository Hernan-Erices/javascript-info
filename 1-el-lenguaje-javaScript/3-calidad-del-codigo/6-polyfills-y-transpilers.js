/*

===========================================
RELLENOS DE POLIÉSTER (POLYFILLS) Y TRANSPILADORES
===========================================

JavaScript es un lenguaje que evoluciona constantemente. Con cada nueva versión
del estándar ECMAScript se incorporan nuevas características, como operadores,
métodos, funciones y mejoras de sintaxis.

Estas nuevas propuestas son discutidas por el comité TC39 y, cuando son
aprobadas, pasan a formar parte de la especificación oficial del lenguaje.

Sin embargo, los motores de JavaScript (como V8 de Chrome, SpiderMonkey de
Firefox o JavaScriptCore de Safari) no implementan todas las características
nuevas al mismo tiempo.

Cada motor decide qué funciones implementar primero, por lo que es común que
algunos navegadores modernos soporten ciertas características mientras que otros,
especialmente los más antiguos, todavía no las reconozcan.

Como desarrolladores normalmente queremos utilizar las características más
modernas del lenguaje, pero también necesitamos que nuestro código funcione en
navegadores antiguos.

Para solucionar este problema existen dos herramientas fundamentales:

1. Transpiladores.
2. Polyfills.

================================================================================
TRANSPILADORES
================================================================================

Un transpilador es un programa que convierte código JavaScript moderno en código
equivalente utilizando una sintaxis más antigua.

No cambia el comportamiento del programa; únicamente reescribe el código para
que pueda ejecutarse en motores de JavaScript que todavía no soportan la
sintaxis moderna.

En otras palabras:

Código moderno
        ↓
    Transpilador
        ↓
Código compatible con navegadores antiguos

--------------------------------------------------------------------------------
Ejemplo
--------------------------------------------------------------------------------

Antes del año 2020 JavaScript no tenía el operador Nullish Coalescing (??).

Código moderno:

*/

let height = height ?? 100;

/*

Después de pasar por un transpilador:

*/

height = (height !== undefined && height !== null)
    ? height
    : 100;

/*

Ambos códigos hacen exactamente lo mismo.

La diferencia es que el segundo utiliza únicamente sintaxis antigua, por lo que
puede ejecutarse incluso en motores JavaScript que no conocen el operador ??.

--------------------------------------------------------------------------------
¿Cómo se utiliza un transpilador?
--------------------------------------------------------------------------------

Normalmente el desarrollador escribe el código moderno.

Luego el transpilador convierte automáticamente ese código antes de publicarlo.

El código que llega al navegador ya está adaptado para ser compatible con
versiones anteriores de JavaScript.

--------------------------------------------------------------------------------
Babel
--------------------------------------------------------------------------------

El transpilador más conocido es:

• Babel

Babel analiza el código moderno y lo transforma a una versión compatible con
navegadores antiguos.

Actualmente es muy común utilizar Babel junto con herramientas como Webpack,
que ejecutan automáticamente el proceso de transpilación cada vez que el código
es modificado.

================================================================================
POLYFILLS
================================================================================

Los transpiladores solamente pueden transformar la sintaxis del lenguaje.

Sin embargo, algunas novedades de JavaScript no son cambios de sintaxis, sino
nuevas funciones integradas.

Por ejemplo:

*/

Math.trunc(4.8);   // 4

/*

Math.trunc() elimina la parte decimal de un número.

En motores JavaScript muy antiguos esta función simplemente no existe.

En este caso un transpilador no puede solucionar el problema, porque no hay una
sintaxis que transformar.

La solución consiste en agregar manualmente la función que falta.

Eso es exactamente un Polyfill.

================================================================================
¿Qué es un Polyfill?
================================================================================

Un Polyfill es un script que agrega al entorno una característica moderna que
el navegador todavía no posee.

Es decir, implementa funciones que no existen para que el código moderno pueda
seguir funcionando.

--------------------------------------------------------------------------------
Ejemplo
--------------------------------------------------------------------------------

Si Math.trunc() no existe:

*/

if (!Math.trunc) {

Math.trunc = function(number) {

    return number < 0
        ? Math.ceil(number)
        : Math.floor(number);

    };

}

/*

Ahora cualquier código podrá utilizar Math.trunc() incluso en motores antiguos.

================================================================================
¿Por qué funcionan los Polyfills?
================================================================================

JavaScript es un lenguaje muy dinámico.

Los scripts pueden agregar nuevas funciones e incluso modificar funciones ya
existentes del lenguaje.

Gracias a esta característica es posible implementar funciones modernas cuando
el navegador todavía no las incorpora de forma nativa.

================================================================================
CORE-JS
================================================================================

Una de las bibliotecas de Polyfills más conocidas es:

• core-js

Esta biblioteca implementa una gran cantidad de características modernas de
JavaScript y permite incluir únicamente los Polyfills que realmente necesita
nuestro proyecto.
*/
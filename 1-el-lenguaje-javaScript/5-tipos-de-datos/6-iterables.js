"use strict";

// ============================================================================
// ITERABLES
// ============================================================================
//
// Los iterables son una generalización de los arrays.
//
// Un objeto iterable es cualquier objeto que puede recorrerse con un
// bucle for...of.
//
// Gracias a este concepto, JavaScript puede recorrer distintos tipos de
// colecciones utilizando la misma sintaxis.
//
// Ejemplos de iterables integrados:
//
// - Arrays
// - Strings
// - Map
// - Set
//
// También podemos crear nuestros propios objetos iterables.

// ============================================================================
// ¿Qué es un iterable?
// ============================================================================
//
// Normalmente usamos for...of con arrays.
//

let numeros = [1, 2, 3];

for (const numero of numeros) {

    console.log(numero);

}

//
// Salida:
//
// 1
// 2
// 3
//

//
// Sin embargo, for...of NO funciona únicamente con arrays.
//
// También funciona con cualquier objeto que implemente el protocolo
// de iteración.
//

// ============================================================================
// Crear nuestro propio iterable
// ============================================================================
//
// Supongamos que queremos representar un rango de números.
//
// Este objeto NO es un array.
//

let range = {

    from: 1,

    to: 5

};

//
// Queremos poder hacer:
//
// for (const numero of range) {
//
//     console.log(numero);
//
// }
//
// Pero actualmente produce un error porque range todavía NO es iterable.
//

// ============================================================================
// Symbol.iterator
// ============================================================================
//
// Para convertir un objeto en iterable debemos implementar
// un método especial:
//
// Symbol.iterator
//
// Este símbolo es una propiedad incorporada de JavaScript.
//
// Cuando comienza un for...of:
//
// 1. Busca Symbol.iterator.
//
// 2. Lo ejecuta.
//
// 3. Espera recibir un ITERADOR.
//

// ============================================================================
// ¿Qué es un iterador?
// ============================================================================
//
// Un iterador es un objeto que sabe entregar los valores
// uno por uno.
//
// Todo iterador debe tener un método:
//
// next()
//
// Cada llamada a next() devuelve un objeto con esta forma:
//
// {
//     done: Boolean,
//     value: cualquierValor
// }
//
// done:
//
// false -> todavía quedan elementos.
//
// true -> terminó la iteración.
//
// value:
//
// Contiene el siguiente valor.
//

// ============================================================================
// Implementación completa
// ============================================================================

range = {

    from: 1,

    to: 5

};

range[Symbol.iterator] = function () {

    return {

        current: this.from,

        last: this.to,

        next() {

            if (this.current <= this.last) {

                return {

                    done: false,

                    value: this.current++

                };

            }

            return {

                done: true

            };

        }

    };

};

// ============================================================================
// Ahora sí funciona
// ============================================================================

for (const numero of range) {

    console.log(numero);

}

//
// Salida:
//
// 1
// 2
// 3
// 4
// 5
//

// ============================================================================
// ¿Qué ocurre internamente?
// ============================================================================
//
// Cuando comienza el for...of ocurre lo siguiente:
//
// 1.
//
// range[Symbol.iterator]()
//
// Se ejecuta UNA sola vez.
//
//
//
// 2.
//
// Ese método devuelve un ITERADOR.
//
//
//
// 3.
//
// for...of comienza a llamar:
//
// next()
//
// repetidamente.
//
//
//
// 4.
//
// Mientras done sea false,
// continúa el recorrido.
//
//
//
// 5.
//
// Cuando next() devuelve:
//
// { done: true }
//
// el bucle termina.
//

// ============================================================================
// Separación de responsabilidades
// ============================================================================
//
// Hay dos objetos distintos:
//
// 1.
//
// El iterable
//
// (range)
//
// Contiene los datos.
//
//
//
// 2.
//
// El iterador
//
// Contiene el método:
//
// next()
//
// y recuerda en qué posición va.
//
//
//
// Esta separación permite que varios iteradores recorran
// el mismo objeto sin interferirse entre sí.
//

// ============================================================================
// Otra implementación más corta
// ============================================================================
//
// También podemos hacer que el propio objeto
// sea su propio iterador.
//

range = {

    from: 1,

    to: 5,

    [Symbol.iterator]() {

        this.current = this.from;

        return this;

    },

    next() {

        if (this.current <= this.to) {

            return {

                done: false,

                value: this.current++

            };

        }

        return {

            done: true

        };

    }

};

for (const numero of range) {

    console.log(numero);

}

// ============================================================================
// ¿Cuál es la diferencia?
// ============================================================================
//
// En esta versión:
//
// range
//
// es:
//
// - El iterable.
//
// - El iterador.
//
// Todo está en el mismo objeto.
//
// El código es más corto,
// pero tiene una desventaja.
//

// ============================================================================
// Desventaja
// ============================================================================
//
// Como existe un único iterador,
// no es posible recorrer el mismo objeto
// simultáneamente con dos bucles.
//
// Ambos compartirían el mismo estado.
//
// En la práctica esto rara vez representa un problema,
// por lo que esta implementación también es válida.

// ============================================================================
// Iteradores infinitos
// ============================================================================
//
// Un iterador NO está obligado a terminar.
//
// Puede generar valores infinitamente.
//
// Por ejemplo:
//
// range.to = Infinity;
//
// O un generador de números aleatorios.
//
// El método:
//
// next()
//
// puede seguir devolviendo:
//
// { done: false }
//
// indefinidamente.
//

// ============================================================================
// Detener un iterable infinito
// ============================================================================
//
// Si el iterable nunca termina,
// el for...of también sería infinito.
//
// En esos casos podemos detener el recorrido
// manualmente utilizando:
//
// break
//

for (const numero of range) {

    console.log(numero);

    if (numero === 3) {

        break;

    }

}

//
// Salida:
//
// 1
// 2
// 3
//
// ============================================================================
// STRINGS SON ITERABLES
// ============================================================================
//
// Los arrays no son los únicos objetos que pueden recorrerse con for...of.
//
// Las cadenas (String) también son iterables.
//
// Esto significa que podemos recorrer cada uno de sus caracteres utilizando
// exactamente la misma sintaxis.
//
// Ejemplo:
//

for (const caracter of "test") {

    console.log(caracter);

}

//
// Salida:
//
// t
// e
// s
// t
//

// ============================================================================
// ¿Cómo funciona?
// ============================================================================
//
// Internamente, String implementa el método:
//
// Symbol.iterator
//
// Gracias a ello, JavaScript sabe cómo obtener el siguiente carácter de la
// cadena en cada iteración.
//

// ============================================================================
// Caracteres Unicode
// ============================================================================
//
// Una gran ventaja de for...of es que funciona correctamente con caracteres
// Unicode especiales (como emojis o símbolos matemáticos).
//

let texto = "𝒳😂";

for (const caracter of texto) {

    console.log(caracter);

}

//
// Salida:
//
// 𝒳
// 😂
//
// Cada carácter complejo se obtiene correctamente como una sola unidad.
//

// ============================================================================
// ¿Por qué es importante?
// ============================================================================
//
// Algunos caracteres Unicode ocupan más de una posición interna en memoria.
//
// Los métodos antiguos pueden dividirlos incorrectamente.
//
// En cambio:
//
// - for...of
// - Array.from()
//
// conocen cómo recorrer estos caracteres correctamente.
//

// ============================================================================
// Llamar al iterador manualmente
// ============================================================================
//
// Normalmente utilizamos:
//
// for...of
//
// porque JavaScript maneja todo automáticamente.
//
// Sin embargo, también podemos trabajar directamente con el iterador.
//

let str = "Hello";

let iterator = str[Symbol.iterator]();

//
// iterator es un objeto que posee el método:
//
// next()
//

// ============================================================================
// Obtener los valores manualmente
// ============================================================================

while (true) {

    const resultado = iterator.next();

    if (resultado.done) {

        break;

    }

    console.log(resultado.value);

}

//
// Salida:
//
// H
// e
// l
// l
// o
//

// ============================================================================
// ¿Qué devuelve next()?
// ============================================================================
//
// Cada llamada devuelve un objeto:
//
// {
//     done: Boolean,
//     value: cualquierValor
// }
//
// Ejemplo:
//
// Primera llamada:
//
// { done:false, value:"H" }
//
// Segunda:
//
// { done:false, value:"e" }
//
// ...
//
// Última:
//
// { done:true }
//

// ============================================================================
// ¿Cuándo usar el iterador manualmente?
// ============================================================================
//
// En la mayoría de los casos NO es necesario.
//
// for...of es mucho más cómodo.
//
// El acceso manual solo resulta útil cuando queremos controlar el proceso de
// iteración.
//
// Por ejemplo:
//
// - Pausar el recorrido.
// - Continuarlo más tarde.
// - Consumir elementos uno por uno.
//

// ============================================================================
// ITERABLE VS ARRAY-LIKE
// ============================================================================
//
// Estos conceptos suelen confundirse, pero son diferentes.
//
// -----------------------------------------------------------------------------
// ITERABLE
// -----------------------------------------------------------------------------
//
// Implementa:
//
// Symbol.iterator
//
// Puede utilizarse con:
//
// for...of
//

// -----------------------------------------------------------------------------
// ARRAY-LIKE
// -----------------------------------------------------------------------------
//
// Tiene:
//
// - índices numéricos.
//
// - propiedad length.
//
// Parece un array,
// pero NO necesariamente puede recorrerse con for...of.
//

// ============================================================================
// String
// ============================================================================
//
// Un String es:
//
// - Iterable.
//
// - Array-like.
//
// Porque:
//
// Tiene índices:
//
// texto[0]
//
// Tiene:
//
// texto.length
//
// Además implementa:
//
// Symbol.iterator
//

// ============================================================================
// Nuestro objeto range
// ============================================================================
//
// El objeto range creado anteriormente es:
//
// - Iterable.
//
// - No es array-like.
//
// Porque:
//
// No posee índices:
//
// range[0]
//
// Ni:
//
// length
//

// ============================================================================
// Objeto array-like
// ============================================================================

let arrayLike = {

    0: "Hello",

    1: "World",

    length: 2

};

//
// Parece un array.
//
// Tiene:
//
// índice 0
// índice 1
// length
//
// Pero NO implementa:
//
// Symbol.iterator
//

// ============================================================================
// Error
// ============================================================================

// for (const item of arrayLike) {
//
// }
//
// TypeError
//
// Porque NO es iterable.
//

// ============================================================================
// ¿Por qué es un problema?
// ============================================================================
//
// Ni los iterables ni los objetos array-like son necesariamente arrays.
//
// Por lo tanto, pueden no tener métodos como:
//
// push()
// pop()
// map()
// filter()
// reduce()
//

// ============================================================================
// Array.from()
// ============================================================================
//
// Array.from() resuelve este problema.
//
// Convierte:
//
// - Un iterable.
//
// - Un objeto array-like.
//
// En un array REAL.
//

// Sintaxis:
//
// Array.from(obj)
//
//

arrayLike = {

    0: "Hello",

    1: "World",

    length: 2

};

let arr = Array.from(arrayLike);

console.log(arr);

// ["Hello","World"]

console.log(arr.pop());

// World

//
// Ahora sí podemos utilizar todos los métodos de Array.
//

// ============================================================================
// Convertir un iterable
// ============================================================================

//
// También funciona con cualquier iterable.
//

// Suponiendo que "range" es el iterable creado anteriormente.

// let numeros = Array.from(range);

// console.log(numeros);
//
// [1,2,3,4,5]
//

// ============================================================================
// mapFn
// ============================================================================
//
// Array.from() acepta una función opcional.
//
// Sintaxis:
//
// Array.from(obj, mapFn)
//
// Cada elemento pasa por esa función
// antes de ser agregado al nuevo array.
//

// let cuadrados = Array.from(
//
//     range,
//
//     numero => numero * numero
//
// );
//
// Resultado:
//
// [1,4,9,16,25]
//

// ============================================================================
// Convertir un String en un Array
// ============================================================================

str = "𝒳😂";

let caracteres = Array.from(str);

console.log(caracteres);

// ["𝒳","😂"]

console.log(caracteres.length);

// 2

//
// Array.from() utiliza el iterador del String,
// por lo que maneja correctamente caracteres Unicode.
//

// ============================================================================
// Equivale aproximadamente a esto
// ============================================================================

let chars = [];

for (const caracter of str) {

    chars.push(caracter);

}

console.log(chars);

//
// ["𝒳","😂"]
//

// ============================================================================
// ¿Por qué no usar split("")?
// ============================================================================
//
// split("") separa la cadena según posiciones internas.
//
// Con caracteres Unicode complejos puede producir resultados incorrectos.
//
// Array.from() utiliza el protocolo de iteración,
// por lo que funciona correctamente.
//

// ============================================================================
// Ejemplo práctico
// ============================================================================

function sliceUnicode(str, inicio, fin) {

    return Array

        .from(str)

        .slice(inicio, fin)

        .join("");

}

let unicode = "𝒳😂𩷶";

console.log(

    sliceUnicode(unicode, 1, 3)

);

// 😂𩷶

//
// String.slice() no siempre maneja correctamente
// este tipo de caracteres.
//

// ============================================================================
// DIFERENCIAS IMPORTANTES
// ============================================================================
//
// Iterable
// ----------------------------
//
// - Implementa Symbol.iterator.
//
// - Funciona con for...of.
//
// - Puede convertirse con Array.from().
//
//
//
// Array-like
// ----------------------------
//
// - Tiene índices.
//
// - Tiene length.
//
// - No necesariamente funciona con for...of.
//
// - También puede convertirse con Array.from().
//
"use strict";

// ============================================================================
// MAP
// ============================================================================
//
// Hasta ahora hemos trabajado principalmente con dos estructuras de datos:
//
// - Object -> almacena colecciones mediante pares clave-valor.
// - Array -> almacena colecciones ordenadas mediante índices.
//
// Sin embargo, en aplicaciones reales estas dos estructuras no siempre son
// suficientes. Para cubrir más casos de uso, JavaScript incorpora:
//
// - Map
// - Set
//
// En esta parte estudiaremos Map.
//

// ============================================================================
// ¿Qué es un Map?
// ============================================================================
//
// Un Map es una colección de pares:
//
// clave -> valor
//
// Muy parecido a un objeto (Object), pero con una diferencia muy importante:
// Un Map permite utilizar CLAVES DE CUALQUIER TIPO.
// En cambio, un Object solo permite como claves:
//
// - String
// - Symbol
//

// ============================================================================
// Crear un Map
// ============================================================================

let map = new Map();
console.log(map);

// Map(0) {}

// ============================================================================
// Métodos principales
// ============================================================================
//
// new Map()
// --------------------------
// Crea un Map vacío.
//
//
// map.set(clave, valor)
// --------------------------
// Agrega un nuevo elemento.
//
// Si la clave ya existe,
// simplemente actualiza su valor.
//
//
//
// map.get(clave)
// --------------------------
// Devuelve el valor asociado a la clave.
//
// Si la clave no existe,
// devuelve:
//
// undefined
//
//
//
// map.has(clave)
// --------------------------
// Devuelve:
//
// true  -> si la clave existe.
//
// false -> si no existe.
//
//
//
// map.delete(clave)
// --------------------------
// Elimina un elemento.
//
// Devuelve:
//
// true  -> si fue eliminado.
//
// false -> si no existía.
//
//
//
// map.clear()
// --------------------------
// Elimina TODOS los elementos.
//
//
//
// map.size
// --------------------------
// Devuelve la cantidad de elementos.
//
// (Es una propiedad, NO un método).
//

// ============================================================================
// Ejemplo básico
// ============================================================================

map = new Map();

map.set("1", "str1");

map.set(1, "num1");

map.set(true, "bool1");

console.log(map.get(1));

// "num1"

console.log(map.get("1"));

// "str1"

console.log(map.size);

// 3

//
// Observa que:
//
// "1"
//
// y
//
// 1
//
// son claves completamente diferentes.
//

// ============================================================================
// Diferencia con Object
// ============================================================================
//
// En un Object:
//
// todas las claves se convierten automáticamente
// en String.
//
// En cambio, Map conserva el tipo original.
//

// Object

let obj = {};

obj["1"] = "texto";

obj[1] = "número";

console.log(obj);

//
// Solo existe UNA clave:
//
// "1"
//
// porque ambas terminan convirtiéndose en String.
//

// Map

map = new Map();

map.set("1", "texto");

map.set(1, "número");

console.log(map.size);

// 2

//
// En Map ambas claves son diferentes.
//

// ============================================================================
// NO usar map[clave]
// ============================================================================
//
// Aunque este código funciona:
//
// map["nombre"] = "Juan";
//
// NO estamos utilizando el Map.
//
// En realidad estamos agregando una propiedad
// normal al objeto Map.
//

map = new Map();

map["nombre"] = "Juan";

console.log(map["nombre"]);

// Juan

console.log(map.get("nombre"));

// undefined

//
// El dato NO quedó almacenado dentro del Map.
//
// Por eso siempre debemos utilizar:
//
// - set()
// - get()
// - has()
// - delete()
//
// Nunca:
//
// map[clave]
//

// ============================================================================
// Objetos como claves
// ============================================================================
//
// Una de las características más importantes de Map
// es que permite utilizar OBJETOS como claves.
//

let john = {

    name: "John"

};

let visitsCount = new Map();

visitsCount.set(john, 123);

console.log(

    visitsCount.get(john)

);

// 123

//
// Aquí la clave NO es el texto:
//
// "John"
//
// Sino el propio objeto.
//

// ============================================================================
// ¿Por qué Object no puede hacerlo?
// ============================================================================

let ben = {

    name: "Ben"

};

john = {

    name: "John"

};

let visitsObject = {};

visitsObject[ben] = 234;

visitsObject[john] = 123;

console.log(visitsObject);

//
// Resultado:
//
// {
//     "[object Object]":123
// }
//
// Ambos objetos terminaron convirtiéndose
// en la misma cadena:
//
// "[object Object]"
//
// El segundo valor sobrescribió al primero.
//

// ============================================================================
// Ventaja de Map
// ============================================================================
//
// Cada objeto conserva su identidad.
//
// Aunque dos objetos tengan exactamente
// las mismas propiedades,
// siguen siendo claves diferentes.
//

let persona1 = {

    nombre: "Juan"

};

let persona2 = {

    nombre: "Juan"

};

map = new Map();

map.set(persona1, "Administrador");

map.set(persona2, "Usuario");

console.log(map.size);

// 2

//
// Son objetos distintos,
// por eso existen dos claves distintas.
//

// ============================================================================
// Comparación de claves
// ============================================================================
//
// Map utiliza internamente el algoritmo:
//
// SameValueZero
//
// Es prácticamente igual a:
//
// ===
//
// salvo por una diferencia:
//
// NaN es igual a NaN.
//

map = new Map();

map.set(NaN, "Valor especial");

console.log(

    map.get(NaN)

);

// Valor especial

//
// Con ===:
//
// NaN === NaN
//
// devuelve:
//
// false
//
// Pero Map considera ambas claves iguales.
//

// ============================================================================
// Encadenamiento (Chaining)
// ============================================================================
//
// El método:
//
// set()
//
// devuelve el propio Map.
//
// Gracias a ello podemos encadenar llamadas.
//

map = new Map();

map

    .set("1", "str1")

    .set(1, "num1")

    .set(true, "bool1");

console.log(map);

//
// Es exactamente igual que escribir:
//
// map.set("1","str1");
//
// map.set(1,"num1");
//
// map.set(true,"bool1");
//
// pero ocupa menos espacio.
//

// ============================================================================
// ITERACIÓN SOBRE MAP
// ============================================================================
//
// Una de las grandes ventajas de Map es que permite recorrer fácilmente
// todos sus elementos.
//
// Para ello dispone de varios métodos que devuelven objetos iterables.
//
// Los tres principales son:
//
// - map.keys()
// - map.values()
// - map.entries()
//
// Todos pueden utilizarse directamente con:
//
// for...of
//

// ============================================================================
// map.keys()
// ============================================================================
//
// Devuelve un iterable con TODAS las claves del Map.
//

let recipeMap = new Map([

    ["cucumber", 500],

    ["tomatoes", 350],

    ["onion", 50]

]);

for (const vegetable of recipeMap.keys()) {

    console.log(vegetable);

}

//
// Salida:
//
// cucumber
// tomatoes
// onion
//

// ============================================================================
// map.values()
// ============================================================================
//
// Devuelve un iterable con TODOS los valores.
//

for (const amount of recipeMap.values()) {

    console.log(amount);

}

//
// Salida:
//
// 500
// 350
// 50
//

// ============================================================================
// map.entries()
// ============================================================================
//
// Devuelve un iterable formado por pares:
//
// [clave, valor]
//
// Cada elemento es un array de dos posiciones.
//

for (const entry of recipeMap.entries()) {

    console.log(entry);

}

//
// Salida:
//
// ["cucumber",500]
//
// ["tomatoes",350]
//
// ["onion",50]
//

// ============================================================================
// for...of utiliza entries() por defecto
// ============================================================================
//
// Cuando recorremos directamente un Map:
//
// for (const elemento of map)
//
// JavaScript utiliza automáticamente:
//
// map.entries()
//
// Por eso estos dos bucles hacen exactamente lo mismo.
//

for (const entry of recipeMap) {

    console.log(entry);

}

for (const entry of recipeMap.entries()) {

    console.log(entry);

}

// ============================================================================
// Desestructuración
// ============================================================================
//
// Lo más habitual es utilizar desestructuración
// para obtener la clave y el valor
// por separado.
//

for (const [vegetable, amount] of recipeMap) {

    console.log(

        vegetable,

        amount

    );

}

//
// Salida:
//
// cucumber 500
//
// tomatoes 350
//
// onion 50
//

// ============================================================================
// Map conserva el orden de inserción
// ============================================================================
//
// Una característica muy importante:
//
// Map recuerda el orden en que fueron agregados
// los elementos.
//
// Siempre recorrerá sus elementos
// siguiendo ese mismo orden.
//

map = new Map();

map.set("C", 3);

map.set("A", 1);

map.set("B", 2);

for (const [key, value] of map) {

    console.log(key, value);

}

//
// Salida:
//
// C 3
//
// A 1
//
// B 2
//
// Observa que NO aparecen ordenados alfabéticamente.
//
// Se muestran exactamente en el orden
// en que fueron insertados.
//

// ============================================================================
// forEach()
// ============================================================================
//
// Al igual que Array,
// Map también posee un método:
//
// forEach()
//
// Ejecuta una función para cada elemento.
//

recipeMap.forEach(

    (value, key, map) => {

        console.log(

            `${key}: ${value}`

        );

    }

);

//
// Salida:
//
// cucumber: 500
//
// tomatoes: 350
//
// onion: 50
//

// ============================================================================
// Parámetros de forEach()
// ============================================================================
//
// value
// -------------------------
// Valor almacenado.
//
//
//
// key
// -------------------------
// Clave correspondiente.
//
//
//
// map
// -------------------------
// El propio Map.
//

// ============================================================================
// Object.entries()
// ============================================================================
//
// Muchas veces tenemos un Object
// pero queremos convertirlo en un Map.
//
// Para ello existe:
//
// Object.entries()
//
// Devuelve un array con pares:
//
// [clave, valor]
//
// exactamente en el formato
// que necesita Map.
//

let obj = {

    name: "John",

    age: 30

};

console.log(

    Object.entries(obj)

);

//
// Resultado:
//
// [
//     ["name","John"],
//     ["age",30]
// ]
//

// ============================================================================
// Crear un Map desde un Object
// ============================================================================

map = new Map(

    Object.entries(obj)

);

console.log(

    map.get("name")

);

// John

//
// El proceso es:
//
// Object -> Object.entries() -> Array de pares -> new Map()


// ============================================================================
// Object.fromEntries()
// ============================================================================
//
// También podemos hacer el proceso contrario.
//
// Convertir:
//
// Map -> Object
//
// Para ello existe:
//
// Object.fromEntries()
//

// ============================================================================
// Ejemplo
// ============================================================================

let prices = Object.fromEntries([

    ["banana", 1],

    ["orange", 2],

    ["meat", 4]

]);

console.log(prices);

//
// {
//     banana:1,
//     orange:2,
//     meat:4
// }
//

// ============================================================================
// Convertir un Map en un Object
// ============================================================================

map = new Map();

map.set("banana", 1);

map.set("orange", 2);

map.set("meat", 4);

obj = Object.fromEntries(

    map.entries()

);

console.log(obj);

//
// {
//     banana:1,
//     orange:2,
//     meat:4
// }
//

// ============================================================================
// Forma abreviada
// ============================================================================
//
// map.entries()
//
// puede omitirse.
//

obj = Object.fromEntries(map);

console.log(obj);

//
// Produce exactamente el mismo resultado.
//
// Esto es posible porque:
//
// Map ya es un iterable de pares:
//
// [clave, valor]
//
// que es precisamente lo que espera
// Object.fromEntries().
//

// ============================================================================
// ¿Cuándo usar estas conversiones?
// ============================================================================
//
// Object -> Map
// ----------------------------
//
// Cuando queremos aprovechar:
//
// - claves de cualquier tipo.
// - size.
// - mejor manejo de colecciones.
// 
//
// Map -> Object
// ----------------------------
//
// Cuando una librería,
// una API o una función
// espera recibir un objeto normal.
//

// ============================================================================
// RESUMEN
// ============================================================================
//
// ✔ map.keys()
//     Devuelve un iterable con todas las claves.
//
// ✔ map.values()
//     Devuelve un iterable con todos los valores.
//
// ✔ map.entries()
//     Devuelve pares:
//
//     [clave, valor]
//
// ✔ for...of utiliza entries() automáticamente.
//
// ✔ Map conserva siempre el orden de inserción.
//
// ✔ map.forEach()
//     Recorre todos los elementos.
//
// ✔ Object.entries(obj)
//     Convierte un Object en un array
//     de pares [clave, valor].
//
// ✔ new Map(Object.entries(obj))
//     Convierte un Object en un Map.
//
// ✔ Object.fromEntries(map)
//     Convierte un Map nuevamente
//     en un Object.
//
// ======================================================
// Set
// ======================================================

/*
Set es una estructura de datos especial que almacena únicamente valores
(no pares clave-valor como Map).

Su característica principal es que NO permite elementos duplicados.
Si intentamos agregar el mismo valor varias veces, solo se almacenará una copia.

Es ideal para:
- Eliminar duplicados.
- Mantener listas de valores únicos.
- Comprobar rápidamente si un valor existe.
*/

// ======================================================
// Crear un Set
// ======================================================

// Sintaxis
let set = new Set([/* iterable opcional */]);

// También puede crearse vacío
let numbers = new Set();


// ======================================================
// Métodos principales
// ======================================================

/*
add(valor)
-> Agrega un valor.
-> Si el valor ya existe, no hace nada.
-> Devuelve el propio Set (permite encadenar llamadas).
*/

set.add(valor);

/*
delete(valor)
-> Elimina un valor.
-> Devuelve true si existía.
-> Devuelve false si no existía.
*/

set.delete(valor);

/*
has(valor)
-> Comprueba si un valor existe.
-> Devuelve true o false.
*/

set.has(valor);

/*
clear()
-> Elimina todos los elementos.
*/

set.clear();

/*
size
-> Devuelve la cantidad de elementos almacenados.
*/

set.size;


// ======================================================
// Ejemplo: evitar elementos duplicados
// ======================================================

let visitors = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// Algunos usuarios visitan varias veces
visitors.add(john);
visitors.add(pete);
visitors.add(mary);
visitors.add(john);
visitors.add(mary);

// Solo se almacenan valores únicos
alert(visitors.size); // 3

for (let user of visitors) {
  alert(user.name);
}

/*
Resultado:
John
Pete
Mary

Aunque John y Mary fueron agregados dos veces,
solo aparecen una vez.
*/


// ======================================================
// ¿Por qué usar Set en lugar de un Array?
// ======================================================

/*
Con un array tendríamos que comprobar manualmente
si el elemento ya existe antes de insertarlo.

Ejemplo:

if (!users.includes(user)) {
    users.push(user);
}

o

if (!users.find(u => u === user)) {
    users.push(user);
}

Estas búsquedas recorren el array.

Set está optimizado internamente para comprobar
la existencia de valores de forma mucho más eficiente.
*/


// ======================================================
// Iterar un Set
// ======================================================

let fruits = new Set([
    "Orange",
    "Apple",
    "Banana"
]);

//------------------------------------------------------
// for...of
//------------------------------------------------------

for (let value of fruits) {
    alert(value);
}

/*
Orange
Apple
Banana
*/


//------------------------------------------------------
// forEach()
//------------------------------------------------------

fruits.forEach((value, valueAgain, set) => {
    alert(value);
});

/*
El callback recibe tres argumentos:

value
-> Valor actual.

valueAgain
-> Es exactamente el mismo valor.

set
-> El Set completo.
*/

/*
¿Por qué aparecen dos veces?

En Map el callback recibe:

(value, key, map)

Como Set no tiene claves, JavaScript repite el mismo valor
para mantener compatibilidad entre ambas estructuras.
*/


// ======================================================
// Métodos de iteración
// ======================================================

/*
keys()
-> Devuelve un iterable con los valores.

(En Set "keys" y "values" son exactamente iguales,
porque no existen claves.)
*/

for (let value of fruits.keys()) {
    console.log(value);
}

/*
values()
-> Devuelve un iterable con los valores.
*/

for (let value of fruits.values()) {
    console.log(value);
}

/*
entries()
-> Devuelve pares [valor, valor].

Existe únicamente para mantener compatibilidad con Map.
*/

for (let entry of fruits.entries()) {
    console.log(entry);
}

/*
Salida:

["Orange", "Orange"]
["Apple", "Apple"]
["Banana", "Banana"]
*/


// ======================================================
// Resumen de Set
// ======================================================

/*
Crear
------
new Set(iterable)

Agregar
--------
set.add(valor)

Eliminar
---------
set.delete(valor)

Comprobar existencia
--------------------
set.has(valor)

Eliminar todo
-------------
set.clear()

Cantidad de elementos
---------------------
set.size

Iterar
-------
for...of
set.forEach()

Iteradores
-----------
set.keys()
set.values()
set.entries()

Características
---------------
✔ Solo almacena valores únicos.
✔ Mantiene el orden de inserción.
✔ Permite cualquier tipo de dato.
✔ Muy eficiente para comprobar si un valor existe.
*/


// ======================================================
// Diferencias entre Map y Set
// ======================================================

/*
Map
----
Guarda pares:

clave -> valor

Ejemplo:

Map {
    "name" => "John",
    "age" => 30
}


Set
----
Solo guarda valores únicos.

Ejemplo:

Set {
    "Apple",
    "Orange",
    "Banana"
}
*/


// ======================================================
// Resumen general
// ======================================================

/*
MAP
-----------------------------------------

new Map(iterable)

map.set(key, value)
map.get(key)
map.has(key)
map.delete(key)
map.clear()
map.size

Características:
- Claves de cualquier tipo.
- Mantiene el orden de inserción.
- Ideal para asociaciones clave → valor.


SET
-----------------------------------------

new Set(iterable)

set.add(value)
set.delete(value)
set.has(value)
set.clear()
set.size

Características:
- Solo almacena valores únicos.
- Mantiene el orden de inserción.
- Ideal para eliminar duplicados y comprobar existencia.


IMPORTANTE
----------

Map y Set conservan el orden en que los elementos fueron insertados.

Sin embargo:

- No pueden reordenarse automáticamente.
- No permiten acceder directamente por índice como un Array.

Si necesitas acceder por posición, un Array sigue siendo la estructura adecuada.
*/
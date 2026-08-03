// ======================================================
// Object.keys(), Object.values() y Object.entries()
// ======================================================

/*
Hasta ahora hemos visto que estructuras como Map poseen métodos como:

map.keys()
map.values()
map.entries()

Estos métodos permiten recorrer fácilmente su contenido.

De hecho, forman parte de una convención utilizada por muchas estructuras
de datos en JavaScript.

Los encontramos en:

- Map
- Set
- Array

Los objetos (Object) también ofrecen métodos similares, aunque con una
pequeña diferencia en la sintaxis.
*/


// ======================================================
// Métodos disponibles
// ======================================================

/*
Object.keys(obj)
-> Devuelve un array con todas las claves (propiedades).

Object.values(obj)
-> Devuelve un array con todos los valores.

Object.entries(obj)
-> Devuelve un array de pares:
[propiedad, valor]

*/

let user = {
    name: "John",
    age: 30
};

console.log(Object.keys(user));
// ["name", "age"]

console.log(Object.values(user));
// ["John", 30]

console.log(Object.entries(user));
// [
//   ["name", "John"],
//   ["age", 30]
// ]


// ======================================================
// Diferencias con Map
// ======================================================

/*
Map
----
map.keys()

map.values()

map.entries()

Devuelven un ITERABLE.


Object
-------
Object.keys(obj)

Object.values(obj)

Object.entries(obj)

Devuelven un ARRAY REAL.
*/


// ======================================================
// ¿Por qué se llaman así?
// ======================================================

/*
Podría parecer más natural escribir:

obj.keys()

Sin embargo JavaScript utiliza:

Object.keys(obj)

¿Por qué?

Porque cualquier objeto podría definir su propio método keys().

Usando Object.keys(obj), JavaScript garantiza que siempre se utilice
la implementación oficial del lenguaje, independientemente del contenido
del objeto.
*/


// ======================================================
// Ejemplo de Object.values()
// ======================================================

let person = {
    name: "John",
    age: 30
};

for (let value of Object.values(person)) {

    console.log(value);

}

/*
Salida:

John
30
*/


// ======================================================
// Propiedades Symbol
// ======================================================

/*
Object.keys()
Object.values()
Object.entries()

IGNORAN las propiedades cuyo nombre sea un Symbol.

Ejemplo:
*/

let id = Symbol("id");

let admin = {
    name: "John",
    [id]: 123
};

console.log(Object.keys(admin));
// ["name"]

console.log(Object.values(admin));
// ["John"]

console.log(Object.entries(admin));
// [["name","John"]]

/*
La propiedad Symbol no aparece.
*/


// ======================================================
// Obtener propiedades Symbol
// ======================================================

/*
Si necesitamos trabajar con propiedades Symbol,
existen métodos específicos.
*/

// Solo propiedades Symbol

Object.getOwnPropertySymbols(admin);

// Todas las propiedades (incluyendo Symbol)

Reflect.ownKeys(admin);


// ======================================================
// Transformar objetos
// ======================================================

/*
Los objetos NO poseen métodos como:

map()
filter()
reduce()

Estos métodos pertenecen a Array.

Entonces...

¿Cómo transformamos un objeto?

La técnica habitual consiste en convertirlo temporalmente
en un array.
*/


// ======================================================
// Paso 1: Object.entries()
// ======================================================

let prices = {

    banana: 1,
    orange: 2,
    meat: 4

};

let entries = Object.entries(prices);

console.log(entries);

/*
[
    ["banana",1],
    ["orange",2],
    ["meat",4]
]
*/


// ======================================================
// Paso 2: usar métodos de Array
// ======================================================

let doubled = entries.map(

    ([key, value]) => [key, value * 2]

);

console.log(doubled);

/*
[
    ["banana",2],
    ["orange",4],
    ["meat",8]
]
*/


// ======================================================
// Paso 3: volver a convertirlo en objeto
// ======================================================

let doublePrices = Object.fromEntries(doubled);

console.log(doublePrices);

/*
{
    banana: 2,
    orange: 4,
    meat: 8
}
*/


// ======================================================
// Todo junto
// ======================================================

let products = {

    banana: 1,
    orange: 2,
    meat: 4

};

let doubledPrices = Object.fromEntries(

    Object.entries(products)

        .map(([key, value]) => [key, value * 2])

);

console.log(doubledPrices);

/*
{
    banana: 2,
    orange: 4,
    meat: 8
}
*/


// ======================================================
// ¿Qué ocurre paso a paso?
// ======================================================

/*
Objeto original

{
    banana: 1,
    orange: 2,
    meat: 4
}

        │
        ▼

Object.entries()

[
    ["banana",1],
    ["orange",2],
    ["meat",4]
]

        │
        ▼

.map()

[
    ["banana",2],
    ["orange",4],
    ["meat",8]
]

        │
        ▼

Object.fromEntries()

{
    banana: 2,
    orange: 4,
    meat: 8
}
*/


// ======================================================
// Resumen
// ======================================================

/*
Object.keys(obj)
----------------
Devuelve un array con las claves.

Object.values(obj)
------------------
Devuelve un array con los valores.

Object.entries(obj)
-------------------
Devuelve un array de pares:

[propiedad, valor]

Object.fromEntries(array)
-------------------------
Realiza la operación inversa:

Convierte un array de pares

[
    ["a",1],
    ["b",2]
]

en

{
    a:1,
    b:2
}

IMPORTANTE
----------
Los métodos Object.* devuelven ARRAYS REALES,
por lo que podemos utilizar inmediatamente:

- map()
- filter()
- reduce()
- find()
- some()
- every()

Esto permite transformar objetos de forma muy sencilla
convirtiéndolos temporalmente en arrays y luego reconstruyéndolos.
*/
// ======================================================
// Métodos en tipos primitivos
// ======================================================

// Aunque los tipos primitivos no son objetos,
// JavaScript permite utilizar métodos sobre ellos
// como si lo fueran.


// ======================================================
// Tipos primitivos
// ======================================================

// Los valores primitivos almacenan un único valor.
//
// Existen 7 tipos primitivos:
//
// - string
// - number
// - bigint
// - boolean
// - symbol
// - null
// - undefined


// ======================================================
// Objetos
// ======================================================

// Un objeto puede almacenar múltiples valores
// mediante propiedades.

let user = {
    name: "John",
    age: 30
};

// También puede almacenar funciones (métodos).

let john = {
    name: "John",

    sayHi() {
        alert("Hi buddy!");
    }
};

john.sayHi();


// ======================================================
// Objetos vs. primitivos
// ======================================================

// Los objetos son más pesados porque almacenan
// información adicional para soportar propiedades,
// métodos y otras características.
//
// Los primitivos son mucho más ligeros y rápidos.


// ======================================================
// ¿Cómo pueden los primitivos tener métodos?
// ======================================================

// JavaScript utiliza un objeto temporal
// (wrapper object u objeto envoltorio).

// El proceso es el siguiente:
//
// 1. Se crea un objeto temporal.
// 2. Ese objeto contiene métodos útiles.
// 3. Se ejecuta el método.
// 4. El objeto temporal se destruye.


// ======================================================
// Wrapper objects
// ======================================================

// Cada tipo primitivo posee su propio objeto envoltorio.

//
// string  -> String
// number  -> Number
// boolean -> Boolean
// symbol  -> Symbol
// bigint  -> BigInt
//

// Gracias a ellos podemos utilizar métodos
// sobre valores primitivos.

let str = "Hello";

alert(str.toUpperCase()); // HELLO


// Internamente ocurre algo parecido a:
//
// 1. Se crea un objeto String temporal.
// 2. Se ejecuta toUpperCase().
// 3. Se devuelve el resultado.
// 4. El objeto temporal desaparece.


// ======================================================
// Ejemplo con números
// ======================================================

let n = 1.23456;

alert(n.toFixed(2)); // 1.23


// ======================================================
// Constructores String, Number y Boolean
// ======================================================

// Existen por compatibilidad histórica.
//
// Es posible crear objetos usando new,
// pero NO se recomienda.

alert(typeof 0);              // "number"
alert(typeof new Number(0));  // "object"


// Los objetos siempre son truthy.

let cero = new Number(0);

if (cero) {
    alert("¿cero es verdadero?!?");
}


// ======================================================
// Conversión de tipos
// ======================================================

// Sin utilizar new, estas funciones convierten
// valores al tipo primitivo correspondiente.

let num = Number("123");


// ======================================================
// null y undefined
// ======================================================

// Son la excepción.
//
// No tienen objeto envoltorio
// y no poseen métodos.

alert(null.test); // Error


// ======================================================
// Resumen
// ======================================================

// - Los tipos primitivos pueden usar métodos.
//
// - JavaScript crea automáticamente un objeto
//   envoltorio temporal para ejecutar esos métodos.
//
// - Después de ejecutar el método, ese objeto
//   temporal se elimina.
//
// - Cada tipo primitivo tiene su propio wrapper:
//
//   String
//   Number
//   Boolean
//   Symbol
//   BigInt
//
// - No se recomienda crear wrappers con new.
//
// - null y undefined no tienen wrapper,
//   por lo que no poseen métodos.
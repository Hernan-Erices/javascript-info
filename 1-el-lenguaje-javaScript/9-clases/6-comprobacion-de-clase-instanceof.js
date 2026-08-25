// ============================================================
// COMPROBACIÓN DE CLASE: instanceof
// ============================================================
//
// instanceof permite comprobar si un objeto es una instancia
// de una clase determinada.
//
// También tiene en cuenta la HERENCIA.
//
// Sintaxis:
//
// object instanceof Class
//
// Devuelve:
// true  ? si pertenece a Class o a una clase que hereda de ella.
// false ? si no pertenece.
//
// ============================================================


// ============================================================
// 1. USO BÁSICO
// ============================================================

class Rabbit {}

const rabbit = new Rabbit();

console.log(rabbit instanceof Rabbit); // true
console.log(rabbit instanceof Object); // true


// ============================================================
// 2. INSTANCEOF Y HERENCIA
// ============================================================
//
// instanceof también devuelve true para las clases padre.
//
// Rabbit
//   ?
// Animal
//   ?
// Object

class Animal {}

class Rabbit2 extends Animal {}

const rabbit2 = new Rabbit2();

console.log(rabbit2 instanceof Rabbit2); // true
console.log(rabbit2 instanceof Animal);  // true
console.log(rabbit2 instanceof Object);  // true


// ============================================================
// 3. TAMBIÉN FUNCIONA CON CLASES NATIVAS
// ============================================================

const arr = [1, 2, 3];

console.log(arr instanceof Array);  // true
console.log(arr instanceof Object); // true

const date = new Date();

console.log(date instanceof Date);   // true
console.log(date instanceof Object); // true


// ============================================================
// 4. TAMBIÉN FUNCIONA CON FUNCIONES CONSTRUCTORAS
// ============================================================
//
// instanceof no está limitado a class.
//

function User() {}

const user = new User();

console.log(user instanceof User);   // true
console.log(user instanceof Object); // true


// ============================================================
// 5. ¿CÓMO FUNCIONA instanceof?
// ============================================================
//
// Normalmente JavaScript busca:
//
//     Class.prototype
//
// dentro de la cadena de prototipos del objeto.
//
// Conceptualmente:
//
// object
//   ?
// object.__proto__
//   ?
// siguiente prototipo
//   ?
// siguiente prototipo
//   ?
// null
//
// Si encuentra:
//
// object.__proto__ === Class.prototype
//
// devuelve true.
//
// Ejemplo:

class Animal2 {}

class Rabbit3 extends Animal2 {}

const rabbit3 = new Rabbit3();

console.log(
    Rabbit3.prototype.isPrototypeOf(rabbit3)
); // true

console.log(
    Animal2.prototype.isPrototypeOf(rabbit3)
); // true


// ============================================================
// 6. INSTANCEOF Y CAMBIOS EN prototype
// ============================================================
//
// instanceof NO comprueba simplemente:
//
// "¿Fue creado usando este constructor?"
//
// Comprueba la cadena de prototipos actual.
//
// Por eso, si cambiamos el prototype después de crear
// el objeto, el resultado puede cambiar.

function Rabbit4() {}

const rabbit4 = new Rabbit4();

console.log(rabbit4 instanceof Rabbit4); // true

Rabbit4.prototype = {};

console.log(rabbit4 instanceof Rabbit4); // false
//
// El objeto conserva su antiguo prototipo.
//
// Rabbit4.prototype ahora apunta a otro objeto.
//
// Por eso ya no coincide con la cadena de prototipos
// de rabbit4.
//
// ============================================================


// ============================================================
// 7. Symbol.hasInstance
// ============================================================
//
// Podemos personalizar cómo funciona instanceof.
//
// Si una clase tiene:
//
// static [Symbol.hasInstance](object)
//
// JavaScript utilizará ese método para decidir el resultado.
//
// Ejemplo:

class Animal3 {
    static [Symbol.hasInstance](obj) {
        return obj.canEat === true;
    }
}

const obj = {
    canEat: true
};

console.log(obj instanceof Animal3); // true

//
// Aquí obj NO fue creado con new Animal3().
//
// La comprobación fue personalizada:
//
// Animal3[Symbol.hasInstance](obj)
//
// ============================================================


// ============================================================
// 8. INSTANCEOF VS isPrototypeOf()
// ============================================================
//
// Estas comprobaciones están relacionadas:
//
// object instanceof Class
//
// es conceptualmente equivalente a:
//
// Class.prototype.isPrototypeOf(object)
//
// Ejemplo:

class Person {}

const person = new Person();

console.log(person instanceof Person); // true

console.log(
    Person.prototype.isPrototypeOf(person)
); // true


// ============================================================
// 9. instanceof NO COMPRUEBA EL CONSTRUCTOR DIRECTAMENTE
// ============================================================
//
// Lo importante es:
//
//     Class.prototype
//
// y la cadena de prototipos del objeto.
//
// El constructor Class no participa directamente en la
// comprobación.
//
// Esto explica por qué cambiar Class.prototype puede cambiar
// el resultado de instanceof.
//
// ============================================================


// ============================================================
// 10. Object.prototype.toString()
// ============================================================
//
// Otra forma de identificar el tipo de un valor es:
//
// Object.prototype.toString.call(value)
//
// Puede detectar tipos primitivos y objetos integrados.
//
// Ejemplos:

const objectToString = Object.prototype.toString;

console.log(objectToString.call(123));
// [object Number]

console.log(objectToString.call("Hola"));
// [object String]

console.log(objectToString.call(true));
// [object Boolean]

console.log(objectToString.call(null));
// [object Null]

console.log(objectToString.call(undefined));
// [object Undefined]

console.log(objectToString.call([]));
// [object Array]

console.log(objectToString.call({}));
// [object Object]

console.log(objectToString.call(() => {}));
// [object Function]


// ============================================================
// 11. ¿POR QUÉ USAR call()?
// ============================================================
//
// Object.prototype.toString es un método.
//
// Podemos ejecutarlo usando otro objeto como this:
//
// objectToString.call(value)
//
// Por ejemplo:
//
// objectToString.call([])
//
// equivale conceptualmente a ejecutar:
//
// Object.prototype.toString
// con this = []
//
// ============================================================


// ============================================================
// 12. Symbol.toStringTag
// ============================================================
//
// Podemos personalizar el resultado de:
//
// Object.prototype.toString.call(object)
//
// utilizando Symbol.toStringTag.

const customObject = {
    [Symbol.toStringTag]: "User"
};

console.log(
    Object.prototype.toString.call(customObject)
);
// [object User]


// ============================================================
// 13. ¿INSTANCEOF O Object.prototype.toString?
// ============================================================
//
// instanceof:
// -------------------------
// Sirve principalmente para comprobar:
//
// "¿Este objeto pertenece a esta clase o a una clase hija?"
//
// Ejemplo:
//
// user instanceof User
//
//
//
// Object.prototype.toString.call():
// -------------------------
// Sirve para obtener una representación del tipo:
//
// [object Array]
// [object Date]
// [object Number]
//
// Es especialmente útil cuando queremos identificar
// objetos integrados.
//
// ============================================================


// ============================================================
// RESUMEN
// ============================================================
//
// instanceof
// ----------
//
// object instanceof Class
//
// Comprueba si Class.prototype aparece en la cadena de
// prototipos de object.
//
//
// HERENCIA
// --------
//
// class Animal {}
// class Rabbit extends Animal {}
//
// const rabbit = new Rabbit();
//
// rabbit instanceof Rabbit  // true
// rabbit instanceof Animal  // true
// rabbit instanceof Object  // true
//
//
// FUNCIONA CON:
// ------------
//
// - class
// - funciones constructoras
// - clases integradas como Array, Date, Map, etc.
// - herencia
//
//
// Symbol.hasInstance
// ------------------
//
// Permite personalizar instanceof:
//
// class Animal {
//     static [Symbol.hasInstance](obj) {
//         return obj.canEat;
//     }
// }
//
//
//
// isPrototypeOf()
// ---------------
//
// Class.prototype.isPrototypeOf(object)
//
// Permite comprobar si un objeto aparece en la cadena
// de prototipos de otro.
//
//
//
// Object.prototype.toString.call()
// --------------------------------
//
// Permite identificar tipos:
//
// Object.prototype.toString.call([])
// ? [object Array]
//
// Object.prototype.toString.call(123)
// ? [object Number]
//
// Object.prototype.toString.call(null)
// ? [object Null]
//
//
// Symbol.toStringTag
// ------------------
//
// Permite personalizar el tipo mostrado por toString:
//
// {
//     [Symbol.toStringTag]: "User"
// }
//
// ? [object User]
//
// ============================================================


// ============================================================
// REGLAS CLAVE PARA MEMORIZAR
// ============================================================
//
// 1. instanceof comprueba la cadena de prototipos.
//
// 2. Comprueba contra Class.prototype.
//
// 3. La herencia también cuenta.
//
// 4. instanceof NO significa simplemente
//    "fue creado con este constructor".
//
// 5. Symbol.hasInstance permite personalizar instanceof.
//
// 6. isPrototypeOf() permite comprobar directamente la
//    cadena de prototipos.
//
// 7. Object.prototype.toString.call() permite identificar
//    tipos de valores y objetos.
//
// 8. Symbol.toStringTag permite personalizar ese resultado.
//
// ============================================================
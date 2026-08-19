// ============================================================
// PROTOTIPOS NATIVOS
// ============================================================

// ============================================================
// 1. ¿QUÉ SON LOS PROTOTIPOS NATIVOS?
// ============================================================

// JavaScript utiliza la herencia prototípica internamente.
//
// Muchos objetos y funciones incorporados tienen un objeto
// prototype donde se almacenan sus métodos.
//
// Ejemplos:
//
// Object.prototype
// Array.prototype
// String.prototype
// Number.prototype
// Boolean.prototype
// Function.prototype
// Date.prototype
//
// Esto permite que muchas instancias compartan los mismos
// métodos sin tener que crear una copia del método para
// cada objeto.


// ============================================================
// 2. Object.prototype
// ============================================================

// Cuando creamos un objeto literal:

let obj = {};


// Internamente, su prototipo es Object.prototype.

console.log(
    Object.getPrototypeOf(obj) === Object.prototype
);

// true


// Por eso podemos utilizar métodos como:
//
// obj.toString()
//
// aunque nosotros nunca hayamos definido toString().


console.log(obj.toString());


// toString() se encuentra en:
//
// Object.prototype


// La cadena prototípica es:
//
// obj
//   ↓
// Object.prototype
//   ↓
// null


console.log(
    Object.getPrototypeOf(Object.prototype)
);

// null


// Object.prototype es el último prototipo de la mayoría
// de las estructuras de objetos incorporadas.


// ============================================================
// 3. Object.prototype CONTIENE MÉTODOS COMUNES
// ============================================================

// Algunos métodos conocidos de Object.prototype son:
//
// toString()
// hasOwnProperty()
// valueOf()
// etc.
//
// Por eso los objetos normales pueden utilizarlos
// aunque no los definamos nosotros.

// Ejemplo:

let user = {
    name: "John"
};


console.log(user.toString());


// JavaScript busca:
//
// user.toString
//      ↓
// no existe en user
//      ↓
// Object.prototype.toString
//      ↓
// encontrado


// ============================================================
// 4. Array.prototype
// ============================================================

// Los arrays también tienen su propio prototipo:
//
// Array.prototype


let numbers = [1, 2, 3];


// Su cadena prototípica principal es:

console.log(
    Object.getPrototypeOf(numbers) === Array.prototype
);

// true


console.log(
    Object.getPrototypeOf(Array.prototype) === Object.prototype
);

// true


// Por lo tanto:
//
// numbers
//    ↓
// Array.prototype
//    ↓
// Object.prototype
//    ↓
// null


// ============================================================
// 5. MÉTODOS DE LOS ARRAYS
// ============================================================

// Métodos como:
//
// push()
// pop()
// map()
// filter()
// forEach()
// join()
// slice()
// etc.
//
// se encuentran principalmente en:
//
// Array.prototype


// Por ejemplo:

let numbers2 = [1, 2, 3];

numbers2.push(4);


// push() no necesita estar almacenado individualmente
// dentro de numbers2.
//
// Se encuentra en Array.prototype y es heredado.


// Conceptualmente:
//
// numbers2
//    ↓
// Array.prototype
//    ↓
// Object.prototype
//    ↓
// null


// ============================================================
// 6. LOS PROTOTIPOS AHORRAN MEMORIA
// ============================================================

// Los métodos pueden ser compartidos entre muchas instancias.
//
// Por ejemplo:

let array1 = [1, 2, 3];
let array2 = [4, 5, 6];


// Ambos utilizan el mismo método push():

console.log(
    array1.push === array2.push
);

// true


// No necesitamos una copia independiente de push()
// para cada array.
//
// Ambos lo obtienen de:
//
// Array.prototype


// ============================================================
// 7. MÉTODOS CON EL MISMO NOMBRE
// ============================================================

// Diferentes prototipos pueden definir métodos con el
// mismo nombre.
//
// Por ejemplo:
//
// Object.prototype.toString
//
// y:
//
// Array.prototype.toString


let arr = [1, 2, 3];


// Al convertir el array a string:

console.log(arr.toString());

// "1,2,3"


// JavaScript utiliza Array.prototype.toString porque
// está más cerca del array en la cadena prototípica.
//
// La búsqueda es:
//
// arr
//  ↓
// Array.prototype.toString  ← encontrado aquí
//  ↓
// Object.prototype.toString


// Como encontró el método en Array.prototype,
// no necesita continuar hasta Object.prototype.


// ============================================================
// 8. Function.prototype
// ============================================================

// Las funciones también son objetos.
//
// Por eso también tienen una cadena prototípica.

function sayHello() {
    console.log("Hello");
}


// El prototipo de una función normalmente es:

console.log(
    Object.getPrototypeOf(sayHello) === Function.prototype
);

// true


// Y:
//
// Function.prototype
//        ↓
// Object.prototype
//        ↓
// null


console.log(
    Object.getPrototypeOf(Function.prototype) === Object.prototype
);

// true


// ============================================================
// 9. MÉTODOS DE LAS FUNCIONES
// ============================================================

// Métodos como:
//
// call()
// apply()
// bind()
//
// se encuentran en:
//
// Function.prototype


function greet() {
    console.log("Hola");
}


greet.call(null);


// call() está disponible porque:
//
// greet
//   ↓
// Function.prototype
//   ↓
// Object.prototype
//   ↓
// null


// ============================================================
// 10. OTROS PROTOTIPOS NATIVOS
// ============================================================

// JavaScript utiliza el mismo sistema con muchos otros
// objetos incorporados.
//
// Ejemplos:
//
// String.prototype
// Number.prototype
// Boolean.prototype
// Date.prototype
// RegExp.prototype
// Map.prototype
// Set.prototype
// etc.


// Por ejemplo:

let date = new Date();

console.log(
    Object.getPrototypeOf(date) === Date.prototype
);

// true


// La idea general es:
//
// instancia
//    ↓
// Constructor.prototype
//    ↓
// Object.prototype
//    ↓
// null


// ============================================================
// 11. REGLA GENERAL DE LOS PROTOTIPOS NATIVOS
// ============================================================

// Muchos objetos incorporados siguen una estructura similar:
//
// instancia
//      ↓
// Tipo.prototype
//      ↓
// Object.prototype
//      ↓
// null


// Ejemplos:
//
// array
//   ↓
// Array.prototype
//   ↓
// Object.prototype
//   ↓
// null
//
//
// función
//   ↓
// Function.prototype
//   ↓
// Object.prototype
//   ↓
// null
//
//
// objeto normal
//   ↓
// Object.prototype
//   ↓
// null


// ============================================================
// 12. PRIMITIVOS Y OBJETOS TEMPORALES
// ============================================================

// Los valores primitivos NO son objetos.
//
// Ejemplos:
//
// string
// number
// boolean
// null
// undefined
//
// Sin embargo, podemos hacer cosas como:

let text = "Hola";

console.log(text.toUpperCase());


// ¿Cómo puede una cadena utilizar un método si no es un objeto?
//
// JavaScript crea internamente un objeto envoltorio temporal
// para poder acceder a los métodos correspondientes.
//
// Para strings:
//
// String.prototype
//
// Para números:
//
// Number.prototype
//
// Para booleanos:
//
// Boolean.prototype


// Conceptualmente:
//
// "Hola"
//   ↓
// objeto temporal String
//   ↓
// String.prototype
//   ↓
// método toUpperCase()


// El objeto temporal desaparece después de utilizarlo.


// ============================================================
// 13. STRING.PROTOTYPE
// ============================================================

let message = "hello";

console.log(
    Object.getPrototypeOf(Object(message)) === String.prototype
);

// true


// Métodos como:
//
// toUpperCase()
// toLowerCase()
// includes()
// startsWith()
// endsWith()
// slice()
// substring()
//
// están relacionados con String.prototype.


// ============================================================
// 14. NUMBER.PROTOTYPE
// ============================================================

// Los números también pueden utilizar métodos:

let number = 42.5;

console.log(number.toFixed(2));

// "42.50"


// Estos métodos se proporcionan mediante Number.prototype.


// ============================================================
// 15. BOOLEAN.PROTOTYPE
// ============================================================

// Los booleanos también tienen un objeto envoltorio
// y un prototipo correspondiente.
//
// Boolean.prototype


let value = true;

console.log(
    value.toString()
);

// "true"


// ============================================================
// 16. null Y undefined SON DIFERENTES
// ============================================================

// null y undefined son una excepción.
//
// No tienen objetos envoltorios equivalentes
// que proporcionen métodos.

// Por eso:
//
// null.toString()
// undefined.toString()
//
// producen un error.
//
// No existen:
//
// Null.prototype
// Undefined.prototype


// ============================================================
// 17. MODIFICAR PROTOTIPOS NATIVOS
// ============================================================

// Técnicamente podemos modificar los prototipos nativos.
//
// Por ejemplo:

String.prototype.show = function () {

    console.log(this);

};


"Hola".show();

// Hola


// El método ahora está disponible para todas las strings
// mediante String.prototype.


// ============================================================
// 18. ¿POR QUÉ MODIFICAR PROTOTIPOS NATIVOS ES MALA IDEA?
// ============================================================

// Los prototipos nativos son compartidos globalmente.
//
// Por ejemplo:
//
// String.prototype
//
// afecta a todas las strings del entorno.
//
// Esto puede generar conflictos.
//
// Imaginemos que dos librerías hacen:
//
// String.prototype.show = function () {
//     ...
// };
//
//
// La segunda podría sobrescribir el método de la primera.
//
// Esto puede producir:
//
// - conflictos entre librerías.
// - comportamiento inesperado.
// - código difícil de mantener.
// - problemas al actualizar dependencias.


// Por eso, como regla general:
//
// NO modificar prototipos nativos.


// ============================================================
// 19. EXCEPCIÓN: POLYFILL
// ============================================================

// Existe una situación en la que modificar un prototipo nativo
// puede estar justificado:
//
// POLYFILL
//
// Un polyfill implementa una funcionalidad definida por
// JavaScript que todavía no está disponible en determinado
// entorno.

// La idea es:
//
// "Si el método no existe, proporcionemos una implementación."


// Ejemplo conceptual:

if (!String.prototype.repeat) {

    String.prototype.repeat = function (count) {

        return new Array(count + 1).join(this);

    };

}


// Ahora podemos utilizar:

console.log(
    "La".repeat(3)
);

// LaLaLa


// La comprobación:
//
// if (!String.prototype.repeat)
//
// evita sobrescribir una implementación existente.


// En JavaScript moderno, los polyfills son mucho menos
// necesarios porque los entornos actuales soportan gran
// parte de la especificación.

// Aun así, el concepto es importante.


/*
    POLYFILL

    Si existe:
        usar la implementación nativa.

    Si no existe:
        proporcionar una implementación compatible.
*/


// ============================================================
// 20. PRÉSTAMO DE MÉTODOS (METHOD BORROWING)
// ============================================================

// También podemos tomar un método de un prototipo
// y utilizarlo con otro objeto.
//
// Esto se conoce como "tomar prestado" un método.
//
// No es necesario que el objeto sea realmente una instancia
// del tipo original, siempre que cumpla lo que el método
// necesita para funcionar.


// Ejemplo:

let obj2 = {

    0: "Hello",
    1: "world!",
    length: 2

};


// Tomamos join() desde Array.prototype:

obj2.join = Array.prototype.join;


console.log(
    obj2.join(",")
);

// Hello,world!


// ============================================================
// 21. ¿POR QUÉ FUNCIONA EL PRÉSTAMO DE join()?
// ============================================================

// El método Array.prototype.join() utiliza información
// como:
//
// - índices numéricos.
// - length.
//
// No necesita necesariamente que el objeto sea un Array real.
//
// Nuestro objeto tiene:
//
// 0: "Hello"
// 1: "world!"
// length: 2
//
// Por eso join() puede trabajar con él.


// Esto se conoce como que el método es "genérico":
//
// puede funcionar con objetos que tengan la estructura
// que el método necesita.


// ============================================================
// 22. DOS FORMAS DE OBTENER MÉTODOS
// ============================================================

// Podemos tomar un método individual:

obj2.join = Array.prototype.join;


// O podríamos hacer que el objeto herede de
// Array.prototype:

// Object.setPrototypeOf(obj2, Array.prototype);


// De esta manera tendría acceso a muchos métodos de Array.
//
// Sin embargo, esto tiene una limitación importante:
//
// un objeto solo puede tener UN prototipo directo.


// Si obj2 ya hereda de otro objeto:
//
// obj2
//   ↓
// otroPrototipo
//
// no podemos hacer simultáneamente:
//
// obj2
//   ↓
// Array.prototype
//
// y:
//
// obj2
//   ↓
// otroPrototipo


// ============================================================
// 23. PRÉSTAMO VS HERENCIA
// ============================================================

/*
    PRÉSTAMO DE MÉTODO
    ------------------------------------------------

    obj.method = SomePrototype.method;


    Solo copiamos/reutilizamos un método específico.


    HERENCIA
    ------------------------------------------------

    Object.setPrototypeOf(obj, SomePrototype);


    El objeto obtiene acceso a los métodos del prototipo.


    Ventaja del préstamo:

    - más flexible.
    - podemos combinar métodos de diferentes fuentes.
    - no necesitamos cambiar la cadena prototípica.
*/


// ============================================================
// 24. RESUMEN
// ============================================================

// Object.prototype
// ------------------------------------------------------------
// Prototipo base de los objetos normales.
//
// Contiene métodos comunes como:
//
// toString()
// hasOwnProperty()
// valueOf()


// Array.prototype
// ------------------------------------------------------------
// Contiene métodos de arrays:
//
// push()
// pop()
// map()
// filter()
// join()
// etc.


// Function.prototype
// ------------------------------------------------------------
// Contiene métodos de funciones:
//
// call()
// apply()
// bind()


// String.prototype
// ------------------------------------------------------------
// Contiene métodos para strings:
//
// toUpperCase()
// toLowerCase()
// includes()
// repeat()
// etc.


// Number.prototype
// ------------------------------------------------------------
// Contiene métodos para números:
//
// toFixed()
// toString()
// etc.


// Boolean.prototype
// ------------------------------------------------------------
// Contiene métodos relacionados con booleanos.


// ============================================================
// 25. CADENAS PROTOTÍPICAS IMPORTANTES
// ============================================================

/*
    OBJETO NORMAL

    {}
     ↓
    Object.prototype
     ↓
    null


    ARRAY

    []
     ↓
    Array.prototype
     ↓
    Object.prototype
     ↓
    null


    FUNCIÓN

    function f() {}
     ↓
    Function.prototype
     ↓
    Object.prototype
     ↓
    null


    DATE

    new Date()
     ↓
    Date.prototype
     ↓
    Object.prototype
     ↓
    null
*/


// ============================================================
// 26. CONCEPTOS CLAVE PARA RECORDAR
// ============================================================

// 1. Los prototipos nativos son utilizados internamente
//    por JavaScript.
//
// 2. Los métodos compartidos se almacenan en prototipos.
//
// 3. Un array hereda de Array.prototype.
//
// 4. Una función hereda de Function.prototype.
//
// 5. Un objeto normal hereda de Object.prototype.
//
// 6. Los prototipos nativos normalmente terminan en
//    Object.prototype -> null.
//
// 7. Los primitivos string, number y boolean pueden utilizar
//    métodos gracias a objetos envoltorios temporales.
//
// 8. null y undefined no tienen wrappers ni prototipos.
//
// 9. Modificar prototipos nativos generalmente es una mala idea.
//
// 10. Un caso aceptado es implementar polyfills.
//
// 11. Podemos tomar prestados métodos de prototipos.
//
// 12. Un objeto solo puede tener un [[Prototype]] directo.
//
//
// ============================================================
// IDEA CLAVE
// ============================================================
//
// Los prototipos nativos son simplemente una aplicación
// del mismo sistema de herencia prototípica que ya estudiamos.
//
// Por ejemplo:
//
//     let arr = [1, 2, 3];
//
// La búsqueda de:
//
//     arr.map
//
// sigue aproximadamente:
//
//     arr
//       ↓
//     Array.prototype
//       ↓
//     Object.prototype
//       ↓
//     null
//
// Si map existe en Array.prototype, se utiliza ese método.
//
// Esto explica de dónde vienen muchos métodos que usamos
// diariamente en JavaScript sin definirlos nosotros.
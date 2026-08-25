// ============================================================
// AMPLIACIÓN DE CLASES INTEGRADAS
// ============================================================
//
// JavaScript permite extender clases integradas como:
//
//     Array
//     Map
//     Set
//     Error
//     etc.
//
// Podemos crear una clase propia que herede todo su comportamiento
// y agregarle métodos o funcionalidades nuevas.
//
// ============================================================

// ============================================================
// 1. EXTENDER ARRAY
// ============================================================
//
// Una clase puede heredar directamente de Array.
//
//     class PowerArray extends Array
//
// Esto significa que PowerArray tendrá:
//
// - length
// - push()
// - pop()
// - map()
// - filter()
// - reduce()
// - etc.
//
// Y además podemos agregar nuestros propios métodos.
// ============================================================

class PowerArray extends Array {

    isEmpty() {
        return this.length === 0;
    }

}

const numbers = new PowerArray(1, 2, 5, 10, 50);

console.log(numbers.isEmpty()); // false
console.log(numbers.length);    // 5

numbers.push(100);

console.log(numbers); // PowerArray(6) [...]



// ============================================================
// 2. LOS MÉTODOS DE ARRAY SIGUEN FUNCIONANDO
// ============================================================
//
// Como PowerArray hereda de Array, podemos utilizar:
//
//     map()
//     filter()
//     slice()
//     etc.
//
// ============================================================

const filtered = numbers.filter(number => number >= 10);

console.log(filtered);
// PowerArray(3) [10, 50, 100]

console.log(filtered.isEmpty()); // false



// ============================================================
// 3. ¿QUÉ TIPO DE OBJETO DEVUELVE filter()?
// ============================================================
//
// Aquí está una de las partes importantes:
//
// Si usamos filter(), map(), slice(), etc. sobre una instancia
// de una clase que hereda de Array, JavaScript normalmente crea
// el resultado utilizando el constructor de esa clase.
//
// Por ejemplo:
//
//     numbers → PowerArray
//
// Entonces:
//
//     numbers.filter(...)
//              ↓
//          PowerArray
//
// Por eso:
//
//     filtered instanceof PowerArray
//
// devuelve true.
// ============================================================

console.log(filtered instanceof PowerArray); // true
console.log(filtered instanceof Array);      // true


// ============================================================
// 4. Symbol.species
// ============================================================
//
// Podemos cambiar qué constructor utilizarán métodos como:
//
//     map()
//     filter()
//     slice()
//
// Para ello podemos definir:
//
//     static get [Symbol.species]()
//
// Si devolvemos Array, los métodos integrados devolverán
// Arrays normales en lugar de PowerArray.
//
// ============================================================

class PowerArray2 extends Array {

    isEmpty() {
        return this.length === 0;
    }

    static get [Symbol.species]() {
        return Array;
    }

}

const numbers2 = new PowerArray2(1, 2, 5, 10, 50);

const filtered2 = numbers2.filter(number => number >= 10);

console.log(filtered2);
// Array(2) [10, 50]

console.log(filtered2 instanceof Array);      // true
console.log(filtered2 instanceof PowerArray2); // false



//  Ya no existe isEmpty(), porque filtered2 es un Array normal.

// console.log(filtered2.isEmpty());



// ============================================================
// 5. ¿PARA QUÉ SIRVE Symbol.species?
// ============================================================
//
// Permite decidir qué tipo de objeto deben devolver algunos
// métodos integrados al crear nuevos objetos.
//
// SIN Symbol.species:
//
//     PowerArray
//          ↓ filter()
//     PowerArray
//
// CON Symbol.species → Array:
//
//     PowerArray
//          ↓ filter()
//       Array
//
//
//
// Es útil cuando nuestra clase extiende una colección pero no
// queremos que todos los resultados mantengan nuestra clase
// personalizada.
// ============================================================



// ============================================================
// 6. MAP TAMBIÉN RESPETA Symbol.species
// ============================================================

class PowerArray3 extends Array {

    static get [Symbol.species]() {
        return Array;
    }

}

const numbers3 = new PowerArray3(1, 2, 3);

const doubled = numbers3.map(number => number * 2);

console.log(doubled);
// Array(3) [2, 4, 6]

console.log(doubled instanceof PowerArray3); // false



// ============================================================
// 7. OTRAS CLASES INTEGRADAS
// ============================================================
//
// El concepto también aparece con otras colecciones integradas,
// como:
//
//     Map
//     Set
//
// Podemos extenderlas de forma similar:
//
//     class MyMap extends Map {}
//     class MySet extends Set {}
//
// ============================================================

class MyMap extends Map {

    getSize() {
        return this.size;
    }

}

const users = new MyMap([
    ["id1", "Juan"],
    ["id2", "Pedro"]
]);

console.log(users.getSize()); // 2



// ============================================================
// 8. HERENCIA DE INSTANCIAS VS HERENCIA ESTÁTICA
// ============================================================
//
// Aquí hay una particularidad importante de las clases integradas.
//
// En nuestras clases:
//
//     class B extends A {}
//
// normalmente se heredan:
//
// 1. Métodos de instancia
// 2. Métodos estáticos
//
// Pero las clases integradas de JavaScript tienen una estructura
// especial y no debemos asumir que sus métodos estáticos se
// heredan de la misma manera.
//
//
//
// Ejemplo:
//
// Array tiene:
//
//     Array.isArray()
//
// Object tiene:
//
//     Object.keys()
//
// Pero:
//
//     Array.keys()
//
//  no existe.
//
//
//
// Aunque Array y Object están relacionados mediante sus prototipos
// de instancia, eso no significa que los métodos estáticos de
// Object estén disponibles directamente en Array.
// ============================================================



// ============================================================
// 9. DOS CADENAS DE HERENCIA DIFERENTES
// ============================================================
//
// En una herencia de clases normal tenemos dos relaciones:
//
//
//
// INSTANCIAS:
//
//     objeto
//        ↓
//     B.prototype
//        ↓
//     A.prototype
//        ↓
//     Object.prototype
//
//
// CLASES / CONSTRUCTORES:
//
//     B
//     ↓
//     A
//
//
//
// En clases normales creadas con extends:
//
//     B.__proto__ === A
//
//     B.prototype.__proto__ === A.prototype
//
//
//
// Con los objetos integrados hay particularidades en cómo se
// conectan sus constructores y prototipos, especialmente en la
// parte estática.
// ============================================================



// ============================================================
// 10. IDEA FUNDAMENTAL
// ============================================================
//
// Cuando extendemos una clase integrada:
//
//     class PowerArray extends Array {}
//
// PowerArray obtiene el comportamiento de Array.
//
// Podemos:
//
// - agregar métodos propios
// - utilizar métodos de Array
// - sobrescribir comportamientos
// - controlar el tipo de resultado de ciertos métodos mediante
//   Symbol.species
//
// ============================================================



// ============================================================
// RESUMEN
// ============================================================
//
// EXTENDER UNA CLASE INTEGRADA
// ----------------------------
//
//     class PowerArray extends Array {}
//
// Permite crear una versión personalizada de Array.
//
//
//
// HERENCIA
// --------
//
// PowerArray hereda:
//
//     push()
//     pop()
//     map()
//     filter()
//     reduce()
//     length
//     etc.
//
//
//
// MÉTODOS COMO map() Y filter()
// ----------------------------
//
// Normalmente crean nuevos objetos utilizando el constructor
// apropiado de la colección.
//
// Por eso:
//
//     PowerArray → filter() → PowerArray
//
//
//
// Symbol.species
// --------------
//
// Permite cambiar el tipo de objeto que crean estos métodos:
//
//     static get [Symbol.species]() {
//         return Array;
//     }
//
// Entonces:
//
//     PowerArray → filter() → Array
//
//
//
// CLASES INTEGRADAS
// -----------------
//
// También podemos extender:
//
//     Array
//     Map
//     Set
//     Error
//     etc.
//
//
//
// HERENCIA ESTÁTICA
// -----------------
//
// No debemos asumir que las clases integradas funcionan
// exactamente igual que nuestras clases respecto a métodos
// estáticos.
//
// Por ejemplo:
//
//     Array.isArray()  // bueno
//     Object.keys()    // bueno
//     Array.keys()     // mal
//
//
//
// ============================================================
// REGLAS CLAVE PARA MEMORIZAR
// ============================================================
//
// 1. Las clases integradas pueden extenderse con extends.
//
// 2. Una clase como PowerArray puede heredar todos los métodos
//    de Array y agregar los suyos.
//
// 3. map(), filter(), slice(), etc. pueden devolver instancias
//    de la clase heredada.
//
// 4. Symbol.species permite controlar qué constructor utilizan
//    esos métodos para crear nuevos objetos.
//
// 5. Si Symbol.species devuelve Array:
//
//       PowerArray → filter() → Array
//
// 6. Map y Set también pueden extenderse.
//
// 7. Las clases integradas tienen particularidades en su
//    herencia estática; no hay que confundir:
//
//       B.prototype → A.prototype
//
//    con:
//
//       B → A
//
// ============================================================
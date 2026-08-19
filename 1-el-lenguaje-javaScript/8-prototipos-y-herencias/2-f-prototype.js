// ============================================================
// F.prototype
// ============================================================

// ============================================================
// 1. F.prototype Y [[Prototype]] NO SON LO MISMO
// ============================================================

// Hay que distinguir dos conceptos:
//
// F.prototype
// ------------------------------------------------------------
// Es una PROPIEDAD NORMAL de una función.
//
// [[Prototype]]
// ------------------------------------------------------------
// Es la referencia interna que determina de qué objeto
// hereda otro objeto.
//
// No son lo mismo.
//
// La relación entre ambos aparece cuando utilizamos:
//
//     new F()


// ============================================================
// 2. ¿QUÉ HACE new F() CON F.prototype?
// ============================================================

// Cuando ejecutamos:
//
//     new F()
//
// JavaScript crea un nuevo objeto y, si F.prototype es un
// objeto, establece:
//
//     nuevoObjeto.[[Prototype]] = F.prototype


// Ejemplo:

let animal = {

    eats: true

};


function Rabbit(name) {

    this.name = name;

}


Rabbit.prototype = animal;


let rabbit = new Rabbit("White Rabbit");


// Conceptualmente:
//
// rabbit
//   ↓
// [[Prototype]]
//   ↓
// animal


console.log(rabbit.eats);

// true


// eats no está directamente en rabbit.
//
// Se encuentra en:
//
// animal
//
// porque animal es el [[Prototype]] de rabbit.


// ============================================================
// 3. EL PROCESO DE new F()
// ============================================================

// De forma simplificada, cuando hacemos:
//
//     new Rabbit("White Rabbit")
//
// ocurre algo parecido a:
//
// 1. Se crea un nuevo objeto.
//
// 2. Su [[Prototype]] se establece usando
//    Rabbit.prototype.
//
// 3. Se ejecuta Rabbit con this apuntando al nuevo objeto.
//
// 4. Se devuelve el nuevo objeto.
//
// Conceptualmente:
//
// let rabbit = {};
//
// rabbit.[[Prototype]] = Rabbit.prototype;
//
// Rabbit.call(rabbit, "White Rabbit");
//
// return rabbit;


// ============================================================
// 4. F.prototype SOLO SE UTILIZA DURANTE new F()
// ============================================================

// Esta es una regla MUY importante:
//
// F.prototype se consulta cuando se crea el objeto
// mediante new F().
//
// Después de crear el objeto, cambiar F.prototype
// NO cambia automáticamente el prototipo de los objetos
// que ya existen.


// Ejemplo:

function Rabbit2(name) {

    this.name = name;

}


let rabbit1 = new Rabbit2("Rabbit 1");


// En este momento:
//
// rabbit1.[[Prototype]] = Rabbit2.prototype


// Ahora cambiamos el prototype:

Rabbit2.prototype = {

    eats: true

};


let rabbit2 = new Rabbit2("Rabbit 2");


// Ahora:
//
// rabbit1 → antiguo Rabbit2.prototype
//
// rabbit2 → nuevo Rabbit2.prototype


console.log(
    Object.getPrototypeOf(rabbit1) === Rabbit2.prototype
);

// false


console.log(
    Object.getPrototypeOf(rabbit2) === Rabbit2.prototype
);

// true


// Por lo tanto:
//
// OBJETOS ANTIGUOS
// → conservan su [[Prototype]] original.
//
// OBJETOS NUEVOS
// → utilizan el nuevo F.prototype.


// ============================================================
// 5. F.prototype DEBE SER UN OBJETO O null
// ============================================================

// Para que new F() utilice F.prototype como prototipo,
// su valor debe ser un objeto o null.
//
// Por ejemplo:

function Example() {}

Example.prototype = {

    value: 123

};


let example = new Example();

console.log(example.value);

// 123


// Un objeto es válido como prototype.
//
// null también puede utilizarse.
//
// Otros valores no funcionan como prototipo para este
// propósito.


// ============================================================
// 6. TODA FUNCIÓN TIENE prototype POR DEFECTO
// ============================================================

// Cuando creamos una función constructora:

function Rabbit3() {}


// JavaScript crea automáticamente un objeto prototype:
//
// Rabbit3.prototype


// Por defecto, es conceptualmente:

/*
Rabbit3.prototype = {
    constructor: Rabbit3
};
*/


// Podemos comprobarlo:

console.log(
    Rabbit3.prototype.constructor === Rabbit3
);

// true


// ============================================================
// 7. LA PROPIEDAD constructor
// ============================================================

// El objeto prototype creado automáticamente contiene:
//
//     constructor
//
// que apunta a la función que lo creó.

function User() {}


console.log(
    User.prototype.constructor === User
);

// true


// Cuando hacemos:

let user = new User();


// user hereda de User.prototype:
//
// user
//   ↓
// User.prototype
//   ↓
// Object.prototype
//   ↓
// null


// Por eso también podemos acceder a:
//
// user.constructor


console.log(
    user.constructor === User
);

// true


// constructor NO está directamente en user.
//
// Se obtiene mediante la cadena prototípica.


// ============================================================
// 8. ¿PARA QUÉ SIRVE constructor?
// ============================================================

// Puede utilizarse para crear otro objeto utilizando
// el mismo constructor.

// Ejemplo:

function Rabbit4(name) {

    this.name = name;

}


let rabbit3 = new Rabbit4("White Rabbit");


// rabbit3.constructor apunta a Rabbit4.

let rabbit4 = new rabbit3.constructor("Black Rabbit");


console.log(rabbit4.name);

// Black Rabbit


// Esto puede ser útil cuando tenemos un objeto y queremos
// crear otro objeto utilizando el mismo constructor.
//
// Sin embargo, hay que recordar que constructor no es
// una garantía absoluta.

// ============================================================
// 9. constructor NO ES UNA PROPIEDAD ESPECIAL DE new
// ============================================================

// Es importante entender esto:
//
// JavaScript no mantiene automáticamente el constructor
// correcto de todos los objetos.
//
// El constructor existe en el prototype predeterminado
// porque JavaScript lo coloca allí.
//
// Si nosotros reemplazamos ese prototype,
// podemos eliminarlo accidentalmente.


// ============================================================
// 10. PROBLEMA AL REEMPLAZAR F.prototype
// ============================================================

// Ejemplo:

function Rabbit5() {}


// Reemplazamos completamente el prototype:

Rabbit5.prototype = {

    jumps: true

};


let rabbit5 = new Rabbit5();


// Ahora:

console.log(rabbit5.jumps);

// true


// Pero:

console.log(
    rabbit5.constructor === Rabbit5
);

// false


// ¿Por qué?

// Porque reemplazamos completamente:
//
// Rabbit5.prototype
//
// y el nuevo objeto:
//
// {
//     jumps: true
// }
//
// no contiene:
//
// constructor: Rabbit5


// ============================================================
// 11. ¿CÓMO CONSERVAR constructor?
// ============================================================

// OPCIÓN 1:
//
// No reemplazar el prototype completo.
//
// Agregar propiedades al prototype existente.

function Rabbit6() {}


// El prototype original ya contiene:
//
// constructor: Rabbit6


Rabbit6.prototype.jumps = true;


let rabbit6 = new Rabbit6();


console.log(
    rabbit6.constructor === Rabbit6
);

// true


// Esta suele ser una opción sencilla cuando no necesitamos
// reemplazar todo el prototype.


// ============================================================
// 12. RECREAR constructor MANUALMENTE
// ============================================================

// Si queremos reemplazar completamente el prototype,
// podemos conservar constructor manualmente.

function Rabbit7() {}


Rabbit7.prototype = {

    jumps: true,

    constructor: Rabbit7

};


let rabbit7 = new Rabbit7();


console.log(
    rabbit7.constructor === Rabbit7
);

// true


// Ahora el nuevo prototype contiene nuevamente:
//
// constructor: Rabbit7


// ============================================================
// 13. F.prototype NO ES [[Prototype]]
// ============================================================

// Esta confusión es especialmente importante.
//
// Tenemos:
//
// Rabbit.prototype
//
// y:
//
// rabbit.[[Prototype]]
//
// Después de:

let animal2 = {

    eats: true

};


function Rabbit8() {}

Rabbit8.prototype = animal2;

let rabbit8 = new Rabbit8();


// obtenemos:
//
// Rabbit8.prototype === animal2
//
//
// y:
//
// rabbit8.[[Prototype__]] === Rabbit8.prototype
//
// Es decir:
//
// rabbit8
//    ↓ [[Prototype]]
// Rabbit8.prototype
//    ↓
// animal2


// En este caso:
//
// Object.getPrototypeOf(rabbit8)
//     === Rabbit8.prototype
//
// true


console.log(
    Object.getPrototypeOf(rabbit8) === Rabbit8.prototype
);

// true


// ============================================================
// 14. F.prototype ES UNA PROPIEDAD NORMAL
// ============================================================

// Solo las funciones utilizadas con new tienen este
// comportamiento especial.
//
// Por ejemplo:

let user2 = {

    name: "John",

    prototype: "Hola"

};


// Aquí "prototype" no tiene ningún significado especial.
//
// Es simplemente una propiedad normal.

console.log(user2.prototype);

// Hola


// Esto demuestra que:
//
// obj.prototype
//
// NO significa automáticamente "prototipo".


// ============================================================
// 15. ¿QUÉ SIGNIFICA REALMENTE F.prototype?
// ============================================================

// Cuando tenemos:
//
// function F() {}
//
// F.prototype es simplemente una propiedad de F.
//
// Su importancia especial aparece cuando hacemos:
//
// new F()
//
// En ese momento:
//
// nuevoObjeto.[[Prototype]] = F.prototype


// ============================================================
// 16. EJEMPLO COMPLETO
// ============================================================

function Person(name) {

    this.name = name;

}


Person.prototype.sayHello = function () {

    console.log(`Hola, soy ${this.name}`);

};


let person = new Person("John");


// La estructura conceptual es:
//
// person
//   ↓
// Person.prototype
//   ↓
// Object.prototype
//   ↓
// null


person.sayHello();

// Hola, soy John


// sayHello no está directamente en person.
//
// Se encuentra en:
//
// Person.prototype


// constructor también está allí:

console.log(
    person.constructor === Person
);

// true


// ============================================================
// 17. PROTOTYPE COMO LUGAR PARA COMPARTIR MÉTODOS
// ============================================================

// Una ventaja importante de utilizar prototype con
// constructores es que podemos compartir métodos.

// Ejemplo:

function User2(name) {

    this.name = name;

}


User2.prototype.sayHello = function () {

    console.log(`Hola ${this.name}`);

};


let userA = new User2("Alice");
let userB = new User2("Bob");


userA.sayHello();
userB.sayHello();


// Ambos objetos utilizan el mismo método:

console.log(
    userA.sayHello === userB.sayHello
);

// true


// El método no se copia dentro de cada objeto.
//
// Está almacenado una sola vez en:
//
// User2.prototype


// ============================================================
// 18. CADENA PROTOTÍPICA COMPLETA
// ============================================================

function Animal(name) {

    this.name = name;

}


Animal.prototype.walk = function () {

    console.log(`${this.name} camina`);

};


let animal3 = new Animal("Perro");


// La cadena es:
//
// animal3
//    ↓
// Animal.prototype
//    ↓
// Object.prototype
//    ↓
// null


// animal3 puede utilizar:
//
// animal3.walk()
//
// porque walk está en Animal.prototype.
//
// También puede utilizar:
//
// animal3.toString()
//
// porque toString está en Object.prototype.


// ============================================================
// 19. RESUMEN
// ============================================================

/*
    F.prototype
    ------------------------------------------------
    Es una propiedad normal de una función.


    new F()
    ------------------------------------------------
    Utiliza F.prototype para establecer el
    [[Prototype]] del nuevo objeto.


    Ejemplo:

        function Rabbit() {}

        let rabbit = new Rabbit();


    Conceptualmente:

        rabbit.[[Prototype]]
            =
        Rabbit.prototype


    ------------------------------------------------

    IMPORTANTE:

    F.prototype
    ≠
    [[Prototype]]


    F.prototype
        ↓
    propiedad de la función


    obj.[[Prototype]]
        ↓
    referencia interna del objeto


    ------------------------------------------------

    F.prototype solo afecta a objetos creados
    posteriormente con new F().


    Si cambiamos:

        F.prototype = nuevoObjeto;


    los objetos nuevos utilizarán nuevoObjeto.

    Los objetos antiguos conservan su prototipo anterior.


    ------------------------------------------------

    Por defecto:

        F.prototype = {
            constructor: F
        };


    Por eso:

        obj.constructor === F

    normalmente funciona.


    ------------------------------------------------

    Si reemplazamos completamente F.prototype:

        F.prototype = {
            someProperty: true
        };


    podemos perder:

        constructor: F


    Para conservarlo:

        F.prototype = {
            someProperty: true,
            constructor: F
        };


    ------------------------------------------------

    En objetos normales:

        obj.prototype

    no tiene ningún significado especial.

    "prototype" es simplemente un nombre de propiedad.


    ------------------------------------------------

    El valor de F.prototype debe ser:

        - un objeto
        - o null

    para que new F() pueda utilizarlo como prototipo.
*/


// ============================================================
// 20. IDEA CLAVE PARA MEMORIZAR
// ============================================================

/*
                 FUNCIÓN CONSTRUCTORA

                     Person
                       │
                       │ .prototype
                       ↓
                Person.prototype
                ┌─────────────────┐
                │ constructor     │
                │ sayHello()      │
                └─────────────────┘
                       ↑
                       │ [[Prototype]]
                       │
                    person
                ┌─────────────────┐
                │ name: "John"    │
                └─────────────────┘


    Cuando hacemos:

        let person = new Person("John");


    JavaScript utiliza:

        Person.prototype


    para establecer:

        person.[[Prototype]]


    Por eso:

        person.sayHello()

    puede encontrar sayHello() en:

        Person.prototype


    Y:

        person.constructor

    puede encontrar constructor en:

        Person.prototype
*/


// ============================================================
// REGLA FINAL
// ============================================================

/*
    La relación que debes recordar es:

        F.prototype
            ↓
        se utiliza por new F()
            ↓
        obj.[[Prototype]]


    Es decir:

        new F()
            ↓
        obj.[[Prototype]] = F.prototype


    Esta es la conexión fundamental entre las funciones
    constructoras y la herencia prototípica en JavaScript.
*/
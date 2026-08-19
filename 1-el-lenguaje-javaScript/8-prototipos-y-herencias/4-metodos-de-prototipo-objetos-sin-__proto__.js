// ============================================================
// MÉTODOS DE PROTOTIPO Y OBJETOS SIN PROTOTIPO
// ============================================================


// ============================================================
// 1. FORMAS DE TRABAJAR CON [[Prototype]]
// ============================================================

// JavaScript tiene una propiedad interna:
//
//     [[Prototype]]
//
// que determina de qué objeto hereda otro objeto.
//
// Para trabajar con ella existen varias formas.


// ============================================================
// 2. Object.getPrototypeOf()
// ============================================================

// Devuelve el [[Prototype]] de un objeto.

let animal = {
    eats: true
};

let rabbit = {
    jumps: true,

    __proto__: animal
};


console.log(
    Object.getPrototypeOf(rabbit)
);

// animal


console.log(
    Object.getPrototypeOf(rabbit) === animal
);

// true


// Es la forma moderna de LEER el prototipo.


// ============================================================
// 3. Object.setPrototypeOf()
// ============================================================

// Permite cambiar el [[Prototype]] de un objeto existente.

let animal2 = {
    eats: true
};

let rabbit2 = {
    jumps: true
};


// Establecemos animal2 como prototipo:

Object.setPrototypeOf(rabbit2, animal2);


console.log(rabbit2.eats);

// true


console.log(
    Object.getPrototypeOf(rabbit2) === animal2
);

// true


// Es la forma moderna de ESTABLECER el prototipo.


// ============================================================
// 4. __proto__ VS [[Prototype]]
// ============================================================

// IMPORTANTE:
//
// __proto__
//     ↓
// NO es [[Prototype]]
//
// __proto__ es un getter/setter histórico que permite
// acceder al [[Prototype]].
//
// Por eso:
//
// rabbit.__proto__
//
// permite consultar el [[Prototype]] de rabbit.
//
// Pero internamente:
//
// rabbit.[[Prototype]]
//
// es la referencia real utilizada por JavaScript.


// Para código moderno, es preferible:

Object.getPrototypeOf(rabbit);

// y:

Object.setPrototypeOf(rabbit, animal);


// ============================================================
// 5. { __proto__: ... } COMO LITERAL
// ============================================================

// Existe un caso particular donde __proto__ sigue siendo
// perfectamente válido:
//
// al crear un objeto mediante un literal.

let animal3 = {
    eats: true
};

let rabbit3 = {

    jumps: true,

    __proto__: animal3

};


// Esto establece el prototipo de rabbit3 al momento
// de crear el objeto.


console.log(rabbit3.eats);

// true


// Esta sintaxis es diferente de:
//
// obj.__proto__ = ...
//
// ya que aquí estamos utilizando __proto__ dentro
// de un literal de objeto para establecer el prototipo
// durante su creación.


// ============================================================
// 6. Object.create()
// ============================================================

// Otra forma moderna y explícita de crear un objeto
// con un prototipo determinado es:
//
// Object.create(proto)


let animal4 = {
    eats: true
};


let rabbit4 = Object.create(animal4);


console.log(rabbit4.eats);

// true


console.log(
    Object.getPrototypeOf(rabbit4) === animal4
);

// true


// Conceptualmente:
//
// Object.create(animal4)
//
// crea:
//
// rabbit4
//    ↓
// animal4


// ============================================================
// 7. Object.create() CON PROPIEDADES
// ============================================================

// Object.create() acepta un segundo argumento opcional:
//
// Object.create(proto, descriptors)
//
// El segundo argumento contiene descriptores de propiedades,
// como los vistos en:
//
// Object.defineProperty()


let animal5 = {
    eats: true
};


let rabbit5 = Object.create(animal5, {

    jumps: {
        value: true
    }

});


console.log(rabbit5.eats);

// true


console.log(rabbit5.jumps);

// true


// La propiedad jumps fue creada utilizando un descriptor.
//
// IMPORTANTE:
//
// Si no especificamos:
//
// writable
// enumerable
// configurable
//
// sus valores serán false por defecto.


// ============================================================
// 8. Object.create() PARA CLONAR OBJETOS
// ============================================================

// Una copia realizada con:
//
// for...in
//
// no conserva toda la información del objeto.
//
// Por ejemplo, puede perder:
//
// - propiedades no enumerables.
// - descriptores.
// - getters/setters.
// - el prototipo original.


// Para realizar una copia mucho más fiel podemos utilizar:

let clone = Object.create(
    Object.getPrototypeOf(rabbit),
    Object.getOwnPropertyDescriptors(rabbit)
);


// Esto conserva:
//
// - [[Prototype]]
// - propiedades propias.
// - propiedades enumerables.
// - propiedades no enumerables.
// - getters.
// - setters.
// - writable.
// - configurable.
// - value.


// Por lo tanto, es una copia mucho más completa que:
//
// let clone = { ...rabbit };
//
// o:
//
// for (let key in rabbit) {
//     clone[key] = rabbit[key];
// }


// ============================================================
// 9. ¿POR QUÉ NO CAMBIAR PROTOTIPOS CONSTANTEMENTE?
// ============================================================

// Técnicamente podemos hacer:
//
// Object.setPrototypeOf(obj, proto);
//
// en cualquier momento.
//
// Pero normalmente no deberíamos hacerlo después
// de crear el objeto.

// Ejemplo:

let animal6 = {
    eats: true
};

let rabbit6 = Object.create(animal6);


// Lo ideal es dejar esta relación estable:
//
// rabbit6
//    ↓
// animal6


// Cambiar constantemente el prototipo puede afectar
// negativamente al rendimiento.

// Los motores JavaScript realizan optimizaciones internas
// suponiendo que la estructura de los objetos permanece
// relativamente estable.
//
// Cambiar [[Prototype]] dinámicamente puede romper
// esas optimizaciones.


// REGLA PRÁCTICA:
//
// Establece el prototipo al crear el objeto
// y evita modificarlo posteriormente salvo que exista
// una razón concreta.


// ============================================================
// 10. EL PROBLEMA DE __proto__ COMO CLAVE
// ============================================================

// Los objetos normales tienen:
//
// Object.prototype
//
// como parte de su cadena prototípica.
//
// Eso significa que algunas propiedades y métodos ya
// existen en la cadena.

// Un caso especial es:
//
// "__proto__"


let obj = {};


// Si intentamos:

obj["__proto__"] = "hello";


// No obtenemos necesariamente una propiedad normal
// con ese nombre.
//
// En un objeto normal, __proto__ está relacionado con
// el getter/setter heredado de Object.prototype.


// Esto puede ser problemático si queremos utilizar un objeto
// como un simple diccionario de:
//
// clave → valor


// ============================================================
// 11. PROBLEMA CON CLAVES PROPORCIONADAS POR EL USUARIO
// ============================================================

// Imaginemos que almacenamos claves introducidas por
// un usuario:

let dictionary = {};

let key = "__proto__";

dictionary[key] = "some value";


// El resultado no se comporta como una propiedad normal.
//
// Esto es problemático porque nosotros queríamos:
//
// dictionary["__proto__"]
//     ↓
// "some value"
//
// pero __proto__ tiene un comportamiento especial
// debido a Object.prototype.


// Esto puede provocar errores difíciles de detectar
// cuando las claves provienen de datos externos.


// ============================================================
// 12. SOLUCIÓN: Map
// ============================================================

// Si necesitamos almacenar pares:
//
// clave → valor
//
// y las claves pueden ser arbitrarias,
// Map suele ser una excelente opción.

let map = new Map();

let key2 = "__proto__";

map.set(key2, "some value");


console.log(
    map.get(key2)
);

// some value


// Map no tiene el mismo problema con "__proto__"
// porque las claves se almacenan como entradas de Map.


// ============================================================
// 13. SOLUCIÓN: OBJETO SIN PROTOTIPO
// ============================================================

// Si queremos utilizar específicamente un objeto como
// diccionario, podemos eliminar completamente su prototipo:
//
// Object.create(null)


let dictionary2 = Object.create(null);


// Ahora:
//
// dictionary2.[[Prototype]] === null


console.log(
    Object.getPrototypeOf(dictionary2)
);

// null


// ============================================================
// 14. ¿QUÉ SIGNIFICA "SIN PROTOTIPO"?
// ============================================================

// Un objeto creado mediante:
//
// Object.create(null)
//
// no hereda de Object.prototype.
//
// Por lo tanto, no tiene métodos heredados como:
//
// toString()
// hasOwnProperty()
// valueOf()
// etc.


// La estructura es:
//
// dictionary2
//      ↓
//     null


// En lugar de:
//
// objeto
//    ↓
// Object.prototype
//    ↓
// null


// ============================================================
// 15. __proto__ SE CONVIERTE EN UNA CLAVE NORMAL
// ============================================================

// Esto es precisamente lo que nos interesa en un diccionario.

let dictionary3 = Object.create(null);

let key3 = "__proto__";

dictionary3[key3] = "some value";


console.log(
    dictionary3[key3]
);

// some value


// Ahora "__proto__" es simplemente una clave.
//
// No existe un getter/setter heredado que intercepte
// esa operación.


// ============================================================
// 16. OBJETOS "MUY SIMPLES"
// ============================================================

// Object.create(null) crea lo que javascript.info
// denomina un objeto "muy simple" o "diccionario puro".

let dictionary4 = Object.create(null);

dictionary4.hello = "Hola";
dictionary4.bye = "Adiós";


console.log(dictionary4.hello);
console.log(dictionary4.bye);


// Es especialmente útil cuando queremos que el objeto
// sea únicamente un contenedor de datos.


/*
    OBJETO NORMAL

    {}
    ↓
    Object.prototype
    ↓
    null


    DICCIONARIO PURO

    Object.create(null)
    ↓
    null
*/


// ============================================================
// 17. DESVENTAJA DE Object.create(null)
// ============================================================

// Al no tener Object.prototype, tampoco tiene sus métodos.

// Por ejemplo:

let dictionary5 = Object.create(null);


// Esto no funciona:

// dictionary5.toString();


// porque no existe toString() heredado.


// Tampoco podemos hacer directamente:

// dictionary5.hasOwnProperty("key");


// porque hasOwnProperty tampoco existe.

// Si necesitamos comprobar una propiedad podemos utilizar:

Object.hasOwn(dictionary5, "key");


// O también:

Object.prototype.hasOwnProperty.call(
    dictionary5,
    "key"
);


// ============================================================
// 18. Object.keys() SIGUE FUNCIONANDO
// ============================================================

// Los métodos estáticos de Object no dependen
// del prototipo del objeto.

// Por ejemplo:

let dictionary6 = Object.create(null);

dictionary6.hello = "你好";
dictionary6.bye = "再见";


console.log(
    Object.keys(dictionary6)
);

// ["hello", "bye"]


// Esto funciona porque:
//
// Object.keys(obj)
//
// es un método de Object directamente.
//
// No necesita:
//
// obj.keys()


// Lo mismo ocurre con muchos métodos estáticos:
//
// Object.keys()
// Object.values()
// Object.entries()
// Object.hasOwn()
// etc.


// ============================================================
// 19. ¿CUÁNDO USAR Object.create(null)?
// ============================================================

// Es apropiado cuando queremos un objeto que funcione
// únicamente como diccionario:
//
// clave → valor


let users = Object.create(null);

users["John"] = 25;
users["Alice"] = 30;
users["__proto__"] = 100;


console.log(users["John"]);
console.log(users["Alice"]);
console.log(users["__proto__"]);


// Todas funcionan como claves normales.


// ============================================================
// 20. HISTORIA DE LAS APIs DE PROTOTIPOS
// ============================================================

// La forma de trabajar con prototipos evolucionó
// históricamente.

// ORDEN GENERAL:
//
// 1. F.prototype
//    ↓
//    Mecanismo antiguo utilizado junto con new.
//
//
// 2. Object.create()
//    ↓
//    Permite crear directamente un objeto con
//    un prototipo determinado.
//
//
// 3. __proto__
//    ↓
//    Fue ampliamente implementado como getter/setter
//    histórico.
//
//
// 4. Object.getPrototypeOf()
//    Object.setPrototypeOf()
//    ↓
//    APIs estándar modernas para leer y cambiar
//    el prototipo.
//
//
// Actualmente, para leer o cambiar un prototipo
// explícitamente, se prefieren:
//
// Object.getPrototypeOf()
// Object.setPrototypeOf()


// ============================================================
// 21. RESUMEN DE LAS PRINCIPALES HERRAMIENTAS
// ============================================================

/*
    Object.getPrototypeOf(obj)
    ------------------------------------------------
    Obtiene el [[Prototype]] de obj.


    Object.setPrototypeOf(obj, proto)
    ------------------------------------------------
    Establece el [[Prototype]] de obj.


    Object.create(proto)
    ------------------------------------------------
    Crea un nuevo objeto cuyo [[Prototype]] es proto.


    Object.create(proto, descriptors)
    ------------------------------------------------
    Crea un objeto con un prototipo y propiedades
    definidas mediante descriptores.


    { __proto__: proto }
    ------------------------------------------------
    Permite establecer el prototipo durante la creación
    mediante un literal de objeto.


    obj.__proto__
    ------------------------------------------------
    Getter/setter histórico para acceder al [[Prototype]].
    Se recomienda evitarlo en código moderno.
*/


// ============================================================
// 22. TABLA MENTAL
// ============================================================

/*
    ¿QUIERO LEER EL PROTOTIPO?

        Object.getPrototypeOf(obj)


    ¿QUIERO CREAR UN OBJETO CON UN PROTOTIPO?

        Object.create(proto)


    ¿QUIERO CREARLO CON DESCRIPTORES?

        Object.create(proto, descriptors)


    ¿QUIERO ESTABLECER EL PROTOTIPO AL CREAR UN LITERAL?

        {
            __proto__: proto
        }


    ¿QUIERO CAMBIAR EL PROTOTIPO?

        Object.setPrototypeOf(obj, proto)

        -> evitar si no es necesario, especialmente
           en código donde el rendimiento importe.


    ¿QUIERO UN DICCIONARIO SIN PROTOTIPO?

        Object.create(null)


    ¿NECESITO UN DICCIONARIO CON CLAVES ARBITRARIAS?

        Considerar Map
*/


// ============================================================
// 23. IDEA CLAVE: Object.create(null)
// ============================================================

/*
    Object.create(null) es especialmente importante.

    Un objeto normal:

        {}
         ↓
        Object.prototype
         ↓
        null


    Un objeto sin prototipo:

        Object.create(null)
         ↓
        null


    Por eso el segundo no hereda:

        toString()
        hasOwnProperty()
        __proto__
        valueOf()
        etc.


    Esto lo convierte en un contenedor muy simple
    para almacenar pares clave → valor.


    Ejemplo:

        let dictionary = Object.create(null);

        dictionary["name"] = "John";
        dictionary["__proto__"] = "test";


    Ambas claves se comportan como propiedades normales.
*/


// ============================================================
// 24. RESUMEN FINAL
// ============================================================

/*
    1. [[Prototype]] es la referencia interna utilizada
       para la herencia prototípica.


    2. Para leerlo usamos:

           Object.getPrototypeOf(obj)


    3. Para establecerlo usamos:

           Object.setPrototypeOf(obj, proto)


    4. Para crear directamente un objeto con un prototipo:

           Object.create(proto)


    5. Object.create() también permite utilizar
       descriptores de propiedades.


    6. __proto__ es un mecanismo histórico para acceder
       al [[Prototype]] y no se recomienda como getter/setter.


    7. { __proto__: proto } sí es una forma válida de
       establecer el prototipo durante la creación de un
       objeto.


    8. Cambiar el [[Prototype]] de objetos existentes puede
       perjudicar el rendimiento.


    9. Object.create(null) crea un objeto sin prototipo.


    10. Los objetos sin prototipo son útiles como diccionarios
        cuando necesitamos aceptar cualquier clave.


    11. Map suele ser una alternativa más apropiada cuando
        simplemente necesitamos almacenar pares clave → valor.
*/


// ============================================================
// REGLA PRÁCTICA
// ============================================================

/*
    Para código moderno:

    LEER PROTOTIPO
        ↓
    Object.getPrototypeOf()


    CREAR CON PROTOTIPO
        ↓
    Object.create()


    ESTABLECER PROTOTIPO
        ↓
    Object.setPrototypeOf()
    (preferentemente durante la creación, no dinámicamente)


    DICCIONARIO PURO
        ↓
    Object.create(null)


    DICCIONARIO GENERAL
        ↓
    Considerar Map


    Y recuerda:

        F.prototype
        ≠
        obj.[[Prototype]]
        ≠
        obj.__proto__

    Son conceptos relacionados, pero diferentes.
*/
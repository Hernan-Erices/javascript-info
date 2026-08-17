// ============================================================
// HERENCIA PROTOTÍPICA
// ============================================================

// ============================================================
// 1. ¿QUÉ ES LA HERENCIA PROTOTÍPICA?
// ============================================================

// La herencia prototípica permite que un objeto utilice
// propiedades y métodos de otro objeto.
//
// En lugar de copiar propiedades y métodos, un objeto puede
// tener otro objeto como su PROTOTIPO.
//
// Ejemplo:
//
// animal
//   ↑
// rabbit
//
// rabbit puede utilizar propiedades y métodos de animal
// cuando no los tiene directamente.


// ============================================================
// 2. [[Prototype]]
// ============================================================

// Todos los objetos tienen internamente una referencia especial:
//
// [[Prototype]]
//
// Esta referencia puede:
//
// - apuntar a otro objeto.
// - ser null.
//
// [[Prototype]] es una propiedad interna de JavaScript,
// por lo que normalmente no se accede directamente.

// Cuando intentamos leer una propiedad:
//
//     object.property
//
// JavaScript realiza, conceptualmente, esta búsqueda:
//
// 1. Busca property en object.
// 2. Si no la encuentra, busca en su [[Prototype]].
// 3. Si tampoco la encuentra, continúa por la cadena prototípica.
// 4. Si llega a null, devuelve undefined.


// ============================================================
// 3. EJEMPLO BÁSICO
// ============================================================

let animal = {
    eats: true
};

let rabbit = {
    jumps: true
};


// Establecemos animal como prototipo de rabbit:

rabbit.__proto__ = animal;


// rabbit tiene directamente:

console.log(rabbit.jumps); // true


// rabbit NO tiene directamente eats.
//
// JavaScript lo busca en su prototipo:

console.log(rabbit.eats); // true


// Conceptualmente:
//
// rabbit
//   ├── jumps
//   │
//   └── [[Prototype]]
//           ↓
//         animal
//           └── eats


// ============================================================
// 4. HEREDAR MÉTODOS
// ============================================================

// La herencia prototípica también permite reutilizar métodos.

let animal2 = {

    eats: true,

    walk() {
        console.log("El animal camina");
    }

};


let rabbit2 = {

    jumps: true,

    __proto__: animal2

};


rabbit2.walk();

// El método walk() no está directamente en rabbit2.
//
// JavaScript lo encuentra en animal2 y lo ejecuta.


// ============================================================
// 5. LA BÚSQUEDA DE PROPIEDADES
// ============================================================

// Cuando accedemos a una propiedad, JavaScript busca
// desde el objeto hacia arriba por la cadena prototípica.

let animal3 = {
    eats: true
};

let rabbit3 = {
    jumps: true,
    __proto__: animal3
};

let longEar = {
    earLength: 10,
    __proto__: rabbit3
};


// Cadena:
//
// longEar
//    ↓
// rabbit3
//    ↓
// animal3
//    ↓
// null


console.log(longEar.earLength);
// Encontrado en longEar.

console.log(longEar.jumps);
// No está en longEar.
// Encontrado en rabbit3.

console.log(longEar.eats);
// No está en longEar ni rabbit3.
// Encontrado en animal3.

console.log(longEar.name);
// No existe en toda la cadena.
// undefined


// ============================================================
// 6. CADENA PROTOTÍPICA
// ============================================================

// Podemos tener una cadena de varios prototipos:
//
// objeto
//   ↓
// prototipo
//   ↓
// otro prototipo
//   ↓
// otro prototipo
//   ↓
// null
//
// Esta estructura se denomina PROTOTYPE CHAIN
// o cadena prototípica.
//
// JavaScript recorre esta cadena cuando busca una propiedad
// que no encuentra directamente en el objeto.


// ============================================================
// 7. PROPIEDADES PROPIAS VS HEREDADAS
// ============================================================

// Es importante distinguir entre:
//
// PROPIEDAD PROPIA
// -> pertenece directamente al objeto.
//
// PROPIEDAD HEREDADA
// -> se encuentra en alguno de sus prototipos.


let animal4 = {
    eats: true
};

let rabbit4 = {

    jumps: true,

    __proto__: animal4

};


// Propiedades propias de rabbit4:
//
// jumps


// Propiedad heredada:
//
// eats


console.log(rabbit4.jumps); // propia
console.log(rabbit4.eats);  // heredada


// ============================================================
// 8. SOBRESCRIBIR UNA PROPIEDAD HEREDADA
// ============================================================

// Si el objeto tiene una propiedad con el mismo nombre
// que una propiedad del prototipo, se utiliza la propiedad
// del objeto.
//
// Ejemplo:

let animal5 = {
    eats: true
};

let rabbit5 = {

    eats: false,

    __proto__: animal5

};


console.log(rabbit5.eats);

// false


// JavaScript encuentra eats directamente en rabbit5,
// por lo que no necesita buscar en animal5.


// Conceptualmente:
//
// rabbit5.eats -> false
//
// animal5.eats -> true


// ============================================================
// 9. EL PROTOTIPO NO SE MODIFICA AL CAMBIAR UNA PROPIEDAD
// ============================================================

let animal6 = {
    eats: true
};

let rabbit6 = {
    __proto__: animal6
};


// Creamos/modificamos una propiedad directamente en rabbit6:

rabbit6.eats = false;


console.log(rabbit6.eats);  // false
console.log(animal6.eats);  // true


// La asignación:
//
// rabbit6.eats = false
//
// NO modifica animal6.eats.
//
// Crea o modifica la propiedad directamente en rabbit6.


// Esto es importante:
//
// LEER una propiedad puede hacer que JavaScript
// recorra la cadena prototípica.
//
// ESCRIBIR una propiedad normalmente afecta al objeto
// directamente.


/*
    Lectura:

    rabbit.eats
         ↓
    ¿Está en rabbit?
         ↓ no
    buscar en [[Prototype]]
         ↓
    animal.eats


    Escritura:

    rabbit.eats = false
         ↓
    modifica/crea rabbit.eats
*/


// ============================================================
// 10. UN OBJETO SOLO PUEDE TENER UN PROTOTIPO DIRECTO
// ============================================================

// Un objeto solo puede tener un [[Prototype]].
//
// No puede heredar directamente de dos objetos diferentes.
//
// Por ejemplo, no podemos tener:
//
// rabbit
//   ↙   ↘
// animal  plant
//
// Un objeto tiene una única referencia [[Prototype]].


// ============================================================
// 11. NO SE PERMITEN CICLOS
// ============================================================

// Una cadena prototípica no puede formar un ciclo.
//
// Por ejemplo:
//
// a -> b -> c -> a
//
// JavaScript no permite establecer una cadena circular
// mediante __proto__.


// ============================================================
// 12. EL PROTOTIPO PUEDE SER UN OBJETO O null
// ============================================================

// [[Prototype]] puede apuntar a:
//
// - un objeto
// - null
//
// Ejemplo:

let object = {
    name: "John"
};

object.__proto__ = null;


// Ahora object no tiene prototipo.
//
// La búsqueda de propiedades termina directamente en object.


// ============================================================
// 13. __proto__ NO ES [[Prototype]]
// ============================================================

// Esta diferencia es MUY importante.
//
// [[Prototype]]
// -> es una propiedad interna/especial de los objetos.
//
// __proto__
// -> es un getter/setter histórico que permite acceder
//    o modificar [[Prototype]].
//
// Por lo tanto:
//
// __proto__ !== [[Prototype]]
//
// __proto__ es una forma de interactuar con [[Prototype]].


// ============================================================
// 14. __proto__ COMO SETTER
// ============================================================

// Podemos utilizar __proto__ para establecer el prototipo:

let animal7 = {
    eats: true
};

let rabbit7 = {};

rabbit7.__proto__ = animal7;


// Ahora:
//
// rabbit7.[[Prototype]] === animal7


console.log(rabbit7.eats); // true


// ============================================================
// 15. __proto__ EN UN LITERAL DE OBJETO
// ============================================================

// También podemos establecer el prototipo directamente
// dentro del objeto:

let animal8 = {
    eats: true
};

let rabbit8 = {

    jumps: true,

    __proto__: animal8

};


console.log(rabbit8.eats);  // true
console.log(rabbit8.jumps); // true


// ============================================================
// 16. MÉTODOS MODERNOS
// ============================================================

// Aunque __proto__ es muy conocido y ampliamente soportado,
// JavaScript moderno recomienda utilizar:
//
// Object.getPrototypeOf()
// Object.setPrototypeOf()


// ------------------------------------------------------------
// Object.getPrototypeOf()
// ------------------------------------------------------------

// Obtiene el prototipo de un objeto.

let animal9 = {
    eats: true
};

let rabbit9 = {

    jumps: true,

    __proto__: animal9

};


console.log(
    Object.getPrototypeOf(rabbit9)
);

// Devuelve animal9.


// ------------------------------------------------------------
// Object.setPrototypeOf()
// ------------------------------------------------------------

// Permite establecer el prototipo.

let animal10 = {
    eats: true
};

let rabbit10 = {
    jumps: true
};


Object.setPrototypeOf(rabbit10, animal10);


console.log(rabbit10.eats); // true


// ============================================================
// 17. RESUMEN
// ============================================================

// HERENCIA PROTOTÍPICA
// ------------------------------------------------------------
// Permite que un objeto reutilice propiedades y métodos
// de otro objeto mediante su prototipo.
//
//
// [[Prototype]]
// ------------------------------------------------------------
// Referencia interna que conecta un objeto con su prototipo.
//
// Puede ser:
//
// objeto
// null
//
//
//
// CADENA PROTOTÍPICA
// ------------------------------------------------------------
// Si una propiedad no se encuentra en el objeto,
// JavaScript continúa buscando en su prototipo,
// y después en el prototipo de ese prototipo.
//
// Ejemplo:
//
// rabbit
//   ↓
// animal
//   ↓
// Object.prototype
//   ↓
// null


// ============================================================
//
// __proto__
// ------------------------------------------------------------
// Getter/setter histórico para acceder o modificar
// [[Prototype]].
//
//
//
// Object.getPrototypeOf(obj)
// ------------------------------------------------------------
// Obtiene el prototipo de obj.
//
//
//
// Object.setPrototypeOf(obj, prototype)
// ------------------------------------------------------------
// Establece el prototipo de obj.
//
// ============================================================


// ============================================================
// 18. CONCEPTOS QUE DEBES RECORDAR
// ============================================================

// 1. Un objeto puede tener un [[Prototype]].
//
// 2. El prototipo puede ser otro objeto o null.
//
// 3. JavaScript busca propiedades siguiendo la cadena prototípica.
//
// 4. Los métodos también pueden heredarse.
//
// 5. Una propiedad propia tiene prioridad sobre una heredada.
//
// 6. Asignar una propiedad normalmente modifica/crea la propiedad
//    en el objeto, no en su prototipo.
//
// 7. Un objeto solo puede tener un prototipo directo.
//
// 8. No pueden existir ciclos en la cadena prototípica.
//
// 9. __proto__ es un getter/setter para [[Prototype]],
//    no es la propiedad interna [[Prototype]].
//
// 10. En JavaScript moderno podemos utilizar:
//
//     Object.getPrototypeOf()
//     Object.setPrototypeOf()


// ============================================================
// IDEA CLAVE
// ============================================================

// La herencia prototípica puede resumirse así:
//
//     objeto
//        ↓
//     prototipo
//        ↓
//     otro prototipo
//        ↓
//       null
//
//
// Cuando hacemos:
//
//     objeto.propiedad
//
// JavaScript busca:
//
//     1. En objeto.
//     2. En su [[Prototype]].
//     3. En el [[Prototype]] de ese prototipo.
//     4. Continúa hasta encontrar la propiedad o llegar a null.
//
// Esto permite reutilizar propiedades y métodos sin copiarlos
// directamente entre objetos.


// ============================================================
// 1. LA ESCRITURA NO UTILIZA EL PROTOTIPO
// ============================================================

// La cadena prototípica se utiliza principalmente cuando
// JavaScript necesita BUSCAR una propiedad.
//
// Al ASIGNAR una propiedad, normalmente la modificación
// ocurre directamente en el objeto.

// Ejemplo:

let animal = {

    eats: true,

    walk() {
        console.log("Animal camina");
    }

};

let rabbit = {
    __proto__: animal
};


// rabbit no tiene walk() directamente.
//
// Al leer:

rabbit.walk();

// JavaScript busca:
//
// rabbit -> animal
//
// y encuentra walk() en animal.


// Pero si asignamos un nuevo walk():

rabbit.walk = function () {
    console.log("Conejo salta");
};


// Ahora rabbit tiene su propio walk().
//
// La propiedad del objeto tiene prioridad sobre
// la propiedad heredada.

rabbit.walk();

// Conejo salta


// El método original de animal no ha sido modificado:

animal.walk();

// Animal camina


// ============================================================
// 2. REGLA IMPORTANTE: LECTURA VS. ESCRITURA
// ============================================================

/*
    LECTURA
    ------------------------------------------------

    rabbit.walk
        ↓
    ¿Está en rabbit?
        ↓ no
    buscar en [[Prototype]]
        ↓
    animal.walk


    ESCRITURA
    ------------------------------------------------

    rabbit.walk = ...
        ↓
    crea/modifica rabbit.walk


    Por eso:

    - La lectura puede recorrer la cadena prototípica.
    - La escritura normalmente afecta al objeto directamente.
*/


// ============================================================
// 3. LOS SETTERS SON UNA EXCEPCIÓN
// ============================================================

// Los setters cambian ligeramente esta regla.
//
// Si la propiedad encontrada en el prototipo es un setter,
// la asignación ejecuta ese setter.
//
// Ejemplo:

let user = {

    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }

};


let admin = {

    isAdmin: true,

    __proto__: user

};


// fullName no existe directamente en admin.
//
// JavaScript la encuentra en user y utiliza su getter.

console.log(admin.fullName);

// John Smith


// Ahora asignamos:

admin.fullName = "Alice Cooper";


// JavaScript encuentra el setter de fullName en user
// y lo ejecuta.

console.log(admin.name);    // Alice
console.log(admin.surname); // Cooper

console.log(user.name);     // John
console.log(user.surname);  // Smith


// El setter pertenece a user, pero modifica admin.
//
// ¿Por qué?

// Por el valor de this.


// ============================================================
// 4. this NO DEPENDE DEL PROTOTIPO
// ============================================================

// Esta es una de las ideas MÁS IMPORTANTES.
//
// El hecho de que un método esté en el prototipo
// no determina cuál será this.
//
// En una llamada:
//
//     object.method()
//
// this será el objeto que está antes del punto.
//
// Por ejemplo:

let animal2 = {

    walk() {
        console.log(this);
    }

};

let rabbit2 = {

    __proto__: animal2

};


rabbit2.walk();


// Aunque walk() está definido en animal2:
//
// this === rabbit2
//
// porque la llamada fue:
//
// rabbit2.walk()
// ^^^^^^
//   this


// ============================================================
// 5. LOS MÉTODOS HEREDADOS MODIFICAN EL OBJETO QUE LOS LLAMA
// ============================================================

// Podemos tener un objeto que actúe como una especie
// de "almacén" de métodos.

let animal3 = {

    walk() {

        if (!this.isSleeping) {
            console.log("Estoy caminando");
        }

    },

    sleep() {

        this.isSleeping = true;

    }

};


let rabbit3 = {

    name: "Conejo Blanco",

    __proto__: animal3

};


rabbit3.sleep();


// sleep() está definido en animal3.
//
// Pero:
//
// this === rabbit3
//
// Por lo tanto:

console.log(rabbit3.isSleeping); // true


// animal3 no ha sido modificado:

console.log(animal3.isSleeping); // undefined


// ============================================================
// 6. MÉTODOS COMPARTIDOS, ESTADO INDEPENDIENTE
// ============================================================

// Esta es una de las principales ventajas de la herencia
// prototípica.
//
// Podemos compartir métodos entre muchos objetos,
// mientras cada objeto mantiene su propio estado.

// Ejemplo:

let animal4 = {

    sleep() {
        this.isSleeping = true;
    },

    wakeUp() {
        this.isSleeping = false;
    }

};


let rabbit4 = {
    name: "Rabbit",
    __proto__: animal4
};

let bird = {
    name: "Bird",
    __proto__: animal4
};


rabbit4.sleep();

console.log(rabbit4.isSleeping); // true
console.log(bird.isSleeping);    // undefined


bird.sleep();

console.log(rabbit4.isSleeping); // true
console.log(bird.isSleeping);    // true


// Ambos objetos comparten los mismos métodos:
//
// animal4.sleep
// animal4.wakeUp
//
// Pero cada uno tiene su propio estado.
//
// rabbit4.isSleeping
// bird.isSleeping


// ============================================================
// 7. IDEA CLAVE SOBRE this
// ============================================================

/*
    El lugar donde está definido el método NO determina this.

    Lo determina la forma en que se llama.

    animal.sleep()
        ↓
   this = animal


    rabbit.sleep()
        ↓
    this = rabbit


    bird.sleep()
        ↓
    this = bird


    Incluso si sleep() está definido únicamente en
    animal, this será el objeto que realizó la llamada.
*/


// ============================================================
// 8. for...in Y LAS PROPIEDADES HEREDADAS
// ============================================================

// Hay una diferencia importante entre:
//
// Object.keys()
//
// y:
//
// for...in
//
// Object.keys() devuelve únicamente las propiedades PROPIAS
// y ENUMERABLES.
//
// for...in recorre las propiedades ENUMERABLES propias
// y también las HEREDADAS.

let animal5 = {
    eats: true
};

let rabbit5 = {

    jumps: true,

    __proto__: animal5

};


// Solo propiedades propias:

console.log(Object.keys(rabbit5));

// ["jumps"]


// Propiedades propias + heredadas:

for (let key in rabbit5) {
    console.log(key);
}

// jumps
// eats


// ============================================================
// 9. hasOwnProperty()
// ============================================================

// Para saber si una propiedad pertenece directamente
// al objeto y NO es heredada, podemos utilizar:
//
// Object.prototype.hasOwnProperty()
//
// Normalmente se utiliza mediante:
//
// object.hasOwnProperty(key)


let animal6 = {
    eats: true
};

let rabbit6 = {

    jumps: true,

    __proto__: animal6

};


console.log(
    rabbit6.hasOwnProperty("jumps")
);

// true


console.log(
    rabbit6.hasOwnProperty("eats")
);

// false


// eats existe en rabbit6 gracias a la herencia,
// pero no pertenece directamente a rabbit6.


// ============================================================
// 10. FILTRAR PROPIEDADES HEREDADAS
// ============================================================

// Podemos combinar for...in con hasOwnProperty().

let animal7 = {
    eats: true
};

let rabbit7 = {

    jumps: true,

    __proto__: animal7

};


for (let key in rabbit7) {

    if (rabbit7.hasOwnProperty(key)) {

        console.log(`Propiedad propia: ${key}`);

    } else {

        console.log(`Propiedad heredada: ${key}`);

    }

}


// Resultado:
//
// Propiedad propia: jumps
// Propiedad heredada: eats


// ============================================================
// 11. ¿DE DÓNDE VIENE hasOwnProperty()?
// ============================================================

// Puede parecer extraño:
//
// rabbit.hasOwnProperty()
//
// Nosotros nunca definimos ese método.
//
// La explicación está en la cadena prototípica.

// Un objeto literal normalmente tiene:
//
// rabbit
//   ↓
// Object.prototype
//   ↓
// null


// Object.prototype proporciona métodos como:
//
// hasOwnProperty()
// toString()
// etc.
//
// Por eso rabbit puede utilizarlos aunque no estén definidos
// directamente en rabbit.


// ============================================================
// 12. Object.prototype
// ============================================================

// Cuando creamos un objeto mediante:
//
// {}
//
// normalmente su prototipo es:
//
// Object.prototype


let object = {};

console.log(
    Object.getPrototypeOf(object) === Object.prototype
);

// true


// Y Object.prototype finalmente tiene como prototipo:
//
// null


console.log(
    Object.getPrototypeOf(Object.prototype)
);

// null


// La cadena básica es:
//
// objeto
//   ↓
// Object.prototype
//   ↓
// null


// ============================================================
// 13. ¿POR QUÉ hasOwnProperty NO APARECE EN for...in?
// ============================================================

// for...in recorre propiedades ENUMERABLES.
//
// Las propiedades de Object.prototype, como
// hasOwnProperty(), normalmente tienen:
//
// enumerable: false
//
// Por eso no aparecen en un for...in.


// Podemos comprobarlo:

console.log(
    Object.getOwnPropertyDescriptor(
        Object.prototype,
        "hasOwnProperty"
    )
);


// Conceptualmente:
//
// {
//     value: function,
//     writable: true,
//     enumerable: false,
//     configurable: true
// }


// Por eso:
//
// for...in
//
// no muestra hasOwnProperty().


// ============================================================
// 14. Object.keys(), Object.values() Y HERENCIA
// ============================================================

// La mayoría de métodos modernos para obtener
// claves o valores trabajan únicamente con las
// propiedades PROPIAS del objeto.
//
// Por ejemplo:
//
// Object.keys()
// Object.values()
// Object.entries()
//
// NO recorren la cadena prototípica.

let animal8 = {
    eats: true
};

let rabbit8 = {

    jumps: true,

    __proto__: animal8

};


console.log(Object.keys(rabbit8));

// ["jumps"]


console.log(Object.values(rabbit8));

// [true]


console.log(Object.entries(rabbit8));

// [["jumps", true]]


// eats es heredada, por lo que no aparece.


// ============================================================
// 15. DIFERENCIAS IMPORTANTES
// ============================================================

/*
    Object.keys(obj)
    ------------------------------------------------
    Solo propiedades propias y enumerables.


    Object.values(obj)
    ------------------------------------------------
    Solo valores de propiedades propias y enumerables.


    Object.entries(obj)
    ------------------------------------------------
    Solo entradas propias y enumerables.


    for...in
    ------------------------------------------------
    Propiedades enumerables propias + heredadas.


    hasOwnProperty(key)
    ------------------------------------------------
    Comprueba si la propiedad pertenece directamente
    al objeto.
*/


// ============================================================
// 16. RESUMEN
// ============================================================

// ESCRITURA
// ------------------------------------------------------------
// La asignación normalmente afecta directamente al objeto.
//
// rabbit.name = "John";
//
// No modifica rabbit.__proto__.name.
//
//
//
// EXCEPCIÓN: SETTER
// ------------------------------------------------------------
// Si la propiedad encontrada en la cadena prototípica
// tiene un setter, ese setter se ejecuta.
//
//
//
// this
// ------------------------------------------------------------
// No depende de dónde esté definido el método.
//
// Depende del objeto que realiza la llamada:
//
// rabbit.walk()
//
// this === rabbit
//
//
//
// MÉTODOS HEREDADOS
// ------------------------------------------------------------
// Pueden ser compartidos por muchos objetos.
//
// El método puede estar en el prototipo,
// pero this hace referencia al objeto que lo llamó.
//
//
//
// for...in
// ------------------------------------------------------------
// Recorre propiedades enumerables propias y heredadas.
//
//
//
// Object.keys()
// Object.values()
// Object.entries()
// ------------------------------------------------------------
// Solo trabajan con propiedades propias.
//
//
//
// hasOwnProperty()
// ------------------------------------------------------------
// Permite comprobar si una propiedad pertenece directamente
// al objeto y no fue heredada.
//
// ============================================================


// ============================================================
// IDEA CLAVE
// ============================================================

/*
    La herencia prototípica permite compartir comportamiento:

                    animal
                /          \
                /            \
            rabbit           bird
                ↓              ↓
            comparte        comparte
            métodos         métodos

    Pero cada objeto mantiene su propio estado.

    Cuando hacemos:

        rabbit.sleep()

    aunque sleep() esté en animal:

        this === rabbit

    Por lo tanto, los datos modificados mediante this
    pertenecen a rabbit.


    En resumen:

    ┌───────────────────────────────────────────────┐
    │ LECTURA                                       │
    │ Puede recorrer la cadena prototípica.         │
    │                                               │
    │ ESCRITURA                                     │
    │ Normalmente modifica el objeto directamente. │
    │                                               │
    │ SETTER                                        │
    │ Puede ejecutarse desde el prototipo.          │
    │                                               │
    │ this                                          │
    │ Es el objeto que realiza la llamada.          │
    │                                               │
    │ for...in                                      │
    │ Incluye propiedades heredadas enumerables.    │
    │                                               │
    │ Object.keys/values/entries                    │
    │ Ignoran propiedades heredadas.                │
    └───────────────────────────────────────────────┘
*/
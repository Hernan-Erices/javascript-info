// ============================================================
// HERENCIA DE CLASES
// ============================================================
//
// La herencia permite crear una clase basada en otra.
//
// class Child extends Parent {}
//
// La clase hija puede:
// - heredar métodos y propiedades
// - agregar nuevos métodos/campos
// - sobrescribir métodos
// - llamar al constructor/métodos del padre con super()
//
// IMPORTANTE:
// La herencia de clases de JavaScript está construida sobre
// la herencia basada en prototipos.
// ============================================================

// ============================================================
// 1. extends
// ============================================================
//
// extends crea una relación de herencia entre clases.
//
// class Rabbit extends Animal {}
//
// Rabbit hereda los métodos definidos en Animal.prototype.
//

class Animal {
    constructor(name) {
        this.name = name;
        this.speed = 0;
    }

    run(speed) {
        this.speed = speed;
        console.log(`${this.name} corre a ${speed} km/h.`);
    }

    stop() {
        this.speed = 0;
        console.log(`${this.name} se detiene.`);
    }
}

class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} se esconde.`);
    }
}

const rabbit = new Rabbit("White Rabbit");

rabbit.run(5);   // Heredado de Animal
rabbit.hide();   // Propio de Rabbit
rabbit.stop();   // Heredado de Animal



// ============================================================
// 2. ¿QUÉ HACE REALMENTE extends?
// ============================================================
//
// extends establece una cadena de prototipos:
//
// rabbit
//   ↓
// Rabbit.prototype
//   ↓
// Animal.prototype
//   ↓
// Object.prototype
//   ↓
// null
//
// Por ejemplo, al buscar:
//
// rabbit.run()
//
// JavaScript busca:
//
// 1. rabbit
// 2. Rabbit.prototype
// 3. Animal.prototype → encuentra run()
// 4. Object.prototype
//
// Por tanto:
//
// extends NO reemplaza la herencia prototípica.
// La utiliza internamente para construir la cadena.
//
// ------------------------------------------------------------
//
// Comprobación:
//
// console.log(
//     Object.getPrototypeOf(Rabbit.prototype) === Animal.prototype
// );
// true
// ============================================================

// ============================================================
// 3. extends PUEDE RECIBIR UNA EXPRESIÓN
// ============================================================
//
// Lo que aparece después de extends no tiene que ser
// necesariamente el nombre de una clase.
//
// Puede ser una expresión que produzca una clase válida.
//

function createClass(message) {
    return class {
        sayHi() {
            console.log(message);
        }
    };
}

class User extends createClass("Hola") {}

const user = new User();

user.sayHi(); // Hola



// ============================================================
// 4. SOBRESCRIBIR MÉTODOS
// ============================================================
//
// La clase hija puede definir un método con el mismo nombre
// que uno de la clase padre.
//
// El método de la hija tiene prioridad.
//

class Animal2 {
    stop() {
        console.log("Animal se detiene.");
    }
}

class Rabbit2 extends Animal2 {
    stop() {
        console.log("Rabbit se detiene.");
    }
}

const rabbit2 = new Rabbit2();

rabbit2.stop(); // Rabbit se detiene.
//
// Rabbit2.prototype.stop() tiene prioridad sobre
// Animal2.prototype.stop().
//
// Si Rabbit2 no tuviera stop(), JavaScript buscaría
// el método en Animal2.prototype.
// ============================================================

// ============================================================
// 5. super.method()
// ============================================================
//
// Si no queremos reemplazar completamente el método padre,
// podemos reutilizarlo.
//
// super.method() → llama al método padre.
//
// Ejemplo:
// - ejecutar comportamiento del padre
// - agregar comportamiento propio
//

class Animal3 {
    constructor(name) {
        this.name = name;
        this.speed = 0;
    }

    run(speed) {
        this.speed = speed;
        console.log(`${this.name} corre a ${speed} km/h.`);
    }

    stop() {
        this.speed = 0;
        console.log(`${this.name} se detiene.`);
    }
}

class Rabbit3 extends Animal3 {
    hide() {
        console.log(`${this.name} se esconde.`);
    }

    stop() {
        super.stop(); // método del padre
        this.hide();  // comportamiento adicional
    }
}

const rabbit3 = new Rabbit3("White Rabbit");

rabbit3.run(5);
rabbit3.stop();

// White Rabbit corre a 5 km/h.
// White Rabbit se detiene.
// White Rabbit se esconde.


// ============================================================
// 6. super()
// ============================================================
//
// super() llama al constructor de la clase padre.
//
// Es necesario cuando una clase derivada define su propio
// constructor.
//
// REGLA:
//
// super(...)
// ↓
// se inicializa el objeto heredado
// ↓
// ya podemos utilizar this
//

class Animal4 {
    constructor(name) {
        this.name = name;
        this.speed = 0;
    }
}

class Rabbit4 extends Animal4 {
    constructor(name, earLength) {
        super(name);

        // Ahora this puede utilizarse.
        this.earLength = earLength;
    }
}

const rabbit4 = new Rabbit4("White Rabbit", 10);

console.log(rabbit4.name);      // White Rabbit
console.log(rabbit4.earLength); // 10



// ============================================================
// 7. REGLA: super() ANTES DE this
// ============================================================
//
// En un constructor derivado NO podemos utilizar this
// antes de llamar a super().
//
//  Incorrecto:
//
// class Rabbit extends Animal {
//     constructor(name) {
//         this.name = name;
//         super(name);
//     }
// }
//
// Error.
//
//  Correcto:
//
// class Rabbit extends Animal {
//     constructor(name) {
//         super(name);
//         this.name = name;
//     }
// }
//
// ------------------------------------------------------------
//
// ¿Por qué?
//
// Una clase derivada no inicializa this por sí misma antes
// de ejecutar super().
//
// El constructor de la clase base participa en la creación
// e inicialización del objeto.
//
// Por eso:
//
// super()
// ↓
// this disponible
// ↓
// podemos usar this
// ============================================================


// ============================================================
// 8. CONSTRUCTOR AUTOMÁTICO
// ============================================================
//
// Si una clase derivada NO tiene constructor propio,
// JavaScript proporciona uno equivalente conceptualmente a:
//
// constructor(...args) {
//     super(...args);
// }
//
// Por ejemplo:
//
// class Rabbit extends Animal {}
//
// Es equivalente a:
//
// class Rabbit extends Animal {
//     constructor(...args) {
//         super(...args);
//     }
// }
//
// Por eso esto funciona:

class Animal5 {
    constructor(name) {
        this.name = name;
    }
}

class Rabbit5 extends Animal5 {
    // constructor(...args) {
    //     super(...args);
    // }
}

const rabbit5 = new Rabbit5("Rabbit");

console.log(rabbit5.name); // Rabbit


// ============================================================
// 9. super EN ARROW FUNCTIONS
// ============================================================
//
// Las arrow functions NO tienen su propio super.
//
// Capturan léxicamente el super del contexto externo.
//
// Por eso esto funciona:

class Animal6 {
    stop() {
        console.log("Animal detenido.");
    }
}

class Rabbit6 extends Animal6 {
    stopLater() {
        setTimeout(() => {
            super.stop();
        }, 1000);
    }
}

const rabbit6 = new Rabbit6();

rabbit6.stopLater();
//
// La arrow function utiliza el super de stopLater().
//
// ------------------------------------------------------------
//
// Una función normal no puede utilizar super de esa forma:
//
// setTimeout(function () {
//     super.stop(); //  SyntaxError
// });
//
// La función normal no tiene acceso léxico al super del
// método externo.
// ============================================================


// ============================================================
// 10. SOBRESCRIBIR CAMPOS DE CLASE
// ============================================================
//
// Una clase hija también puede sobrescribir campos.
//
// PERO existe una diferencia importante respecto a los métodos.
//
// Los campos de una clase derivada se inicializan DESPUÉS
// de que super() termina.
//
// Ejemplo:

class Animal7 {
    name = "animal";

    constructor() {
        console.log(this.name);
    }
}

class Rabbit7 extends Animal7 {
    name = "rabbit";
}

new Animal7(); // animal
new Rabbit7(); // animal
//
// Puede parecer extraño.
//
// ¿Por qué Rabbit7 no muestra "rabbit"?
//
// El proceso es aproximadamente:
//
// new Rabbit7()
//      ↓
// super()
//      ↓
// Animal7 constructor
//      ↓
// this.name → "animal"
//      ↓
// termina constructor padre
//      ↓
// se inicializa Rabbit7.name
//      ↓
// this.name → "rabbit"
//
// Por lo tanto, cuando se ejecuta el constructor de Animal7,
// el campo name de Rabbit7 todavía no ha sido inicializado.
// ============================================================


// ============================================================
// 11. ORDEN DE INICIALIZACIÓN
// ============================================================
//
// CLASE BASE:
//
// 1. Se inicializan sus campos.
// 2. Se ejecuta el constructor.
//
// Ejemplo:
//
// class Animal {
//     name = "animal";
//
//     constructor() {
//         // name ya existe aquí
//     }
// }
//
// ------------------------------------------------------------
//
// CLASE DERIVADA:
//
// 1. Se ejecuta super().
// 2. Termina el constructor de la clase base.
// 3. Se inicializan los campos de la clase derivada.
// 4. Continúa el cuerpo restante del constructor derivado.
//
// Ejemplo:
//
// class Rabbit extends Animal {
//     name = "rabbit";
//
//     constructor() {
//         super();
//         // aquí Rabbit.name ya fue inicializado
//     }
// }
//
// ------------------------------------------------------------
//
// REGLA PRÁCTICA:
//
// Evita depender de campos sobrescritos de una clase hija
// dentro del constructor de la clase padre.
//
// Puede producir resultados inesperados.
// ============================================================


// ============================================================
// 12. CAMPOS VS MÉTODOS
// ============================================================
//
// Los métodos y los campos tienen un comportamiento diferente
// durante la construcción del objeto.
//
// ------------------------------------------------------------
// MÉTODOS
// ------------------------------------------------------------
//
// Un método sobrescrito puede ser encontrado dinámicamente.
//
// Ejemplo:

class Animal8 {
    showName() {
        console.log("animal");
    }

    constructor() {
        this.showName();
    }
}

class Rabbit8 extends Animal8 {
    showName() {
        console.log("rabbit");
    }
}

new Rabbit8(); // rabbit
//
// El constructor de Animal8 llama a this.showName().
// La búsqueda encuentra el método sobrescrito de Rabbit8.
//
// ------------------------------------------------------------
// CAMPOS
// ------------------------------------------------------------
//
// Los campos de la clase hija todavía no han sido inicializados
// mientras se ejecuta el constructor padre.
//
// Por eso:

class Animal9 {
    name = "animal";

    constructor() {
        console.log(this.name);
    }
}

class Rabbit9 extends Animal9 {
    name = "rabbit";
}

new Rabbit9(); // animal
//
// REGLA:
//
// Métodos → se resuelven mediante la cadena de prototipos.
//
// Campos → tienen un orden de inicialización específico.
//
// CONSEJO:
//
// Evita depender de campos sobrescritos desde constructores
// de clases padre.
// ============================================================


// ============================================================
// 13. ¿CÓMO FUNCIONA super INTERNAMENTE?
// ============================================================
//
// Esta parte es avanzada.
//
// Podríamos pensar que:
//
// super.method()
//
// simplemente equivale a:
//
// this.__proto__.method()
//
// Pero NO es así.
//
// JavaScript utiliza un mecanismo interno llamado:
//
// [[HomeObject]]
//
// Cuando un método se define mediante:
//
// method() {}
//
// JavaScript conoce internamente el objeto donde ese método
// fue definido.
//
// Ese objeto se denomina conceptualmente su [[HomeObject]].
//
// super utiliza esa información para determinar desde dónde
// debe buscar el método padre.
// ============================================================


// ============================================================
// 14. ¿POR QUÉ this.__proto__ NO REEMPLAZA A super?
// ============================================================
//
// Podríamos intentar hacer manualmente:
//
// this.__proto__.eat.call(this)
//
// Con un solo nivel puede parecer funcionar.
//

const animal10 = {
    name: "Animal",

    eat() {
        console.log(`${this.name} eats.`);
    }
};

const rabbit10 = {
    __proto__: animal10,

    name: "Rabbit",

    eat() {
        this.__proto__.eat.call(this);
    }
};

rabbit10.eat(); // Rabbit eats.



// Pero con varios niveles aparece un problema.
//
// Ejemplo:

const animal11 = {
    name: "Animal",

    eat() {
        console.log(`${this.name} eats.`);
    }
};

const rabbit11 = {
    __proto__: animal11,

    eat() {
        this.__proto__.eat.call(this);
    }
};

const longEar = {
    __proto__: rabbit11,

    eat() {
        this.__proto__.eat.call(this);
    }
};

// longEar.eat();
//
//  Maximum call stack size exceeded
//
// ¿Por qué?
//
// Cuando longEar.eat() llama:
//
// this.__proto__.eat.call(this)
//
// tenemos:
//
// this === longEar
//
// Por lo tanto:
//
// this.__proto__ === rabbit11
//
// Se llama:
//
// rabbit11.eat()
//
// Pero dentro de rabbit11.eat():
//
// this === longEar
//
// Por lo tanto:
//
// this.__proto__ === rabbit11
//
// ¡Vuelve a llamar rabbit11.eat()!
//
// Resultado:
//
// longEar.eat()
//      ↓
// rabbit11.eat()
//      ↓
// rabbit11.eat()
//      ↓
// rabbit11.eat()
//      ↓
// infinito
//
// ------------------------------------------------------------
//
// PROBLEMA:
//
// this representa el objeto sobre el que se realizó la llamada,
// no el objeto donde está definido actualmente el método.
//
// Por eso this.__proto__ no sabe "desde qué método" estamos
// intentando subir por la cadena.
//
// super sí tiene esa información mediante [[HomeObject]].
// ============================================================



// ============================================================
// 15. [[HomeObject]] + super
// ============================================================
//
// Con métodos definidos como:
//
// method() {}
//
// JavaScript puede asociar internamente el método con su
// [[HomeObject]].
//
// Entonces super puede subir correctamente desde ese punto.
//
// Ejemplo:

const animal12 = {
    name: "Animal",

    eat() {
        console.log(`${this.name} eats.`);
    }
};

const rabbit12 = {
    __proto__: animal12,

    name: "Rabbit",

    eat() {
        super.eat();
    }
};

const longEar2 = {
    __proto__: rabbit12,

    name: "Long Ear",

    eat() {
        super.eat();
    }
};

longEar2.eat(); // Long Ear eats.
//
// Conceptualmente:
//
// longEar2.eat()
//      ↓
// super.eat()
//      ↓
// rabbit12.eat()
//      ↓
// super.eat()
//      ↓
// animal12.eat()
//
// Y dentro de animal12.eat():
//
// this === longEar2
//
// Resultado:
//
// Long Ear eats.
//
// IMPORTANTE:
//
// [[HomeObject]] determina desde dónde buscar el padre.
//
// this sigue siendo el objeto original de la llamada.
// ============================================================



// ============================================================
// 16. CUIDADO AL COPIAR MÉTODOS QUE USAN super
// ============================================================
//
// [[HomeObject]] pertenece al método donde fue definido.
//
// Si copiamos ese método a otro objeto, [[HomeObject]] NO cambia.
//
// Ejemplo:

const animal13 = {
    sayHi() {
        console.log("I'm an animal");
    }
};

const rabbit13 = {
    __proto__: animal13,

    sayHi() {
        super.sayHi();
    }
};

const plant = {
    sayHi() {
        console.log("I'm a plant");
    }
};

const tree = {
    __proto__: plant,

    // Copiamos el método
    sayHi: rabbit13.sayHi
};

tree.sayHi(); // I'm an animal
//
// Puede parecer extraño.
//
// tree hereda de plant, por lo que podríamos esperar:
//
// "I'm a plant"
//
// Pero rabbit13.sayHi conserva conceptualmente:
//
// [[HomeObject]] → rabbit13
//
// Por eso:
//
// super.sayHi()
//      ↓
// busca desde rabbit13
//      ↓
// animal13.sayHi()
//
// Resultado:
//
// I'm an animal
//
// REGLA:
//
// No copies libremente métodos que utilicen super.
// ============================================================



// ============================================================
// 17. MÉTODOS VS PROPIEDADES DE FUNCIÓN
// ============================================================
//
// Para que un método tenga [[HomeObject]], debe utilizarse
// la sintaxis de método:
//
// method() {}
//
// Ejemplo:

const animal14 = {
    eat() {
        console.log("Animal eats");
    }
};

const rabbit14 = {
    __proto__: animal14,

    eat() {
        super.eat();
    }
};

rabbit14.eat(); // Animal eats
//
// ------------------------------------------------------------
//
// Una función almacenada como propiedad no tiene el mismo
// comportamiento de método:
//
// const animal = {
//     eat: function () {}
// };
//
// Para un método que necesita super, utiliza:
//
// eat() {}
//
// y no:
//
// eat: function () {}
// ============================================================



// ============================================================
// 18. RESUMEN GENERAL
// ============================================================
//
// EXTENDS
// -------
//
// class Rabbit extends Animal {}
//
// → Rabbit hereda de Animal.
//
//
//
// SUPER()
// --------
//
// constructor(name) {
//     super(name);
// }
//
// → ejecuta el constructor de la clase padre.
//
//
//
// SUPER.METHOD()
// --------------
//
// super.stop();
//
// → llama al método correspondiente del padre.
//
//
//
// SOBRESCRITURA
// -------------
//
// class Rabbit extends Animal {
//     stop() {
//         // implementación propia
//     }
// }
//
// → El método de Rabbit tiene prioridad.
//
//
//
// CONSTRUCTOR DERIVADO
// --------------------
//
// class Rabbit extends Animal {
//
//     constructor(name) {
//         super(name);
//         this.name = name;
//     }
// }
//
// → super() debe ejecutarse antes de utilizar this.
//
//
//
// CONSTRUCTOR AUTOMÁTICO
// ----------------------
//
// Si no defines constructor:
//
// class Rabbit extends Animal {}
//
// JavaScript proporciona conceptualmente:
//
// constructor(...args) {
//     super(...args);
// }
//
//
//
// CAMPOS
// ------
//
// Los campos de una clase derivada se inicializan después
// de que super() termina.
//
// Por eso un campo sobrescrito de la hija todavía no está
// disponible durante el constructor padre.
//
//
//
// MÉTODOS
// -------
//
// Los métodos sobrescritos se resuelven mediante la cadena
// de prototipos.
//
//
//
// ARROW FUNCTIONS
// ---------------
//
// Las arrow functions no tienen su propio super.
//
// Capturan el super del contexto externo.
//
//
//
// [[HomeObject]]
// --------------
//
// Es un mecanismo interno utilizado por super para saber
// desde qué objeto debe buscar el método padre.
//
//
//
// this.__proto__
// --------------
//
// NO es un reemplazo adecuado para super.
//
// Con varios niveles de herencia puede provocar recursión
// infinita.
//
//
//
// COPIAR MÉTODOS CON super
// -----------------------
//
// Un método conserva su [[HomeObject]] original.
//
// Por eso copiarlo a otro objeto puede producir resultados
// inesperados.
//
//
//
// MÉTODOS
// -------
//
// Para utilizar super en objetos:
//
// method() {}
//
// No:
//
// method: function() {}
// ============================================================



// ============================================================
// REGLAS CLAVE PARA MEMORIZAR
// ============================================================
//
// 1. extends → crea una relación de herencia.
//
// 2. La clase hija hereda métodos mediante la cadena
//    de prototipos.
//
// 3. La hija puede sobrescribir métodos del padre.
//
// 4. super.method() → llama al método padre.
//
// 5. super() → ejecuta el constructor padre.
//
// 6. En un constructor derivado:
//
//       super();
//       this.x = ...;
//
//    Primero super(), después this.
//
// 7. Si la hija no tiene constructor, JavaScript crea
//    conceptualmente:
//
//       constructor(...args) {
//           super(...args);
//       }
//
// 8. Los campos de la clase hija se inicializan después
//    de super().
//
// 9. Evita depender de campos sobrescritos de la hija
//    dentro del constructor padre.
//
// 10. Las arrow functions no tienen su propio super;
//     utilizan el super del contexto externo.
//
// 11. super no funciona simplemente como this.__proto__.
//
// 12. [[HomeObject]] permite que super determine correctamente
//     desde dónde buscar el método padre.
//
// 13. No copies libremente métodos que utilizan super,
//     porque conservan su [[HomeObject]] original.
//
// 14. Para utilizar super en objetos, utiliza la sintaxis:
//
//       method() {}
//
// ============================================================



// ============================================================
// ESQUEMA MENTAL FINAL
// ============================================================
//
//                    Animal
//                       ↑
//                    extends
//                       │
//                    Rabbit
//
// Rabbit.prototype
//        ↓
// Animal.prototype
//        ↓
// Object.prototype
//        ↓
// null
//
//
//
// constructor:
//
// new Rabbit()
//      ↓
// constructor Rabbit
//      ↓
// super()
//      ↓
// constructor Animal
//      ↓
// this disponible
//      ↓
// campos de Rabbit
//      ↓
// resto del constructor Rabbit
//
//
//
// método sobrescrito:
//
// rabbit.stop()
//      ↓
// Rabbit.prototype.stop()
//      ↓
// super.stop()
//      ↓
// Animal.prototype.stop()
//
//
//
// super internamente:
//
// método
//   ↓
// [[HomeObject]]
//   ↓
// prototipo de [[HomeObject]]
//   ↓
// método padre
//
// ============================================================
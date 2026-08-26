// ============================================================
// MIXINS
// ============================================================
//
// Un MIXIN permite agregar comportamiento a una clase sin
// utilizar herencia.
//
// JavaScript no permite herencia múltiple:
//
// class A {}
// class B {}
//
// class C extends A, B {} // No existe
//
// Solo podemos tener una clase padre mediante extends.
//
// Los mixins permiten solucionar este problema agregando
// métodos adicionales a una clase.
//
// ============================================================


// ============================================================
// 1. ¿QUÉ ES UN MIXIN?
// ============================================================
//
// Un mixin normalmente es un objeto que contiene métodos
// reutilizables.
//
// Luego podemos copiar esos métodos al prototipo de una clase.
//
// Conceptualmente:
//
//        Mixin
//          ?
//     métodos útiles
//          ?
//   Object.assign()
//          ?
//     Clase destino
//
// IMPORTANTE:
//
// Un mixin NO crea una relación de herencia.
//
// Es simplemente una forma de agregar comportamiento.
//
// ============================================================


// ============================================================
// 2. MIXIN BÁSICO
// ============================================================

const sayHiMixin = {

    sayHi() {
        console.log(`Hola ${this.name}`);
    },

    sayBye() {
        console.log(`Adiós ${this.name}`);
    }

};


class User {

    constructor(name) {
        this.name = name;
    }

}


// Copiamos los métodos del mixin al prototipo de User.

Object.assign(User.prototype, sayHiMixin);


const user = new User("Yvnir");

user.sayHi();  // Hola Yvnir
user.sayBye(); // Adiós Yvnir


// ============================================================
// 3. MIXIN + HERENCIA
// ============================================================
//
// Un mixin no reemplaza extends.
//
// Podemos utilizar ambos:
//
// class User extends Person {}
//
// Object.assign(User.prototype, mixin);
//
// Por lo tanto:
//
// extends ? herencia
// mixin   ? comportamiento adicional
//
// ============================================================

class Person {

    constructor(name) {
        this.name = name;
    }

    introduce() {
        console.log(`Soy ${this.name}`);
    }

}


class Admin extends Person {

    deleteUser() {
        console.log("Usuario eliminado.");
    }

}


// Agregamos comportamiento adicional.

Object.assign(Admin.prototype, sayHiMixin);


const admin = new Admin("Admin");

admin.introduce(); // Soy Admin
admin.sayHi();     // Hola Admin
admin.deleteUser(); // Usuario eliminado.


// ============================================================
// 4. MIXIN NO ES HERENCIA
// ============================================================
//
// Con:
//
// class Rabbit extends Animal {}
//
// Rabbit tiene una relación de herencia con Animal.
//
// En cambio:
//
// Object.assign(Rabbit.prototype, mixin);
//
// simplemente copia métodos.
//
// Por eso un mixin permite agregar múltiples
// comportamientos diferentes:
//
// Object.assign(MyClass.prototype, mixinA);
// Object.assign(MyClass.prototype, mixinB);
//
// ============================================================


// ============================================================
// 5. MIXINS PUEDEN TENER SU PROPIA HERENCIA
// ============================================================
//
// Un mixin puede utilizar otro objeto como prototipo.
//
// Ejemplo:
//
// sayHiMixin
//     ?
// sayMixin
//
// Entonces sayHiMixin puede utilizar super.
//
// ============================================================

const sayMixin = {

    say(phrase) {
        console.log(phrase);
    }

};


const sayHiMixin2 = {

    __proto__: sayMixin,

    sayHi() {
        super.say(`Hola ${this.name}`);
    },

    sayBye() {
        super.say(`Adiós ${this.name}`);
    }

};


class User2 {

    constructor(name) {
        this.name = name;
    }

}


Object.assign(User2.prototype, sayHiMixin2);


const user2 = new User2("Yvnir");

user2.sayHi();  // Hola Yvnir
user2.sayBye(); // Adiós Yvnir


// ============================================================
// 6. ¿POR QUÉ super() FUNCIONA AQUÍ?
// ============================================================
//
// Esto es importante.
//
// Los métodos sayHi() y sayBye() fueron definidos originalmente
// dentro de sayHiMixin2.
//
// Por eso sus métodos conservan internamente su [[HomeObject]]:
//
// sayHiMixin2
//      ?
// [[Prototype]]
//      ?
// sayMixin
//
// Entonces:
//
// super.say()
//
// busca el método en:
//
// sayHiMixin2.[[Prototype]]
//
// que es:
//
// sayMixin
//
//
//
// Aunque posteriormente copiemos los métodos a:
//
// User2.prototype
//
// su [[HomeObject]] NO cambia.
//
// ============================================================


// ============================================================
// 7. EVENT MIXIN
// ============================================================
//
// Un caso práctico muy común es crear un mixin para eventos.
//
// El mixin puede proporcionar:
//
// on()      ? escuchar un evento
// off()     ? dejar de escuchar
// trigger() ? lanzar un evento
//
// Esto permite agregar comportamiento de eventos a cualquier
// clase sin modificar su cadena de herencia.
//
// ============================================================

const eventMixin = {

    // --------------------------------------------------------
    // on()
    // --------------------------------------------------------
    // Registra un listener para un evento.

    on(eventName, handler) {

        if (!this._eventHandlers) {
            this._eventHandlers = {};
        }

        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }

        this._eventHandlers[eventName].push(handler);
    },


    // --------------------------------------------------------
    // off()
    // --------------------------------------------------------
    // Elimina un listener.

    off(eventName, handler) {

        const handlers = this._eventHandlers?.[eventName];

        if (!handlers) {
            return;
        }

        for (let i = handlers.length - 1; i >= 0; i--) {

            if (handlers[i] === handler) {
                handlers.splice(i, 1);
            }

        }

    },


    // --------------------------------------------------------
    // trigger()
    // --------------------------------------------------------
    // Ejecuta todos los listeners registrados para un evento.

    trigger(eventName, ...args) {

        const handlers = this._eventHandlers?.[eventName];

        if (!handlers) {
            return;
        }

        handlers.forEach(handler => {
            handler.apply(this, args);
        });

    }

};


// ============================================================
// 8. USAR eventMixin EN UNA CLASE
// ============================================================

class Menu {

    choose(value) {
        console.log(`Seleccionando: ${value}`);

        this.trigger("select", value);
    }

}


// Agregamos funcionalidad de eventos.

Object.assign(Menu.prototype, eventMixin);


const menu = new Menu();


// Creamos un listener.

function onSelect(value) {
    console.log(`Elemento seleccionado: ${value}`);
}


// Escuchar evento.

menu.on("select", onSelect);


// Generar evento.

menu.choose("123");

// Seleccionando: 123
// Elemento seleccionado: 123


// Dejar de escuchar.

menu.off("select", onSelect);


// Ahora el evento no ejecutará onSelect.

menu.choose("456");

// Seleccionando: 456


// ============================================================
// 9. FLUJO DE eventMixin
// ============================================================
//
// menu.on("select", handler)
//
//        ?
//
// _eventHandlers
//
// {
//     select: [handler]
// }
//
//
// menu.choose("123")
//
//        ?
//
// trigger("select", "123")
//
//        ?
//
// ejecuta handler("123")
//
// ============================================================


// ============================================================
// 10. VENTAJAS DE LOS MIXINS
// ============================================================
//
// Permiten:
//
// - reutilizar comportamiento
// - evitar duplicación de código
// - agregar varias funcionalidades
// - no modificar la cadena de herencia
// - combinar diferentes comportamientos
//
// Ejemplo:
//
// Object.assign(User.prototype, eventMixin);
// Object.assign(User.prototype, loggingMixin);
// Object.assign(User.prototype, validationMixin);
//
// User puede obtener los tres comportamientos sin heredar
// de tres clases diferentes.
//
// ============================================================


// ============================================================
// 11. CUIDADO: CONFLICTOS DE MÉTODOS
// ============================================================
//
// Object.assign() copia las propiedades.
//
// Si dos mixins tienen el mismo método:
//
// const mixinA = {
//     run() {
//         console.log("A");
//     }
// };
//
// const mixinB = {
//     run() {
//         console.log("B");
//     }
// };
//
// Object.assign(MyClass.prototype, mixinA);
// Object.assign(MyClass.prototype, mixinB);
//
// B sobrescribe A.
//
// Por eso debemos utilizar nombres de métodos claros y evitar
// conflictos entre mixins.
//
// ============================================================


// ============================================================
// 12. extends VS MIXIN
// ============================================================
//
// HERENCIA:
//
// class Rabbit extends Animal {}
//
// ? Rabbit ES un Animal.
// ? Existe una relación padre/hijo.
// ? Solo podemos extender una clase.
//
//
//
// MIXIN:
//
// Object.assign(Rabbit.prototype, eventMixin);
//
// ? Rabbit obtiene comportamiento adicional.
// ? No existe una relación de herencia.
// ? Podemos agregar varios mixins.
//
//
//
// EJEMPLO:
//
// class User extends Person {}
//
// Object.assign(User.prototype, eventMixin);
// Object.assign(User.prototype, loggerMixin);
//
//
//
// Person
//   ?
// User
//
// + eventMixin
// + loggerMixin
//
// ============================================================


// ============================================================
// RESUMEN
// ============================================================
//
// MIXIN
// -----
//
// Un mixin es un conjunto de métodos reutilizables que podemos
// agregar a otras clases.
//
//
//
// IMPLEMENTACIÓN
// --------------
//
// Object.assign(
//     Clase.prototype,
//     mixin
// );
//
//
//
// HERENCIA
// --------
//
// class Child extends Parent {}
//
// ? establece una relación de herencia.
//
//
//
// MIXIN
// -----
//
// Object.assign(Child.prototype, mixin);
//
// ? copia métodos al prototipo.
//
//
//
// SUPER
// -----
//
// Un mixin también puede tener un prototipo propio:
//
// const mixin = {
//     __proto__: anotherMixin,
//
//     method() {
//         super.method();
//     }
// };
//
// Los métodos conservan su [[HomeObject]] original.
//
//
//
// EVENT MIXIN
// ----------
//
// Un caso práctico:
//
// on()      ? suscribirse a un evento
// off()     ? cancelar suscripción
// trigger() ? emitir evento
//
//
//
// RIESGO
// -----
//
// Dos mixins pueden definir el mismo método y uno puede
// sobrescribir al otro.
//
// ============================================================


// ============================================================
// REGLAS CLAVE PARA MEMORIZAR
// ============================================================
//
// 1. JavaScript no permite herencia múltiple.
//
// 2. Una clase solo puede extender una clase.
//
// 3. Los mixins permiten agregar comportamientos reutilizables.
//
// 4. Normalmente se implementan copiando métodos con
//    Object.assign().
//
// 5. Los mixins NO son herencia.
//
// 6. Una clase puede utilizar varios mixins.
//
// 7. Los mixins pueden tener su propia cadena de prototipos.
//
// 8. Los métodos que usan super conservan su [[HomeObject]].
//
// 9. eventMixin es un ejemplo práctico de mixin.
//
// 10. Hay que evitar conflictos de nombres entre mixins.
//
// ============================================================
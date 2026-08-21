// ============================================================
// PROPIEDADES Y MÉTODOS ESTÁTICOS
// ============================================================
//
// Los miembros estáticos pertenecen a la CLASE,
// no a las instancias creadas con new.
//
// Se declaran utilizando:
//
//     static method() {}
//     static property = ...
//
// Ejemplo:
//
//     User.login()      → estático
//     user.login()      → método de instancia
//
// ============================================================



// ============================================================
// 1. MÉTODOS ESTÁTICOS
// ============================================================
//
// Un método estático se declara con static.
//
// Se llama directamente sobre la clase:
//
//     Class.method()
//
// NO sobre una instancia:
//
//     instance.method()
//

class User {
    static staticMethod() {
        console.log(this === User);
    }
}

User.staticMethod(); // true

// En esta llamada:
//
// User.staticMethod()
//
// this === User
//
// Es decir, el objeto antes del punto es User.



// ============================================================
// 2. ESTÁTICO vs MÉTODO DE INSTANCIA
// ============================================================
//
// MÉTODO NORMAL:
//
// Pertenece a las instancias.
//
//     user.sayHi()
//
// MÉTODO ESTÁTICO:
//
// Pertenece a la clase.
//
//     User.create()
//
// Ejemplo:

class User2 {
    constructor(name) {
        this.name = name;
    }

    // Método de instancia
    sayHi() {
        console.log(`Hola, soy ${this.name}`);
    }

    // Método estático
    static createGuest() {
        return new User2("Guest");
    }
}

const user = new User2("Yvnir");

user.sayHi();              // Hola, soy Yvnir
User2.createGuest();       // crea un User2

// Esto NO funciona:
//
// user.createGuest(); // 
// ============================================================



// ============================================================
// 3. ¿CUÁNDO USAR MÉTODOS ESTÁTICOS?
// ============================================================
//
// Se utilizan cuando una operación pertenece a la clase
// en general y no a una instancia específica.
//
// Casos comunes:
//
// - comparar objetos
// - crear objetos (factory methods)
// - validar datos
// - utilidades relacionadas con la clase
// - buscar/eliminar registros en una base de datos
//
// ------------------------------------------------------------
// EJEMPLO: COMPARAR ARTÍCULOS
// ------------------------------------------------------------

class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    static compare(articleA, articleB) {
        return articleA.date - articleB.date;
    }
}

const articles = [
    new Article("HTML", new Date(2019, 1, 1)),
    new Article("CSS", new Date(2019, 0, 1)),
    new Article("JavaScript", new Date(2019, 11, 1))
];

articles.sort(Article.compare);

console.log(articles[0].title); // CSS

// compare() no describe el comportamiento de UN artículo.
//
// Describe una operación que compara DOS artículos.
//
// Por eso tiene sentido que sea estático:
//
// Article.compare(articleA, articleB)
// ============================================================



// ============================================================
// 4. MÉTODOS ESTÁTICOS COMO FACTORY
// ============================================================
//
// Un método estático también puede utilizarse como una
// "fábrica" para crear objetos.
//
// Ejemplo:
//
//     Article.createTodays()
//
// En lugar de:
//
//     new Article(...)
//
// ------------------------------------------------------------

class Article2 {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    static createTodays() {
        return new this(
            "Resumen de hoy",
            new Date()
        );
    }
}

const article = Article2.createTodays();

console.log(article.title); // Resumen de hoy

// Dentro de:
//
// Article2.createTodays()
//
// this === Article2
//
// Por eso:
//
// new this(...)
//
// equivale aquí a:
//
// new Article2(...)
//
// Usar new this() puede ser especialmente útil cuando
// existen clases hijas que heredan el método estático.
// ============================================================



// ============================================================
// 5. PROPIEDADES ESTÁTICAS
// ============================================================
//
// También podemos crear propiedades pertenecientes a la clase.
//
// Se utiliza:
//
//     static property = value
//

class Article3 {
    static publisher = "Ilya Kantor";
}

console.log(Article3.publisher); // Ilya Kantor

// La propiedad pertenece a Article3:
//
// Article3.publisher
//
// No a sus instancias:
//
// const article3 = new Article3();
//
// article3.publisher; // undefined
// ============================================================



// ============================================================
// 6. ESTÁTICOS ≠ PROPIEDADES DE INSTANCIA
// ============================================================
//
// Es importante distinguir:
//
// class Example {
//     static x = 10;
//     y = 20;
// }
//
// const obj = new Example();
//
// Example.x → 10
// obj.x     → undefined
//
// obj.y     → 20
// Example.y → undefined
//

class Example {
    static x = 10;
    y = 20;
}

const example = new Example();

console.log(Example.x); // 10
console.log(example.x); // undefined

console.log(example.y); // 20
console.log(Example.y); // undefined
// ============================================================



// ============================================================
// 7. HERENCIA DE ESTÁTICOS
// ============================================================
//
// Los métodos y propiedades estáticos TAMBIÉN se heredan.
//
// Ejemplo:

class Animal {
    static planet = "Tierra";

    static compare(animalA, animalB) {
        return animalA.speed - animalB.speed;
    }

    constructor(name, speed) {
        this.name = name;
        this.speed = speed;
    }

    run() {
        console.log(`${this.name} corre a ${this.speed} km/h.`);
    }
}

class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} se esconde.`);
    }
}

const rabbits = [
    new Rabbit("Conejo Blanco", 10),
    new Rabbit("Conejo Negro", 5)
];

// Rabbit hereda compare()
rabbits.sort(Rabbit.compare);

console.log(rabbits[0].name); // Conejo Negro

// Rabbit también hereda planet
console.log(Rabbit.planet); // Tierra
// ============================================================



// ============================================================
// 8. ¿CÓMO SE HEREDAN LOS ESTÁTICOS?
// ============================================================
//
// Aquí existe una diferencia importante.
//
// En una clase:
//
// class Rabbit extends Animal {}
//
// JavaScript establece DOS relaciones:
//
// 1. Para miembros estáticos:
//
// Rabbit
//    ↓
// Animal
//
// 2. Para miembros de instancia:
//
// Rabbit.prototype
//    ↓
// Animal.prototype
//
// ------------------------------------------------------------
//
// Por eso podemos verificar:
//
// class Animal2 {}
// class Rabbit2 extends Animal2 {}
//
// console.log(
//     Object.getPrototypeOf(Rabbit2) === Animal2
// );
//
// true
//
// Y:
//
// console.log(
//     Object.getPrototypeOf(Rabbit2.prototype)
//         === Animal2.prototype
// );
//
// true
//
// ------------------------------------------------------------
//
// Esto permite que funcionen ambas formas:
//
// Rabbit2.metodoEstatico()
// rabbit2.metodo()
//
// ============================================================



// ============================================================
// 9. DOS CADENAS DE PROTOTIPOS
// ============================================================
//
// Este concepto es importante:
//
//
//          MIEMBROS ESTÁTICOS
//
//     Rabbit
//       ↓
//     Animal
//       ↓
//     Function.prototype
//       ↓
//     Object.prototype
//
//
//
//          MIEMBROS DE INSTANCIA
//
//     rabbit
//       ↓
//     Rabbit.prototype
//       ↓
//     Animal.prototype
//       ↓
//     Object.prototype
//       ↓
//     null
//
//
//
// Por eso:
//
// Rabbit.compare()
//
// busca compare siguiendo la cadena:
//
// Rabbit → Animal → ...
//
// Mientras:
//
// rabbit.run()
//
// busca run siguiendo:
//
// rabbit → Rabbit.prototype
//        → Animal.prototype → ...
//
// ============================================================



// ============================================================
// 10. STATIC Y THIS
// ============================================================
//
// Dentro de un método estático:
//
//     this
//
// normalmente hace referencia a la clase sobre la que se
// realizó la llamada.
//
// Ejemplo:

class Animal3 {
    static create() {
        return new this("Animal");
    }

    constructor(name) {
        this.name = name;
    }
}

const animal = Animal3.create();

console.log(animal.name); // Animal

// Aquí:
//
// Animal3.create()
//
// this === Animal3
// ============================================================



// ============================================================
// 11. STATIC + HERENCIA
// ============================================================
//
// El uso de this en métodos estáticos permite crear métodos
// que funcionan correctamente con clases hijas.
//
// Ejemplo:

class Animal4 {
    constructor(name) {
        this.name = name;
    }

    static create(name) {
        return new this(name);
    }
}

class Rabbit4 extends Animal4 {}

const rabbit4 = Rabbit4.create("White Rabbit");

console.log(rabbit4 instanceof Rabbit4); // true
console.log(rabbit4.name);               // White Rabbit

// ¿Por qué se creó un Rabbit4?
//
// Rabbit4.create()
//      ↓
// método heredado de Animal4
//      ↓
// this === Rabbit4
//      ↓
// new this(...)
//      ↓
// new Rabbit4(...)
//
// Esto es una de las razones por las que:
//
// new this()
//
// puede ser útil en métodos estáticos.
// ============================================================



// ============================================================
// 12. EQUIVALENCIA CON ASIGNACIÓN DIRECTA
// ============================================================
//
// Esto:
//
// class User {
//     static sayHi() {
//         console.log("Hi");
//     }
// }
//
// conceptualmente equivale a:
//
// class User {}
//
// User.sayHi = function () {
//     console.log("Hi");
// };
//
// Y:
//
// class User {
//     static name = "Admin";
// }
//
// conceptualmente equivale a:
//
// class User {}
//
// User.name = "Admin";
//
// La palabra static simplemente proporciona una sintaxis
// integrada y clara para definir miembros sobre la clase.
// ============================================================



// ============================================================
// 13. NO CONFUNDIR static CON prototype
// ============================================================
//
// Esto:
//
// class User {
//     static sayHi() {}
// }
//
// crea:
//
// User.sayHi
//
// Mientras esto:
//
// class User {
//     sayHi() {}
// }
//
// crea:
//
// User.prototype.sayHi
//
// Por eso:
//
// User.sayHi();       // estático
//
// const user = new User();
// user.sayHi();       // instancia
//
// Son dos lugares diferentes.
// ============================================================



// ============================================================
// RESUMEN
// ============================================================
//
// STATIC
// ------
//
// static method() {}
//
// → El método pertenece a la clase.
//
//
// PROPIEDAD ESTÁTICA
// ------------------
//
// static property = value;
//
// → La propiedad pertenece a la clase.
//
//
// MÉTODO DE INSTANCIA
// -------------------
//
// method() {}
//
// → Pertenece a las instancias mediante prototype.
//
//
// LLAMADAS
// -------
//
// Class.staticMethod();
// instance.method();
//
//
//
// HERENCIA
// --------
//
// Las propiedades y métodos estáticos también se heredan.
//
// class Rabbit extends Animal {}
//
// Rabbit.staticMethod();
//
// puede encontrar el método en Animal.
//
//
//
// DOS CADENAS
// -----------
//
// Estáticos:
//
// Rabbit → Animal
//
// Instancias:
//
// rabbit
//   ↓
// Rabbit.prototype
//   ↓
// Animal.prototype
//
//
//
// THIS EN ESTÁTICOS
// -----------------
//
// Class.method()
//
// → dentro del método, this normalmente es Class.
//
//
//
// FACTORY
// -------
//
// static create() {
//     return new this(...);
// }
//
// → Permite crear instancias desde la propia clase.
//
//
//
// ============================================================
// REGLAS CLAVE PARA MEMORIZAR
// ============================================================
//
// 1. static → pertenece a la clase, no a la instancia.
//
// 2. Class.method() → método estático.
//
// 3. instance.method() → método de instancia.
//
// 4. Los estáticos no están disponibles directamente
//    desde las instancias.
//
// 5. Las propiedades estáticas también existen:
//
//       static value = ...;
//
// 6. Los métodos y propiedades estáticos se heredan.
//
// 7. extends crea dos relaciones:
//
//       Child → Parent
//       Child.prototype → Parent.prototype
//
// 8. Dentro de un método estático:
//
//       this
//
//    normalmente representa la clase que realizó la llamada.
//
// 9. Los métodos estáticos son ideales para operaciones que
//    pertenecen a la clase en general:
//
//       compare()
//       create()
//       validate()
//       find()
//       remove()
//
// 10. Los métodos normales describen el comportamiento de
//     una instancia.
//
// ============================================================
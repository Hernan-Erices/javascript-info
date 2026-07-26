/*
===========================================
CONSTRUCTOR, OPERADOR `new`
===========================================

Los constructores permiten crear múltiples objetos con la misma estructura
sin repetir código. Para ello se utilizan funciones constructoras junto con
el operador `new`.
*/


/*
===========================================
FUNCIÓN CONSTRUCTORA
===========================================

Una función constructora es una función normal que sigue dos convenciones:

- Su nombre comienza con mayúscula.
- Debe llamarse usando `new`.
*/

function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("Jack");

alert(user.name);     // Jack
alert(user.isAdmin);  // false


/*
===========================================
¿QUÉ HACE `new`?
===========================================

Cuando una función se ejecuta con `new`, JavaScript:

1. Crea un objeto vacío.
2. Hace que `this` apunte a ese objeto.
3. Ejecuta el cuerpo de la función.
4. Devuelve automáticamente `this`.
*/

function User(name) {
  // this = {};

    this.name = name;
    this.isAdmin = false;

  // return this;
}

// Por eso:

let user = new User("Jack");

// Es equivalente a:

let user2 = {
    name: "Jack",
    isAdmin: false
};

// Podemos crear muchos objetos fácilmente.

let user1 = new User("John");
let user3 = new User("Ann");
let user4 = new User("Alice");


/*
===========================================
`new function() { ... }`
===========================================

Permite crear un objeto mediante una función constructora
que se ejecuta una sola vez.

La función no puede reutilizarse porque no tiene nombre.
*/

let singleUser = new function () {
    this.name = "John";
    this.isAdmin = false;

  // Lógica adicional...
};


/*
===========================================
`new.target`
===========================================

`new.target` permite saber si una función fue llamada con `new`.
*/

function UserExample() {
    alert(new.target);
}

UserExample();      // undefined

new UserExample();  // function UserExample() { ... }


// También puede utilizarse para forzar el uso de `new`.

function UserAuto(name) {
    if (!new.target) {
        return new UserAuto(name);
    }

    this.name = name;
}

let john = UserAuto("John");

alert(john.name); // John

// Aun así, normalmente se recomienda llamar siempre al constructor con `new`.


/*
===========================================
RETORNO EN UN CONSTRUCTOR
===========================================

Normalmente un constructor no utiliza `return`,
porque devuelve automáticamente `this`.

- Si devuelve un objeto, reemplaza a `this`.
- Si devuelve un valor primitivo, se ignora.
*/


// Devuelve un objeto.

function BigUser() {
    this.name = "John";

    return {
        name: "Godzilla"
    };
}

alert(new BigUser().name); // Godzilla


// Devuelve `this`.

function SmallUser() {
    this.name = "John";

    return;
}

alert(new SmallUser().name); // John


/*
===========================================
OMITIR PARÉNTESIS
===========================================

Si no hay argumentos, los paréntesis son opcionales.
*/

let userWithoutParentheses = new User;

// Equivale a:

let userWithParentheses = new User();

// Aunque es válido, normalmente se recomienda escribir los paréntesis.


/*
===========================================
MÉTODOS DENTRO DEL CONSTRUCTOR
===========================================

Un constructor puede crear propiedades y también métodos.
*/

function UserWithMethod(name) {
    this.name = name;

    this.sayHi = function () {
        alert("Mi nombre es: " + this.name);
    };
}

let peter = new UserWithMethod("John");

peter.sayHi();

/*
El objeto creado sería similar a:

{
    name: "John",
    sayHi: function () {
    // ...
    }
}
*/


/*
===========================================
RESUMEN
===========================================

- Los constructores crean objetos reutilizables.

- Se nombran con inicial mayúscula.

- Deben llamarse con `new`.

- `new` crea un objeto vacío, asigna `this`,
ejecuta la función y devuelve el objeto.

- Si el constructor devuelve un objeto con `return`,
ese objeto reemplaza a `this`.

- Si devuelve un valor primitivo, se ignora.

- Un constructor puede crear propiedades y métodos.

- Más adelante, las clases (`class`) ofrecen una forma
más moderna de crear este tipo de objetos.
*/
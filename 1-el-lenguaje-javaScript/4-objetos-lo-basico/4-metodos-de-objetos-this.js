/*
==================================================
MÉTODOS DE OBJETO Y "this"
==================================================

Los objetos suelen representar entidades del mundo
real, como usuarios, productos o pedidos.

Además de almacenar datos, también pueden realizar
acciones mediante métodos.
*/


/*
==================================================
MÉTODOS
==================================================

Un método es una función almacenada como propiedad
de un objeto.
*/

let user = {
    name: "John",
    age: 30
};

user.sayHi = function () {
    alert("¡Hola!");
};

user.sayHi(); // ¡Hola!


/*
==================================================
UN MÉTODO TAMBIÉN PUEDE USAR UNA FUNCIÓN EXISTENTE
==================================================
*/

function sayHi() {
    alert("¡Hola!");
}

user.sayHi = sayHi;

user.sayHi(); // ¡Hola!


/*
==================================================
PROGRAMACIÓN ORIENTADA A OBJETOS (POO)
==================================================

Consiste en representar entidades mediante objetos
que contienen datos y acciones.
*/

/*
==================================================
SINTAXIS ABREVIADA DE LOS MÉTODOS
==================================================

Forma tradicional:
*/

let user1 = {
    sayHi: function () {
        alert("Hello");
    }
};

/*
Forma abreviada (preferida):
*/

let user2 = {
    sayHi() {
        alert("Hello");
    }
};

/*
==================================================
"this"
==================================================

Dentro de un método, "this" hace referencia al
objeto que llamó al método.
*/

let user3 = {
    name: "John",

    sayHi() {
        alert(this.name);
    }
};

user3.sayHi(); // John


/*
==================================================
NO ES RECOMENDABLE USAR EL NOMBRE DEL OBJETO
==================================================

Es mejor usar "this" que el nombre de la variable.
*/

let user4 = {
    name: "John",

    sayHi() {
        alert(this.name);
    }
};


/*
==================================================
PROBLEMA AL USAR EL NOMBRE DEL OBJETO
==================================================
*/

let user5 = {
    name: "John",

    sayHi() {
        alert(user5.name);
    }
};

let admin = user5;

user5 = null;

// admin.sayHi(); // Error


/*
==================================================
"this" SE EVALÚA EN TIEMPO DE EJECUCIÓN
==================================================

Su valor depende del objeto que llama al método.
*/

let user6 = { name: "John" };
let admin2 = { name: "Admin" };

function showName() {
    alert(this.name);
}

user6.show = showName;
admin2.show = showName;

user6.show();   // John
admin2.show();  // Admin
admin2["show"](); // Admin


/*
==================================================
LLAMAR LA FUNCIÓN SIN UN OBJETO
==================================================

En modo estricto, "this" será undefined.
*/

function test() {
    alert(this);
}

test(); // undefined


/*
==================================================
"this" EN JAVASCRIPT
==================================================

"this" no queda ligado al objeto donde se definió
la función.

Depende del objeto que realiza la llamada.
*/


/*
==================================================
FUNCIONES FLECHA Y "this"
==================================================

Las funciones flecha no tienen su propio "this".

Utilizan el "this" del contexto externo.
*/

let user7 = {
    firstName: "Ilya",

    sayHi() {
        let arrow = () => alert(this.firstName);

    arrow();
    }
};

user7.sayHi(); // Ilya
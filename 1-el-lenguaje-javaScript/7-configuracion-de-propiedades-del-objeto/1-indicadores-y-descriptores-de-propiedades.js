// ============================================================
// INDICADORES Y DESCRIPTORES DE PROPIEDADES
// ============================================================

// ============================================================
// 1. DESCRIPTORES DE PROPIEDADES
// ============================================================

// Una propiedad de un objeto no es simplemente un par clave-valor.
// Internamente, cada propiedad tiene información adicional llamada
// "descriptor de propiedad".

// Un descriptor puede contener:
//
// value        -> valor de la propiedad.
// writable     -> indica si el valor puede modificarse.
// enumerable   -> indica si la propiedad aparece al enumerar.
// configurable -> indica si la propiedad puede eliminarse
//                o si sus indicadores pueden modificarse.


// Ejemplo:

let user = {
    name: "John"
};


// Podemos consultar el descriptor completo de una propiedad
// utilizando Object.getOwnPropertyDescriptor().

let descriptor = Object.getOwnPropertyDescriptor(user, "name");

console.log(descriptor);

// Resultado:
//
// {
//     value: "John",
//     writable: true,
//     enumerable: true,
//     configurable: true
// }


// Cuando creamos una propiedad de la forma habitual:
//
//     user.name = "John"
//
// sus tres indicadores normalmente comienzan en true.


// ============================================================
// 2. Object.getOwnPropertyDescriptor()
// ============================================================

// Permite obtener el descriptor de una propiedad específica.
//
// Sintaxis:
//
// Object.getOwnPropertyDescriptor(obj, propertyName);

let person = {
    name: "John"
};

console.log(
    Object.getOwnPropertyDescriptor(person, "name")
);


// ============================================================
// 3. Object.defineProperty()
// ============================================================

// Permite crear una propiedad o modificar los indicadores
// de una propiedad existente.
//
// Sintaxis:
//
// Object.defineProperty(obj, propertyName, descriptor);


// Si la propiedad ya existe, podemos modificar sus indicadores.

let user2 = {
    name: "John"
};

Object.defineProperty(user2, "name", {
    writable: false
});


// Ahora name es de solo lectura.


// En modo estricto:
//
// "use strict";
//
// user2.name = "Pete";
// Generaría un TypeError.


// En modo no estricto, la operación simplemente se ignora.


// ============================================================
// 4. CREAR UNA PROPIEDAD CON Object.defineProperty()
// ============================================================

// Cuando creamos una propiedad mediante defineProperty(),
// los indicadores que no especificamos son false.

// Por ejemplo:

let user3 = {};

Object.defineProperty(user3, "name", {
    value: "John"
});

console.log(
    Object.getOwnPropertyDescriptor(user3, "name")
);

// Resultado:
//
// {
//     value: "John",
//     writable: false,
//     enumerable: false,
//     configurable: false
// }


// Por eso, si queremos que una propiedad nueva se comporte
// como una propiedad normal, debemos indicar explícitamente
// los indicadores que queremos activar.

let user4 = {};

Object.defineProperty(user4, "name", {
    value: "John",
    writable: true,
    enumerable: true,
    configurable: true
});


// ============================================================
// 5. writable
// ============================================================

// writable controla si podemos cambiar el valor de una propiedad.

let user5 = {
    name: "John"
};

Object.defineProperty(user5, "name", {
    writable: false
});


// user5.name = "Pete";
// En modo estricto -> TypeError.
// En modo no estricto -> la asignación se ignora.

console.log(user5.name); // John


// Podemos volver a establecer writable en true mientras
// la propiedad siga siendo configurable.

Object.defineProperty(user5, "name", {
    writable: true
});

user5.name = "Pete";

console.log(user5.name); // Pete


// ============================================================
// 6. enumerable
// ============================================================

// enumerable controla si una propiedad aparece al enumerar
// las propiedades del objeto.
//
// Afecta, entre otros, a:
//
// - for...in
// - Object.keys()

let user6 = {
    name: "John",
    age: 25
};

Object.defineProperty(user6, "age", {
    enumerable: false
});


// age ya no aparece en for...in.

for (let key in user6) {
    console.log(key);
}

// name


// Tampoco aparece en Object.keys():

console.log(Object.keys(user6));

// ["name"]


// La propiedad sigue existiendo y podemos acceder a ella
// directamente:

console.log(user6.age); // 25


// ============================================================
// 7. Ejemplo con toString()
// ============================================================

// Los métodos integrados como Object.prototype.toString
// normalmente no son enumerables.
//
// Si nosotros creamos nuestro propio toString(), por defecto
// sí será enumerable.

let user7 = {
    name: "John",

    toString() {
        return this.name;
    }
};

for (let key in user7) {
    console.log(key);
}

// name
// toString


// Podemos ocultarlo de la enumeración:

Object.defineProperty(user7, "toString", {
    enumerable: false
});

for (let key in user7) {
    console.log(key);
}

// name


// ============================================================
// 8. configurable
// ============================================================

// configurable controla principalmente:
//
// - si la propiedad puede eliminarse.
// - si sus indicadores pueden modificarse.
//
// Una vez establecida:
//
// configurable: false
//
// la propiedad queda mucho más restringida.

let user8 = {
    name: "John"
};

Object.defineProperty(user8, "name", {
    configurable: false
});


// Podemos seguir modificando el valor porque writable
// todavía es true.

user8.name = "Pete";

console.log(user8.name); // Pete


// Pero ya no podemos eliminar la propiedad:
//
// delete user8.name;
// Error en modo estricto.


// Tampoco podemos volver a cambiar configurable a true.


// ============================================================
// 9. configurable: false + writable: false
// ============================================================

// Podemos crear una propiedad prácticamente inmutable:

let user9 = {
    name: "John"
};

Object.defineProperty(user9, "name", {
    writable: false,
    configurable: false
});


// Ya no podemos:
//
// - cambiar el valor.
// - eliminar la propiedad.
// - modificar sus indicadores.
//
// Ejemplos:
//
// user9.name = "Pete";
// delete user9.name;
//
// Object.defineProperty(user9, "name", {
//     value: "Pete"
// });


// ============================================================
// 10. EXCEPCIÓN DE writable
// ============================================================

// Existe una excepción importante:
//
// Una propiedad con:
//
// configurable: false
// writable: true
//
// todavía puede cambiar writable de true -> false.
//
// Pero no puede volver de false -> true.

let user10 = {
    name: "John"
};

Object.defineProperty(user10, "name", {
    configurable: false
});


// Podemos hacerla de solo lectura:

Object.defineProperty(user10, "name", {
    writable: false
});


// A partir de aquí, writable no puede volver a true.


// ============================================================
// 11. Math.PI COMO EJEMPLO
// ============================================================

// Algunas propiedades incorporadas de JavaScript ya tienen
// restricciones especiales.
//
// Math.PI es un ejemplo:

console.log(
    Object.getOwnPropertyDescriptor(Math, "PI")
);


// Conceptualmente:
//
// {
//     value: 3.141592653589793,
//     writable: false,
//     enumerable: false,
//     configurable: false
// }


// Por eso no podemos modificarlo ni eliminarlo:
//
// Math.PI = 3;
// delete Math.PI;
//
// Tampoco podemos cambiar sus indicadores porque
// configurable es false.


// ============================================================
// 12. Object.defineProperties()
// ============================================================

// Permite definir varias propiedades simultáneamente.
//
// Sintaxis:
//
// Object.defineProperties(obj, {
//     propiedad1: descriptor1,
//     propiedad2: descriptor2
// });

let user11 = {};

Object.defineProperties(user11, {

    name: {
        value: "John",
        writable: false,
        enumerable: true,
        configurable: true
    },

    surname: {
        value: "Smith",
        writable: false,
        enumerable: true,
        configurable: true
    }

});

console.log(user11.name);    // John
console.log(user11.surname); // Smith


// Es especialmente útil cuando necesitamos configurar
// varias propiedades de manera precisa.


// ============================================================
// 13. Object.getOwnPropertyDescriptors()
// ============================================================

// Mientras:
//
// Object.getOwnPropertyDescriptor()
//
// obtiene el descriptor de UNA propiedad,

// Object.getOwnPropertyDescriptors()
//
// obtiene los descriptores de TODAS las propiedades propias
// del objeto.

let user12 = {
    name: "John",
    age: 25
};

let descriptors = Object.getOwnPropertyDescriptors(user12);

console.log(descriptors);


// Obtendremos algo similar a:
//
// {
//     name: {
//         value: "John",
//         writable: true,
//         enumerable: true,
//         configurable: true
//     },
//
//     age: {
//         value: 25,
//         writable: true,
//         enumerable: true,
//         configurable: true
//     }
// }


// ============================================================
// 14. CLONAR UN OBJETO CONSERVANDO LOS DESCRIPTORES
// ============================================================

// Una copia tradicional puede hacerse mediante:
//
// for...in
//
// pero este método no conserva los descriptores.
//
// También podemos copiar utilizando:
//
// Object.assign()
//
// pero tampoco conserva los indicadores.

// Si queremos copiar también los descriptores:
//
// Object.getOwnPropertyDescriptors()
// +
// Object.defineProperties()


let original = {

    name: "John",
    age: 25

};


let clone = Object.defineProperties(
    {},
    Object.getOwnPropertyDescriptors(original)
);


console.log(clone);


// Esto permite conservar información como:
//
// writable
// enumerable
// configurable
//
// además de los valores.


// Una ventaja adicional es que
// Object.getOwnPropertyDescriptors()
// obtiene también propiedades no enumerables y propiedades Symbol,
// mientras que for...in no lo hace.


// ============================================================
// 15. MÉTODOS PARA PROTEGER UN OBJETO COMPLETO
// ============================================================

// Los descriptores permiten controlar propiedades individuales.
//
// JavaScript también proporciona métodos para limitar
// modificaciones sobre TODO el objeto.
//
// Los principales son:
//
// Object.preventExtensions()
// Object.seal()
// Object.freeze()


// ============================================================
// 16. Object.preventExtensions()
// ============================================================

// Impide agregar nuevas propiedades al objeto.
//
// Las propiedades existentes todavía pueden modificarse,
// eliminarse, etc., dependiendo de sus descriptores.

let user13 = {
    name: "John"
};

Object.preventExtensions(user13);


// Esto ya no está permitido:
//
// user13.age = 25;


// Pero podemos modificar una propiedad existente:

user13.name = "Pete";

console.log(user13.name); // Pete


// ============================================================
// 17. Object.seal()
// ============================================================

// Object.seal() sella el objeto.
//
// Impide:
//
// - agregar propiedades.
// - eliminar propiedades.
//
// Además, las propiedades existentes pasan a tener:
//
// configurable: false
//
// Sus valores todavía pueden cambiar si writable es true.

let user14 = {
    name: "John",
    age: 25
};

Object.seal(user14);

user14.name = "Pete";

console.log(user14.name); // Pete


// No podemos:
//
// user14.city = "Temuco";
// delete user14.age;


// ============================================================
// 18. Object.freeze()
// ============================================================

// Object.freeze() aplica una protección todavía mayor.
//
// Impide:
//
// - agregar propiedades.
// - eliminar propiedades.
// - modificar propiedades.
//
// Conceptualmente, las propiedades existentes pasan a:
//
// configurable: false
// writable: false

let user15 = {
    name: "John",
    age: 25
};

Object.freeze(user15);


// Estas operaciones no funcionarán:
//
// user15.name = "Pete";
// user15.city = "Temuco";
// delete user15.age;


// ============================================================
// 19. COMPROBAR EL ESTADO DEL OBJETO
// ============================================================

// JavaScript proporciona tres métodos para comprobar
// si un objeto está protegido.


// ------------------------------------------------------------
// Object.isExtensible()
// ------------------------------------------------------------

// Devuelve true si podemos agregar nuevas propiedades.

let object1 = {};

console.log(Object.isExtensible(object1)); // true

Object.preventExtensions(object1);

console.log(Object.isExtensible(object1)); // false


// ------------------------------------------------------------
// Object.isSealed()
// ------------------------------------------------------------

// Devuelve true si el objeto está sellado.

let object2 = {
    name: "John"
};

console.log(Object.isSealed(object2)); // false

Object.seal(object2);

console.log(Object.isSealed(object2)); // true


// ------------------------------------------------------------
// Object.isFrozen()
// ------------------------------------------------------------

// Devuelve true si el objeto está congelado.

let object3 = {
    name: "John"
};

console.log(Object.isFrozen(object3)); // false

Object.freeze(object3);

console.log(Object.isFrozen(object3)); // true


// ============================================================
// 20. RESUMEN
// ============================================================

// Una propiedad de un objeto puede tener:
//
// value
// writable
// enumerable
// configurable
//
//
//
// writable
// ------------------------------------------------------------
// true  -> podemos cambiar el valor.
// false -> la propiedad es de solo lectura.
//
//
// enumerable
// ------------------------------------------------------------
// true  -> aparece en enumeraciones como for...in y Object.keys().
// false -> queda fuera de esas enumeraciones.
//
//
// configurable
// ------------------------------------------------------------
// true  -> podemos eliminar la propiedad y modificar
//          sus indicadores.
//
// false -> no podemos eliminarla ni modificar normalmente
//          sus indicadores.
//
//
// ============================================================
//
// Object.getOwnPropertyDescriptor()
// -> obtiene el descriptor de una propiedad.
//
// Object.defineProperty()
// -> crea o modifica una propiedad y sus indicadores.
//
// Object.defineProperties()
// -> permite definir varias propiedades.
//
// Object.getOwnPropertyDescriptors()
// -> obtiene todos los descriptores propios del objeto.
//
// Object.preventExtensions()
// -> impide agregar nuevas propiedades.
//
// Object.seal()
// -> impide agregar/eliminar propiedades y establece
//    configurable: false.
//
// Object.freeze()
// -> impide agregar, eliminar o modificar propiedades.
//
// Object.isExtensible()
// -> comprueba si se pueden agregar propiedades.
//
// Object.isSealed()
// -> comprueba si el objeto está sellado.
//
// Object.isFrozen()
// -> comprueba si el objeto está congelado.
//
// ============================================================


// IDEA CLAVE:
//
// Una propiedad de JavaScript no es simplemente:
//
//     clave -> valor
//
// Internamente puede verse como:
//
//     {
//         value,
//         writable,
//         enumerable,
//         configurable
//     }
//
// Los descriptores permiten controlar con precisión
// qué operaciones están permitidas sobre cada propiedad.
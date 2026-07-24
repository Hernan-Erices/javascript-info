/*
==================================================
REFERENCIAS Y COPIA DE OBJETOS
==================================================

A diferencia de los tipos primitivos (string, number, boolean, etc.),
los objetos se almacenan y copian por referencia.

- Los primitivos se copian por valor.
- Los objetos se copian por referencia.
*/


/*
==================================================
COPIA DE TIPOS PRIMITIVOS
==================================================

Cada variable almacena su propio valor.
Modificar una no afecta a la otra.
*/

let message = "Hello!";
let phrase = message;

console.log(message); // "Hello!"
console.log(phrase);  // "Hello!"


/*
==================================================
LOS OBJETOS SE COPIAN POR REFERENCIA
==================================================

La variable NO guarda el objeto.
Guarda una referencia (dirección en memoria) hacia él.
*/

let user = {
    name: "John"
};


/*
==================================================
COPIAR UN OBJETO
==================================================

Al copiar un objeto NO se crea uno nuevo.
Solo se copia la referencia.

Ambas variables apuntan al mismo objeto.
*/

let admin = user;


/*
==================================================
MODIFICAR UNA REFERENCIA AFECTA AL MISMO OBJETO
==================================================
*/

admin.name = "Pete";

console.log(user.name);   // Pete
console.log(admin.name);  // Pete


/*
==================================================
COMPARACIÓN DE OBJETOS
==================================================

Dos objetos son iguales únicamente si apuntan
al mismo objeto.
*/

let a = {};
let b = a;

console.log(a == b);   // true
console.log(a === b);  // true


/*
==================================================
OBJETOS DIFERENTES
==================================================

Aunque tengan exactamente el mismo contenido,
siguen siendo objetos distintos.
*/

let obj1 = {};
let obj2 = {};

console.log(obj1 == obj2);   // false
console.log(obj1 === obj2);  // false


/*
==================================================
OBJETOS CONST
==================================================

const impide cambiar la referencia.

Las propiedades del objeto siguen siendo modificables.
*/

const person = {
    name: "John"
};

person.name = "Pete";

console.log(person.name); // Pete


/*
==================================================
CLONACIÓN MANUAL
==================================================

Crear un objeto nuevo y copiar todas las propiedades.
*/

let user1 = {
    name: "John",
    age: 30
};

let clone = {};

for (let key in user1) {
    clone[key] = user1[key];
}

clone.name = "Pete";

console.log(user1.name); // John
console.log(clone.name); // Pete


/*
==================================================
OBJECT.ASSIGN()
==================================================

Sintaxis:

Object.assign(destino, ...origenes)

Copia todas las propiedades de los objetos origen
al objeto destino y devuelve el destino.
*/

let user2 = {
    name: "John"
};

let permissions1 = {
    canView: true
};

let permissions2 = {
    canEdit: true
};

Object.assign(user2, permissions1, permissions2);

console.log(user2);
/*
{
    name: "John",
    canView: true,
    canEdit: true
}
*/


/*
==================================================
SI EXISTE LA PROPIEDAD, SE SOBRESCRIBE
==================================================
*/

let user3 = {
    name: "John"
};

Object.assign(user3, {
    name: "Pete"
});

console.log(user3.name); // Pete


/*
==================================================
CLONAR CON OBJECT.ASSIGN()
==================================================

Una forma sencilla de crear una copia superficial.
*/

let user4 = {
    name: "John",
    age: 30
};

let clone2 = Object.assign({}, user4);

console.log(clone2.name); // John
console.log(clone2.age);  // 30

/*
==================================================
CLONACIÓN ANIDADA (DEEP CLONE)
==================================================

Hasta ahora copiábamos objetos con propiedades primitivas.

Pero una propiedad también puede ser otro objeto.
*/

let user = {
    name: "John",
    sizes: {
        height: 182,
        width: 50
    }
};

console.log(user.sizes.height); // 182


/*
==================================================
PROBLEMA DE OBJECT.ASSIGN()
==================================================

Object.assign() realiza una copia superficial (shallow copy).

Los objetos anidados siguen compartiendo la misma referencia.
*/

let clone = Object.assign({}, user);

console.log(user.sizes === clone.sizes); // true


/*
==================================================
AMBOS OBJETOS COMPARTEN EL MISMO OBJETO ANIDADO
==================================================
*/

user.sizes.width = 60;

console.log(clone.sizes.width); // 60


/*
==================================================
CLONACIÓN PROFUNDA (DEEP CLONE)
==================================================

Consiste en copiar el objeto y también todos los
objetos que contiene.

Para ello existe structuredClone().
*/

let clone2 = structuredClone(user);

console.log(user.sizes === clone2.sizes); // false


/*
==================================================
AHORA SON TOTALMENTE INDEPENDIENTES
==================================================
*/

user.sizes.width = 70;

console.log(user.sizes.width);   // 70
console.log(clone2.sizes.width); // 60


/*
==================================================
STRUCTUREDCLONE()
==================================================

structuredClone(obj)

• Realiza una clonación profunda.
• Copia objetos anidados.
• Copia arrays.
• Copia valores primitivos.
*/


/*
==================================================
REFERENCIAS CIRCULARES
==================================================

También puede clonar objetos que se referencian
a sí mismos.
*/

let person = {};

person.me = person;

let copy = structuredClone(person);

console.log(copy.me === copy); // true


/*
==================================================
LIMITACIÓN
==================================================

structuredClone() NO puede clonar funciones.
*/

structuredClone({
  // Error
    f: function () {}
});


/*
==================================================
RESUMEN
==================================================

• Object.assign() → copia superficial (shallow copy).

• structuredClone() → copia profunda (deep clone).

• structuredClone() copia correctamente objetos anidados y referencias circulares.

• No puede clonar funciones.
*/
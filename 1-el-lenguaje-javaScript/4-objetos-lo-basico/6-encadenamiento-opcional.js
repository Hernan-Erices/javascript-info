/*
===========================================
ENCADENAMIENTO OPCIONAL `?.`
===========================================

El encadenamiento opcional (`?.`) permite acceder de forma segura
a propiedades o métodos que pueden no existir.

Si el valor anterior es `null` o `undefined`,
la evaluación se detiene y devuelve `undefined`
en lugar de producir un error.
*/


/*
===========================================
EL PROBLEMA
===========================================

Si intentamos acceder a una propiedad que no existe,
JavaScript genera un error.
*/

let user = {};

alert(user.address.street); // Error


/*
También puede ocurrir con elementos del DOM.
*/

let html = document.querySelector(".elem").innerHTML; // Error si el elemento no existe


/*
===========================================
ANTES DEL `?.`
===========================================

La forma tradicional era comprobar cada nivel
antes de acceder a la siguiente propiedad.
*/

let user2 = {};

alert(user2.address ? user2.address.street : undefined);


/*
Con varios niveles de anidamiento el código
se vuelve difícil de leer.
*/

alert(
    user2.address
        ? user2.address.street
        ? user2.address.street.name
        : null
        : null
);


/*
Otra alternativa era usar `&&`.
*/

alert(
    user2.address &&
    user2.address.street &&
    user2.address.street.name
);

// Funciona, pero repite muchas veces los nombres
// de las propiedades.


/*
===========================================
USANDO `?.`
===========================================

`?.` detiene la evaluación si el valor anterior
es `null` o `undefined`.
*/

let user3 = {};

alert(user3?.address?.street); // undefined


/*
También funciona con otros objetos.
*/

let html2 = document.querySelector(".elem")?.innerHTML;


/*
Incluso si el objeto es `null`.
*/

let user4 = null;

alert(user4?.address);         // undefined
alert(user4?.address?.street); // undefined


/*
Importante:

`?.` solo hace opcional el valor que está
inmediatamente a su izquierda.

Si queremos proteger varios niveles,
debemos usar `?.` en cada uno.
*/


/*
===========================================
NO ABUSES DE `?.`
===========================================

Debe utilizarse únicamente cuando sea normal
que un valor pueda no existir.

Si un objeto debería existir según la lógica
del programa, es mejor no ocultar el error.
*/

// Correcto si "address" es opcional.
user.address?.street;

// Si "user" siempre debería existir,
// usar `user?.address` podría ocultar un error.


/*
===========================================
LA VARIABLE DEBE EXISTIR
===========================================

`?.` no evita un ReferenceError si la variable
nunca fue declarada.
*/

// ReferenceError
userNotExists?.address;


/*
===========================================
CORTOCIRCUITO
===========================================

Si la parte izquierda es `null` o `undefined`,
JavaScript deja de evaluar el resto.
*/

let user5 = null;
let x = 0;

user5?.sayHi(x++);

alert(x); // 0


/*
===========================================
LLAMAR MÉTODOS CON `?.()`
===========================================

Permite ejecutar un método solo si existe.
*/

let userAdmin = {
    admin() {
        alert("I am admin");
    }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin
userGuest.admin?.(); // No ocurre nada


/*
===========================================
ACCEDER CON CORCHETES `?.[]`
===========================================

También funciona con la notación de corchetes.
*/

let key = "firstName";

let user6 = {
    firstName: "John"
};

let user7 = null;

alert(user6?.[key]); // John
alert(user7?.[key]); // undefined


/*
===========================================
USAR `delete`
===========================================

También puede utilizarse con `delete`.
*/

delete user?.name;


/*
===========================================
NO PUEDE USARSE PARA ASIGNAR
===========================================

`?.` solo sirve para leer, llamar métodos
o eliminar propiedades.

No puede utilizarse en el lado izquierdo
de una asignación.
*/

let user8 = null;

user8?.name = "John"; // Error


/*
===========================================
RESUMEN
===========================================

- `?.` evita errores cuando una propiedad o método puede no existir.

- Si encuentra `null` o `undefined`, devuelve `undefined` y detiene la evaluación.

- También funciona con:
    - Propiedades (`obj?.prop`)
    - Métodos (`obj?.method()`)
    - Corchetes (`obj?.[key]`)
    - `delete`

- No evita errores si la variable no fue declarada.

- No puede utilizarse para asignar valores.
*/
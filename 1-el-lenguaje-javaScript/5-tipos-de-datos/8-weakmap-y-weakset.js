// ======================================================
// WeakMap y WeakSet
// ======================================================

/*
Hasta ahora hemos visto estructuras como:

- Object
- Array
- Map
- Set

Todas ellas mantienen referencias fuertes a los objetos que almacenan.

¿Qué significa eso?

Mientras una estructura siga apuntando a un objeto,
el recolector de basura (Garbage Collector) NO podrá
liberar la memoria de ese objeto.

Para solucionar ciertos problemas de memoria existen:

• WeakMap
• WeakSet

Ambas almacenan referencias débiles (weak references),
permitiendo que los objetos sean eliminados automáticamente
cuando ya no existan otras referencias hacia ellos.
*/


// ======================================================
// ¿Por qué existen WeakMap y WeakSet?
// ======================================================

let john = {
    name: "John"
};

// john apunta al objeto

john = null;

// Ya no existen referencias al objeto.
// El Garbage Collector podrá eliminarlo de memoria.

/*
Mientras un objeto sea accesible desde alguna variable,
propiedad o estructura de datos, seguirá ocupando memoria.
*/


// ======================================================
// Referencias fuertes
// ======================================================

let user = {
    name: "John"
};

let array = [user];

user = null;

/*
Aunque user ahora vale null,
el objeto sigue existiendo porque el array
todavía guarda una referencia.

array
└──> { name: "John" }

Por eso NO puede ser eliminado.
*/


// ======================================================
// Lo mismo ocurre con Map
// ======================================================

let john2 = {
    name: "John"
};

let map = new Map();

map.set(john2, "Información");

john2 = null;

/*
El objeto sigue vivo porque Map mantiene
una referencia fuerte a la clave.

Mientras el Map exista,
el objeto también existirá.
*/


// ======================================================
// WeakMap
// ======================================================

/*
WeakMap funciona de forma similar a Map,
pero con una diferencia muy importante:

Las claves NO impiden que un objeto sea
recolectado por el Garbage Collector.

Si un objeto deja de tener referencias
fuera del WeakMap, será eliminado automáticamente,
junto con su valor asociado.
*/


// ======================================================
// Restricción: solo acepta objetos como claves
// ======================================================

let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "OK"); // ✔ Correcto

// Error
// weakMap.set("hola", 123);

/*
Las claves SIEMPRE deben ser objetos.

No se permiten:

- String
- Number
- Boolean
- Symbol
- BigInt
- null
- undefined
*/


// ======================================================
// Eliminación automática
// ======================================================

let person = {
    name: "John"
};

let users = new WeakMap();

users.set(person, "Información privada");

person = null;

/*
Ahora ya no existen referencias al objeto.

Cuando el Garbage Collector actúe:

- eliminará el objeto
- eliminará automáticamente su entrada dentro del WeakMap
*/


// ======================================================
// Métodos disponibles
// ======================================================

/*
WeakMap posee únicamente:

set(clave, valor)
get(clave)
has(clave)
delete(clave)

No existen:

- size
- clear()
- keys()
- values()
- entries()
- forEach()
- for...of
*/


// ======================================================
// ¿Por qué no puede iterarse?
// ======================================================

/*
El Garbage Collector trabaja de forma automática.

JavaScript NO garantiza cuándo eliminará un objeto.

Podría ocurrir:

- inmediatamente
- unos segundos después
- mucho más tarde

Por ello, nunca conocemos con certeza
el contenido real de un WeakMap.

Si existieran métodos como keys() o size,
sus resultados podrían cambiar en cualquier instante.

Por esa razón WeakMap no permite iterar.
*/


// ======================================================
// Caso de uso 1: datos adicionales
// ======================================================

/*
WeakMap es perfecto para asociar información
a objetos que pertenecen a otro código
(o incluso a una librería).

Cuando el objeto desaparece,
sus datos asociados también desaparecen.
*/

let privateData = new WeakMap();

let employee = {
    name: "John"
};

privateData.set(employee, {
    salary: 5000,
    password: "1234"
});

/*
Si employee deja de existir,
la información privada también será eliminada
automáticamente.
*/


// ======================================================
// Ejemplo: contador de visitas
// ======================================================

// visitsCount.js

let visitsCount = new WeakMap();

function countUser(user) {

    let count = visitsCount.get(user) || 0;

    visitsCount.set(user, count + 1);

}

// main.js

let visitor = {
    name: "John"
};

countUser(visitor);

// El usuario desaparece

visitor = null;

/*
No hace falta limpiar manualmente WeakMap.

Cuando visitor sea eliminado,
también desaparecerá automáticamente
su contador de visitas.
*/


// ======================================================
// Caso de uso 2: caché
// ======================================================

/*
Un uso muy frecuente es almacenar resultados
ya calculados.

Si el objeto deja de existir,
el resultado almacenado también desaparecerá.
*/

let cache = new WeakMap();

function process(obj) {

    if (!cache.has(obj)) {

        let result = "Resultado calculado";

        cache.set(obj, result);

    }

    return cache.get(obj);

}

let product = {};

process(product);

product = null;

/*
Cuando product sea eliminado,
también desaparecerá automáticamente
su resultado almacenado en caché.
*/


// ======================================================
// WeakSet
// ======================================================

/*
WeakSet funciona igual que Set,
pero solamente puede almacenar objetos.

También utiliza referencias débiles.

Cuando un objeto deja de existir,
es eliminado automáticamente del WeakSet.
*/


// ======================================================
// Métodos disponibles
// ======================================================

/*
add(obj)
delete(obj)
has(obj)

No existen:

- size
- keys()
- values()
- entries()
- forEach()
- for...of
*/


// ======================================================
// Ejemplo
// ======================================================

let visited = new WeakSet();

let john3 = {
    name: "John"
};

let pete = {
    name: "Pete"
};

let mary = {
    name: "Mary"
};

visited.add(john3);
visited.add(pete);

visited.add(john3); // No se duplica

alert(visited.has(john3)); // true
alert(visited.has(mary));  // false

john3 = null;

/*
Cuando John sea eliminado de memoria,
también desaparecerá automáticamente
del WeakSet.
*/


// ======================================================
// ¿Para qué sirve WeakSet?
// ======================================================

/*
Normalmente se utiliza para responder
preguntas de tipo Sí / No.

Ejemplos:

• ¿Este usuario ya inició sesión?
• ¿Este objeto ya fue procesado?
• ¿Este nodo del DOM ya fue visitado?
• ¿Este archivo ya fue leído?

Solo interesa saber si un objeto pertenece
al conjunto, sin almacenar información adicional.
*/


// ======================================================
// WeakMap vs WeakSet
// ======================================================

/*
WeakMap

Objeto -> Valor

Ejemplo:

usuario -> número de visitas

usuario -> datos privados

usuario -> resultado en caché


WeakSet

Solo objetos

Ejemplo:

- usuario visitó el sitio (SI/NO)

- archivo procesado (SI/NO)

- elemento ya recorrido (SI/NO)
*/


// ======================================================
// Resumen
// ======================================================

/*
Map
----

- Claves de cualquier tipo.
- Puede iterarse.
- Tiene size.
- Mantiene referencias fuertes.


WeakMap
--------

- Solo acepta objetos como claves.
- Referencias débiles.
- Elimina entradas automáticamente.
- No puede iterarse.
- No tiene size.


Set
----

- Valores únicos.
- Puede iterarse.
- Tiene size.


WeakSet
--------

- Solo almacena objetos.
- Referencias débiles.
- Eliminación automática.
- No puede iterarse.
- No tiene size.


Regla práctica
--------------

Usa Map o Set cuando necesites recorrer todos
los elementos o conservarlos explícitamente.

Usa WeakMap o WeakSet cuando los datos sean
temporales y deban desaparecer automáticamente
junto con los objetos a los que pertenecen.
*/
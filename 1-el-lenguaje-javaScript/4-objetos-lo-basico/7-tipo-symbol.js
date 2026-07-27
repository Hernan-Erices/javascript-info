/*
===========================================
TIPO `Symbol`
===========================================

`Symbol` es un tipo de dato primitivo que representa
un identificador único.

Solo dos tipos primitivos pueden utilizarse como
claves de un objeto:

- String
- Symbol

Si se usa otro tipo (como un número o un booleano),
JavaScript lo convierte automáticamente en string.
*/


/*
===========================================
CREAR UN SYMBOL
===========================================

Los Symbols se crean con `Symbol()`.
Opcionalmente pueden tener una descripción para
facilitar la depuración.
*/

let id = Symbol();

let userId = Symbol("id");


/*
Cada Symbol es único.

Aunque tengan la misma descripción,
siguen siendo diferentes.
*/

let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 === id2); // false


/*
===========================================
NO SE CONVIERTEN AUTOMÁTICAMENTE A STRING
===========================================

Los Symbols no pueden convertirse
implícitamente a texto.
*/

let symbolId = Symbol("id");

// alert(symbolId); // TypeError


/*
Si queremos mostrarlo, debemos hacerlo
explícitamente.
*/

alert(symbolId.toString());   // Symbol(id)

alert(symbolId.description);  // id


/*
===========================================
PROPIEDADES "OCULTAS"
===========================================

Los Symbols permiten crear propiedades que no
entran en conflicto con otras propiedades del objeto.
*/

let user = {
    name: "John"
};

let idSymbol = Symbol("id");

user[idSymbol] = 1;

alert(user[idSymbol]); // 1


/*
Si otro script crea otro Symbol con el mismo nombre,
no habrá conflicto.
*/

let anotherId = Symbol("id");

user[anotherId] = "Otro valor";


/*
Con strings sí existiría conflicto.
*/

user.id = "Nuestro valor";
user.id = "Otro valor"; // Sobrescribe el anterior


/*
===========================================
SYMBOLS EN OBJETOS LITERALES
===========================================

Para usar un Symbol como clave en un objeto literal,
deben utilizarse corchetes.
*/

let idKey = Symbol("id");

let person = {
    name: "John",
    [idKey]: 123
};


/*
===========================================
FOR...IN Y OBJECT.KEYS
===========================================

Las propiedades Symbol no aparecen en:

- for...in
- Object.keys()
*/

let secret = Symbol("id");

let userData = {
    name: "John",
    age: 30,
    [secret]: 123
};

for (let key in userData) {
  alert(key); // name, age
}

Object.keys(userData); // ["name", "age"]

alert(userData[secret]); // 123


/*
Object.assign() sí copia las propiedades Symbol.
*/

let clone = Object.assign({}, userData);

alert(clone[secret]); // 123


/*
===========================================
SYMBOLS GLOBALES
===========================================

`Symbol.for()` obtiene un Symbol desde el registro
global.

Si no existe, lo crea.
*/

let globalId = Symbol.for("id");

let globalIdAgain = Symbol.for("id");

alert(globalId === globalIdAgain); // true


/*
===========================================
SYMBOL.KEYFOR()
===========================================

Devuelve el nombre de un Symbol global.
*/

let sym = Symbol.for("name");

alert(Symbol.keyFor(sym)); // name


/*
No funciona con Symbols normales.
*/

let localSymbol = Symbol("name");

alert(Symbol.keyFor(localSymbol)); // undefined

alert(localSymbol.description); // name


/*
===========================================
SYMBOLS DEL SISTEMA
===========================================

JavaScript incluye Symbols especiales que modifican
el comportamiento de los objetos.

Algunos ejemplos son:

- Symbol.iterator
- Symbol.toPrimitive
- Symbol.hasInstance
- Symbol.isConcatSpreadable

Se estudiarán más adelante junto con sus temas
correspondientes.
*/


/*
===========================================
RESUMEN
===========================================

- `Symbol` es un tipo de dato primitivo único.

- Se crea con `Symbol(descripción)`.

- Dos Symbols con la misma descripción siguen siendo diferentes.

- No se convierten automáticamente a string.

- Son ideales para crear propiedades que no entren en conflicto con otras claves.

- No aparecen en `for...in` ni en `Object.keys()`.

- `Object.assign()` sí copia las propiedades Symbol.

- `Symbol.for()` utiliza el registro global y siempre devuelve el mismo Symbol para una misma clave.

- `Symbol.keyFor()` obtiene el nombre de un Symbol global.

- JavaScript incluye Symbols del sistema como `Symbol.iterator` y `Symbol.toPrimitive`.
*/
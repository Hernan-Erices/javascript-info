// ======================================================
// Conversión de objeto a valor primitivo
// ======================================================

// Cuando un objeto participa en operaciones donde se espera
// un valor primitivo (string, number o symbol), JavaScript
// lo convierte automáticamente antes de realizar la operación.

// Ejemplos:
alert(obj);      // Conversión a string
obj1 + obj2;     // Conversión automática
obj1 - obj2;     // Conversión a number

// ======================================================
// ¿Por qué ocurre esta conversión?
// ======================================================

// JavaScript no permite definir cómo funcionan operadores
// como +, -, *, / entre objetos.
//
// Antes de realizar la operación, convierte los objetos
// en valores primitivos y trabaja con esos valores.
//
// El resultado siempre será un valor primitivo,
// nunca otro objeto.


// ======================================================
// ¿Para qué sirve conocer esto?
// ======================================================

// Principalmente por dos motivos:
//
// 1. Entender errores cuando un objeto se convierte
//    automáticamente.
//
// 2. Comprender casos especiales, como los objetos Date,
//    que sí aprovechan estas conversiones.


// ======================================================
// Reglas generales de conversión
// ======================================================

// - No existe conversión a boolean.
//
// - Todos los objetos son verdaderos (truthy).

if ({}) {
  // Siempre entra aquí.
}

// Solo existen conversiones a:
// - String
// - Number

// ======================================================
// Conversión a String
// ======================================================

// Ocurre cuando JavaScript necesita una cadena.

alert(obj);

anotherObj[obj] = 123;


// ======================================================
// Conversión a Number
// ======================================================

// Ocurre en operaciones matemáticas.

Number(obj);

+obj;

date1 - date2;

user1 > user2;


// ======================================================
// Conversión "default"
// ======================================================

// Se utiliza cuando JavaScript no sabe si debe convertir
// el objeto a string o a número.

// Ejemplos:

obj1 + obj2;

user == 1;


// ======================================================
// Los tres "hints" (sugerencias)
// ======================================================

// JavaScript indica qué tipo de conversión necesita
// mediante un "hint".

// ------------------------------------------------------
// Hint: "string"
// ------------------------------------------------------

// Se usa cuando se espera una cadena.

alert(obj);

anotherObj[obj] = 123;


// ------------------------------------------------------
// Hint: "number"
// ------------------------------------------------------

// Se usa para operaciones matemáticas y comparaciones.

Number(obj);

+obj;

date1 - date2;

user1 > user2;


// ------------------------------------------------------
// Hint: "default"
// ------------------------------------------------------

// Se usa cuando el operador acepta tanto números
// como cadenas.

obj1 + obj2;

user == 1;


// ======================================================
// Nota importante
// ======================================================

// Casi todos los objetos nativos tratan el hint
// "default" igual que "number".
//
// La principal excepción es Date, que se estudia más adelante.


// ======================================================
// ¿Cómo realiza la conversión JavaScript?
// ======================================================

// JavaScript intenta convertir el objeto siguiendo
// este orden:

// 1. Busca:
//
//    obj[Symbol.toPrimitive](hint)
//
//    Si existe, utiliza ese método.

// 2. Si el hint es "string":
//
//    intenta llamar:
//
//    obj.toString()
//    obj.valueOf()

// 3. Si el hint es "number" o "default":
//
//    intenta llamar:
//
//    obj.valueOf()
//    obj.toString()

// Utilizará el primer método disponible que devuelva
// un valor primitivo.

// ======================================================
// Conversión mediante Symbol.toPrimitive
// ======================================================

// JavaScript busca primero el método:
//
// obj[Symbol.toPrimitive](hint)
//
// Si existe, lo utiliza para cualquier conversión
// y no intenta usar toString() ni valueOf().

let obj = {
    [Symbol.toPrimitive](hint) {
        // Debe devolver un valor primitivo.
        // hint puede ser:
        // "string"
        // "number"
        // "default"
    }
};


// ======================================================
// Ejemplo
// ======================================================

let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        return hint === "string"
        ? `{name: "${this.name}"}`
        : this.money;
    }
};

alert(user);        // {name: "John"}
alert(+user);       // 1000
alert(user + 500);  // 1500


// ======================================================
// toString() y valueOf()
// ======================================================

// Si Symbol.toPrimitive no existe,
// JavaScript utiliza los métodos tradicionales:
//
// - toString()
// - valueOf()


// ======================================================
// Orden de búsqueda
// ======================================================

// Hint "string":
//
// 1. toString()
// 2. valueOf()

// Hint "number" o "default":
//
// 1. valueOf()
// 2. toString()


// ======================================================
// Comportamiento por defecto
// ======================================================

// Un objeto normal implementa ambos métodos.

let user = { name: "John" };

alert(user);                   // [object Object]
alert(user.valueOf() === user); // true

// toString() devuelve:
//
// "[object Object]"
//
// valueOf() devuelve el propio objeto,
// por lo que normalmente se ignora.


// ======================================================
// Personalizando la conversión
// ======================================================

let user = {
    name: "John",
    money: 1000,

  // Se utiliza principalmente para el hint "string".
    toString() {
        return `{name: "${this.name}"}`;
    },

  // Se utiliza principalmente para los hints
  // "number" y "default".
    valueOf() {
        return this.money;
    }
};

alert(user);        // {name: "John"}
alert(+user);       // 1000
alert(user + 500);  // 1500


// ======================================================
// Implementando solo toString()
// ======================================================

// Si no existen Symbol.toPrimitive ni valueOf(),
// toString() se utilizará para todas las conversiones.

let user = {
    name: "John",

    toString() {
        return this.name;
    }
};

alert(user);       // John
alert(user + 500); // John500


// ======================================================
// Los métodos deben devolver un valor primitivo
// ======================================================

// Pueden devolver cualquier tipo primitivo:
//
// - string
// - number
// - boolean
// - bigint
// - symbol
// - null
// - undefined
//
// Lo único obligatorio es que NO devuelvan un objeto.


// ======================================================
// Diferencia importante
// ======================================================

// Symbol.toPrimitive es estricto.
//
// Si devuelve un objeto, JavaScript lanza un error.

// En cambio, si toString() o valueOf()
// devuelven un objeto, ese resultado se ignora
// y JavaScript intenta el siguiente método disponible.


// ======================================================
// Conversión adicional
// ======================================================

// Después de convertir el objeto a un valor primitivo,
// JavaScript puede realizar una segunda conversión
// dependiendo del operador utilizado.

let obj = {
    toString() {
        return "2";
    }
};

alert(obj * 2);

// Paso 1:
// obj -> "2"
//
// Paso 2:
// "2" -> 2
//
// Resultado:
// 4


// ======================================================
// Ejemplo con +
// ======================================================

// El operador + también acepta cadenas,
// por lo que en este caso concatena.

let obj = {
    toString() {
        return "2";
    }
};

alert(obj + 2); // "22"


// ======================================================
// Resumen
// ======================================================

// La conversión de objetos a valores primitivos
// ocurre automáticamente cuando una operación
// necesita un dato primitivo.
//
// JavaScript utiliza tres hints:
//
// - "string"
// - "number"
// - "default"
//
// El orden de conversión es:
//
// 1. obj[Symbol.toPrimitive](hint)
//
// 2. Si el hint es "string":
//    - toString()
//    - valueOf()
//
// 3. Si el hint es "number" o "default":
//    - valueOf()
//    - toString()
//
// Todos estos métodos deben devolver un valor primitivo.
//
// En la práctica, muchas veces basta con implementar
// únicamente toString() para obtener una representación
// legible del objeto.
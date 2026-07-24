/*
https://javascript.info/object
===========================================
OBJETOS
===========================================

Hasta ahora hemos trabajado principalmente con los tipos de datos primitivos.
JavaScript posee ocho tipos de datos, de los cuales siete son primitivos:

- number
- big int
- string
- boolean
- null
- undefined
- symbol

Los valores primitivos almacenan un único dato.

Sin embargo, cuando necesitamos almacenar varios datos relacionados entre sí,
utilizamos objetos (objects).

Un objeto permite guardar colecciones de datos y representar entidades más
complejas. De hecho, los objetos son una de las características más importantes
de JavaScript y aparecen constantemente a lo largo del lenguaje.

================================================================================
CREAR UN OBJETO
================================================================================

Un objeto puede crearse de dos maneras.

Mediante el constructor Object():

*/

let user = new Object();

/*

O utilizando un literal de objeto (la forma más utilizada):

*/

let user2 = {};

/*

Las llaves {} representan un objeto vacío.

================================================================================
LITERALES Y PROPIEDADES
================================================================================

Al crear un objeto podemos agregar propiedades.

Cada propiedad está formada por un par:

clave: valor

- La clave (key) también se conoce como nombre de la propiedad.
- El valor (value) puede ser cualquier tipo de dato.

Ejemplo:

*/

let persona = {
    name: "John",
    age: 30
};

/*

En este objeto existen dos propiedades:

name -> "John"

age -> 30

================================================================================
ACCEDER A LAS PROPIEDADES
================================================================================

Cuando conocemos el nombre de la propiedad, normalmente utilizamos la notación
de punto (.).

*/

alert(persona.name); // John
alert(persona.age);  // 30

/*

================================================================================
AGREGAR PROPIEDADES
================================================================================

Podemos agregar nuevas propiedades en cualquier momento.

*/

persona.isAdmin = true;

/*

Ahora el objeto contiene:

{
  name: "John",
  age: 30,
  isAdmin: true
}

================================================================================
ELIMINAR PROPIEDADES
================================================================================

Para eliminar una propiedad utilizamos el operador delete.

*/

delete persona.age;

/*

Ahora el objeto ya no tiene la propiedad age.

================================================================================
PROPIEDADES CON VARIAS PALABRAS
================================================================================

Si el nombre de una propiedad contiene espacios, debe escribirse entre comillas.

*/

let user = {
    name: "John",
    age: 30,
    "likes birds": true
};

/*

================================================================================
COMA FINAL (TRAILING COMMA)
================================================================================

La última propiedad puede terminar con una coma.

*/

let alumno = {
    name: "John",
    age: 30,
};

/*

Esto facilita agregar, eliminar o mover propiedades posteriormente.

================================================================================
NOTACIÓN CON CORCHETES
================================================================================

La notación de punto solamente funciona cuando el nombre de la propiedad es un
identificador válido.

Por ejemplo, esto produce un error:

*/

// user.likes birds = true;

/*

Para propiedades con espacios debemos utilizar corchetes.

*/

let usuario = {};

usuario["likes birds"] = true;

alert(usuario["likes birds"]); // true

delete usuario["likes birds"];

/*

La cadena dentro de los corchetes debe ir entre comillas.

================================================================================
USAR VARIABLES COMO NOMBRE DE PROPIEDAD
================================================================================

Los corchetes permiten utilizar el valor de una variable como nombre de la
propiedad.

*/

let key = "likes birds";

usuario[key] = true;

/*

Lo anterior es exactamente igual a:

usuario["likes birds"] = true;

Esta característica resulta muy útil cuando el nombre de la propiedad solo se
conoce durante la ejecución del programa.

Ejemplo:

*/

let person = {
    name: "John",
    age: 30
};

let property = prompt(
    "¿Qué propiedad deseas consultar?",
    "name"
);

alert(person[property]);

/*

Si el usuario escribe:

"name"

El resultado será:

John

================================================================================
¿POR QUÉ NO FUNCIONA LA NOTACIÓN DE PUNTO?
================================================================================

Supongamos:

*/

let employee = {
    name: "John",
    age: 30
};

let propertyName = "name";

/*

Esto NO funciona:

*/

// alert(employee.propertyName); // undefined

/*

Porque JavaScript busca una propiedad llamada literalmente "propertyName".

Para utilizar el contenido de la variable debemos escribir:

*/

alert(employee[propertyName]); // John

/*

================================================================================
PROPIEDADES CALCULADAS
================================================================================

También podemos utilizar corchetes al crear un objeto.

Esto se conoce como propiedad calculada.

*/

let fruit = prompt("¿Qué fruta comprar?", "apple");

let bag = {
    [fruit]: 5
};

/*

Si el usuario escribe:

apple

El objeto será:

{
    apple: 5
}

Es equivalente a escribir:

*/

let fruit2 = prompt("¿Qué fruta comprar?", "apple");

let bag2 = {};

bag2[fruit2] = 5;

/*

Pero la sintaxis con propiedades calculadas suele ser más clara y compacta.

También pueden utilizarse expresiones.

*/

let item = "apple";

let products = {
  [item + "Computers"]: 5
};

/*

Resultado:

{
    appleComputers: 5
}

================================================================================
¿CUÁNDO USAR PUNTO Y CUÁNDO CORCHETES?
================================================================================

Usa la notación de punto (.) cuando el nombre de la propiedad es conocido y es
un identificador válido.

Usa la notación con corchetes [] cuando:

- El nombre contiene espacios.
- El nombre proviene de una variable.
- El nombre es el resultado de una expresión.
- El nombre solo se conoce durante la ejecución del programa.

En general, la notación de punto es más sencilla y legible, mientras que los
corchetes ofrecen una mayor flexibilidad.

*/


/*

===========================================
FORMA ABREVIADA DEL VALOR DE LAS PROPIEDADES
(PROPERTY VALUE SHORTHAND)
===========================================

En JavaScript es muy común utilizar variables para asignar valores a las
propiedades de un objeto.

Por ejemplo:

*/

function makeUser(name, age) {
    return {
        name: name,
        age: age
    };
}

let user = makeUser("John", 30);

alert(user.name); // John

/*

En este ejemplo, el nombre de las variables (name y age) es exactamente igual
al nombre de las propiedades del objeto.

Como esta situación ocurre con mucha frecuencia, JavaScript ofrece una sintaxis
abreviada llamada Property Value Shorthand.

En lugar de escribir:

nombrePropiedad: nombreVariable

podemos escribir únicamente:

nombreVariable

Siempre que el nombre de la propiedad y el de la variable sean iguales.

================================================================================
SINTAXIS ABREVIADA
================================================================================

En lugar de escribir:

*/

function makeUser2(name, age) {
    return {
        name: name,
        age: age
    };
}

/*

Podemos escribir:

*/

function makeUser3(name, age) {
    return {
        name, // equivalente a name: name
        age   // equivalente a age: age
    };
}

/*

Ambas funciones producen exactamente el mismo resultado.

También podemos combinar propiedades abreviadas con propiedades normales.

*/

let person = {
    name,      // name: name
    age: 30
};

/*

================================================================================
LIMITACIONES EN LOS NOMBRES DE LAS PROPIEDADES
================================================================================

Las variables no pueden llamarse igual que las palabras reservadas del lenguaje,
como:

- for
- let
- return

Sin embargo, las propiedades de un objeto sí pueden utilizar esos nombres.

*/

let obj = {
    for: 1,
    let: 2,
    return: 3
};

alert(obj.for + obj.let + obj.return); // 6

/*

En realidad, los nombres de las propiedades pueden ser prácticamente cualquier
cadena de texto o símbolo.

Si se utiliza otro tipo de dato como clave (por ejemplo un número), JavaScript
lo convierte automáticamente en una cadena.

Ejemplo:

*/

let object = {
    0: "test"
};

alert(object["0"]); // test
alert(object[0]);   // test

/*

Ambos accesos funcionan porque la clave numérica 0 se convierte en la cadena
"0".

================================================================================
CASO ESPECIAL: __proto__
================================================================================

Existe una propiedad especial llamada __proto__.

No podemos asignarle un valor primitivo como si fuera una propiedad normal.

*/

let example = {};

example.__proto__ = 5;

alert(example.__proto__); // [object Object]

/*

La asignación del número 5 es ignorada.

La naturaleza especial de __proto__ se estudiará más adelante.

================================================================================
COMPROBAR SI UNA PROPIEDAD EXISTE
================================================================================

Si intentamos acceder a una propiedad que no existe, JavaScript no produce un
error.

Simplemente devuelve:

undefined

Ejemplo:

*/

let user2 = {};

alert(user2.noSuchProperty === undefined); // true

/*

También existe un operador especial para comprobar si una propiedad existe:

in

Su sintaxis es:

"propiedad" in objeto

Ejemplo:

*/

let employee = {
    name: "John",
    age: 30
};

alert("age" in employee);     // true
alert("salary" in employee);  // false

/*

También podemos utilizar una variable.

*/

let key = "age";

alert(key in employee); // true

/*

================================================================================
¿POR QUÉ EXISTE EL OPERADOR in?
================================================================================

Normalmente basta con comparar una propiedad con undefined.

Sin embargo, existe un caso especial.

Una propiedad puede existir y almacenar precisamente el valor undefined.

*/

let data = {
    test: undefined
};

alert(data.test); // undefined

alert("test" in data); // true

/*

Aunque el valor sea undefined, la propiedad sí existe.

Por ello el operador in permite distinguir entre:

- Una propiedad inexistente.
- Una propiedad cuyo valor es undefined.

================================================================================
EL BUCLE for...in
================================================================================

Para recorrer todas las propiedades de un objeto se utiliza el bucle:

for...in

Sintaxis:

for (let key in object) {
  // código
}

Ejemplo:

*/

let admin = {
    name: "John",
    age: 30,
    isAdmin: true
};

for (let key in admin) {

  alert(key);         // nombre de la propiedad
  alert(admin[key]);  // valor de la propiedad

}

/*

Resultado:

name
John

age
30

isAdmin
true

La variable del bucle puede llamarse como queramos.

Por ejemplo:

for (let prop in obj)

es igualmente válido.

================================================================================
ORDEN DE LAS PROPIEDADES
================================================================================

Al recorrer un objeto con for...in, las propiedades no siempre aparecen en el
mismo orden en que fueron creadas.

JavaScript sigue esta regla:

- Las claves enteras se recorren en orden numérico ascendente.
- Las demás propiedades conservan el orden en que fueron creadas.

Ejemplo:

*/

let codes = {
    "49": "Germany",
    "41": "Switzerland",
    "44": "Great Britain",
    "1": "USA"
};

for (let code in codes) {
    alert(code);
}

/*

Resultado:

1
41
44
49

Aunque "1" fue agregado al final, aparece primero porque es una clave entera.

================================================================================
¿QUÉ ES UNA CLAVE ENTERA?
================================================================================

Una clave entera es una cadena que puede convertirse a un número entero y luego
volver a convertirse a cadena sin cambiar su contenido.

Ejemplos:

*/

alert(String(Math.trunc(Number("49"))));   // "49"
alert(String(Math.trunc(Number("+49"))));  // "49" (ya no coincide con "+49")
alert(String(Math.trunc(Number("1.2"))));  // "1"  (ya no coincide con "1.2")

/*

Por eso:

"49"

sí es una clave entera.

Mientras que:

"+49"
"1.2"

no lo son.

================================================================================
PROPIEDADES NO ENTERAS
================================================================================

Si las claves no son enteras, se recorren en el mismo orden en que fueron
creadas.

*/

let customer = {
    name: "John",
    surname: "Smith"
};

customer.age = 25;

for (let prop in customer) {
    alert(prop);
}

/*

Resultado:

name
surname
age

================================================================================
EVITAR EL ORDEN NUMÉRICO
================================================================================

Si queremos conservar el orden de creación con claves que parecen números,
podemos convertirlas en cadenas no enteras.

Por ejemplo:

*/

let phoneCodes = {
    "+49": "Germany",
    "+41": "Switzerland",
    "+44": "Great Britain",
    "+1": "USA"
};

for (let code in phoneCodes) {
    alert(+code);
}

/*

Resultado:

49
41
44
1

Como las claves ya no son enteras ("+49" en lugar de "49"), JavaScript las
recorre respetando el orden en que fueron creadas.

*/
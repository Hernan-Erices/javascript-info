"use strict";

// ======================================================
// Asignación desestructurante (Destructuring Assignment)
// ======================================================

/*
La asignación desestructurante permite extraer valores de arrays
o propiedades de objetos y guardarlos directamente en variables.

Su objetivo es escribir un código más limpio, legible y expresivo.

En lugar de acceder manualmente a cada posición o propiedad:

const nombre = persona.nombre;
const edad = persona.edad;

podemos hacerlo en una sola línea:

const { nombre, edad } = persona;
*/

// ======================================================
// Desestructuración de Arrays
// ======================================================

/*
La sintaxis básica consiste en colocar las variables entre corchetes [].
Cada variable recibe el elemento que ocupa la misma posición.
*/

let persona = ["John", "Smith"];

let [nombre, apellido] = persona;

console.log(nombre);   // John
console.log(apellido); // Smith

/*
Equivale a escribir:

let nombre = persona[0];
let apellido = persona[1];

El array original NO se modifica.
Solo se copian sus valores.
*/

// ======================================================
// Muy útil junto con split()
// ======================================================

let [firstName, lastName] = "John Smith".split(" ");

console.log(firstName); // John
console.log(lastName);  // Smith

/*
split() devuelve un array, por lo que puede desestructurarse inmediatamente.
*/

// ======================================================
// Ignorar elementos
// ======================================================

/*
Si no necesitamos un elemento, simplemente dejamos un espacio
vacío utilizando una coma.
*/

let [nombre2, , titulo] = [
    "Julius",
    "Caesar",
    "Consul",
    "of the Roman Republic"
];

console.log(nombre2); // Julius
console.log(titulo);  // Consul

/*
"Caesar" se ignora.

También se ignoran automáticamente todos los elementos
para los que no exista una variable.
*/

// ======================================================
// Funciona con cualquier iterable
// ======================================================

/*
La desestructuración no funciona únicamente con arrays.

Funciona con cualquier objeto iterable:
- Strings
- Set
- Map
- etc.
*/

// String

let [a, b, c] = "abc";

console.log(a); // a
console.log(b); // b
console.log(c); // c

// Set

let [uno, dos, tres] = new Set([1, 2, 3]);

console.log(uno);   // 1
console.log(dos);   // 2
console.log(tres);  // 3

/*
Esto ocurre porque internamente JavaScript utiliza el protocolo
de iteración (for...of) para obtener los valores.
*/

// ======================================================
// Asignar directamente a propiedades
// ======================================================

/*
No es obligatorio asignar únicamente a variables.

También podemos asignar a propiedades de objetos.
*/

let usuario = {};

[usuario.nombre, usuario.apellido] =
    "John Smith".split(" ");

console.log(usuario);

/*
{
    nombre: "John",
    apellido: "Smith"
}
*/

// ======================================================
// Desestructuración junto a Object.entries()
// ======================================================

/*
Object.entries() devuelve un array de pares:

[
    ["nombre", "John"],
    ["edad", 30]
]

Cada par puede desestructurarse fácilmente.
*/

let user = {
    nombre: "John",
    edad: 30
};

for (let [clave, valor] of Object.entries(user)) {
    console.log(`${clave}: ${valor}`);
}

/*
Salida:

nombre: John
edad: 30
*/

// ======================================================
// Desestructuración con Map
// ======================================================

/*
Map ya es iterable.

Cada iteración devuelve automáticamente:

[key, value]

Por eso la desestructuración resulta muy natural.
*/

let mapa = new Map();

mapa.set("nombre", "John");
mapa.set("edad", 30);

for (let [clave, valor] of mapa) {
    console.log(`${clave}: ${valor}`);
}

/*
Salida:

nombre: John
edad: 30
*/

// ======================================================
// Intercambiar variables
// ======================================================

/*
Uno de los usos más conocidos consiste en intercambiar dos
variables sin utilizar una variable temporal.
*/

let invitado = "Jane";
let administrador = "Pete";

[invitado, administrador] =
    [administrador, invitado];

console.log(invitado);      // Pete
console.log(administrador); // Jane

/*
Sin desestructuración tendríamos que hacer:

let temp = invitado;
invitado = administrador;
administrador = temp;
*/

// ======================================================
// El operador Rest (...)
// ======================================================

/*
Si el array tiene más elementos que variables, los elementos
sobrantes simplemente se ignoran.

Solo se asignan los valores para los que existen variables.
*/

let nombres = [
    "Julius",
    "Caesar",
    "Consul",
    "of the Roman Republic"
];

let [nombre, apellido] = nombres;

console.log(nombre);   // Julius
console.log(apellido); // Caesar

/*
Los demás elementos ("Consul", "of the Roman Republic")
no se almacenan en ninguna parte.
*/

// ======================================================
// Capturar el resto de elementos
// ======================================================

/*
Si queremos guardar todos los elementos restantes,
utilizamos el operador Rest (...).

Debe ser el último elemento de la desestructuración.
*/

let [name1, name2, ...resto] = nombres;

console.log(name1); // Julius
console.log(name2); // Caesar

console.log(resto);
// ["Consul", "of the Roman Republic"]

console.log(resto[0]);      // Consul
console.log(resto[1]);      // of the Roman Republic
console.log(resto.length);  // 2

/*
resto siempre será un nuevo array que contiene
todos los elementos que no fueron asignados.
*/

// Podemos usar cualquier nombre.

let [a, b, ...titulos] = nombres;

console.log(titulos);
// ["Consul", "of the Roman Republic"]

// ======================================================
// Valores predeterminados (Default Values)
// ======================================================

/*
Si el array tiene menos elementos que variables,
las posiciones faltantes valen undefined.
*/

let [firstName, surname] = [];

console.log(firstName); // undefined
console.log(surname);   // undefined

/*
Podemos proporcionar valores por defecto usando =.
*/

let [nombreUsuario = "Guest", apellidoUsuario = "Anonymous"] = ["Julius"];

console.log(nombreUsuario);   // Julius
console.log(apellidoUsuario); // Anonymous

/*
Los valores por defecto solo se utilizan cuando
el valor correspondiente es undefined.
*/

// ======================================================
// Valores por defecto con expresiones
// ======================================================

/*
El valor predeterminado puede ser cualquier expresión
o incluso una llamada a una función.
*/

function obtenerApellido() {
    console.log("Calculando apellido...");
    return "Anonymous";
}

let [nombrePersona = "Guest", apellidoPersona = obtenerApellido()] = ["John"];

console.log(nombrePersona);   // John
console.log(apellidoPersona); // Anonymous

/*
La función obtenerApellido() solo se ejecuta porque
el segundo valor no existe.

Si ambos valores existieran, nunca sería llamada.
*/

// ======================================================
// Desestructuración de Objetos
// ======================================================

/*
La desestructuración también funciona con objetos.

Sintaxis:

let { propiedad1, propiedad2 } = objeto;

A diferencia de los arrays, aquí importa el nombre
de la propiedad, no su posición.
*/

let options = {
    title: "Menu",
    width: 100,
    height: 200
};

let { title, width, height } = options;

console.log(title);   // Menu
console.log(width);   // 100
console.log(height);  // 200

/*
Internamente equivale a:

let title = options.title;
let width = options.width;
let height = options.height;
*/

// ======================================================
// El orden no importa
// ======================================================

/*
En los objetos únicamente importa el nombre
de la propiedad.
*/

let {
    height: alto,
    title: titulo,
    width: ancho
} = options;

console.log(titulo); // Menu
console.log(ancho);  // 100
console.log(alto);   // 200

// ======================================================
// Renombrar variables
// ======================================================

/*
Podemos guardar una propiedad con un nombre diferente.

Sintaxis:

propiedad: nuevaVariable
*/

let {
    width: w,
    height: h,
    title: t
} = options;

console.log(t); // Menu
console.log(w); // 100
console.log(h); // 200

/*
width → w
height → h
title → t
*/

// ======================================================
// Valores predeterminados en objetos
// ======================================================

let configuracion = {
    title: "Menu"
};

let {
    title: tituloMenu,
    width: anchoMenu = 100,
    height: altoMenu = 200
} = configuracion;

console.log(tituloMenu); // Menu
console.log(anchoMenu);  // 100
console.log(altoMenu);   // 200

/*
Los valores por defecto solo se utilizan cuando
la propiedad no existe o su valor es undefined.
*/

// ======================================================
// Valores predeterminados con expresiones
// ======================================================

function obtenerAncho() {
    console.log("Calculando ancho...");
    return 500;
}

let {
    title: tituloPrincipal,
    width: anchoPrincipal = obtenerAncho()
} = {
    title: "Menu"
};

console.log(tituloPrincipal); // Menu
console.log(anchoPrincipal);  // 500

/*
obtenerAncho() solo se ejecuta porque la propiedad
width no existe.
*/

// ======================================================
// Renombrar + Valor por defecto
// ======================================================

let {
    width: anchoFinal = 100,
    height: altoFinal = 200,
    title: tituloFinal
} = {
    title: "Menu"
};

console.log(tituloFinal); // Menu
console.log(anchoFinal);  // 100
console.log(altoFinal);   // 200

/*
Podemos combinar ambas características:

propiedad: variable = valorPorDefecto
*/

// ======================================================
// Extraer únicamente las propiedades necesarias
// ======================================================

/*
No es obligatorio desestructurar todo el objeto.

Podemos extraer únicamente las propiedades que
realmente necesitamos.
*/

let menu = {
    title: "Menu",
    width: 100,
    height: 200,
    color: "blue",
    visible: true
};

let { title: nombreMenu } = menu;

console.log(nombreMenu); // Menu

/*
Las demás propiedades siguen existiendo en el objeto,
simplemente no fueron copiadas a variables.
*/

// ======================================================
// El operador Rest (...) en objetos
// ======================================================

/*
Al igual que en los arrays, también podemos utilizar el
operador Rest (...) con objetos.

Permite extraer algunas propiedades y agrupar todas las
restantes en un nuevo objeto.
*/

let options = {
    title: "Menu",
    width: 100,
    height: 200
};

let { title, ...rest } = options;

console.log(title); // Menu

console.log(rest);
// {
//     width: 100,
//     height: 200
// }

console.log(rest.width);  // 100
console.log(rest.height); // 200

/*
El objeto original NO se modifica.

rest contiene únicamente las propiedades que no fueron
extraídas previamente.
*/

// ======================================================
// Desestructurar variables ya existentes
// ======================================================

/*
Hasta ahora siempre hemos declarado las variables al mismo
tiempo que desestructurábamos:

let { title, width } = options;

Pero también podemos asignar valores a variables que ya
existen.
*/

let menuTitle;
let menuWidth;
let menuHeight;

/*
Esto produce un error:

{ menuTitle, menuWidth } = options;

¿Por qué?

Porque JavaScript interpreta las llaves {} como el inicio
de un bloque de código y no como una desestructuración.
*/

/*
La solución consiste en envolver la expresión entre
paréntesis.
*/

({
    title: menuTitle,
    width: menuWidth,
    height: menuHeight
} = options);

console.log(menuTitle);  // Menu
console.log(menuWidth);  // 100
console.log(menuHeight); // 200

// ======================================================
// Desestructuración anidada
// ======================================================

/*
Podemos desestructurar objetos y arrays que contienen
otros objetos o arrays.

El patrón de la izquierda debe tener la misma estructura
que el objeto original.
*/

let configuration = {

    size: {
        width: 100,
        height: 200
    },

    items: [
        "Cake",
        "Donut"
    ],

    extra: true
};

let {

    size: {
        width,
        height
    },

    items: [
        firstItem,
        secondItem
    ],

    title: menuName = "Menu"

} = configuration;

console.log(menuName);   // Menu
console.log(width);      // 100
console.log(height);     // 200
console.log(firstItem);  // Cake
console.log(secondItem); // Donut

/*
Observa que NO existen variables llamadas:

size
items

Extraemos directamente su contenido.
*/

// ======================================================
// Desestructuración en parámetros de funciones
// ======================================================

/*
Una función con muchos parámetros suele ser difícil de usar.

Por ejemplo:
*/

function showMenu1(
    title = "Untitled",
    width = 200,
    height = 100,
    items = []
) {

    console.log(title);
}

/*
Para utilizar solamente algunos argumentos tendríamos que
hacer algo como esto:

showMenu1(
    "My Menu",
    undefined,
    undefined,
    ["Item1", "Item2"]
);

Este código resulta poco legible.
*/

// ======================================================
// Solución: recibir un objeto
// ======================================================

/*
Es mucho más cómodo recibir un objeto y desestructurarlo
directamente.
*/

let menuOptions = {

    title: "My Menu",

    items: [
        "Item1",
        "Item2"
    ]
};

function showMenu({

    title = "Untitled",
    width = 200,
    height = 100,
    items = []

}) {

    console.log(title);   // My Menu
    console.log(width);   // 200
    console.log(height);  // 100
    console.log(items);
}

showMenu(menuOptions);

/*
Ventajas:

- No importa el orden de las propiedades.
- Solo enviamos las que necesitamos.
- Los valores faltantes utilizan sus valores por defecto.
*/

// ======================================================
// Desestructuración avanzada en funciones
// ======================================================

function showAdvancedMenu({

    title = "Untitled",

    width: w = 100,

    height: h = 200,

    items: [
        first,
        second
    ] = []

}) {

    console.log(title);
    console.log(w);
    console.log(h);

    console.log(first);
    console.log(second);
}

showAdvancedMenu({

    title: "My Menu",

    items: [
        "Item1",
        "Item2"
    ]
});

/*
width -> w
height -> h

Además, el array items también se desestructura.
*/

// ======================================================
// Parámetro por defecto para todo el objeto
// ======================================================

/*
Existe un pequeño problema.

Si llamamos a la función sin argumentos:

showMenu();

obtendremos un error porque JavaScript intentará
desestructurar undefined.
*/

/*
La solución consiste en asignar un objeto vacío como valor
predeterminado.
*/

function createMenu({

    title = "Menu",

    width = 100,

    height = 200

} = {}) {

    console.log(`${title} - ${width}x${height}`);
}

createMenu();

// Menu - 100x200

createMenu({
    title: "Settings"
});

// Settings - 100x200

/*
Ahora la función puede llamarse:

createMenu();

o

createMenu({...});

sin producir errores.
*/

// ======================================================
// Resumen
// ======================================================

/*
- El operador Rest (...) también funciona con objetos.

const { title, ...rest } = obj;

rest contiene todas las propiedades restantes.

--------------------------------------------------------

- Para desestructurar variables ya existentes debemos
encerrar la expresión entre paréntesis.

({ title } = obj);

--------------------------------------------------------

- La desestructuración puede ser anidada.

const {
    size: { width, height },
    items: [item1, item2]
} = obj;

--------------------------------------------------------

- Es muy común utilizar desestructuración en los
parámetros de una función.

function showMenu({
    title = "Menu",
    width = 100
}) {}

--------------------------------------------------------

- Si la función puede llamarse sin argumentos,
conviene asignar un objeto vacío como valor por defecto.

function showMenu({ title = "Menu" } = {}) {}

--------------------------------------------------------

La desestructuración es una de las características más
potentes de JavaScript moderno, ya que permite escribir
código más limpio, legible y flexible al trabajar con
objetos, arrays y funciones.
*/
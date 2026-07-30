// ======================================================
// Strings (Cadenas de texto)
// ======================================================

/*
En JavaScript, todo el texto se almacena mediante el tipo primitivo
string.

A diferencia de otros lenguajes, NO existe un tipo de dato para un
solo carácter (char). Tanto una letra como una palabra o un párrafo
son simplemente strings.

Internamente, todas las cadenas utilizan la codificación UTF-16,
lo que les permite representar prácticamente cualquier carácter
(acentos, emojis, símbolos, caracteres chinos, etc.).
*/


// ======================================================
// Formas de crear un string
// ======================================================

/*
Podemos utilizar tres tipos de comillas.
*/

// Comillas simples
let texto1 = 'Hola';

// Comillas dobles
let texto2 = "Hola";

// Backticks (template literals)
let texto3 = `Hola`;

console.log(texto1);
console.log(texto2);
console.log(texto3);

/*
Las comillas simples y dobles funcionan prácticamente igual.

Los backticks (`) ofrecen funcionalidades adicionales muy útiles.
*/


// ======================================================
// Interpolación de variables
// ======================================================

/*
Dentro de un template literal podemos insertar cualquier expresión
entre ${ }.
*/

let nombre = "Juan";
let edad = 25;

console.log(`Hola ${nombre}`);
console.log(`${nombre} tiene ${edad} años.`);
console.log(`Dentro de cinco años tendrá ${edad + 5}.`);

function sumar(a, b) {
    return a + b;
}

console.log(`5 + 3 = ${sumar(5, 3)}`);


/*
Con comillas simples o dobles esto no funciona.
*/

console.log("Hola " + nombre);


// ======================================================
// Strings de varias líneas
// ======================================================

/*
Los backticks permiten escribir texto en múltiples líneas
sin caracteres especiales.
*/

let lista = `Invitados:
- Juan
- Pedro
- María`;

console.log(lista);


/*
Con comillas simples o dobles debemos usar \n.
*/

let lista2 = "Invitados:\n- Juan\n- Pedro\n- María";

console.log(lista2);


// ======================================================
// Caracteres de escape
// ======================================================

/*
Todos comienzan con una barra invertida (\).
*/

console.log("Primera línea\nSegunda línea");
console.log("Columna1\tColumna2");
console.log("Barra invertida: \\");
console.log("Comillas dobles: \"");
console.log('Comillas simples: \'');


/*
Secuencias más comunes:

\n  -> salto de línea
\t  -> tabulación
\\  -> barra invertida
\"  -> comillas dobles
\'  -> comillas simples
\`  -> backtick
*/


// ======================================================
// Escapar comillas
// ======================================================

console.log('I\'m learning JavaScript');

console.log("I'm learning JavaScript");

console.log(`I'm learning JavaScript`);

/*
Normalmente es más cómodo cambiar el tipo de comillas
que escapar caracteres innecesariamente.
*/


// ======================================================
// Propiedad length
// ======================================================

/*
length indica la cantidad de caracteres.
*/

let saludo = "Hola";

console.log(saludo.length); // 4

/*
Los caracteres especiales también cuentan como un carácter.
*/

console.log("A\nB".length); // 3

/*
length es una propiedad, NO un método.
*/

console.log(saludo.length);

// Incorrecto:
// saludo.length();


// ======================================================
// Acceder a caracteres
// ======================================================

let palabra = "JavaScript";

/*
Con corchetes.
*/

console.log(palabra[0]); // J
console.log(palabra[4]); // S

/*
Con at().
*/

console.log(palabra.at(0));
console.log(palabra.at(4));

/*
Último carácter.
*/

console.log(palabra[palabra.length - 1]);
console.log(palabra.at(-1));

/*
Penúltimo carácter.
*/

console.log(palabra.at(-2));

/*
Diferencia importante:

Los corchetes NO aceptan índices negativos.
*/

console.log(palabra[-1]);     // undefined
console.log(palabra.at(-1));  // t


// ======================================================
// Recorrer un string
// ======================================================

/*
Podemos recorrer cada carácter usando for...of.
*/

for (const letra of "Hola") {
    console.log(letra);
}


/*
Resultado:

H
o
l
a
*/


// ======================================================
// Strings son inmutables
// ======================================================

/*
Los strings NO pueden modificarse directamente.
*/

let mensaje = "Hola";

// No funciona
mensaje[0] = "h";

console.log(mensaje); // Hola

/*
Para "modificar" un string debemos crear uno nuevo.
*/

mensaje = "h" + mensaje.slice(1);

console.log(mensaje); // hola


// ======================================================
// Crear nuevos strings
// ======================================================

let lenguaje = "javascript";

/*
Convertir a mayúsculas.
*/

console.log(lenguaje.toUpperCase());

/*
Convertir a minúsculas.
*/

console.log("JAVASCRIPT".toLowerCase());

/*
Aunque parezca que modifica el string...
*/

console.log(lenguaje);

/*
...realmente devuelve uno nuevo.
*/


// ======================================================
// Ejemplo completo
// ======================================================

let usuario = "Carlos";

let mensajeBienvenida = `
=========================
    Bienvenido ${usuario}
=========================

Disfruta aprendiendo JavaScript.
`;

console.log(mensajeBienvenida);


// ======================================================
// Métodos para trabajar con Strings
// ======================================================

/*
JavaScript incorpora numerosos métodos para manipular cadenas de texto.

En esta sección veremos cómo:

- Cambiar mayúsculas y minúsculas.
- Buscar texto dentro de otro texto.
- Comprobar si una cadena contiene otra.
- Obtener partes de un string.
*/


// ======================================================
// Cambiar mayúsculas y minúsculas
// ======================================================

/*
toUpperCase()

Convierte todos los caracteres a MAYÚSCULAS.
*/

console.log("Interface".toUpperCase());
// INTERFACE


/*
toLowerCase()

Convierte todos los caracteres a minúsculas.
*/

console.log("Interface".toLowerCase());
// interface


/*
También podemos convertir un solo carácter.
*/

let palabra = "Interface";

console.log(palabra[0].toLowerCase());
// i

console.log(palabra[0].toUpperCase());
// I


// ======================================================
// indexOf()
// ======================================================

/*
indexOf(texto, posicionInicial)

Busca la primera aparición de un texto.

Devuelve:

✔ La posición donde comienza.
✔ -1 si no existe.
*/

let frase = "Widget with id";

console.log(frase.indexOf("Widget")); // 0
console.log(frase.indexOf("widget")); // -1 (distingue mayúsculas)
console.log(frase.indexOf("id"));     // 1


/*
La búsqueda distingue entre mayúsculas y minúsculas.
*/

console.log("JavaScript".indexOf("java")); // -1
console.log("JavaScript".indexOf("Java")); // 0


// ======================================================
// Comenzar la búsqueda desde otra posición
// ======================================================

console.log(frase.indexOf("id", 2));
// 12


/*
La búsqueda comienza desde el índice indicado.
*/


// ======================================================
// Buscar todas las coincidencias
// ======================================================

let texto = "As sly as a fox, as strong as an ox";

let objetivo = "as";

let posicion = 0;

while (true) {

    let encontrada = texto.indexOf(objetivo, posicion);

    if (encontrada === -1) break;

    console.log(`Encontrado en ${encontrada}`);

    posicion = encontrada + 1;

}


/*
Versión más compacta.
*/

let pos = -1;

while ((pos = texto.indexOf(objetivo, pos + 1)) !== -1) {

    console.log(pos);

}


// ======================================================
// lastIndexOf()
// ======================================================

/*
Busca desde el final del string.
*/

console.log("Hola Hola".lastIndexOf("Hola"));
// 5

console.log("abcabcabc".lastIndexOf("abc"));
// 6


// ======================================================
// Error común con indexOf()
// ======================================================

/*
NO debemos hacer esto:
*/

let cadena = "Widget with id";

// Incorrecto
if (cadena.indexOf("Widget")) {

    console.log("Encontrado");

}

/*
¿Por qué?

Porque indexOf() devuelve 0.

Y 0 es false.
*/


/*
Forma correcta.
*/

if (cadena.indexOf("Widget") !== -1) {

    console.log("Encontrado");

}


/*
O mucho mejor...
usar includes().
*/


// ======================================================
// includes()
// ======================================================

/*
includes()

Devuelve simplemente:

true
false

Es la opción recomendada cuando solo queremos saber
si una cadena contiene otra.
*/

console.log("Widget with id".includes("Widget"));
// true

console.log("Hola".includes("Adiós"));
// false


/*
También acepta una posición inicial.
*/

console.log("Widget".includes("id"));
// true

console.log("Widget".includes("id", 3));
// false


// ======================================================
// startsWith()
// ======================================================

/*
Comprueba si una cadena comienza con un texto.
*/

console.log("JavaScript".startsWith("Java"));
// true

console.log("JavaScript".startsWith("Script"));
// false


// ======================================================
// endsWith()
// ======================================================

/*
Comprueba si una cadena termina con un texto.
*/

console.log("JavaScript".endsWith("Script"));
// true

console.log("JavaScript".endsWith("Java"));
// false


// ======================================================
// Obtener subcadenas
// ======================================================

/*
JavaScript dispone de tres métodos principales.

1. slice()
2. substring()
3. substr() (obsoleto)
*/


// ======================================================
// slice()
// ======================================================

/*
slice(inicio, fin)

Obtiene los caracteres desde "inicio"
hasta "fin" (sin incluirlo).
*/

let palabra2 = "stringify";

console.log(palabra2.slice(0, 5));
// strin

console.log(palabra2.slice(0, 1));
// s


/*
Si no indicamos el final,
continúa hasta terminar la cadena.
*/

console.log(palabra2.slice(2));
// ringify


/*
Acepta índices negativos.

Se cuentan desde el final.
*/

console.log(palabra2.slice(-4));
// gify

console.log(palabra2.slice(-4, -1));
// gif


// ======================================================
// substring()
// ======================================================

/*
substring(inicio, fin)

Es parecido a slice(),
pero presenta dos diferencias importantes.
*/

console.log(palabra2.substring(2, 6));
// ring


/*
Si inicio es mayor que fin,
los intercambia automáticamente.
*/

console.log(palabra2.substring(6, 2));
// ring


/*
Con slice() eso no ocurre.
*/

console.log(palabra2.slice(6, 2));
// ""


/*
Los índices negativos se convierten en 0.
*/

console.log(palabra2.substring(-4, 3));
// str


// ======================================================
// substr()
// ======================================================

/*
substr(inicio, cantidad)

Obtiene una cantidad determinada
de caracteres.

Actualmente se considera obsoleto.
*/

console.log(palabra2.substr(2, 4));
// ring

console.log(palabra2.substr(-4, 2));
// gi


/*
Aunque todavía funciona en la mayoría
de navegadores, no se recomienda
utilizarlo en código nuevo.
*/


// ======================================================
// Comparación rápida
// ======================================================

/*

slice(inicio, fin)

- Usa posición inicial y final.
- Permite índices negativos.
- Es el método recomendado.



substring(inicio, fin)

- Intercambia los parámetros si están invertidos.
- No admite índices negativos.



substr(inicio, cantidad)

- Usa cantidad de caracteres.
- Está obsoleto.
*/


// ======================================================
// ¿Qué método usar?
// ======================================================

/*
En código moderno:

- Usa slice().

Es:

- Más flexible.
- Permite índices negativos.
- Está completamente soportado.
- Es el método recomendado.
*/

// ======================================================
// Comparación de cadenas (Strings)
// ======================================================

// Cuando comparamos dos strings con los operadores >, <, >= o <=,
// JavaScript los compara carácter por carácter utilizando sus
// códigos Unicode (UTF-16), NO según las reglas del idioma.
//
// El proceso es:
//
// 1. Compara el primer carácter de cada cadena.
// 2. Si son iguales, continúa con el siguiente.
// 3. Cuando encuentra una diferencia, gana el carácter cuyo código
//    Unicode sea mayor.
// 4. Si una cadena termina antes y todo lo anterior era igual,
//    la cadena más corta es considerada menor.

// ======================================================
// Comparación básica
// ======================================================

console.log("Apple" < "Banana"); // true
console.log("Cat" > "Car");      // true
console.log("abc" > "ab");       // true (la cadena más larga continúa con "c")

// ======================================================
// Mayúsculas y minúsculas
// ======================================================

// En Unicode, las letras mayúsculas tienen códigos menores
// que las minúsculas.

console.log("A".codePointAt(0)); // 65
console.log("a".codePointAt(0)); // 97

console.log("a" > "Z"); // true

// Esto ocurre porque:
// "a" = 97
// "Z" = 90

// ======================================================
// Caracteres acentuados y especiales
// ======================================================

// Letras como Á, É, Ñ, Ö, Ü, etc.
// poseen códigos diferentes y normalmente
// aparecen después de muchas letras del alfabeto inglés.

console.log("Österreich" > "Zealand"); // true

// Para un humano esto parece incorrecto,
// pero para JavaScript solo importa el código Unicode.

// ======================================================
// Obtener el código Unicode de un carácter
// ======================================================

console.log("Z".codePointAt(0)); // 90
console.log("z".codePointAt(0)); // 122

// También puede mostrarse en hexadecimal.

console.log("z".codePointAt(0).toString(16)); // "7a"

// ======================================================
// Crear caracteres desde un código Unicode
// ======================================================

console.log(String.fromCodePoint(90));   // Z
console.log(String.fromCodePoint(0x5A)); // Z

// ======================================================
// Ver el orden Unicode
// ======================================================

// Podemos generar una lista de caracteres para observar
// cómo están ordenados internamente.

let caracteres = "";

for (let i = 65; i <= 220; i++) {
    caracteres += String.fromCodePoint(i);
}

console.log(caracteres);

// Observaremos algo parecido a:
//
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
// [\]^_`
// abcdefghijklmnopqrstuvwxyz
// {|}~
// ...
// ÀÁÂÃÄÅÆ...
//
// Primero aparecen las mayúsculas,
// luego símbolos,
// después las minúsculas,
// y finalmente muchos caracteres acentuados.

// ======================================================
// Comparaciones usando Unicode
// ======================================================

console.log("A" < "B"); // true
console.log("A" < "a"); // true
console.log("Z" < "a"); // true

// Todo depende únicamente del código Unicode.

// ======================================================
// El problema de este tipo de comparación
// ======================================================

// El orden Unicode NO coincide con el orden alfabético
// que esperan los usuarios de cada idioma.

let paises = [
  "Zealand",
  "Österreich",
  "España",
  "Chile"
];

console.log(paises.sort());

// El resultado puede parecer extraño porque sort()
// utiliza la comparación Unicode por defecto.

// ======================================================
// localeCompare()
// ======================================================

// Para comparar textos siguiendo las reglas de un idioma
// debemos utilizar localeCompare().

console.log("Österreich".localeCompare("Zealand"));
// Número negativo → Österreich va antes

console.log("Banana".localeCompare("Apple"));
// Número positivo → Banana va después

console.log("Hola".localeCompare("Hola"));
// 0 → Son equivalentes

// Resultado:
//
// negativo -> el primer string es menor
// positivo -> el primer string es mayor
// cero     -> ambos son iguales

// ======================================================
// localeCompare() en un ordenamiento
// ======================================================

let ciudades = [
    "Ávila",
    "Alicante",
    "Zaragoza",
    "Écija"
];

ciudades.sort((a, b) => a.localeCompare(b));

console.log(ciudades);

// localeCompare() utiliza las reglas del idioma,
// por lo que el resultado suele ser mucho más natural.

// ======================================================
// Resumen
// ======================================================

// Comparación normal (>, <, ==)
// - Se basa únicamente en Unicode.
// - Es rápida.
// - No sigue las reglas del idioma.
//
// localeCompare()
// - Respeta el orden alfabético del idioma.
// - Ideal para ordenar nombres, ciudades, personas, etc.
//
// Métodos importantes:
//
// str.codePointAt(pos)
// - Devuelve el código Unicode del carácter.
//
// String.fromCodePoint(code)
// - Crea un carácter a partir de su código.
//
// str.localeCompare(otroString)
// - Compara dos cadenas siguiendo las reglas del idioma.
//
// Recomendación:
//
// - Usa >, < o == para comparaciones simples.
//
// - Usa localeCompare() cuando trabajes con texto
//   que verá un usuario (listas de nombres,
//   países, ciudades, productos, etc.).
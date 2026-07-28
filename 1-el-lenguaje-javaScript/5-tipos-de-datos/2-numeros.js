// ======================================================
// Números
// ======================================================

// En JavaScript existen dos tipos de números:
//
// 1. Number
//    - Números de coma flotante de doble precisión (IEEE-754).
//    - Es el tipo que se utiliza casi siempre.
//
// 2. BigInt
//    - Permite representar enteros extremadamente grandes.
//    - Se utiliza solo en casos específicos.


// ======================================================
// Formas de escribir números grandes
// ======================================================

// Forma tradicional.

let billion = 1000000000;

// Separador numérico (_).
// Solo mejora la legibilidad.

let billion2 = 1_000_000_000;


// ======================================================
// Notación científica (e)
// ======================================================

// La letra "e" representa:
//
// número × 10^n

let billion3 = 1e9;

alert(7.3e9); // 7300000000

// Equivalencias.

1e3;      // 1000
1.23e6;   // 1230000


// ======================================================
// Números pequeños
// ======================================================

// Un exponente negativo divide por potencias de 10.

let microsecond = 1e-6;

// Equivalencias.

1e-3;      // 0.001
1.23e-6;   // 0.00000123
1234e-2;   // 12.34


// ======================================================
// Sistemas numéricos
// ======================================================

// Hexadecimal (base 16).

let hex = 0xff;

alert(hex); // 255


// Binario (base 2).

let binary = 0b11111111;


// Octal (base 8).

let octal = 0o377;


// Todos representan el mismo número.

alert(binary == octal); // true


// ======================================================
// toString(base)
// ======================================================

// Convierte un número en una cadena utilizando
// la base indicada.

let num = 255;

alert(num.toString(10)); // "255"
alert(num.toString(16)); // "ff"
alert(num.toString(2));  // "11111111"


// ======================================================
// Bases permitidas
// ======================================================

// La base puede ir de 2 a 36.
//
// Bases más comunes:
//
// 2  -> Binario
// 10 -> Decimal (por defecto)
// 16 -> Hexadecimal
// 36 -> Usa números y letras (0-9, A-Z)


// ======================================================
// Base 36
// ======================================================

// Se utiliza para obtener representaciones
// más cortas de un número.

alert(123456..toString(36)); // "2n9c"


// ======================================================
// Llamar métodos sobre números
// ======================================================

// Para llamar un método directamente sobre
// un número entero existen dos opciones.

123456..toString(36);

(123456).toString(36);

// El primer punto pertenece al número.
// El segundo punto indica el acceso al método.
//
// Con un solo punto:
//
// 123456.toString()
//
// JavaScript interpretaría el punto como el inicio
// de la parte decimal y produciría un error.

// ======================================================
// Redondeo
// ======================================================

// Una de las operaciones más comunes al trabajar con números
// es el redondeo. JavaScript proporciona varios métodos
// integrados para ello.

// ======================================================
// Math.floor()
// ======================================================

// Redondea SIEMPRE hacia abajo.

alert(Math.floor(3.1));   // 3
alert(Math.floor(3.9));   // 3

alert(Math.floor(-1.1));  // -2
alert(Math.floor(-1.9));  // -2

// ======================================================
// Math.ceil()
// ======================================================

// Redondea SIEMPRE hacia arriba.

alert(Math.ceil(3.1));   // 4
alert(Math.ceil(3.9));   // 4

alert(Math.ceil(-1.1));  // -1
alert(Math.ceil(-1.9));  // -1

// ======================================================
// Math.round()
// ======================================================

// Redondea al entero más cercano.
//
// Si la parte decimal es:
// - menor que .5 -> baja
// - mayor o igual que .5 -> sube

alert(Math.round(3.1)); // 3
alert(Math.round(3.5)); // 4
alert(Math.round(3.6)); // 4

alert(Math.round(-1.1)); // -1
alert(Math.round(-1.5)); // -1
alert(Math.round(-1.6)); // -2

// ======================================================
// Math.trunc()
// ======================================================

// Elimina la parte decimal.
// No realiza ningún redondeo.

alert(Math.trunc(3.9));   // 3
alert(Math.trunc(3.1));   // 3

alert(Math.trunc(-1.9));  // -1
alert(Math.trunc(-1.1));  // -1

// ======================================================
// Resumen
// ======================================================

/*

Valor      floor   ceil   round   trunc
----------------------------------------
3.1          3      4       3       3
3.5          3      4       4       3
3.6          3      4       4       3

-1.1        -2     -1      -1      -1
-1.5        -2     -1      -1      -1
-1.6        -2     -1      -2      -1

*/

// ======================================================
// Redondear a un número específico de decimales
// ======================================================

// Muchas veces no queremos un entero, sino un número
// con cierta cantidad de decimales.
//
// Por ejemplo:
//
// 1.23456 -> 1.23

// ------------------------------------------------------
// Método 1: Multiplicar y dividir
// ------------------------------------------------------

// Multiplicamos por una potencia de 10,
// redondeamos y luego dividimos nuevamente.

let num = 1.23456;

let result = Math.round(num * 100) / 100;

alert(result); // 1.23

// Paso a paso:
//
// 1.23456
// ↓ *100
// 123.456
// ↓ Math.round()
// 123
// ↓ /100
// 1.23

// Si queremos 3 decimales:

alert(Math.round(num * 1000) / 1000); // 1.235

// ======================================================
// Método toFixed()
// ======================================================

// toFixed(n) redondea a n decimales.
//
// IMPORTANTE:
// Devuelve un STRING, no un number.

let price = 12.34;

alert(price.toFixed(1)); // "12.3"

let value = 12.36;

alert(value.toFixed(1)); // "12.4"

// Si faltan decimales, agrega ceros.

alert(price.toFixed(5)); // "12.34000"

// ======================================================
// Convertir nuevamente a Number
// ======================================================

let rounded = +price.toFixed(2);

alert(rounded); // 12.34

alert(typeof rounded); // number

// También puede hacerse así:

Number(price.toFixed(2));

// ======================================================
// Precisión de los números
// ======================================================

// Todos los números JavaScript (number)
// utilizan el estándar IEEE-754 de 64 bits.
//
// Eso significa que:
//
// - 52 bits almacenan la precisión.
// - 11 bits almacenan el exponente.
// - 1 bit almacena el signo.
//
// Debido a ello algunos números NO pueden
// representarse exactamente.

// ======================================================
// Infinity
// ======================================================

// Si el número es demasiado grande,
// el resultado será Infinity.

alert(1e500); // Infinity

// ======================================================
// El famoso problema:
// 0.1 + 0.2
// ======================================================

alert(0.1 + 0.2); // 0.30000000000000004

alert(0.1 + 0.2 == 0.3); // false

// ======================================================
// ¿Por qué ocurre?
// ======================================================

// Porque los números se almacenan en binario.
//
// Algunas fracciones decimales,
// como 0.1 o 0.2,
// producen infinitos decimales binarios,
// exactamente igual que:
//
// 1 / 3 = 0.333333333...

// Representación binaria:

alert(0.1.toString(2));
alert(0.2.toString(2));
alert((0.1 + 0.2).toString(2));

// El motor debe aproximar esos valores,
// y esa pequeña aproximación produce errores
// de precisión cuando se realizan operaciones.

// Podemos verlo claramente aquí:

alert(0.1.toFixed(20));

// 0.10000000000000000555

// ======================================================
// Este problema no es exclusivo de JavaScript
// ======================================================

// También ocurre en:
//
// - Java
// - C
// - C++
// - C#
// - PHP
// - Python
// - Ruby
//
// Todos utilizan (o pueden utilizar)
// el mismo estándar IEEE-754.

// ======================================================
// ¿Cómo evitar estos errores?
// ======================================================

// ------------------------------------------------------
// Opción 1 (la más común):
// usar toFixed()
// ------------------------------------------------------

let sum = 0.1 + 0.2;

alert(sum.toFixed(2)); // "0.30"

// Si necesitamos un número:

alert(+sum.toFixed(2)); // 0.3

// ------------------------------------------------------
// Opción 2:
// trabajar temporalmente con enteros
// ------------------------------------------------------

alert((0.1 * 10 + 0.2 * 10) / 10); // 0.3

// Este enfoque reduce muchos errores,
// pero NO los elimina completamente.

alert((0.28 * 100 + 0.14 * 100) / 100);

// 0.4200000000000001

// ======================================================
// En aplicaciones reales
// ======================================================

// Cuando se trabaja con dinero,
// normalmente:
//
// - se almacenan centavos en lugar de dólares,
// - o se redondea el resultado antes de mostrarlo.
//
// Aun así, no siempre es posible evitar
// completamente los números decimales.

// ======================================================
// Pérdida de precisión con enteros grandes
// ======================================================

// number solo puede representar enteros
// con precisión hasta:
//
// Number.MAX_SAFE_INTEGER
//
// (2^53 - 1)

alert(9999999999999999);

// 10000000000000000

// El último dígito se pierde debido
// al límite de precisión.

// ======================================================
// Dos ceros
// ======================================================

// Internamente JavaScript distingue:
//
// 0
// -0

alert(0 === -0); // true

// En la mayoría de los casos ambos
// se comportan exactamente igual.
//
// La diferencia solo aparece en algunos
// casos muy específicos del lenguaje.

// ======================================================
// Tests: isFinite e isNaN
// ======================================================

/*
En JavaScript existen dos valores numéricos especiales:

1. Infinity (y -Infinity)
    Representa un valor mayor (o menor) que cualquier otro número.

2. NaN (Not a Number)
    Representa un resultado numérico inválido o un error matemático.

Aunque ambos pertenecen al tipo `number`, no son números normales.
Por ello JavaScript incluye funciones especiales para identificarlos.
*/

// ======================================================
// isNaN()
// ======================================================

/*
isNaN(valor)

1. Convierte automáticamente el argumento a número.
2. Comprueba si el resultado es NaN.
3. Devuelve true si lo es.
*/

console.log(isNaN(NaN));      // true
console.log(isNaN("Hola"));   // true ("Hola" -> NaN)
console.log(isNaN("123"));    // false ("123" -> 123)

/*
¿Por qué no comparar directamente con NaN?

Porque NaN es el único valor en JavaScript que NO es igual ni siquiera a sí mismo.
*/

console.log(NaN === NaN); // false

/*
Por eso siempre debemos usar isNaN() o Number.isNaN().
*/


// ======================================================
// isFinite()
// ======================================================

/*
isFinite(valor)

1. Convierte el argumento a número.
2. Comprueba que sea un número finito.

Devuelve false si el resultado es:
- NaN
- Infinity
- -Infinity
*/

console.log(isFinite("15"));        // true
console.log(isFinite("Hola"));      // false
console.log(isFinite(Infinity));    // false
console.log(isFinite(-Infinity));   // false

/*
Es muy útil para validar si un dato ingresado por el usuario
representa un número válido.
*/

let numero = +"25";

console.log(isFinite(numero)); // true

/*
Importante:

Un string vacío o compuesto solo por espacios se convierte en 0.
*/

console.log(isFinite(""));      // true
console.log(isFinite("   "));   // true


// ======================================================
// Number.isNaN()
// ======================================================

/*
Number.isNaN() es una versión más estricta.

NO convierte el argumento.

Primero comprueba que realmente sea un number.
Luego verifica si ese número es NaN.
*/

console.log(Number.isNaN(NaN));        // true
console.log(Number.isNaN("Hola"/2));   // true

/*
Diferencia importante:
*/

console.log(Number.isNaN("Hola")); // false
console.log(isNaN("Hola"));        // true

/*
¿Por qué?

Number.isNaN():
- "Hola" sigue siendo string.

isNaN():
- convierte "Hola" a NaN.
*/


// ======================================================
// Number.isFinite()
// ======================================================

/*
También es la versión estricta de isFinite().

No convierte el argumento.
*/

console.log(Number.isFinite(123));      // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(2 / 0));    // false

/*
Diferencia:
*/

console.log(Number.isFinite("123")); // false
console.log(isFinite("123"));        // true


// ======================================================
// Object.is()
// ======================================================

/*
Object.is() compara valores de forma muy parecida a ===,
pero maneja correctamente dos casos especiales.
*/

// Caso 1: NaN

console.log(NaN === NaN);          // false
console.log(Object.is(NaN, NaN));  // true

// Caso 2: 0 y -0

console.log(0 === -0);             // true
console.log(Object.is(0, -0));     // false

/*
En cualquier otro caso se comporta prácticamente igual que ===.
*/

console.log(Object.is(10, 10));      // true
console.log(Object.is("JS", "JS"));  // true


// ======================================================
// parseInt()
// ======================================================

/*
La conversión mediante Number() o + es estricta.

Si toda la cadena no representa un número,
la conversión falla.
*/

console.log(Number("100px")); // NaN

/*
parseInt() es más flexible.

Lee caracteres hasta que deja de encontrar dígitos.
*/

console.log(parseInt("100px")); // 100
console.log(parseInt("250kg")); // 250
console.log(parseInt("12.8"));  // 12

/*
Si el primer carácter no es válido,
devuelve NaN.
*/

console.log(parseInt("abc123")); // NaN


// ======================================================
// parseFloat()
// ======================================================

/*
Hace lo mismo que parseInt(),
pero permite conservar la parte decimal.
*/

console.log(parseFloat("12.5em"));  // 12.5
console.log(parseFloat("99.99$"));  // 99.99

/*
Se detiene cuando encuentra un carácter inválido.
*/

console.log(parseFloat("12.3.4")); // 12.3


// ======================================================
// Base numérica en parseInt()
// ======================================================

/*
parseInt() acepta un segundo parámetro:

parseInt(texto, base)

Permite interpretar números escritos en otros sistemas.
*/

// Hexadecimal

console.log(parseInt("ff", 16));     // 255
console.log(parseInt("0xff", 16));   // 255

// Binario

console.log(parseInt("1010", 2));    // 10

// Octal

console.log(parseInt("77", 8));      // 63

// Base 36

console.log(parseInt("2n9c", 36));   // 123456


// ======================================================
// Objeto Math
// ======================================================

/*
Math contiene funciones matemáticas ya incorporadas.
*/


// ======================================================
// Math.random()
// ======================================================

/*
Genera un número aleatorio entre 0 (incluido)
y 1 (sin incluir).
*/

console.log(Math.random());
console.log(Math.random());
console.log(Math.random());


// ======================================================
// Math.max()
// ======================================================

/*
Devuelve el número más grande.
*/

console.log(Math.max(3, 5, -2, 10)); // 10


// ======================================================
// Math.min()
// ======================================================

/*
Devuelve el número más pequeño.
*/

console.log(Math.min(3, 5, -2, 10)); // -2


// ======================================================
// Math.pow()
// ======================================================

/*
Calcula una potencia.

Math.pow(base, exponente)
*/

console.log(Math.pow(2, 10)); // 1024
console.log(Math.pow(5, 3));  // 125

/*
Actualmente suele preferirse el operador **.
*/

console.log(2 ** 10); // 1024


// ======================================================
// RESUMEN
// ======================================================

/*
✔ isNaN()
    Convierte el valor y verifica si termina siendo NaN.

✔ Number.isNaN()
    No convierte. Solo devuelve true si el valor ya es NaN.

✔ isFinite()
    Convierte el valor y comprueba que sea un número finito.

✔ Number.isFinite()
    No convierte el argumento.

✔ Object.is()
    Similar a ===, pero:
    - NaN es igual a NaN.
    - Distingue entre 0 y -0.

- parseInt()
    Lee la parte entera de un string.

- parseFloat()
    Lee números con decimales.

- parseInt(texto, base)
    Permite convertir desde bases entre 2 y 36.

- Math.random()
    Número aleatorio entre 0 y 1.

- Math.max()
    Devuelve el mayor valor.

- Math.min()
    Devuelve el menor valor.

- Math.pow()
   Calcula potencias (actualmente suele usarse **).
*/
// ======================================================
// Arrays (Matrices)
// ======================================================

/*
- ¿Qué es un Array?
-------------------------------------------------------
Un Array es un tipo especial de objeto diseñado para
almacenar colecciones ordenadas de datos.

A diferencia de los objetos, cada elemento tiene una
posición (índice) numérica que comienza en 0.

Los arrays son ideales para listas de usuarios,
productos, tareas, elementos HTML, etc.
*/

/*
- Crear un array
-------------------------------------------------------
Existen dos formas de crear un array, aunque la más
utilizada es la sintaxis con corchetes [].
*/

let arr1 = [];
let arr2 = new Array();

let frutas = ["Manzana", "Naranja", "Pera"];

/*
- Acceder y modificar elementos
-------------------------------------------------------
Cada elemento tiene un índice numérico que comienza
en 0.
*/

console.log(frutas[0]); // Manzana
console.log(frutas[1]); // Naranja

frutas[2] = "Limón";      // Reemplazar elemento
frutas[3] = "Sandía";     // Agregar elemento

console.log(frutas);

/*
- Propiedad length
-------------------------------------------------------
Devuelve la cantidad de elementos del array.
*/

console.log(frutas.length);

/*
- Un array puede contener cualquier tipo de dato.
*/

let datos = [
    "Hola",
    25,
    true,
    { nombre: "Juan" },
    () => console.log("Hola")
];

console.log(datos[3].nombre);

datos[4]();

/*
- Coma final
-------------------------------------------------------
Es recomendable dejar una coma al final porque facilita
agregar o eliminar elementos.
*/

let colores = [
    "Rojo",
    "Verde",
    "Azul",
];

/*
=======================================================
Obtener el último elemento
=======================================================
*/

/*
Forma tradicional
*/

console.log(frutas[frutas.length - 1]);

/*
Forma moderna: at()

Permite usar índices negativos.
*/

console.log(frutas.at(-1)); // último
console.log(frutas.at(-2)); // penúltimo

/*
Equivalencias:

arr.at(0)  === arr[0]
arr.at(1)  === arr[1]
arr.at(-1) => último elemento
*/

/*
=======================================================
Arrays como pilas y colas
=======================================================

Los arrays permiten trabajar como:

- Pila (Stack - LIFO)
Último en entrar, primero en salir.

push()
pop()

- Cola (Queue - FIFO)
Primero en entrar, primero en salir.

push()
shift()
*/

/*
=======================================================
push() y pop()
=======================================================
*/

/*
push()
Agrega elementos al final.
*/

let numeros = [1, 2];

numeros.push(3);
numeros.push(4, 5);

console.log(numeros);

/*
pop()
Elimina el último elemento y lo devuelve.
*/

console.log(numeros.pop());

console.log(numeros);

/*
=======================================================
shift() y unshift()
=======================================================
*/

/*
shift()

Elimina el primer elemento.
*/

let frutas2 = ["Manzana", "Naranja", "Pera"];

console.log(frutas2.shift());

console.log(frutas2);

/*
unshift()

Agrega elementos al principio.
*/

frutas2.unshift("Limón");

console.log(frutas2);

frutas2.unshift("Kiwi", "Uva");

console.log(frutas2);

/*
=======================================================
Internamente un Array es un objeto
=======================================================

Los arrays son objetos especiales.

Por eso:
*/

let a = ["Banana"];

let b = a;

b.push("Pera");

console.log(a); // Banana, Pera

/*
Ambas variables apuntan al mismo array.
*/

/*
Aunque técnicamente un array es un objeto,
NO debe usarse como uno.

Evita hacer cosas como:
*/

let ejemplo = [];

ejemplo.edad = 25;
ejemplo[100] = "Hola";

/*
Esto desactiva optimizaciones internas del motor
y hace que el array sea menos eficiente.

Usa objetos {} para claves con nombre y arrays []
solo para datos ordenados.
*/

/*
=======================================================
Rendimiento
=======================================================

- Muy rápidos

push()
pop()

Porque trabajan al final del array.

- Más lentos

shift()
unshift()

Porque deben mover todos los elementos y actualizar
sus índices.
*/

/*
=======================================================
Recorrer arrays
=======================================================
*/

/*
for clásico
Permite acceder al índice.
*/

let letras = ["A", "B", "C"];

for (let i = 0; i < letras.length; i++) {
    console.log(i, letras[i]);
}

/*
for...of

Recorre directamente los valores.
Es la forma más utilizada.
*/

for (let letra of letras) {
    console.log(letra);
}

/*
for...in

NO se recomienda para arrays.

Recorre todas las propiedades del objeto,
es más lento y puede producir resultados
inesperados.
*/

/*
=======================================================
La propiedad length
=======================================================

length siempre vale:

índice más alto + 1
*/

let numeros2 = [];

numeros2[5] = 10;

console.log(numeros2.length); // 6

/*
Modificar length
*/

let valores = [1, 2, 3, 4, 5];

valores.length = 2;

console.log(valores); // [1,2]

/*
Vaciar un array
*/

valores.length = 0;

console.log(valores);

/*
=======================================================
new Array()
=======================================================

Generalmente se evita usar porque puede causar
confusión.
*/

let x = new Array(2);

console.log(x.length); // 2
console.log(x[0]);     // undefined

/*
No crea:

[2]

Sino un array vacío de longitud 2.
*/

/*
=======================================================
Arrays multidimensionales
=======================================================

Un array multidimensional es simplemente un array
que contiene otros arrays como elementos.

Es muy útil para representar datos organizados en
filas y columnas, como una tabla, un tablero de ajedrez,
una hoja de cálculo o una matriz matemática.

Para acceder a un elemento se utilizan dos índices:

matriz[fila][columna]

Primer índice  -> selecciona la fila.
Segundo índice -> selecciona la columna.

*/

let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matriz[0][0]); // 1
console.log(matriz[0][2]); // 3

console.log(matriz[1][0]); // 4
console.log(matriz[1][2]); // 6

console.log(matriz[2][1]); // 8


/*
=======================================================
Conversión a String
=======================================================

Los arrays implementan toString().

Los elementos se unen mediante comas.
*/

let lista = [1, 2, 3];

console.log(String(lista));

console.log([] + 1);     // "1"
console.log([1] + 1);    // "11"
console.log([1,2] + 1);  // "1,21"

/*
=======================================================
Comparación de arrays
=======================================================

Los arrays NO se comparan por contenido,
sino por referencia.
*/

console.log([] == []);     // false
console.log([1] == [1]);   // false

let c = [1, 2];

let d = c;

console.log(c == d); // true

/*
Si quieres comparar dos arrays,
compara sus elementos uno por uno.
*/

/*
=======================================================
Resumen
=======================================================

- Un Array almacena datos ordenados.

- Los índices comienzan en 0.

- Puede almacenar cualquier tipo de dato.

- at(-1) obtiene fácilmente el último elemento.

- push() y pop() trabajan sobre el final del array (muy rápidos).

- shift() y unshift() trabajan sobre el inicio (más lentos).

- length indica el índice más alto + 1.

- Puedes vaciar un array haciendo: arr.length = 0;

- Usa for...of para recorrer elementos.

- No uses for...in con arrays.

- No agregues propiedades como: arr.nombre = "Juan"

- No compares arrays con == o === esperando comparar su contenido; solo comparan referencias.

*/
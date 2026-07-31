"use strict";

// ============================================================================
// MÉTODOS DE ARRAYS
// ============================================================================
//
// Los arrays (también llamados arreglos o matrices) poseen numerosos métodos
// que facilitan trabajar con sus elementos.
//
// En este archivo los métodos están agrupados según su propósito.
//
// ----------------------------------------------------------------------------
// Agregar y remover elementos
// ----------------------------------------------------------------------------
//
// Ya conocemos los métodos básicos:
//
// arr.push(...items)      -> Agrega uno o más elementos al final.
// arr.pop()               -> Elimina y devuelve el último elemento.
// arr.shift()             -> Elimina y devuelve el primer elemento.
// arr.unshift(...items)   -> Agrega uno o más elementos al inicio.
//
// A continuación veremos métodos más avanzados.

// ============================================================================
// splice()
// ============================================================================
//
// El método splice() es uno de los métodos más importantes de los arrays.
//
// Se utiliza para:
//
// - Eliminar elementos.
// - Insertar elementos.
// - Reemplazar elementos.
//
// IMPORTANTE:
// - Modifica el array original.
// - Devuelve un array con los elementos eliminados.
//
// Sintaxis:
//
// arr.splice(inicio, cantidadAEliminar, elemento1, elemento2, ...);
//
// Parámetros:
//
// inicio
//     Índice desde donde comenzará la operación.
//
// cantidadAEliminar
//     Cantidad de elementos que serán eliminados.
//
// elemento1, elemento2...
//     Elementos que serán insertados en esa posición.
//
// ============================================================================
// ¿Por qué no usar delete?
// ============================================================================
//
// delete elimina el valor, PERO NO modifica el tamaño del array.

let arr = ["voy", "a", "casa"];

delete arr[1];

console.log(arr);
// ["voy", empty, "casa"]

console.log(arr.length);
// 3
//
// El espacio queda vacío.
//
// En la mayoría de los casos esto NO es lo que queremos.
//
// Para eliminar correctamente elementos de un array se utiliza splice().

// ============================================================================
// Eliminar elementos
// ============================================================================

arr = ["Yo", "estudio", "JavaScript"];

arr.splice(1, 1);

console.log(arr);
// ["Yo", "JavaScript"]

//
// Desde el índice 1 elimina 1 elemento.
//

// ============================================================================
// Reemplazar elementos
// ============================================================================

arr = ["Yo", "estudio", "JavaScript", "ahora", "mismo"];

arr.splice(0, 3, "a", "bailar");

console.log(arr);

// [
//   "a",
//   "bailar",
//   "ahora",
//   "mismo"
// ]

//
// Elimina:
//
// "Yo"
// "estudio"
// "JavaScript"
//
// Luego inserta:
//
// "a"
// "bailar"

// ============================================================================
// Obtener los elementos eliminados
// ============================================================================

arr = ["Yo", "estudio", "JavaScript", "ahora", "mismo"];

let eliminados = arr.splice(0, 2);

console.log(eliminados);

// ["Yo", "estudio"]

//
// splice() devuelve un nuevo array con los elementos eliminados.
//

// ============================================================================
// Insertar sin eliminar
// ============================================================================

arr = ["Yo", "estudio", "JavaScript"];

arr.splice(2, 0, "el", "complejo", "lenguaje");

console.log(arr);

// [
//   "Yo",
//   "estudio",
//   "el",
//   "complejo",
//   "lenguaje",
//   "JavaScript"
// ]

//
// Si cantidadAEliminar = 0
// splice() solamente inserta elementos.
//

// ============================================================================
// Índices negativos
// ============================================================================
//
// splice() acepta índices negativos.
//
// Un índice negativo comienza a contar desde el final.
//
// -1 -> último elemento
// -2 -> penúltimo
// -3 -> antepenúltimo
//

arr = [1, 2, 5];

arr.splice(-1, 0, 3, 4);

console.log(arr);

// [1,2,3,4,5]

// ============================================================================
// RESUMEN splice()
// ============================================================================
//
// - Modifica el array original.
// - Puede eliminar.
// - Puede insertar.
// - Puede reemplazar.
// - Devuelve los elementos eliminados.
// - Acepta índices negativos.

// ============================================================================
// slice()
// ============================================================================
//
// slice() crea una COPIA parcial del array.
//
// A diferencia de splice():
//
// - NO modifica el array original.
//
// Sintaxis:
//
// arr.slice(inicio, fin);
//
// Devuelve los elementos desde "inicio"
// hasta "fin" (sin incluir "fin").
//

arr = ["t", "e", "s", "t"];

console.log(arr.slice(1, 3));

// ["e","s"]

console.log(arr.slice(-2));

// ["s","t"]

// ============================================================================
// Copiar un array completo
// ============================================================================

arr = [1, 2, 3];

let copia = arr.slice();

console.log(copia);

// [1,2,3]

//
// Muy utilizado para crear copias independientes.
//

// ============================================================================
// RESUMEN slice()
// ============================================================================
//
// - NO modifica el array.
// - Devuelve un nuevo array.
// - Permite copiar una parte.
// - slice() sin argumentos copia todo el array.

// ============================================================================
// concat()
// ============================================================================
//
// concat() crea un NUEVO array uniendo otros arrays o valores.
//
// NO modifica el original.
//
// Sintaxis:
//
// arr.concat(valor1, valor2, ...)
//

arr = [1, 2];

console.log(arr.concat([3, 4]));

// [1,2,3,4]

console.log(arr.concat([3, 4], [5, 6]));

// [1,2,3,4,5,6]

console.log(arr.concat([3, 4], 5, 6));

// [1,2,3,4,5,6]

// ============================================================================
// Objetos similares a arrays
// ============================================================================

arr = [1, 2];

let arrayLike = {
    0: "algo",
    length: 1
};

console.log(arr.concat(arrayLike));

// [1,2,{...}]

//
// concat() NO expande objetos similares a arrays.
//

// ============================================================================
// Symbol.isConcatSpreadable
// ============================================================================
//
// Si el objeto posee esta propiedad,
// concat() lo tratará como un array.
//

arrayLike = {
    0: "algo",
    1: "más",
    length: 2,
    [Symbol.isConcatSpreadable]: true
};

console.log(arr.concat(arrayLike));

// [1,2,"algo","más"]

// ============================================================================
// RESUMEN concat()
// ============================================================================
//
// - NO modifica el array.
// - Devuelve uno nuevo.
// - Une arrays.
// - También acepta valores individuales.

// ============================================================================
// forEach()
// ============================================================================
//
// Ejecuta una función por cada elemento.
//
// NO devuelve un nuevo array.
//
// Sintaxis:
//
// arr.forEach((elemento, indice, array) => {})
//

["Bilbo", "Gandalf", "Nazgul"].forEach(nombre => {
    console.log(nombre);
});

//
// Parámetros:
//
// elemento -> valor actual.
// indice   -> posición.
// array    -> array completo.
//

["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
    console.log(`${item} está en la posición ${index}`);
});

//
// El valor retornado por la función se ignora.
//

// ============================================================================
// Buscar elementos
// ============================================================================
//
// JavaScript ofrece varios métodos para buscar elementos.
//
// indexOf()
// lastIndexOf()
// includes()
// find()
// findIndex()
// findLastIndex()
// filter()

// ============================================================================
// indexOf()
// ============================================================================
//
// Busca un elemento.
//
// Devuelve:
//
// - índice encontrado
// - -1 si no existe
//

arr = [1, 0, false];

console.log(arr.indexOf(0));
// 1

console.log(arr.indexOf(false));
// 2

console.log(arr.indexOf(null));
// -1

// ============================================================================
// includes()
// ============================================================================
//
// Devuelve:
//
// true
// false
//
// Ideal cuando solo queremos saber si existe.
//

console.log(arr.includes(1));

// true

//
// Usa comparación estricta (===).
//

// ============================================================================
// lastIndexOf()
// ============================================================================
//
// Igual que indexOf()
// pero busca desde el final.
//

let frutas = ["Manzana", "Naranja", "Manzana"];

console.log(frutas.indexOf("Manzana"));
// 0

console.log(frutas.lastIndexOf("Manzana"));
// 2

// ============================================================================
// includes() y NaN
// ============================================================================

const numeros = [NaN];

console.log(numeros.indexOf(NaN));

// -1

console.log(numeros.includes(NaN));

// true

//
// includes() reconoce correctamente NaN.
//

// ============================================================================
// find()
// ============================================================================
//
// Se utiliza principalmente con arrays de objetos.
//
// Devuelve:
//
// - El primer elemento encontrado.
// - undefined si no existe.
//

let users = [
    { id: 1, name: "Celina" },
    { id: 2, name: "David" },
    { id: 3, name: "Federico" }
];

let user = users.find(item => item.id === 1);

console.log(user);

// { id:1, name:"Celina" }

// ============================================================================
// findIndex()
// ============================================================================
//
// Igual que find()
// pero devuelve el índice.
//

users = [
    { id: 1, name: "John" },
    { id: 2, name: "Pete" },
    { id: 3, name: "Mary" },
    { id: 4, name: "John" }
];

console.log(users.findIndex(user => user.name === "John"));

// 0

// ============================================================================
// findLastIndex()
// ============================================================================
//
// Igual que findIndex()
// pero busca desde el final.
//

console.log(users.findLastIndex(user => user.name === "John"));

// 3

// ============================================================================
// filter()
// ============================================================================
//
// Similar a find(),
// pero devuelve TODOS los elementos que cumplen la condición.
//
// Devuelve siempre un array.
//
// Si no encuentra ninguno,
// devuelve un array vacío.
//

users = [
    { id: 1, name: "Celina" },
    { id: 2, name: "David" },
    { id: 3, name: "Federico" }
];

let algunosUsuarios = users.filter(user => user.id < 3);

console.log(algunosUsuarios);

// [
//   { id:1, name:"Celina" },
//   { id:2, name:"David" }
// ]

console.log(algunosUsuarios.length);

// 2

// ============================================================================
// DIFERENCIA ENTRE find() Y filter()
//
// find()
// -----------------------
// - Devuelve el PRIMER elemento encontrado.
// - Devuelve un objeto.
// - Devuelve undefined si no existe.
//
// filter()
// -----------------------
// - Devuelve TODOS los elementos encontrados.
// - Siempre devuelve un array.
// - Si no encuentra nada devuelve [].
//
//
// ============================================================================
// TRANSFORMAR Y REORDENAR ARRAYS
// ============================================================================
//
// Los siguientes métodos permiten:
//
// - Transformar elementos.
// - Ordenar arrays.
// - Invertir su contenido.
// - Convertir entre strings y arrays.
// - Reducir un array a un único valor.
//
// Son algunos de los métodos más utilizados en JavaScript.

// ============================================================================
// map()
// ============================================================================
//
// map() recorre el array y crea un NUEVO array con el resultado de aplicar
// una función a cada elemento.
//
// IMPORTANTE:
//
// - NO modifica el array original.
// - Siempre devuelve un nuevo array.
// - La cantidad de elementos del nuevo array es la misma.
//
// Sintaxis:
//
// let nuevoArray = arr.map((elemento, indice, array) => {
//     return nuevoValor;
// });
//

let nombres = ["Bilbo", "Gandalf", "Nazgul"];

let longitudes = nombres.map(nombre => nombre.length);

console.log(longitudes);

// [5, 8, 7]

//
// Cada elemento se transforma en su longitud.
//

// ============================================================================
// Otro ejemplo de map()
// ============================================================================

let numeros = [1, 2, 3, 4];

let cuadrados = numeros.map(numero => numero ** 2);

console.log(cuadrados);

// [1,4,9,16]

console.log(numeros);

// [1,2,3,4]
//
// El array original permanece intacto.
//

// ============================================================================
// RESUMEN map()
// ============================================================================
//
// - Recorre todo el array.
// - Devuelve un nuevo array.
// - NO modifica el original.
// - Ideal para transformar datos.
//

// ============================================================================
// sort()
// ============================================================================
//
// sort() ordena los elementos del array.
//
// IMPORTANTE:
//
// - MODIFICA el array original.
// - También devuelve el array ordenado.
//
// Sintaxis:
//
// arr.sort(funcionComparadora);
//

// ============================================================================
// Ordenamiento por defecto
// ============================================================================

let arr = [1, 2, 15];

arr.sort();

console.log(arr);

// [1,15,2]

//
// ¿Por qué ocurre esto?
//
// Porque sort() convierte todos los elementos en strings
// antes de compararlos.
//
// Comparación:
//
// "1"
// "15"
// "2"
//
// Como "15" comienza con "1",
// queda antes que "2".
//

// ============================================================================
// Función comparadora
// ============================================================================
//
// Podemos indicar cómo comparar dos elementos.
//
// Debe devolver:
//
// Número positivo -> a va después de b
//
// 0 -> son iguales
//
// Número negativo -> a va antes de b
//

function compare(a, b) {

    if (a > b) return 1;

    if (a === b) return 0;

    return -1;
}

arr = [1, 2, 15];

arr.sort(compare);

console.log(arr);

// [1,2,15]

// ============================================================================
// Comparación numérica simplificada
// ============================================================================
//
// No es necesario escribir tantos if.
//
// Basta con devolver:
//
// a - b
//

arr = [1, 2, 15];

arr.sort((a, b) => a - b);

console.log(arr);

// [1,2,15]

//
// Explicación:
//
// a - b > 0  -> a después de b
//
// a - b < 0  -> a antes de b
//
// a - b = 0  -> iguales
//

// ============================================================================
// Orden descendente
// ============================================================================

arr = [1, 2, 15, 4];

arr.sort((a, b) => b - a);

console.log(arr);

// [15,4,2,1]

// ============================================================================
// localeCompare()
// ============================================================================
//
// Para ordenar strings con caracteres especiales
// es preferible utilizar localeCompare().
//
// Ejemplo:
//
// Ö
// Á
// É
// Ñ
//
// El orden será correcto según el idioma.
//

let paises = ["Österreich", "Andorra", "Vietnam"];

paises.sort((a, b) => a.localeCompare(b));

console.log(paises);

// ["Andorra","Österreich","Vietnam"]

// ============================================================================
// RESUMEN sort()
// ============================================================================
//
// - Ordena el array.
// - Modifica el original.
// - El orden por defecto es ALFABÉTICO.
// - Para números usar:
//
// (a, b) => a - b
//
// - Para texto internacional:
//
// localeCompare()

// ============================================================================
// reverse()
// ============================================================================
//
// Invierte el orden de los elementos.
//
// IMPORTANTE:
//
// - Modifica el array.
//

arr = [1, 2, 3, 4, 5];

arr.reverse();

console.log(arr);

// [5,4,3,2,1]

// ============================================================================
// RESUMEN reverse()
// ============================================================================
//
// - Invierte el orden.
// - Modifica el array.
// - Devuelve el mismo array invertido.
//

// ============================================================================
// split()
// ============================================================================
//
// split() pertenece a String,
// no a Array.
//
// Convierte una cadena en un array.
//
// Sintaxis:
//
// string.split(separador, limiteOpcional)
//

let texto = "Bilbo, Gandalf, Nazgul";

let personajes = texto.split(", ");

console.log(personajes);

// ["Bilbo","Gandalf","Nazgul"]

// ============================================================================
// Recorrer el resultado
// ============================================================================

for (const personaje of personajes) {

    console.log(`Hola ${personaje}`);

}

// ============================================================================
// Limitar la cantidad de elementos
// ============================================================================

let lista = "Bilbo, Gandalf, Nazgul, Saruman";

console.log(lista.split(", ", 2));

// ["Bilbo","Gandalf"]

// ============================================================================
// Separar una palabra en letras
// ============================================================================

let palabra = "test";

console.log(palabra.split(""));

// ["t","e","s","t"]

// ============================================================================
// join()
// ============================================================================
//
// Hace exactamente lo contrario de split().
//
// Convierte un array en un string.
//
// Sintaxis:
//
// arr.join(separador)
//

let heroes = ["Bilbo", "Gandalf", "Nazgul"];

let resultado = heroes.join(";");

console.log(resultado);

// Bilbo;Gandalf;Nazgul

// ============================================================================
// RESUMEN split() y join()
// ============================================================================
//
// split()
//
// String -> Array
//
// join()
//
// Array -> String
//

// ============================================================================
// reduce()
// ============================================================================
//
// reduce() recorre el array y lo reduce
// a UN SOLO valor.
//
// Ese valor puede ser:
//
// - Un número.
// - Un string.
// - Un objeto.
// - Otro array.
// - Cualquier tipo.
//
// Sintaxis:
//
// let resultado = arr.reduce(
//      (acumulador, elemento, indice, array) => {
//
//          return nuevoAcumulador;
//
//      },
//      valorInicial
// );
//

// ============================================================================
// Sumar todos los elementos
// ============================================================================

arr = [1, 2, 3, 4, 5];

let suma = arr.reduce(

    (acumulador, actual) => acumulador + actual,

    0

);

console.log(suma);

// 15

//
// Funcionamiento:
//
// Inicio:
//
// acumulador = 0
//
// Iteración:
//
// 0 + 1 = 1
//
// 1 + 2 = 3
//
// 3 + 3 = 6
//
// 6 + 4 = 10
//
// 10 + 5 = 15
//

// ============================================================================
// Sin valor inicial
// ============================================================================

arr = [1, 2, 3, 4, 5];

let total = arr.reduce(

    (acumulador, actual) => acumulador + actual

);

console.log(total);

// 15

//
// Si NO se indica un valor inicial:
//
// acumulador = primer elemento.
//
// La iteración comienza desde el segundo elemento.
//

// ============================================================================
// Problema con arrays vacíos
// ============================================================================

arr = [];

// Esto produce un error:
//
// arr.reduce((a, b) => a + b);

//
// Solución:
//
// Siempre proporcionar un valor inicial.
//

console.log(

    arr.reduce((a, b) => a + b, 0)

);

// 0

// ============================================================================
// Otro ejemplo de reduce()
// ============================================================================

let palabras = ["Hola", "mundo", "JavaScript"];

let frase = palabras.reduce(

    (texto, palabra) => texto + " " + palabra

);

console.log(frase);

// "Hola mundo JavaScript"

// ============================================================================
// reduceRight()
// ============================================================================
//
// Hace exactamente lo mismo que reduce(),
// pero comienza desde el último elemento.
//

let numeros2 = [1, 2, 3];

let derechaAIzquierda = numeros2.reduceRight(

    (texto, numero) => texto + numero,

    ""

);

console.log(derechaAIzquierda);

// "321"

// ============================================================================
// DIFERENCIA ENTRE LOS MÉTODOS
// ============================================================================
//
// map()
// --------------------------
// - Transforma cada elemento.
// - Devuelve un nuevo array.
//
// sort()
// --------------------------
// - Ordena el array.
// - Modifica el original.
//
// reverse()
// --------------------------
// - Invierte el orden.
// - Modifica el original.
//
// split()
// --------------------------
// - Convierte String -> Array.
//
// join()
// --------------------------
// - Convierte Array -> String.
//
// reduce()
// --------------------------
// - Reduce todo el array
//   a un único valor.
//
// reduceRight()
// --------------------------
// - Igual que reduce()
// - Pero de derecha a izquierda.
//
//
// ============================================================================
// Array.isArray()
// ============================================================================
//
// En JavaScript los arrays son un tipo especial de objeto.
//
// Por eso:
//
// typeof NO puede distinguir entre un objeto normal y un array.
//

console.log(typeof {});

// "object"

console.log(typeof []);

// "object"

//
// Ambos devuelven "object".
//
// Entonces, ¿cómo saber si un valor realmente es un array?
//
// Para eso existe:
//
// Array.isArray()
//

// ============================================================================
// Sintaxis
// ============================================================================
//
// Array.isArray(valor)
//
// Devuelve:
//
// true  -> si el valor es un array.
//
// false -> si no lo es.
//

console.log(Array.isArray([]));

// true

console.log(Array.isArray([1, 2, 3]));

// true

console.log(Array.isArray({}));

// false

console.log(Array.isArray("Hola"));

// false

console.log(Array.isArray(10));

// false

console.log(Array.isArray(null));

// false

// ============================================================================
// ¿Cuándo usar Array.isArray()?
// ============================================================================
//
// Es muy útil cuando una función puede recibir distintos tipos
// de datos y necesitamos asegurarnos de que realmente sea un array.
//

function mostrarElementos(valor) {

    if (Array.isArray(valor)) {

        console.log("Es un array:");

        console.log(valor);

    } else {

        console.log("No es un array");

    }

}

mostrarElementos([1, 2, 3]);

// Es un array

mostrarElementos("Hola");

// No es un array

// ============================================================================
// RESUMEN Array.isArray()
// ============================================================================
//
// - Es la forma correcta de comprobar si un valor es un array.
// - typeof NO sirve para esta tarea.
// - Devuelve true o false.
//

// ============================================================================
// thisArg
// ============================================================================
//
// Muchos métodos de arrays aceptan un segundo parámetro opcional:
//
// thisArg
//
// Métodos que lo soportan:
//
// find()
// filter()
// map()
// some()
// every()
// forEach()
//
// (Entre otros)
//
// Sintaxis:
//
// arr.metodo(funcion, thisArg);
//
//
// Este argumento indica cuál será el valor de "this"
// dentro de la función.
//

// ============================================================================
// Ejemplo
// ============================================================================

let army = {

    minAge: 18,

    maxAge: 27,

    canJoin(user) {

        return user.age >= this.minAge && user.age < this.maxAge;

    }

};

let users = [

    { age: 16 },

    { age: 20 },

    { age: 23 },

    { age: 30 }

];

let soldiers = users.filter(

    army.canJoin,

    army

);

console.log(soldiers);

// [{age:20}, {age:23}]

//
// ¿Qué ocurre aquí?
//
// users.filter() llama al método:
//
// army.canJoin(user)
//
// Gracias al segundo argumento,
// dentro de canJoin(),
//
// this === army
//

// ============================================================================
// ¿Qué ocurre si no usamos thisArg?
// ============================================================================

// users.filter(army.canJoin);

//
// Dentro de canJoin():
//
// this === undefined
//
// Entonces:
//
// this.minAge
//
// produce un error.
//
// Por eso necesitamos indicar
// cuál será el valor de this.
//

// ============================================================================
// Forma moderna (la más utilizada)
// ============================================================================

let soldiers2 = users.filter(

    user => army.canJoin(user)

);

console.log(soldiers2);

//
// Esta versión hace exactamente lo mismo.
//
// Hoy en día suele preferirse porque:
//
// ✔ Es más sencilla.
// ✔ Es más fácil de leer.
// ✔ Evita problemas con this.
//

// ============================================================================
// RESUMEN thisArg
// ============================================================================
//
// - Es un parámetro opcional.
// - Define el valor de this.
// - Se usa muy poco actualmente.
// - Las funciones flecha suelen ser la alternativa preferida.
//

// ============================================================================
// some()
// ============================================================================
//
// some() comprueba si AL MENOS UN elemento
// cumple una condición.
//
// Devuelve:
//
// true  -> si alguno cumple.
//
// false -> si ninguno cumple.
//

let numeros = [2, 4, 6, 8, 9];

let existeImpar = numeros.some(

    numero => numero % 2 !== 0

);

console.log(existeImpar);

// true

//
// some() deja de recorrer el array
// apenas encuentra el primer elemento válido.
//

// ============================================================================
// every()
// ============================================================================
//
// every() comprueba si TODOS los elementos
// cumplen una condición.
//
// Devuelve:
//
// true  -> si todos cumplen.
//
// false -> si alguno no cumple.
//

numeros = [2, 4, 6, 8];

let todosPares = numeros.every(

    numero => numero % 2 === 0

);

console.log(todosPares);

// true

//
// every() también termina antes de tiempo
// cuando encuentra el primer elemento que NO cumple.
//

// ============================================================================
// Comparar arrays con every()
// ============================================================================

function arraysEqual(arr1, arr2) {

    return (

        arr1.length === arr2.length &&

        arr1.every(

            (valor, indice) => valor === arr2[indice]

        )

    );

}

console.log(

    arraysEqual([1, 2], [1, 2])

);

// true

console.log(

    arraysEqual([1, 2], [2, 1])

);

// false

// ============================================================================
// fill()
// ============================================================================
//
// fill() reemplaza varios elementos
// por un mismo valor.
//
// Modifica el array.
//
// Sintaxis:
//
// arr.fill(valor, inicio, fin)
//

let letras = [1, 2, 3, 4, 5];

letras.fill(0);

console.log(letras);

// [0,0,0,0,0]

letras = [1, 2, 3, 4, 5];

letras.fill(9, 1, 4);

console.log(letras);

// [1,9,9,9,5]

// ============================================================================
// copyWithin()
// ============================================================================
//
// Copia una parte del mismo array
// hacia otra posición.
//
// Modifica el array.
//

let copia = [1, 2, 3, 4, 5];

copia.copyWithin(0, 3);

console.log(copia);

// [4,5,3,4,5]

//
// Desde el índice 3 copia:
//
// [4,5]
//
// y los pega desde la posición 0.
//

// ============================================================================
// flat()
// ============================================================================
//
// Convierte un array multidimensional
// en uno más plano.
//
// NO modifica el original.
//

let matriz = [

    1,

    [2, 3],

    [4, [5, 6]]

];

console.log(

    matriz.flat()

);

// [1,2,3,4,[5,6]]

console.log(

    matriz.flat(2)

);

// [1,2,3,4,5,6]

// ============================================================================
// flatMap()
// ============================================================================
//
// Equivale aproximadamente a:
//
// map() + flat(1)
//
// Primero transforma,
// luego aplana un nivel.
//

let frases = [

    "Hola mundo",

    "JavaScript"

];

let palabras = frases.flatMap(

    texto => texto.split(" ")

);

console.log(palabras);

// ["Hola","mundo","JavaScript"]

// ============================================================================
// MÉTODOS QUE MODIFICAN EL ARRAY
// ============================================================================
//
// - push()
// - pop()
// - shift()
// - unshift()
// - splice()
// - sort()
// - reverse()
// - fill()
// - copyWithin()

// ============================================================================
// MÉTODOS QUE DEVUELVEN UN NUEVO ARRAY
// ============================================================================
//
// - slice()
// - concat()
// - map()
// - filter()
// - flat()
// - flatMap()

// ============================================================================
// MÉTODOS QUE DEVUELVEN UN VALOR
// ============================================================================
//
// - includes()
// - indexOf()
// - lastIndexOf()
// - find()
// - findIndex()
// - findLastIndex()
// - some()
// - every()
// - reduce()
// - reduceRight()
// - Array.isArray()

// ============================================================================
// AYUDAMEMORIA DE MÉTODOS DE ARRAYS
// ============================================================================
//
// AGREGAR / ELIMINAR
// -----------------------------
// push()
// pop()
// shift()
// unshift()
// splice()
//
// COPIAR
// -----------------------------
// slice()
// concat()
//
// RECORRER
// -----------------------------
// forEach()
//
// TRANSFORMAR
// -----------------------------
// map()
// flat()
// flatMap()
//
// BUSCAR
// -----------------------------
// includes()
// indexOf()
// lastIndexOf()
// find()
// findIndex()
// findLastIndex()
// filter()
//
// COMPROBAR
// -----------------------------
// some()
// every()
// Array.isArray()
//
// ORDENAR
// -----------------------------
// sort()
// reverse()
//
// CONVERTIR
// -----------------------------
// split()
// join()
//
// REDUCIR
// -----------------------------
// reduce()
// reduceRight()
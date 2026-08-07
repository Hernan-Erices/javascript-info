/*
================================================================================
                    PARÁMETROS REST Y SINTAXIS DE PROPAGACIÓN
================================================================================

Muchas funciones integradas de JavaScript aceptan una cantidad variable de
argumentos.

Algunos ejemplos son:

- Math.max(arg1, arg2, ..., argN)
    Devuelve el mayor valor recibido.

- Object.assign(dest, src1, ..., srcN)
    Copia las propiedades de uno o más objetos de origen hacia un objeto destino.

En este capítulo aprenderemos dos características muy importantes del lenguaje:

1. Los parámetros REST (...), que permiten recibir una cantidad ilimitada
    de argumentos dentro de una función.

2. La sintaxis Spread (...), que permite expandir un iterable (como un array
    o una cadena) en una lista de valores individuales.

Aunque ambas utilizan los mismos tres puntos (...), cumplen funciones
completamente opuestas.

================================================================================
PARÁMETROS REST (...)
================================================================================

Una función puede recibir más argumentos de los que declara.

Por ejemplo:

*/

function sum(a, b) {
    return a + b;
}

alert(sum(1, 2, 3, 4, 5)); // 3

/*
No se produce ningún error.

Simplemente:

a = 1
b = 2

Los argumentos restantes son ignorados.

--------------------------------------------------
Capturando todos los argumentos
--------------------------------------------------

Si queremos acceder a todos los argumentos enviados,
podemos utilizar los parámetros REST.

Su sintaxis consiste en colocar tres puntos (...)
seguido del nombre de una variable.

*/

function sumAll(...args) {
    let sum = 0;

    for (const arg of args) {
        sum += arg;
    }

    return sum;
}

alert(sumAll(1));         // 1
alert(sumAll(1, 2));      // 3
alert(sumAll(1, 2, 3));   // 6

/*
¿Qué ocurre aquí?

Cuando escribimos:

...args

JavaScript toma todos los argumentos restantes y los agrupa dentro de un array.

Por ejemplo:

sumAll(1,2,3,4)

produce internamente:

args = [1,2,3,4]

Por eso podemos recorrerlo con for...of.

================================================================================
REST + PARÁMETROS NORMALES
================================================================================

También podemos declarar parámetros normales antes del parámetro REST.

*/

function showName(firstName, lastName, ...titles) {
    alert(`${firstName} ${lastName}`);

    alert(titles[0]);
    alert(titles[1]);
    alert(titles.length);
}

showName(
    "Julius",
    "Caesar",
    "Consul",
    "Imperator"
);

/*
Resultado:

firstName = "Julius"

lastName = "Caesar"

titles = ["Consul", "Imperator"]

Es decir, únicamente los argumentos sobrantes terminan dentro del array.

================================================================================
RESTRICCIÓN IMPORTANTE
================================================================================

El parámetro REST SIEMPRE debe ser el último.

Incorrecto:

function f(arg1, ...rest, arg2) {
}

Genera un error.

Correcto:

function f(arg1, arg2, ...rest) {
}

¿Por qué?

Porque REST significa:

"Todo lo que queda."

Si existieran parámetros después de él,
JavaScript no sabría cuándo dejar de capturar argumentos.

================================================================================
LA VARIABLE arguments
================================================================================

Antes de que existieran los parámetros REST,
JavaScript utilizaba un objeto especial llamado:

arguments

Este contiene todos los argumentos enviados a una función.

*/

function showArguments() {
    alert(arguments.length);

    alert(arguments[0]);
    alert(arguments[1]);

    /*
    También es iterable.

    for (const arg of arguments) {
        alert(arg);
    }
  */
}

showArguments("Julius", "Caesar");

showArguments("Ilya");

/*
Primer llamado:

arguments = {
    0: "Julius",
    1: "Caesar",
    length: 2
}

Segundo llamado:

arguments = {
    0: "Ilya",
    length: 1
}

================================================================================
¿POR QUÉ SE PREFIERE REST?
================================================================================

Aunque arguments sigue funcionando,
hoy en día normalmente se prefieren los parámetros REST.

Motivos:

- arguments NO es un array.

Aunque se parece, no posee métodos como:

arguments.map(...)
arguments.filter(...)
arguments.reduce(...)

- Siempre contiene TODOS los argumentos.

No permite capturar únicamente los sobrantes.

- REST crea directamente un array real,
por lo que resulta mucho más cómodo.

En código moderno casi siempre se utiliza:

function f(...args)

en lugar de:

arguments

================================================================================
LAS FUNCIONES FLECHA NO TIENEN arguments
================================================================================

Las funciones flecha no crean su propio objeto arguments.

Si lo utilizan, toman el de la función normal más cercana.

*/

function f() {

    const showArg = () => {
        alert(arguments[0]);
    };

    showArg();

}

f(1); // 1

/*
La función flecha reutiliza el arguments
de la función f().

================================================================================
SINTAXIS DE PROPAGACIÓN (SPREAD)
================================================================================

Hasta ahora vimos cómo convertir:

Lista de argumentos
↓

Array

Ahora veremos exactamente lo contrario.

Spread convierte:

Array
↓

Lista de argumentos

Ejemplo clásico:

*/

alert(Math.max(3, 5, 1)); // 5

/*
Pero...

*/

const arr = [3, 5, 1];

alert(Math.max(arr)); // NaN

/*
¿Por qué?

Porque Math.max espera:

Math.max(3,5,1)

NO:

Math.max([3,5,1])

Aquí aparece Spread.

*/

alert(Math.max(...arr)); // 5

/*
Internamente ocurre algo parecido a:

Math.max(3,5,1)

================================================================================
SPREAD CON VARIOS ARRAYS
================================================================================
*/

const arr1 = [1, -2, 3, 4];
const arr2 = [8, 3, -8, 1];

alert(Math.max(...arr1, ...arr2)); // 8

/*
JavaScript expande ambos arrays.

Es equivalente a escribir:

Math.max(
    1,
    -2,
    3,
    4,
    8,
    3,
    -8,
    1
)

================================================================================
MEZCLANDO SPREAD Y VALORES NORMALES
================================================================================
*/

alert(
Math.max(
    1,
    ...arr1,
    2,
    ...arr2,
    25
    )
);

// 25

/*
Spread puede mezclarse libremente
con argumentos normales.

================================================================================
UNIR ARRAYS
================================================================================

Spread también es muy utilizado para crear nuevos arrays.

*/

const numbers1 = [3, 5, 1];
const numbers2 = [8, 9, 15];

const merged = [
    0,
    ...numbers1,
    2,
    ...numbers2
];

alert(merged);

/*
Resultado:

[
0,
3,
5,
1,
2,
8,
9,
15
]

No modifica los arrays originales.

================================================================================
SPREAD CON CUALQUIER ITERABLE
================================================================================

Spread no funciona únicamente con arrays.

También funciona con cualquier iterable.

Por ejemplo:

*/

const str = "Hello";

alert([...str]);

/*
Resultado:

["H","e","l","l","o"]

¿Por qué?

Porque las cadenas son iterables.

JavaScript recorre la cadena carácter por carácter,
igual que lo hace un for...of.

================================================================================
ARRAY.FROM()
================================================================================

Existe otra forma de convertir un iterable
en un array.

*/

alert(Array.from(str));

/*
Resultado:

["H","e","l","l","o"]

La diferencia principal es:

Array.from()

- Funciona con iterables.
- Funciona con objetos similares a arrays (array-like).

Spread (...)

- Solo funciona con iterables.

Por ello Array.from() es ligeramente más versátil.

================================================================================
COPIAR ARRAYS
================================================================================

Spread permite realizar copias superficiales
(shallow copy) de arrays.

*/

const original = [1, 2, 3];

const copy = [...original];

alert(JSON.stringify(original) === JSON.stringify(copy)); // true

alert(original === copy); // false

original.push(4);

alert(original); // [1,2,3,4]

alert(copy); // [1,2,3]

/*
Aunque contienen los mismos elementos,
son arrays distintos en memoria.

================================================================================
COPIAR OBJETOS
================================================================================

También funciona con objetos.

*/

const obj = {
    a: 1,
    b: 2,
    c: 3
};

const objCopy = {
    ...obj
};

alert(JSON.stringify(obj) === JSON.stringify(objCopy));

alert(obj === objCopy);

obj.d = 4;

alert(JSON.stringify(obj));

alert(JSON.stringify(objCopy));

/*
Spread realiza una copia superficial del objeto.

Es equivalente a:

Object.assign({}, obj)

pero resulta mucho más corto y legible.

================================================================================
¿REST O SPREAD?
================================================================================

Ambos utilizan exactamente la misma sintaxis:

...

Sin embargo, su función depende completamente del contexto.

--------------------------------------------------
REST
--------------------------------------------------

Aparece en la definición de parámetros.

Su trabajo consiste en AGRUPAR argumentos.

Ejemplo:

function f(...args) {}

Lista de argumentos
↓

Array

--------------------------------------------------
SPREAD
--------------------------------------------------

Aparece en llamadas a funciones,
arrays u objetos.

Su trabajo consiste en EXPANDIR un iterable.

Ejemplo:

Math.max(...arr)

Array
↓

Lista de argumentos

================================================================================
RESUMEN
================================================================================

- Los parámetros REST (...) permiten que una función acepte cualquier cantidad de argumentos agrupándolos en un array.

- El parámetro REST siempre debe ser el último parámetro de la función.

- El objeto arguments sigue existiendo por compatibilidad, pero hoy en día normalmente se prefiere REST porque crea un array real.

- Las funciones flecha no poseen su propio objeto arguments; utilizan el de la función externa.

- La sintaxis Spread (...) realiza la operación inversa a REST: expande un iterable en una lista de valores individuales.

- Spread permite:
    - Pasar arrays a funciones como Math.max().
    - Combinar varios arrays.
    - Convertir cadenas en arrays.
    - Crear copias superficiales de arrays y objetos.

- Array.from() también convierte iterables en arrays y, además, funciona con
    objetos similares a arrays (array-like), por lo que es más flexible que
    la sintaxis Spread en ese caso.

- Una forma sencilla de recordar la diferencia es:

    REST  → Agrupa argumentos → Array

    SPREAD → Expande un array → Lista de argumentos
```
*/
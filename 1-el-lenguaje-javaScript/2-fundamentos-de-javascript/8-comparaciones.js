/*==============================================================================
    COMPARACIONES EN JAVASCRIPT
==============================================================================*/

/*
Los operadores de comparación permiten comparar dos valores y siempre
devuelven un valor booleano:

true  -> la comparación es verdadera.

false -> la comparación es falsa.
*/

/*
Operadores de comparación

>   Mayor que

<   Menor que

>=  Mayor o igual que

<=  Menor o igual que

==  Igualdad (con conversión de tipos)

=== Igualdad estricta (sin conversión)

!=  Distinto

!== Distinto estricto
*/

/*
Ejemplos
*/

console.log(5 > 3);     // true

console.log(5 < 3);     // false

console.log(5 >= 5);    // true

console.log(5 == 5);    // true

console.log(5 != 8);    // true

/*==============================================================================
    EL RESULTADO SIEMPRE ES BOOLEAN
==============================================================================*/

/*
Toda comparación devuelve:

true
o
false
*/

let result = 10 > 7;

console.log(result); // true

/*==============================================================================
    COMPARACIÓN DE STRINGS
==============================================================================*/

/*
Las cadenas se comparan carácter por carácter siguiendo el orden Unicode
(orden lexicográfico).
*/

console.log("Z" > "A"); // true

console.log("Glow" > "Glee"); // true

console.log("Bee" > "Be"); // true

/*
IMPORTANTE

JavaScript distingue entre mayúsculas y minúsculas.

Las letras minúsculas tienen un valor Unicode mayor que las mayúsculas.
*/

console.log("a" > "A"); // true

/*
Comparación simplificada

"Casa"

"Caso"

↓

C = C

a = a

s = s

a < o

Resultado:

"Casa" < "Caso"
*/

/*==============================================================================
    COMPARACIÓN ENTRE DISTINTOS TIPOS
==============================================================================*/

/*
Cuando se comparan valores de distintos tipos, JavaScript normalmente
los convierte a números.
*/

console.log("2" > 1); // true

console.log("01" == 1); // true

/*
Los booleanos también se convierten.

true  -> 1

false -> 0
*/

console.log(true == 1); // true

console.log(false == 0); // true

/*==============================================================================
    IGUALDAD (==)
==============================================================================*/

/*
El operador == compara dos valores realizando conversión de tipos
cuando es necesario.

Esto puede producir resultados inesperados.
*/

console.log(0 == false); // true

console.log("" == false); // true

console.log("5" == 5); // true

/*
Por esta razón, su uso no suele recomendarse.
*/

/*==============================================================================
    IGUALDAD ESTRICTA (===)
==============================================================================*/

/*
El operador === compara:

-Valor
-Tipo de dato

No realiza conversiones.
*/

console.log(5 === 5); // true

console.log("5" === 5); // false

console.log(false === 0); // false

console.log(null === undefined); // false

/*
En JavaScript moderno se recomienda utilizar === en lugar de ==.
*/

/*==============================================================================
    NULL Y UNDEFINED
==============================================================================*/

/*
Con igualdad estricta:

===

Son diferentes porque tienen tipos distintos.
*/

console.log(null === undefined); // false

/*
Con igualdad normal:

==

Existe una excepción.

Solo null y undefined son iguales entre sí.
*/

console.log(null == undefined); // true

/*
No son iguales a ningún otro valor.
*/

console.log(null == 0); // false

console.log(undefined == 0); // false

/*==============================================================================
    COMPARACIONES CON NULL
==============================================================================*/

/*
Las comparaciones matemáticas convierten:

null -> 0
*/

console.log(null > 0); // false

console.log(null >= 0); // true

console.log(null == 0); // false

/*
Puede parecer extraño, pero ocurre porque:

== y > < >= <= siguen reglas diferentes.
*/

/*==============================================================================
    COMPARACIONES CON UNDEFINED
==============================================================================*/

/*
undefined se convierte en NaN en comparaciones matemáticas.

Como NaN nunca puede compararse correctamente,
todas estas comparaciones devuelven false.
*/ 

console.log(undefined > 0); // false

console.log(undefined < 0); // false

console.log(undefined == 0); // false

/*==============================================================================
    BUENAS PRÁCTICAS
==============================================================================*/

/*
- Usa === y !== siempre que sea posible.

- Evita == salvo que conozcas exactamente cómo realiza las conversiones.

- Antes de comparar con >, <, >= o <= verifica si el valor puede ser
null o undefined.

- Recuerda que:

null == undefined      // true

null === undefined     // false
*/
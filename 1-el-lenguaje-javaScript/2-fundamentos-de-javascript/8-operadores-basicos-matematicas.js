/*==============================================================================
    OPERADORES BÁSICOS
==============================================================================*/

/*
Los operadores permiten realizar operaciones sobre uno o más valores
(operandos).

Ejemplo:

5 + 2

5 -> operando izquierdo
2 -> operando derecho
+ -> operador
*/

/*------------------------------------------------------------------------------
    Operadores unarios y binarios
------------------------------------------------------------------------------*/

/*
Operador unario

Trabaja con un solo operando.

Ejemplo:
*/

let x = 5;

console.log(-x); // -5

/*
Operador binario

Trabaja con dos operandos.
*/

let a = 10;
let b = 3;

console.log(a - b); // 7

/*==============================================================================
    OPERADORES MATEMÁTICOS
==============================================================================*/

/*
Operadores más utilizados:

+   Suma

-   Resta

*   Multiplicación

/   División

%   Módulo (resto de una división)

**  Exponenciación

*/

/*
Ejemplos
*/

console.log(5 + 2); // 7

console.log(5 - 2); // 3

console.log(5 * 2); // 10

console.log(5 / 2); // 2.5

console.log(5 % 2); // 1

console.log(2 ** 3); // 8

/*------------------------------------------------------------------------------
    Operador módulo (%)
------------------------------------------------------------------------------*/

/*
Devuelve el resto de una división.

Ejemplos
*/

console.log(8 % 3); // 2

console.log(8 % 4); // 0

/*
Se usa mucho para:

- Saber si un número es par o impar.
- Trabajar con ciclos.
*/

/*------------------------------------------------------------------------------
    Exponenciación (**)
------------------------------------------------------------------------------*/

/*
Eleva un número a una potencia.

Ejemplos
*/

console.log(2 ** 2); // 4

console.log(2 ** 3); // 8

console.log(4 ** (1 / 2)); // 2 (raíz cuadrada)

console.log(8 ** (1 / 3)); // 2 (raíz cúbica)

/*==============================================================================
    CONCATENACIÓN DE STRINGS
==============================================================================*/

/*
El operador + tiene dos comportamientos.

1. Suma números.

2. Une cadenas de texto (concatenación).
*/

console.log("Hola " + "Mundo");

console.log("1" + "2"); // "12"

/*
Si uno de los operandos es un string,
el otro también se convierte en string.
*/

console.log("1" + 2); // "12"

console.log(2 + "1"); // "21"

/*
La evaluación ocurre de izquierda a derecha.
*/

console.log(2 + 2 + "1"); // "41"

console.log("1" + 2 + 2); // "122"

/*
IMPORTANTE

Solo el operador + concatena cadenas.

Los demás operadores convierten los valores a números.
*/

console.log("6" - "2"); // 4

console.log("6" * "2"); // 12

console.log("6" / "2"); // 3

/*==============================================================================
    OPERADOR UNARIO +
==============================================================================*/

/*
El operador + delante de un único valor lo convierte en número.

Es una forma corta de usar Number().
*/

console.log(+"10"); // 10

console.log(+true); // 1

console.log(+""); // 0

/*
Muy útil cuando obtenemos datos desde un formulario.
*/

let apples = "2";
let oranges = "3";

console.log(+apples + +oranges); // 5

/*==============================================================================
    PRECEDENCIA DE OPERADORES
==============================================================================*/

/*
Cuando una expresión tiene varios operadores, JavaScript sigue un orden
de prioridad.

Ejemplo:
*/

console.log(1 + 2 * 2); // 5

/*
La multiplicación se ejecuta antes que la suma.

Los paréntesis tienen la prioridad más alta.
*/

console.log((1 + 2) * 2); // 6

/*
Orden simplificado (de mayor a menor prioridad)

()

++

--

+

- (unario)

**

*

/

%

+

- (binario)

=
*/

/*==============================================================================
    OPERADOR DE ASIGNACIÓN (=)
==============================================================================*/

/*
El operador = asigna un valor a una variable.
*/

let number = 5;

/*
También devuelve el valor asignado.

Aunque es posible escribir:
*/

let c;
let d = 2;

c = d = 10;

console.log(c); // 10

console.log(d); // 10

/*
Se recomienda evitar este estilo porque reduce la legibilidad.
*/

/*==============================================================================
    OPERADORES DE ASIGNACIÓN COMPUESTA
==============================================================================*/

/*
Permiten modificar una variable de forma abreviada.
*/

let n = 5;

n += 2; // n = n + 2

n -= 1; // n = n - 1

n *= 3; // n = n * 3

n /= 2; // n = n / 2

n %= 2; // n = n % 2

console.log(n);

/*==============================================================================
    INCREMENTO Y DECREMENTO
==============================================================================*/

/*
Incremento

++

Aumenta una variable en 1.
*/

let counter = 1;

counter++;

console.log(counter); // 2

/*
Decremento

--

Disminuye una variable en 1.
*/

counter--;

console.log(counter); // 1

/*------------------------------------------------------------------------------
    Prefijo y postfijo
------------------------------------------------------------------------------*/

/*
Prefijo

Primero incrementa y luego devuelve el valor.
*/

let x1 = 1;

console.log(++x1); // 2

/*
Postfijo

Primero devuelve el valor y luego incrementa.
*/

let x2 = 1;

console.log(x2++); // 1

console.log(x2); // 2

/*
Si solo deseas aumentar o disminuir una variable, ambas formas producen
el mismo resultado.

Usa el prefijo o postfijo únicamente cuando realmente necesites el valor
que devuelve el operador.
*/

/*==============================================================================
    OPERADORES MENOS UTILIZADOS
==============================================================================*/

/*
Operadores bit a bit

&, |, ^, ~, <<, >>, >>>

Trabajan directamente con los bits de un número.

No son necesarios para aprender JavaScript básico y rara vez se utilizan
en desarrollo web.
*/

/*
Operador coma (,)

Permite evaluar varias expresiones y devuelve únicamente el resultado de
la última.

Su uso es poco frecuente y suele reducir la legibilidad del código.

No se recomienda usarlo al comenzar.
*/


//TAREA 1
let a = 1, b = 1;

let c = ++a; // ?
let d = b++; // ?

//RESULTADO TAREA 1:
a = 2
b = 2
c = 2
d = 1
let a = 1, b = 1;

alert( ++a ); // 2, prefix form returns the new value
alert( b++ ); // 1, postfix form returns the old value

alert( a ); // 2, incremented once
alert( b ); // 2, incremented once


//TAREA 2
let a = 2;
let x = 1 + (a *= 2);

//RESULTADO TAREA 2:
a = 4 // (multiplicado por 2)
x = 5 // (calculado como 1 + 4)


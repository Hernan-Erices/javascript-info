/*==============================================================================
    BUCLES (LOOPS)
    while, do...while y for
==============================================================================*/

/*
Los bucles permiten ejecutar un bloque de código varias veces.

Se utilizan cuando necesitamos repetir una tarea sin escribir el
mismo código una y otra vez.

JavaScript ofrece tres bucles principales:

- while
- do...while
- for
*/

/*==============================================================================
    BUCLE WHILE
==============================================================================*/

/*
El bucle while ejecuta un bloque de código mientras una condición
sea verdadera.

Sintaxis:

while (condición) {
    // código
}
*/

let i = 0;

while (i < 3) {
    console.log(i);
    i++;
}

/*
Salida:

0
1
2
*/

/*
IMPORTANTE

Si la condición nunca deja de cumplirse, el bucle será infinito.
*/

let x = 0;

// while (x >= 0) {
//     x++;
// }

/*==============================================================================
    DO...WHILE
==============================================================================*/

/*
El bucle do...while funciona igual que while, pero ejecuta el código
al menos una vez antes de comprobar la condición.

Sintaxis:

do {
    // código
} while (condición);
*/

let number = 0;

do {
    console.log(number);
    number++;
} while (number < 3);

/*
Salida:

0
1
2
*/

/*
La diferencia es que el bloque se ejecuta al menos una vez,
aunque la condición sea falsa.
*/

/*==============================================================================
    BUCLE FOR
==============================================================================*/

/*
Es el bucle más utilizado en JavaScript.

Sintaxis:

for (inicio; condición; incremento) {
    // código
}
*/

for (let i = 0; i < 5; i++) {
    console.log(i);
}

/*
Partes del for

inicio

Se ejecuta una sola vez.

----------------------------------------

condición

Se evalúa antes de cada iteración.

----------------------------------------

incremento

Se ejecuta después de cada iteración.
*/

/*==============================================================================
    VARIABLES DENTRO DEL FOR
==============================================================================*/

/*
Si declaramos la variable con let dentro del for, solo existirá
dentro del bucle.
*/

for (let i = 0; i < 3; i++) {
    console.log(i);
}

// console.log(i); // Error

/*
También podemos utilizar una variable creada previamente.
*/

let j = 0;

for (; j < 3; j++) {
    console.log(j);
}

console.log(j); // 3

/*==============================================================================
    OMITIR PARTES DEL FOR
==============================================================================*/

/*
Las tres partes del for son opcionales.
*/

let k = 0;

for (; k < 3;) {
    console.log(k++);
}

/*
Incluso es posible crear un bucle infinito.
*/

// for (;;) {
// }

/*==============================================================================
    BREAK
==============================================================================*/

/*
La instrucción break termina un bucle inmediatamente.
*/

for (let i = 0; i < 10; i++) {

    if (i === 5) {
        break;
    }

    console.log(i);
}

/*
Salida:

0
1
2
3
4
*/

/*
También es muy común con while.
*/

let sum = 0;

while (true) {

    let value = Number(prompt("Ingrese un número"));

    if (!value) {
        break;
    }

    sum += value;
}

/*==============================================================================
    CONTINUE
==============================================================================*/

/*
La instrucción continue no termina el bucle.

Simplemente salta la iteración actual y continúa con la siguiente.
*/

for (let i = 0; i < 10; i++) {

    if (i % 2 === 0) {
        continue;
    }

    console.log(i);
}

/*
Salida:

1
3
5
7
9
*/

/*
continue es útil para ignorar ciertos casos sin detener el bucle.
*/

/*==============================================================================
    BUCLES INFINITOS
==============================================================================*/

/*
Un bucle infinito ocurre cuando la condición nunca llega a ser falsa.
*/

let count = 0;

// while (true) {
//     count++;
// }

/*
Generalmente se usan junto con break para salir cuando sea necesario.
*/

/*==============================================================================
    ETIQUETAS (LABELS)
==============================================================================*/

/*
JavaScript permite asignar etiquetas a un bucle.

Su uso principal es salir de varios bucles anidados utilizando break.

Es una característica poco utilizada y generalmente no es necesaria
en código cotidiano.
*/

outer:

for (let i = 0; i < 3; i++) {

    for (let j = 0; j < 3; j++) {

        if (i === 1 && j === 1) {
            break outer;
        }

        console.log(i, j);
    }
}

/*
Utiliza las etiquetas solo cuando realmente sean necesarias.
*/

/*==============================================================================
    ¿QUÉ BUCLE DEBO USAR?
==============================================================================*/

/*
while

Cuando no sabes cuántas veces se repetirá el bucle.

----------------------------------------

do...while

Cuando el código debe ejecutarse al menos una vez.

----------------------------------------

for

Cuando conoces la cantidad de iteraciones.

Es el bucle más utilizado.
*/

/*

BUENAS PRÁCTICAS

- Usa for cuando conozcas el número de repeticiones.

- Usa while cuando la condición dependa de un evento.

- Usa do...while solo cuando el código deba ejecutarse al menos una vez.

- Usa break para salir de un bucle.

- Usa continue para omitir una iteración.

- Evita los bucles infinitos a menos que realmente sean necesarios.
*/
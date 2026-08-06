"use strict";

// ======================================================
// Recursión y pila (Call Stack)
// ======================================================

/*
La recursión es una técnica de programación en la que una función se llama
a sí misma para resolver un problema. Es especialmente útil cuando un
problema puede dividirse en versiones más pequeñas del mismo problema.

Se utiliza con frecuencia en:

- Árboles y estructuras jerárquicas.
- Búsquedas y recorridos.
- Algoritmos matemáticos.
- Procesamiento de datos anidados.

Toda función recursiva debe tener:

1. Un caso base.
    Es la condición que detiene la recursión.

2. Un paso recursivo.
    Es la llamada a la misma función con un problema más pequeño.

Si no existe un caso base, la función se llamará indefinidamente
hasta provocar un "Stack Overflow".
*/

// ======================================================
// Dos formas de resolver el mismo problema
// ======================================================

// Calcular x elevado a la potencia n.

// ------------------------------------------------------
// Forma iterativa
// ------------------------------------------------------

function powIterative(x, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

console.log(powIterative(2, 4)); // 16

/*
Proceso:

resultado = 1

1 * 2 = 2
2 * 2 = 4
4 * 2 = 8
8 * 2 = 16
*/

// ------------------------------------------------------
// Forma recursiva
// ------------------------------------------------------

function powRecursive(x, n) {
    if (n === 1) {
        return x; // Caso base
    }

    return x * powRecursive(x, n - 1); // Paso recursivo
}

console.log(powRecursive(2, 4)); // 16

/*
La función se puede expresar matemáticamente como:

xⁿ = x × xⁿ⁻¹

Cada llamada reduce el problema hasta llegar al caso base.

pow(2,4)
= 2 * pow(2,3)

= 2 * (2 * pow(2,2))

= 2 * (2 * (2 * pow(2,1)))

= 2 * 2 * 2 * 2

= 16
*/

// ======================================================
// Desglose paso a paso
// ======================================================

/*
pow(2,4)

↓

2 × pow(2,3)

↓

2 × (2 × pow(2,2))

↓

2 × (2 × (2 × pow(2,1)))

↓

Como n === 1

pow(2,1) devuelve 2

Entonces comienza el retorno:

2 × 2 = 4

2 × 4 = 8

2 × 8 = 16

Resultado final: 16
*/

// ======================================================
// Recursión más compacta
// =======================================================

function pow(x, n) {
  return n === 1 ? x : x * pow(x, n - 1);
}

console.log(pow(2, 5)); // 32

/*
Esta versión hace exactamente lo mismo, usando el operador ternario.
*/

// ======================================================
// Profundidad de recursión
// ======================================================

/*
La profundidad de recursión es la cantidad máxima de llamadas
simultáneas que existen antes de comenzar a regresar.

Ejemplo:

pow(2,5)

Hay cinco llamadas activas:

pow(2,5)
pow(2,4)
pow(2,3)
pow(2,2)
pow(2,1)

Profundidad = 5
*/

/*
Los motores de JavaScript limitan la profundidad máxima de llamadas.

Generalmente ronda las 10.000 llamadas (depende del motor).

Si se supera dicho límite aparecerá un error similar a:

RangeError:
Maximum call stack size exceeded
*/

// ======================================================
// Contexto de ejecución
// ======================================================

/*
Cada vez que una función se ejecuta, JavaScript crea un
Execution Context (Contexto de ejecución).

Este contexto almacena información como:

- Variables locales.
- Parámetros.
- Valor de this.
- Posición actual del código.
- Datos internos necesarios para continuar la ejecución.

Cada llamada tiene su propio contexto independiente.
*/

// ======================================================
// La pila de llamadas (Call Stack)
// ======================================================

/*
Los contextos de ejecución se almacenan dentro de una estructura
LIFO (Last In, First Out) llamada Call Stack.

El último contexto que entra es el primero que sale.
*/

// Ejemplo:

function first() {
    second();
}

function second() {
    third();
}

function third() {
    console.log("Fin");
}

first();

/*
Estado de la pila:

Inicio

[]

↓

first()

[first]

↓

second()

[second]
[first]

↓

third()

[third]
[second]
[first]

↓

third termina

[second]
[first]

↓

second termina

[first]

↓

first termina

[]

La pila vuelve a quedar vacía.
*/

// ======================================================
// La pila durante una recursión
// ======================================================

/*
Veamos nuevamente:

pow(2,3)

Primera llamada

[ pow(2,3) ]

↓

Segunda llamada

[ pow(2,2) ]
[ pow(2,3) ]

↓

Tercera llamada

[ pow(2,1) ]
[ pow(2,2) ]
[ pow(2,3) ]

Aquí se alcanza el caso base.

Comienza el retorno.

pow(2,1) devuelve 2

↓

Se elimina de la pila.

[ pow(2,2) ]
[ pow(2,3) ]

pow(2,2)

2 × 2 = 4

↓

Se elimina.

[ pow(2,3) ]

pow(2,3)

2 × 4 = 8

↓

Se elimina.

[]

La ejecución termina.
*/

// ======================================================
// Consumo de memoria
// ======================================================

/*
Cada llamada recursiva necesita un nuevo contexto.

Más llamadas
↓

Más memoria

Por ejemplo:

pow(2,1000)

Generará aproximadamente 1000 contextos simultáneos.

En cambio, la versión iterativa solamente utiliza un único contexto,
independientemente del número de iteraciones.
*/

// Iterativa

function iterativePow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

/*
Solo existen estas variables:

result
i

Durante todo el proceso.

La memoria utilizada permanece prácticamente constante.
*/

// ======================================================
// Recursión vs Iteración
// ======================================================

/*
Recursión

- Código elegante.
- Muy natural para árboles y estructuras jerárquicas.
- Fácil de expresar matemáticamente.
- Más fácil de mantener en ciertos algoritmos.
- Consume más memoria.
- Puede producir Stack Overflow.

Iteración

- Más eficiente en memoria.
- Generalmente más rápida.
- No tiene límite de profundidad.
- Algunos algoritmos resultan menos intuitivos.
*/

// ======================================================
// ¿Cuándo usar recursión?
// ======================================================

/*
La recursión es recomendable cuando el problema tiene una estructura
naturalmente recursiva.

Ejemplos:

- Árboles DOM.
- Carpetas y archivos.
- JSON profundamente anidado.
- Árboles binarios.
- Recorrido DFS.
- Backtracking.
- Factorial.
- Fibonacci (con optimizaciones).
- Torres de Hanoi.

Para procesos lineales y simples normalmente un bucle resulta
más eficiente.
*/

"use strict";

// ======================================================
// Recorridos recursivos
// ======================================================

/*
Una de las aplicaciones más importantes de la recursión es recorrer
estructuras de datos que contienen elementos anidados.

En lugar de escribir múltiples bucles para cada nivel de profundidad,
la función se llama a sí misma cada vez que encuentra otra estructura
similar.

Esto permite trabajar con datos de cualquier nivel de anidamiento.
*/

// ======================================================
// Ejemplo: estructura de una empresa
// ======================================================

/*
Supongamos que queremos representar una empresa.

Cada departamento puede ser de dos tipos:

1. Un departamento "final", que contiene un array de empleados.

2. Un departamento que contiene otros subdepartamentos.

Cada subdepartamento puede contener nuevamente otros
subdepartamentos, formando una estructura en árbol.
*/

let company = {
    sales: [
        { name: "John", salary: 1000 },
        { name: "Alice", salary: 1600 }
    ],

    development: {
        sites: [
        { name: "Peter", salary: 2000 },
        { name: "Alex", salary: 1800 }
    ],

    internals: [
        { name: "Jack", salary: 1300 }
    ]
}
};

/*
Representación simplificada:

company
│
├── sales
│   ├── John
│   └── Alice
│
└── development
    │
    ├── sites
    │   ├── Peter
    │   └── Alex
    │
    └── internals
        └── Jack

En el futuro podrían existir más niveles:

development
    └── sites
        ├── frontend
        └── backend
            ├── api
            └── database

La profundidad puede crecer indefinidamente.
*/

// ======================================================
// Problema
// ======================================================

/*
Queremos calcular la suma de todos los salarios.

Con varios bucles anidados sería complicado porque no conocemos
cuántos niveles tendrá la estructura.

La recursión resuelve este problema de forma natural.
*/

// ======================================================
// Idea de la solución
// ======================================================

/*
Cada vez que la función recibe un departamento pueden ocurrir
dos situaciones.

CASO 1

Recibe un array de empleados.

↓

Solo debe sumar sus salarios.

CASO 2

Recibe un objeto con subdepartamentos.

↓

Debe recorrer cada subdepartamento y volver a llamarse.
*/

// ======================================================
// Implementación
// ======================================================

function sumSalaries(department) {

  // Caso base
    if (Array.isArray(department)) {

        return department.reduce(
        (total, employee) => total + employee.salary,
        0
    );

    }

  // Paso recursivo
    let sum = 0;

    for (const subDepartment of Object.values(department)) {
        sum += sumSalaries(subDepartment);
    }

    return sum;
}

console.log(sumSalaries(company)); // 7700

// ======================================================
// ¿Qué ocurre internamente?
// ======================================================

/*
sumSalaries(company)

↓

Recibe un objeto.

↓

Recorre:

sales
development

--------------------------------

sales

↓

Es un array.

↓

Suma:

1000 + 1600

↓

2600

--------------------------------

development

↓

Es un objeto.

↓

Recorre:

sites
internals

--------------------------------

sites

↓

Array

↓

2000 + 1800

↓

3800

--------------------------------

internals

↓

Array

↓

1300

--------------------------------

La función comienza a regresar.

development

3800 + 1300 = 5100

↓

company

2600 + 5100 = 7700
*/

// ======================================================
// Árbol de llamadas
// ======================================================

/*
sum(company)
│
├── sum(sales)
│      └── 2600
│
└── sum(development)
    │
    ├── sum(sites)
    │      └── 3800
    │
    └── sum(internals)
            └── 1300

↓

2600 + 3800 + 1300

↓

7700
*/

/*
Observa el patrón.

Cada objeto genera nuevas llamadas recursivas.

Cada array representa una hoja del árbol y produce
un resultado inmediato.
*/

// ======================================================
// Funciones utilizadas
// ======================================================

/*
Array.isArray()

Permite saber si el valor recibido es un array.

Object.values()

Devuelve un array con todos los valores del objeto.

Ejemplo:

const user = {
    name: "John",
    age: 30
};

console.log(Object.values(user));

// ["John", 30]

reduce()

Acumula todos los salarios en una única suma.
*/

// ======================================================
// Estructuras recursivas
// ======================================================

/*
Una estructura recursiva es aquella cuya definición
contiene nuevamente la misma estructura.

Nuestro ejemplo de empresa es recursivo porque un
departamento puede contener otros departamentos.

Departamento

↓

• Empleados

o

↓

• Más departamentos

Cada departamento vuelve a cumplir exactamente
la misma definición.
*/

// ======================================================
// Otros ejemplos de estructuras recursivas
// ======================================================

/*
HTML

<body>

    <div>
        <section>
            <article>
            </article>
        </section>
    </div>

</body>

Cada etiqueta puede contener otras etiquetas.

------------------------------------------

XML

<nodo>

    <nodo>
        <nodo>
        </nodo>
    </nodo>

</nodo>

------------------------------------------

JSON

{
    user: {
        address: {
            city: {
                ...
            }
        }
    }
}

Todos son árboles recursivos.
*/

// ======================================================
// Lista enlazada (Linked List)
// ======================================================

/*
Otra estructura recursiva muy conocida es la lista enlazada.

A diferencia de un array, cada elemento conoce únicamente
al siguiente elemento.
*/

let list = {
    value: 1,

    next: {
        value: 2,

    next: {
        value: 3,

    next: {
        value: 4,

        next: null
        }
    }
}
};

/*
Representación gráfica

┌───┐    ┌───┐    ┌───┐    ┌───┐
│ 1 │──▶│ 2 │──▶│ 3 │──▶│ 4 │──▶ null
└───┘    └───┘    └───┘    └───┘
*/

// ======================================================
// Construcción paso a paso
// ======================================================

let linkedList = {
    value: 1
};

linkedList.next = {
    value: 2
};

linkedList.next.next = {
    value: 3
};

linkedList.next.next.next = {
    value: 4
};

linkedList.next.next.next.next = null;

// ======================================================
// Dividir una lista
// ======================================================

let secondList = linkedList.next.next;

linkedList.next.next = null;

/*
Primera lista

1 -> 2

Segunda lista

3 -> 4
*/

// ======================================================
// Unir nuevamente
// ======================================================

linkedList.next.next = secondList;

// ======================================================
// Insertar un elemento al principio
// ======================================================

linkedList = {
    value: "Nuevo",

    next: linkedList
};

/*
Nuevo -> 1 -> 2 -> 3 -> 4
*/

// ======================================================
// Eliminar un elemento
// ======================================================

linkedList.next = linkedList.next.next;

/*
Antes

Nuevo -> 1 -> 2 -> 3 -> 4

Después

Nuevo -> 2 -> 3 -> 4

El nodo con valor 1 deja de estar enlazado.

Si no existe otra referencia hacia él, el recolector
de basura lo eliminará automáticamente.
*/

// ======================================================
// Arrays vs Listas enlazadas
// ======================================================

/*
Array

- Acceso inmediato mediante índice.

arr[5000]

Es muy rápido.

- Excelente para acceso aleatorio.

- Insertar o eliminar al principio puede ser costoso,
porque muchos elementos deben desplazarse.

--------------------------------------------------

Lista enlazada

- Insertar y eliminar elementos resulta muy rápido,
ya que solo se modifican referencias.

- Muy eficiente para colas y estructuras dinámicas.

- No permite acceder directamente al elemento número N.

Para llegar al quinto elemento debemos recorrer toda
la cadena desde el principio.
*/

// ======================================================
// Mejoras posibles
// ======================================================

/*
Las listas enlazadas pueden ampliarse según las necesidades.

Lista doblemente enlazada

Cada nodo almacena:

value
next
prev

Esto permite avanzar y retroceder.

------------------------------------------

También es común mantener una referencia al último nodo.

head -> primer nodo

tail -> último nodo

Así es posible insertar elementos al final sin recorrer
toda la lista.
*/


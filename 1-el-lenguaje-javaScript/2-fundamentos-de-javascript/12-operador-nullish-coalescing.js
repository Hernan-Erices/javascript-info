/*==============================================================================
    OPERADOR NULLISH COALESCING (??)
==============================================================================*/

/*
El operador Nullish Coalescing (??) permite devolver un valor
predeterminado únicamente cuando una variable es:

- null
- undefined

Sintaxis:

valor1 ?? valor2
*/

/*
Funcionamiento

Si valor1 está definido (no es null ni undefined):

-> devuelve valor1

Si valor1 es null o undefined:

-> devuelve valor2
*/

/*
Es equivalente a:

resultado =
    (valor1 !== null && valor1 !== undefined)
        ? valor1
        : valor2;
*/

/*==============================================================================
    VALOR PREDETERMINADO
==============================================================================*/

/*
Uno de los usos más comunes de ?? es asignar valores por defecto.
*/

let user;

console.log(user ?? "Anonymous"); // Anonymous

/*
Si la variable tiene un valor definido, ese valor se utiliza.
*/

let userName = "John";

console.log(userName ?? "Anonymous"); // John

/*==============================================================================
    PRIMER VALOR DEFINIDO
==============================================================================*/

/*
También podemos encadenar varios operadores ??.

JavaScript devolverá el primer valor que no sea null ni undefined.
*/

let firstName = null;
let lastName = null;
let nickName = "JanoCoder";

console.log(
    firstName ??
    lastName ??
    nickName ??
    "Anonymous"
); // JanoCoder

/*==============================================================================
    DIFERENCIA ENTRE ?? Y ||
==============================================================================*/

/*
Aunque parecen similares, no funcionan igual.

||

Devuelve el primer valor truthy.

??

Devuelve el primer valor definido.
*/

/*
Ejemplo
*/

let height = 0;

console.log(height || 100); // 100

console.log(height ?? 100); // 0

/*
¿Por qué ocurre?

||

Considera falsy a:

false

0

-0

0n

""

null

undefined

NaN

Por eso devuelve 100.

--------------------------------------------------

??

Solo considera:

null

undefined

Como 0 está definido, devuelve 0.
*/

/*
Otro ejemplo
*/

console.log("" || "Hola"); // Hola

console.log("" ?? "Hola"); // ""

console.log(false || true); // true

console.log(false ?? true); // false

/*
RECUERDA

Usa:

||

cuando quieras el primer valor truthy.

Usa:

??

cuando solo quieras reemplazar null o undefined.
*/

/*==============================================================================
    PRECEDENCIA
==============================================================================*/

/*
El operador ?? tiene baja precedencia.

Cuando se combina con operaciones matemáticas es recomendable usar
paréntesis.
*/

let height2 = null;
let width = null;

let area = (height2 ?? 100) * (width ?? 50);

console.log(area); // 5000

/*
Sin paréntesis el resultado puede no ser el esperado.
*/

/*==============================================================================
    USO CON && Y ||
==============================================================================*/

/*
JavaScript no permite mezclar directamente:

??

con

&&

o

||

porque puede generar ambigüedad.
*/

/*
Incorrecto
*/

let x = 1 && 2 ?? 3; // SyntaxError

/*
Correcto
*/

let x = (1 && 2) ?? 3;

console.log(x); // 2

/*
Utiliza siempre paréntesis cuando combines estos operadores.
*/

/*==============================================================================
    ¿CUÁNDO USAR ???
==============================================================================*/

/*
Usa ?? cuando quieras mantener valores válidos como:

0

false

""

y solo reemplazar:

null

undefined
*/

/*
Ejemplo práctico
*/

let score = 0;

console.log(score ?? 100); // 0

/*
Con || obtendríamos:

100

porque 0 es un valor falsy.
*/

/*
BUENAS PRÁCTICAS

- Usa ?? para valores predeterminados.

- Usa || cuando busques el primer valor truthy.

- Utiliza paréntesis al combinar ?? con operaciones o con && y ||.

- Recuerda que 0, false y "" son valores válidos para ??.
*/
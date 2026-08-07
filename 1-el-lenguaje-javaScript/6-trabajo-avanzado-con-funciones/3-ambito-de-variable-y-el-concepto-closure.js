//==============================================//
// ÁMBITO DE VARIABLES Y EL CONCEPTO DE "CLOSURE"
//==============================================//

/*
JavaScript es un lenguaje fuertemente orientado a funciones. Una función puede:

- Crearse en cualquier momento.
- Guardarse en una variable.
- Pasarse como argumento a otra función.
- Devolverse desde otra función.
- Ejecutarse mucho tiempo después de haber sido creada.

Gracias a esta flexibilidad, es importante entender cómo funcionan las variables
y el ámbito (scope) en JavaScript.

Sabemos que una función puede acceder a variables definidas fuera de ella.
Pero surgen varias preguntas interesantes:

- ¿Qué ocurre si una variable externa cambia después de crear la función?
- ¿La función utilizará el valor antiguo o el nuevo?
- Si una función se pasa a otra parte del programa, ¿seguirá teniendo acceso
    a las variables del lugar donde fue creada?

La respuesta a todas estas preguntas está relacionada con dos conceptos
fundamentales de JavaScript:

- Ámbito (Scope)
- Closure (Clausura)

En este capítulo aprenderemos cómo funcionan ambos internamente.
*/


//==============================================//
// VARIABLES let, const y var
//==============================================//

/*
JavaScript permite declarar variables de tres maneras:

- let   → Declaración moderna (recomendada).
- const → Igual que let, pero el identificador no puede reasignarse.
- var   → Forma antigua de declarar variables (se estudiará más adelante).

En este capítulo se utilizará principalmente let.

Todo lo explicado también aplica para const, ya que ambas comparten
el mismo comportamiento respecto al ámbito (scope).

La palabra clave var posee diferencias importantes que se estudiarán
en un capítulo independiente.
*/


//==============================================//
// BLOQUES DE CÓDIGO
//==============================================//

/*
Un bloque de código es cualquier sección delimitada por llaves:

{
    ...
}

Cuando una variable se declara con let o const dentro de un bloque,
solo existe dentro de ese bloque.

Fuera de él, la variable deja de existir.
*/

{
  // Variable local del bloque
    let message = "Hello";
    alert(message); // Hello
}

// Error:
// message solo existía dentro del bloque anterior.
alert(message);


/*
Esto permite aislar código y evitar conflictos entre variables
con el mismo nombre.
*/

{
    let message = "Hello";
    alert(message);
}

{
  // Esta variable es completamente distinta de la anterior.
    let message = "Goodbye";
    alert(message);
}


/*
Aunque ambas variables se llaman "message", no generan conflicto
porque pertenecen a bloques diferentes.
*/


//==============================================//
// ¿QUÉ PASA SI NO EXISTEN BLOQUES?
//==============================================//

/*
Si ambas declaraciones estuvieran en el mismo ámbito,
JavaScript produciría un error.

No es posible declarar dos veces una variable con let
dentro del mismo bloque.
*/

let message = "Hello";
alert(message);

let message = "Goodbye"; // Error: Identifier 'message' has already been declared
alert(message);


/*
Los bloques permiten reutilizar nombres de variables sin que interfieran
entre sí, ya que cada bloque crea su propio ámbito.
*/


//==============================================//
// ÁMBITO EN if, for y while
//==============================================//

/*
Las estructuras de control también crean su propio bloque.

Por ello, las variables declaradas con let o const dentro de un if,
for o while únicamente existen dentro de esas llaves.
*/

if (true) {
    let phrase = "Hello!";
    alert(phrase); // Hello!
}

// Error:
// phrase dejó de existir al finalizar el bloque if.
alert(phrase);


/*
Esto resulta muy útil porque permite crear variables temporales
que solo son necesarias durante la ejecución de una condición.

Así se evita contaminar el resto del programa con variables
que ya no serán utilizadas.
*/


//==============================================//
// ÁMBITO EN LOS BUCLES
//==============================================//

for (let i = 0; i < 3; i++) {
  // i solo existe dentro del bucle.
    alert(i);
}

// Error:
// La variable i no existe fuera del for.
alert(i);


/*
Aunque visualmente parezca que "let i" está fuera de las llaves,
el propio for crea un ámbito de bloque.

Por ello, la variable i solo vive durante la ejecución del bucle
y desaparece cuando este termina.

Este comportamiento evita errores muy comunes y hace que el código
sea más seguro y fácil de mantener. */

/*
==========================================
FUNCIONES ANIDADAS (NESTED FUNCTIONS)
==========================================

Una función anidada (nested function) es una función que se declara dentro
de otra función.

En JavaScript esto es completamente válido y muy común. Se utiliza para
organizar mejor el código y encapsular lógica que solo será utilizada por
la función que la contiene.

Las funciones anidadas pueden:

- Acceder a las variables de la función externa.
- Ser llamadas únicamente desde la función donde fueron creadas.
- Ser devueltas como resultado de otra función.
- Recordar las variables del entorno donde fueron creadas (Closure).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Funciones auxiliares (Helper Functions)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Uno de los usos más comunes consiste en crear pequeñas funciones auxiliares
que simplifican la lógica principal.
*/

function sayHiBye(firstName, lastName) {

  // Función auxiliar
function getFullName() {
    return firstName + " " + lastName;
}

alert("Hello, " + getFullName());
alert("Bye, " + getFullName());

}

/*
En este ejemplo:

- getFullName() solo existe dentro de sayHiBye().
- Puede acceder a firstName y lastName.
- No puede ejecutarse desde fuera de la función.

Ejemplo:

sayHiBye("John", "Smith");

Salida:

Hello, John Smith
Bye, John Smith
*/

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ¿Por qué puede acceder a esas variables?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

La función getFullName() utiliza firstName y lastName aunque no sean
variables propias.

Esto ocurre porque una función puede acceder a las variables del entorno
donde fue creada.

Visualmente:

sayHiBye()
│
├── firstName
├── lastName
│
└── getFullName()
        │
        └── utiliza esas variables

Mientras getFullName() exista, podrá leer esas variables.
*/

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. Devolver una función
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lo realmente interesante ocurre cuando una función anidada NO se ejecuta,
sino que se devuelve.

La función podrá utilizarse posteriormente desde cualquier parte del programa.
*/

function makeCounter() {
    let count = 0;

    return function () {
        return count++;
    };
}

let counter = makeCounter();

alert(counter()); // 0
alert(counter()); // 1
alert(counter()); // 2

/*
¿Qué sucede aquí?

Paso 1

Se ejecuta:

let counter = makeCounter();

Dentro ocurre:

count = 0

Luego devuelve la función interna.

counter termina almacenando esa función.

Visualmente:

counter
    │
    ▼
function () {
    return count++;
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ¿Por qué count no desaparece?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando hacemos:

counter();

la función sigue teniendo acceso a count.

Primera llamada:

count = 0
↓
devuelve 0
↓
count = 1

Segunda llamada:

count = 1
↓
devuelve 1
↓
count = 2

Tercera llamada:

count = 2
↓
devuelve 2
↓
count = 3

La variable NO vuelve a cero.

Sigue existiendo incluso después de que makeCounter()
terminó de ejecutarse.
*/

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. Cada llamada crea un contador nuevo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cada vez que llamamos makeCounter(), se crea una variable count diferente.
*/

let counter1 = makeCounter();
let counter2 = makeCounter();

alert(counter1()); // 0
alert(counter1()); // 1

alert(counter2()); // 0
alert(counter2()); // 1

/*
Visualmente:

counter1
└── count = 2

counter2
└── count = 2

Cada contador posee su propio estado.

Ninguno modifica las variables del otro.
*/

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. ¿Por qué esto es útil?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Este comportamiento permite crear funciones que mantienen información
privada sin utilizar variables globales.

Algunas aplicaciones reales son:

- Contadores.
- Generadores de IDs.
- Generadores de números pseudoaleatorios.
- Temporizadores.
- Funciones configurables.
- Encapsulamiento de datos.
- Caché de resultados.
*/

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. Concepto importante
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando una función se crea dentro de otra función:

- Puede acceder a las variables externas.

- Puede seguir utilizándolas incluso después de que la función exterior haya terminado.

- Cada ejecución de la función exterior crea un conjunto nuevo de variables independientes.

Este comportamiento es la base de uno de los conceptos más importantes
de JavaScript: las CLAUSURAS (Closures), que estudiaremos a continuación.
*/

/*

=========================================================
ÁMBITO (SCOPE) Y ALCANCE LÉXICO (LEXICAL ENVIRONMENT)
=========================================================

Hasta ahora hemos visto que una función puede acceder a variables externas.

Pero...

- ¿Cómo sabe JavaScript dónde buscar una variable?
- ¿Por qué una función recuerda variables incluso después de terminar?
- ¿Cómo funcionan realmente los Closures?

Para responder estas preguntas debemos comprender el concepto de
Ámbito Léxico (Lexical Scope).

Este es uno de los conceptos internos más importantes del lenguaje y la
base del funcionamiento de las clausuras (Closures).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 1. VARIABLES Y ENTORNO LÉXICO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cada vez que JavaScript ejecuta:

- un script
- una función
- un bloque de código { }

crea internamente una estructura llamada:

        Entorno Léxico (Lexical Environment)

Este objeto NO puede verse desde JavaScript.
Es una estructura interna utilizada por el motor del lenguaje.

Su función es almacenar todas las variables y permitir encontrarlas
cuando el código las necesita.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿De qué está formado un Entorno Léxico?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Consta de dos partes:

1) Registro de Entorno (Environment Record)

Es un objeto interno donde se almacenan todas las variables locales,
parámetros y otra información relacionada con la ejecución.

Ejemplo conceptual:

Registro de Entorno

{
    phrase: "Hello",
    number: 10,
    user: {...}
}

2) Referencia al Entorno Externo

Cada entorno mantiene un enlace al entorno donde fue creado.

Visualmente:

Entorno actual
│
├── Variables locales
└── Referencia
        │
        ▼
Entorno externo

Gracias a esta referencia JavaScript puede buscar variables fuera del
bloque actual.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Una variable realmente es...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando escribimos:

*/

let message = "Hola";

/*

Parece que "message" existe por sí sola.

Internamente ocurre algo parecido a esto:

Registro de Entorno

{
    message: "Hola"
}

Es decir:

Una variable no es más que una propiedad almacenada dentro del Registro
de Entorno correspondiente.

Por eso:

- Leer una variable significa buscar una propiedad.
- Modificar una variable significa cambiar esa propiedad.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
El Entorno Léxico Global
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando un programa comienza a ejecutarse se crea un primer entorno:

                Entorno Global

Este contiene todas las variables y funciones declaradas fuera de
cualquier función.

Visualmente:

Entorno Global

{
    phrase
    user
    total
    sayHi()
}

↓

No tiene ningún entorno superior.

Su referencia externa es:

null

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿Cómo evolucionan las variables?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Supongamos este código:

*/

let phrase;

phrase = "Hello";

phrase = "Hi";

/*

Durante la ejecución ocurre aproximadamente esto:

1.

{
    phrase: <no inicializada>
}

↓

2.

{
    phrase: undefined
}

↓

3.

{
    phrase: "Hello"
}

↓

4.

{
    phrase: "Hi"
}

El entorno va actualizando las propiedades conforme el programa avanza.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Importante sobre let
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando JavaScript encuentra:

let phrase;

la variable NO aparece mágicamente en ese instante.

Antes de ejecutar el código, el motor ya conoce todas las variables
declaradas con let.

Inicialmente permanecen en un estado especial denominado:

"No inicializada"

Durante ese estado la variable existe internamente, pero todavía no
puede utilizarse.

Cuando llega su declaración, pasa a valer:

undefined

Y posteriormente puede recibir cualquier otro valor.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
El Entorno Léxico es un objeto interno
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Todo esto forma parte de la especificación oficial del lenguaje.

No podemos hacer algo como:

environment.message

porque dicho objeto NO existe dentro del código JavaScript.

Es únicamente un mecanismo interno utilizado por el motor para saber
dónde viven las variables.

Cada motor (V8, SpiderMonkey, JavaScriptCore, etc.) puede implementarlo
de forma distinta siempre que el comportamiento observable sea el mismo.

====================================================================
PASO 2. DECLARACIÓN DE FUNCIONES
====================================================================

Las funciones también son valores.

La diferencia es que una Function Declaration se inicializa
inmediatamente cuando se crea el entorno léxico.

Ejemplo:

*/

sayHi();

function sayHi() {
    console.log("Hola");
}

/*

Aunque la llamada aparece antes de la función, funciona correctamente.

¿Por qué?

Porque al crear el Entorno Global ocurre algo parecido a esto:

Entorno Global

{
    sayHi: function(){...}
}

La función ya está disponible desde el inicio de la ejecución.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Esto solo ocurre con Function Declarations
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No ocurre con expresiones de función.

Ejemplo:

*/

sayHello(); // Error

let sayHello = function () {
    console.log("Hola");
};

/*

Aquí la variable sigue las reglas normales de let.

No contendrá la función hasta llegar a esa línea.

====================================================================
PASO 3. ENTORNO LÉXICO INTERNO Y EXTERNO
====================================================================

Cada vez que una función es llamada se crea un NUEVO Entorno Léxico.

Ejemplo:

*/

let greeting = "Hello";

function say(name) {
    console.log(greeting + " " + name);
}

say("John");

/*

Cuando se ejecuta say("John") existen dos entornos.

Entorno Global

{
    greeting: "Hello"
    say: function
}

↓

Entorno de say()

{
    name: "John"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿Cómo encuentra una variable?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando JavaScript necesita una variable sigue siempre el mismo orden.

1.

¿Existe localmente?

↓

Sí → usarla.

↓

No

↓

2.

Ir al entorno externo.

↓

¿Existe allí?

↓

Sí → usarla.

↓

No

↓

3.

Seguir buscando hacia arriba.

↓

4.

Llegar al entorno global.

↓

5.

Si no existe...

→ ReferenceError (en modo estricto).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ejemplo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*/

let phrase2 = "Hello";

function speak(name) {
    console.log(name);
    console.log(phrase2);
}

speak("John");

/*

Búsqueda de variables:

name

↓

Se encuentra inmediatamente dentro de speak().

phrase2

↓

No existe localmente.

↓

Se sigue la referencia al entorno global.

↓

Se encuentra.

Este mecanismo recibe el nombre de:

Cadena de Entornos Léxicos
(Lexical Environment Chain)

====================================================================
PASO 4. DEVOLVER UNA FUNCIÓN
====================================================================

Volvamos al famoso ejemplo.

*/

function makeCounter() {
    let count = 0;

    return function () {
        return count++;
    };
}

let counter = makeCounter();

/*

Cuando makeCounter() comienza:

Entorno de makeCounter

{
    count: 0
}

Durante esa ejecución también se crea una función anidada.

*/

function makeCounterExample() {
    let count = 0;

    return function () {
        return count++;
    };
}

/*

Lo importante es que TODAS las funciones recuerdan el entorno donde fueron
creadas.

Internamente poseen una propiedad oculta denominada:

[[Environment]]

No podemos verla desde JavaScript.

Pero conceptualmente es algo parecido a:

Función

{
    código...
    [[Environment]] → referencia al entorno donde nació
}

Cuando hacemos:

*/

let myCounter = makeCounter();

/*

La función devuelta conserva un enlace hacia:

{
    count: 0
}

Aunque makeCounter() haya terminado.

Visualmente:

myCounter
│
│
▼

function()

↓

[[Environment]]

↓

{
    count: 0
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿Qué ocurre al ejecutar myCounter()?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Se crea un nuevo entorno para esa llamada.

Como allí no existe count...

JavaScript pregunta al entorno recordado mediante
[[Environment]].

Lo encuentra.

Lo incrementa.

Lo devuelve.

Primera llamada

count = 0

↓

devuelve 0

↓

count = 1

Segunda llamada

count = 1

↓

devuelve 1

↓

count = 2

Tercera llamada

count = 2

↓

devuelve 2

↓

count = 3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Una variable siempre vive en su propio entorno
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando modificamos:

count++

La variable cambia en el entorno donde fue creada.

No se copia.

No se recrea.

Siempre se modifica el mismo valor.

Por eso cada llamada conserva el contador anterior.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Idea fundamental
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cada función recuerda para siempre el lugar donde fue creada.

No importa:

- dónde se almacene.
- dónde se pase como argumento.
- dónde se ejecute.

Siempre buscará las variables siguiendo el entorno léxico que tenía
cuando nació.

Este comportamiento será la base del siguiente concepto:

Closure (Clausura).
*/

/*
=========================================================
CLOSURES (CLAUSURAS)
=========================================================

Después de comprender el funcionamiento de los Entornos Léxicos
(Lexical Environments), ahora podemos entender uno de los conceptos
más importantes de JavaScript: las Clausuras (Closures).

Este concepto aparece constantemente en entrevistas técnicas y es la
base de muchas características avanzadas del lenguaje.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿Qué es un Closure?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Una clausura (Closure) es una función que recuerda el entorno léxico
donde fue creada, incluso después de que la función exterior haya
terminado su ejecución.

Gracias a ello puede seguir accediendo a las variables externas que
existían en el momento de su creación.

En otras palabras:

Una función no solo almacena su código.

También recuerda el lugar donde nació.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ejemplo básico
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

function makeCounter() {
    let count = 0;

    return function () {
        return count++;
    };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2

/*

Aunque makeCounter() terminó hace tiempo, la variable count sigue
existiendo.

¿Por qué?

Porque la función devuelta conserva una referencia al entorno donde fue
creada.

Visualmente:

makeCounter()

{
    count: 0
}

↓

devuelve

function()

↓

[[Environment]]

↓

{ count: 0 }

Cada llamada utiliza exactamente la misma variable.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿Cómo recuerda una función sus variables?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Internamente, toda función posee una propiedad oculta llamada:

[[Environment]]

Esta propiedad almacena una referencia al Entorno Léxico donde la función
fue creada.

No importa si posteriormente la función:

- se guarda en una variable,
- se devuelve desde otra función,
- se pasa como argumento,
- se ejecuta mucho tiempo después.

Siempre utilizará el entorno que tenía cuando nació.

Por eso decimos que la función "recuerda" sus variables externas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Todas las funciones de JavaScript son Closures
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

En algunos lenguajes las clausuras deben activarse mediante una sintaxis
especial.

En JavaScript no.

Todas las funciones son clausuras de forma natural.

Cada función recuerda automáticamente su entorno mediante la propiedad
interna:

[[Environment]]

Existe únicamente una excepción importante:

new Function()

Esta función crea código dinámicamente y NO recuerda el entorno donde fue
creada.

Ese caso se estudia en un capítulo posterior.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿Cómo responder en una entrevista?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Una respuesta completa podría ser:

"Un Closure (Clausura) es una función que recuerda el entorno léxico
donde fue creada y puede seguir accediendo a sus variables externas
incluso después de que la función exterior haya terminado."

También es buena idea mencionar que:

- Todas las funciones de JavaScript son Closures.
- Internamente utilizan la referencia [[Environment]].
- Gracias a ello pueden acceder a variables externas.

=========================================================
RECOLECTOR DE BASURA (GARBAGE COLLECTOR)
=========================================================

Ahora surge una pregunta importante.

Si una función terminó...

¿Por qué sus variables siguen existiendo?

La respuesta está en el Recolector de Basura (Garbage Collector).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿Cuándo se libera la memoria?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Normalmente, cuando una función termina de ejecutarse, su Entorno Léxico
ya no es necesario.

Si ninguna referencia apunta hacia él, JavaScript elimina automáticamente
esa memoria.

Ejemplo:

*/

function greet() {
    let message = "Hola";

    console.log(message);
}

greet();

/*

Cuando greet() termina:

- desaparece message
- desaparece su entorno léxico
- la memoria puede recuperarse

Visualmente:

greet()

↓

{ message }

↓

Fin de la función

↓

Sin referencias

↓

Memoria liberada

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿Y cuándo NO se elimina?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Si una función interna sigue existiendo, entonces sigue apuntando hacia
su entorno mediante [[Environment]].

Mientras exista esa referencia, el entorno no puede eliminarse.

Ejemplo:

*/

function f() {
    let value = 123;

    return function () {
        console.log(value);
    };
}

let g = f();

/*

Visualmente:

g

↓

function()

↓

[[Environment]]

↓

{
    value: 123
}

Como g todavía existe, también debe existir value.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Varias funciones, varios entornos
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cada llamada crea un entorno completamente independiente.

*/

function randomValue() {
    let value = Math.random();

    return function () {
        console.log(value);
    };
}

let functions = [
    randomValue(),
    randomValue(),
    randomValue()
];

/*

Visualmente:

Función 1
↓

{ value: 0.53 }

Función 2
↓

{ value: 0.81 }

Función 3
↓

{ value: 0.27 }

Cada función recuerda únicamente su propio entorno.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿Cuándo desaparece definitivamente?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando ya no existe ninguna referencia hacia la función, tampoco existe
ninguna referencia hacia su entorno.

Entonces el recolector de basura puede eliminar todo.

Ejemplo:

*/

function createFunction() {
    let value = 123;

    return function () {
        console.log(value);
    };
}

let fn = createFunction();

/*

Mientras fn exista...

↓

value permanece en memoria.

Ahora eliminamos la referencia.

*/

fn = null;

/*

Visualmente:

Antes

fn

↓

function()

↓

[[Environment]]

↓

{ value }

Después

fn = null

↓

No existen referencias

↓

Se elimina la función.

↓

También se elimina su entorno léxico.

↓

value desaparece de la memoria.

El entorno léxico vive exactamente el mismo tiempo que alguna función
pueda seguir utilizándolo.

=========================================================
OPTIMIZACIONES DE LOS MOTORES JAVASCRIPT
=========================================================

Hasta ahora hemos visto el comportamiento "teórico".

En la práctica, los motores modernos como V8 (Chrome, Edge y Opera)
realizan numerosas optimizaciones para ahorrar memoria.

Si detectan que una variable nunca será utilizada por ninguna función,
pueden eliminarla antes de tiempo.

Todo esto ocurre internamente sin modificar el comportamiento del
programa.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Un efecto curioso durante la depuración
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

En V8 existe una consecuencia interesante.

Durante una sesión de depuración (Debugger), algunas variables que
teóricamente deberían existir pueden haber sido optimizadas.

Ejemplo:

*/

function example() {
    let value = Math.random();

    function inner() {
        debugger;
    }

    return inner;
}

let debugFunction = example();
debugFunction();

/*

Si se pausa la ejecución y en la consola escribimos:

value

es posible obtener:

ReferenceError

aunque, según la teoría, esa variable pertenezca al entorno léxico.

¿Por qué?

Porque V8 detectó que nunca iba a utilizarse y decidió eliminarla.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Otro efecto curioso
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*/

let value = "Surprise!";

function outer() {

    let value = "Closest value";

    function inner() {
        debugger;
    }

    return inner;
}

let test = outer();
test();

/*

En algunos casos, al inspeccionar "value" durante la depuración, puede
aparecer la variable global en lugar de la local.

Esto NO significa que JavaScript funcione incorrectamente.

Simplemente es consecuencia de las optimizaciones internas del motor.

Este comportamiento puede observarse principalmente en V8.

=========================================================
RESUMEN
=========================================================

- Un Closure (Clausura) es una función que recuerda el entorno léxico donde fue creada.

- Todas las funciones de JavaScript son Closures de forma natural.

- Internamente utilizan una referencia oculta llamada [[Environment]].

- Gracias a ella pueden acceder a variables externas incluso después de que la función exterior haya terminado.

- Un Entorno Léxico permanece en memoria mientras alguna función pueda seguir utilizándolo.

- Cuando desaparecen todas las referencias hacia esa función, el Recolector de Basura elimina 
    automáticamente tanto la función como su entorno léxico.

- Los motores modernos optimizan constantemente la memoria, por lo que durante la depuración 
    algunas variables pueden no aparecer aunque conceptualmente pertenezcan al entorno léxico.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IDEA CLAVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Una función no recuerda únicamente su código.

También recuerda el lugar donde fue creada.

Ese recuerdo del entorno léxico es precisamente lo que conocemos como
Closure (Clausura).
*/
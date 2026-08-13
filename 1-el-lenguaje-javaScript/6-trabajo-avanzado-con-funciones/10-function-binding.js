/*
===========================================================
FUNCIÓN bind(): VINCULACIÓN DE FUNCIONES
===========================================================

Uno de los problemas más comunes al trabajar con métodos
de objetos es la pérdida de `this`.

Esto ocurre especialmente cuando pasamos un método como
callback a otra función, por ejemplo:

    setTimeout()
    setInterval()
    addEventListener()
    map()
    filter()
    etc.


La idea principal de este capítulo:

    método de un objeto
        ↓
    se separa
        ↓
    pierde `this`
        ↓
    usamos `bind()`
        ↓
    `this` queda vinculado
*/


/*
===========================================================
1. PÉRDIDA DE `this`
===========================================================

Recordemos que `this` depende de cómo se llama una función.

Si hacemos:

    user.sayHi()

entonces `this` es `user`.

Pero si separamos el método:

    const f = user.sayHi;

y después hacemos:

    f()

ya no existe el objeto `user` a la izquierda del punto.

Por lo tanto, el contexto original se pierde.
*/


const user1 = {

firstName: "John",

sayHi() {
    console.log(`Hello, ${this.firstName}!`);
}
};


// Aquí `this` es `user1`.
user1.sayHi();
// Hello, John


// Ahora separamos el método del objeto.
const f1 = user1.sayHi;


// Aquí `f1` es simplemente una función independiente.
//
// Ya no estamos haciendo:
//
//     user1.sayHi()
//
// sino:
//
//     f1()
//
// Por lo tanto, `this` ya no es `user1`.


// f1();
// En modo estricto, `this` será undefined.
// En este ejemplo lo dejamos comentado para no detener el script.


/*
===========================================================
2. PÉRDIDA DE `this` CON setTimeout()
===========================================================

Un caso muy común es pasar un método directamente
a `setTimeout()`.

Por ejemplo:

    setTimeout(user.sayHi, 1000)


Conceptualmente estamos haciendo:

    const f = user.sayHi;

    setTimeout(f, 1000);


El método fue separado de `user`.

Por lo tanto, cuando el temporizador ejecute la función,
no lo hará como:

    user.sayHi()

sino como una llamada independiente.


IMPORTANTE:

No debemos pensar que `setTimeout` "borra" `this`.

El problema real es que el método fue pasado como una
referencia de función y posteriormente llamado sin el
objeto que originalmente estaba delante del punto.
*/


const user2 = {

    firstName: "John",

    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};


// Problema:
//
// setTimeout(user2.sayHi, 1000);
//
// El método pierde su contexto.


/*
===========================================================
3. SOLUCIÓN 1: USAR UN WRAPPER
===========================================================

Una solución sencilla consiste en crear una función
que llame al método mientras todavía tenemos acceso
al objeto.
*/


const user3 = {

    firstName: "John",

    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};


// El wrapper conserva la referencia a `user3`.
setTimeout(function () {

    user3.sayHi();

}, 1000);


/*
También podemos utilizar una función flecha:
*/


setTimeout(() => {

    user3.sayHi();

}, 1000);


/*
La función flecha no tiene un `this` propio relevante
en este caso.

Lo importante es que dentro del callback tenemos acceso
a la variable `user3` del entorno léxico.


===========================================================
4. PROBLEMA DEL WRAPPER
===========================================================

Aunque el wrapper funciona, existe una pequeña cuestión.

Supongamos que `user3` cambia antes de que se ejecute
el callback.

Recordemos que `setTimeout` no ejecuta inmediatamente
la función.

Hay un retraso.
*/


let user4 = {

    firstName: "John",

    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};


setTimeout(() => {

    user4.sayHi();

}, 1000);


// Durante ese segundo cambiamos la variable.
user4 = {

    firstName: "Alice",

    sayHi() {
    console.log(`Hello, ${this.firstName}!`);
    }
};


/*
Cuando el callback se ejecute, utilizará el valor actual
de `user4`.

Por lo tanto, podría imprimir:

    Hello, Alice!

y no:

    Hello, John!


El wrapper no guardó el objeto original.

Guardó acceso a la VARIABLE `user4`.

Esto nos lleva a otra solución:


    bind()


===========================================================
5. SOLUCIÓN 2: `bind()`
===========================================================

Las funciones tienen un método incorporado:

    Function.prototype.bind()


Su objetivo principal es crear una nueva función
con un `this` previamente establecido.

Sintaxis:

    const boundFunc = func.bind(context);


Por ejemplo:
*/


function sayHi() {

    console.log(this.firstName);
}


const user5 = {
    firstName: "John"
};


// Creamos una nueva función vinculada.
const boundSayHi = sayHi.bind(user5);


// `this` estará vinculado a `user5`.
boundSayHi();
// John


/*
Podemos pensar en:

    sayHi.bind(user5)


como:

    "Crea una nueva función que, cuando sea llamada,
    ejecute `sayHi` usando `user5` como `this`."


IMPORTANTE:

`bind()` NO ejecuta la función inmediatamente.

Esto:

    sayHi.bind(user5)


solo crea y devuelve una nueva función.


Para ejecutarla:

    boundSayHi()
*/


/*
===========================================================
6. `bind()` NO ES LO MISMO QUE LLAMAR A LA FUNCIÓN
===========================================================

Esto:

    sayHi.bind(user5)


NO es equivalente a:

    sayHi.call(user5)


Aunque ambos están relacionados.


`call()`:

    ejecuta inmediatamente la función.


`bind()`:

    crea una nueva función que podrá ejecutarse
    posteriormente con `this` fijado.


Ejemplo:
*/


function showName() {
    console.log(this.name);
}


const person1 = {
    name: "Yvnir"
};


// `call()` ejecuta inmediatamente.
showName.call(person1);


// `bind()` devuelve una nueva función.
const boundShowName = showName.bind(person1);


// La función se ejecuta posteriormente.
boundShowName();


/*
Podemos recordarlo así:

    call()
    ↓
    ejecuta ahora


    bind()
    ↓
    prepara una función para ejecutar después


===========================================================
7. `bind()` CON ARGUMENTOS
===========================================================

`bind()` también puede fijar argumentos.

Sintaxis:

    func.bind(thisValue, arg1, arg2, ...)


Por ejemplo:
*/


function greet(phrase) {

    console.log(
        `${phrase}, ${this.firstName}!`
    );
}


const user6 = {
    firstName: "John"
};


// `this` queda fijado a `user6`.
const boundGreet = greet.bind(user6);


// `"Hello"` sigue siendo un argumento normal.
boundGreet("Hello");
// Hello, John


/*
Entonces:

    greet.bind(user6)


fija:

    this = user6


Mientras que:

    boundGreet("Hello")


proporciona:

    phrase = "Hello"


Resultado:

    this.firstName -> "John"
    phrase         -> "Hello"


===========================================================
8. `bind()` CON MÉTODOS DE OBJETOS
===========================================================

Este es uno de los usos más importantes.

Tenemos:
*/


const user7 = {

    firstName: "John",

    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};


// Vinculamos el método al objeto.
const sayHiBound = user7.sayHi.bind(user7);


/*
Ahora `sayHiBound` puede ejecutarse independientemente
del objeto que originalmente contenía el método.
*/


sayHiBound();
// Hello, John


/*
También podemos pasarlo a `setTimeout()`:
*/


setTimeout(sayHiBound, 1000);


/*
Y `this` seguirá siendo `user7`.


===========================================================
9. ¿QUÉ PASA SI EL OBJETO CAMBIA?
===========================================================

Aquí aparece una diferencia importante respecto
al wrapper anterior.

`bind()` fija el valor que utilizará `this`.

Por ejemplo:
*/


let user8 = {

    firstName: "John",

    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};


// Creamos una función vinculada.
const boundSayHi8 = user8.sayHi.bind(user8);


// Cambiamos la variable `user8`.
user8 = {

    firstName: "Alice",

    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};


// `boundSayHi8` sigue utilizando el objeto original.
//
// Imprime:
//
// Hello, John!

boundSayHi8();


/*
¿Por qué?

Porque `bind(user8)` tomó la referencia al objeto
que tenía `user8` en ese momento.

Conceptualmente:

    user8
    │
    ▼
    { John }


    bind(user8)
    │
    ▼
    función vinculada
    │
    └── this -> objeto { John }


Después:

    user8
    │
    ▼
    { Alice }


Pero la función vinculada sigue teniendo:

    this -> objeto { John }


No sigue la variable `user8`.


===========================================================
10. `bind()` CON setTimeout()
===========================================================

Este es un patrón muy común:

    const boundMethod = object.method.bind(object);

    setTimeout(boundMethod, 1000);


Por ejemplo:
*/


const user9 = {

    firstName: "John",

    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};


const boundSayHi9 = user9.sayHi.bind(user9);


setTimeout(boundSayHi9, 1000);


/*
Esto es especialmente útil cuando una API espera
una función callback.


Ejemplos de APIs que frecuentemente reciben callbacks:

    setTimeout()
    setInterval()
    addEventListener()
    map()
    filter()
    reduce()


===========================================================
11. `bind()` CONSERVA LOS ARGUMENTOS
===========================================================

Supongamos:
*/


const user10 = {

    firstName: "John",

    say(phrase) {

        console.log(
        `${phrase}, ${this.firstName}!`
        );
    }
};


// `this` queda fijado a `user10`.
const sayBound = user10.say.bind(user10);


// `phrase` sigue siendo un argumento normal.
sayBound("Hello");
// Hello, John

sayBound("Goodbye");
// Goodbye, John


/*
El argumento no se queda fijado simplemente porque
usemos `bind()`.

Podemos decidir qué argumentos fijar.


===========================================================
12. `bind()` TAMBIÉN PUEDE FIJAR ARGUMENTOS
===========================================================

Recordemos:

    func.bind(thisValue, arg1, arg2, ...)


Por ejemplo:
*/


function multiply(a, b) {

  return a * b;
}


// Fijamos `a = 2`.
const double = multiply.bind(null, 2);


console.log(double(5));
// 10

console.log(double(10));
// 20


/*
Aquí:

    multiply(a, b)

se convierte en:

    double(b)


porque:

    a = 2


Conceptualmente:

    multiply.bind(null, 2)

significa:

    this = null
    a = 2


Cuando hacemos:

    double(5)

obtenemos:

    multiply(2, 5)


Resultado:

    10


===========================================================
13. ¿POR QUÉ USAMOS `null` EN ESTE EJEMPLO?
===========================================================

`multiply()` no utiliza `this`.

Por lo tanto, no nos importa qué valor tenga `this`.

Podemos utilizar `null` como primer argumento:

    multiply.bind(null, 2)


El primer argumento de `bind()` siempre corresponde
al `this` que queremos fijar.

Los siguientes corresponden a los argumentos.


Estructura:

    func.bind(thisValue, arg1, arg2, ...)
                │          │
                │          └── argumentos fijados
                │
                └──────────── this fijado


===========================================================
14. ARGUMENTOS PARCIALMENTE FIJADOS
===========================================================

Esta técnica se conoce como:

    partial application

o aplicación parcial.

Consiste en crear una nueva función a partir de otra
fijando algunos de sus argumentos.


Ejemplo:
*/


function sum(a, b) {
    return a + b;
}


// Fijamos `a = 10`.
const addTen = sum.bind(null, 10);


console.log(addTen(5));
// 15

console.log(addTen(20));
// 30

console.log(addTen(100));
// 110


/*
Original:

    sum(a, b)


Nueva función:

    addTen(b)


Internamente:

    sum(10, b)


===========================================================
15. DIFERENCIA ENTRE `bind()` Y UN WRAPPER
===========================================================

Podríamos hacer lo mismo con una función flecha:

    const addTen = (b) => sum(10, b);


Pero `bind()` permite hacerlo directamente:

    const addTen = sum.bind(null, 10);


Ambos pueden producir el mismo resultado.


Para vincular métodos, `bind()` además es especialmente
útil porque fija `this` explícitamente.


===========================================================
16. `bind()` ESPECIALMENTE ÚTIL CON CALLBACKS
===========================================================

Supongamos que tenemos:
*/


const user11 = {

    firstName: "John",

    sayHi() {
        console.log(
        `Hello, ${this.firstName}!`
        );
    }
};


// Incorrecto:
// setTimeout(user11.sayHi, 1000);


// Correcto:
setTimeout(
    user11.sayHi.bind(user11),
    1000
);


/*
Aquí hacemos todo en una sola expresión:

    user11.sayHi.bind(user11)


1. Obtenemos el método:

    user11.sayHi

2. Lo vinculamos:

    .bind(user11)

3. Obtenemos una nueva función.

4. La pasamos como callback:

    setTimeout(...)


===========================================================
17. WRAPPER VS bind()
===========================================================

Ambas soluciones pueden solucionar la pérdida de `this`.

WRAPPER:

    setTimeout(() => user.sayHi(), 1000)


BIND:

    setTimeout(user.sayHi.bind(user), 1000)


La principal diferencia del ejemplo anterior es
qué referencia queda capturada.


Con wrapper:

    () => user.sayHi()


la función busca la variable `user` cuando el callback
se ejecuta.


Con bind:

    user.sayHi.bind(user)


la nueva función queda vinculada al objeto que recibió
`bind()`.


Esto puede ser importante si la variable `user`
puede cambiar.


===========================================================
18. VINCULAR MUCHOS MÉTODOS
===========================================================

Si tenemos un objeto con muchos métodos y queremos
pasarlos frecuentemente como callbacks, podemos
vincularlos todos.


Por ejemplo:
*/


const user12 = {

    firstName: "John",

    sayHi() {
        console.log(`Hello, ${this.firstName}`);
    },

    sayBye() {
        console.log(`Bye, ${this.firstName}`);
    },

    greet() {
        console.log(`Greetings, ${this.firstName}`);
    }
};


/*
Podemos recorrer las propiedades del objeto.

Si encontramos una función, la vinculamos al propio objeto.
*/


for (const key in user12) {

    if (typeof user12[key] === "function") {

    user12[key] = user12[key].bind(user12);
    }
}


/*
Ahora todos los métodos están vinculados.


Esto significa que podemos hacer:

    const fn = user12.sayHi;
    fn();


sin perder `this`.
*/


const sayHi12 = user12.sayHi;

sayHi12();
// Hello, John


const sayBye12 = user12.sayBye;

sayBye12();
// Bye, John


/*
===========================================================
19. `bindAll`
===========================================================

Esta idea se conoce habitualmente como:

    bindAll

Consiste en vincular varios métodos de un objeto
al propio objeto.

Algunas bibliotecas proporcionan utilidades para hacer esto.

Por ejemplo, Lodash tiene:

    _.bindAll(object, methodNames)


La idea conceptual es:

    objeto
    │
    ├── método 1 -> bind(objeto)
    ├── método 2 -> bind(objeto)
    ├── método 3 -> bind(objeto)
    └── método 4 -> bind(objeto)


===========================================================
20. DETALLE IMPORTANTE: `bind()` DEVUELVE UNA NUEVA FUNCIÓN
===========================================================

`bind()` no modifica la función original.

Por ejemplo:
*/


function showName2() {
    console.log(this.name);
}


const person2 = {
    name: "John"
};


const boundShowName2 = showName2.bind(person2);


/*
Tenemos dos funciones:

    showName2
    boundShowName2


La original sigue siendo la misma.

La segunda es una nueva función vinculada.


Podemos comprobar que son diferentes:
*/


console.log(showName2 === boundShowName2);
// false


/*
Por lo tanto:

    bind()

no "transforma" la función original.

Crea otra función.


===========================================================
21. `bind()` PUEDE UTILIZARSE VARIAS VECES
===========================================================

Una vez que una función tiene su `this` vinculado,
intentar volver a vincularlo normalmente no cambia
ese `this`.

Ejemplo conceptual:
*/


function showName3() {
    console.log(this.name);
}


const personA = {
    name: "John"
};


const personB = {
    name: "Alice"
};


const boundA = showName3.bind(personA);


// Intentamos cambiar `this`.
const boundB = boundA.bind(personB);


boundB();
// John


/*
¿Por qué?

Porque `boundA` ya tiene `this` fijado a `personA`.

El segundo `bind()` no reemplaza ese `this`.


Por eso podemos pensar en:

    bind()

como una vinculación que no se puede sobrescribir
mediante otro `bind()` normal.


===========================================================
22. RESUMEN
===========================================================

`bind()` sirve principalmente para crear una nueva función
con un `this` previamente establecido.

Sintaxis:

    const boundFunc = func.bind(context);


Ejemplo:

    const boundSayHi = user.sayHi.bind(user);


Después:

    boundSayHi();


`this` seguirá siendo `user`.


-----------------------------------------------------------

`call()` vs `bind()`:

    func.call(user)

-> ejecuta inmediatamente.


    func.bind(user)

-> crea una nueva función vinculada.


-----------------------------------------------------------

`bind()` también puede fijar argumentos:

    func.bind(thisValue, arg1, arg2)


Ejemplo:

    function multiply(a, b) {
      return a * b;
    }

    const double = multiply.bind(null, 2);

    double(5); // 10


-----------------------------------------------------------

Uso típico:

    setTimeout(
    user.sayHi.bind(user),
    1000
    );


-----------------------------------------------------------

Wrapper:

    setTimeout(() => user.sayHi(), 1000)


Bind:

    setTimeout(user.sayHi.bind(user), 1000)


===========================================================
23. CONCEPTOS CLAVE PARA RECORDAR
===========================================================

1. `this` depende de cómo se invoca una función.

2. Al separar un método de su objeto podemos perder `this`.

3. Los callbacks son un caso muy común de pérdida de `this`.

4. `bind()` crea una nueva función.

5. `bind()` fija el valor de `this`.

6. La función original no es modificada.

7. Los argumentos posteriores a `this` también pueden quedar fijados mediante `bind()`.

8. `call()` ejecuta inmediatamente.

9. `bind()` prepara una función para ejecutarla después.

10. `bind()` es especialmente útil para pasar métodos
    como callbacks.

11. Un wrapper puede solucionar el problema, pero puede
    capturar una variable cuyo valor cambie posteriormente.

12. `bind()` vincula directamente el objeto utilizado
    como `this`.

13. `bind()` también permite realizar aplicación parcial
    de argumentos.


===========================================================
24. EJEMPLO FINAL
===========================================================

Este ejemplo reúne las ideas principales.
*/


const userFinal = {

    firstName: "John",

    say(phrase, punctuation) {

        console.log(
        `${phrase}, ${this.firstName}${punctuation}`
        );
    }
};


// Vinculamos `this` a userFinal.
const sayFinal = userFinal.say.bind(userFinal);


// Los argumentos siguen siendo variables.
sayFinal("Hello", "!");
// Hello, John!

sayFinal("Goodbye", "!");
// Goodbye, John!


/*
Ahora podemos pasar la función como callback
sin preocuparnos por perder `this`.
*/


setTimeout(
    () => sayFinal("See you", "!"),
    1000
);


/*
===========================================================
MAPA MENTAL
===========================================================

                MÉTODO
                │
                │ se separa
                ▼
            pierde `this`
                │
        ┌────────┴────────┐
        ▼                 ▼
        WRAPPER             bind()
        │                 │
        │                 │
        ▼                 ▼
    () => obj.method()   method.bind(obj)
        │                 │
        │                 │
        ▼                 ▼
    conserva acceso       fija `this`
    a la variable         al objeto
        │                 │
        └────────┬────────┘
                ▼
            callback seguro


La idea fundamental:

    bind()

    = crear una nueva función
    con `this` fijado.

*/

/*
===========================================================
FUNCIONES PARCIALES
===========================================================

Hasta ahora vimos que:

    func.bind(context)

permite crear una nueva función con un `this` fijo.

Pero `bind()` puede hacer algo más:

    func.bind(context, arg1, arg2, ...)

También puede fijar argumentos de la función.

Esto permite crear FUNCIONES PARCIALES.

-----------------------------------------------------------
1. ¿QUÉ ES UNA FUNCIÓN PARCIAL?
-----------------------------------------------------------

Una función parcial es una nueva función creada a partir de
otra función, pero con algunos de sus argumentos ya fijados.

Por ejemplo:

    mul(a, b)

Podemos fijar `a = 2` y crear:

    double(b)

Internamente sería:

    double(b) -> mul(2, b)

Esto nos permite crear funciones más específicas a partir de
funciones más generales.
*/


/*
===========================================================
2. SINTAXIS COMPLETA DE bind()
===========================================================

La sintaxis completa es:

    func.bind(context, arg1, arg2, ...)

Donde:

    context -> se convierte en `this`
    arg1... -> argumentos que quedan fijados

La función resultante conserva esos argumentos y espera los
argumentos restantes cuando sea llamada.
*/


/*
===========================================================
3. EJEMPLO BÁSICO
===========================================================
*/

function mul(a, b) {
  return a * b;
}

// Fijamos:
// this = null
// a = 2
//
// Los argumentos restantes se proporcionarán posteriormente.

let double = mul.bind(null, 2);

/*
La función `double` ahora se comporta como:

    double(b) {
        return mul(2, b);
    }

Por lo tanto:

    double(3) -> mul(2, 3)
    double(4) -> mul(2, 4)
    double(5) -> mul(2, 5)
*/

console.log(double(3)); // 6
console.log(double(4)); // 8
console.log(double(5)); // 10


/*
===========================================================
4. ¿POR QUÉ USAMOS null?
===========================================================

`bind()` siempre recibe primero el contexto que será utilizado
como `this`.

La sintaxis es:

    func.bind(context, ...args)

En nuestro ejemplo:

    mul.bind(null, 2)

Pero `mul()` no utiliza `this`.

Por lo tanto, no nos interesa el contexto y usamos `null`.

Conceptualmente:

    mul.bind(null, 2)
                    │
                    └── primer argumento fijado
            └────── this que no utilizamos


IMPORTANTE:

`null` aquí NO significa que el primer argumento de `mul`
sea null.

Significa que estamos indicando el contexto `this`.

El `2` es el primer argumento que estamos fijando.
*/


/*
===========================================================
5. CREAR OTRAS FUNCIONES PARCIALES
===========================================================
*/

function mul2(a, b) {
  return a * b;
}

// Fijamos a = 3
let triple = mul2.bind(null, 3);

console.log(triple(3)); // 9
console.log(triple(4)); // 12
console.log(triple(5)); // 15

/*
Internamente:

    triple(3)
        ↓
    mul2(3, 3)
        ↓
        9


    triple(4)
        ↓
    mul2(3, 4)
        ↓
        12
*/


/*
===========================================================
6. ¿QUÉ VENTAJAS TIENEN LAS FUNCIONES PARCIALES?
===========================================================

Podemos crear funciones con nombres más descriptivos.

En lugar de escribir:

    mul(2, value)

constantemente, podemos crear:

    double(value)

Y después simplemente:

    double(value)

Esto puede hacer que el código sea más fácil de leer.

También evita repetir argumentos que siempre tienen el mismo
valor.
*/


/*
===========================================================
7. EJEMPLO MÁS REALISTA
===========================================================

Supongamos que tenemos una función genérica:

    send(from, to, text)

La función puede enviar un mensaje desde cualquier usuario
hacia cualquier destinatario.
*/

function send(from, to, text) {
    console.log(`De: ${from}`);
    console.log(`Para: ${to}`);
    console.log(`Mensaje: ${text}`);
}

send("John", "Alice", "Hola");

send("John", "Bob", "¿Cómo estás?");

/*
Supongamos que estamos trabajando dentro de una aplicación
donde el remitente siempre será "John".

Podemos crear una función parcial.
*/

let sendFromJohn = send.bind(null, "John");

/*
Ahora:

    sendFromJohn(to, text)

equivale a:

    send("John", to, text)
*/

sendFromJohn("Alice", "Hola");
sendFromJohn("Bob", "¿Cómo estás?");


/*
===========================================================
8. APLICACIÓN PARCIAL
===========================================================

La idea general es:

    función original:
    
    f(a, b, c)

Después fijamos algunos argumentos:

    f(10, b, c)

Y obtenemos una función nueva:

    g(b, c)

Por ejemplo:

    function sum(a, b, c) {
    return a + b + c;
    }

Podemos fijar `a`:
*/

function sum(a, b, c) {
    return a + b + c;
}

let add10 = sum.bind(null, 10);

/*
Ahora:

    add10(b, c)

equivale a:

    sum(10, b, c)
*/

console.log(add10(2, 3)); // 15
console.log(add10(5, 5)); // 20


/*
===========================================================
9. SE PUEDEN FIJAR VARIOS ARGUMENTOS
===========================================================

No estamos limitados a un solo argumento.

Podemos hacer:

    func.bind(context, arg1, arg2, arg3)

Por ejemplo:
*/

function calculate(a, b, c) {
  return a + b * c;
}

// Fijamos a = 10
// Fijamos b = 2
//
// c seguirá siendo proporcionado posteriormente.

let calculateFixed = calculate.bind(null, 10, 2);

console.log(calculateFixed(5)); // 20

/*
Equivale a:

    calculateFixed(5)

        ↓

    calculate(10, 2, 5)

        ↓

    10 + 2 * 5

        ↓

    20
*/


/*
===========================================================
10. PARCIAL SIN CONTEXTO
===========================================================

Hasta ahora usamos:

    bind(context, ...args)

Pero ¿qué ocurre si queremos fijar argumentos SIN fijar
`this`?

Por ejemplo, tenemos un método de un objeto:

    user.say(time, phrase)

Y queremos crear:

    user.sayNow(phrase)

donde `time` quede fijado, pero `this` siga siendo `user`.

El problema es que:

    bind()

siempre recibe primero el contexto.

No podemos hacer algo como:

    user.say.bind(??? , time)

porque necesitamos conservar el `this` que tenga la llamada
posteriormente.
*/


/*
===========================================================
11. CREANDO NUESTRA PROPIA FUNCIÓN partial()
===========================================================

Podemos crear una función que solamente fije argumentos y
conserve el `this`.
*/

function partial(func, ...argsBound) {

/*
`argsBound` contiene los argumentos que queremos fijar.

Por ejemplo:

    partial(user.say, "10:00")

entonces:

    argsBound = ["10:00"]
  */

return function(...args) {

    /*
    `args` contiene los argumentos proporcionados cuando
    llamamos posteriormente a la función parcial.

    Por ejemplo:

        user.sayNow("Hello")

    entonces:

        args = ["Hello"]
    */

    /*
    Usamos `call()` para ejecutar la función original.

    `this` se conserva mediante:

        func.call(this, ...)

    Después pasamos:

        ...argsBound

    y finalmente:

        ...args
    */

    return func.call(this, ...argsBound, ...args);
    };
}


/*
===========================================================
12. EJEMPLO DE partial()
===========================================================
*/

let user = {

    firstName: "John",

    say(time, phrase) {

    console.log(
        `[${time}] ${this.firstName}: ${phrase}!`
        );
    }
};

/*
Queremos crear un nuevo método:

    user.sayNow("Hello")

que internamente haga:

    user.say("10:30", "Hello")

Creamos una función parcial fijando solamente `time`.
*/

user.sayNow = partial(
    user.say,
    "10:30"
);

/*
Ahora:

    user.sayNow("Hello")

hace internamente:

    func.call(
        this,
        "10:30",
        "Hello"
    )

Como `sayNow()` se ejecuta como:

    user.sayNow()

el `this` será:

    user
*/

user.sayNow("Hello");
// [10:30] John: Hello!


/*
===========================================================
13. ¿CÓMO FUNCIONA partial()?
===========================================================

Tenemos:

    partial(user.say, "10:30")

Aquí:

    func      = user.say
    argsBound = ["10:30"]

La función devuelve:

    function(...args) {
        return func.call(
            this,
            ...argsBound,
            ...args
        );
    }


Después hacemos:

    user.sayNow("Hello")

Entonces:

    this      = user
    argsBound = ["10:30"]
    args      = ["Hello"]


Finalmente:

    func.call(
        user,
        "10:30",
        "Hello"
    )

Es equivalente a:

    user.say("10:30", "Hello")
*/


/*
===========================================================
14. ¿POR QUÉ NO USAMOS bind() DIRECTAMENTE?
===========================================================

Podríamos intentar:

    user.say.bind(user, "10:30")

Esto también funciona:

    let sayNow = user.say.bind(user, "10:30");

Pero aquí estamos fijando DOS cosas:

    this = user
    time = "10:30"

Nuestra función `partial()` permite fijar solamente los
argumentos y dejar que `this` sea determinado cuando la función
sea llamada.
*/


/*
===========================================================
15. DIFERENCIA ENTRE bind() Y partial()
===========================================================

bind():

    func.bind(context, ...args)

Puede fijar:

    1. `this`
    2. argumentos iniciales

Por ejemplo:

    user.say.bind(user, "10:30")


Nuestra `partial()`:

    partial(func, ...args)

fija:

    1. argumentos iniciales

pero conserva el `this` de la llamada.

Por ejemplo:

    partial(user.say, "10:30")


RESUMEN:

    bind()
    ┌──────────────────────────────┐
    │ fija this                    │
    │ fija argumentos opcionales   │
    └──────────────────────────────┘

    partial()
    ┌──────────────────────────────┐
    │ conserva this                │
    │ fija argumentos              │
    └──────────────────────────────┘
*/


/*
===========================================================
16. EJEMPLO COMPLETO
===========================================================
*/

let account = {

    name: "Yvnir",

    send(time, message) {

        console.log(
        `[${time}] ${this.name}: ${message}`
        );
    }
};

// Creamos una versión que siempre utiliza la misma hora.
account.sendNow = partial(
    account.send,
    "20:30"
);

account.sendNow("Hola");
// [20:30] Yvnir: Hola

account.sendNow("¿Cómo estás?");
// [20:30] Yvnir: ¿Cómo estás?


/*
===========================================================
17. IDEAS IMPORTANTES
===========================================================

1. `bind()` crea una nueva función.

2. `bind()` puede fijar `this`.

        func.bind(context)

3. `bind()` también puede fijar argumentos.

        func.bind(context, arg1, arg2)

4. Fijar argumentos permite crear funciones parciales.

        mul(a, b)
            ↓
        double(b)

        donde:

        double(b) = mul(2, b)

5. Una función parcial es una versión más específica de una función más general.

6. `bind()` siempre recibe primero el contexto.

        func.bind(context, ...args)

7. Si queremos fijar argumentos sin fijar `this`, podemos crear nuestra propia función `partial()`.

        partial(func, ...args)

8. `partial()` puede conservar el contexto usando:

        func.call(this, ...argsBound, ...args)

9. La aplicación parcial es útil cuando ciertos argumentos se repiten constantemente.

10. `bind()` y la aplicación parcial están relacionados,
    pero no son exactamente lo mismo.
*/


/*
===========================================================
RESUMEN FINAL
===========================================================

                    bind()
                        │
            ┌───────────┴───────────┐
            │                       │
        fija this            puede fijar
                                argumentos
            │                       │
            └───────────┬───────────┘
                        │
                nueva función
                        │
                        ▼
                función parcial


Ejemplo:

    function mul(a, b) {
      return a * b;
    }

    let double = mul.bind(null, 2);

    double(5);

Es equivalente conceptualmente a:

    mul(2, 5);


Y si queremos fijar argumentos sin fijar `this`:

    function partial(func, ...argsBound) {
        return function(...args) {
            return func.call(
            this,
            ...argsBound,
            ...args
            );
        };
    }


La idea central:

    bind()
    -> fija `this` y opcionalmente argumentos.

    partial()
    -> fija argumentos, pero conserva el `this`.

===========================================================
*/
/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                    OBJETO DE FUNCIÓN Y NFE                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝

En JavaScript, una función es un valor.

Esto significa que podemos:

- Guardarla en una variable.
- Pasarla como argumento.
- Retornarla desde otra función.
- Copiarla a otra variable.
- Agregarle propiedades.
- Eliminar sus propiedades.
- Invocarla.

Además, las funciones son objetos.

Podemos imaginar una función como un:

    "objeto de acción invocable"

Es un objeto porque puede tener propiedades y métodos,
pero también es invocable porque podemos utilizar () para ejecutarla.

Ejemplo:

    function sayHi() {
        alert("Hi");
    }

    sayHi(); // Invocamos la función.

    sayHi.someProperty = 123; // También podemos agregarle una propiedad.

*/


// ═════════════════════════════════════════════════════════════════════════════
// 1. LA PROPIEDAD "name"
// ═════════════════════════════════════════════════════════════════════════════

/*
Las funciones tienen una propiedad incorporada llamada "name".

Esta propiedad contiene el nombre de la función.
*/

function sayHi() {
    alert("Hi");
}

console.log(sayHi.name); // "sayHi"


/*
──────────────────────────────────────────────────────────────────────────────
ASIGNACIÓN AUTOMÁTICA DEL NOMBRE
──────────────────────────────────────────────────────────────────────────────

JavaScript puede deducir automáticamente el nombre de una función
a partir del contexto en el que se encuentra.

Por ejemplo:
*/

let sayHello = function () {
    alert("Hello");
};

console.log(sayHello.name); // "sayHello"


/*
Aunque la función no tenga un nombre escrito explícitamente:

    function () { ... }

JavaScript puede deducir que su nombre es "sayHello"
porque fue asignada a esa variable.


Esto se conoce como:

    "nombre contextual"

Es decir, JavaScript utiliza el contexto de la asignación
para determinar el nombre de la función.
*/


// También funciona con parámetros predeterminados:

function test(sayHi = function () {}) {
    console.log(sayHi.name);
}

test(); // "sayHi"


/*
──────────────────────────────────────────────────────────────────────────────
NOMBRES EN MÉTODOS DE OBJETOS
──────────────────────────────────────────────────────────────────────────────

Los métodos de los objetos también tienen la propiedad "name".
*/

let user = {

    sayHi() {
        // Método definido mediante sintaxis abreviada.
    },

    sayBye: function () {
        // Función asignada a una propiedad.
    }

};

console.log(user.sayHi.name);  // "sayHi"
console.log(user.sayBye.name); // "sayBye"


/*
──────────────────────────────────────────────────────────────────────────────
NO SIEMPRE SE PUEDE DEDUCIR EL NOMBRE
──────────────────────────────────────────────────────────────────────────────

Hay situaciones donde JavaScript no puede determinar correctamente
el nombre de una función.

Por ejemplo, una función anónima dentro de un array:
*/

let arr = [
    function () {}
];

console.log(arr[0].name); // ""


/*
Aquí el motor de JavaScript no tiene suficiente información
para determinar cuál debería ser el nombre de la función.

Por eso:

    arr[0].name

devuelve una cadena vacía.

En la práctica, la mayoría de las funciones sí tienen un nombre.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 2. LA PROPIEDAD "length"
// ═════════════════════════════════════════════════════════════════════════════

/*
Las funciones también tienen una propiedad llamada "length".

IMPORTANTE:

    function.length

devuelve la cantidad de parámetros que tiene la función.

Ejemplo:
*/

function f1(a) {}

function f2(a, b) {}

console.log(f1.length); // 1
console.log(f2.length); // 2


/*
──────────────────────────────────────────────────────────────────────────────
PARÁMETROS REST (...)
──────────────────────────────────────────────────────────────────────────────

Los parámetros rest NO se cuentan en "length".
*/

function many(a, b, ...more) {}

console.log(many.length); // 2


/*
¿Por qué?

La función tiene:

    a
    b
    ...more

Pero "length" solo cuenta los parámetros antes del primer
parámetro rest.

Por eso:

    many.length === 2
*/


// ═════════════════════════════════════════════════════════════════════════════
// 3. USO DE "length" PARA INTROSPECCIÓN
// ═════════════════════════════════════════════════════════════════════════════

/*
La propiedad "length" puede utilizarse para realizar
introspección.

La introspección consiste, en términos simples, en que un programa
puede examinar ciertas características de los valores que recibe.

Por ejemplo, podemos revisar cuántos parámetros espera una función.

Vamos a analizar este ejemplo:
*/


function ask(question, ...handlers) {

    // Mostramos la pregunta y obtenemos una respuesta.
    let isYes = confirm(question);

    // Recorremos todos los handlers recibidos.
    for (let handler of handlers) {

        /*
        Si el handler no tiene parámetros:

            handler.length === 0

        significa que esperamos una función que solamente
        se ejecute cuando la respuesta sea positiva.
        */

        if (handler.length === 0) {

            if (isYes) {
                handler();
            }

        }

        /*
        Si el handler tiene uno o más parámetros,
        asumimos que quiere recibir la respuesta.
        */

        else {
            handler(isYes);
        }
    }
}


/*
Podemos utilizar "ask" de esta manera:
*/

ask(
    "Question?",

    // Este handler no recibe argumentos.
    () => alert("You said yes"),

    // Este handler recibe la respuesta.
    result => alert(result)
);


/*
Si el usuario responde:

    YES

se ejecutarán ambos handlers.

Si responde:

    NO

solo se ejecutará el segundo handler.


¿Por qué?

Primer handler:

    () => alert("You said yes")

Tiene:

    length === 0

Por lo tanto, solamente se ejecuta si la respuesta es positiva.


Segundo handler:

    result => alert(result)

Tiene:

    length === 1

Por lo tanto, recibe "isYes" independientemente
de si la respuesta fue positiva o negativa.


Este es un ejemplo de polimorfismo:

La misma función "ask" puede trabajar de manera diferente
dependiendo de las características del handler que recibe.

IMPORTANTE:

Usar "function.length" de esta manera es posible,
pero no es una técnica que debamos utilizar constantemente.

El ejemplo sirve principalmente para entender que las funciones
son objetos y que podemos inspeccionar algunas de sus propiedades.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 4. PROPIEDADES PERSONALIZADAS
// ═════════════════════════════════════════════════════════════════════════════

/*
Como las funciones son objetos, podemos agregarles nuestras
propias propiedades.

Por ejemplo, podemos crear un contador de llamadas.
*/


function sayHiCounter() {

    alert("Hi");

    // Incrementamos la propiedad "counter".
    sayHiCounter.counter++;
}

// Creamos nuestra propiedad personalizada.
sayHiCounter.counter = 0;


// Ejecutamos la función dos veces.
sayHiCounter();
sayHiCounter();


// Consultamos cuántas veces fue ejecutada.
console.log(`Called ${sayHiCounter.counter} times`);

// "Called 2 times"


/*
──────────────────────────────────────────────────────────────────────────────
IMPORTANTE: UNA PROPIEDAD NO ES UNA VARIABLE
──────────────────────────────────────────────────────────────────────────────

Esto:

    sayHiCounter.counter = 0;

NO crea una variable local llamada "counter".

La propiedad:

    sayHiCounter.counter

y una variable:

    let counter

son conceptos diferentes.

Por ejemplo:
*/


function example() {

    let counter = 0;

    console.log(counter);
}

example();


/*
Aquí "counter" es una variable local.

En cambio:
*/

function example2() {}

example2.counter = 0;


/*
Aquí "counter" es una propiedad del objeto función.

Podemos visualizarlo así:

    example2
        │
        └── counter: 0


La función es un objeto y "counter" es una propiedad de ese objeto.

Las variables locales pertenecen al entorno léxico de la función.

Las propiedades pertenecen al objeto función.

Son cosas diferentes.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 5. PROPIEDADES DE FUNCIÓN VS CIERRES
// ═════════════════════════════════════════════════════════════════════════════

/*
Las propiedades de una función pueden utilizarse en algunos casos
como alternativa a un closure (cierre).

Primero recordemos cómo funciona un contador utilizando un closure.
*/


function makeCounterClosure() {

    // "count" pertenece al entorno léxico de makeCounterClosure.
    let count = 0;

    function counter() {
        return count++;
    }

    return counter;
}


let counterClosure = makeCounterClosure();

console.log(counterClosure()); // 0
console.log(counterClosure()); // 1
console.log(counterClosure()); // 2


/*
La función "counter" puede seguir accediendo a "count"
aunque makeCounterClosure() ya haya terminado.

Eso es un closure.


Ahora podemos implementar algo parecido utilizando
una propiedad de la función.
*/


function makeCounter() {

    function counter() {

        // Accedemos a la propiedad "count" de la función.
        return counter.count++;
    }

    // Creamos una propiedad personalizada.
    counter.count = 0;

    // Retornamos la función.
    return counter;
}


let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2


/*
Aquí "count" NO es una variable externa.

Es una propiedad de la función:

    counter.count


Podemos imaginarlo así:

    counter
        │
        └── count: 3
*/


// ═════════════════════════════════════════════════════════════════════════════
// 6. DIFERENCIA ENTRE CLOSURE Y PROPIEDAD
// ═════════════════════════════════════════════════════════════════════════════

/*
Una diferencia importante es el acceso desde el exterior.

Con un closure:
*/

function makeCounterPrivate() {

    let count = 0;

    function counter() {
        return count++;
    }

    return counter;
}

let privateCounter = makeCounterPrivate();

console.log(privateCounter()); // 0
console.log(privateCounter()); // 1


/*
No podemos hacer directamente:

    privateCounter.count

porque "count" es una variable local del closure,
no una propiedad de la función.

Esto protege el valor de modificaciones externas.


En cambio, cuando usamos una propiedad:
*/

function makeCounterPublic() {

    function counter() {
        return counter.count++;
    }

    counter.count = 0;

    return counter;
}

let publicCounter = makeCounterPublic();

console.log(publicCounter()); // 0
console.log(publicCounter()); // 1


/*
Aquí sí podemos modificar "count" desde fuera:
*/

publicCounter.count = 10;

console.log(publicCounter()); // 10


/*
Por lo tanto:

──────────────────────────────────────────────────────────────────────────────
CLOSURE
──────────────────────────────────────────────────────────────────────────────

    let count = 0;

    + El valor está oculto para el código externo.
    + Solo las funciones que tienen acceso al closure pueden modificarlo.
    + Es útil cuando queremos encapsulación.


──────────────────────────────────────────────────────────────────────────────
PROPIEDAD DE FUNCIÓN
──────────────────────────────────────────────────────────────────────────────

    counter.count = 0;

    + El valor pertenece al objeto función.
    + Podemos acceder a él desde fuera.
    + Es útil cuando queremos que el estado sea accesible.

La elección depende de lo que necesitemos.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 7. EXPRESIÓN DE FUNCIÓN CON NOMBRE (NFE)
// ═════════════════════════════════════════════════════════════════════════════

/*
NFE significa:

    Named Function Expression

En español:

    Expresión de función con nombre.


Primero tenemos una expresión de función normal:
*/

let sayHi = function (who) {

    alert(`Hello, ${who}`);

};


/*
La función anterior no tiene un nombre interno.

Ahora agregamos un nombre:
*/

let sayHiNFE = function func(who) {

    alert(`Hello, ${who}`);

};


/*
Aquí:

    function func(who)

"func" es el nombre interno de la función.


IMPORTANTE:

Esto sigue siendo una EXPRESIÓN de función.

No se convierte en una declaración de función.

La diferencia es que estamos asignando una expresión:

    let sayHiNFE = function func(who) { ... }


El nombre "func" tiene un propósito especial.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 8. EL NOMBRE INTERNO DE UNA NFE
// ═════════════════════════════════════════════════════════════════════════════

/*
El nombre interno de una NFE tiene dos características principales:

1. La función puede referenciarse a sí misma utilizando ese nombre.
2. Ese nombre no está disponible fuera de la función.
*/


let greet = function func(who) {

    if (who) {

        alert(`Hello, ${who}`);

    } else {

        // La función puede llamarse a sí misma.
        func("Guest");
    }
};


greet(); // Hello, Guest


/*
Pero "func" no existe fuera de la función:
*/

// func(); // ❌ ReferenceError


/*
Por lo tanto:

    greet

es el nombre que tenemos fuera.

    func

es el nombre interno de la función.


Podemos visualizarlo así:

    EXTERIOR

    greet ──────────────┐
                        │
                        ▼
                ┌─────────────┐
                │   función   │
                │             │
                │ func()      │ ← nombre interno
                └─────────────┘
*/


// ═════════════════════════════════════════════════════════════════════════════
// 9. ¿POR QUÉ NO UTILIZAR SIMPLEMENTE "greet()"?
// ═════════════════════════════════════════════════════════════════════════════

/*
Podríamos escribir:
*/


let hello = function (who) {

    if (who) {

        alert(`Hello, ${who}`);

    } else {

        hello("Guest");
    }
};


/*
Esto funciona normalmente:
*/

hello(); // Hello, Guest


/*
Pero existe un problema.

La función utiliza la variable externa "hello"
para llamarse a sí misma.

Por lo tanto, si cambiamos esa variable,
la función puede dejar de funcionar correctamente.
*/


let sayHiAgain = function (who) {

    if (who) {

        alert(`Hello, ${who}`);

    } else {

        // La función busca "sayHiAgain"
        // en su entorno externo.
        sayHiAgain("Guest");
    }
};


// Copiamos la función a otra variable.
let welcome = sayHiAgain;


// Eliminamos la referencia original.
sayHiAgain = null;


// Ahora intentamos ejecutar la copia.
welcome();


/*
Esto produce un error.

¿Por qué?

Inicialmente:

    sayHiAgain ───────► función


Después:

    welcome ──────────► función
    sayHiAgain ───────► null


Cuando "welcome()" ejecuta:

    sayHiAgain("Guest")

la variable externa "sayHiAgain" contiene:

    null

Por lo tanto:

    null("Guest")

es inválido.


Este es el problema que resuelve una NFE.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 10. SOLUCIÓN CON NFE
// ═════════════════════════════════════════════════════════════════════════════

/*
Creamos una expresión de función con nombre:
*/


let sayHiSafe = function func(who) {

    if (who) {

        alert(`Hello, ${who}`);

    } else {

        // "func" siempre hace referencia
        // a la función actual.
        func("Guest");
    }
};


// Copiamos la función.
let welcomeSafe = sayHiSafe;


// Eliminamos la referencia externa original.
sayHiSafe = null;


// Ejecutamos la copia.
welcomeSafe(); // Hello, Guest


/*
Ahora sí funciona.


¿Por qué?

Porque:

    func

es un nombre interno de la función.

No depende de la variable externa:

    sayHiSafe


Aunque hagamos:

    sayHiSafe = null

el nombre interno:

    func

continúa apuntando a la función actual.


Esto hace que la autorreferencia sea mucho más segura.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 11. COMPARACIÓN
// ═════════════════════════════════════════════════════════════════════════════

/*
SIN NFE:

    let sayHi = function () {

        if (...) {
            ...
        } else {
            sayHi();
        }
    };


El problema:

    La función depende de la variable externa "sayHi".


CON NFE:

    let sayHi = function func() {

        if (...) {
            ...
        } else {
            func();
        }
    };


Ventaja:

    La función se referencia mediante su nombre interno "func".


──────────────────────────────────────────────────────────────────────────────

SIN NFE:

    sayHi ─────────► función


Si posteriormente:

    sayHi = null

la función pierde esa referencia externa para poder llamarse a sí misma.


CON NFE:

    sayHi ─────────► función
                        ▲
                        │
                        func

"func" es un nombre interno de la propia función.


Por eso:

    sayHi = null

no afecta a la autorreferencia interna.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 12. NFE Y DECLARACIONES DE FUNCIÓN
// ═════════════════════════════════════════════════════════════════════════════

/*
El nombre interno de una NFE solo existe en:

    Named Function Expressions


Es decir:

    let sayHi = function func() {
        ...
    };


No existe una sintaxis equivalente para agregar
un nombre interno adicional a una declaración de función.

Por ejemplo:
*/


function sayHelloDeclaration() {

    // Aquí la función puede referenciarse
    // utilizando su propio nombre.
    sayHelloDeclaration();
}


/*
Pero no podemos escribir algo como:

    function sayHelloDeclaration func() {
        ...
    }

Eso no existe en JavaScript.


Por eso, cuando necesitamos específicamente
un nombre interno confiable para una función,
podemos convertir una declaración de función
en una expresión de función con nombre.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 13. RESUMEN
// ═════════════════════════════════════════════════════════════════════════════

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ OBJETOS DE FUNCIÓN                                                          │
└─────────────────────────────────────────────────────────────────────────────┘

Las funciones son objetos invocables.

Podemos:

    function sayHi() {}

    sayHi();
    sayHi.someProperty = 123;


┌─────────────────────────────────────────────────────────────────────────────┐
│ name                                                                        │
└─────────────────────────────────────────────────────────────────────────────┘

Devuelve el nombre de la función.

    function sayHi() {}

    sayHi.name; // "sayHi"


JavaScript también puede inferir nombres:

    let hello = function () {};

    hello.name; // "hello"


┌─────────────────────────────────────────────────────────────────────────────┐
│ length                                                                      │
└─────────────────────────────────────────────────────────────────────────────┘

Indica cuántos parámetros tiene una función.

    function f(a, b) {}

    f.length; // 2


Los parámetros rest no se cuentan:

    function f(a, b, ...rest) {}

    f.length; // 2


┌─────────────────────────────────────────────────────────────────────────────┐
│ PROPIEDADES PERSONALIZADAS                                                  │
└─────────────────────────────────────────────────────────────────────────────┘

Podemos agregar nuestras propias propiedades:

    function counter() {}

    counter.count = 0;


Una propiedad de función NO es una variable local.

    counter.count

y:

    let count

son cosas diferentes.


┌─────────────────────────────────────────────────────────────────────────────┐
│ PROPIEDAD VS CLOSURE                                                        │
└─────────────────────────────────────────────────────────────────────────────┘

Closure:

    function makeCounter() {

        let count = 0;

        return function () {
            return count++;
        };
    }


El estado queda oculto.


Propiedad:

    function makeCounter() {

        function counter() {
            return counter.count++;
        }

        counter.count = 0;

        return counter;
    }


El estado puede ser accedido desde fuera.


┌─────────────────────────────────────────────────────────────────────────────┐
│ NFE                                                                         │
└─────────────────────────────────────────────────────────────────────────────┘

NFE = Named Function Expression

Ejemplo:

    let sayHi = function func() {
        ...
    };


"func":

    - Es el nombre interno de la función.
    - Puede utilizarse para que la función se llame a sí misma.
    - No existe fuera de la función.
    - No depende de la variable externa "sayHi".


Esto hace que las autorreferencias sean más confiables.


┌─────────────────────────────────────────────────────────────────────────────┐
│ IDEA PRINCIPAL                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

Una función en JavaScript no es solamente código que podemos ejecutar.

También es un objeto.

Por eso puede tener:

    function
        │
        ├── name
        ├── length
        ├── propiedades personalizadas
        └── comportamiento invocable


Y gracias a esto podemos tratar las funciones
como valores y como objetos al mismo tiempo.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 14. EJEMPLO FINAL INTEGRADOR
// ═════════════════════════════════════════════════════════════════════════════

/*
Este ejemplo combina varios conceptos del capítulo:

- Funciones como objetos.
- Propiedad "name".
- Propiedad "length".
- Propiedad personalizada.
- NFE.
*/


let counterFunction = function counter() {

    // La función puede acceder a su propio nombre interno.
    return counterFunction.count++;
};


// Propiedad personalizada.
counterFunction.count = 0;


// Propiedad "name".
console.log(counterFunction.name);
// "counterFunction" o el nombre inferido por el contexto,
// dependiendo de cómo el motor determine el nombre contextual.


// Propiedad "length".
console.log(counterFunction.length);
// 0


// Utilizamos nuestra propiedad personalizada.
console.log(counterFunction()); // 0
console.log(counterFunction()); // 1
console.log(counterFunction()); // 2

console.log(counterFunction.count); // 3


/*
NOTA:

Para aprovechar específicamente la ventaja de una NFE,
la autorreferencia debe hacerse mediante el nombre interno:

    function counter() {
        return counter.count++;
    }

y no mediante una variable externa.

Por ejemplo:
*/


let reliableCounter = function counter() {

    return counter.count++;
};

reliableCounter.count = 0;

let anotherReference = reliableCounter;

reliableCounter = null;


// Sigue funcionando porque "counter" es el nombre interno.
console.log(anotherReference()); // 0
console.log(anotherReference()); // 1


/*
Este es precisamente uno de los principales motivos
para utilizar una Named Function Expression (NFE).
*/
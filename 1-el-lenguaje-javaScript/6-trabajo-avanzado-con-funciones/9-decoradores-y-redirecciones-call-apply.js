/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                 DECORADORES Y REDIRECCIONES: call / apply                    ║
╚══════════════════════════════════════════════════════════════════════════════╝

JavaScript trata las funciones como valores.

Por eso podemos:

    - Pasarlas como argumentos.
    - Guardarlas en variables.
    - Devolverlas desde otras funciones.
    - Agregarles propiedades.
    - Envolverlas con otras funciones.
    - Cambiar el contexto "this" con call() y apply().

En este capítulo veremos principalmente:

    1. Decoradores.
    2. Wrappers (envoltorios).
    3. Caché.
    4. El problema de "this".
    5. Function.prototype.call().
    6. Function.prototype.apply().


──────────────────────────────────────────────────────────────────────────────
IDEA GENERAL
──────────────────────────────────────────────────────────────────────────────

Un DECORADOR es una función que recibe otra función
y devuelve una nueva función que modifica o amplía
su comportamiento.

Podemos imaginarlo así:

                función original
                        │
                        ▼
                ┌──────────────┐
                │  decorador   │
                └──────────────┘
                        │
                        ▼
                nueva función
                        │
                        ▼
                comportamiento
                original + extra


Por ejemplo:

    función original
        ↓
    agregar caché
        ↓
    nueva función


La función original no necesita conocer
la lógica adicional del decorador.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 1. EL PROBLEMA: UNA FUNCIÓN MUY COSTOSA
// ═════════════════════════════════════════════════════════════════════════════

/*
Supongamos que tenemos una función que realiza
una operación muy pesada para la CPU.

Además, tenemos una característica importante:

    Si recibe el mismo argumento,
    siempre devuelve el mismo resultado.


Por ejemplo:

    slow(1) → 1
    slow(1) → 1
    slow(2) → 2
    slow(2) → 2


Si llamamos varias veces a:

    slow(1)

no tiene sentido volver a realizar el cálculo
si ya conocemos el resultado.
*/


function slow(x) {

    console.log(`Calculando resultado para ${x}`);

    // Imaginemos que aquí existe
    // una operación muy costosa.

    return x;

}


console.log(slow(1));
console.log(slow(1));
console.log(slow(1));


/*
El problema:

    Calculando resultado para 1
    Calculando resultado para 1
    Calculando resultado para 1


Estamos realizando el mismo trabajo
tres veces.


Una solución sería modificar "slow"
para que almacene los resultados.

Pero existe una solución más elegante:

    crear un DECORADOR.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 2. ¿QUÉ ES UN DECORADOR?
// ═════════════════════════════════════════════════════════════════════════════

/*
Un decorador:

    - recibe una función
    - agrega comportamiento
    - devuelve una nueva función


Estructura conceptual:

    function decorator(func) {
        return function() {
            // comportamiento adicional
            return func();
        };
    }


Podemos pensar que el decorador "envuelve"
a la función original.


Por eso también se utiliza el término:

    wrapper
    ↓
    envoltorio


La función original queda dentro
de la nueva función.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 3. CACHÉ TRANSPARENTE
// ═════════════════════════════════════════════════════════════════════════════

/*
Vamos a crear un decorador que agregue caché.


La idea:

    Primera llamada:

        slow(1)
            ↓
        calcular
            ↓
        guardar resultado


    Segunda llamada:

        slow(1)
            ↓
        ¿está en caché?
            ↓
            SÍ
            ↓
        devolver resultado


La función original no necesita saber
que existe el caché.


A esto se le puede llamar:

    caché transparente


porque desde fuera seguimos utilizando
la función de la misma manera.
*/


function slow(x) {
    console.log(`Calculando ${x}`);
    return x;
}


function cachingDecorator(func) {

    // Map almacenará:
    //
    // argumento → resultado
    //
    // Ejemplo:
    //
    // 1 → 1
    // 2 → 2
    // 3 → 3

    let cache = new Map();


    // Devolvemos una nueva función.
    return function(x) {

        // ¿Ya tenemos el resultado?
        if (cache.has(x)) {
            console.log("Resultado obtenido desde caché");
            return cache.get(x);
        }
        // Si no está en caché,

        // ejecutamos la función original.
        let result = func(x);

        // Guardamos el resultado.
        cache.set(x, result);

        // Devolvemos el resultado.
        return result;
    };
}


// Reemplazamos la función original
// por la versión decorada.

slow = cachingDecorator(slow);

// Primera llamada:
console.log(slow(1));

// Segunda llamada:
console.log(slow(1));


/*
Resultado conceptual:

    Calculando 1
    1

    Resultado obtenido desde caché
    1


La segunda llamada no vuelve a ejecutar
la función original.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 4. ¿QUÉ OCURRIÓ CON slow?
// ═════════════════════════════════════════════════════════════════════════════

/*
Antes:

        slow
        │
        ▼
    función original

Después:

        slow
        │
        ▼
        wrapper
        │
        ▼
    función original


Es decir:

    slow = cachingDecorator(slow);


Puede resultar confuso porque estamos usando
la misma variable "slow".

Pero conceptualmente:

    oldSlow = función original

    slow = cachingDecorator(oldSlow)


El nombre "slow" ahora apunta
al wrapper.


El wrapper se encarga de decidir:

    ¿utilizo el caché?
    o
    ¿ejecuto la función original?
*/


// ═════════════════════════════════════════════════════════════════════════════
// 5. ¿POR QUÉ USAR UN DECORADOR?
// ═════════════════════════════════════════════════════════════════════════════

/*
Podríamos implementar el caché directamente dentro de slow().

Pero separar ambas responsabilidades tiene ventajas.


VENTAJA 1: REUTILIZACIÓN

Podemos utilizar el mismo decorador
con diferentes funciones.


VENTAJA 2: SEPARACIÓN DE RESPONSABILIDADES

"slow" se ocupa de calcular.

"cachingDecorator" se ocupa del caché.


VENTAJA 3: MENOR COMPLEJIDAD

No necesitamos modificar la lógica interna
de la función original.


VENTAJA 4: COMBINACIÓN

Podemos utilizar varios decoradores.

Por ejemplo:

    función
        ↓
    logging
        ↓
    caching
        ↓
    función final


Esto permite agregar funcionalidades
sin modificar la función original.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 6. EL PROBLEMA CON LOS MÉTODOS DE OBJETOS
// ═════════════════════════════════════════════════════════════════════════════

/*
Hasta ahora nuestro decorador funciona bien
con funciones normales.


Pero aparece un problema cuando decoramos
MÉTODOS DE OBJETOS.


Ejemplo:
*/


let worker = {
    someMethod() {
        return 2;
    },

    slow(x) {
        console.log(`Calculando ${x}`);
        return x * this.someMethod();
    }
};

console.log(worker.slow(2));


/*
Resultado:

    4

¿Por qué?

Porque cuando hacemos:

    worker.slow(2)


"this" dentro de slow() es:

    worker


Por lo tanto:

    this.someMethod()


es equivalente a:

    worker.someMethod()
*/


// ═════════════════════════════════════════════════════════════════════════════
// 7. DECORAR EL MÉTODO
// ═════════════════════════════════════════════════════════════════════════════

/*
Ahora queremos aplicar nuestro decorador.
*/


function cachingDecorator(func) {
    let cache = new Map();

    return function(x) {
        if (cache.has(x)) {
            return cache.get(x);
        }

        let result = func(x);
        cache.set(x, result);
        return result;
    };
}

worker.slow = cachingDecorator(worker.slow);


/*
Ahora:

    worker.slow

ya no apunta directamente al método original.


Tenemos:

    worker.slow
        │
        ▼
    wrapper
        │
        ▼
    función slow original
*/


console.log(worker.slow(2));


/*
¡Problema!

El método original utiliza:

    this.someMethod()


Pero puede producir:

    TypeError

porque el "this" esperado no está llegando
correctamente a la función original.


Para entender esto tenemos que estudiar
cómo se determina "this".
*/


// ═════════════════════════════════════════════════════════════════════════════
// 8. ¿DE DÓNDE SALE this?
// ═════════════════════════════════════════════════════════════════════════════

/*
En una llamada como:

    worker.slow()


JavaScript establece:

    this = worker


porque la función se está llamando
como método del objeto.


Podemos pensar:

    worker.slow()
    │      │
    │      └── función
    │
    └──────── objeto → this


Por lo tanto:

    this === worker
*/


let example = {
    name: "Yvnir",
    sayHi() {
        console.log(this.name);
    }
};

example.sayHi();


/*
Aquí:

    this === example


Por lo tanto:

    this.name

es:

    example.name
*/


// ═════════════════════════════════════════════════════════════════════════════
// 9. SE PIERDE EL CONTEXTO
// ═════════════════════════════════════════════════════════════════════════════

/*
Observemos:
*/


let user = {
    name: "John",
    sayHi() {
        console.log(this.name);
    }
};

user.sayHi();


/*
Funciona porque:

    user.sayHi()

establece:

    this = user


Pero si hacemos:
*/


let func = user.sayHi;


// func();

// En modo estricto:
//
// this === undefined


/*
La diferencia es:

    user.sayHi()
         ↑
    llamada como método


    func()
    ↑
    llamada como función normal


Cuando separamos la función del objeto,
perdemos automáticamente ese contexto.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 10. EL PROBLEMA DEL WRAPPER
// ═════════════════════════════════════════════════════════════════════════════

/*
Nuestro decorador hacía algo como:
*/


function cachingDecorator(func) {

    let cache = new Map();

    return function(x) {
        if (cache.has(x)) {
            return cache.get(x);
        }

        // PROBLEMA:
        let result = func(x);

        cache.set(x, result);
        return result;
    };
}


/*
Supongamos:

    worker.slow(2)


Primero se llama al wrapper:

    worker.slow(2)
        │
        ▼
    wrapper


Como se llama como:

    worker.slow()


el wrapper recibe:

    this = worker


Hasta aquí todo correcto.


PERO luego el wrapper hace:

    func(x)


Esto es una llamada normal.


Por lo tanto, la función original
ya no recibe automáticamente:

    this = worker


El contexto se pierde.


Necesitamos una forma de decir:

    "Ejecuta func utilizando este objeto como su this."


Ahí entra:

    call()
*/


// ═════════════════════════════════════════════════════════════════════════════
// 11. Function.prototype.call()
// ═════════════════════════════════════════════════════════════════════════════

/*
Todas las funciones tienen acceso al método:

    call()


Su sintaxis:

    func.call(context, arg1, arg2, ...)


El primer argumento indica
qué objeto queremos utilizar como:

    this


Los argumentos siguientes son los argumentos
normales de la función.


Ejemplo:
*/


function sayHi() {
    console.log(this.name);
}

let person1 = {
    name: "John"
};


let person2 = {
    name: "Admin"
};

sayHi.call(person1);


// this = person1
// → John


sayHi.call(person2);


// this = person2
// → Admin


/*
La función es la misma:

    sayHi


Pero podemos cambiar el objeto
que se utilizará como "this".
*/


// ═════════════════════════════════════════════════════════════════════════════
// 12. COMPARACIÓN: LLAMADA NORMAL VS call()
// ═════════════════════════════════════════════════════════════════════════════

/*
Llamada normal:
*/


func(1, 2, 3);


/*
Aquí JavaScript determina "this"
según cómo se realiza la llamada.


Con call:
*/


func.call(obj, 1, 2, 3);


/*
Aquí le estamos diciendo explícitamente:

    this = obj

y:

    argumentos = 1, 2, 3


Conceptualmente:

    func(1, 2, 3)


vs.


    func.call(obj, 1, 2, 3)

                │
                └── this = obj


La diferencia principal está
en el contexto "this".
*/


// ═════════════════════════════════════════════════════════════════════════════
// 13. call() CON ARGUMENTOS
// ═════════════════════════════════════════════════════════════════════════════

/*
Ejemplo:
*/


function say(phrase) {
    console.log(`${this.name}: ${phrase}`);
}

let person = {
    name: "John"
};

say.call(person, "Hola");


/*
JavaScript hace conceptualmente:

    this = person
    phrase = "Hola"


Por lo tanto:

    this.name
        ↓
    "John"


    phrase
        ↓
    "Hola"


Resultado:

    John: Hola
*/


// ═════════════════════════════════════════════════════════════════════════════
// 14. call() SOLUCIONA NUESTRO DECORADOR
// ═════════════════════════════════════════════════════════════════════════════

/*
Volvamos al problema original.
*/


let worker2 = {
    someMethod() {
        return 2;
    },

    slow(x) {
        console.log(`Calculando ${x}`);
        return x * this.someMethod();
    }
};


/*
Creamos el decorador nuevamente.
*/


function cachingDecorator2(func) {
    let cache = new Map();

    return function(x) {
        if (cache.has(x)) {
            return cache.get(x);
        }

        /*
        Aquí está la solución:
            func.call(this, x)

        "this" es el this del wrapper.

        Como llamamos:

            worker2.slow(2)

        el wrapper recibe:

            this = worker2


        Entonces:

            func.call(this, x)


        equivale conceptualmente a:

            func.call(worker2, 2)
        */


        let result = func.call(this, x);

        cache.set(x, result);
        return result;
    };
}


worker2.slow = cachingDecorator2(worker2.slow);

console.log(worker2.slow(2));
console.log(worker2.slow(2));


/*
Primera llamada:

    worker2.slow(2)
        ↓
    wrapper
        ↓
    this = worker2
        ↓
    func.call(worker2, 2)
        ↓
    función original
        ↓
    this.someMethod()
        ↓
    worker2.someMethod()
        ↓
    resultado


Segunda llamada:

    worker2.slow(2)
        ↓
    wrapper
        ↓
    resultado encontrado
        ↓
    devolver caché


La función original no vuelve a ejecutarse.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 15. TRANSMISIÓN DE this PASO A PASO
// ═════════════════════════════════════════════════════════════════════════════

/*
Esta es probablemente la parte MÁS IMPORTANTE
de este capítulo.


Tenemos:

    worker.slow(2)


Paso 1
──────

JavaScript observa:

    worker.slow()


Por lo tanto:

    this = worker


Paso 2
──────

Pero "worker.slow" ahora es el wrapper.

Entonces:

    wrapper(2)


y dentro del wrapper:

    this === worker


Paso 3
──────

El wrapper llama:

    func.call(this, x)


Como:

    this === worker
    x === 2


se convierte en:

    func.call(worker, 2)


Paso 4
──────

La función original recibe:

    this === worker
    x === 2


Paso 5
──────

La función original puede hacer:

    this.someMethod()


que equivale a:

    worker.someMethod()


Todo vuelve a funcionar.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 16. ESQUEMA VISUAL
// ═════════════════════════════════════════════════════════════════════════════

/*

        worker.slow(2)
            │
            ▼
    ┌─────────────────┐
    │     wrapper     │
    │                 │
    │ this = worker   │
    │ x = 2           │
    └────────┬────────┘
            │
            │ func.call(this, x)
            │
            ▼
    ┌─────────────────┐
    │ función original│
    │                 │
    │ this = worker   │
    │ x = 2           │
    └────────┬────────┘
            │
            ▼
    this.someMethod()
            │
            ▼
    worker.someMethod()


La clave:

    call() permite transmitir explícitamente
    el contexto "this" de una función a otra.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 17. ¿POR QUÉ NO BASTA CON func(x)?
// ═════════════════════════════════════════════════════════════════════════════

/*
Porque:

    func(x)


es una llamada normal.


Mientras:

    func.call(this, x)


le dice explícitamente a JavaScript:

    "Ejecuta func utilizando este valor como this."


Por eso:

    func(x)

y:

    func.call(this, x)


pueden producir resultados diferentes
cuando la función utiliza "this".
*/


// ═════════════════════════════════════════════════════════════════════════════
// 18. DECORADORES EN GENERAL
// ═════════════════════════════════════════════════════════════════════════════

/*
La caché es solo un ejemplo de decorador.


Podemos crear un decorador para:

    - Medir tiempo.
    - Registrar llamadas.
    - Validar argumentos.
    - Controlar permisos.
    - Reintentar operaciones.
    - Memorizar resultados.
    - Registrar errores.
    - Contar llamadas.


Por ejemplo, un decorador para registrar
cuándo se llama una función:
*/


function loggingDecorator(func) {
    return function(x) {
        console.log(`Llamando con: ${x}`);

        let result = func.call(this, x);

        console.log(`Resultado: ${result}`);

        return result;
    };
}


function multiply(x) {
    return x * 2;
}


multiply = loggingDecorator(multiply);

console.log(multiply(5));


/*
Resultado conceptual:

    Llamando con: 5
    Resultado: 10
    10


El decorador añadió logging
sin modificar "multiply".
*/


// ═════════════════════════════════════════════════════════════════════════════
// 19. DECORADOR + MÉTODO DE OBJETO
// ═════════════════════════════════════════════════════════════════════════════

/*
Cuando creamos decoradores que pueden trabajar
tanto con funciones normales como con métodos,
es importante conservar "this".


Por eso normalmente encontramos:
*/


function decorator(func) {
    return function(...args) {
        return func.call(this, ...args);
    };
}


/*
Observa algo nuevo:

    ...args


Esto permite aceptar cualquier cantidad de argumentos.


Por ejemplo:


    func(a)

    func(a, b)

    func(a, b, c)


Todos pueden pasar por el mismo wrapper.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 20. UN DECORADOR MÁS GENERAL
// ═════════════════════════════════════════════════════════════════════════════

/*
Podemos construir una versión más reutilizable
del decorador de caché:


    function cachingDecorator(func) {

        let cache = new Map();


        return function(...args) {

            ...


            return func.call(this, ...args);

        };

    }


La ventaja es que ya no estamos limitados
a funciones que reciben solamente un argumento "x".
*/


function generalCachingDecorator(func) {

    let cache = new Map();

    return function(...args) {
        /*
        Para funciones con múltiples argumentos,
        necesitamos construir una clave.

        Una solución sencilla para estudiar
        es utilizar JSON.stringify().
        */
        let key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log("Desde caché");
            return cache.get(key);
        }


        let result = func.call(this, ...args);

        cache.set(key, result);

        return result;
    };
}


/*
IMPORTANTE:

Esto es solamente una implementación educativa.

En aplicaciones reales debemos considerar:

    - tipos de argumentos
    - objetos
    - orden de propiedades
    - referencias
    - tamaño del caché
    - invalidación del caché
*/


// ═════════════════════════════════════════════════════════════════════════════
// 21. call() NO CAMBIA PERMANENTEMENTE this
// ═════════════════════════════════════════════════════════════════════════════

/*
Algo importante:

    func.call(obj)


NO significa:

    "a partir de ahora func siempre tendrá this = obj."


Solamente afecta ESA llamada.
*/


function showName() {
    console.log(this.name);
}


let first = {
    name: "First"
};


let second = {
    name: "Second"
};


showName.call(first);
// First


showName.call(second);
// Second


/*
La misma función puede utilizar diferentes
valores de "this" en diferentes llamadas.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 22. call() ES UN MÉTODO DE LAS FUNCIONES
// ═════════════════════════════════════════════════════════════════════════════

/*
Recuerda:

    call()

no es una función global.


Es un método disponible en las funciones.


Por ejemplo:

    function test() {}


Podemos hacer:

    test.call(...)


Porque las funciones son objetos
y tienen métodos propios heredados
de Function.prototype.


Conceptualmente:

    test
    │
    └── call()
*/


// ═════════════════════════════════════════════════════════════════════════════
// 23. RESUMEN: DECORADORES
// ═════════════════════════════════════════════════════════════════════════════

/*
Un decorador:

    recibe una función
        ↓
    crea un wrapper
        ↓
    añade comportamiento
        ↓
    devuelve el wrapper


Ejemplo:

    function decorator(func) {

        return function(x) {

            // comportamiento adicional

            return func(x);

        };

    }


Después:

    func = decorator(func);


La función ahora pasa por el wrapper.


VENTAJAS:

    ✓ Reutilización.
    ✓ Separación de responsabilidades.
    ✓ Menor modificación del código original.
    ✓ Posibilidad de combinar comportamientos.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 24. RESUMEN: call()
// ═════════════════════════════════════════════════════════════════════════════

/*
Sintaxis:

    func.call(thisArg, arg1, arg2, ...)


Donde:

    thisArg
        → valor que tendrá "this".

    arg1, arg2, ...
        → argumentos normales.


Ejemplo:
*/


function greetPerson(message) {
    console.log(this.name + ": " + message);
}

let john = {
    name: "John"
};

greetPerson.call(john, "Hola");


/*
Resultado:

    John: Hola


Aquí:

    this = john

    message = "Hola"
*/


// ═════════════════════════════════════════════════════════════════════════════
// 25. DIFERENCIA FUNDAMENTAL
// ═════════════════════════════════════════════════════════════════════════════

/*
SIN call():

    func(x)


Si "func" necesita "this",
podemos perder el contexto al pasarla
por un wrapper.


CON call():

    func.call(this, x)


El wrapper transmite su propio "this"
a la función original.


Por eso un decorador que trabaja con métodos
normalmente debe conservar el contexto.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 26. IDEA CLAVE PARA MEMORIZAR
// ═════════════════════════════════════════════════════════════════════════════

/*
Cuando veas:

    func.call(this, ...args)


léelo mentalmente como:

    "Llama a func usando el mismo this y los mismos argumentos."


Es una técnica extremadamente común
en código JavaScript.


Ejemplo:

    return func.call(this, ...args);


Significa:

    wrapper
    │
    ├── conserva this
    │
    ├── conserva argumentos
    │
    ▼
    función original


Esto permite que el wrapper
sea transparente respecto al contexto.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 27. CONCEPTO FINAL
// ═════════════════════════════════════════════════════════════════════════════

/*
La idea central de esta primera parte es:


    FUNCIÓN
    │
    ▼
    DECORADOR
    │
    ▼
    WRAPPER
    │
    │
    ├── puede agregar caché
    ├── puede agregar logging
    ├── puede medir tiempo
    ├── puede validar datos
    └── puede agregar cualquier comportamiento


Pero hay que tener cuidado con:

    this


Cuando el wrapper llama a la función original:

    func(x)

el contexto puede perderse.


Para conservarlo:

    func.call(this, x)


Y si necesitamos pasar todos los argumentos:

    func.call(this, ...args)


Por lo tanto:


    DECORADOR
        +
    WRAPPER
        +
    call()
        ↓
    Podemos modificar el comportamiento
    de una función sin perder su contexto.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 28. MINI EJEMPLO FINAL
// ═════════════════════════════════════════════════════════════════════════════

let calculator = {
    factor: 10,

    multiply(x) {
        return x * this.factor;
    }

};


function loggingDecorator(func) {

    return function(...args) {
        console.log("Argumentos:", args);

        // Conservamos el "this".
        let result = func.call(this, ...args);

        console.log("Resultado:", result);

        return result;
    };
}


calculator.multiply =
    loggingDecorator(calculator.multiply);

console.log(
    calculator.multiply(5)
);


/*
Flujo:


    calculator.multiply(5)
            │
            ▼
        wrapper
            │
            │ this = calculator
            │ args = [5]
            ▼
    func.call(this, ...args)
            │
            ▼
    función original
            │
            │ this = calculator
            │ x = 5
            ▼
    5 * this.factor
            │
            ▼
            50


Resultado:

    Argumentos: [5]
    Resultado: 50
    50


Este ejemplo resume prácticamente
todo lo aprendido en esta primera parte.
*/

/*
===========================================================
DECORADORES Y REDIRECCIONES: call() / apply()
===========================================================

JavaScript permite tratar las funciones como valores y objetos.

Esto nos permite:

- Pasar funciones como argumentos.
- Guardarlas en variables.
- Devolver funciones desde otras funciones.
- Agregar propiedades a las funciones.
- Crear "envoltorios" (wrappers) alrededor de funciones.
- Modificar o extender su comportamiento sin modificar su código original.

En este capítulo veremos:

1. Decoradores.
2. Caché transparente.
3. El problema de `this` al decorar métodos.
4. `Function.prototype.call()`.
5. Decoradores con múltiples argumentos.
6. `Function.prototype.apply()`.
7. Redirección de llamadas.
8. Préstamo de métodos (method borrowing).
9. Decoradores y propiedades de funciones.
*/


/*
===========================================================
1. ¿QUÉ ES UN DECORADOR?
===========================================================

Un decorador es una función que recibe otra función y devuelve
una nueva función que agrega o modifica algún comportamiento.

La función original no necesita ser modificada.

Conceptualmente:

    función original
        ↓
    decorador
        ↓
    nueva función
    + comportamiento adicional


Por ejemplo, podemos crear un decorador que agregue caché.
*/


/*
===========================================================
2. CACHÉ TRANSPARENTE
===========================================================

Supongamos que tenemos una función `slow()` que realiza una
operación costosa.

Además, sabemos que:

    slow(1) siempre devuelve el mismo resultado.
    slow(2) siempre devuelve el mismo resultado.

Por lo tanto, no tiene sentido calcular nuevamente el resultado
si ya lo calculamos anteriormente.

Podemos guardar los resultados en una caché.
*/


function slow(x) {
  // Simulamos una operación costosa.
    console.log(`Calculando resultado para ${x}...`);

    return x;
}


/*
`cachingDecorator()` recibe una función y devuelve otra función.

La función devuelta se encarga de:

1. Revisar si el resultado ya está en caché.
2. Si existe, devolverlo inmediatamente.
3. Si no existe, ejecutar la función original.
4. Guardar el resultado.
5. Devolver el resultado.
*/


function cachingDecorator(func) {
  // Map almacenará:
  //
  // argumento → resultado
  //
  // Ejemplo:
  //
  // 1 → 1
  // 2 → 2

    const cache = new Map();
    return function (x) {
    // ¿Ya tenemos este resultado?
    if (cache.has(x)) {
        console.log(`Resultado para ${x} obtenido desde caché`);
        return cache.get(x);
    }

    // Todavía no existe en caché.
    const result = func(x);
    // Guardamos el resultado.
    cache.set(x, result);
    return result;
    };
}

// Reemplazamos `slow` por su versión decorada.
slow = cachingDecorator(slow);

// Primera llamada:
// No existe en caché → ejecuta `slow`.
console.log(slow(1));

// Segunda llamada:
// Ya existe en caché → no ejecuta `slow`.
console.log(slow(1));

// Primera llamada para 2.
console.log(slow(2));

// Segunda llamada para 2.
console.log(slow(2));


/*
===========================================================
3. ¿POR QUÉ UTILIZAR UN DECORADOR?
===========================================================

Podríamos modificar directamente `slow()` para agregarle caché.

Pero separar ambas responsabilidades tiene ventajas.

La función `slow()` se concentra únicamente en su trabajo.

El decorador se concentra únicamente en la caché.

Ventajas:

- El decorador es reutilizable.
- No necesitamos modificar la función original.
- La lógica de caché está separada.
- Podemos aplicar el mismo decorador a diferentes funciones.
- Podemos combinar varios decoradores.

Por ejemplo:

    slow
    ↓
    caché
    ↓
    logging
    ↓
    medición de tiempo


Esto es una idea muy importante en programación:

    separar responsabilidades.


===========================================================
4. EL PROBLEMA CON LOS MÉTODOS DE OBJETOS
===========================================================

El decorador anterior funciona bien con funciones simples.

Pero tenemos un problema cuando decoramos métodos que utilizan
`this`.

Veamos un ejemplo.
*/


let worker = {

    someMethod() {
        return 2;
    },

    slow(x) {

    console.log(`Calculando ${x}...`);

    // `this` hace referencia a `worker`.
    return x * this.someMethod();
    }
};


console.log(worker.slow(2));
// 4


/*
Ahora intentemos decorar `worker.slow`.
*/


function cachingDecoratorWithProblem(func) {

    const cache = new Map();

    return function (x) {

    if (cache.has(x)) {
        return cache.get(x);
    }

    // PROBLEMA:
    //
    // Aquí llamamos a `func` como una función independiente.
    //
    // No estamos conservando el contexto original de `this`.

    const result = func(x);

    cache.set(x, result);

    return result;
    };
}


worker.slow = cachingDecoratorWithProblem(worker.slow);


/*
En este punto:

    worker.slow(2)

llama al wrapper.

Pero dentro del wrapper tenemos:

    func(x)

La función original ya no está siendo llamada como:

    worker.slow(x)

Por lo tanto, pierde el contexto `this`.

El resultado puede ser un error al intentar:

    this.someMethod()
*/


/*
===========================================================
5. ¿POR QUÉ SE PIERDE `this`?
===========================================================

Estas dos llamadas NO son equivalentes:

    worker.slow(2)

y:

    const func = worker.slow;
    func(2);


En la primera:

    worker.slow(2)
    ↑
    `this` es worker.


En la segunda:

    func(2)

La función se está llamando de forma independiente.

Por eso no recibe `worker` como `this`.

El decorador está haciendo justamente esto:

    func(x)

y por eso pierde el contexto.


===========================================================
6. `func.call()`
===========================================================

JavaScript proporciona:

    Function.prototype.call()

para poder llamar explícitamente una función indicando
qué objeto debe utilizar como `this`.

Sintaxis:

    func.call(context, arg1, arg2, ...);


Por ejemplo:
*/


function sayHi() {
    console.log(this.name);
}

const user = {
    name: "John"
};

const admin = {
    name: "Admin"
};

// `this` será `user`.
sayHi.call(user);

// `this` será `admin`.
sayHi.call(admin);

/*
La diferencia principal:

    func()
    
vs.

    func.call(obj)


En el segundo caso podemos decidir explícitamente
qué será `this`.


===========================================================
7. `call()` TAMBIÉN PUEDE RECIBIR ARGUMENTOS
===========================================================

Sintaxis:

    func.call(context, arg1, arg2, ...)


El primer argumento es el contexto (`this`).

Los siguientes argumentos son los argumentos normales
de la función.
*/


function say(phrase) {
    console.log(`${this.name}: ${phrase}`);
}

say.call(user, "Hola");
// John: Hola

say.call(admin, "Hola");
// Admin: Hola

/*
Podemos visualizarlo así:

    say.call(user, "Hola")
            │       │
            │       └── argumento de say()
            │
            └────────── valor de this


===========================================================
8. SOLUCIONANDO EL DECORADOR
===========================================================

Ahora podemos corregir nuestro decorador.

En lugar de:

    func(x)

utilizamos:

    func.call(this, x)


Así conseguimos transmitir el `this` del wrapper
a la función original.
*/


worker = {

    someMethod() {
        return 2;
    },

    slow(x) {

    console.log(`Calculando ${x}...`);

    return x * this.someMethod();
    }
};


function cachingDecorator(func) {

    const cache = new Map();

    return function (x) {

    if (cache.has(x)) {
        console.log("Resultado obtenido desde caché");

        return cache.get(x);
    }

    /*
    `this` pertenece al wrapper.

    Si hacemos:

        worker.slow(2)

    entonces dentro del wrapper:

        this === worker

    Por eso podemos pasar ese mismo `this`
    a la función original.
    */

    const result = func.call(this, x);

    cache.set(x, result);

    return result;
    };
}

// Decoramos el método.
worker.slow = cachingDecorator(worker.slow);

console.log(worker.slow(2));
// Calcula → 4

console.log(worker.slow(2));
// Caché → 4


/*
===========================================================
9. ¿CÓMO SE TRANSMITE `this`?
===========================================================

Cuando hacemos:

    worker.slow(2)


1. `worker.slow` ahora es el wrapper.

2. Como llamamos:

    worker.slow(...)

    `this` dentro del wrapper es `worker`.

3. El wrapper recibe:

    x = 2

4. Ejecutamos:

    func.call(this, x)

5. Eso equivale conceptualmente a:

    func.call(worker, 2)

6. La función original recibe:

    this === worker

    x === 2


Por lo tanto, la función original sigue pudiendo utilizar:

    this.someMethod()


===========================================================
10. DECORADORES CON MÚLTIPLES ARGUMENTOS
===========================================================

Hasta ahora nuestro decorador solo funciona con funciones
que reciben un argumento:

    func(x)


Pero una función puede recibir muchos:

    func(a, b)
    func(a, b, c)
    func(a, b, c, d)


Veamos un ejemplo.
*/


worker = {

    slow(min, max) {

        console.log(`Calculando ${min}, ${max}...`);

        return min + max;
    }
};


/*
Queremos que estas dos llamadas:

    worker.slow(3, 5)
    worker.slow(3, 5)

utilicen el mismo resultado almacenado en caché.

Por lo tanto, nuestra clave ya no puede ser solamente:

    3

Necesitamos representar:

    (3, 5)

como una única clave.


===========================================================
11. ¿CÓMO GUARDAR MÚLTIPLES ARGUMENTOS?
===========================================================

Tenemos varias posibilidades:

1. Crear una estructura de datos personalizada.

2. Utilizar Maps anidados.

3. Convertir los argumentos en una única clave.

Por ejemplo:

    (3, 5)

puede convertirse en:

    "3,5"


Para este ejemplo utilizaremos la tercera opción.


===========================================================
12. FUNCIÓN HASH
===========================================================

Una función hash será la encargada de transformar
varios argumentos en una única clave.

Ejemplo:

    [3, 5]

        ↓

    "3,5"


Nuestro hash:
*/


function hash(args) {
    return args[0] + "," + args[1];
}


/*
Ahora podemos modificar el decorador para recibir
una función `hash`.
*/


function cachingDecorator(func, hash) {

    const cache = new Map();

    return function () {

    /*
    `arguments` contiene todos los argumentos
    recibidos por el wrapper.

    Por ejemplo:

        worker.slow(3, 5)

    produce:

        arguments[0] → 3
        arguments[1] → 5
    */

    const key = hash(arguments);


    // ¿Ya tenemos este conjunto de argumentos?
    if (cache.has(key)) {
    console.log("Resultado obtenido desde caché");

    return cache.get(key);
    }


    /*
    `arguments` contiene todos los argumentos.

    El operador spread `...` los convierte en argumentos
    individuales.

    Por ejemplo:

        ...arguments

    equivale a:

        3, 5
    */

    const result = func.call(this, ...arguments);


    // Guardamos el resultado usando la clave generada.
    cache.set(key, result);

    return result;
    };
}


worker.slow = cachingDecorator(worker.slow, hash);


console.log(worker.slow(3, 5));
// Calcula → 8


console.log(worker.slow(3, 5));
// Caché → 8


console.log(worker.slow(10, 20));
// Calcula → 30


/*
===========================================================
13. ¿QUÉ CAMBIÓ EN NUESTRO DECORADOR?
===========================================================

Antes:

    func.call(this, x)


Solo pasábamos un argumento.

Ahora:

    func.call(this, ...arguments)


Pasamos todos los argumentos recibidos por el wrapper.


Además:

    hash(arguments)

convierte todos los argumentos en una única clave
para nuestro `Map`.


Flujo:

    worker.slow(3, 5)
            ↓
        wrapper
            ↓
    arguments
    [3, 5]
            ↓
        hash()
            ↓
        "3,5"
            ↓
        cache


===========================================================
14. `Function.prototype.apply()`
===========================================================

Existe otra forma de hacer prácticamente lo mismo:

    func.apply(this, arguments)


Sintaxis:

    func.apply(context, args)


`apply()` recibe:

1. El valor que será `this`.
2. Un objeto similar a un array que contiene los argumentos.


Por ejemplo:

    func.call(context, ...args)

es equivalente a:

    func.apply(context, args)


Ejemplo:
*/


function greet(greeting, punctuation) {
    console.log(
        `${greeting}, ${this.name}${punctuation}`
    );
}


const person = {
    name: "Yvnir"
};

const args = ["Hola", "!"];

greet.call(person, ...args);

greet.apply(person, args);


/*
Ambas llamadas producen el mismo resultado.


===========================================================
15. `call()` VS `apply()`
===========================================================

`call()`:

    func.call(thisValue, arg1, arg2, arg3)


Los argumentos se pasan individualmente.


`apply()`:

    func.apply(thisValue, args)


Los argumentos se pasan juntos dentro de un array
u objeto similar a un array.


Por ejemplo:

    const args = [1, 2, 3];

    func.call(obj, ...args);

    func.apply(obj, args);


Ambas formas son equivalentes.


===========================================================
16. ¿QUÉ ES `arguments`?
===========================================================

`arguments` es un objeto disponible dentro de funciones
tradicionales que contiene los argumentos recibidos.

Ejemplo:
*/


function showArguments(a, b) {

    console.log(arguments[0]);
    console.log(arguments[1]);

    console.log(arguments.length);
}


showArguments("Hola", "Mundo");


/*
Importante:

`arguments` NO es un Array real.

Es un objeto:

    iterable
    similar a un array

pero no posee todos los métodos de Array.


Por ejemplo:

    arguments.join()

no funciona.


===========================================================
17. REDIRECCIÓN DE LLAMADAS
===========================================================

Cuando hacemos que un wrapper pase la llamada
a la función original conservando:

- `this`
- todos los argumentos

estamos haciendo una redirección de llamadas.


Una forma sencilla:

    const wrapper = function () {
    return func.apply(this, arguments);
    };


Desde fuera, el wrapper se comporta prácticamente
igual que la función original.


Por ejemplo:
*/


function original(a, b) {
    return a + b;
}

function wrapper(...args) {
    return original.apply(this, args);
}

console.log(wrapper(2, 3));
// 5


/*
===========================================================
18. PRÉSTAMO DE MÉTODOS (METHOD BORROWING)
===========================================================

Recordemos nuestro problema:

    arguments

es similar a un array, pero NO es un array.

Por lo tanto:

    arguments.join()

produce un error porque `arguments` no posee
su propio método `join`.


Por ejemplo:
*/


function test() {

  // Esto produciría un error:
  //
  // arguments.join();
}


/*
Sin embargo, sabemos que `Array.prototype.join`
puede trabajar con estructuras similares a arrays.

Podemos "tomar prestado" el método `join`
de un array.


Esto se conoce como:

    Method Borrowing
    = préstamo de métodos
*/


function hashAll() {

/*
Tomamos prestado `join` de Array.

`[].join` es el método `join` perteneciente
al prototipo de los arrays.

Con `call()` cambiamos su `this` para que
sea `arguments`.
  */

return [].join.call(arguments);
}


console.log(hashAll(1, 2, 3));
// "1,2,3"


/*
Lo que ocurre conceptualmente:

    [].join
    ↓
    .call(...)
    ↓
    this = arguments
    ↓
    "1,2,3"


===========================================================
19. ¿POR QUÉ FUNCIONA EL PRÉSTAMO DE MÉTODOS?
===========================================================

El método `join()` necesita básicamente:

    this.length
    this[0]
    this[1]
    this[2]
    ...


No necesita obligatoriamente que `this` sea
un Array real.

Por ejemplo, conceptualmente hace algo parecido a:

    for (let i = 0; i < this.length; i++) {
    ...
    }


Por eso puede trabajar con objetos que tengan
una estructura similar a un array.


`arguments` tiene:

    arguments.length
    arguments[0]
    arguments[1]
    arguments[2]


Por lo tanto, `join()` puede utilizarlo.


Este concepto es muy importante:

    Un método puede funcionar sobre un objeto diferente
    si ese objeto proporciona la estructura que el método
    necesita.


===========================================================
20. UNA FORMA MODERNA DE HACER EL HASH
===========================================================

En código moderno normalmente podemos convertir
`arguments` a un Array real.

Por ejemplo:

    Array.from(arguments)


Entonces podemos utilizar directamente:

    join()


Ejemplo:
*/


function modernHash() {

    const args = Array.from(arguments);

    return args.join(",");
}


console.log(modernHash(1, 2, 3));
// "1,2,3"


/*
También podemos utilizar spread:

    [...arguments]


Ejemplo:
*/


function modernHash2() {
    return [...arguments].join(",");
}

console.log(modernHash2(1, 2, 3));
// "1,2,3"


/*
En funciones flecha no existe `arguments` propio.

Por eso, cuando usamos funciones flecha normalmente
utilizamos parámetros rest:

    (...args)


Ejemplo:
*/


const hashArrow = (...args) => {
    return args.join(",");
};


console.log(hashArrow(1, 2, 3));
// "1,2,3"


/*
===========================================================
21. DECORADORES Y PROPIEDADES DE FUNCIONES
===========================================================

Existe una consideración importante.

Recordemos que las funciones son objetos y pueden
tener propiedades propias.

Por ejemplo:
*/


function sayHi() {
    console.log("Hola");

    sayHi.calledCount++;
}


sayHi.calledCount = 0;


sayHi();
sayHi();
sayHi();


console.log(sayHi.calledCount);
// 3


/*
¿Qué ocurre si decoramos `sayHi`?


El decorador devuelve una función NUEVA.

Por lo tanto, la nueva función no necesariamente
tendrá las propiedades de la función original.


Ejemplo conceptual:

    sayHi
    │
    ├── calledCount
    │
    ↓
    decorator
    │
    ↓
    wrapper
    │
    └── no tiene automáticamente calledCount


Esto significa que:

    decorator(sayHi)

NO copia automáticamente:

    sayHi.calledCount


===========================================================
22. EJEMPLO DEL PROBLEMA
===========================================================
*/


function greetUser() {
    console.log("Hola");
}


greetUser.calledCount = 10;


function decorator(func) {

    return function () {
        return func.apply(this, arguments);
    };
}

const decoratedGreet = decorator(greetUser);

console.log(greetUser.calledCount);
// 10

console.log(decoratedGreet.calledCount);
// undefined


/*
La función decorada es un objeto diferente.

Por eso sus propiedades son diferentes.


===========================================================
23. LOS DECORADORES TAMBIÉN PUEDEN TENER PROPIEDADES
===========================================================

Un decorador incluso puede agregar sus propias propiedades
al wrapper.

Por ejemplo, podemos crear un decorador que cuente
cuántas veces se llamó la función.
*/


function countCalls(func) {

    function wrapper(...args) {
        wrapper.count++;
        return func.apply(this, args);
    }

  // Propiedad propia del wrapper.
    wrapper.count = 0;

    return wrapper;
}


function multiply(a, b) {
  return a * b;
}


const countedMultiply = countCalls(multiply);


console.log(countedMultiply(2, 3));
// 6

console.log(countedMultiply(4, 5));
// 20

console.log(countedMultiply(6, 7));
// 42


console.log(countedMultiply.count);
// 3


/*
===========================================================
24. IDEA PRINCIPAL DE LOS DECORADORES
===========================================================

Un decorador permite añadir comportamiento
sin modificar directamente la función original.

Por ejemplo:

    función
    ↓
    decorador de caché
    ↓
    decorador de logging
    ↓
    decorador de medición
    ↓
    función final


Podemos pensar en ellos como capas.


Ejemplo conceptual:

    slow()
    ↓
    cachingDecorator()
    ↓
    loggingDecorator()
    ↓
    timingDecorator()


Cada capa agrega una responsabilidad.


===========================================================
25. RESUMEN
===========================================================

`call()`:

    func.call(thisValue, arg1, arg2, ...)

Permite llamar una función estableciendo explícitamente
el valor de `this`.

-----------------------------------------------------------

`apply()`:

    func.apply(thisValue, args)

Hace prácticamente lo mismo que `call()`, pero recibe
los argumentos agrupados en un objeto similar a un array.

-----------------------------------------------------------

Equivalencia:

    func.call(obj, ...args)

    func.apply(obj, args)

-----------------------------------------------------------

Decorador:

    function decorator(func) {
        return function () {
        // comportamiento adicional
        return func.apply(this, arguments);
        };
    }

-----------------------------------------------------------

Caché:

    function cachingDecorator(func, hash) {
        const cache = new Map();

        return function () {
            const key = hash(arguments);

            if (cache.has(key)) {
                return cache.get(key);
            }

        const result = func.apply(this, arguments);

        cache.set(key, result);

        return result;
        };
    }

-----------------------------------------------------------

Préstamo de métodos:

    [].join.call(arguments)

Permite utilizar un método de Array sobre un objeto
similar a un array.

-----------------------------------------------------------

IMPORTANTE:

Cuando decoramos un método que utiliza `this`,
debemos conservar el contexto.

Incorrecto:

    func(...args)

Correcto:

    func.call(this, ...args)

o:

    func.apply(this, args)


===========================================================
26. CONCEPTOS CLAVE PARA RECORDAR
===========================================================

1. Un decorador recibe una función y devuelve otra.

2. El decorador permite extender el comportamiento sin modificar directamente la función original.

3. `this` depende de cómo se llama una función.

4. Al envolver un método, podemos perder su `this`.

5. `call()` permite establecer explícitamente `this`.

6. `apply()` hace lo mismo, pero recibe los argumentos como un objeto similar a un array.

7. `arguments` es similar a un array, pero no es un Array.

8. Podemos utilizar `[].join.call(arguments)` para "pedir prestado" el método `join`.

9. Los wrappers no heredan automáticamente las propiedades de la función original.

10. Los decoradores son una forma de separar responsabilidades
    y reutilizar comportamiento.
*/


/*
===========================================================
EJEMPLO FINAL: DECORADOR DE CACHÉ UNIVERSAL
===========================================================

Este ejemplo reúne las ideas principales:

- Decorador.
- `Map`.
- Múltiples argumentos.
- `this`.
- `apply()`.
- Función hash.
*/


const workerFinal = {

multiplier: 2,

slow(min, max) {

    console.log("Ejecutando cálculo...");

    return (min + max) * this.multiplier;
    }
};


function hashArgs(args) {
    return [...args].join(",");
}


function cachingDecoratorFinal(func, hash) {

const cache = new Map();

return function (...args) {

    const key = hash(args);

    // Resultado existente.
    if (cache.has(key)) {
        console.log("Resultado desde caché");

        return cache.get(key);
    }

    // Ejecutamos la función original.
    // Conservamos `this` y pasamos todos los argumentos.
    const result = func.apply(this, args);

    // Guardamos el resultado.
    cache.set(key, result);

    return result;
    };
}


workerFinal.slow = cachingDecoratorFinal(
workerFinal.slow,
hashArgs
);


console.log(workerFinal.slow(3, 5));
// Ejecuta cálculo → 16


console.log(workerFinal.slow(3, 5));
// Caché → 16


console.log(workerFinal.slow(10, 5));
// Ejecuta cálculo → 30


console.log(workerFinal.slow(10, 5));
// Caché → 30


/*
===========================================================
FIN
===========================================================

La idea central de este capítulo puede resumirse así:

    DECORADOR
        ↓
    recibe una función
        ↓
    crea un wrapper
        ↓
    conserva `this`
        ↓
    redirige los argumentos
        ↓
    agrega comportamiento
        ↓
    devuelve el resultado


Y las dos herramientas principales para realizar
esta redirección son:

    call()
    apply()
*/2
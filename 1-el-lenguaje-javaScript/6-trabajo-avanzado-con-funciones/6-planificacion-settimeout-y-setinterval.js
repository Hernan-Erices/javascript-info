/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                    PLANIFICACIÓN: setTimeout Y setInterval                 ║
╚══════════════════════════════════════════════════════════════════════════════╝

JavaScript permite programar una función para que se ejecute:

    - Después de cierto tiempo.
    - Repetidamente cada cierto intervalo.

A esto lo llamamos:

    "planificar una llamada"

Los dos métodos principales son:

    setTimeout()
        → ejecuta una función UNA vez después de un retraso.

    setInterval()
        → ejecuta una función REPETIDAMENTE cada cierto intervalo.


IMPORTANTE:

Estos métodos no forman parte del lenguaje JavaScript puro.

Son proporcionados por el entorno donde se ejecuta JavaScript.

Por ejemplo:

    Navegadores → Web APIs / HTML Standard
    Node.js     → APIs del entorno de Node.js

Por eso podemos utilizarlos tanto en:

    Browser
    Node.js
*/


// ═════════════════════════════════════════════════════════════════════════════
// 1. setTimeout()
// ═════════════════════════════════════════════════════════════════════════════

/*
"setTimeout" permite ejecutar una función UNA sola vez
después de un determinado retraso.


Sintaxis:

    setTimeout(func, delay, arg1, arg2, ...)


Donde:

    func
        → función que queremos ejecutar.

    delay
        → tiempo de espera en milisegundos.

    arg1, arg2, ...
        → argumentos que se pasarán a la función.


IMPORTANTE:

    1000 ms = 1 segundo

    2000 ms = 2 segundos

    500 ms  = 0.5 segundos
*/


function sayHi() {

    console.log("Hola");

}


// Ejecutar "sayHi" después de 1 segundo.
setTimeout(sayHi, 1000);


/*
El código anterior significa:

    "Ejecuta sayHi dentro de aproximadamente 1000 ms."


NO significa:

    "Detén JavaScript durante 1000 ms."


setTimeout NO bloquea la ejecución del programa.

La función queda programada y JavaScript continúa
ejecutando el resto del código.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 2. setTimeout CON UNA FUNCIÓN ANÓNIMA
// ═════════════════════════════════════════════════════════════════════════════

/*
También podemos pasar directamente una función.
*/


setTimeout(function () {

    console.log("Hola después de 2 segundos");

}, 2000);


/*
Y normalmente utilizamos una arrow function:
*/


setTimeout(() => {

    console.log("Hola después de 3 segundos");

}, 3000);


// ═════════════════════════════════════════════════════════════════════════════
// 3. LOS MILISEGUNDOS
// ═════════════════════════════════════════════════════════════════════════════

/*
El segundo argumento representa milisegundos.

Ejemplos:
*/


setTimeout(() => console.log("500 ms"), 500);

setTimeout(() => console.log("1 segundo"), 1000);

setTimeout(() => console.log("2 segundos"), 2000);

setTimeout(() => console.log("5 segundos"), 5000);


/*
Podemos recordar:

    1000 ms = 1 s
    60.000 ms = 60 s = 1 min


Si omitimos el delay:

    setTimeout(func)

el valor predeterminado es aproximadamente 0 ms.

Pero "0 ms" NO significa que la función se ejecute inmediatamente.

Lo veremos más adelante.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 4. setTimeout() CON ARGUMENTOS
// ═════════════════════════════════════════════════════════════════════════════

/*
También podemos pasar argumentos a la función.

Sintaxis:

    setTimeout(func, delay, arg1, arg2, ...)


Ejemplo:
*/


function greet(phrase, name) {

    console.log(`${phrase}, ${name}!`);

}


setTimeout(
    greet,
    1000,
    "Hola",
    "Yvnir"
);


/*
Después de 1 segundo se ejecutará:

    greet("Hola", "Yvnir");


Es decir:

    setTimeout(
        función,
        retraso,
        argumento1,
        argumento2
    );


Los argumentos son entregados a la función
cuando llega el momento de ejecutarla.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 5. NO PASAR LA FUNCIÓN CON ()
// ═════════════════════════════════════════════════════════════════════════════

/*
Este es uno de los errores más comunes al comenzar.


CORRECTO:
*/


setTimeout(sayHi, 1000);


/*
Aquí estamos pasando la REFERENCIA a la función.

Es decir:

    "setTimeout, aquí tienes esta función.
    Ejecútala después."


INCORRECTO:
*/


// setTimeout(sayHi(), 1000);


/*
¿Por qué?

Porque:

    sayHi()

significa:

    "ejecuta sayHi AHORA"


Entonces JavaScript hace conceptualmente:

    let result = sayHi();

    setTimeout(result, 1000);


Pero "sayHi" no devuelve nada.

Por lo tanto:

    result === undefined


Y "setTimeout" recibe:

    undefined

en lugar de una función.


REGLA IMPORTANTE:

    setTimeout(sayHi, 1000)
                ↑
            referencia


    setTimeout(sayHi(), 1000)
                ↑
            ejecución inmediata
*/


// ═════════════════════════════════════════════════════════════════════════════
// 6. ¿Y SI NECESITAMOS ARGUMENTOS?
// ═════════════════════════════════════════════════════════════════════════════

/*
Una forma correcta es utilizar los argumentos de setTimeout:
*/


setTimeout(greet, 1000, "Hola", "Juan");


/*
También podemos utilizar una arrow function:
*/


setTimeout(() => {

    greet("Hola", "Juan");

}, 1000);


/*
Ambas formas son válidas.

La segunda es especialmente útil cuando necesitamos
hacer algo más complejo antes de llamar a la función.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 7. PASAR UN STRING DE CÓDIGO
// ═════════════════════════════════════════════════════════════════════════════

/*
Por razones históricas, también podemos hacer esto:
*/


setTimeout("console.log('Hola')", 1000);


/*
JavaScript interpreta el string como código.

Esto es similar conceptualmente a:

    new Function(...)


Sin embargo:

    - NO es recomendable.


Es mucho mejor pasar una función:
*/


setTimeout(() => {

    console.log("Hola");

}, 1000);


/*
REGLA:

    X setTimeout("código", 1000)

    -(yes) setTimeout(() => { código }, 1000)


No necesitamos convertir strings en código
cuando podemos pasar directamente una función.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 8. setTimeout() DEVUELVE UN IDENTIFICADOR
// ═════════════════════════════════════════════════════════════════════════════

/*
Cuando llamamos a setTimeout:

    setTimeout(...)

el método devuelve un identificador del temporizador.

Podemos guardarlo:
*/


let timerId = setTimeout(() => {

    console.log("Esto podría ejecutarse");

}, 5000);


console.log(timerId);


/*
En navegadores normalmente veremos un número.

Por ejemplo:

    1
    2
    3
    ...


Pero esto NO está garantizado en todos los entornos.

Por ejemplo, Node.js utiliza objetos de temporizador.

Lo importante es:

    timerId

identifica ese temporizador.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 9. clearTimeout()
// ═════════════════════════════════════════════════════════════════════════════

/*
Podemos cancelar un setTimeout utilizando:

    clearTimeout(timerId)


Ejemplo:
*/


let cancelableTimer = setTimeout(() => {

    console.log("NO debería aparecer");

}, 3000);


// Cancelamos el temporizador.
clearTimeout(cancelableTimer);


/*
Como lo cancelamos antes de que se ejecute,
el mensaje nunca aparecerá.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 10. EL ID NO SE CONVIERTE EN null
// ═════════════════════════════════════════════════════════════════════════════

/*
Después de cancelar un temporizador:

    clearTimeout(timerId)

la variable sigue teniendo el mismo valor.
*/


let timer = setTimeout(() => {

    console.log("Hola");

}, 1000);


console.log(timer);

clearTimeout(timer);

console.log(timer);


/*
El identificador no se transforma automáticamente en:

    null
    undefined


La variable sigue almacenando el identificador.

Cancelar el temporizador y modificar nuestra variable
son cosas diferentes.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 11. setInterval()
// ═════════════════════════════════════════════════════════════════════════════

/*
"setInterval" funciona de manera parecida a "setTimeout",
pero en lugar de ejecutar la función una sola vez,
la ejecuta repetidamente.


Sintaxis:

    setInterval(func, delay, arg1, arg2, ...)


Ejemplo:
*/


let intervalId = setInterval(() => {

    console.log("tick");

}, 2000);


/*
Esto produce aproximadamente:

    tick
    2 segundos
    tick
    2 segundos
    tick
    2 segundos
    ...


Y continúa hasta que lo detengamos.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 12. clearInterval()
// ═════════════════════════════════════════════════════════════════════════════

/*
Para detener un setInterval:

    clearInterval(intervalId)
*/


let interval = setInterval(() => {

    console.log("tick");

}, 1000);


// Después de 5 segundos detenemos el intervalo.
setTimeout(() => {

    clearInterval(interval);

    console.log("Intervalo detenido");

}, 5000);


/*
Tenemos aquí una combinación interesante:

    setInterval()
        ↓
    ejecuta repetidamente


    setTimeout()
        ↓
    después de 5 segundos


    clearInterval()
        ↓
    detiene el intervalo
*/


// ═════════════════════════════════════════════════════════════════════════════
// 13. DIFERENCIA ENTRE setTimeout Y setInterval
// ═════════════════════════════════════════════════════════════════════════════

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ setTimeout                                                                  │
└─────────────────────────────────────────────────────────────────────────────┘

Ejecuta una función una sola vez.

    setTimeout(func, 1000);

    espera aproximadamente 1 segundo
    ↓
    ejecuta func()
    ↓
    termina


┌─────────────────────────────────────────────────────────────────────────────┐
│ setInterval                                                                 │
└─────────────────────────────────────────────────────────────────────────────┘

Ejecuta una función repetidamente.

    setInterval(func, 1000);

    espera aproximadamente 1 segundo
    ↓
    ejecuta func()
    ↓
    espera aproximadamente 1 segundo
    ↓
    ejecuta func()
    ↓
    ...


Para detenerlo:

    clearInterval(timerId)
*/


// ═════════════════════════════════════════════════════════════════════════════
// 14. setInterval + setTimeout PARA DETENERLO
// ═════════════════════════════════════════════════════════════════════════════

/*
Ejemplo completo:
*/


let ticks = 0;

let ticker = setInterval(() => {

    ticks++;

    console.log(`Tick ${ticks}`);

}, 1000);


setTimeout(() => {

    clearInterval(ticker);

    console.log("Fin");

}, 5000);


/*
Aproximadamente veremos:

    Tick 1
    Tick 2
    Tick 3
    Tick 4
    Fin


Dependiendo del entorno y de la carga,
los tiempos reales pueden variar.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 15. LOS TEMPORIZADORES NO SON RELOJES EXACTOS
// ═════════════════════════════════════════════════════════════════════════════

/*
IMPORTANTE:

    setTimeout(func, 1000)

NO significa:

    "ejecuta exactamente 1000 ms después"


Significa aproximadamente:

    "no ejecutes la función antes de ese retraso mínimo;
    ejecútala cuando el entorno pueda hacerlo después."


Puede existir trabajo pendiente antes de nuestra función.

Por ejemplo:
*/


console.log("A");

setTimeout(() => {

    console.log("B");

}, 0);

console.log("C");


/*
El resultado será:

    A
    C
    B


NO:

    A
    B
    C


¿Por qué?

Porque setTimeout no interrumpe el código actual.

Primero termina el código que se está ejecutando.

Después el entorno puede ejecutar la función programada.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 16. setTimeout(..., 0)
// ═════════════════════════════════════════════════════════════════════════════

/*
Un caso especial:

    setTimeout(func, 0)


Significa:

    "programa esta función para ejecutarla
    lo antes posible después de que termine
    el código actual."


Ejemplo:
*/


setTimeout(() => {

    console.log("Mundo");

}, 0);


console.log("Hola");


/*
Resultado:

    Hola
    Mundo


Aunque escribimos primero el setTimeout,
"Hola" aparece primero.


¿Por qué?

Porque:

    setTimeout(..., 0)

no ejecuta inmediatamente la función.


La coloca para ejecutarla posteriormente.


Podemos imaginarlo así:

    Código actual
        │
        ▼
    console.log("Hola")
        │
        ▼
    termina el script actual
        │
        ▼
    función programada
        │
        ▼
    console.log("Mundo")


Este comportamiento está relacionado con el
EVENT LOOP de JavaScript.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 17. setInterval Y alert()
// ═════════════════════════════════════════════════════════════════════════════

/*
Un detalle interesante de los navegadores:

    alert()
    confirm()
    prompt()

pueden bloquear la interacción normal de la página.

El comportamiento exacto de los temporizadores
mientras una ventana modal está abierta depende del entorno.


Por ejemplo:
*/


let alertInterval = setInterval(() => {

    console.log("tick");

}, 2000);


/*
Si ejecutamos un alert durante un tiempo,
el comportamiento observable del intervalo
puede no coincidir exactamente con 2000 ms entre mensajes.


Por eso no debemos utilizar setInterval
como un reloj de precisión.
*/


setTimeout(() => {

    clearInterval(alertInterval);

}, 10000);


// ═════════════════════════════════════════════════════════════════════════════
// 18. setTimeout ANIDADO
// ═════════════════════════════════════════════════════════════════════════════

/*
Existe otra forma de repetir una operación:

    setTimeout()

que vuelve a programar otro setTimeout.


Ejemplo:
*/


let nestedTimer = setTimeout(function tick() {

    console.log("tick");

    nestedTimer = setTimeout(tick, 2000);

}, 2000);


/*
El comportamiento es:

    setTimeout
        │
        ▼
    tick()
        │
        ▼
    setTimeout
        │
        ▼
    tick()
        │
        ▼
    setTimeout
        │
        ▼
        ...


La siguiente ejecución se programa
DESPUÉS de terminar la ejecución actual.
*/


// Para detenerlo podemos cancelar el último timer.
setTimeout(() => {

    clearTimeout(nestedTimer);

}, 10000);


// ═════════════════════════════════════════════════════════════════════════════
// 19. setInterval VS setTimeout ANIDADO
// ═════════════════════════════════════════════════════════════════════════════

/*
Las dos técnicas permiten repetir una función.

Pero existe una diferencia importante.


CON setInterval:

    setInterval(func, 100);


Conceptualmente:

    ┌─────────┐
    │  100ms  │
    └────┬────┘
        ▼
    func()
        │
        └───────► próximo intervalo
                    │
                    ▼
                func()


El intervalo intenta mantener una frecuencia
determinada.


Con setTimeout anidado:

    setTimeout(function run() {

        func();

        setTimeout(run, 100);

    }, 100);


Tenemos:

    espera 100ms
        │
        ▼
    func()
        │
        │ termina
        ▼
    espera 100ms
        │
        ▼
    func()
        │
        ▼
        ...


La espera comienza DESPUÉS de que termine
la ejecución anterior.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 20. EJEMPLO PARA VER LA DIFERENCIA
// ═════════════════════════════════════════════════════════════════════════════

/*
Supongamos que "func" tarda 50 ms en ejecutarse.

Con setInterval:

    espera 100 ms
    ejecuta func durante 50 ms
    siguiente intervalo...


El tiempo entre comienzos puede aproximarse
al intervalo establecido, pero la ejecución consume tiempo.


Con setTimeout anidado:

    espera 100 ms
    ejecuta func durante 50 ms
    espera 100 ms
    ejecuta func...


Por lo tanto, tenemos:

    100 ms de espera
    +
    tiempo de ejecución


entre el final de una ejecución y el comienzo de la siguiente.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 21. EL GRAN PROBLEMA DE setInterval
// ═════════════════════════════════════════════════════════════════════════════

/*
Imaginemos:

    setInterval(func, 100);


Pero "func" tarda 150 ms en ejecutarse.


El intervalo es:

    100 ms


pero la función tarda:

    150 ms


La función no puede ejecutarse simultáneamente
consigo misma simplemente porque llegó otro intervalo.

El entorno debe esperar a que termine la ejecución actual.


Por eso "setInterval" NO garantiza que func
se ejecute exactamente cada X milisegundos.


El tiempo real depende también de:

    - duración de func
    - código que esté ejecutándose
    - carga del entorno
    - event loop
    - restricciones del navegador


IMPORTANTE:

Los temporizadores proporcionan una programación aproximada,
no un reloj de precisión.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 22. VENTAJA DEL setTimeout ANIDADO
// ═════════════════════════════════════════════════════════════════════════════

/*
El setTimeout anidado permite controlar mejor
el retraso entre ejecuciones.


Ejemplo:
*/


function runTask() {

    console.log("Ejecutando tarea");

    // Aquí podríamos realizar una operación.

    setTimeout(runTask, 1000);
}


setTimeout(runTask, 1000);


/*
La siguiente ejecución se programa DESPUÉS
de la ejecución actual.

Esto garantiza que haya un retraso de aproximadamente
1000 ms entre el final de una ejecución
y el comienzo de la siguiente.


Esto es especialmente útil cuando:

    - La operación tarda una cantidad variable de tiempo.
    - Queremos ajustar dinámicamente el delay.
    - Estamos realizando solicitudes a un servidor.
    - Queremos evitar ejecutar una operación mientras
    la anterior todavía está en curso.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 23. RETRASO DINÁMICO
// ═════════════════════════════════════════════════════════════════════════════

/*
Una gran ventaja del setTimeout anidado
es que podemos modificar el delay.

Ejemplo:

    5 segundos
    ↓
    si falla → 10 segundos
    ↓
    si vuelve a fallar → 20 segundos
    ↓
    si vuelve a fallar → 40 segundos


Esto se conoce como:

    exponential backoff

Es muy utilizado en sistemas de red.
*/


let delay = 5000;


function request() {

    console.log("Intentando realizar una solicitud...");


    /*
    Aquí imaginamos que hacemos una petición
    a un servidor.

    Si el servidor está sobrecargado:

        delay *= 2;

    De esta manera:

        5000
        10000
        20000
        40000
        ...
    */


    // Ejemplo conceptual:
    let serverOverloaded = false;


    if (serverOverloaded) {

        delay *= 2;

    }


    // Programamos el siguiente intento.
    setTimeout(request, delay);
}


// Primer intento.
setTimeout(request, delay);


/*
Esto sería mucho más difícil de controlar
con un setInterval fijo.

Con setTimeout podemos decidir el delay
de la siguiente ejecución en cada iteración.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 24. setTimeout ANIDADO PERMITE ADAPTARSE
// ═════════════════════════════════════════════════════════════════════════════

/*
Podemos cambiar el tiempo dependiendo
del resultado de la operación.


Ejemplo:
*/


let delayExample = 1000;


function process() {

    console.log("Procesando...");


    let success = Math.random() > 0.5;


    if (success) {

        console.log("Éxito");

        // Volvemos al intervalo normal.
        delayExample = 1000;

    } else {

        console.log("Falló");

        // Aumentamos el tiempo de espera.
        delayExample *= 2;
    }


    setTimeout(process, delayExample);
}


setTimeout(process, delayExample);


/*
Esto demuestra una ventaja importante:

    setInterval
        → intervalo fijo

    setTimeout anidado
        → intervalo configurable en cada ejecución
*/


// ═════════════════════════════════════════════════════════════════════════════
// 25. RECOLECCIÓN DE BASURA Y TEMPORIZADORES
// ═════════════════════════════════════════════════════════════════════════════

/*
Los temporizadores mantienen referencias a las funciones
que tienen programadas.


Por ejemplo:
*/


setTimeout(() => {

    console.log("Hola");

}, 10000);


/*
Mientras el temporizador esté pendiente,
el entorno necesita mantener accesible
la función callback para poder ejecutarla.


Por lo tanto, la función no puede ser recolectada
por el Garbage Collector simplemente porque
nosotros no tengamos otra referencia directa a ella.


Esto también puede mantener vivo el entorno léxico
que la función utiliza.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 26. CLOSURES + TEMPORIZADORES
// ═════════════════════════════════════════════════════════════════════════════

/*
Recordemos que una función puede mantener
referencias a su entorno léxico.
*/


function createTimer() {

    let largeData = new Array(1000000).fill("*");


    setTimeout(() => {

        console.log(largeData.length);

    }, 10000);
}


createTimer();


/*
Aunque createTimer() termine,
el callback todavía necesita acceder a:

    largeData


Por lo tanto, el entorno relacionado con esa función
debe mantenerse disponible mientras el callback
siga siendo necesario.


Por eso debemos cancelar los temporizadores
cuando ya no los necesitamos,
especialmente si mantienen referencias a datos grandes.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 27. CANCELAR CUANDO YA NO ES NECESARIO
// ═════════════════════════════════════════════════════════════════════════════

/*
Un patrón común es guardar el identificador
para poder cancelar el temporizador posteriormente.
*/


let timerToCancel = setTimeout(() => {

    console.log("Ejecutando...");

}, 10000);


// Cuando ya no lo necesitamos:
clearTimeout(timerToCancel);


/*
Con intervalos es todavía más importante:

    setInterval(...)
        ↓
    guardar ID
        ↓
    clearInterval(ID)


Si olvidamos cancelar un intervalo,
puede continuar ejecutándose indefinidamente.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 28. EL DELAY CERO NO ES REALMENTE CERO
// ═════════════════════════════════════════════════════════════════════════════

/*
En el navegador existe una particularidad:

    setTimeout(func, 0)


no significa que func se ejecute inmediatamente.

Primero debe terminar el código actual.


Además, los navegadores aplican restricciones
a los temporizadores anidados.


Después de cierto número de temporizadores anidados,
el navegador fuerza un retraso mínimo.


Históricamente, este mínimo es de aproximadamente:

    4 ms


para determinados temporizadores anidados.


Por eso algo como:
*/


let count = 0;

let start = Date.now();


function run() {

    count++;


    if (Date.now() - start >= 100) {

        console.log("Ejecuciones:", count);

        return;
    }


    setTimeout(run, 0);
}


setTimeout(run, 0);


/*
NO significa que "run" pueda ejecutarse infinitamente
sin ningún retraso real.


El navegador aplica sus propias reglas
para los temporizadores.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 29. IMPORTANTE: LOS TEMPORIZADORES NO BLOQUEAN
// ═════════════════════════════════════════════════════════════════════════════

/*
Consideremos:
*/


console.log("Inicio");


setTimeout(() => {

    console.log("Temporizador");

}, 2000);


console.log("Fin");


/*
Resultado:

    Inicio
    Fin
    Temporizador


El setTimeout no detiene JavaScript durante 2 segundos.


El flujo es:

    console.log("Inicio")
            ↓
    programar callback
            ↓
    continuar ejecución
            ↓
    console.log("Fin")
            ↓
    ...
            ↓
    cuando sea posible:
            ↓
    ejecutar callback


Esto es una idea FUNDAMENTAL para comprender
la asincronía en JavaScript.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 30. setTimeout NO ES "DORMIR" EL PROGRAMA
// ═════════════════════════════════════════════════════════════════════════════

/*
No debemos pensar:

    setTimeout(..., 5000)

como:

    "JavaScript duerme durante 5 segundos."


La forma correcta de pensarlo es:

    "Programa este callback para que pueda ejecutarse
    después de aproximadamente 5 segundos."


Mientras tanto, JavaScript puede continuar con otras tareas.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 31. RESUMEN
// ═════════════════════════════════════════════════════════════════════════════

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ setTimeout                                                                  │
└─────────────────────────────────────────────────────────────────────────────┘

Ejecuta una función una vez después de un delay:

    setTimeout(func, delay);


Ejemplo:

    setTimeout(() => {
        console.log("Hola");
    }, 1000);


Para cancelar:

    let timerId = setTimeout(...);

    clearTimeout(timerId);


──────────────────────────────────────────────────────────────────────────────


┌─────────────────────────────────────────────────────────────────────────────┐
│ setInterval                                                                 │
└─────────────────────────────────────────────────────────────────────────────┘

Ejecuta una función repetidamente:

    let timerId = setInterval(func, delay);


Para cancelar:

    clearInterval(timerId);


──────────────────────────────────────────────────────────────────────────────


┌─────────────────────────────────────────────────────────────────────────────┐
│ REFERENCIA VS EJECUCIÓN                                                     │
└─────────────────────────────────────────────────────────────────────────────┘

CORRECTO:

    setTimeout(sayHi, 1000);


INCORRECTO:

    setTimeout(sayHi(), 1000);


Porque:

    sayHi

es una referencia a la función.


Mientras:

    sayHi()

ejecuta la función inmediatamente.


──────────────────────────────────────────────────────────────────────────────


┌─────────────────────────────────────────────────────────────────────────────┐
│ setTimeout(..., 0)                                                          │
└─────────────────────────────────────────────────────────────────────────────┘

No significa "ejecutar inmediatamente".

Significa:

    "programar para ejecutarlo lo antes posible
    después de que termine el código actual."


Ejemplo:

    setTimeout(() => console.log("B"), 0);

    console.log("A");


Resultado:

    A
    B


──────────────────────────────────────────────────────────────────────────────


┌─────────────────────────────────────────────────────────────────────────────┐
│ setInterval VS setTimeout ANIDADO                                           │
└─────────────────────────────────────────────────────────────────────────────┘

setInterval:

    setInterval(func, 100);


Intenta ejecutar la función periódicamente.


setTimeout anidado:

    setTimeout(function run() {

        func();

        setTimeout(run, 100);

    }, 100);


La siguiente ejecución se programa después
de que termine la anterior.


Por eso setTimeout anidado permite:

    - Cambiar el delay dinámicamente.
    - Esperar a que termine la operación anterior.
    - Implementar reintentos.
    - Implementar exponential backoff.
    - Controlar mejor el tiempo entre ejecuciones.


──────────────────────────────────────────────────────────────────────────────


┌─────────────────────────────────────────────────────────────────────────────┐
│ TEMPORIZADORES Y MEMORIA                                                    │
└─────────────────────────────────────────────────────────────────────────────┘

Los temporizadores mantienen referencias a sus callbacks
mientras están pendientes.

Por lo tanto, un callback puede mantener vivo
su entorno léxico y las variables que utiliza.


Cuando ya no necesitamos un temporizador:

    clearTimeout(timerId)

o:

    clearInterval(timerId)


──────────────────────────────────────────────────────────────────────────────


┌─────────────────────────────────────────────────────────────────────────────┐
│ LOS TEMPORIZADORES NO SON EXACTOS                                           │
└─────────────────────────────────────────────────────────────────────────────┘

    setTimeout(func, 1000)


NO significa:

    "ejecuta exactamente después de 1000 ms."


Significa aproximadamente:

    "no antes de ese tiempo y cuando el entorno
    pueda ejecutar el callback."


El momento real depende de:

    - código que se esté ejecutando
    - event loop
    - carga del sistema
    - navegador / Node.js
    - restricciones del entorno


──────────────────────────────────────────────────────────────────────────────


┌─────────────────────────────────────────────────────────────────────────────┐
│ IDEA PRINCIPAL                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

setTimeout:

    UNA ejecución
        │
        ▼
    delay
        │
        ▼
    callback


setInterval:

    delay
    │
    ▼
    callback
    │
    ▼
    delay
    │
    ▼
    callback
    │
    ▼
    ...


setTimeout anidado:

    delay
    │
    ▼
    callback
    │
    ▼
    nuevo delay
    │
    ▼
    callback
    │
    ▼
    ...


La diferencia fundamental:

    setInterval
        → intervalo periódico.

    setTimeout anidado
        → siguiente ejecución programada después
        de que termina la actual.


Y una idea especialmente importante:

    setTimeout NO bloquea JavaScript.


    setTimeout(func, 0)

    ≠

    "ejecuta func ahora"


    significa:

    "ejecuta func cuando termine el código actual
    y el entorno pueda procesarlo."
*/


// ═════════════════════════════════════════════════════════════════════════════
// 32. EJEMPLO FINAL INTEGRADOR
// ═════════════════════════════════════════════════════════════════════════════

/*
Vamos a combinar:

    - setTimeout
    - clearTimeout
    - setInterval
    - clearInterval
    - setTimeout anidado
    - callback
    - delay dinámico
*/


let attempt = 0;
let delay = 1000;


function performTask() {

    attempt++;

    console.log(`Intento #${attempt}`);


    // Simulamos un resultado.
    let success = Math.random() > 0.5;


    if (success) {

        console.log("Tarea completada.");

        return;
    }


    console.log("Falló. Reintentando...");


    // Aumentamos el tiempo de espera.
    delay *= 2;


    // Programamos el siguiente intento.
    setTimeout(performTask, delay);
}


// Primer intento.
setTimeout(performTask, delay);


/*
Este patrón es muy importante en aplicaciones reales.

Conceptualmente:

    intento
    │
    ▼
    ¿éxito?
    /       \
    sí     no
    │       │
    ▼       ▼
    fin    aumentar delay
            │
            ▼
        setTimeout()
            │
            ▼
        intento


Este patrón permite crear sistemas de reintento
sin ejecutar constantemente la operación.

*/
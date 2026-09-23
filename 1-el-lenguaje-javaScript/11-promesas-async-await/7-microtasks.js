/*
MICROTAREAS

Los manejadores de promesas `.then()`, `.catch()` y `.finally()` siempre se ejecutan
de forma asíncrona.

Incluso si una `Promise` ya está resuelta o rechazada, sus manejadores no se ejecutan
inmediatamente. Primero termina de ejecutarse el código JavaScript actual y después
se procesan los manejadores correspondientes.

Esto ocurre porque los manejadores de promesas pasan por una cola interna llamada
`PromiseJobs`, conocida habitualmente como cola de microtareas.
*/

/*
1. LOS MANEJADORES DE PROMESAS SON ASÍNCRONOS

Una promesa puede estar resuelta desde el principio y, aun así, el manejador registrado
con `.then()` se ejecutará después del código síncrono que aparece a continuación.
*/

function ejemploPromesaResuelta() {
  const promesa = Promise.resolve();

  promesa.then(() => alert("promise done!"));

  alert("code finished");
}

/*
Orden de ejecución:

1. Se crea una promesa ya resuelta.
2. `.then()` registra su manejador.
3. El manejador no se ejecuta inmediatamente; pasa a la cola de microtareas.
4. Continúa ejecutándose el código actual.
5. Aparece primero "code finished".
6. Cuando termina el código actual, se procesa la microtarea.
7. Aparece "promise done!".

Resultado:

code finished
promise done!
*/


/*
2. COLA DE MICROTAREAS

El estándar ECMA especifica una cola interna llamada `PromiseJobs`.

Esta cola sigue dos reglas importantes:

1. Funciona con el principio FIFO:
   las tareas que entran primero se ejecutan primero.

2. Una tarea de la cola solamente comienza cuando no queda otro código actual
   ejecutándose.

Cuando una promesa está lista, sus manejadores `.then()`, `.catch()` y `.finally()`
se colocan en esta cola.

Por eso, estar en una promesa resuelta no significa que el manejador se ejecute
de inmediato. El manejador debe esperar a que termine el código actual.
*/


/*
3. CADENAS DE PROMESAS Y ORDEN DE EJECUCIÓN

Si queremos garantizar que un código se ejecute después de otro manejador de promesa,
podemos incorporarlo a la misma cadena mediante otro `.then()`.

Cada manejador se ejecutará de forma asíncrona y respetará el orden de la cadena.
*/

function ejemploOrdenConThen() {
  Promise.resolve()
    .then(() => alert("promise done!"))
    .then(() => alert("code finished"));
}

/*
Flujo:

Promise resuelta
-> primer `.then()`
-> segundo `.then()`

Resultado:

promise done!
code finished
*/


/*
4. VARIOS MANEJADORES EN UNA CADENA

En una cadena con varios `.then()`, `.catch()` o `.finally()`, cada manejador pasa
por la cola de microtareas.

Un manejador se ejecutará después de:

1. Que termine el código JavaScript actual.
2. Que hayan terminado las microtareas colocadas anteriormente en la cola.

Por lo tanto, todos estos manejadores son asíncronos, incluso cuando trabajan con
promesas que ya están resueltas.
*/


/*
5. RECHAZOS NO GESTIONADOS

JavaScript puede detectar cuándo una promesa rechazada no tiene un manejador apropiado.

Se considera que existe un rechazo no gestionado cuando el error de una promesa
continúa sin gestionarse al finalizar la cola de microtareas.

En el navegador, este caso puede provocar el evento `unhandledrejection`.
*/


/*
6. RECHAZO GESTIONADO A TIEMPO

En este ejemplo la promesa se rechaza, pero `.catch()` se agrega inmediatamente.

El manejador de rechazo queda registrado antes de que JavaScript determine que el
rechazo está sin gestionar.
*/

function ejemploRechazoGestionado() {
  const promesa = Promise.reject(new Error("Promise Failed!"));

  promesa.catch(() => alert("caught"));

  window.addEventListener("unhandledrejection", event => {
    alert(event.reason);
  });
}

/*
El evento `unhandledrejection` no se ejecuta debido a ese rechazo, porque el error
ya tiene un manejador `.catch()`.
*/


/*
7. RECHAZO SIN `.catch()`

Si una promesa se rechaza y no existe un manejador para el error, JavaScript puede
detectar el rechazo no gestionado al finalizar la cola de microtareas.
*/

function ejemploRechazoNoGestionado() {
  Promise.reject(new Error("Promise Failed!"));

  window.addEventListener("unhandledrejection", event => {
    alert(event.reason);
  });
}

/*
En este caso el navegador puede activar `unhandledrejection` con el error:

Error: Promise Failed!

Este ejemplo depende del navegador.
*/


/*
8. AGREGAR `.catch()` DEMASIADO TARDE

También es posible agregar un manejador de rechazo después de que JavaScript ya haya
detectado el rechazo no gestionado.

En el siguiente ejemplo, `.catch()` se agrega mediante `setTimeout()` después de
1000 milisegundos.
*/

function ejemploCatchTardio() {
  const promesa = Promise.reject(new Error("Promise Failed!"));

  setTimeout(() => {
    promesa.catch(() => alert("caught"));
  }, 1000);

  window.addEventListener("unhandledrejection", event => {
    alert(event.reason);
  });
}

/*
El orden observable es:

1. Promise Failed!
2. caught

El problema es que el rechazo ya fue considerado no gestionado antes de que
`setTimeout()` agregara el `.catch()`.

Cuando posteriormente aparece el manejador `.catch()`, el evento
`unhandledrejection` ya ocurrió.

Este ejemplo depende del navegador.
*/


/*
9. RELACIÓN ENTRE LA COLA DE MICROTAREAS Y `unhandledrejection`

El comportamiento anterior se entiende observando la cola de microtareas.

Cuando la cola correspondiente termina de procesarse, el motor puede examinar las
promesas rechazadas.

Si una promesa sigue rechazada sin que su error haya sido gestionado, se activa
`unhandledrejection`.

Por eso no basta con agregar `.catch()` en algún momento arbitrario: si se registra
demasiado tarde, el rechazo ya puede haber sido detectado como no gestionado.
*/


/*
10. IDEA GENERAL DEL FLUJO

Para una promesa ya resuelta:

código actual
-> manejador agregado a la cola de microtareas
-> termina el código actual
-> se ejecuta el manejador

Para una cadena:

código actual
-> primer manejador
-> siguiente manejador
-> siguientes manejadores

Para un rechazo no gestionado:

promesa rechazada
-> se procesan las microtareas
-> el error sigue sin manejarse
-> `unhandledrejection`
*/


/*
RESUMEN

1. `.then()`, `.catch()` y `.finally()` siempre ejecutan sus manejadores de forma
   asíncrona.

2. Incluso una `Promise` ya resuelta no ejecuta inmediatamente su `.then()`.

3. Los manejadores de promesas pasan por una cola interna denominada `PromiseJobs`,
   también conocida como cola de microtareas.

4. La cola utiliza el principio FIFO:
   primero en entrar, primero en salir.

5. Las microtareas comienzan a ejecutarse cuando ha terminado el código actual.

6. En una cadena de promesas, cada manejador se procesa de forma asíncrona y después
   de los manejadores que estaban antes en la cola.

7. Si necesitamos ejecutar código después de un manejador de promesa, podemos
   colocarlo en otro `.then()` encadenado.

8. Un rechazo se considera no gestionado si sigue sin un manejador apropiado al
   finalizar la cola de microtareas.

9. En el navegador, un rechazo no gestionado puede provocar el evento
   `unhandledrejection`.

10. Agregar un `.catch()` demasiado tarde no evita que `unhandledrejection` ya haya
    ocurrido.

11. Las microtareas están relacionadas con conceptos como el bucle de eventos y las
    macrotareas, pero esos conceptos se estudian por separado.
*/


/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos utilizan `alert()`, `window.addEventListener()` o rechazos intencionales,
por lo que están pensados para ejecutarse manualmente en un navegador.
*/

// ejemploPromesaResuelta();
// ejemploOrdenConThen();
// ejemploRechazoGestionado();
// ejemploRechazoNoGestionado();
// ejemploCatchTardio();
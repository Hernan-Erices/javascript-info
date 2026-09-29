/*
MANEJO DE ERRORES CON PROMESAS

Las cadenas de promesas permiten manejar errores de forma centralizada.

Cuando una promesa se rechaza, el control avanza por la cadena hasta encontrar
el manejador de rechazo más cercano. Normalmente se utiliza `.catch()` para ello.

Un `.catch()` colocado al final puede capturar:

1. Rechazos explícitos producidos con `reject()`.
2. Errores lanzados mediante `throw`.
3. Errores de programación ocurridos dentro de manejadores anteriores.
*/


/*
1. CAPTURA DE ERRORES CON `.catch()`

`.catch()` no necesita aparecer inmediatamente después de la promesa que puede
fallar. Puede colocarse después de uno o varios `.then()`.

Si cualquiera de las promesas anteriores se rechaza, el control pasa al
`.catch()` correspondiente.
*/

// Este ejemplo depende del navegador y realiza una solicitud de red.
// No se ejecuta automáticamente porque la URL falla intencionalmente.
function ejemploErrorDeRed() {
  fetch("https://no-such-server.blabla")
    .then((response) => response.json())
    .catch((error) => alert(error));
}


/*
Un `.catch()` al final de una cadena puede actuar como manejador común para los
errores producidos en cualquiera de las etapas anteriores.

En este ejemplo podrían producirse errores durante:

- La solicitud del archivo JSON.
- La conversión de la respuesta a JSON.
- La solicitud a GitHub.
- La conversión de esa respuesta a JSON.
- Cualquier operación dentro de los manejadores.

Si alguna de esas operaciones provoca un rechazo, el `.catch()` final recibe
el error.
*/

// Este ejemplo depende del navegador, del DOM y de solicitudes de red.
function ejemploCatchAlFinal() {
  fetch("/article/promise-chaining/user.json")
    .then((response) => response.json())
    .then((user) =>
      fetch(`https://api.github.com/users/${user.name}`)
    )
    .then((response) => response.json())
    .then(
      (githubUser) =>
        new Promise((resolve, reject) => {
          const imagen = document.createElement("img");

          imagen.src = githubUser.avatar_url;
          imagen.className = "promise-avatar-example";

          document.body.append(imagen);

          setTimeout(() => {
            imagen.remove();
            resolve(githubUser);
          }, 3000);
        })
    )
    .catch((error) => alert(error.message));
}


/*
2. `try...catch` IMPLÍCITO EN LAS PROMESAS

El código del ejecutor de una promesa tiene un mecanismo equivalente a un
`try...catch` invisible.

Si ocurre una excepción dentro del ejecutor, JavaScript la captura
automáticamente y convierte la promesa en una promesa rechazada.

Por eso lanzar un error con `throw` dentro del ejecutor produce el mismo efecto
que llamar a `reject()` con ese error.
*/

// Produce un error intencional.
// Flujo: throw -> rechazo -> catch.
function ejemploThrowEnEjecutor() {
  new Promise((resolve, reject) => {
    throw new Error("Whoops!");
  }).catch(alert);
}


// Comportamiento equivalente al ejemplo anterior.
// Flujo: reject -> catch.
function ejemploRejectExplicito() {
  new Promise((resolve, reject) => {
    reject(new Error("Whoops!"));
  }).catch(alert);
}


/*
El mecanismo de captura automática no existe solamente en el ejecutor de una
promesa. También funciona dentro de los manejadores de promesas.

Si un manejador `.then()` lanza un error mediante `throw`, la promesa resultante
queda rechazada.

El control salta entonces al manejador de errores más cercano.
*/

// Produce un error intencional.
// Flujo: resolve -> then -> throw -> catch.
function ejemploThrowDentroDeThen() {
  new Promise((resolve, reject) => {
    resolve("ok");
  })
    .then((resultado) => {
      throw new Error("Whoops!");
    })
    .catch(alert);
}


/*
Los errores capturados no tienen que ser producidos explícitamente con `throw`.

Un error de programación ocurrido dentro de un manejador también rechaza la
promesa resultante.
*/

// Produce intencionalmente un ReferenceError.
// Flujo: resolve -> then -> error -> catch.
function ejemploErrorDeProgramacion() {
  new Promise((resolve, reject) => {
    resolve("ok");
  })
    .then((resultado) => {
      blabla();
    })
    .catch(alert);
}


/*
Por tanto, un `.catch()` situado al final de una cadena puede manejar tanto
rechazos explícitos como errores accidentales ocurridos en los manejadores
anteriores.
*/


/*
3. VOLVER A LANZAR ERRORES

El comportamiento de `.catch()` es similar al de `try...catch`.

Un manejador puede:

1. Manejar el error y terminar normalmente.
2. No poder manejarlo y volver a lanzarlo mediante `throw`.

Si `.catch()` maneja el error y termina normalmente, la cadena deja de estar
en estado de error y continúa con el siguiente manejador de éxito.
*/


// Flujo: catch -> then.
function ejemploErrorManejado() {
  new Promise((resolve, reject) => {
    throw new Error("Whoops!");
  })
    .catch((error) => {
      alert("The error is handled, continue normally");
    })
    .then(() => {
      alert("Next successful handler runs");
    });
}


/*
En el ejemplo anterior:

1. El ejecutor lanza un error.
2. La promesa se rechaza.
3. `.catch()` captura el error.
4. El manejador finaliza normalmente.
5. La cadena continúa con el siguiente `.then()`.
*/


/*
Si un `.catch()` recibe un error que no sabe manejar, puede volver a lanzarlo.

El nuevo `throw` vuelve a rechazar la cadena y el control busca el siguiente
manejador de errores.
*/

// Flujo: catch -> throw -> catch.
function ejemploRelanzarError() {
  new Promise((resolve, reject) => {
    throw new Error("Whoops!");
  })
    .catch((error) => {
      if (error instanceof URIError) {
        // Aquí se manejaría un URIError.
      } else {
        alert("Can't handle such error");

        // Este error no puede manejarse aquí.
        throw error;
      }
    })
    .then(() => {
      // No se ejecuta en este caso porque el error fue relanzado.
    })
    .catch((error) => {
      alert(`The unknown error has occurred: ${error}`);

      /*
      No se lanza ningún error nuevo.

      Por tanto, este manejador termina normalmente y la ejecución podría
      continuar posteriormente por la ruta de éxito.
      */
    });
}


/*
4. UBICACIÓN DE `.catch()`

Podemos tener múltiples `.then()` y utilizar un solo `.catch()` al final para
capturar errores de cualquiera de las etapas anteriores.

Sin embargo, un `.catch()` debe colocarse en un lugar donde realmente sepamos
cómo manejar los errores que recibe.

Un manejador puede analizar el tipo de error:

- Si sabe manejarlo, termina normalmente.
- Si no sabe manejarlo, puede volver a lanzarlo para que otro `.catch()` lo
  procese más adelante.

Las clases de error permiten distinguir entre diferentes tipos de errores,
como se muestra con `URIError`.
*/


/*
5. SEGUNDO ARGUMENTO DE `.then()`

`.catch()` no es la única forma de proporcionar un manejador de errores.

Según el contenido de esta lección, `.then()` también puede manejar errores
cuando recibe un segundo argumento destinado al rechazo.

La idea general sigue siendo la misma: cuando ocurre un rechazo, la ejecución
busca un manejador de errores apropiado.
*/


/*
6. RECHAZOS NO GESTIONADOS

Si una promesa se rechaza y no existe ningún manejador de rechazo en la cadena,
el error queda sin gestionar.

Por ejemplo, si olvidamos colocar un `.catch()` al final, una excepción ocurrida
dentro de la promesa provoca un rechazo que no tiene ningún manejador.
*/

// Produce intencionalmente un rechazo no gestionado.
// No debe ejecutarse automáticamente.
function ejemploRechazoNoGestionado() {
  new Promise(function () {
    noSuchFunction();
  }).then(() => {
    // Uno o varios manejadores de éxito.
  });

  // No existe `.catch()` al final.
}


/*
En la práctica, un rechazo no gestionado representa una situación similar a un
error común que no ha sido capturado con `try...catch`.

El motor de JavaScript registra estos rechazos y genera un error global.

En el navegador, estos errores pueden observarse mediante el evento
`unhandledrejection`.
*/


/*
7. EVENTO `unhandledrejection`

En navegadores podemos registrar un manejador global para los rechazos de
promesas que no han sido tratados.

El objeto `event` proporciona dos propiedades importantes:

- `event.promise`: la promesa que produjo el rechazo.
- `event.reason`: el objeto que representa el error no gestionado.

Este mecanismo permite detectar errores que llegaron al final sin ningún
`.catch()`.
*/

// Este ejemplo depende del navegador.
// Produce intencionalmente un rechazo no gestionado.
function ejemploUnhandledRejection() {
  window.addEventListener("unhandledrejection", function (event) {
    alert(event.promise);
    alert(event.reason);
  });

  new Promise(function () {
    throw new Error("Whoops!");
  });
}


/*
Los errores no gestionados suelen indicar problemas que no pueden recuperarse
localmente.

El contenido recomienda utilizarlos para:

1. Informar al usuario de que ocurrió un problema.
2. Registrar o reportar el incidente al servidor.

En entornos que no son navegadores, como Node.js, existen otros mecanismos para
rastrear errores no controlados.
*/


/*
8. FLUJOS IMPORTANTES

CASO 1: rechazo normal

promesa rechazada
-> se omiten los manejadores de éxito
-> se busca el manejador de rechazo más cercano
-> `.catch()`


CASO 2: `throw` dentro del ejecutor

throw
-> rechazo automático
-> `.catch()`


CASO 3: error dentro de `.then()`

.then()
-> ocurre un error
-> la promesa resultante se rechaza
-> `.catch()`


CASO 4: `.catch()` maneja correctamente el error

error
-> `.catch()`
-> el manejador termina normalmente
-> siguiente `.then()`


CASO 5: `.catch()` no puede manejar el error

error
-> primer `.catch()`
-> throw
-> siguiente `.catch()`


CASO 6: no existe ningún manejador

error
-> promesa rechazada
-> no existe `.catch()`
-> rechazo no gestionado
-> `unhandledrejection` en el navegador
*/


/*
RESUMEN

1. `.catch()` maneja errores producidos por rechazos explícitos y por
   excepciones ocurridas dentro de promesas.

2. Un `.catch()` puede colocarse después de varios `.then()` y capturar los
   errores producidos anteriormente en la cadena.

3. El ejecutor de una promesa tiene un `try...catch` implícito: un `throw`
   convierte automáticamente la promesa en rechazada.

4. Los manejadores de promesas también tienen este comportamiento. Un error
   dentro de `.then()` rechaza la promesa resultante.

5. Los errores de programación también pueden convertirse en rechazos cuando
   ocurren dentro de un ejecutor o manejador de promesas.

6. Si `.catch()` maneja un error y termina normalmente, la cadena puede
   continuar con el siguiente `.then()`.

7. Si `.catch()` no puede manejar un error, puede volver a lanzarlo con
   `throw`, haciendo que el control pase al siguiente manejador de errores.

8. `.then()` también puede recibir un segundo argumento que actúa como
   manejador de errores.

9. Debemos colocar `.catch()` donde realmente sepamos cómo manejar los errores
   correspondientes. Los errores desconocidos pueden volver a lanzarse.

10. Si no existe forma de recuperarse de un error, no es obligatorio manejarlo
    localmente con `.catch()`.

11. Si ningún manejador procesa un rechazo, se convierte en un rechazo no
    gestionado.

12. En navegadores, los rechazos no gestionados pueden detectarse mediante el
    evento `unhandledrejection`.

13. `event.promise` identifica la promesa que generó el rechazo y
    `event.reason` contiene el error no gestionado.

14. Los rechazos no gestionados deben rastrearse para evitar que una aplicación
    falle sin proporcionar información sobre el problema.
*/


/*
ACTIVACIÓN MANUAL

Los siguientes ejemplos producen alertas, errores intencionales, solicitudes
de red, cambios en el DOM o rechazos no gestionados.

Descomenta solamente el ejemplo que quieras probar en un entorno adecuado.
*/

// ejemploErrorDeRed();
// ejemploCatchAlFinal();
// ejemploThrowEnEjecutor();
// ejemploRejectExplicito();
// ejemploThrowDentroDeThen();
// ejemploErrorDeProgramacion();
// ejemploErrorManejado();
// ejemploRelanzarError();
// ejemploRechazoNoGestionado();
// ejemploUnhandledRejection();
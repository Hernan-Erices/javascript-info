/*
===============================================================================
PROMESAS (PROMISES)
===============================================================================

OBJETIVO:
- Entender qué problema solucionan las Promesas.
- Entender qué es una Promise.
- Entender resolve() y reject().
- Entender los estados de una Promise.
- Entender el resultado de una Promise.
- Aprender .then().
- Aprender .catch().
- Aprender .finally().
- Entender cómo se manejan los errores.
- Reescribir callbacks utilizando Promises.
- Entender las ventajas de las Promises frente a callbacks.

CONCEPTO PREVIO IMPORTANTE:

En el capítulo anterior vimos que las operaciones asíncronas pueden
manejarse mediante callbacks.

El problema aparece cuando tenemos muchas operaciones encadenadas:

    operación1(() => {
        operación2(() => {
            operación3(() => {
                ...
            });
        });
    });

Esto puede producir:

    Callback Hell
    Pyramid of Doom

Las Promises proporcionan una forma más organizada de manejar
operaciones asíncronas.
*/


// =============================================================================
// 1. ¿QUÉ PROBLEMA RESUELVE UNA PROMISE?
// =============================================================================

/*
Imaginemos una operación que tarda cierto tiempo en producir un resultado.

Por ejemplo:

    - Descargar información.
    - Cargar un archivo.
    - Realizar una petición de red.
    - Esperar un temporizador.
    - Procesar algún dato.

Tenemos dos partes:

    PRODUCTOR
        |
        | realiza una operación que tarda
        v
    RESULTADO
        |
        v
    CONSUMIDORES


El PRODUCTOR es el código que realiza la operación.

Los CONSUMIDORES son las partes del programa que necesitan el resultado.

Una Promise actúa como intermediario entre ambos.


Conceptualmente:

                PRODUCTOR
                    |
                    | genera resultado
                    v
                PROMISE
                 /    \
                /      \
               v        v
          consumidor  consumidor


La Promise representa un resultado que todavía no tenemos,
pero que tendremos en el futuro.


Una buena forma de pensar en ella:

    Promise = "Te prometo que posteriormente te entregaré
               un resultado o un error."


*/


// =============================================================================
// 2. CREAR UNA PROMISE
// =============================================================================

/*
La sintaxis básica es:

    new Promise(function(resolve, reject) {
        // código productor
    });


Ejemplo:

*/

let promise = new Promise(function(resolve, reject) {

    // Aquí colocamos el código que realizará el trabajo.

});


/*
La función que recibe new Promise() se llama:

    EXECUTOR

Es decir:

    new Promise(EXECUTOR)


El executor se ejecuta AUTOMÁTICAMENTE cuando se crea la Promise.

No tenemos que llamarlo manualmente.


Por ejemplo:
*/

let promiseEjecutor = new Promise(function(resolve, reject) {

    console.log("El executor se ejecuta automáticamente.");

});


/*
Al crear la Promise:

    new Promise(...)

JavaScript ejecuta inmediatamente:

    function(resolve, reject) {
        ...
    }


IMPORTANTE:

El executor es el código PRODUCTOR.

Su trabajo es realizar la operación y finalmente indicar:

    resolve(resultado)

o:

    reject(error)
*/


// =============================================================================
// 3. resolve() Y reject()
// =============================================================================

/*
El executor recibe DOS funciones especiales:

    resolve
    reject


Estas funciones son proporcionadas por JavaScript.

Nosotros NO tenemos que crearlas.


Su propósito es informar a la Promise del resultado de la operación.


RESOLVE
-------

Se utiliza cuando la operación terminó correctamente.

    resolve(value)


Ejemplo:

*/

let promiseExitosa = new Promise(function(resolve, reject) {

    // Simulamos una operación que tarda 1 segundo.

    setTimeout(() => {

        // La operación terminó correctamente.
        resolve("done");

    }, 1000);

});


/*
Después de 1 segundo:

    resolve("done")


indica:

    "La operación terminó correctamente
     y el resultado es 'done'."


------------------------------------------------------------

REJECT
------

Se utiliza cuando la operación terminó con un error.

    reject(error)


Ejemplo:
*/

let promiseFallida = new Promise(function(resolve, reject) {

    setTimeout(() => {

        // La operación terminó con un error.
        reject(new Error("Whoops!"));

    }, 1000);

});


/*
En este caso:

    reject(new Error("Whoops!"))

indica:

    "La operación falló y este es el error."


Por convención, se recomienda utilizar objetos Error:

    reject(new Error("Descripción del error"));

en lugar de simplemente:

    reject("algo salió mal");


Esto permite trabajar con información de error de una forma más
consistente.
*/


// =============================================================================
// 4. ESTADOS DE UNA PROMISE
// =============================================================================

/*
Una Promise tiene internamente un ESTADO.

Inicialmente:

    "pending"


Es decir:

    PENDIENTE

Todavía no sabemos si la operación terminará correctamente o con error.


Posteriormente puede cambiar a:

    "fulfilled"

o:

    "rejected"


Por lo tanto:

                    PENDING
                       |
              +--------+--------+
              |                 |
              v                 v
          FULFILLED          REJECTED
              |                 |
              v                 v
           éxito              error


Los tres estados conceptuales son:

    pending
        = todavía pendiente

    fulfilled
        = terminó correctamente

    rejected
        = terminó con error


Una Promise solamente puede avanzar una vez.
*/


// =============================================================================
// 5. EL RESULTADO DE UNA PROMISE
// =============================================================================

/*
Además del estado, una Promise tiene internamente un RESULTADO.

Conceptualmente:

    state
    result


Inicialmente:

    state  = "pending"
    result = undefined


Si hacemos:

    resolve("done")


pasa a:

    state  = "fulfilled"
    result = "done"


Si hacemos:

    reject(error)


pasa a:

    state  = "rejected"
    result = error


Podemos visualizarlo así:

ANTES:

    state:  "pending"
    result: undefined


DESPUÉS DE resolve("done"):

    state:  "fulfilled"
    result: "done"


DESPUÉS DE reject(error):

    state:  "rejected"
    result: error


IMPORTANTE:

Estas propiedades son INTERNAS.

No podemos hacer:

    promise.state

o:

    promise.result


para obtenerlas directamente.

Para interactuar con una Promise utilizamos:

    .then()
    .catch()
    .finally()
*/


// =============================================================================
// 6. UNA PROMISE SOLO PUEDE TERMINAR UNA VEZ
// =============================================================================

/*
Una vez que una Promise pasa de:

    pending

a:

    fulfilled

o:

    rejected


su estado es DEFINITIVO.


Por ejemplo:
*/

let promiseUnaSolaVez = new Promise(function(resolve, reject) {

    resolve("done");

    // Todo lo siguiente será ignorado.

    reject(new Error("error"));

    setTimeout(() => {

        resolve("otro resultado");

    }, 1000);

});


/*
El resultado final seguirá siendo:

    fulfilled
    "done"


¿Por qué?

Porque la Promise solamente puede tener:

    UN resultado

o:

    UN error


Nunca ambos.


Podemos pensar en resolve() / reject() como una decisión definitiva:

    PENDING
       |
       +---- resolve() ---> FULFILLED
       |
       +---- reject() ----> REJECTED

Una vez tomada la decisión:

    NO SE PUEDE CAMBIAR.
*/


// =============================================================================
// 7. resolve() Y reject() SOLO NECESITAN UN ARGUMENTO
// =============================================================================

/*
Normalmente:

    resolve(value)

y:

    reject(error)


Los argumentos adicionales no se utilizan como resultados adicionales.

La Promise representa un único resultado o un único error.

Si necesitamos varios valores, podemos agruparlos, por ejemplo, en:

    - un objeto
    - un array

Ejemplo conceptual:

    resolve({
        nombre: "Juan",
        edad: 25
    });


*/


// =============================================================================
// 8. RESOLVER UNA PROMISE INMEDIATAMENTE
// =============================================================================

/*
Una Promise NO necesariamente tiene que tardar.

Podemos resolverla inmediatamente.

*/

let promiseInmediata = new Promise(function(resolve, reject) {

    resolve(123);

});


/*
Aquí el executor se ejecuta inmediatamente y llama:

    resolve(123)


Por lo tanto la Promise pasa inmediatamente a:

    fulfilled

con resultado:

    123


Esto puede ser útil, por ejemplo, cuando:

    - el resultado ya está disponible.
    - los datos están almacenados en caché.
    - no necesitamos realizar una operación asíncrona.


No debemos pensar que:

    Promise = siempre tarda


Una Promise representa un resultado que puede estar:

    - pendiente
    - disponible
    - rechazado
*/


// =============================================================================
// 9. LOS "CONSUMIDORES" DE UNA PROMISE
// =============================================================================

/*
Hasta ahora hemos visto el PRODUCTOR:

    new Promise((resolve, reject) => {
        ...
    });


Pero necesitamos consumidores.

Los consumidores son las partes del programa que dicen:

    "Cuando la Promise termine, quiero hacer algo con el resultado."


Para eso tenemos:

    .then()
    .catch()
    .finally()


El método principal es:

    .then()
*/


// =============================================================================
// 10. .then()
// =============================================================================

/*
Sintaxis:

    promise.then(
        function(result) {
            // éxito
        },
        function(error) {
            // error
        }
    );


.then() puede recibir DOS funciones:

    1. Primera función:
       se ejecuta si la Promise se cumple.

    2. Segunda función:
       se ejecuta si la Promise es rechazada.


*/


// Ejemplo de éxito:

let promiseThen = new Promise(function(resolve, reject) {

    setTimeout(() => {

        resolve("done!");

    }, 1000);

});


promiseThen.then(

    // Se ejecuta cuando resolve() es llamado.
    result => {
        console.log("Resultado:", result);
    },

    // Se ejecutaría si reject() fuera llamado.
    error => {
        console.error("Error:", error);
    }

);


/*
Después de 1 segundo:

    Resultado: done!


La segunda función NO se ejecuta porque la Promise fue cumplida.


Podemos representarlo:

            PROMISE
               |
               v
        ¿cómo terminó?
          /          \
         /            \
     resolve         reject
        |               |
        v               v
    .then() éxito    .then() error
*/


// =============================================================================
// 11. .then() SOLO PARA ÉXITO
// =============================================================================

/*
Si solamente nos interesa el resultado exitoso,
podemos proporcionar un solo argumento.

*/

let promiseSoloExito = new Promise(resolve => {

    setTimeout(() => {

        resolve("done!");

    }, 1000);

});


promiseSoloExito.then(result => {

    console.log(result);

});


/*
Es equivalente a decir:

    "No me interesa manejar el error aquí."


Podemos utilizar:

    promise.then(result => {
        ...
    });


*/


// =============================================================================
// 12. .catch()
// =============================================================================

/*
Si solamente nos interesa manejar errores podemos utilizar:

    .catch()


Por ejemplo:
*/

let promiseCatch = new Promise((resolve, reject) => {

    setTimeout(() => {

        reject(new Error("Whoops!"));

    }, 1000);

});


promiseCatch.catch(error => {

    console.error(error);

});


/*
.catch() es una forma abreviada de:

    .then(null, errorHandler)


Es decir:

    promise.catch(errorHandler)


equivale a:

    promise.then(null, errorHandler)


Por lo tanto:

    .then()
        = manejar éxito y/o error

    .catch()
        = manejar errores
*/


// =============================================================================
// 13. .finally()
// =============================================================================

/*
Existe un tercer método:

    .finally()


Se utiliza para ejecutar código independientemente de si la Promise:

    - fue cumplida
    - fue rechazada


Es especialmente útil para tareas de LIMPIEZA o FINALIZACIÓN.


Ejemplos:

    - detener un indicador de carga.
    - cerrar una conexión.
    - liberar un recurso.
    - ejecutar una acción que siempre debe ocurrir.


Conceptualmente:

              PROMISE
                 |
          +------+------+
          |             |
       resolve        reject
          |             |
          +------+------+
                 |
                 v
             finally()


*/


// Ejemplo:

new Promise((resolve, reject) => {

    setTimeout(() => {

        resolve("done");

    }, 1000);

})
.finally(() => {

    console.log("La operación terminó.");

})
.then(result => {

    console.log("Resultado:", result);

});


/*
El flujo es:

    Promise
       |
       v
    resolve()
       |
       v
    finally()
       |
       v
    then()


El finally() se ejecuta antes de continuar con el siguiente handler.
*/


// =============================================================================
// 14. finally() SE EJECUTA TAMBIÉN CON ERRORES
// =============================================================================

new Promise((resolve, reject) => {

    setTimeout(() => {

        reject(new Error("Algo salió mal"));

    }, 1000);

})
.finally(() => {

    console.log("La operación terminó.");

})
.catch(error => {

    console.error("Error:", error);

});


/*
Aquí:

    Promise
       |
       v
    reject()
       |
       v
    finally()
       |
       v
    catch()


El finally() se ejecuta igualmente.


Por eso resulta útil para tareas generales de limpieza.
*/


// =============================================================================
// 15. finally() NO RECIBE EL RESULTADO
// =============================================================================

/*
Un finally() no recibe como argumento:

    - el resultado
    - el error


Por ejemplo:

*/

Promise.resolve("valor")

    .finally(() => {

        // No recibimos "valor" aquí.
        console.log("Finalizando...");

    });


/*
Esto es intencional.

finally() no está diseñado para procesar el resultado.

Está diseñado para realizar una acción general que debe ocurrir
independientemente del resultado.
*/


// =============================================================================
// 16. finally() TRANSMITE EL RESULTADO
// =============================================================================

/*
Una característica muy importante:

    finally() NO consume el resultado.

Si la Promise tenía:

    "value"


ese valor continúa hacia el siguiente .then().


Ejemplo:
*/

new Promise((resolve, reject) => {

    setTimeout(() => {

        resolve("value");

    }, 1000);

})
.finally(() => {

    console.log("Promise lista.");

})
.then(result => {

    console.log(result);

});


/*
El resultado será:

    Promise lista.
    value


Es decir:

    resolve("value")
          |
          v
       finally()
          |
          |  transmite "value"
          v
        then()


El finally() actúa como una etapa intermedia sin consumir el resultado.
*/


// =============================================================================
// 17. finally() TAMBIÉN TRANSMITE LOS ERRORES
// =============================================================================

/*
Lo mismo ocurre con un error.

*/

new Promise((resolve, reject) => {

    reject(new Error("error"));

})
.finally(() => {

    console.log("Promise lista.");

})
.catch(error => {

    console.error(error);

});


/*
Flujo:

    reject(error)
         |
         v
      finally()
         |
         | transmite el error
         v
       catch()


Por lo tanto finally() permite realizar limpieza sin destruir
el resultado ni el error.
*/


// =============================================================================
// 18. ¿QUÉ PASA SI finally() GENERA UN ERROR?
// =============================================================================

/*
Hay una excepción importante.

Si dentro de finally() ocurre un error:

    ese nuevo error reemplaza el resultado/error anterior
    y se transmite al siguiente manejador.


Conceptualmente:

    Promise
       |
       v
    finally()
       |
       +---- genera error
                |
                v
              catch()


Esto tiene sentido porque la ejecución de finally() también puede fallar.
*/


// =============================================================================
// 19. RESUMEN DE finally()
// =============================================================================

/*
finally():

    - Se ejecuta tanto con éxito como con error.
    - No recibe argumentos.
    - Está pensado para limpieza/finalización.
    - Normalmente no modifica el resultado.
    - Transfiere el resultado al siguiente .then().
    - Transfiere el error al siguiente .catch().
    - Si genera un error, ese nuevo error se transmite.


IDEA CLAVE:

    finally()
        = "Haz esto al terminar, sin importar cómo terminó."


NO:

    finally()
        = "Procesa el resultado"


Para procesar el resultado:

    .then()


Para procesar errores:

    .catch()
*/


// =============================================================================
// 20. PODEMOS AGREGAR HANDLERS A UNA PROMISE YA TERMINADA
// =============================================================================

/*
Una Promise puede estar resuelta ANTES de que agreguemos un .then().

Ejemplo:

*/

let promiseYaResuelta = new Promise(resolve => {

    // Se resuelve inmediatamente.
    resolve("done!");

});


promiseYaResuelta.then(result => {

    console.log(result);

});


/*
Aunque la Promise ya estaba resuelta cuando agregamos .then(),

    .then()

seguirá recibiendo el resultado.


Esto es una característica importante de las Promises.

Podemos agregar consumidores aunque el resultado ya exista.
*/


// =============================================================================
// 21. CALLBACKS VS PROMISES
// =============================================================================

/*
En el capítulo anterior teníamos:

*/

function loadScriptCallback(src, callback) {

    let script = document.createElement("script");

    script.src = src;

    script.onload = () => {
        callback(null, script);
    };

    script.onerror = () => {
        callback(
            new Error(`Script load error for ${src}`)
        );
    };

    document.head.append(script);
}


/*
Uso:

    loadScriptCallback("script.js", function(error, script) {

        if (error) {
            // manejar error
        } else {
            // utilizar script
        }

    });


El consumidor tiene que proporcionar el callback
EN EL MOMENTO de llamar a loadScript().


Ahora vamos a cambiar el diseño.


En lugar de:

    loadScript(src, callback)


utilizaremos:

    loadScript(src)

y devolveremos una Promise.


*/


// =============================================================================
// 22. LOADSCRIPT() CON PROMISE
// =============================================================================

function loadScript(src) {

    return new Promise(function(resolve, reject) {

        let script = document.createElement("script");

        script.src = src;

        // Si se carga correctamente:
        script.onload = () => {

            resolve(script);

        };

        // Si ocurre un error:
        script.onerror = () => {

            reject(
                new Error(`Script load error for ${src}`)
            );

        };

        document.head.append(script);

    });

}


/*
Observa la diferencia.


ANTES:

    loadScript(src, callback)


AHORA:

    loadScript(src)


La función devuelve:

    Promise


La Promise representa:

    "El script todavía se está cargando.
     Cuando termine, tendrás el resultado."


*/


// =============================================================================
// 23. UTILIZAR LOADSCRIPT() CON PROMISE
// =============================================================================

let scriptPromise = loadScript("script.js");


scriptPromise.then(

    // Éxito
    script => {

        console.log(`${script.src} se cargó correctamente.`);

    },

    // Error
    error => {

        console.error(`Error: ${error.message}`);

    }

);


/*
Ahora tenemos una separación más clara:

PRODUCTOR:

    loadScript()


CONSUMIDOR:

    .then()


La función loadScript() se concentra en:

    "Cargar el script."


El consumidor se concentra en:

    "¿Qué hago cuando termine?"


Esto es una de las grandes ventajas de las Promises.
*/


// =============================================================================
// 24. UNA PROMISE PUEDE TENER VARIOS CONSUMIDORES
// =============================================================================

/*
Una Promise puede tener múltiples .then().

Por ejemplo:

*/

let promiseMultipleHandlers = loadScript("script.js");


promiseMultipleHandlers.then(script => {

    console.log("Consumidor 1:", script.src);

});


promiseMultipleHandlers.then(script => {

    console.log("Consumidor 2:", script.src);

});


promiseMultipleHandlers.then(script => {

    console.log("Consumidor 3:", script.src);

});


/*
Los tres consumidores pueden reaccionar al mismo resultado.


Conceptualmente:

                     Promise
                    /   |   \
                   /    |    \
                  v     v     v
                then  then   then
                  |     |     |
                  v     v     v
                 C1    C2    C3


Cada .then() agrega un nuevo consumidor.


Esto contrasta con el patrón de callback anterior,
donde normalmente proporcionábamos un único callback.


*/


// =============================================================================
// 25. VENTAJAS FRENTE A CALLBACKS
// =============================================================================

/*
VENTAJA 1 ? FLUJO MÁS NATURAL
-----------------------------

Con Promise:

*/

let promiseScript = loadScript("script.js");

promiseScript.then(script => {

    console.log("Script cargado.");

});


/*
Primero:

    loadScript()


Después:

    .then(...)


La lectura sigue un orden más natural:

    "Carga esto."

    "Cuando esté listo, haz esto."


Con callbacks teníamos:

    loadScript("script.js", callback);


El callback tenía que estar disponible desde el principio.


------------------------------------------------------------

VENTAJA 2 ? MÚLTIPLES CONSUMIDORES
-----------------------------------

Podemos hacer:

    promise.then(...)
    promise.then(...)
    promise.then(...)


Cada uno puede reaccionar al mismo resultado.


------------------------------------------------------------

VENTAJA 3 ? MEJOR SEPARACIÓN
----------------------------

El código productor crea la Promise.

El código consumidor decide qué hacer con ella.


------------------------------------------------------------

VENTAJA 4 ? MANEJO DE ERRORES
-----------------------------

Tenemos:

    .catch()


para manejar errores de manera más cómoda.


------------------------------------------------------------

VENTAJA 5 ? EVITAMOS PARTE DEL CALLBACK HELL
---------------------------------------------

Las Promises están diseñadas para poder encadenarse.

Esto será especialmente importante en:

    PROMISE CHAINING

que se verá en el siguiente tema.
*/


// =============================================================================
// 26. COMPARACIÓN DIRECTA
// =============================================================================

/*

                CALLBACKS                    PROMISES
                ---------                    --------


PRODUCTOR:

    loadScript(src, callback)       loadScript(src)


CONSUMIDOR:

    callback(...)                   promise.then(...)


ERROR:

    callback(error)                 promise.catch(...)


LIMPIEZA:

    manual / callback              promise.finally(...)


MÚLTIPLES CONSUMIDORES:

    normalmente un callback        múltiples .then()


CADENAS:

    callbacks anidados             encadenamiento de Promises


*/


// =============================================================================
// 27. FLUJO COMPLETO DE UNA PROMISE
// =============================================================================

/*
Podemos resumir todo el funcionamiento:

    new Promise(executor)
             |
             v
        executor()
             |
             v
        ¿qué ocurre?
          /       \
         /         \
        v           v
    resolve()     reject()
        |           |
        v           v
    fulfilled    rejected
        |           |
        +-----+-----+
              |
              v
       consumidores
              |
       +------+------+------+
       |      |      |      |
       v      v      v      v
     then   catch  finally  ...
*/


// =============================================================================
// 28. EJEMPLO COMPLETO
// =============================================================================

/*
Creamos una Promise que simula una operación que tarda 2 segundos.
*/

let operacion = new Promise((resolve, reject) => {

    setTimeout(() => {

        // Simulamos éxito.
        resolve("Operación completada.");

    }, 2000);

});


operacion

    // Se ejecuta siempre al finalizar.
    .finally(() => {

        console.log("La operación terminó.");

    })

    // Procesamos el resultado.
    .then(resultado => {

        console.log("Resultado:", resultado);

    })

    // Procesamos un posible error.
    .catch(error => {

        console.error("Error:", error);

    });


/*
Flujo en caso de éxito:

    pending
       |
       | 2 segundos
       v
    resolve()
       |
       v
    fulfilled
       |
       v
    finally()
       |
       v
    then()
       |
       v
    resultado


Flujo en caso de error:

    pending
       |
       v
    reject()
       |
       v
    rejected
       |
       v
    finally()
       |
       v
    catch()
       |
       v
    error


*/


// =============================================================================
// 29. CONCEPTOS QUE DEBES DOMINAR
// =============================================================================

/*
PROMISE
-------

Objeto que representa el resultado futuro de una operación.


EXECUTOR
--------

Función que recibe new Promise() y que se ejecuta automáticamente.


RESOLVE
-------

Indica que la operación terminó correctamente.

    resolve(resultado)


REJECT
------

Indica que la operación terminó con error.

    reject(error)


PENDING
-------

La Promise todavía no terminó.


FULFILLED
---------

La Promise terminó correctamente.


REJECTED
--------

La Promise terminó con error.


THEN
----

Permite reaccionar al resultado exitoso y/o al error.

    promise.then(success, error)


CATCH
-----

Permite reaccionar a errores.

    promise.catch(error)


FINALLY
-------

Permite ejecutar código de limpieza/finalización
independientemente de si hubo éxito o error.

    promise.finally(cleanup)


*/


// =============================================================================
// 30. REGLAS IMPORTANTES PARA MEMORIZAR
// =============================================================================

/*

REGLA 1
-------
El executor se ejecuta automáticamente.

    new Promise(executor)


REGLA 2
-------
Una Promise comienza en:

    pending


REGLA 3
-------
Una Promise puede terminar en:

    fulfilled
    rejected


REGLA 4
-------
Una Promise solamente puede cambiar de estado UNA VEZ.

    pending -> fulfilled

o:

    pending -> rejected


Nunca:

    fulfilled -> rejected

ni:

    rejected -> fulfilled


REGLA 5
-------
resolve() significa éxito.

    resolve(value)


REGLA 6
-------
reject() significa error.

    reject(error)


REGLA 7
-------
Se recomienda rechazar con un objeto Error.

    reject(new Error("Mensaje"))


REGLA 8
-------
.then() maneja resultados y opcionalmente errores.

    promise.then(success, error)


REGLA 9
-------
.catch() es equivalente a:

    then(null, errorHandler)


REGLA 10
--------
.finally() se ejecuta tanto con éxito como con error.


REGLA 11
--------
finally() no recibe el resultado ni el error.


REGLA 12
--------
finally() normalmente permite que el resultado/error continúe
hacia el siguiente handler.


REGLA 13
--------
Una Promise puede tener múltiples consumidores:

    promise.then(...)
    promise.then(...)
    promise.then(...)


REGLA 14
--------
Una Promise puede tener consumidores incluso después de haberse
resuelto.


REGLA 15
--------
Las Promises permiten separar:

    PRODUCCIÓN DEL RESULTADO

de:

    CONSUMO DEL RESULTADO.


===============================================================================
RESUMEN FINAL
===============================================================================

CALLBACK:

    "Cuando termines, llama a esta función."


PROMISE:

    "Aquí tienes un objeto que representa el resultado futuro.
     Puedes suscribirte a él mediante .then(), .catch() y .finally()."


CALLBACK:

    operación(callback)


PROMISE:

    let promise = operación();

    promise.then(...);


CALLBACK HELL:

    operación1(() => {
        operación2(() => {
            operación3(() => {
                ...
            });
        });
    });


PROMISES:

    operación1()
        .then(...)
        .then(...)
        .then(...)


La principal idea que debes llevarte de este capítulo es:

    Una Promise representa el resultado futuro de una operación.

Y tiene tres estados importantes:

    pending
       |
       +----> fulfilled
       |
       +----> rejected


Para consumirla utilizamos:

    .then()
    .catch()
    .finally()


El siguiente concepto importante será:

    PROMISE CHAINING

es decir, cómo encadenar múltiples operaciones asíncronas
utilizando Promises.
*/
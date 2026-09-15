/*
MANEJO DE ERRORES CON PROMESAS

Material de estudio basado exclusivamente en:
https://javascript.info/promise-error-handling

Si una promesa se rechaza, el control avanza por la cadena hasta encontrar
el manejador de rechazo más cercano.

Por eso es habitual colocar .catch() al final de una cadena: puede capturar
rechazos y errores producidos en cualquiera de los pasos anteriores.

Los ejemplos están dentro de funciones y no se ejecutan automáticamente.
*/

/*
1. ERROR EN UNA SOLICITUD

Si fetch() falla, su promesa se rechaza. El manejador de éxito de .then()
se omite y el control pasa al .catch() más cercano.

.catch() no tiene que aparecer inmediatamente después de la promesa.
Puede colocarse después de uno o varios .then().
*/
function ejemploErrorDeRed() {
    return fetch("https://no-such-server.blabla")
    .then((response) => response.json())
    .catch((error) => {
        alert(error);
    });
}

/*
2. UN SOLO .catch() PARA TODA LA CADENA

El .catch() final puede recibir un error producido al obtener el archivo,
convertir una respuesta a JSON, consultar GitHub o mostrar el avatar.

Si todos los pasos se completan correctamente, .catch() no se ejecuta.
*/
function ejemploCadenaCompleta() {
    return fetch("/article/promise-chaining/user.json")
    .then((response) => response.json())
    .then((user) => {
        return fetch(`https://api.github.com/users/${user.name}`);
    })
    .then((response) => response.json())
    .then((githubUser) => {
        return new Promise((resolve) => {
        const img = document.createElement("img");

        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";

        document.body.append(img);

        setTimeout(() => {
            img.remove();
            resolve(githubUser);
        }, 3000);
        });
    })
    .catch((error) => {
        alert(error.message);
    });
}

/*
3. try...catch IMPLÍCITO

El ejecutor de una promesa y sus manejadores poseen una especie de
try...catch invisible.

Si ocurre una excepción, JavaScript la captura automáticamente, la convierte
en el rechazo de una promesa y busca el manejador de rechazo más cercano.

Por eso, utilizar throw dentro del ejecutor produce el mismo resultado que
llamar a reject() con un error.
*/
function ejemploThrowEnEjecutor() {
    return new Promise(() => {
    throw new Error("Whoops!");
    }).catch((error) => {
    alert(error);
    });
}

// Esta versión con reject() produce un resultado equivalente.
function ejemploRejectExplicito() {
    return new Promise((resolve, reject) => {
    reject(new Error("Whoops!"));
    }).catch((error) => {
    alert(error);
    });
}

/*
4. throw DENTRO DE .then()

El try...catch implícito también funciona dentro de los manejadores.

Si se utiliza throw dentro de .then(), el manejador se detiene y la promesa
devuelta por ese .then() queda rechazada. El error llega al siguiente .catch().
*/
function ejemploThrowEnThen() {
    return Promise.resolve("ok")
    .then((resultado) => {
        throw new Error("Whoops!");
    })
    .catch((error) => {
        alert(error);
    });
}

/*
5. ERRORES ACCIDENTALES

.catch() no captura solamente los rechazos creados mediante reject() o throw.
También captura errores accidentales de programación.

En este ejemplo, intentar ejecutar una función inexistente produce un
ReferenceError que llega al .catch().
*/
function ejemploErrorAccidental() {
    return Promise.resolve("ok")
    .then((resultado) => {
        noSuchFunction();
    })
    .catch((error) => {
        alert(error);
    });
}

/*
6. RECUPERARSE DE UN ERROR

Si un .catch() maneja el error y termina normalmente, la promesa que devuelve
queda cumplida. Como ya no existe un rechazo pendiente, se ejecuta el próximo
.then().

Flujo: rechazo -> catch -> then
*/
function ejemploErrorManejado() {
    return Promise.reject(new Error("Whoops!"))
    .catch((error) => {
        alert("El error fue manejado. La cadena puede continuar.");
    })
    .then(() => {
        alert("Se ejecuta el siguiente manejador de éxito.");
    });
}

// Un .catch() también puede recuperarse devolviendo un valor alternativo.
function ejemploValorDeRecuperacion() {
    return Promise.reject(new Error("No fue posible obtener los datos"))
    .catch((error) => {
        return "Valor alternativo";
    })
    .then((resultado) => {
        alert(resultado);
    });
}

/*
7. VOLVER A LANZAR UN ERROR

Un .catch() debería manejar únicamente los errores que sabe tratar.

Si recibe un error desconocido, puede volver a lanzarlo mediante throw.
El control buscará entonces el próximo .catch() de la cadena.

En este ejemplo, el primer .catch() solo sabe manejar URIError. Como recibe
un Error normal, lo vuelve a lanzar. El .then() intermedio se omite y el
segundo .catch() recibe el error.

Flujo: rechazo -> primer catch -> segundo catch
*/
function ejemploRelanzamiento() {
    return Promise.reject(new Error("Whoops!"))
    .catch((error) => {
        if (error instanceof URIError) {
        alert("Se manejó un error relacionado con una URI.");
        return;
        }

        alert("Este manejador no sabe tratar el error.");

        throw error;
    })
    .then(() => {
      // No se ejecuta porque el error anterior fue relanzado.
        alert("La cadena continuó correctamente.");
    })
    .catch((error) => {
        alert(`Ocurrió un error desconocido: ${error}`);
    });
}

/*
8. MANEJAR UN TIPO DE ERROR CONOCIDO

Aquí el primer .catch() reconoce el error porque es una instancia de URIError.

Como el error se maneja y no se vuelve a lanzar, el siguiente .then()
se ejecuta normalmente.
*/
function ejemploErrorConocido() {
    return Promise.reject(new URIError("La dirección no es válida"))
    .catch((error) => {
        if (error instanceof URIError) {
        alert("El URIError fue manejado correctamente.");
        return;
        }

      // Los errores desconocidos deben continuar por la cadena.
        throw error;
    })
    .then(() => {
        alert("La cadena continuó después de manejar el error.");
    });
}

/*
9. SEGUNDO ARGUMENTO DE .then()

.then() puede recibir dos funciones:

- El primer argumento maneja el cumplimiento.
- El segundo argumento maneja el rechazo.

Forma general:

promesa.then(manejadorDeExito, manejadorDeError);
*/
function ejemploSegundoArgumentoDeThen() {
    return Promise.reject(new Error("Whoops!")).then(
    (resultado) => {
        alert(`La promesa se cumplió: ${resultado}`);
    },
    (error) => {
        alert(error);
    },
    );
}

/*
El segundo argumento de un .then() maneja el rechazo recibido por ese .then(),
pero no captura un error generado dentro del manejador de éxito perteneciente
al mismo .then().

Ese nuevo error será capturado por un .catch() posterior.
*/
function ejemploErrorDentroDelMismoThen() {
    return Promise.resolve("ok")
    .then(
        (resultado) => {
        throw new Error("Error dentro del manejador de éxito");
        },
        (error) => {
        // Este manejador no recibe el nuevo error.
        alert(error);
        },
    )
    .catch((error) => {
        alert(`El catch posterior recibe el error: ${error.message}`);
    });
}

/*
10. RECHAZOS NO GESTIONADOS

Si una promesa se rechaza y no existe ningún manejador de errores, el rechazo
queda sin gestionar.

Esto puede suceder cuando se olvida agregar .catch(), ningún .then() proporciona
un manejador de rechazo o un error es relanzado sin que exista otro .catch().

El motor de JavaScript registra los rechazos no gestionados. En los navegadores
pueden observarse mediante el evento global unhandledrejection.

El evento entrega dos propiedades importantes:

event.promise: promesa que produjo el rechazo.
event.reason: error o valor utilizado como motivo del rechazo.

Este manejador global permite informar al usuario, registrar el problema y
posiblemente reportarlo a un servidor. No reemplaza el uso correcto de .catch().
*/
window.addEventListener("unhandledrejection", (event) => {
    alert(event.promise);
    alert(event.reason);
});

// Esta promesa no tiene .catch(), por lo que produce un rechazo no gestionado.
function ejemploRechazoNoGestionado() {
    new Promise(() => {
    throw new Error("Whoops!");
    });
}

/*
RESUMEN

1. .catch() gestiona rechazos explícitos y errores accidentales.

2. El ejecutor de una promesa y sus manejadores poseen un try...catch implícito.

3. Un error lanzado dentro de .then() rechaza la promesa resultante.

4. Un .catch() final puede capturar los errores de toda la cadena anterior.

5. Si .catch() termina normalmente, el próximo .then() puede ejecutarse.

6. Si .catch() vuelve a lanzar el error, el control pasa al próximo manejador
de rechazo.

7. .then() también puede manejar rechazos mediante su segundo argumento.

8. Debemos manejar solamente los errores conocidos y volver a lanzar aquellos
que no sabemos tratar.

9. En el navegador, unhandledrejection permite detectar los rechazos que no
tienen ningún manejador.
*/

/*
ACTIVACIÓN MANUAL

Descomenta únicamente el ejemplo que quieras probar.
*/

// ejemploErrorDeRed();
// ejemploCadenaCompleta();
// ejemploThrowEnEjecutor();
// ejemploRejectExplicito();
// ejemploThrowEnThen();
// ejemploErrorAccidental();
// ejemploErrorManejado();
// ejemploValorDeRecuperacion();
// ejemploRelanzamiento();
// ejemploErrorConocido();
// ejemploSegundoArgumentoDeThen();
// ejemploErrorDentroDelMismoThen();
// ejemploRechazoNoGestionado();
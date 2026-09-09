/*
============================================================
ENCADENAMIENTO DE PROMESAS
============================================================

El encadenamiento de promesas permite ejecutar operaciones
asíncronas en secuencia y pasar el resultado de una operación
a la siguiente.

La estructura básica es:

Promise
    .then()
    .then()
    .then()

============================================================
1. REGLA PRINCIPAL
============================================================

Cada .then() devuelve una NUEVA Promise.

Si el handler devuelve un valor:

    return valor;

ese valor pasa al siguiente .then().
*/

Promise.resolve(1)

    .then(result => {
        return result * 2;
    })

    .then(result => {
        console.log(result); // 2
    });


/*
============================================================
2. ENCADENAR VARIOS .then()
============================================================

Cada .then() recibe el resultado del anterior.
*/

Promise.resolve(1)

    .then(result => {
        return result * 2;
    })

    .then(result => {
        return result * 2;
    })

    .then(result => {
        console.log(result); // 4
    });


/*
El resultado se va transmitiendo:

    1 → 2 → 4


La idea importante es:

    .then()
        ↓
    return
        ↓
    siguiente .then()
*/


/*
============================================================
3. DEVOLVER UNA PROMESA
============================================================

Si un .then() devuelve una Promise:

    return promise;

el siguiente .then() ESPERA a que esa Promise termine.

Esto permite ejecutar operaciones asíncronas una después
de otra.
*/

Promise.resolve(1)

    .then(result => {

        return new Promise(resolve => {

            setTimeout(() => {
                resolve(result * 2);
            }, 1000);

        });

    })

    .then(result => {

        console.log(result); // 2

    });


/*
REGLA PARA RECORDAR:

    return valor
        → pasa el valor

    return Promise
        → espera la Promise
*/


/*
============================================================
4. ERROR CLÁSICO
============================================================

Esto NO es encadenamiento.
*/

const promise = Promise.resolve(1);

promise.then(result => {
    console.log(result); // 1
});

promise.then(result => {
    console.log(result); // 1
});

promise.then(result => {
    console.log(result); // 1
});


/*
Los tres .then() reciben el mismo resultado original.

No ocurre:

    1 → 2 → 4

Sino que son tres handlers independientes.

Para encadenar correctamente:

    promise
        .then(...)
        .then(...)
        .then(...)
*/


/*
============================================================
5. FETCH Y PROMESAS
============================================================

fetch() devuelve una Promise.

Por eso podemos utilizarlo directamente en un
encadenamiento.
*/

fetch("/user.json")

    .then(response => {
        return response.json();
    })

    .then(user => {
        console.log(user);
});


/*
response.json() también devuelve una Promise.

Por eso podemos hacer:

    fetch()
        ↓
    response.json()
        ↓
    user
*/


/*
============================================================
6. ENCADENAR VARIAS SOLICITUDES
============================================================

El resultado de una solicitud puede utilizarse para realizar
otra.
*/

fetch("/user.json")

    .then(response => response.json())

    .then(user => {

        return fetch(
            `https://api.github.com/users/${user.name}`
        );

    })

    .then(response => response.json())

    .then(githubUser => {

        console.log(githubUser);

    });


/*
La secuencia es:

    fetch()
        ↓
    response.json()
        ↓
    user
        ↓
    fetch(GitHub)
        ↓
    response.json()
        ↓
    githubUser
*/


/*
============================================================
7. IMPORTANCIA DE RETURN
============================================================

Si quieres que la siguiente etapa espere una Promise,
DEBES DEVOLVERLA.

INCORRECTO:
*/

fetch("/user.json")

    .then(response => {

        response.json();

    })

    .then(user => {

        console.log(user);

    });


/*
El problema es que response.json() no fue retornado.

CORRECTO:
*/

fetch("/user.json")

    .then(response => {

        return response.json();

    })

    .then(user => {

        console.log(user);

    });


/*
Con arrow functions también podemos escribir:

    .then(response => response.json())

porque existe un return implícito.
*/


/*
============================================================
8. FUNCIONES ASÍNCRONAS
============================================================

Si una función realiza una operación asíncrona y queremos
encadenarla, debe devolver una Promise.
*/

function esperar(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


esperar(1000)

    .then(() => {

        console.log("Pasó 1 segundo");

        return esperar(1000);

    })

    .then(() => {

        console.log("Pasaron 2 segundos");

    });


/*
============================================================
9. THENABLE
============================================================

Un thenable es un objeto que posee un método .then().

JavaScript puede tratarlo de forma similar a una Promise.

Concepto:

    objeto
        ↓
    tiene .then()
        ↓
    thenable

No es necesario memorizar su implementación para entender
el encadenamiento de promesas.
*/


/*
============================================================
10. ESQUEMA MENTAL
============================================================

                    Promise
                    ↓
                    .then()
                    ↓
                devuelve algo
                    ↓
            ┌────────┴────────┐
            ↓                 ↓
            valor            Promise
            ↓                 ↓
        siguiente .then()    esperar
                                ↓
                        siguiente .then()


La regla más importante:

    RETURN VALOR
    → pasa el resultado


    RETURN PROMISE
    → espera el resultado
*/


/*
============================================================
11. CHULETA FINAL
============================================================

ENCADENAMIENTO:

    promise
        .then(resultado => ...)
        .then(resultado => ...)
        .then(resultado => ...)


PASAR UN VALOR:

    .then(() => {
        return 10;
    })

    .then(value => {
        console.log(value); // 10
    })


ESPERAR UNA PROMESA:

    .then(() => {
        return fetch(url);
    })

    .then(response => {
        // fetch terminó
    })


NO CONFUNDIR:

    promise.then(a);
    promise.then(b);
    promise.then(c);

    = handlers independientes


    promise
        .then(a)
        .then(b)
        .then(c);

    = encadenamiento


============================================================
CONCEPTOS QUE DEBES RECORDAR
============================================================

1. Cada .then() devuelve una nueva Promise.

2. return valor
    → el valor pasa al siguiente .then().

3. return Promise
    → el siguiente .then() espera esa Promise.

4. Varios .then() sobre la misma Promise
    → no forman una cadena.

5. Para encadenar:

    promise
        .then()
        .then()
        .then()

6. Las funciones asíncronas deben devolver una Promise
    si queremos incorporarlas a una cadena.

7. fetch(), response.json() y response.text()
    trabajan con Promises.


============================================================
FRASE PARA MEMORIZAR
============================================================

    RETURN = PASAR EL RESULTADO

    RETURN PROMISE = ESPERAR

============================================================
*/
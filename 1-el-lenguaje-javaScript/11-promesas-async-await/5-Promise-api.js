/*
API DE PROMESAS

La clase Promise cuenta con 6 métodos estáticos:

1. Promise.all()
2. Promise.allSettled()
3. Promise.race()
4. Promise.any()
5. Promise.resolve()
6. Promise.reject()

Estos métodos permiten trabajar con varias promesas, esperar distintos tipos
de resultados o crear directamente promesas resueltas y rechazadas.
*/

/*
1. PROMISE.ALL()

Promise.all(iterable) recibe un iterable, normalmente un array de promesas,
y devuelve una nueva promesa.

La promesa resultante se resuelve cuando todas las promesas del iterable
se han resuelto. Su resultado es un array que contiene los resultados
de cada promesa.

El orden del array de resultados corresponde al orden original de las
promesas, no al orden en que terminan.
*/

function ejemploPromiseAll() {
  Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000))
  ]).then(resultados => {
    console.log(resultados); // [1, 2, 3]
  });
}

/*
Aunque la tercera promesa termina primero y la primera termina última,
el resultado conserva el orden original:

[1, 2, 3]
*/

/*
2. PROMISE.ALL() CON ARRAYS DE DATOS

Un uso común consiste en transformar un array de datos en un array
de promesas mediante map() y después esperar todas esas promesas
con Promise.all().

El siguiente ejemplo depende del navegador y realiza solicitudes de red.
*/

function ejemploPromiseAllConUrls() {
  const urls = [
    "https://api.github.com/users/iliakan",
    "https://api.github.com/users/remy",
    "https://api.github.com/users/jeresig"
  ];

  const solicitudes = urls.map(url => fetch(url));

  Promise.all(solicitudes).then(respuestas => {
    respuestas.forEach(respuesta => {
      console.log(`${respuesta.url}: ${respuesta.status}`);
    });
  });
}

/*
También es posible encadenar varios Promise.all().

Primero se esperan todas las respuestas de fetch().
Después cada respuesta se transforma mediante response.json(),
lo que produce otro array de promesas.
Finalmente, otro Promise.all() espera a que todos esos JSON estén listos.

El siguiente ejemplo depende del navegador y realiza solicitudes de red.
*/

function ejemploPromiseAllUsuarios() {
  const nombres = ["iliakan", "remy", "jeresig"];

  const solicitudes = nombres.map(nombre =>
    fetch(`https://api.github.com/users/${nombre}`)
  );

  Promise.all(solicitudes)
    .then(respuestas => {
      for (const respuesta of respuestas) {
        console.log(`${respuesta.url}: ${respuesta.status}`);
      }

      return respuestas;
    })
    .then(respuestas =>
      Promise.all(respuestas.map(respuesta => respuesta.json()))
    )
    .then(usuarios => {
      usuarios.forEach(usuario => console.log(usuario.name));
    });
}

/*
3. RECHAZO EN PROMISE.ALL()

Si alguna de las promesas se rechaza, Promise.all() se rechaza
inmediatamente con ese error.

Las demás promesas no se cancelan. Continúan ejecutándose, pero
Promise.all() deja de tener en cuenta sus resultados.

Promise.all() no sirve para cancelar promesas.

Flujo:
promesas en ejecución -> una se rechaza -> Promise.all() se rechaza -> catch
*/

function ejemploPromiseAllRechazado() {
  Promise.all([
    new Promise(resolve =>
      setTimeout(() => resolve(1), 1000)
    ),

    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Whoops!")), 2000)
    ),

    new Promise(resolve =>
      setTimeout(() => resolve(3), 3000)
    )
  ]).catch(error => {
    console.log(error); // Error: Whoops!
  });
}

/*
4. PROMISE.ALL() ADMITE VALORES QUE NO SON PROMESAS

Los elementos del iterable no tienen que ser necesariamente promesas.

Si un elemento no es una promesa, su valor se coloca directamente
en el array resultante.
*/

function ejemploPromiseAllConValores() {
  Promise.all([
    new Promise(resolve => {
      setTimeout(() => resolve(1), 1000);
    }),
    2,
    3
  ]).then(resultados => {
    console.log(resultados); // [1, 2, 3]
  });
}

/*
5. PROMISE.ALLSETTLED()

Promise.all() es apropiado para situaciones de "todo o nada":
si una promesa falla, Promise.all() se rechaza.

Promise.allSettled(), en cambio, espera a que todas las promesas
terminen independientemente de si se cumplen o se rechazan.

Cada elemento del array resultante tiene uno de estos formatos:

Promesa cumplida:
{
  status: "fulfilled",
  value: resultado
}

Promesa rechazada:
{
  status: "rejected",
  reason: error
}

De esta manera es posible conocer individualmente el resultado
de todas las promesas.
*/

/*
El siguiente ejemplo depende del navegador y realiza solicitudes de red.
Una de las URL es incorrecta intencionalmente.
*/

function ejemploPromiseAllSettled() {
  const urls = [
    "https://api.github.com/users/iliakan",
    "https://api.github.com/users/remy",
    "https://no-such-url"
  ];

  Promise.allSettled(urls.map(url => fetch(url)))
    .then(resultados => {
      resultados.forEach((resultado, indice) => {
        if (resultado.status === "fulfilled") {
          console.log(
            `${urls[indice]}: ${resultado.value.status}`
          );
        }

        if (resultado.status === "rejected") {
          console.log(
            `${urls[indice]}: ${resultado.reason}`
          );
        }
      });
    });
}

/*
El resultado tiene conceptualmente esta forma:

[
  { status: "fulfilled", value: ... },
  { status: "fulfilled", value: ... },
  { status: "rejected", reason: ... }
]

A diferencia de Promise.all(), un rechazo no impide obtener
información sobre las demás promesas.
*/

/*
6. POLYFILL DE PROMISE.ALLSETTLED()

Si Promise.allSettled() no está disponible, puede implementarse
transformando cada promesa para que siempre produzca un objeto
con status y value/reason.

Promise.resolve(p) convierte cada valor de entrada en una promesa
por si alguno de los elementos recibidos no era originalmente una.

Después, .then() transforma tanto los resultados satisfactorios
como los rechazos al formato utilizado por Promise.allSettled().

Finalmente, Promise.all() puede esperar todas las promesas transformadas,
porque cada una produce un resultado con el formato correspondiente.
*/

function instalarPolyfillAllSettled() {
  if (!Promise.allSettled) {
    const manejarRechazo = reason => ({
      status: "rejected",
      reason
    });

    const manejarResolucion = value => ({
      status: "fulfilled",
      value
    });

    Promise.allSettled = function (promesas) {
      const promesasConvertidas = promesas.map(promesa =>
        Promise.resolve(promesa).then(
          manejarResolucion,
          manejarRechazo
        )
      );

      return Promise.all(promesasConvertidas);
    };
  }
}

/*
7. PROMISE.RACE()

Promise.race(iterable) espera únicamente a la primera promesa
que termine.

Su resultado o error se convierte en el resultado de Promise.race().

Una vez que una promesa "gana la carrera", los resultados o errores
posteriores se ignoran.
*/

function ejemploPromiseRace() {
  Promise.race([
    new Promise(resolve =>
      setTimeout(() => resolve(1), 1000)
    ),

    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Whoops!")), 2000)
    ),

    new Promise(resolve =>
      setTimeout(() => resolve(3), 3000)
    )
  ]).then(resultado => {
    console.log(resultado); // 1
  });
}

/*
En este ejemplo, la primera promesa termina antes que las demás,
por lo que su valor 1 se convierte en el resultado.

Promise.race() tiene en cuenta la primera promesa que termina,
ya sea con un resultado o con un error.
*/

/*
8. PROMISE.ANY()

Promise.any(iterable) espera a la primera promesa que se cumpla.

A diferencia de Promise.race(), una promesa rechazada no gana
si todavía puede cumplirse otra promesa.

Cuando aparece la primera promesa cumplida, su valor se convierte
en el resultado de Promise.any() y los resultados posteriores
se ignoran.
*/

function ejemploPromiseAny() {
  Promise.any([
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Whoops!")), 1000)
    ),

    new Promise(resolve =>
      setTimeout(() => resolve(1), 2000)
    ),

    new Promise(resolve =>
      setTimeout(() => resolve(3), 3000)
    )
  ]).then(resultado => {
    console.log(resultado); // 1
  });
}

/*
Flujo:

1. La primera promesa termina, pero es rechazada.
2. Promise.any() continúa esperando.
3. La segunda promesa se cumple con 1.
4. Promise.any() se cumple con 1.
5. Los resultados posteriores se ignoran.
*/

/*
9. PROMISE.ANY() CUANDO TODAS LAS PROMESAS FALLAN

Si todas las promesas se rechazan, Promise.any() también se rechaza.

El error resultante es un AggregateError.

Los errores individuales de las promesas rechazadas están disponibles
en la propiedad errors del objeto AggregateError.
*/

function ejemploPromiseAnyTodasRechazadas() {
  Promise.any([
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Ouch!")), 1000)
    ),

    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Error!")), 2000)
    )
  ]).catch(error => {
    console.log(error.constructor.name); // AggregateError
    console.log(error.errors[0]); // Error: Ouch!
    console.log(error.errors[1]); // Error: Error!
  });
}

/*
10. DIFERENCIA ENTRE PROMISE.ALL(), ALLSETTLED(), RACE() Y ANY()

Promise.all():
Espera que todas se cumplan.
Si una se rechaza, Promise.all() se rechaza inmediatamente.

Promise.allSettled():
Espera que todas terminen.
Conserva información tanto de las cumplidas como de las rechazadas.

Promise.race():
Toma la primera promesa que termina.
Puede ganar una promesa cumplida o rechazada.

Promise.any():
Toma la primera promesa que se cumple.
Los rechazos se ignoran mientras todavía pueda cumplirse otra.
Si todas se rechazan, produce un AggregateError.
*/

/*
11. PROMISE.RESOLVE()

Promise.resolve(value) crea una promesa ya resuelta cuyo resultado
es value.

Es equivalente a:

new Promise(resolve => resolve(value));

Puede utilizarse cuando una función debe garantizar que siempre
devuelve una promesa.
*/

function ejemploPromiseResolve() {
  const promesa = Promise.resolve("resultado");

  promesa.then(valor => {
    console.log(valor); // "resultado"
  });
}

/*
Un caso de uso es una función que utiliza una caché.

Si el contenido ya está almacenado, Promise.resolve() permite devolver
ese contenido dentro de una promesa.

Si no está almacenado, la función utiliza fetch(), que también conduce
a una promesa.

Así, independientemente del camino seguido, la función garantiza
que devuelve una promesa y siempre puede utilizarse .then() después.

El siguiente ejemplo depende del navegador y realiza solicitudes de red.
*/

const cache = new Map();

function cargarConCache(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  }

  return fetch(url)
    .then(respuesta => respuesta.text())
    .then(texto => {
      cache.set(url, texto);
      return texto;
    });
}

function ejemploCargarConCache() {
  cargarConCache("/article/promise-chaining/user.json")
    .then(contenido => {
      console.log(contenido);
    });
}

/*
12. PROMISE.REJECT()

Promise.reject(error) crea una promesa rechazada con el error indicado.

Es equivalente a:

new Promise((resolve, reject) => reject(error));

En la práctica, este método casi nunca se utiliza.
*/

function ejemploPromiseReject() {
  Promise.reject(new Error("Error intencional"))
    .catch(error => {
      console.log(error);
    });
}

/*
RESUMEN

1. Promise.all(promises)
   Espera a que todas las promesas se cumplan y devuelve un array
   con sus resultados.

   Si alguna se rechaza, Promise.all() se rechaza inmediatamente
   con ese error y los demás resultados se ignoran.

2. Promise.allSettled(promises)
   Espera a que todas las promesas terminen.

   Cada resultado contiene:
   - status: "fulfilled" y value, si se cumplió.
   - status: "rejected" y reason, si se rechazó.

3. Promise.race(promises)
   Espera únicamente a la primera promesa que termina.
   Su resultado o error determina el resultado de Promise.race().

4. Promise.any(promises)
   Espera a la primera promesa que se cumple.
   Si todas se rechazan, Promise.any() se rechaza con AggregateError.

5. Promise.resolve(value)
   Crea una promesa resuelta con el valor indicado.

6. Promise.reject(error)
   Crea una promesa rechazada con el error indicado.

Promise.all() probablemente sea el método más común de estos seis.
*/

/*
REPASO RÁPIDO

Promise.all()        -> todas deben cumplirse
Promise.allSettled() -> espera todos los desenlaces
Promise.race()       -> gana la primera que termina
Promise.any()        -> gana la primera que se cumple
Promise.resolve()    -> crea una promesa resuelta
Promise.reject()     -> crea una promesa rechazada
*/

/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos que utilizan fetch() dependen del navegador y realizan
solicitudes de red.
*/

// ejemploPromiseAll();
// ejemploPromiseAllConUrls();
// ejemploPromiseAllUsuarios();
// ejemploPromiseAllRechazado();
// ejemploPromiseAllConValores();
// ejemploPromiseAllSettled();
// instalarPolyfillAllSettled();
// ejemploPromiseRace();
// ejemploPromiseAny();
// ejemploPromiseAnyTodasRechazadas();
// ejemploPromiseResolve();
// ejemploCargarConCache();
// ejemploPromiseReject();
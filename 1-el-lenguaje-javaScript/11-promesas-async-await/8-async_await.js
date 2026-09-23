/*
ASYNC / AWAIT

`async/await` es una sintaxis para trabajar con promesas de una forma más
cómoda y legible.

`async` se utiliza al declarar funciones asíncronas.
`await` se utiliza para esperar el resultado de una promesa dentro de una
función `async`.

Aunque la sintaxis sea diferente, `async/await` sigue estando basado en promesas.
*/

/*
1. FUNCIONES ASÍNCRONAS

Al colocar `async` delante de una función, esa función siempre devuelve una
promesa.

Si la función devuelve un valor que no es una promesa, JavaScript lo envuelve
automáticamente en una promesa resuelta.
*/

async function ejemploAsyncConValor() {
  return 1;
}

/*
La llamada devuelve una promesa.

El valor `1` se convierte automáticamente en el resultado de una promesa
resuelta.

Equivale conceptualmente a devolver:

Promise.resolve(1)
*/

// ejemploAsyncConValor().then(alert);

/*
También es posible devolver explícitamente una promesa.
*/

async function ejemploAsyncConPromise() {
  return Promise.resolve(1);
}

// ejemploAsyncConPromise().then(alert);

/*
Ambas funciones anteriores producen el mismo resultado.

Una función `async`:

1. Siempre devuelve una promesa.
2. Permite utilizar `await` dentro de ella.
*/

/*
2. AWAIT

La sintaxis básica es:

let valor = await promesa;

`await` hace que la ejecución de la función `async` se suspenda hasta que la
promesa se resuelva.

Cuando la promesa se resuelve, su resultado pasa a ser el valor de la expresión
`await`.

Mientras la función está suspendida, el motor de JavaScript puede continuar
realizando otras tareas, como ejecutar otros scripts o gestionar eventos.
*/

async function ejemploAwait() {
  const promesa = new Promise((resolve) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  const resultado = await promesa;

  alert(resultado);
}

/*
Flujo:

1. Se crea la promesa.
2. La ejecución llega a `await promesa`.
3. La función queda suspendida.
4. Después de 1 segundo, la promesa se resuelve con "done!".
5. La función continúa.
6. `resultado` contiene "done!".
*/

// ejemploAwait();

/*
`await` proporciona una forma más directa de obtener el resultado de una promesa
que utilizar explícitamente `promise.then(...)`.
*/

/*
3. AWAIT SOLO PUEDE UTILIZARSE EN FUNCIONES ASYNC

Dentro de una función regular no puede utilizarse `await`.

El siguiente ejemplo produciría un error de sintaxis si se ejecutara:

function ejemploIncorrecto() {
  const promesa = Promise.resolve(1);
  const resultado = await promesa;
}

Para utilizar `await`, la función debe declararse con `async`.
*/

async function ejemploCorrecto() {
  const promesa = Promise.resolve(1);
  const resultado = await promesa;

  return resultado;
}

// ejemploCorrecto().then(alert);

/*
4. REESCRIBIR CADENAS DE PROMESAS CON ASYNC/AWAIT

Una secuencia que normalmente utilizaría varias llamadas a `.then()` puede
escribirse esperando directamente cada operación mediante `await`.

El siguiente ejemplo:

1. Obtiene un archivo JSON.
2. Convierte la respuesta en un objeto.
3. Obtiene los datos del usuario desde GitHub.
4. Muestra su avatar.
5. Espera 3 segundos.
6. Elimina la imagen.
7. Devuelve el usuario obtenido.

Este ejemplo depende del navegador y realiza solicitudes de red.
*/

async function mostrarAvatar() {
  const respuesta = await fetch("/article/promise-chaining/user.json");
  const usuario = await respuesta.json();

  const respuestaGithub = await fetch(
    `https://api.github.com/users/${usuario.name}`
  );

  const usuarioGithub = await respuestaGithub.json();

  const imagen = document.createElement("img");

  imagen.src = usuarioGithub.avatar_url;
  imagen.className = "promise-avatar-example";

  document.body.append(imagen);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  imagen.remove();

  return usuarioGithub;
}

/*
Las llamadas sucesivas a `await` sustituyen las diferentes etapas que podrían
haberse escrito utilizando `.then()`.

No se ejecuta automáticamente porque realiza solicitudes de red y modifica el
DOM.
*/

// mostrarAvatar();

/*
5. AWAIT EN EL NIVEL SUPERIOR DE UN MÓDULO

Los navegadores modernos permiten utilizar `await` directamente en el nivel
superior cuando el código se ejecuta dentro de un módulo.

Ejemplo conceptual:

const respuesta = await fetch("/article/promise-chaining/user.json");
const usuario = await respuesta.json();

console.log(usuario);

Este código supone que el archivo JavaScript se está ejecutando como módulo.
*/

/*
6. FUNCIÓN ASÍNCRONA ANÓNIMA

Si no estamos utilizando módulos, una solución es encapsular el código en una
función asíncrona anónima que se ejecuta inmediatamente.

Este ejemplo depende del navegador y realiza una solicitud de red.
*/

async function ejemploEquivalenteFuncionAnonima() {
  /*
  La forma original puede escribirse así:

  (async () => {
    const respuesta = await fetch("/article/promise-chaining/user.json");
    const usuario = await respuesta.json();

    console.log(usuario);
  })();
  */
}

/*
La función asíncrona anónima permite disponer de un contexto `async` donde
puede utilizarse `await`.
*/

/*
7. AWAIT TAMBIÉN ACEPTA OBJETOS THENABLE

`await` no requiere necesariamente una instancia real de `Promise`.

También puede trabajar con un objeto que tenga un método `.then()` invocable.
Estos objetos son conocidos como "thenable".

Si `await` recibe uno, llama a su método `then`, proporcionando las funciones
`resolve` y `reject`.
*/

class Thenable {
  constructor(numero) {
    this.numero = numero;
  }

  then(resolve, reject) {
    alert(resolve);

    setTimeout(() => {
      resolve(this.numero * 2);
    }, 1000);
  }
}

async function ejemploThenable() {
  const resultado = await new Thenable(1);

  alert(resultado);
}

/*
Flujo:

1. `await` recibe una instancia de `Thenable`.
2. Detecta su método `.then()`.
3. Llama a `.then()` proporcionando `resolve` y `reject`.
4. Después de 1 segundo se ejecuta `resolve(this.numero * 2)`.
5. `await` continúa con el valor 2.
6. `resultado` vale 2.
*/

// ejemploThenable();

/*
8. MÉTODOS ASÍNCRONOS DE CLASE

Los métodos de una clase también pueden declararse con `async`.

El comportamiento es el mismo que en cualquier otra función `async`:

1. Siempre devuelven una promesa.
2. Pueden utilizar `await`.
*/

class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

function ejemploMetodoAsync() {
  new Waiter()
    .wait()
    .then(alert);
}

// ejemploMetodoAsync();

/*
9. MANEJO DE ERRORES CON AWAIT

Cuando la promesa utilizada con `await` se resuelve correctamente, `await`
devuelve su resultado.

Cuando la promesa se rechaza, `await` lanza el error como una excepción.
*/

async function ejemploRechazoConAwait() {
  await Promise.reject(new Error("Whoops!"));
}

/*
El comportamiento anterior equivale a lanzar directamente el error:
*/

async function ejemploThrowEquivalente() {
  throw new Error("Whoops!");
}

/*
Por lo tanto, estas dos situaciones son equivalentes respecto al resultado de
la función `async`: ambas terminan con una promesa rechazada.
*/

/*
10. CAPTURAR ERRORES CON TRY...CATCH

Como un rechazo recibido mediante `await` se transforma en una excepción,
puede manejarse con `try...catch`.

Este ejemplo depende del navegador y realiza una solicitud de red.
*/

async function ejemploTryCatch() {
  try {
    const respuesta = await fetch("http://no-such-url");

    return respuesta;
  } catch (error) {
    alert(error);
  }
}

/*
Si la promesa de `fetch` se rechaza:

1. `await` lanza el error.
2. El control salta al bloque `catch`.
3. El error queda disponible en la variable `error`.
*/

// ejemploTryCatch();

/*
11. UN TRY...CATCH PUEDE CUBRIR VARIOS AWAIT

No es necesario crear un `try...catch` para cada operación.

Un mismo bloque puede cubrir varias operaciones asíncronas.

Este ejemplo depende del navegador y realiza una solicitud de red.
*/

async function ejemploVariasOperacionesConTryCatch() {
  try {
    const respuesta = await fetch("/no-user-here");
    const usuario = await respuesta.json();

    return usuario;
  } catch (error) {
    alert(error);
  }
}

/*
El `catch` puede recibir errores producidos tanto durante `fetch(...)` como
durante `respuesta.json()`.
*/

// ejemploVariasOperacionesConTryCatch();

/*
12. MANEJAR EL ERROR FUERA DE LA FUNCIÓN ASYNC

No es obligatorio utilizar `try...catch` dentro de la función.

Si un error no se captura dentro de una función `async`, la promesa devuelta
por esa función queda rechazada.

Entonces puede utilizarse `.catch()` sobre el resultado de la llamada.

Este ejemplo depende del navegador y realiza una solicitud de red.
*/

async function ejemploErrorSinTryCatch() {
  const respuesta = await fetch("http://no-such-url");

  return respuesta;
}

/*
La llamada:

ejemploErrorSinTryCatch()

devuelve una promesa.

Si `fetch` falla, esa promesa queda rechazada, por lo que puede manejarse así:

ejemploErrorSinTryCatch().catch(alert);
*/

// ejemploErrorSinTryCatch().catch(alert);

/*
Si una promesa rechazada no tiene ningún manejador, se produce un rechazo de
promesa no manejado, visible en la consola.

También puede utilizarse un manejador global `unhandledrejection`, como se
describe en el manejo de errores con promesas.
*/

/*
13. ASYNC/AWAIT FRENTE A THEN/CATCH

Cuando utilizamos `async/await`, normalmente necesitamos menos llamadas
explícitas a `.then()` y `.catch()`.

`await` se encarga de esperar el resultado de las promesas y `try...catch`
permite manejar sus errores.

Sin embargo, `async/await` sigue estando basado en promesas.

En lugares donde no podemos utilizar `await`, puede seguir siendo necesario
trabajar directamente con `.then()` o `.catch()`, por ejemplo para manejar el
resultado final de una función `async`.
*/

/*
14. ASYNC/AWAIT CON PROMISE.ALL

Cuando necesitamos esperar varias promesas, podemos combinarlas con
`Promise.all` y esperar el resultado completo utilizando `await`.

Forma general:

const resultados = await Promise.all([
  promesa1,
  promesa2
]);

Si una de las promesas falla, el error se propaga a `Promise.all`.

Como `await` recibe entonces una promesa rechazada, ese rechazo se convierte
en una excepción que puede manejarse mediante `try...catch`.
*/

/*
Este ejemplo depende del navegador y realiza solicitudes de red.
*/

async function ejemploPromiseAll(url1, url2) {
  try {
    const resultados = await Promise.all([
      fetch(url1),
      fetch(url2)
    ]);

    return resultados;
  } catch (error) {
    alert(error);
  }
}

// ejemploPromiseAll("/recurso-1", "/recurso-2");

/*
RESUMEN

1. Una función declarada con `async` siempre devuelve una promesa.

2. Si una función `async` devuelve un valor normal, ese valor se convierte
   automáticamente en el resultado de una promesa resuelta.

3. `async` permite utilizar `await` dentro de la función.

4. `await promesa` suspende la ejecución de la función hasta que la promesa se
   resuelve.

5. Mientras una función está suspendida por `await`, JavaScript puede continuar
   realizando otras tareas.

6. Si la promesa se resuelve correctamente, `await` devuelve su resultado.

7. Si la promesa se rechaza, `await` lanza una excepción equivalente a utilizar
   `throw`.

8. Los errores producidos por `await` pueden capturarse con `try...catch`.

9. Si el error no se captura dentro de la función `async`, la promesa devuelta
   por esa función queda rechazada y puede manejarse con `.catch()`.

10. `await` no puede utilizarse dentro de una función regular.

11. En navegadores modernos puede utilizarse `await` en el nivel superior de
    un módulo.

12. Si no se utiliza un módulo, puede crearse una función asíncrona anónima para
    disponer de un contexto donde utilizar `await`.

13. `await` también acepta objetos thenable, es decir, objetos que tienen un
    método `.then()` invocable.

14. Los métodos de clases pueden declararse con `async`.

15. Con `async/await`, normalmente se necesitan menos llamadas explícitas a
    `.then()` y `.catch()`, aunque todo continúa basado en promesas.

16. `Promise.all` puede combinarse con `await` para esperar varias promesas.
*/

/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Algunos ejemplos utilizan `alert`, `fetch`, `document` o modifican el DOM, por
lo que requieren un entorno de navegador.

Los ejemplos que realizan solicitudes de red, modifican el DOM o provocan
errores intencionales permanecen desactivados.
*/

// ejemploAsyncConValor().then(alert);
// ejemploAsyncConPromise().then(alert);
// ejemploAwait();
// ejemploCorrecto().then(alert);
// mostrarAvatar();
// ejemploThenable();
// ejemploMetodoAsync();
// ejemploTryCatch();
// ejemploVariasOperacionesConTryCatch();
// ejemploErrorSinTryCatch().catch(alert);
// ejemploPromiseAll("/recurso-1", "/recurso-2");
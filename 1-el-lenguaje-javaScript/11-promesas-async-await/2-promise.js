/*
PROMESAS

Una Promise es un objeto especial de JavaScript que conecta el código que
produce un resultado con el código que necesita consumir ese resultado.

La idea general es:

1. Un código productor realiza una tarea que puede requerir tiempo.
2. Una Promise representa el resultado futuro de esa tarea.
3. El código consumidor se suscribe al resultado mediante .then(), .catch()
   y .finally().

Fuente de la lección:
:chatgpt-content-reference{index="0"}
*/


/*
1. CREACIÓN DE UNA PROMISE

Una Promise se crea con el constructor new Promise().

El constructor recibe una función llamada executor.

El executor:
- Se ejecuta automáticamente cuando se crea la Promise.
- Recibe las funciones resolve y reject.
- Debe llamar a resolve(value) cuando la operación termina correctamente.
- Debe llamar a reject(error) cuando ocurre un error.
*/

function ejemploPromesaResuelta() {
  const promesa = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("done"), 1000);
  });

  return promesa;
}


/*
2. ESTADOS DE UNA PROMISE

Una Promise posee dos propiedades internas principales:

state:
- "pending" al principio.
- "fulfilled" cuando se llama a resolve().
- "rejected" cuando se llama a reject().

result:
- undefined inicialmente.
- El valor proporcionado a resolve(value) cuando se cumple.
- El error proporcionado a reject(error) cuando se rechaza.

Estas propiedades son internas y no se accede directamente a ellas.

Para trabajar con el resultado se utilizan:

.then()
.catch()
.finally()
*/


/*
3. RESOLVER UNA PROMISE

resolve(value) indica que la operación terminó correctamente.

En este ejemplo, después de un segundo la Promise se cumple con el valor
"done".
*/

function ejemploResolve() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve("done"), 1000);
  });
}


/*
4. RECHAZAR UNA PROMISE

reject(error) indica que la operación terminó con un error.

Se recomienda rechazar una Promise utilizando objetos Error u objetos que
hereden de Error.
*/

function ejemploReject() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
  });
}


/*
5. UNA PROMISE SOLO PUEDE TENER UN RESULTADO

El executor debe finalizar llamando a resolve() o reject().

Una vez que la Promise cambia de estado, el cambio es definitivo.

Las llamadas posteriores a resolve() o reject() son ignoradas.
*/

function ejemploUnSoloResultado() {
  return new Promise(function (resolve, reject) {
    resolve("done");

    reject(new Error("Este error será ignorado"));

    setTimeout(() => {
      resolve("Este segundo resultado también será ignorado");
    }, 1000);
  });
}


/*
resolve() y reject() utilizan solamente un argumento.

Los argumentos adicionales son ignorados.
*/


/*
6. RESOLUCIÓN INMEDIATA

Aunque normalmente una Promise representa una operación que necesita tiempo,
resolve() o reject() también pueden llamarse inmediatamente.

Esto puede ocurrir, por ejemplo, cuando el resultado ya está disponible.
*/

function ejemploResolucionInmediata() {
  return new Promise(function (resolve, reject) {
    resolve(123);
  });
}


/*
7. CONSUMIDORES DE UNA PROMISE

El objeto Promise conecta:

- El executor, que produce el resultado.
- Los consumidores, que esperan ese resultado.

Los consumidores pueden registrarse utilizando .then() y .catch().
*/


/*
8. MÉTODO .then()

.then() puede recibir dos funciones:

promise.then(
  function (result) {
    // Se ejecuta cuando la Promise se cumple.
  },
  function (error) {
    // Se ejecuta cuando la Promise se rechaza.
  }
);

La primera función recibe el resultado exitoso.

La segunda función recibe el error.
*/

function ejemploThenExitoso() {
  const promesa = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
  });

  promesa.then(
    resultado => alert(resultado),
    error => alert(error)
  );
}


/*
En este caso:

resolve("done!")
    ↓
primer manejador de .then()
    ↓
alert("done!")

El manejador de error no se ejecuta.
*/


function ejemploThenConError() {
  const promesa = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
  });

  promesa.then(
    resultado => alert(resultado),
    error => alert(error)
  );
}


/*
En este caso:

reject(new Error("Whoops!"))
    ↓
segundo manejador de .then()
    ↓
alert(error)

El manejador de éxito no se ejecuta.
*/


/*
9. .then() SOLO PARA ÉXITO

Si solamente interesa el resultado exitoso, .then() puede recibir una única
función.
*/

function ejemploThenSoloExito() {
  const promesa = new Promise(resolve => {
    setTimeout(() => resolve("done!"), 1000);
  });

  promesa.then(alert);
}


/*
10. MÉTODO .catch()

Si solamente interesa manejar errores, puede utilizarse:

promise.then(null, manejadorDeError);

o su forma abreviada:

promise.catch(manejadorDeError);

Ambas formas son equivalentes.
*/

function ejemploCatch() {
  const promesa = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
  });

  promesa.catch(alert);
}


/*
Equivalencia:

promesa.catch(manejador);

es lo mismo que:

promesa.then(null, manejador);
*/

function ejemploCatchEquivalente() {
  const promesa = new Promise((resolve, reject) => {
    reject(new Error("Error de ejemplo"));
  });

  const manejarError = error => alert(error);

  // Forma 1:
  // promesa.catch(manejarError);

  // Forma equivalente:
  promesa.then(null, manejarError);
}


/*
11. MÉTODO .finally()

.finally() permite ejecutar una operación cuando la Promise termina,
independientemente de si se cumplió o fue rechazada.

Su uso principal es realizar procedimientos generales de finalización o
limpieza.

Ejemplos mencionados en la lección:
- Detener un indicador de carga.
- Cerrar conexiones que ya no son necesarias.

Aunque puede parecer similar a:

.then(f, f)

no son exactamente equivalentes.
*/


/*
12. finally() NO RECIBE EL RESULTADO

El manejador proporcionado a finally() no recibe argumentos.

No está diseñado para procesar el resultado o el error de la Promise.

Su objetivo es realizar una operación general que debe ocurrir tanto en caso
de éxito como de error.
*/

function ejemploFinallyConResultado() {
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("value"), 2000);
  })
    .finally(() => alert("Promise ready"))
    .then(resultado => alert(resultado));
}


/*
Flujo:

resolve("value")
    ↓
finally()
    ↓
then("value")

finally() no consume el valor.

El resultado "value" continúa hacia el siguiente manejador adecuado.
*/


/*
13. finally() TAMBIÉN TRANSFIERE LOS ERRORES

Si la Promise termina con un error, finally() ejecuta su lógica y después
el error continúa hacia el siguiente manejador apropiado.
*/

function ejemploFinallyConError() {
  new Promise((resolve, reject) => {
    throw new Error("error");
  })
    .finally(() => alert("Promise ready"))
    .catch(error => alert(error));
}


/*
Flujo:

error
    ↓
finally()
    ↓
catch(error)
*/


/*
14. VALORES DEVUELTOS DESDE finally()

Un manejador de finally() no debería devolver ningún valor.

Si devuelve algo, ese valor es ignorado y el resultado anterior continúa
hacia el siguiente manejador apropiado.
*/

function ejemploValorIgnoradoEnFinally() {
  new Promise(resolve => {
    resolve("resultado original");
  })
    .finally(() => {
      return "este valor es ignorado";
    })
    .then(resultado => alert(resultado));
}


/*
El .then() continúa recibiendo:

"resultado original"
*/


/*
15. ERROR GENERADO DENTRO DE finally()

Existe una excepción al comportamiento anterior.

Si finally() genera un error, ese error pasa al siguiente manejador de errores
en lugar del resultado anterior.
*/

function ejemploErrorDentroDeFinally() {
  new Promise(resolve => {
    resolve("resultado original");
  })
    .finally(() => {
      throw new Error("Error generado dentro de finally");
    })
    .catch(error => alert(error));
}


/*
Flujo:

resolve("resultado original")
    ↓
finally()
    ↓
throw new Error(...)
    ↓
catch(error)
*/


/*
16. RESUMEN DE finally()

1. finally() se ejecuta cuando la Promise termina, tanto con éxito como
   con error.

2. finally() no recibe el resultado de la operación anterior.

3. El resultado o error anterior continúa hacia el siguiente manejador
   apropiado.

4. Si finally() devuelve un valor, ese valor se ignora.

5. Si finally() genera un error, ese nuevo error continúa hacia el manejador
   de errores más cercano.

6. finally() está pensado principalmente para procedimientos generales de
   limpieza o finalización.
*/


/*
17. AÑADIR MANEJADORES DESPUÉS DE RESOLVER UNA PROMISE

Los manejadores .then(), .catch() y .finally() pueden añadirse mientras una
Promise está pendiente.

También pueden añadirse después de que la Promise ya tenga un resultado.

Si el resultado ya existe, el manejador correspondiente podrá utilizarlo.
*/

function ejemploManejadorPosterior() {
  const promesa = new Promise(resolve => {
    resolve("done!");
  });

  promesa.then(alert);
}


/*
Esto hace que las Promises sean más flexibles que la analogía de una lista
de suscripción.

Los consumidores pueden añadirse incluso cuando el resultado ya ha sido
producido.
*/


/*
18. EJEMPLO PRÁCTICO: loadScript CON CALLBACK

Este ejemplo depende del navegador porque utiliza document y elementos
<script>.

La versión basada en callbacks necesita recibir la función callback desde
el momento en que se llama a loadScript.
*/

function loadScriptConCallback(src, callback) {
  const script = document.createElement("script");

  script.src = src;

  script.onload = () => callback(null, script);

  script.onerror = () => {
    callback(new Error(`Script load error for ${src}`));
  };

  document.head.append(script);
}


/*
Uso conceptual:

loadScriptConCallback("ruta/script.js", (error, script) => {
  if (error) {
    // Manejar error.
  } else {
    // Utilizar script.
  }
});
*/


/*
19. loadScript UTILIZANDO PROMISE

La versión basada en Promise ya no necesita recibir un callback.

La función:

1. Crea una Promise.
2. Inicia la carga del script.
3. Llama a resolve(script) cuando la carga termina correctamente.
4. Llama a reject(error) cuando la carga falla.
5. Devuelve la Promise.

El código consumidor puede añadir sus manejadores posteriormente mediante
.then().
*/

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement("script");

    script.src = src;

    script.onload = () => resolve(script);

    script.onerror = () => {
      reject(new Error(`Script load error for ${src}`));
    };

    document.head.append(script);
  });
}


/*
20. CONSUMIR loadScript()

El código consumidor recibe la Promise devuelta por loadScript() y puede
registrar funciones mediante .then().
*/

function ejemploUsoLoadScript() {
  const promesa = loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"
  );

  promesa.then(
    script => alert(`${script.src} is loaded!`),
    error => alert(`Error: ${error.message}`)
  );

  promesa.then(script => {
    alert("Another handler...");
  });
}


/*
21. VENTAJA: VARIOS CONSUMIDORES

Una misma Promise puede recibir múltiples llamadas a .then().

Cada llamada registra un nuevo consumidor del resultado.
*/

function ejemploVariosConsumidores() {
  const promesa = new Promise(resolve => {
    resolve("resultado");
  });

  promesa.then(resultado => {
    console.log("Consumidor 1:", resultado);
  });

  promesa.then(resultado => {
    console.log("Consumidor 2:", resultado);
  });

  promesa.then(resultado => {
    console.log("Consumidor 3:", resultado);
  });
}


/*
22. PROMISE FRENTE A CALLBACK

Con Promises:

Primero iniciamos la operación:

const promesa = loadScript(src);

Después podemos decidir qué hacer con el resultado:

promesa.then(...);

Además, podemos registrar varios consumidores utilizando varias llamadas
a .then().


Con callbacks:

La función callback debe estar disponible cuando llamamos a la función:

loadScriptConCallback(src, callback);

Por lo tanto, debemos indicar qué hacer con el resultado desde el momento
en que iniciamos la operación.

La versión presentada en la lección utiliza una única llamada de retorno.
*/


/*
23. FLUJO GENERAL DE UNA PROMISE

Creación:

new Promise(executor)
    ↓
executor se ejecuta automáticamente
    ↓
operación
    ↓
resolve(value) o reject(error)


Éxito:

resolve(value)
    ↓
.then(resultado => ...)


Error:

reject(error)
    ↓
.then(null, error => ...)

o:

reject(error)
    ↓
.catch(error => ...)


Finalización:

resolve/reject
    ↓
.finally(() => ...)
    ↓
resultado o error continúa al siguiente manejador apropiado
*/


/*
RESUMEN

1. Una Promise conecta código productor y código consumidor.

2. Se crea mediante:

   new Promise((resolve, reject) => {
     // trabajo
   });

3. El executor se ejecuta automáticamente.

4. resolve(value) indica que la operación terminó correctamente.

5. reject(error) indica que la operación terminó con un error.

6. Una Promise comienza con state "pending".

7. Después puede pasar a "fulfilled" o "rejected".

8. Una Promise solo puede establecer un resultado definitivo.
   Las llamadas posteriores a resolve() o reject() son ignoradas.

9. Se recomienda utilizar objetos Error al rechazar una Promise.

10. resolve() y reject() pueden ejecutarse después de una operación que
    requiere tiempo o inmediatamente.

11. .then() permite manejar éxito y error.

12. .catch() es una forma abreviada de:

    .then(null, manejadorDeError)

13. .finally() permite realizar procedimientos generales de limpieza o
    finalización.

14. finally() no recibe el resultado anterior.

15. finally() normalmente transmite el resultado o error original al siguiente
    manejador.

16. Un valor devuelto por finally() se ignora.

17. Un error generado dentro de finally() pasa al siguiente manejador de
    errores.

18. Los manejadores pueden añadirse incluso después de que la Promise ya tenga
    un resultado.

19. Una misma Promise puede tener múltiples consumidores mediante múltiples
    llamadas a .then().

20. En el ejemplo loadScript(), utilizar una Promise permite separar el inicio
    de la operación de los consumidores que procesarán posteriormente su
    resultado.
*/


/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos que utilizan alert(), document o carga de scripts necesitan un
entorno de navegador.
*/

// ejemploPromesaResuelta().then(resultado => console.log(resultado));

// ejemploResolve().then(resultado => console.log(resultado));

// ejemploReject().catch(error => console.log(error));

// ejemploUnSoloResultado().then(resultado => console.log(resultado));

// ejemploResolucionInmediata().then(resultado => console.log(resultado));

// ejemploThenExitoso();

// ejemploThenConError();

// ejemploThenSoloExito();

// ejemploCatch();

// ejemploCatchEquivalente();

// ejemploFinallyConResultado();

// ejemploFinallyConError();

// ejemploValorIgnoradoEnFinally();

// ejemploErrorDentroDeFinally();

// ejemploManejadorPosterior();

// ejemploUsoLoadScript();

// ejemploVariosConsumidores();
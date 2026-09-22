/*
PROMISIFICACIÓN

La promisificación consiste en transformar una función basada en callbacks
en una función que devuelve una Promise.

Muchas funciones utilizan callbacks con el formato:

callback(error, resultado)

Cuando se promisifica una función de este tipo:

- Si ocurre un error, la Promise se rechaza con reject(error).
- Si la operación termina correctamente, la Promise se resuelve con
  resolve(resultado).

La nueva función normalmente actúa como un envoltorio alrededor de la función
original.
*/


/*
1. FUNCIÓN ORIGINAL BASADA EN CALLBACK

loadScript(src, callback) carga un script en el navegador.

Cuando la carga termina correctamente:

callback(null, script)

Cuando ocurre un error:

callback(error)
*/

function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);

  script.onerror = () => {
    callback(new Error(`Script load error for ${src}`));
  };

  document.head.append(script);
}

/*
Este ejemplo depende del navegador porque utiliza document.

Uso basado en callback:

loadScript("path/script.js", (error, script) => {
  ...
});
*/


/*
2. PROMISIFICACIÓN MANUAL

Queremos crear una versión de loadScript que reciba solamente src y devuelva
una Promise.

La Promise:

- se resuelve con script si la carga termina correctamente;
- se rechaza con el error si la carga falla.

La función original no se modifica. La nueva función simplemente la envuelve.
*/

function loadScriptPromise(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (error, script) => {
      if (error) {
        reject(error);
      } else {
        resolve(script);
      }
    });
  });
}

/*
Flujo cuando la carga funciona:

loadScriptPromise(src)
-> loadScript(src, callback)
-> callback(null, script)
-> resolve(script)
-> .then(...)

Flujo cuando ocurre un error:

loadScriptPromise(src)
-> loadScript(src, callback)
-> callback(error)
-> reject(error)
-> manejador de rechazo
*/


/*
3. FUNCIÓN AUXILIAR promisify

Si necesitamos convertir varias funciones basadas en callbacks, podemos
crear una función auxiliar llamada promisify(f).

promisify(f) recibe una función original f y devuelve una nueva función
contenedora que devuelve una Promise.

Esta primera versión supone que la función original utiliza exactamente este
formato de callback:

callback(error, resultado)
*/

function promisifySimple(funcionOriginal) {
  return function (...argumentos) {
    return new Promise((resolve, reject) => {
      function callback(error, resultado) {
        if (error) {
          reject(error);
        } else {
          resolve(resultado);
        }
      }

      // El callback personalizado se agrega como último argumento.
      argumentos.push(callback);

      /*
      Se llama a la función original conservando el valor actual de this
      y pasando todos los argumentos recibidos.
      */
      funcionOriginal.call(this, ...argumentos);
    });
  };
}

/*
La idea es equivalente a la promisificación manual anterior:

const loadScriptPromise = promisifySimple(loadScript);

Ahora loadScriptPromise devuelve una Promise en lugar de necesitar que
proporcionemos directamente un callback.
*/


/*
4. QUÉ HACE INTERNAMENTE promisify

Una llamada:

promisifySimple(funcionOriginal)

no ejecuta inmediatamente funcionOriginal.

Primero devuelve una nueva función.

Cuando posteriormente llamamos a esa función:

funcionPromisificada(arg1, arg2)

ocurre lo siguiente:

1. Los argumentos se almacenan en argumentos.
2. Se crea una nueva Promise.
3. Se crea un callback personalizado.
4. Ese callback se añade al final de los argumentos.
5. Se ejecuta la función original.
6. El callback transforma su resultado en resolve o reject.

De esta forma se adapta una API basada en callbacks a una API basada en
Promise sin modificar la función original.
*/


/*
5. CALLBACKS CON VARIOS RESULTADOS

La versión anterior supone que el callback tiene exactamente dos argumentos:

callback(error, resultado)

Pero una función también puede utilizar:

callback(error, resultado1, resultado2, ...)

En ese caso podemos crear una versión más flexible de promisify.
*/


function promisify(funcionOriginal, muchosArgumentos = false) {
  return function (...argumentos) {
    return new Promise((resolve, reject) => {
      function callback(error, ...resultados) {
        if (error) {
          reject(error);
        } else {
          resolve(muchosArgumentos ? resultados : resultados[0]);
        }
      }

      argumentos.push(callback);

      funcionOriginal.call(this, ...argumentos);
    });
  };
}


/*
6. COMPORTAMIENTO DE muchosArgumentos

Si utilizamos:

promisify(funcionOriginal)

muchosArgumentos vale false.

Por lo tanto, cuando el callback recibe:

callback(null, resultado1, resultado2)

la Promise se resuelve únicamente con:

resultado1

porque se ejecuta:

resolve(resultados[0])


En cambio, si utilizamos:

promisify(funcionOriginal, true)

la Promise se resuelve con el array completo de resultados:

[resultado1, resultado2, ...]
*/


function ejemploCallbackConVariosResultados(valor, callback) {
  callback(null, valor, valor);
}

function crearPromesaConPrimerResultado() {
  const funcionPromisificada = promisify(
    ejemploCallbackConVariosResultados
  );

  return funcionPromisificada("resultado");
}

function crearPromesaConTodosLosResultados() {
  const funcionPromisificada = promisify(
    ejemploCallbackConVariosResultados,
    true
  );

  return funcionPromisificada("resultado");
}

/*
En el primer caso, la Promise se resuelve con el primer resultado.

En el segundo caso, la Promise se resuelve con un array que contiene todos
los resultados proporcionados por el callback.
*/


/*
7. FORMATOS DE CALLBACK NO COMPATIBLES DIRECTAMENTE

promisify supone que el primer argumento del callback representa un error:

callback(error, resultado)

No todas las funciones utilizan ese formato.

Por ejemplo, una función podría usar:

callback(resultado)

sin ningún argumento error.

Para formatos de callback diferentes o más especiales, la función puede
promisificarse manualmente en lugar de utilizar este asistente.
*/


/*
8. PROMISE NO REEMPLAZA COMPLETAMENTE A LOS CALLBACKS

Las Promise son especialmente convenientes para código basado en promesas
y para async/await.

Sin embargo, no sustituyen completamente a los callbacks.

Una Promise solamente puede tener un resultado final.

Un callback, en cambio, técnicamente puede ser llamado varias veces.

Por este motivo, la promisificación está pensada para funciones que llaman
a su callback una sola vez.
*/


/*
9. LLAMADAS POSTERIORES AL CALLBACK

Si una función promisificada llama a su callback varias veces, solamente
la primera llamada que resuelva o rechace la Promise tendrá efecto.

Las llamadas posteriores serán ignoradas.

Por lo tanto, una función que necesita producir resultados mediante múltiples
llamadas sucesivas a un callback no encaja directamente con este modelo de
promisificación.
*/


/*
10. HERRAMIENTAS EXISTENTES

Además de crear una función promisify manualmente, existen herramientas
destinadas a este tipo de transformación.

El contenido menciona:

- es6-promisify.
- util.promisify en Node.js.

Estas herramientas permiten convertir funciones basadas en callbacks en
funciones que trabajan con Promise.
*/


/*
RESUMEN

1. Promisificar significa convertir una función basada en callbacks en una
   función que devuelve una Promise.

2. Un callback del tipo:

   callback(error, resultado)

   puede transformarse en:

   error     -> reject(error)
   resultado -> resolve(resultado)

3. La función promisificada normalmente es un envoltorio y no modifica la
   función original.

4. promisify(f) puede automatizar esta transformación para funciones que
   siguen el formato callback(error, resultado).

5. El callback personalizado se añade como último argumento de la función
   original.

6. funcionOriginal.call(this, ...argumentos) permite reenviar la llamada a
   la función original conservando el valor actual de this.

7. Si el callback proporciona varios resultados, una versión más avanzada
   puede recogerlos mediante:

   callback(error, ...resultados)

8. promisify(f, false) resuelve la Promise con resultados[0].

9. promisify(f, true) resuelve la Promise con el array completo resultados.

10. Los callbacks con otros formatos, por ejemplo callback(resultado), pueden
    necesitar una promisificación manual.

11. Una Promise solamente tiene un resultado final.

12. Los callbacks pueden ser llamados múltiples veces.

13. Por ello, la promisificación está destinada a funciones que llaman a su
    callback una sola vez.

14. Después de que una Promise se resuelve o se rechaza, las llamadas
    posteriores al callback no cambian su resultado.
*/


/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

loadScript y loadScriptPromise dependen del navegador.
*/

// loadScript("path/script.js", (error, script) => {
//   console.log(error, script);
// });

// loadScriptPromise("path/script.js")
//   .then(script => console.log(script))
//   .catch(error => console.log(error));

// const loadScriptPromisificado = promisify(loadScript);
// loadScriptPromisificado("path/script.js")
//   .then(script => console.log(script))
//   .catch(error => console.log(error));

// crearPromesaConPrimerResultado()
//   .then(resultado => console.log(resultado));

// crearPromesaConTodosLosResultados()
//   .then(resultados => console.log(resultados));
/*
PROMISIFICATION

La promisificación consiste en transformar una función que acepta una
función de devolución de llamada (callback) en una función que devuelve
una Promise.

Esta transformación es útil cuando una función existente utiliza callbacks,
pero queremos integrarla en código basado en promesas.

La idea general es:

callback -> Promise

La función original continúa funcionando igual. La nueva función actúa como
un envoltorio que traduce el resultado del callback en resolve o reject.
*/

/*
1. FUNCIÓN ORIGINAL BASADA EN CALLBACKS

loadScript(src, callback) carga un script y después ejecuta el callback.

El callback sigue el formato:

callback(err, result)

Si ocurre un error:

callback(error)

Si la operación termina correctamente:

callback(null, script)

Este ejemplo depende del navegador porque utiliza document.
*/
function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () =>
    callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

/*
2. CONVERSIÓN MANUAL A UNA PROMESA

loadScriptPromise(src) envuelve a loadScript().

En lugar de recibir un callback, devuelve una Promise:

- Si loadScript informa un error, se llama a reject(err).
- Si la carga tiene éxito, se llama a resolve(script).

Flujo exitoso:

loadScriptPromise(src)
-> loadScript(src, callback)
-> callback(null, script)
-> resolve(script)

Flujo con error:

loadScriptPromise(src)
-> loadScript(src, callback)
-> callback(err)
-> reject(err)
*/
function ejemploPromisificacionManual() {
  const loadScriptPromise = function (src) {
    return new Promise((resolve, reject) => {
      loadScript(src, (err, script) => {
        if (err) {
          reject(err);
        } else {
          resolve(script);
        }
      });
    });
  };

  return loadScriptPromise;
}

/*
Uso conceptual:

const loadScriptPromise = ejemploPromisificacionManual();

loadScriptPromise("path/script.js")
  .then(script => {
    // El script se cargó correctamente.
  })
  .catch(err => {
    // La carga produjo un error.
  });

No se ejecuta automáticamente porque carga un recurso externo en el navegador.
*/

/*
3. FUNCIÓN AUXILIAR promisify(f)

Si necesitamos promisificar varias funciones, podemos crear un ayudante
general llamado promisify(f).

promisify(f):

1. Recibe una función f basada en callbacks.
2. Devuelve una nueva función contenedora.
3. La función contenedora recibe los argumentos originales mediante ...args.
4. Devuelve una Promise.
5. Crea un callback propio.
6. Agrega ese callback al final de los argumentos.
7. Ejecuta la función original con f.call(this, ...args).
8. Convierte el callback en resolve o reject.

Esta versión supone que la función original utiliza exactamente este formato:

callback(err, result)

Si err existe, la promesa se rechaza.
Si no existe, la promesa se resuelve con result.
*/
function promisify(f) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

/*
Ejemplo conceptual:

const loadScriptPromise = promisify(loadScript);

loadScriptPromise("path/script.js")
  .then(script => {
    // La promesa se resolvió con script.
  })
  .catch(err => {
    // La promesa se rechazó con err.
  });

La llamada anterior no se ejecuta automáticamente porque depende del navegador
y carga un recurso externo.
*/

/*
4. POR QUÉ SE UTILIZA f.call(this, ...args)

El envoltorio reenvía la llamada a la función original f.

Los argumentos recibidos se guardan en args y después se agrega al final
el callback personalizado:

args.push(callback);

Finalmente se ejecuta:

f.call(this, ...args);

De esta forma, la función original recibe sus argumentos normales más
el callback creado por promisify.
*/

/*
5. CALLBACKS CON VARIOS RESULTADOS

La primera versión de promisify supone un callback de esta forma:

callback(err, result)

Sin embargo, algunas funciones pueden utilizar varios valores de resultado:

callback(err, res1, res2, ...)

Para esos casos puede utilizarse una versión ampliada de promisify.
*/

/*
6. promisify CON SOPORTE PARA VARIOS RESULTADOS

La opción manyArgs controla cómo se resuelve la Promise.

promisify(f)

Equivale al comportamiento anterior: la Promise se resuelve solamente con
el primer resultado del callback.

promisify(f, true)

La Promise se resuelve con un array que contiene todos los resultados.

El callback interno utiliza:

callback(err, ...results)

Por lo tanto, todos los resultados quedan almacenados en results.
*/
function promisifyMultipleResults(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        if (err) {
          reject(err);
        } else {
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

/*
Comportamiento:

promisifyMultipleResults(f)

callback(null, resultado1, resultado2)
-> resolve(resultado1)

promisifyMultipleResults(f, true)

callback(null, resultado1, resultado2)
-> resolve([resultado1, resultado2])

Si existe un error:

callback(error, ...)
-> reject(error)
*/

/*
7. FORMATOS DE CALLBACK NO COMPATIBLES DIRECTAMENTE

Estas funciones auxiliares parten de una convención concreta:

callback(err, result)

o:

callback(err, res1, res2, ...)

No todas las funciones utilizan ese formato.

Por ejemplo, una función podría usar:

callback(result)

sin recibir un argumento err.

En esos casos, la función puede promisificarse manualmente en lugar de usar
este ayudante.
*/

/*
8. PROMISIFICACIÓN NO REEMPLAZA TODOS LOS CALLBACKS

Las promesas son especialmente útiles para trabajar con operaciones que
producen un único resultado.

Sin embargo, una función de devolución de llamada puede ejecutarse
técnicamente muchas veces.

Una Promise solo puede establecer su resultado una vez.

Por esta razón, la promisificación está pensada para funciones que llaman
a su callback una sola vez.

Si la función intenta llamar nuevamente al callback después de que la Promise
ya fue resuelta o rechazada, esas llamadas posteriores serán ignoradas.
*/

/*
9. HERRAMIENTAS MENCIONADAS

Existen herramientas más flexibles para realizar promisificación.

El contenido menciona:

- es6-promisify.
- util.promisify en Node.js.

El funcionamiento específico de estas herramientas no se desarrolla aquí.
*/

/*
RESUMEN

1. Promisificar significa convertir una función basada en callbacks en una
   función que devuelve una Promise.

2. La función original no necesita modificarse. Puede envolverse en una nueva
   función que traduzca su callback a resolve y reject.

3. Un callback con el formato callback(err, result) puede traducirse así:

   err    -> reject(err)
   result -> resolve(result)

4. promisify(f) permite realizar esta transformación de manera reutilizable.

5. El callback personalizado se agrega al final de los argumentos antes de
   ejecutar la función original.

6. f.call(this, ...args) ejecuta la función original reenviando el contexto
   y los argumentos recibidos.

7. Para callbacks con varios resultados puede usarse:

   callback(err, ...results)

8. Con manyArgs = false, la Promise se resuelve con results[0].

9. Con manyArgs = true, la Promise se resuelve con el array completo results.

10. Los formatos de callback diferentes, como callback(result), pueden
    promisificarse manualmente.

11. Una Promise tiene un único resultado, mientras que un callback puede
    invocarse varias veces.

12. Por ello, la promisificación está destinada a funciones que ejecutan
    su callback una sola vez.
*/

/*
ACTIVACIÓN MANUAL

Los ejemplos relacionados con loadScript dependen del navegador y pueden
realizar solicitudes para cargar scripts. Descomenta únicamente el código
que quieras probar.
*/

// const loadScriptPromiseManual = ejemploPromisificacionManual();
// loadScriptPromiseManual("path/script.js").then(script => console.log(script));

// const loadScriptPromise = promisify(loadScript);
// loadScriptPromise("path/script.js").then(script => console.log(script));

// const loadScriptPromiseConResultados = promisifyMultipleResults(loadScript, true);
// loadScriptPromiseConResultados("path/script.js").then(resultados => console.log(resultados));
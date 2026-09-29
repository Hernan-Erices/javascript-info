/*
INTRODUCCIÓN: FUNCIONES DE DEVOLUCIÓN DE LLAMADA

Los entornos de JavaScript permiten iniciar acciones asíncronas:
acciones que comienzan ahora, pero finalizan más tarde.

En estos ejemplos se utilizan métodos del navegador para cargar scripts
y demostrar cómo trabajar con callbacks.

Una función que realiza una operación asíncrona puede recibir una función
de devolución de llamada, o callback, que se ejecutará cuando la operación
haya terminado.
*/

/*
1. UNA OPERACIÓN ASÍNCRONA

La función loadScript(src) crea dinámicamente un elemento <script>,
establece su atributo src y lo agrega al documento.

El navegador comienza a cargar el script, pero la función loadScript()
termina antes de que la carga necesariamente haya finalizado.

Por eso, cualquier código escrito inmediatamente después de loadScript()
continúa ejecutándose sin esperar al script.
*/

function ejemploCargaAsincrona() {
  function loadScript(src) {
    const script = document.createElement("script");
    script.src = src;
    document.head.append(script);
  }

  loadScript("/my/script.js");

  // Este código no espera a que termine la carga del script.
  // ...
}

/*
Intentar utilizar inmediatamente una función definida por el script
cargado puede fallar porque el navegador quizá todavía no haya terminado
de cargarlo y ejecutarlo.

Ejemplo conceptual:

loadScript("/my/script.js");
newFunction(); // La función puede no existir todavía.
*/

/*
2. CALLBACK PARA SABER CUÁNDO TERMINA LA OPERACIÓN

Podemos agregar un callback como segundo argumento.

El evento onload ejecuta una función después de que el script se haya
cargado y ejecutado.

De esta forma, el callback contiene el código que depende del resultado
de la operación asíncrona.
*/

function ejemploCallbackBasico() {
  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => callback(script);

    document.head.append(script);
  }

  loadScript("/my/script.js", function () {
    // Este código se ejecuta después de cargar el script.
    newFunction();
  });
}

/*
La idea principal es:

1. loadScript() inicia la carga.
2. loadScript() termina sin esperar.
3. El navegador continúa cargando el script.
4. Cuando termina la carga, se activa onload.
5. onload ejecuta el callback.
6. El callback puede usar las funciones y variables declaradas
   por el script cargado.
*/

/*
3. EJEMPLO CON UN SCRIPT REAL

Este ejemplo depende del navegador y realiza una solicitud de red.

El callback recibe el elemento <script> una vez terminada la carga.
El identificador "_" pertenece al script externo cargado.
*/

function ejemploScriptReal() {
  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => callback(script);

    document.head.append(script);
  }

  loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js",
    script => {
      alert(`Cool, the script ${script.src} is loaded`);
      alert(_);
    }
  );
}

/*
A este enfoque se le llama programación asíncrona basada en callbacks.

Una función que realiza una acción asíncrona proporciona un callback
que indica qué debe ejecutarse después de que la operación haya
finalizado.
*/

/*
4. CALLBACK DENTRO DE CALLBACK

Si varias operaciones asíncronas deben ejecutarse de forma secuencial,
la siguiente operación puede iniciarse dentro del callback de la anterior.

Flujo:

cargar primer script
-> ejecutar su callback
-> cargar segundo script
-> ejecutar su callback
*/

function ejemploDosScriptsSecuenciales() {
  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => callback(script);

    document.head.append(script);
  }

  loadScript("/my/script.js", function (script) {
    alert(`Cool, the ${script.src} is loaded, let's load one more`);

    loadScript("/my/script2.js", function () {
      alert("Cool, the second script is loaded");
    });
  });
}

/*
El mismo patrón puede continuar con más operaciones.
Cada nueva acción comienza dentro del callback de la acción anterior.
*/

function ejemploTresScriptsSecuenciales() {
  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => callback(script);

    document.head.append(script);
  }

  loadScript("/my/script.js", function () {
    loadScript("/my/script2.js", function () {
      loadScript("/my/script3.js", function () {
        // Continuar cuando los tres scripts hayan sido cargados.
      });
    });
  });
}

/*
Este enfoque funciona bien cuando existen pocas operaciones, pero el
anidamiento aumenta a medida que crece la cantidad de acciones
asíncronas.
*/

/*
5. MANEJO DE ERRORES

Los ejemplos anteriores solamente reaccionaban a una carga correcta.

Para manejar también los errores, loadScript() puede ejecutar el mismo
callback tanto en caso de éxito como en caso de fallo.

Convención utilizada:

callback(null, resultado)

se utiliza cuando la operación finaliza correctamente.

callback(error)

se utiliza cuando ocurre un error.
*/

function ejemploCallbackConErrores() {
  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => callback(null, script);

    script.onerror = () => {
      callback(new Error(`Script load error for ${src}`));
    };

    document.head.append(script);
  }

  loadScript("/my/script.js", function (error, script) {
    if (error) {
      // Manejar el error.
    } else {
      // El script se cargó correctamente.
      console.log(script);
    }
  });
}

/*
6. ESTILO "ERROR-FIRST CALLBACK"

Esta forma de organizar los argumentos del callback utiliza la siguiente
convención:

1. El primer argumento está reservado para el error.

   callback(error);

2. Si no existe error, el primer argumento es null y los argumentos
   siguientes contienen los resultados.

   callback(null, resultado);

   También pueden existir varios resultados:

   callback(null, resultado1, resultado2);

La misma función callback sirve tanto para informar de errores como
para devolver resultados exitosos.
*/

/*
7. PIRÁMIDE DE LA PERDICIÓN

Cuando se encadenan muchas operaciones asíncronas utilizando callbacks,
el código puede adquirir un anidamiento cada vez mayor.

En el siguiente ejemplo:

1. Se carga 1.js.
2. Si no existe error, se carga 2.js.
3. Si tampoco existe error, se carga 3.js.
4. Si todo funciona, continúa el resto del código.

A medida que aumenta el número de operaciones, el código se desplaza
hacia la derecha y resulta más difícil de gestionar.

A esta estructura se la conoce como:

- infierno de callbacks;
- pirámide de la perdición.
*/

function ejemploPiramideDeLaPerdicion() {
  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => callback(null, script);

    script.onerror = () => {
      callback(new Error(`Script load error for ${src}`));
    };

    document.head.append(script);
  }

  function handleError(error) {
    console.log(error);
  }

  loadScript("1.js", function (error) {
    if (error) {
      handleError(error);
    } else {
      loadScript("2.js", function (error) {
        if (error) {
          handleError(error);
        } else {
          loadScript("3.js", function (error) {
            if (error) {
              handleError(error);
            } else {
              // Continuar después de cargar todos los scripts.
            }
          });
        }
      });
    }
  });
}

/*
La pirámide crece con cada nueva acción asíncrona.

Además del propio anidamiento, el código real puede incluir otras
estructuras como condicionales o bucles, haciendo todavía más difícil
seguir el flujo de ejecución.
*/

/*
8. REDUCIR EL ANIDAMIENTO CON FUNCIONES INDEPENDIENTES

Una forma de evitar el anidamiento profundo consiste en mover cada
callback a una función independiente de nivel superior.

El comportamiento sigue siendo el mismo, pero las funciones ya no están
anidadas unas dentro de otras.
*/

function ejemploCallbacksSeparados() {
  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => callback(null, script);

    script.onerror = () => {
      callback(new Error(`Script load error for ${src}`));
    };

    document.head.append(script);
  }

  function handleError(error) {
    console.log(error);
  }

  function step1(error, script) {
    if (error) {
      handleError(error);
    } else {
      console.log(script);
      loadScript("2.js", step2);
    }
  }

  function step2(error, script) {
    if (error) {
      handleError(error);
    } else {
      console.log(script);
      loadScript("3.js", step3);
    }
  }

  function step3(error, script) {
    if (error) {
      handleError(error);
    } else {
      console.log(script);

      // Continuar después de cargar todos los scripts.
    }
  }

  loadScript("1.js", step1);
}

/*
Esta solución elimina el anidamiento profundo, pero introduce otros
problemas de organización:

- Para seguir el flujo hay que saltar entre diferentes funciones.
- Las funciones step1, step2 y step3 existen únicamente para esta cadena.
- No se reutilizan fuera de estas operaciones.
- Aparecen nombres adicionales cuyo único propósito es evitar el
  anidamiento.

Por eso, aunque funciona, tampoco resulta una solución especialmente
cómoda para secuencias asíncronas grandes.

Existen otras formas de organizar este tipo de operaciones, entre ellas
las promesas.
*/

/*
RESUMEN

1. Una operación asíncrona comienza ahora y finaliza más tarde.

2. loadScript() inicia la carga de un script, pero no espera a que esta
   termine antes de devolver el control.

3. El código escrito inmediatamente después de una operación asíncrona
   no espera automáticamente su finalización.

4. Un callback permite indicar qué código debe ejecutarse cuando una
   operación asíncrona termina.

5. Para realizar operaciones secuenciales, una nueva operación puede
   iniciarse dentro del callback de la anterior.

6. El estilo "error-first callback" reserva el primer argumento del
   callback para un posible error:

   callback(error);

   En caso de éxito:

   callback(null, resultado);

7. El mismo callback puede representar tanto el resultado exitoso como
   el error de una operación.

8. Muchos callbacks anidados producen código difícil de leer y mantener.
   Este problema se conoce como "infierno de callbacks" o "pirámide de
   la perdición".

9. Separar cada callback en una función independiente reduce el
   anidamiento, pero fragmenta el flujo del programa y agrega funciones
   de un solo uso.

10. Las promesas proporcionan otra forma de organizar este tipo de
    operaciones asíncronas.
*/

/*
ACTIVACIÓN MANUAL

Todos los ejemplos utilizan APIs del navegador.

Algunos también realizan cargas de scripts, solicitudes de red,
muestran alertas o provocan errores intencionales si los recursos
indicados no existen.

Descomenta solamente el ejemplo que quieras probar.
*/

// ejemploCargaAsincrona();
// ejemploCallbackBasico();
// ejemploScriptReal();
// ejemploDosScriptsSecuenciales();
// ejemploTresScriptsSecuenciales();
// ejemploCallbackConErrores();
// ejemploPiramideDeLaPerdicion();
// ejemploCallbacksSeparados();
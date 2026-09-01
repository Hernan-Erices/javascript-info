/*
===============================================================================
FUNCIONES DE DEVOLUCIÓN DE LLAMADA (CALLBACKS)
===============================================================================

OBJETIVO:
- Entender qué es la programación asíncrona.
- Entender qué es un callback.
- Saber cuándo y por qué utilizar callbacks.
- Entender callbacks dentro de callbacks.
- Aprender el patrón "error-first callback".
- Comprender la "Callback Hell" o "Pyramid of Doom".
- Entender por qué las Promesas son una alternativa mejor para cadenas de operaciones asíncronas.

NOTA:
Los ejemplos utilizan APIs del navegador como:
- document.createElement()
- document.head.append()
- script.onload
- script.onerror

Estos conceptos son independientes de esos métodos. El objetivo es entender
el funcionamiento de los callbacks.
*/


// =============================================================================
// 1. ¿QUÉ ES LA PROGRAMACIÓN ASÍNCRONA?
// =============================================================================

/*
JavaScript puede realizar operaciones ASÍNCRONAS.

Una operación asíncrona es una operación que:

    1. Iniciamos ahora.
    2. Termina en algún momento posterior.

Lo importante es que JavaScript NO tiene por qué quedarse esperando a que
termine para continuar ejecutando el código que viene después.

Ejemplos de operaciones que pueden ser asíncronas:

- setTimeout()
- Cargar scripts.
- Cargar recursos.
- Peticiones HTTP.
- Leer archivos.
- Operaciones relacionadas con APIs del navegador.
- Promesas.
- Etc.

Ejemplo sencillo:

    setTimeout(() => {
        console.log("Terminé");
    }, 2000);

    console.log("Esto aparece primero");

Resultado:

    Esto aparece primero
    Terminé

Aunque setTimeout() se llamó primero, su callback se ejecuta posteriormente.

*/


// =============================================================================
// 2. EJEMPLO: CARGAR UN SCRIPT
// =============================================================================

/*
Supongamos que queremos cargar dinámicamente un archivo JavaScript.

Podemos crear una función loadScript():

    function loadScript(src) {
        let script = document.createElement("script");
        script.src = src;
        document.head.append(script);
    }

¿Qué hace?

1. Crea un elemento <script>.
2. Le asigna la dirección del archivo mediante src.
3. Agrega el <script> al documento.
4. El navegador comienza a cargarlo.

*/

function loadScript(src) {
    // Crear dinámicamente una etiqueta <script>
    let script = document.createElement("script");

    // Indicar qué archivo debe cargar
    script.src = src;

    // Agregar el script al documento
    // Esto hace que el navegador comience a cargarlo
    document.head.append(script);
}


// Podemos utilizarla así:

loadScript("/my/script.js");

/*
IMPORTANTE:

La llamada anterior NO significa:

    "Carga el script y espera hasta que termine."

Significa:

    "Comienza a cargar el script."

El código siguiente puede ejecutarse inmediatamente.

*/

loadScript("/my/script.js");

// Este código NO espera a que /my/script.js termine de cargarse.
console.log("Este código puede ejecutarse inmediatamente.");


// =============================================================================
// 3. EL PROBLEMA DE LA ASINCRONÍA
// =============================================================================

/*
Supongamos que /my/script.js contiene:

    function newFunction() {
        console.log("Hola");
    }

Podríamos pensar en hacer esto:

    loadScript("/my/script.js");
    newFunction();

Pero esto puede fallar.

¿Por qué?

Porque loadScript() inicia la carga, pero el archivo podría no haber
terminado de descargarse cuando intentamos ejecutar newFunction().

Conceptualmente:

    loadScript()
        |
        |--- comienza carga
        |
        |--- JavaScript continúa
        |
        |--- newFunction()  <-- demasiado pronto
        |
        |--- script termina de cargar

Por lo tanto:

    loadScript("/my/script.js");
    newFunction();

NO garantiza que newFunction() exista todavía.

*/


// =============================================================================
// 4. SOLUCIÓN: CALLBACK
// =============================================================================

/*
La solución es indicarle a loadScript():

    "Cuando termines de cargar el script, ejecuta esta función."

Esa función se llama CALLBACK.

Un callback es simplemente una función que:

    - se entrega como argumento a otra función
    - y se ejecuta posteriormente, normalmente cuando ocurre algo
    o termina una operación.

*/


// =============================================================================
// 5. ¿CÓMO PASAMOS UNA FUNCIÓN COMO ARGUMENTO?
// =============================================================================

/*
Las funciones en JavaScript son valores.

Por lo tanto, podemos:

    - guardarlas en variables
    - pasarlas como argumentos
    - devolverlas desde otras funciones

Ejemplo:

*/

function saludar() {
    console.log("Hola");
}

// Pasamos la función, NO la ejecutamos.
//
// CORRECTO:
// ejecutar(saludar)
//
// INCORRECTO:
// ejecutar(saludar())
//
// saludar() ejecutaría inmediatamente la función.

function ejecutar(callback) {
    callback();
}

ejecutar(saludar);

/*
Resultado:

    Hola


Aquí:

    saludar
        ^
        |
        +--- callback

La función ejecutar() recibe una función y decide cuándo ejecutarla.
*/


// =============================================================================
// 6. LOADSCRIPT() CON CALLBACK
// =============================================================================

/*
Podemos modificar nuestra función para recibir un callback:

    loadScript(src, callback)

Y utilizar el evento onload para saber cuándo terminó la carga.

*/

function loadScriptConCallback(src, callback) {

    let script = document.createElement("script");

    script.src = src;

    // onload se ejecuta cuando el recurso terminó de cargar.
    //
    // En este caso llamamos al callback después de que el script
    // haya sido cargado y ejecutado.
    script.onload = () => {
        callback(script);
    };

    document.head.append(script);
}


/*
Ahora podemos hacer:

    loadScriptConCallback("/my/script.js", function(script) {

        // Este código se ejecuta DESPUÉS de cargar el script.

        newFunction();

    });


La idea fundamental es:

    loadScript()
          |
          |--- comienza carga
          |
          |--- JavaScript puede continuar
          |
          |--- script termina de cargar
          |
          |--- callback()
                    |
                    +--- código que depende del script


Esto es PROGRAMACIÓN ASÍNCRONA BASADA EN CALLBACKS.
*/


// =============================================================================
// 7. CALLBACK ANÓNIMO
// =============================================================================

/*
Es muy común pasar directamente una función como callback:

*/

loadScriptConCallback("/my/script.js", function(script) {

    console.log("El script terminó de cargarse.");

});


/*
También podemos utilizar una arrow function:

*/

loadScriptConCallback("/my/script.js", (script) => {

    console.log(`Script cargado: ${script.src}`);

});


/*
No es obligatorio utilizar una función anónima.

También podemos definirla previamente:

*/

function scriptCargado(script) {
    console.log(`Cargado: ${script.src}`);
}

loadScriptConCallback("/my/script.js", scriptCargado);


// =============================================================================
// 8. IDEA FUNDAMENTAL DE LOS CALLBACKS
// =============================================================================

/*
Un callback permite expresar:

    "Haz esta operación y, cuando termine, ejecuta esta función."

Por ejemplo:

    loadScript("archivo.js", callback);


Podemos interpretarlo como:

    1. Empieza a cargar archivo.js.
    2. No bloquees el resto del programa esperando.
    3. Cuando termine:
           ejecuta callback.


Esto es especialmente útil cuando una operación tarda un tiempo
indeterminado en terminar.
*/


// =============================================================================
// 9. CALLBACK DENTRO DE CALLBACK
// =============================================================================

/*
Ahora aparece una situación interesante.

¿Qué pasa si necesitamos cargar DOS scripts en orden?

Queremos:

    1. Cargar script1.js
    2. Cuando termine, cargar script2.js


Podemos colocar el segundo loadScript() dentro del callback del primero.

*/

loadScriptConCallback("script1.js", function(script) {

    console.log("Primer script cargado.");

    loadScriptConCallback("script2.js", function(script) {

        console.log("Segundo script cargado.");

    });

});


/*
La lógica es:

    cargar script1
         |
         v
    termina script1
         |
         v
    callback
         |
         v
    cargar script2
         |
         v
    termina script2
         |
         v
    callback


Esto funciona perfectamente para unas pocas operaciones.
*/


// =============================================================================
// 10. VARIOS CALLBACKS ANIDADOS
// =============================================================================

/*
El problema aparece cuando tenemos muchas operaciones secuenciales.

Por ejemplo:

    script1 -> script2 -> script3 -> script4 -> script5


Podríamos terminar con algo así:

*/

loadScriptConCallback("script1.js", function(script) {

    loadScriptConCallback("script2.js", function(script) {

        loadScriptConCallback("script3.js", function(script) {

            loadScriptConCallback("script4.js", function(script) {

                // Continuar después de cargar todos...

            });

        });

    });

});


/*
Cada operación depende de que termine la anterior.

Esto provoca que las funciones se vayan desplazando hacia la derecha.

Cuantas más operaciones tengamos:

    callback
        callback
            callback
                callback
                    callback
                        ...

El código empieza a ser difícil de leer y mantener.

Esto nos lleva al problema conocido como:

    CALLBACK HELL
    o
    PYRAMID OF DOOM

*/


// =============================================================================
// 11. MANEJO DE ERRORES
// =============================================================================

/*
Hasta ahora solamente consideramos el caso exitoso:

    script carga correctamente
        |
        v
    callback(script)


Pero ¿qué ocurre si el script NO puede cargarse?

Por ejemplo:

    - URL incorrecta.
    - Archivo inexistente.
    - Problema de red.
    - Servidor no disponible.

Necesitamos informar del error al callback.


Para eso podemos utilizar:

    script.onerror


La función puede quedar así:
*/


function loadScriptConError(src, callback) {

    let script = document.createElement("script");

    script.src = src;

    // ÉXITO
    script.onload = () => {
        callback(null, script);
    };

    // ERROR
    script.onerror = () => {
        callback(
            new Error(`Error al cargar el script: ${src}`)
        );
    };

    document.head.append(script);
}


/*
Observa algo importante:

ÉXITO:

    callback(null, script);


ERROR:

    callback(error);


Esto nos lleva a una convención muy utilizada:
*/


// =============================================================================
// 12. ERROR-FIRST CALLBACK
// =============================================================================

/*
La convención se conoce como:

    ERROR-FIRST CALLBACK

La estructura es:

    callback(error, result)


Si ocurre un error:

    callback(error);

Si todo sale bien:

    callback(null, result);


El primer argumento está reservado para el error.

Los argumentos siguientes contienen los resultados.


Ejemplo:

    callback(null, script);

Significa:

    error = null
    result = script


Mientras que:

    callback(error);

Significa:

    ocurrió un error.
*/


// =============================================================================
// 13. USAR ERROR-FIRST CALLBACK
// =============================================================================

loadScriptConError(
    "/my/script.js",

    function(error, script) {

        // Primero comprobamos si ocurrió un error.
        if (error) {

            // Manejar el error
            console.error(error);

            return;
        }

        // Si llegamos aquí, la carga fue exitosa.
        console.log("Script cargado correctamente.");

        console.log(script.src);
    }
);


/*
La estructura mental debería ser:

    callback(error, result)
           |
           v
    ¿hay error?
       /     \
     SÍ       NO
     |         |
 manejar     utilizar
 error       resultado


Esta convención permite utilizar la misma función callback tanto
para comunicar errores como para entregar resultados.
*/


// =============================================================================
// 14. CALLBACK HELL / PYRAMID OF DOOM
// =============================================================================

/*
Ahora combinemos:

    - operaciones secuenciales
    - callbacks
    - manejo de errores


Supongamos que necesitamos:

    1. cargar 1.js
    2. cargar 2.js
    3. cargar 3.js


Y cada una depende de la anterior.

*/

loadScriptConError("1.js", function(error, script) {

    if (error) {

        handleError(error);

    } else {

        // 1.js se cargó correctamente.

        loadScriptConError("2.js", function(error, script) {

            if (error) {

                handleError(error);

            } else {

                // 2.js se cargó correctamente.

                loadScriptConError("3.js", function(error, script) {

                    if (error) {

                        handleError(error);

                    } else {

                        // Todos los scripts se cargaron correctamente.

                        console.log("Todo terminado.");

                    }

                });

            }

        });

    }

});


/*
El flujo es:

    1.js
      |
      +-- error --> handleError()
      |
      +-- éxito
           |
           v
         2.js
           |
           +-- error --> handleError()
           |
           +-- éxito
                |
                v
              3.js
                |
                +-- error --> handleError()
                |
                +-- éxito
                     |
                     v
                   terminar


El código se vuelve cada vez más profundo.

Visualmente:

    loadScript()
        |
        +-- callback
              |
              +-- loadScript()
                    |
                    +-- callback
                          |
                          +-- loadScript()
                                |
                                +-- callback
                                      |
                                      +-- ...


Esta forma visual de pirámide es la razón del nombre:

    PYRAMID OF DOOM

También se suele llamar:

    CALLBACK HELL
*/


// =============================================================================
// 15. ¿POR QUÉ CALLBACK HELL ES UN PROBLEMA?
// =============================================================================

/*
El problema NO es que los callbacks sean malos.

Los callbacks son una herramienta perfectamente válida.

El problema aparece cuando tenemos muchas operaciones asíncronas
dependientes unas de otras.


Problemas principales:

1. DIFICULTAD DE LECTURA
--------------------------------

El código se desplaza cada vez más hacia la derecha.


2. DIFICULTAD DE MANTENIMIENTO
--------------------------------

Modificar una parte puede requerir navegar por varios niveles
de callbacks.


3. MANEJO REPETITIVO DE ERRORES
--------------------------------

Tenemos que escribir constantemente:

    if (error) {
        handleError(error);
    } else {
        ...
    }


4. MUCHO ANIDAMIENTO
--------------------------------

Las operaciones quedan unas dentro de otras.


5. FUNCIONES DIFÍCILES DE REUTILIZAR
--------------------------------

Los callbacks anónimos suelen existir solamente para esa operación.


Por eso necesitamos una alternativa mejor para cadenas complejas
de operaciones asíncronas.

Esa alternativa son las PROMESAS.
*/


// =============================================================================
// 16. INTENTO DE SOLUCIÓN: SEPARAR CADA PASO
// =============================================================================

/*
Una forma de reducir el anidamiento es sacar cada callback a una
función independiente.

Por ejemplo:

    loadScript("1.js", step1);


    function step1(error, script) {

        if (error) {
            handleError(error);
        } else {
            loadScript("2.js", step2);
        }

    }


    function step2(error, script) {

        if (error) {
            handleError(error);
        } else {
            loadScript("3.js", step3);
        }

    }


    function step3(error, script) {

        if (error) {
            handleError(error);
        } else {
            // Todo terminado.
        }

    }

*/


// Ejemplo:

loadScriptConError("1.js", step1);


function step1(error, script) {

    if (error) {

        handleError(error);
        return;
    }

    // 1.js cargado correctamente.
    loadScriptConError("2.js", step2);
}


function step2(error, script) {

    if (error) {

        handleError(error);
        return;
    }

    // 2.js cargado correctamente.
    loadScriptConError("3.js", step3);
}


function step3(error, script) {

    if (error) {

        handleError(error);
        return;
    }

    // Todos los scripts fueron cargados.
    console.log("Todo terminado.");
}


/*
Esta solución elimina el gran anidamiento.

Ya no tenemos:

    callback {
        callback {
            callback {
                ...
            }
        }
    }


Pero aparece otro problema.

Ahora tenemos que saltar entre distintas partes del código:

    step1()
       |
       +----> step2()
                 |
                 +----> step3()


Además:

    - step1() probablemente solo se utiliza una vez.
    - step2() probablemente solo se utiliza una vez.
    - step3() probablemente solo se utiliza una vez.


Es decir, creamos funciones únicamente para evitar el anidamiento.

El resultado puede sentirse como un código fragmentado y más difícil
de seguir.


Por eso esta solución funciona, pero tampoco es ideal.
*/


// =============================================================================
// 17. FUNCIÓN handleError()
// =============================================================================

/*
Los ejemplos anteriores utilizan handleError().

Aquí solamente representamos la idea:

*/

function handleError(error) {
    console.error("Ocurrió un error:", error);
}


/*
En una aplicación real podríamos:

    - Mostrar un mensaje al usuario.
    - Registrar el error.
    - Intentar nuevamente.
    - Enviar información a un sistema de monitoreo.
    - Cancelar una operación.
    - Etc.
*/


// =============================================================================
// 18. RESUMEN CONCEPTUAL
// =============================================================================

/*
CALLBACK
--------

Una función que se pasa como argumento a otra función para ser
ejecutada posteriormente.

Ejemplo:

    function ejecutar(callback) {
        callback();
    }


    ejecutar(() => {
        console.log("Ejecutado");
    });


------------------------------------------------------------

ASINCRONÍA
----------

Una operación asíncrona comienza ahora pero termina posteriormente.

Ejemplo conceptual:

    iniciarOperacion();

    console.log("Continúo ejecutando código");


------------------------------------------------------------

CALLBACK ASÍNCRONO
------------------

Una función que se ejecutará cuando termine una operación asíncrona.

Ejemplo:

    loadScript("archivo.js", () => {
        console.log("Ya terminó");
    });


------------------------------------------------------------

ONLOAD
------

Evento que permite ejecutar una función cuando un recurso terminó
de cargarse correctamente.

Ejemplo:

    script.onload = () => {
        // recurso cargado
    };


------------------------------------------------------------

ONERROR
-------

Evento que permite reaccionar cuando ocurre un error durante la carga.

Ejemplo:

    script.onerror = () => {
        // ocurrió un error
    };


------------------------------------------------------------

ERROR-FIRST CALLBACK
--------------------

Convención:

    callback(error, result)


Éxito:

    callback(null, result);


Error:

    callback(error);


El primer argumento representa el error.


------------------------------------------------------------

CALLBACK HELL
-------------

Problema que aparece cuando tenemos muchos callbacks anidados.

Ejemplo conceptual:

    operación1(() => {

        operación2(() => {

            operación3(() => {

                operación4(() => {

                    ...

                });

            });

        });

    });


También se conoce como:

    Pyramid of Doom


------------------------------------------------------------

SOLUCIÓN
--------

Para cadenas complejas de operaciones asíncronas existen alternativas
más cómodas.

La principal que veremos a continuación:

    PROMESAS (Promises)


Las Promesas permiten representar el resultado futuro de una operación
asíncrona y facilitan encadenar varias operaciones sin crear una
pirámide de callbacks.
*/


// =============================================================================
// 19. MAPA MENTAL
// =============================================================================

/*

                    PROGRAMACIÓN ASÍNCRONA
                            |
                            v
                    Operación tarda
                            |
                            v
                  ¿Cuándo terminó?
                            |
                            v
                         CALLBACK
                            |
              +-------------+-------------+
              |                           |
              v                           v
           ÉXITO                        ERROR
              |                           |
              v                           v
     callback(null, result)       callback(error)


Si tenemos muchas operaciones:

    CALLBACK
       |
       v
    CALLBACK
       |
       v
    CALLBACK
       |
       v
    CALLBACK
       |
       v
 CALLBACK HELL
       |
       v
    PROBLEMA
       |
       v
   PROMESAS


*/


// =============================================================================
// 20. LO MÁS IMPORTANTE PARA RECORDAR
// =============================================================================

/*
1.
Una función puede recibir otra función como argumento.

------------------------------------------------------------

2.
La función recibida puede utilizarse como CALLBACK.

------------------------------------------------------------

3.
Un callback permite decir:

    "Cuando termine esta operación, ejecuta esto."

------------------------------------------------------------

4.
Las operaciones asíncronas no necesariamente esperan antes de
continuar con el código siguiente.

------------------------------------------------------------

5.
Para saber cuándo terminó una operación podemos utilizar un callback.

------------------------------------------------------------

6.
Los callbacks también pueden informar errores.

Patrón:

    callback(error, result)

------------------------------------------------------------

7.
Una cadena de callbacks puede generar mucho anidamiento.

Eso produce:

    Callback Hell
    Pyramid of Doom

------------------------------------------------------------

8.
Separar los callbacks en funciones independientes puede reducir
el anidamiento, pero puede hacer que el código quede fragmentado.

------------------------------------------------------------

9.
Las Promesas proporcionan una forma más conveniente de manejar
cadenas de operaciones asíncronas.

------------------------------------------------------------

10.
Los callbacks NO son malos.

El problema es utilizarlos para construir cadenas asíncronas
grandes y complejas.


===============================================================================
FIN ? CALLBACKS
===============================================================================

SIGUIENTE CONCEPTO RELACIONADO:

    PROMESAS (Promises)

La idea será reemplazar estructuras como:

    operación1(() => {
        operación2(() => {
            operación3(() => {
                ...
            });
        });
    });

por una estructura más fácil de leer y mantener.
*/
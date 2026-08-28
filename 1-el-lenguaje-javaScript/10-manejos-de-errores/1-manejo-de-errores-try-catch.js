// ============================================================
// MANEJO DE ERRORES: try...catch
// ============================================================
//
// try...catch permite capturar ERRORES DE EJECUCIÓN para que
// el programa pueda manejarlos en lugar de detenerse.
//
// FLUJO:
//
// try
//  ?
// ¿Error?
//  ??? NO ? catch se ignora ? continúa
//  ??? SÍ ? try se detiene ? catch maneja el error
//
// ============================================================


// ============================================================
// 1. SINTAXIS BÁSICA
// ============================================================

try {
    // Código que podría producir un error
} catch (error) {
    // Código para manejar el error
}


// ============================================================
// 2. ¿QUÉ SUCEDE SI NO HAY ERROR?
// ============================================================

try {
    console.log("Inicio");

    const number = 10;
    console.log(number);

    console.log("Fin");
} catch (error) {
    console.log("Ocurrió un error");
}

// Resultado:
// Inicio
// 10
// Fin
//
// catch NO se ejecuta porque no hubo ningún error.


// ============================================================
// 3. ¿QUÉ SUCEDE SI HAY UN ERROR?
// ============================================================

try {
    console.log("Inicio");

    // Error: la variable no existe
    console.log(variableInexistente);

    // Esta línea nunca se ejecuta
    console.log("Fin");
} catch (error) {
    console.log("Se produjo un error");
}

console.log("El programa continúa");

// Flujo:
//
// try
//  ?
// error
//  ?
// se detiene try
//  ?
// catch
//  ?
// continúa el programa


// ============================================================
// 4. EL OBJETO DE ERROR
// ============================================================
//
// catch recibe un objeto con información sobre el error.
//
// El nombre puede ser cualquiera:
//
// catch (error)
// catch (err)
// catch (e)

try {
    throw new Error("Algo salió mal");
} catch (error) {

    console.log(error.name);
    // Error

    console.log(error.message);
    // Algo salió mal

    console.log(error.stack);
    // Información sobre dónde ocurrió el error
}


// ============================================================
// 5. catch SIN PARÁMETRO
// ============================================================
//
// Si no necesitamos información sobre el error,
// podemos omitir la variable.
//
// catch {
//     ...
// }

try {
    JSON.parse("esto no es JSON");
} catch {
    console.log("El JSON no es válido");
}


// ============================================================
// 6. SOLO CAPTURA ERRORES DE EJECUCIÓN
// ============================================================
//
// try...catch necesita que el código sea JavaScript válido.
//
// SÍ puede capturar:
//
// - Variables inexistentes
// - Excepciones
// - Errores producidos durante la ejecución
//
// NO puede capturar errores de sintaxis del propio código,
// porque JavaScript no puede interpretarlo correctamente.
//
// Ejemplo de error de ejecución:

try {
    console.log(variableInexistente);
} catch {
    console.log("Error capturado");
}


// Ejemplo de sintaxis inválida:
//
// try {
//     {{{{{{
// } catch {
//     ...
// }
//
// Esto no puede ser manejado por el try...catch,
// porque el código ni siquiera puede ser interpretado.


// ============================================================
// 7. try...catch ES SÍNCRONO
// ============================================================
//
// try...catch solo captura errores que ocurren durante
// la ejecución del bloque try.
//
// NO captura automáticamente errores que ocurren
// posteriormente en funciones programadas.

// NO funciona:

try {
    setTimeout(() => {
        throw new Error("Error");
    }, 1000);
} catch {
    console.log("Este catch NO captura el error");
}


// ¿Por qué?
//
// 1. try comienza
// 2. setTimeout programa una función
// 3. try termina
// 4. catch termina
// 5. después de 1 segundo se ejecuta la función
// 6. ocurre el error
//
// El try...catch original ya terminó.


// ============================================================
// 8. FORMA CORRECTA CON setTimeout
// ============================================================
//
// El try...catch debe estar dentro de la función que
// se ejecutará posteriormente.

setTimeout(() => {

    try {
        throw new Error("Error dentro de setTimeout");

    } catch {
        console.log("Error capturado correctamente");
    }

}, 1000);


// Flujo:
//
// setTimeout()
//      ?
// espera
//      ?
// ejecuta la función
//      ?
// try
//      ?
// error
//      ?
// catch


// ============================================================
// 9. EJEMPLO PRÁCTICO: JSON.parse()
// ============================================================
//
// JSON.parse() produce un error si recibe un JSON inválido.
//
// try...catch permite controlar ese caso.

function parseJSON(json) {

    try {
        return JSON.parse(json);

    } catch (error) {

        console.log("JSON inválido");

        return null;
    }
}

console.log(
    parseJSON('{"name": "Yvnir"}')
);
// { name: "Yvnir" }

console.log(
    parseJSON("texto inválido")
);
// JSON inválido
// null


// ============================================================
// 10. NO USES try...catch PARA TODO
// ============================================================
//
// No es buena práctica envolver todo el programa:
//
// try {
//     // Todo el programa
// } catch {
//     // Ignorar errores
// }
//
// Úsalo cuando una operación puede fallar y existe una forma
// útil de manejar ese fallo.
//
// Ejemplos:
//
// - JSON.parse()
// - Entradas que pueden ser inválidas
// - Datos externos
// - Operaciones que pueden lanzar excepciones
//
// ============================================================


// ============================================================
// RESUMEN
// ============================================================
//
// try...catch
// -----------
//
// Permite manejar ERRORES DE EJECUCIÓN sin detener todo
// el programa.
//
// SINTAXIS:
//
// try {
//     // código
// } catch (error) {
//     // manejar error
// }
//
//
//
// SIN ERROR:
//
// try ? termina ? catch se ignora ? continúa
//
//
//
// CON ERROR:
//
// try ? error ? catch ? continúa
//
//
//
// OBJETO error:
//
// error.name
// error.message
// error.stack
//
//
//
// LIMITACIONES:
//
// 1. No captura errores de sintaxis del propio código.
//
// 2. Es síncrono.
//
// 3. Un error dentro de setTimeout debe capturarse
//    dentro de la función de setTimeout.
//
//
//
// IDEA CLAVE:
//
// try...catch NO evita que ocurra un error.
// Permite REACCIONAR a él de forma controlada.
//
// ============================================================


// ============================================================
// REGLAS PARA MEMORIZAR
// ============================================================
//
// 1. try contiene código que puede fallar.
//
// 2. catch maneja errores de ejecución.
//
// 3. Si no hay error, catch no se ejecuta.
//
// 4. Un error detiene inmediatamente el bloque try.
//
// 5. catch recibe información sobre el error.
//
// 6. Puedes omitir el parámetro de catch si no lo necesitas.
//
// 7. No captura errores de sintaxis del propio código.
//
// 8. try...catch funciona de forma síncrona.
//
// 9. Los errores de setTimeout necesitan su propio
//    try...catch dentro de la función.
//
// 10. Úsalo cuando realmente puedas manejar el error.
//
// ============================================================



// ============================================================
// Objeto de error, throw y errores personalizados
// ============================================================

// ============================================================
// 1. OBJETO DE ERROR
// ============================================================
//
// Cuando ocurre un error, JavaScript crea un objeto con
// información sobre lo sucedido y lo entrega a catch.
//
// try {
//     ...
// } catch (error) {
//     ...
// }
//
// Propiedades principales:
//
// error.name    ? tipo de error
// error.message ? descripción del error
// error.stack   ? pila de llamadas, útil para depuración
//
// ============================================================


try {
    variableInexistente;
} catch (error) {

    console.log(error.name);
    // ReferenceError

    console.log(error.message);
    // variableInexistente is not defined

    console.log(error.stack);
    // Información sobre dónde ocurrió el error

    console.log(error);
    // Error completo
}


// ============================================================
// 2. catch SIN VARIABLE
// ============================================================
//
// Si no necesitamos información sobre el error,
// podemos omitir el parámetro.
//
// ============================================================

try {
    JSON.parse("JSON inválido");
} catch {
    console.log("Ocurrió un error");
}


// ============================================================
// 3. CASO REAL: JSON.parse()
// ============================================================
//
// JSON.parse() convierte un texto JSON en un objeto JavaScript.
//
// Si el JSON está mal formado, genera un SyntaxError.
//
// ============================================================

const json = '{ "name": "John", "age": 30 }';

try {

    const user = JSON.parse(json);

    console.log(user.name);
    // John

} catch (error) {

    console.log("Los datos no son válidos");
}


// ============================================================
// 4. MANEJAR JSON INVÁLIDO
// ============================================================

const invalidJSON = "{ bad json }";

try {

    const user = JSON.parse(invalidJSON);

} catch (error) {

    console.log("Error al procesar los datos");
    console.log(error.name);
    // SyntaxError

    console.log(error.message);
    // Detalles del error
}


// ============================================================
// 5. EL PROBLEMA: JSON VÁLIDO PERO DATOS INCORRECTOS
// ============================================================
//
// JSON.parse() solo comprueba que la sintaxis del JSON
// sea correcta.
//
// No sabe si los datos cumplen nuestras necesidades.
//
// Por ejemplo:
//
// { "age": 30 }
//
// Es JSON válido, pero puede ser incorrecto para nuestra
// aplicación si necesitamos obligatoriamente "name".
//
// ============================================================

const jsonUser = '{ "age": 30 }';

try {

    const user = JSON.parse(jsonUser);

    console.log(user.name);
    // undefined

} catch (error) {

    // No se ejecuta porque JSON.parse() no produjo error.
}


// ============================================================
// 6. throw
// ============================================================
//
// throw permite GENERAR NUESTROS PROPIOS ERRORES.
//
// Sintaxis:
//
// throw error;
//
// Cuando se ejecuta throw:
//
// 1. Se detiene inmediatamente el try.
// 2. La ejecución salta a catch.
// 3. catch recibe el error.
//
// ============================================================

try {

    throw new Error("Algo salió mal");

} catch (error) {

    console.log(error.message);
    // Algo salió mal
}


// ============================================================
// 7. CREAR ERRORES CON Error
// ============================================================
//
// JavaScript proporciona constructores para diferentes
// tipos de errores:
//
// Error
// SyntaxError
// ReferenceError
// TypeError
// etc.
//
// ============================================================

const error = new Error("Mensaje del error");

console.log(error.name);
// Error

console.log(error.message);
// Mensaje del error


// ============================================================
// 8. ERRORES ESPECÍFICOS
// ============================================================

const syntaxError = new SyntaxError("JSON incompleto");

console.log(syntaxError.name);
// SyntaxError

console.log(syntaxError.message);
// JSON incompleto


// ============================================================
// 9. VALIDAR DATOS Y LANZAR NUESTRO ERROR
// ============================================================
//
// Podemos combinar JSON.parse() con throw.
//
// Así conseguimos que diferentes problemas terminen
// siendo manejados por el mismo catch.
//
// ============================================================

const jsonData = '{ "age": 30 }';

try {

    const user = JSON.parse(jsonData);

    // JSON válido, pero falta un dato obligatorio
    if (!user.name) {
        throw new SyntaxError("Datos incompletos: falta name");
    }

    console.log(user.name);

} catch (error) {

    console.log("Error: " + error.message);
}


// ============================================================
// 10. VENTAJA DE throw
// ============================================================
//
// Sin throw:
//
// JSON.parse()
//      ?
// JSON válido
//      ?
// falta "name"
//      ?
// no ocurre ninguna excepción
//
// Con throw:
//
// JSON.parse()
//      ?
// JSON válido
//      ?
// falta "name"
//      ?
// throw
//      ?
// catch
//      ?
// manejo del error
//
// De esta forma, podemos centralizar diferentes errores
// en un mismo catch.
//
// ============================================================


// ============================================================
// 11. FLUJO COMPLETO
// ============================================================
//
// try
//  ?
// JSON.parse()
//  ?
// ¿JSON válido?
//  ??? NO ? SyntaxError ? catch
//  ??? SÍ
//       ?
//    ¿Datos correctos?
//       ??? NO ? throw ? catch
//       ??? SÍ ? continúa
//
// ============================================================


// ============================================================
// RESUMEN
// ============================================================
//
// OBJETO DE ERROR
// ---------------
//
// catch recibe un objeto con información:
//
// error.name
// ? Tipo de error.
//
// error.message
// ? Descripción.
//
// error.stack
// ? Pila de llamadas para depuración.
//
//
// ============================================================
//
// catch SIN VARIABLE
// ------------------
//
// Si no necesitamos el error:
//
// try {
//     ...
// } catch {
//     ...
// }
//
//
// ============================================================
//
// JSON.parse()
// ------------
//
// Puede lanzar un SyntaxError si el JSON es inválido.
//
// try...catch permite manejarlo.
//
//
// ============================================================
//
// throw
// -----
//
// Permite lanzar nuestros propios errores:
//
// throw new Error("Mensaje");
//
// También podemos usar:
//
// throw new SyntaxError("Mensaje");
// throw new ReferenceError("Mensaje");
// throw new TypeError("Mensaje");
//
//
// ============================================================
//
// IDEA CLAVE
// ----------
//
// JSON.parse() puede detectar errores de sintaxis,
// pero NO sabe si los datos son correctos para nuestra
// aplicación.
//
// Podemos validar los datos y usar throw para generar
// un error cuando no cumplan nuestras condiciones.
//
// Así podemos manejar todos los errores relacionados
// desde un mismo catch.
//
// ============================================================
//
// REGLAS PARA MEMORIZAR
// ---------------------
//
// 1. catch recibe el objeto de error.
//
// 2. error.name indica el tipo.
//
// 3. error.message describe el problema.
//
// 4. error.stack ayuda a depurar.
//
// 5. catch puede escribirse sin variable.
//
// 6. JSON.parse() lanza SyntaxError con JSON inválido.
//
// 7. throw permite lanzar errores manualmente.
//
// 8. Error, SyntaxError, ReferenceError y TypeError son
//    constructores de errores integrados.
//
// 9. throw detiene inmediatamente la ejecución del try.
//
// 10. throw + try...catch permite centralizar el manejo
//     de errores.
//
// ============================================================

// ============================================================
// MANEJO DE ERRORES ? try...catch (PARTE 3)
// JavaScript.info
// ============================================================
//
// Conceptos principales:
// 1. Relanzar errores (rethrow)
// 2. finally
// 3. try...finally
// 4. Captura global de errores
//
// ============================================================


// ============================================================
// 1. RELANZAR ERRORES (RETHROW)
// ============================================================
//
// catch captura TODOS los errores que ocurran dentro de try.
//
// Pero no siempre queremos manejar todos.
//
// Regla:
// ? catch debe manejar únicamente los errores que conoce.
// ? Los demás deben volver a lanzarse con `throw`.
//
// Flujo:
//
// try
//   ?
// error
//   ?
// catch
//   ?
// ¿Lo conozco?
//   ??? Sí ? manejarlo
//   ??? No ? throw err
//
// ============================================================


// ============================================================
// 2. COMPROBAR EL TIPO DE ERROR
// ============================================================
//
// Podemos identificar un error mediante:
//
// error instanceof ErrorType
// error.name
// error.constructor.name
//
// La forma más habitual es `instanceof`.
//
// Ejemplo:

try {

    JSON.parse("{ datos incorrectos }");

} catch (error) {

    if (error instanceof SyntaxError) {
        console.log("Error de sintaxis en JSON.");
    } else {
        throw error;
    }

}


// ============================================================
// 3. EJEMPLO COMPLETO DE RELANZAMIENTO
// ============================================================

let json = '{ "age": 30 }';

try {

    const user = JSON.parse(json);

    // El JSON es válido, pero faltan datos necesarios.
    if (!user.name) {
        throw new SyntaxError("Falta la propiedad name.");
    }

    // Error inesperado de programación.
    // blabla();

} catch (error) {

    if (error instanceof SyntaxError) {

        // Sabemos cómo manejar este error.
        console.log("JSON Error:", error.message);

    } else {

        // No sabemos manejarlo.
        // Lo dejamos continuar hacia un catch externo.
        throw error;
    }
}


// ============================================================
// 4. CATCH EXTERNO
// ============================================================
//
// Un error relanzado puede ser capturado por otro
// try...catch más externo.
//
// Esto permite separar responsabilidades.
//
// Una función puede manejar los errores que conoce
// y dejar los demás para un nivel superior.
//
// ============================================================

function readData() {

    try {

        // ...

        throw new ReferenceError("Variable inexistente.");

    } catch (error) {

        if (error instanceof SyntaxError) {

            console.log("Error de sintaxis.");

        } else {

            // No sabemos manejarlo.
            throw error;
        }
    }
}


try {

    readData();

} catch (error) {

    console.log("Catch externo:", error.message);

}


// ============================================================
// 5. FINALLY
// ============================================================
//
// `finally` se ejecuta SIEMPRE:
//
// Sin error:
//     try ? finally
//
// Con error:
//     try ? catch ? finally
//
// Es útil para ejecutar código de limpieza o finalización
// independientemente del resultado.
//
// Sintaxis:
//
// try {
//     ...
// } catch (error) {
//     ...
// } finally {
//     ...
// }
//
// ============================================================

try {

    console.log("Ejecutando try.");

} catch (error) {

    console.log("Error.");

} finally {

    console.log("Siempre se ejecuta.");
}


// ============================================================
// 6. EJEMPLO CON ERROR
// ============================================================

try {

    console.log("Inicio");

    throw new Error("Algo salió mal.");

} catch (error) {

    console.log("Error:", error.message);

} finally {

    console.log("Finalización.");
}


// Resultado:
//
// Inicio
// Error: Algo salió mal.
// Finalización
//
// ============================================================


// ============================================================
// 7. FINALLY SE EJECUTA INCLUSO CON return
// ============================================================
//
// `finally` se ejecuta antes de que una función termine,
// incluso si `try` contiene `return`.
//
// ============================================================

function example() {

    try {

        return 100;

    } finally {

        console.log("finally se ejecuta antes del return.");
    }
}

console.log(example());

// Flujo:
//
// try
// ?
// return 100
// ?
// finally
// ?
// devuelve 100


// ============================================================
// 8. FINALLY TAMBIÉN SE EJECUTA CON throw
// ============================================================
//
// No importa si la función termina mediante:
//
// return
// throw
//
// `finally` se ejecutará igualmente.
//
// ============================================================

function test() {

    try {

        throw new Error("Error.");

    } finally {

        console.log("Limpieza ejecutada.");
    }
}

try {

    test();

} catch (error) {

    console.log("Error recibido:", error.message);
}


// ============================================================
// 9. try...finally SIN catch
// ============================================================
//
// Podemos utilizar:
//
// try {
//     ...
// } finally {
//     ...
// }
//
// cuando NO queremos manejar el error aquí,
// pero necesitamos ejecutar algo al finalizar.
//
// El error continuará propagándose.
//
// Es útil para tareas que deben finalizar siempre.
//
// ============================================================

function process() {

    try {

        console.log("Iniciando proceso.");

        throw new Error("Error durante el proceso.");

    } finally {

        console.log("Finalizando proceso.");
    }
}

try {

    process();

} catch (error) {

    console.log("Error manejado externamente.");
}


// ============================================================
// 10. VARIABLE Y ÁMBITO (SCOPE)
// ============================================================
//
// Las variables declaradas con `let` o `const` dentro de:
//
// try
// catch
// finally
//
// pertenecen a ese bloque.
//
// Si necesitamos utilizarlas fuera,
// debemos declararlas antes.
//
// ============================================================

let result;

try {

    result = 100;

} catch (error) {

    result = 0;
}

console.log(result);


// ============================================================
// 11. EJEMPLO PRÁCTICO: MEDIR EJECUCIÓN
// ============================================================
//
// `finally` es ideal cuando queremos garantizar una acción,
// independientemente de si hubo éxito o error.
//
// ============================================================

function calculate() {

    const start = Date.now();

    try {

        // Operación que puede fallar.
        return 100;

    } catch (error) {

        console.log("Error:", error.message);

    } finally {

        const time = Date.now() - start;

        console.log(`Tiempo de ejecución: ${time}ms`);
    }
}

calculate();


// ============================================================
// 12. CAPTURA GLOBAL DE ERRORES
// ============================================================
//
// Esta parte depende del entorno y NO forma parte del
// comportamiento estándar de JavaScript.
//
// En navegadores existe:
//
// window.onerror
//
// Sirve para detectar errores no controlados.
//
// Normalmente no se utiliza para "recuperar" la aplicación,
// sino para registrar errores y ayudar a los desarrolladores.
//
// ============================================================


// Ejemplo para navegador:
//
// window.onerror = function(message, url, line, col, error) {
//
//     console.log("Error no controlado:", message);
//     console.log("Archivo:", url);
//     console.log("Línea:", line);
//     console.log("Columna:", col);
//     console.log("Error:", error);
//
// };


// ============================================================
// 13. CAPTURA GLOBAL EN NODE.JS
// ============================================================
//
// Node.js dispone de:
//
// process.on("uncaughtException", ...)
//
// Permite reaccionar ante excepciones no controladas.
//
// Es específico de Node.js.
//
// ============================================================


// ============================================================
// RESUMEN
// ============================================================
//
// RELANZAR (RETHROW)
// ------------------
//
// catch captura todos los errores de try.
//
// Si solo sabemos manejar algunos:
//
// if (error instanceof TipoDeError) {
//     // manejar
// } else {
//     throw error;
// }
//
// `throw error` permite que otro try...catch lo maneje.
//
//
// ------------------------------------------------------------
//
// FINALLY
// -------
//
// Se ejecuta siempre:
//
// Sin error:
//     try ? finally
//
// Con error:
//     try ? catch ? finally
//
// También se ejecuta si existe:
//
// return
// throw
//
//
//
// ------------------------------------------------------------
//
// TRY...FINALLY
// -------------
//
// Permite garantizar una acción final sin manejar
// el error:
//
// try {
//     ...
// } finally {
//     ...
// }
//
// El error continúa propagándose.
//
//
// ------------------------------------------------------------
//
// CAPTURA GLOBAL
// --------------
//
// Navegador:
//
// window.onerror
//
// Node.js:
//
// process.on("uncaughtException", ...)
//
// Se utiliza principalmente para registrar errores
// no controlados.
//
// ============================================================


// ============================================================
// REGLAS CLAVE PARA MEMORIZAR
// ============================================================
//
// 1. `catch` captura todos los errores de `try`.
//
// 2. No debes tratar todos los errores como si fueran iguales.
//
// 3. Si no sabes manejar un error ? `throw error`.
//
// 4. `instanceof` permite comprobar el tipo de error.
//
// 5. `finally` se ejecuta siempre.
//
// 6. `finally` se ejecuta incluso con `return` o `throw`.
//
// 7. `try...finally` sirve para garantizar una acción final
//    sin manejar el error.
//
// 8. Los errores relanzados pueden ser capturados por un
//    `try...catch` externo.
//
// 9. La captura global depende del entorno.
//
// 10. `finally` es especialmente útil para tareas de
//     limpieza, finalización o medición.
//
// ============================================================
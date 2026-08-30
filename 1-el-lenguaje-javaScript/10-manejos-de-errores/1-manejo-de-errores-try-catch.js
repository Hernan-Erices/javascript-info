// ============================================================
// MANEJO DE ERRORES ? try...catch
// ============================================================
//
// `try...catch` permite capturar errores de ejecución y
// manejarlos sin detener completamente el programa.
//
// Flujo:
//
// try
//  ?
// ¿Error?
//  ?? NO ? continúa normalmente
//  ?? SÍ ? catch ? maneja el error
//
// ============================================================

// ============================================================
// 1. SINTAXIS BÁSICA
// ============================================================

try {
    // Código que puede producir un error
} catch (error) {
    // Manejo del error
}


// ============================================================
// 2. EJEMPLO
// ============================================================

try {

    console.log("Inicio");

    console.log(variableInexistente); // Error

    console.log("Fin"); // No se ejecuta

} catch (error) {

    console.log("Ocurrió un error.");
}

console.log("El programa continúa.");


// ============================================================
// 3. OBJETO DE ERROR
// ============================================================
//
// `catch` recibe un objeto con información sobre el error.
//
// Propiedades principales:
//
// error.name     ? tipo de error
// error.message  ? descripción
// error.stack    ? información útil para depuración
//
// ============================================================

try {

    variableInexistente;

} catch (error) {

    console.log(error.name);    // ReferenceError
    console.log(error.message); // variableInexistente is not defined
    console.log(error.stack);   // Pila de llamadas
}


// ============================================================
// 4. CATCH SIN VARIABLE
// ============================================================
//
// Si no necesitamos información del error,
// podemos omitir `error`.
//
// ============================================================

try {

    JSON.parse("{ JSON inválido }");

} catch {

    console.log("No se pudo procesar el JSON.");
}


// ============================================================
// 5. SOLO CAPTURA ERRORES DE EJECUCIÓN
// ============================================================
//
// `try...catch` funciona cuando el código es JavaScript válido.
//
// Error de ejecución ? SÍ puede capturarse.
//
// Error de sintaxis ? NO puede capturarse mediante
// el mismo `try...catch`, porque el código ni siquiera
// puede ser interpretado correctamente.
//
// ============================================================


// ============================================================
// 6. try...catch ES SÍNCRONO
// ============================================================
//
// Un error que ocurre posteriormente en `setTimeout`
// no será capturado por un `try...catch` externo.
//
// INCORRECTO:
//
// try {
//     setTimeout(() => {
//         throw new Error("Error");
//     }, 1000);
// } catch (error) {
//     // No captura el error
// }
//
// El `try...catch` ya terminó cuando se ejecuta el callback.
//
// La solución es colocar `try...catch` dentro del callback:
//
// ============================================================

setTimeout(() => {

    try {

        throw new Error("Error dentro de setTimeout");

    } catch (error) {

        console.log("Error capturado.");
    }

}, 1000);


// ============================================================
// 7. JSON.parse() ? CASO PRÁCTICO
// ============================================================
//
// `JSON.parse()` genera un error si recibe JSON inválido.
//
// ============================================================

const json = '{ "name": "John", "age": 30 }';

try {

    const user = JSON.parse(json);

    console.log(user.name); // John
    console.log(user.age);  // 30

} catch (error) {

    console.log("JSON inválido:", error.message);
}


// ============================================================
// 8. THROW ? CREAR NUESTROS PROPIOS ERRORES
// ============================================================
//
// `throw` permite generar un error manualmente.
//
// Sintaxis:
//
// throw error;
//
// Podemos utilizar constructores como:
//
// new Error()
// new SyntaxError()
// new ReferenceError()
// new TypeError()
//
// ============================================================

const jsonData = '{ "age": 30 }';

try {

    const user = JSON.parse(jsonData);

    // El JSON es válido, pero falta un dato necesario.
    if (!user.name) {

        throw new SyntaxError("Falta la propiedad name.");

    }

    console.log(user.name);

} catch (error) {

    console.log("Error:", error.message);
}


// ============================================================
// 9. DIFERENCIA IMPORTANTE
// ============================================================
//
// JSON VÁLIDO:
//
// '{ "age": 30 }'
//
// ? JSON.parse() funciona.
// ? Pero puede faltar información que nuestra aplicación
//   necesita.
//
// Podemos detectar ese problema y crear nuestro propio error:
//
// ============================================================

const json = '{ "age": 30 }';

try {

    const user = JSON.parse(json);

    if (!user.name) {
        throw new SyntaxError("Falta name.");
    }

} catch (error) {

    console.log(error.name);    // SyntaxError
    console.log(error.message); // Falta name.
}


// ============================================================
// RESUMEN
// ============================================================
//
// `try...catch`
// ? Captura errores de ejecución.
//
// `try`
// ? Contiene el código que puede fallar.
//
// `catch`
// ? Maneja el error.
//
// `error.name`
// ? Tipo de error.
//
// `error.message`
// ? Mensaje del error.
//
// `error.stack`
// ? Información para depuración.
//
// `throw`
// ? Permite generar nuestros propios errores.
//
// `new Error()`
// ? Crea un error.
//
// `new SyntaxError()`
// ? Crea un error de sintaxis.
//
// `try...catch` NO captura:
// ? Errores de sintaxis del propio código.
//
// `try...catch` es síncrono:
// ? Los errores de `setTimeout` deben capturarse
//   dentro de su callback.
//
// ============================================================
//
// IDEA CLAVE:
//
// try     ? intenta ejecutar
// catch   ? maneja el error
// throw   ? genera un error
//
// ============================================================

// ============================================================
// MANEJO DE ERRORES ? try...catch
// ============================================================

// ============================================================
// 1. RELANZAR ERRORES (RETHROW)
// ============================================================
//
// catch captura TODOS los errores ocurridos dentro de try.
//
// Por eso, si catch solo sabe manejar ciertos errores,
// debe volver a lanzar (rethrow) los demás:
//
//     if (error conocido) ? manejar
//     else ? throw error
//
// Esto evita ocultar errores inesperados.
// ============================================================


try {

    let user = JSON.parse('{ "age": 30 }');

    if (!user.name) {
        throw new SyntaxError("Incomplete data: no name");
    }

} catch (error) {

    if (error instanceof SyntaxError) {

        // Sabemos manejar este error
        console.log("JSON Error:", error.message);

    } else {

        // No sabemos manejarlo ? lo volvemos a lanzar
        throw error;
    }
}


// ============================================================
// 2. ¿CÓMO IDENTIFICAR EL TIPO DE ERROR?
// ============================================================
//
// Podemos utilizar:
//
// error instanceof TipoError
// error.name
// error.constructor.name
//
// Ejemplo:
//
// error instanceof SyntaxError
// error.name === "SyntaxError"
// ============================================================


try {

    JSON.parse("{ bad json }");

} catch (error) {

    console.log(error instanceof SyntaxError); // true
    console.log(error.name);                   // SyntaxError
}


// ============================================================
// 3. RELANZAMIENTO CON try...catch EXTERNO
// ============================================================
//
// Una función puede manejar los errores que conoce
// y dejar que otro try...catch maneje los demás.
// ============================================================


function readData() {

    try {

        // ...

        blabla(); // Error inesperado

    } catch (error) {

        if (!(error instanceof SyntaxError)) {
            throw error; // No sé manejarlo
        }
    }
}


try {

    readData();

} catch (error) {

    // Captura el error que readData volvió a lanzar
    console.log("Error externo:", error);
}


// ============================================================
// 4. finally
// ============================================================
//
// finally se ejecuta SIEMPRE:
//
// Sin error:
//     try ? finally
//
// Con error:
//     try ? catch ? finally
//
// Se utiliza para ejecutar código de limpieza o finalización.
// ============================================================


try {

    console.log("try");

} catch (error) {

    console.log("catch");

} finally {

    console.log("finally");
}


// ============================================================
// 5. finally SE EJECUTA INCLUSO CON return
// ============================================================


function test() {

    try {

        return 1;

    } finally {

        console.log("finally");
    }
}

console.log(test());

// Primero:
// finally
//
// Después:
// 1


// ============================================================
// 6. try...finally
// ============================================================
//
// También podemos usar try sin catch:
//
// try {
//     // código
// } finally {
//     // se ejecuta siempre
// }
//
// Útil cuando NO queremos manejar el error aquí,
// pero necesitamos asegurarnos de finalizar algo.
// ============================================================


function process() {

    try {

        // Operación

    } finally {

        // Limpieza / finalización
    }
}


// ============================================================
// 7. VARIABLES Y try...catch...finally
// ============================================================
//
// let y const tienen alcance de bloque.
//
// Si necesitamos una variable después de try/catch/finally,
// debemos declararla fuera.
// ============================================================


let result;

try {

    result = 100;

} catch (error) {

    result = 0;
}

console.log(result);


// ============================================================
// 8. CAPTURA GLOBAL
// ============================================================
//
// Es específica del entorno, NO forma parte del JavaScript
// principal.
//
// En navegadores podemos usar:
//
// window.onerror
//
// Sirve para detectar errores no controlados.
//
// Su objetivo normalmente es registrar/informar el error,
// no intentar recuperar la ejecución.
// ============================================================


window.onerror = function(message, url, line, col, error) {

    console.log("Error:", message);
    console.log("Ubicación:", line, col);
};


// ============================================================
// RESUMEN
// ============================================================
//
// RELANZAR
// --------
// catch debe manejar solo los errores que conoce.
//
//     if (error conocido) {
//         manejarlo
//     } else {
//         throw error;
//     }
//
//
// finally
// -------
// Se ejecuta siempre:
//
//     try ? finally
//     try ? catch ? finally
//
// Incluso si existe:
//     return
//     throw
//
//
//
// try...finally
// -------------
// Permite ejecutar código de finalización sin capturar
// el error.
//
//
// CAPTURA GLOBAL
// --------------
// window.onerror permite detectar errores no controlados
// en navegadores.
//
//
// REGLA CLAVE
// -----------
// No ocultes errores que no sabes manejar.
// Si no sabes qué hacer con un error ? vuelve a lanzarlo.
//
// ============================================================
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
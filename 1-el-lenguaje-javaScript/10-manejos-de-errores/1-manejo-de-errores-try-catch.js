/*
MANEJO DE ERRORES: try...catch

Normalmente, cuando ocurre un error, el script detiene su ejecución y el error
se muestra en la consola.

La estructura try...catch permite capturar determinados errores para que el
programa pueda manejarlos en lugar de detenerse inmediatamente.

Fuente de estudio: javascript.info
Contenido basado exclusivamente en el material proporcionado.
:chatgpt-content-reference{index="0"}
*/

/*
1. SINTAXIS DE try...catch

Primero se ejecuta el bloque try.

Si no ocurre ningún error:
- catch se ignora.
- La ejecución continúa después de la estructura.

Si ocurre un error:
- La ejecución de try se detiene inmediatamente.
- El control pasa a catch.
- La variable de catch recibe un objeto con información sobre el error.
*/

function ejemploSinError() {
  // Este ejemplo depende del navegador porque utiliza alert().

  try {
    alert("Inicio de try");
    alert("Final de try");
  } catch (err) {
    alert("Este bloque no se ejecuta");
  }
}

function ejemploConError() {
  // Este ejemplo depende del navegador porque utiliza alert().

  try {
    alert("Inicio de try");

    // Error intencional: la variable no existe.
    variableInexistente;

    // Esta línea nunca se alcanza.
    alert("Final de try");
  } catch (err) {
    alert("Ha ocurrido un error");
  }
}

/*
Flujo del segundo ejemplo:

1. Se entra en try.
2. Se ejecuta el primer alert().
3. variableInexistente produce un error.
4. try se detiene inmediatamente.
5. El control pasa a catch.
*/


/*
2. try...catch SOLO MANEJA ERRORES DE TIEMPO DE EJECUCIÓN

Para que try...catch pueda funcionar, el código debe ser JavaScript válido.

Los errores encontrados mientras el motor analiza el código no pueden ser
capturados desde ese mismo código, porque el motor todavía no puede ejecutarlo.

Por tanto, try...catch maneja errores producidos durante la ejecución de código
JavaScript sintácticamente válido. Estos errores también se llaman excepciones.

Un ejemplo como el siguiente no podría incluirse directamente porque convertiría
este archivo en JavaScript inválido:

try {
  {{{{{{{{
} catch (err) {
  // Nunca puede ejecutarse porque el código ni siquiera puede analizarse.
}
*/


/*
3. try...catch FUNCIONA DE FORMA SÍNCRONA

Si una función se programa para ejecutarse más tarde, el try...catch externo
ya habrá terminado cuando esa función finalmente se ejecute.

Por eso, un error producido posteriormente dentro de setTimeout no es capturado
por un try...catch que rodea solamente la llamada a setTimeout.
*/

function ejemploTryCatchFueraDeSetTimeout() {
  // Ejemplo intencionalmente problemático.
  // No ejecutar salvo que se quiera observar el error.

  try {
    setTimeout(function () {
      variableQueNoExiste;
    }, 1000);
  } catch (err) {
    console.log("Este catch no captura el error.");
  }
}

/*
Para capturar ese error, try...catch debe estar dentro de la función que se
ejecutará posteriormente.
*/

function ejemploTryCatchDentroDeSetTimeout() {
  setTimeout(function () {
    try {
      variableQueNoExiste;
    } catch {
      console.log("El error fue capturado dentro de setTimeout.");
    }
  }, 1000);
}


/*
4. OBJETO DE ERROR

Cuando ocurre un error, JavaScript crea un objeto con información sobre él y
lo entrega a catch.

Las propiedades principales de los errores integrados son:

name
Nombre del error, por ejemplo "ReferenceError".

message
Mensaje con información sobre el error.

stack
Propiedad no estándar, pero ampliamente disponible, que contiene información
sobre la secuencia de llamadas que condujo al error. Se utiliza para depuración.

Cuando el objeto de error se convierte a texto normalmente adopta una forma
similar a:

"name: message"
*/

function ejemploObjetoError() {
  try {
    variableNoDefinida;
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
    console.log(err);
  }
}


/*
5. ENLACE OPCIONAL DE catch

Si no necesitamos acceder al objeto de error, podemos omitir el parámetro.

Ambas formas son válidas:

catch (err) {
  // Se utiliza err.
}

catch {
  // No necesitamos información sobre el error.
}
*/

function ejemploCatchSinParametro() {
  try {
    variableNoDefinida;
  } catch {
    console.log("Ocurrió un error.");
  }
}


/*
6. USO DE try...catch CON JSON.parse()

JSON.parse(str) convierte una representación JSON en un valor JavaScript.

Si el JSON es válido, JSON.parse() funciona normalmente.
*/

function ejemploJsonValido() {
  const json = '{"name":"John", "age":30}';
  const usuario = JSON.parse(json);

  console.log(usuario.name);
  console.log(usuario.age);
}

/*
Si el JSON está mal formado, JSON.parse() genera un error.

try...catch permite manejar ese problema en lugar de dejar que el error detenga
inmediatamente el script.
*/

function ejemploJsonInvalido() {
  const json = "{ bad json }";

  try {
    const usuario = JSON.parse(json);
    console.log(usuario.name);
  } catch (err) {
    console.log(
      "Los datos contienen errores. Se podría intentar obtenerlos nuevamente."
    );

    console.log(err.name);
    console.log(err.message);
  }
}


/*
7. GENERAR NUESTROS PROPIOS ERRORES CON throw

Un dato puede ser sintácticamente válido y aun así ser inválido para nuestro
programa.

Por ejemplo:

{ "age": 30 }

es JSON válido, pero puede considerarse incompleto si necesitamos obligatoriamente
una propiedad name.

El operador throw permite generar un error manualmente.

Sintaxis conceptual:

throw <objeto de error>;

Técnicamente se puede lanzar cualquier valor, incluso un número o una cadena.
Sin embargo, es preferible utilizar objetos de error, especialmente objetos que
dispongan de name y message.
*/


/*
8. CONSTRUCTORES DE ERRORES

JavaScript proporciona constructores integrados como:

Error
SyntaxError
ReferenceError
TypeError

Podemos utilizarlos para crear objetos de error.
*/

function ejemploCrearError() {
  const error = new Error("Things happen o_O");

  console.log(error.name);
  console.log(error.message);
}

function ejemploSyntaxError() {
  const error = new SyntaxError("Datos incompletos");

  console.log(error.name);
  console.log(error.message);
}

/*
Para los errores integrados, name corresponde al nombre del constructor y
message se obtiene del argumento proporcionado al constructor.
*/


/*
9. JSON.parse() PRODUCE SyntaxError CUANDO EL JSON ES INVÁLIDO
*/

function ejemploErrorDeJsonParse() {
  try {
    JSON.parse("{ bad json o_O }");
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
  }
}


/*
10. VALIDACIÓN MANUAL CON throw

Podemos lanzar manualmente un error cuando los datos son sintácticamente
correctos pero no cumplen los requisitos esperados.

El throw detiene inmediatamente la ejecución del bloque try y transfiere el
control a catch.
*/

function ejemploValidacionConThrow() {
  const json = '{ "age": 30 }';

  try {
    const usuario = JSON.parse(json);

    if (!usuario.name) {
      throw new SyntaxError("Incomplete data: no name");
    }

    console.log(usuario.name);
  } catch (err) {
    console.log("JSON Error: " + err.message);
  }
}

/*
Flujo:

JSON.parse()
-> validación de usuario.name
-> throw SyntaxError
-> catch
*/


/*
11. UN SOLO catch PUEDE RECIBIR DIFERENTES TIPOS DE ERROR

catch recibe cualquier error ocurrido dentro de try.

Esto puede convertirse en un problema si catch fue diseñado para manejar un
tipo específico de error.

Por ejemplo, podríamos querer manejar solamente problemas con los datos, pero
también podría producirse accidentalmente un ReferenceError debido a un error
de programación.

No deberíamos tratar todos los errores como si fueran el mismo problema.
*/


/*
12. RELANZAMIENTO DE ERRORES

Una estrategia importante consiste en:

1. Capturar el error.
2. Examinar qué tipo de error es.
3. Manejar únicamente los errores conocidos.
4. Volver a lanzar los errores desconocidos.

Para volver a lanzar un error se utiliza:

throw err;

El operador instanceof puede utilizarse para comprobar el tipo de error.
*/

function ejemploInstanceof() {
  try {
    variableNoDefinida;
  } catch (err) {
    if (err instanceof ReferenceError) {
      console.log("Se produjo un ReferenceError.");
    }
  }
}


/*
13. MANEJAR SyntaxError Y RELANZAR LOS DEMÁS

En este ejemplo, catch sabe manejar SyntaxError.

Si recibe cualquier otro tipo de error, lo vuelve a lanzar.
*/

function ejemploRelanzamiento() {
  const json = '{ "age": 30 }';

  try {
    const usuario = JSON.parse(json);

    if (!usuario.name) {
      throw new SyntaxError("Incomplete data: no name");
    }

    // Si se alcanzara una operación que produjera otro tipo de error,
    // catch debería relanzarlo.

    console.log(usuario.name);
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.log("JSON Error: " + err.message);
    } else {
      throw err;
    }
  }
}


/*
14. try...catch ANIDADO Y RELANZAMIENTO

Un error relanzado sale del try...catch actual.

Después puede:

- Ser capturado por otro try...catch externo.
- Detener la ejecución si ningún manejador lo captura.

Esto permite que una función gestione únicamente los errores que conoce y deje
los demás para niveles superiores.
*/

function leerDatos() {
  try {
    variableNoDefinida;
  } catch (err) {
    if (!(err instanceof SyntaxError)) {
      throw err;
    }
  }
}

function ejemploCatchExterno() {
  try {
    leerDatos();
  } catch (err) {
    console.log("El catch externo recibió: " + err);
  }
}

/*
Flujo:

leerDatos()
-> ocurre ReferenceError
-> catch interno
-> no es SyntaxError
-> throw err
-> catch externo
*/


/*
15. try...catch...finally

La estructura puede incluir un bloque finally.

finally se ejecuta siempre:

- Después de try si no hubo errores.
- Después de catch si hubo errores.

Sintaxis:

try {
  // Código.
} catch (err) {
  // Manejo del error.
} finally {
  // Se ejecuta siempre.
}
*/

function ejemploFinallySinError() {
  try {
    console.log("try");
  } catch (err) {
    console.log("catch");
  } finally {
    console.log("finally");
  }
}

// Flujo: try -> finally.

function ejemploFinallyConError() {
  try {
    console.log("try");
    variableNoDefinida;
  } catch (err) {
    console.log("catch");
  } finally {
    console.log("finally");
  }
}

// Flujo: try -> error -> catch -> finally.


/*
16. finally PARA FINALIZAR OPERACIONES

finally resulta útil cuando iniciamos una operación y necesitamos finalizarla
sin importar si terminó correctamente o produjo un error.

El material utiliza como ejemplo la medición del tiempo de ejecución de una
función de Fibonacci.

La función genera un error si recibe un número negativo o no entero.
*/

function fibonacci(n) {
  if (n < 0 || Math.trunc(n) !== n) {
    throw new Error("Must not be negative, and also an integer.");
  }

  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

function ejemploMedicionConFinally(numero) {
  let diferencia;
  let resultado;

  const inicio = Date.now();

  try {
    resultado = fibonacci(numero);
  } catch (err) {
    resultado = 0;
  } finally {
    diferencia = Date.now() - inicio;
  }

  console.log(resultado || "error occurred");
  console.log(`execution took ${diferencia}ms`);
}

/*
Aunque fibonacci() genere un error, finally calcula igualmente el tiempo
transcurrido.
*/


/*
17. finally SE EJECUTA INCLUSO CON return O throw

Una función puede abandonar try mediante return o throw.

Aun así, finally se ejecuta antes de que el control salga de la estructura.
*/

function ejemploFinallyConReturn() {
  try {
    return 1;
  } catch (err) {
    console.log(err);
  } finally {
    console.log("finally se ejecuta antes de devolver el resultado");
  }
}


/*
18. ALCANCE DE VARIABLES EN try...catch...finally

Las variables declaradas con let o const dentro de un bloque solamente son
visibles dentro de ese bloque.

Por eso, si una variable debe utilizarse después de try...catch...finally,
puede ser necesario declararla antes de la estructura.
*/

function ejemploAlcance() {
  let resultado;

  try {
    resultado = "Operación completada";
  } catch (err) {
    resultado = "Ocurrió un error";
  }

  console.log(resultado);
}


/*
19. try...finally SIN catch

También puede utilizarse try...finally sin catch.

Esta forma resulta útil cuando no queremos manejar el error en ese lugar, pero
sí necesitamos ejecutar una operación de finalización.

El error continúa propagándose después de ejecutar finally.
*/

function ejemploTryFinally() {
  try {
    console.log("Inicio de una operación");

    // Aquí podría producirse un error.
  } finally {
    console.log("Finalización de la operación");
  }
}


/*
20. CAPTURA GLOBAL DE ERRORES

La captura global depende del entorno y no forma parte del núcleo principal de
JavaScript.

Los entornos pueden proporcionar mecanismos para reaccionar ante errores que
no fueron capturados mediante try...catch.

En el navegador puede utilizarse window.onerror.

Su forma general es:

window.onerror = function (message, url, line, col, error) {
  // ...
};

Parámetros:

message
Mensaje del error.

url
URL del script donde ocurrió.

line
Número de línea.

col
Número de columna.

error
Objeto de error.

El objetivo habitual de un manejador global no es recuperar la ejecución del
programa, sino registrar información sobre errores no controlados.
*/

function configurarManejadorGlobalDeErrores() {
  // Este ejemplo depende del navegador.

  window.onerror = function (message, url, line, col, error) {
    console.log(`${message}\nAt ${line}:${col} of ${url}`);
    console.log(error);
  };
}

/*
El material también menciona que Node.js proporciona:

process.on("uncaughtException")

Como la captura global depende del entorno, no existe una única solución
universal perteneciente al núcleo del lenguaje.
*/


/*
RESUMEN

1. try...catch permite capturar errores producidos durante la ejecución.

2. Si try termina sin errores, catch se omite.

3. Si ocurre un error dentro de try, su ejecución se detiene y el control pasa
   a catch.

4. try...catch solamente puede manejar errores producidos en JavaScript
   sintácticamente válido.

5. try...catch funciona de forma síncrona. Para capturar un error ocurrido
   posteriormente dentro de una función programada, el try...catch debe estar
   dentro de esa función.

6. Los errores integrados proporcionan principalmente:
   - name
   - message
   - stack, disponible en muchos entornos aunque no sea estándar.

7. Si no necesitamos el objeto de error podemos escribir:

   catch {
     // ...
   }

8. JSON.parse() genera un error cuando recibe JSON inválido.

9. throw permite generar errores manualmente.

10. JavaScript proporciona constructores de error como:
    Error
    SyntaxError
    ReferenceError
    TypeError

11. Un catch recibe todos los errores producidos dentro de su try.

12. Un catch debería manejar los errores que conoce y relanzar mediante
    throw err aquellos que no sabe manejar.

13. instanceof permite comprobar el tipo de un objeto de error.

14. Un error relanzado puede ser capturado por un try...catch externo.

15. finally se ejecuta tanto si hubo error como si no.

16. finally también se ejecuta cuando try termina mediante return o throw.

17. try...finally puede utilizarse cuando necesitamos finalizar una operación
    pero no queremos manejar el error localmente.

18. Los mecanismos globales de captura de errores dependen del entorno.
*/


/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.
Algunos ejemplos producen errores intencionales o dependen del navegador.
*/

// ejemploSinError();
// ejemploConError();

// ejemploTryCatchFueraDeSetTimeout();
// ejemploTryCatchDentroDeSetTimeout();

// ejemploObjetoError();
// ejemploCatchSinParametro();

// ejemploJsonValido();
// ejemploJsonInvalido();

// ejemploCrearError();
// ejemploSyntaxError();
// ejemploErrorDeJsonParse();
// ejemploValidacionConThrow();

// ejemploInstanceof();
// ejemploRelanzamiento();
// ejemploCatchExterno();

// ejemploFinallySinError();
// ejemploFinallyConError();
// console.log(ejemploFinallyConReturn());

// ejemploMedicionConFinally(10);
// ejemploMedicionConFinally(-1);

// ejemploAlcance();
// ejemploTryFinally();

// configurarManejadorGlobalDeErrores();
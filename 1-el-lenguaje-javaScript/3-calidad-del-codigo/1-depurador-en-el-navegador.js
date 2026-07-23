/*==============================================================================
    DEPURACIÓN (DEBUGGING) EN EL NAVEGADOR
==============================================================================*/

/*
La depuración (Debugging) es el proceso de encontrar, analizar y corregir
errores dentro de un programa.

En lugar de intentar adivinar dónde está el problema, utilizamos herramientas
que nos permiten detener la ejecución del código, inspeccionar variables y
ejecutar el programa paso a paso.

Todos los navegadores modernos (Chrome, Edge, Firefox, etc.) incluyen
herramientas de desarrollo (Developer Tools o DevTools) para facilitar
esta tarea.

En este capítulo se utiliza Google Chrome como ejemplo, pero las mismas
herramientas existen en la mayoría de los navegadores.
*/

/*==============================================================================
    ABRIR LAS HERRAMIENTAS DE DESARROLLO
==============================================================================*/

/*
Podemos abrir DevTools de varias formas:

• F12

• Ctrl + Shift + I (Windows / Linux)

Una vez abiertas:

1. Selecciona la pestaña "Sources" (Fuentes).

Desde ahí podremos visualizar y depurar el código JavaScript.
*/

/*==============================================================================
    PANEL "SOURCES"
==============================================================================*/

/*
El panel Sources está dividido principalmente en tres secciones.

1. File Navigator

Muestra todos los archivos cargados por la página:

- HTML
- CSS
- JavaScript
- Imágenes
- Otros recursos

------------------------------------------------------------

2. Code Editor

Muestra el código fuente del archivo seleccionado.

Aquí podremos colocar breakpoints y recorrer el código.

------------------------------------------------------------

3. Debugger Panel

Contiene todas las herramientas para depurar:

- Variables
- Scope
- Call Stack
- Watch
- Breakpoints
- Controles de ejecución
*/

/*==============================================================================
    CONSOLA (CONSOLE)
==============================================================================*/

/*
Podemos abrir la consola presionando:

Esc

o seleccionando la pestaña "Console".

La consola permite:

- Ejecutar código JavaScript.
- Probar expresiones.
- Ver mensajes de console.log().
- Inspeccionar variables.
*/

console.log(1 + 2); // 3

/*
También podemos escribir directamente en la consola:

1 + 2

Resultado:

3
*/

/*==============================================================================
    BREAKPOINTS
==============================================================================*/

/*
Un Breakpoint (punto de interrupción) es un lugar del código donde el
depurador detiene automáticamente la ejecución.

Mientras el programa está detenido podemos:

- Ver variables.
- Inspeccionar objetos.
- Ejecutar código desde la consola.
- Avanzar línea por línea.

Para crear un breakpoint:

1. Abrir Sources.

2. Hacer clic sobre el número de línea.

La línea aparecerá marcada indicando que el breakpoint fue creado.
*/

/*==============================================================================
    BREAKPOINTS CONDICIONALES
==============================================================================*/

/*
También es posible crear breakpoints condicionales.

Para ello:

Click derecho sobre el número de línea.

↓

"Add conditional breakpoint"

↓

Escribir una condición.

Ejemplo:

i === 10

El programa solo se detendrá cuando esa condición sea verdadera.

Son muy útiles cuando un bucle tiene cientos o miles de iteraciones.
*/

/*==============================================================================
    LA SENTENCIA "debugger"
==============================================================================*/

/*
JavaScript posee una instrucción especial llamada debugger.

Cuando el navegador encuentra esta instrucción y las DevTools
están abiertas, la ejecución se detiene automáticamente.
*/

function hello(name) {

    let message = `Hola ${name}`;

    debugger;

    console.log(message);

}

/*
Si las herramientas del navegador están cerradas, el navegador
simplemente ignora debugger.
*/

/*==============================================================================
    INSPECCIONAR EL ESTADO DEL PROGRAMA
==============================================================================*/

/*
Cuando la ejecución se detiene en un breakpoint podemos inspeccionar
el estado actual del programa.

Las herramientas más importantes son:
*/

/*------------------------------------------------------------------------------
    WATCH
------------------------------------------------------------------------------*/

/*
Permite observar el valor de cualquier expresión.

Ejemplos:

count

user.name

total * price

Su valor se actualiza automáticamente mientras avanzamos
por el programa.
*/

/*------------------------------------------------------------------------------
    CALL STACK
------------------------------------------------------------------------------*/

/*
Muestra la pila de llamadas (Call Stack).

Es decir, la secuencia de funciones que fueron llamadas hasta
llegar al punto actual.

Ejemplo:

main()

↓

login()

↓

validateUser()

↓

checkPassword()

Si ocurre un error podremos saber exactamente qué funciones
fueron ejecutadas antes del problema.
*/

/*------------------------------------------------------------------------------
    SCOPE
------------------------------------------------------------------------------*/

/*
Muestra todas las variables disponibles en ese momento.

Generalmente veremos:

Local

Variables de la función actual.

Global

Variables globales.

Más adelante también veremos "this" y otros contextos.
*/

/*==============================================================================
    CONTROLES DEL DEBUGGER
==============================================================================*/

/*
Mientras el programa está detenido aparecen varios botones
para controlar la ejecución.
*/

/*------------------------------------------------------------------------------
    ▶ Resume (F8)
------------------------------------------------------------------------------*/

/*
Continúa la ejecución normalmente.

Si existe otro breakpoint, el programa volverá a detenerse allí.

Si no existen más breakpoints, terminará la ejecución.
*/

/*------------------------------------------------------------------------------
    Step (F9)
------------------------------------------------------------------------------*/

/*
Ejecuta únicamente la siguiente instrucción.

Permite recorrer el programa línea por línea.
*/

/*------------------------------------------------------------------------------
    Step Over (F10)
------------------------------------------------------------------------------*/

/*
Ejecuta la siguiente línea.

Si esa línea llama a otra función, la ejecuta completamente
sin entrar dentro de ella.

Muy útil cuando ya sabemos que esa función funciona correctamente.
*/

/*------------------------------------------------------------------------------
    Step Into (F11)
------------------------------------------------------------------------------*/

/*
Entra dentro de la función llamada.

Ejemplo:

calculate();

Con Step Into podremos ver línea por línea qué sucede
dentro de calculate().
*/

/*------------------------------------------------------------------------------
    Step Out (Shift + F11)
------------------------------------------------------------------------------*/

/*
Sale inmediatamente de la función actual.

Continúa ejecutándola hasta terminar y vuelve a la función
desde donde fue llamada.

Muy útil cuando entramos por accidente a una función.
*/

/*------------------------------------------------------------------------------
    ENABLE / DISABLE BREAKPOINTS
------------------------------------------------------------------------------*/

/*
Permite activar o desactivar todos los breakpoints sin eliminarlos.
*/

/*------------------------------------------------------------------------------
    PAUSE ON EXCEPTIONS
------------------------------------------------------------------------------*/

/*
Hace que el navegador detenga automáticamente la ejecución cuando
ocurre un error (Exception).

Es extremadamente útil para localizar errores difíciles de encontrar.
*/

/*==============================================================================
    CONTINUE TO HERE
==============================================================================*/

/*
Click derecho sobre una línea.

↓

Continue to here

El programa continuará automáticamente hasta esa línea sin necesidad
de crear un breakpoint permanente.
*/

/*==============================================================================
    LOGGING (console.log)
==============================================================================*/

/*
Muchas veces no necesitamos usar el debugger.

Simplemente imprimimos información en la consola utilizando
console.log().
*/

let user = "Juan";

console.log(user);

/*
También podemos imprimir varias variables.
*/

let age = 25;

console.log(user, age);

/*
Ejemplo dentro de un bucle:
*/

for (let i = 0; i < 5; i++) {

    console.log("Valor:", i);

}

/*
Salida:

Valor: 0
Valor: 1
Valor: 2
Valor: 3
Valor: 4
*/

/*
Los mensajes enviados mediante console.log() solo aparecen
en la consola del navegador.

El usuario normal no los ve.
*/

/*==============================================================================
    ¿CUÁNDO USAR console.log() Y CUÁNDO EL DEBUGGER?
==============================================================================*/

/*
Usa console.log() cuando:

- Quieras imprimir rápidamente una variable.

- Verificar el flujo del programa.

- Registrar información simple.

------------------------------------------------------------

Usa el Debugger cuando:

- Necesites inspeccionar muchas variables.

- Quieras ejecutar el código paso a paso.

- Exista un error difícil de localizar.

- Quieras analizar el Call Stack.

- Necesites comprender exactamente qué ocurre durante
la ejecución.
*/

/*==============================================================================
    FORMAS DE DETENER LA EJECUCIÓN
==============================================================================*/

/*
JavaScript puede detener la ejecución de tres maneras principales.

1.

Mediante un Breakpoint.

------------------------------------------------------------

2.

Mediante la instrucción:

debugger;

------------------------------------------------------------

3.

Cuando ocurre un error y está activada la opción:

Pause on Exceptions.
*/

/*==============================================================================
    BUENAS PRÁCTICAS
==============================================================================*/

/*
- Usa breakpoints antes de llenar el código de console.log().

- Elimina o comenta los console.log() innecesarios antes de
entregar un proyecto.

- Aprende a utilizar Step Into y Step Over; son las herramientas
más utilizadas durante la depuración.

- Revisa siempre el Call Stack cuando ocurra un error.

- Usa Watch para monitorear variables importantes.

- Activa "Pause on Exceptions" cuando un error sea difícil
de encontrar.
*/
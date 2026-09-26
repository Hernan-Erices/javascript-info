/*
PROGRAMACIÓN: setTimeout Y setInterval

JavaScript permite programar la ejecución de una función para un momento posterior.

Existen dos métodos principales:

- setTimeout: ejecuta una función una sola vez después de un retraso.
- setInterval: ejecuta una función repetidamente después de un intervalo determinado.

Estos métodos no forman parte de la especificación de JavaScript, pero están disponibles
en la mayoría de los entornos, incluidos los navegadores y Node.js.
*/

/*
1. setTimeout

Sintaxis:

setTimeout(func, delay, arg1, arg2, ...)

Parámetros:

- func: función que se ejecutará.
- delay: retraso en milisegundos antes de ejecutar la función. Por defecto es 0.
- arg1, arg2, ...: argumentos que serán enviados a la función.

Aunque históricamente se puede pasar una cadena de código en lugar de una función,
no se recomienda hacerlo.
*/

function ejemploSetTimeoutBasico() {
  function saludar() {
    alert("Hola");
  }

  // La función se ejecutará aproximadamente después de 1 segundo.
  setTimeout(saludar, 1000);
}

/*
Es importante pasar la referencia de la función, no ejecutarla inmediatamente.

Correcto:

setTimeout(saludar, 1000);

Incorrecto:

setTimeout(saludar(), 1000);

En el segundo caso, saludar() se ejecuta inmediatamente y su valor de retorno
se pasa a setTimeout. Si la función no devuelve nada, ese valor será undefined.
*/

function ejemploSetTimeoutConArgumentos() {
  function saludar(frase, persona) {
    alert(frase + ", " + persona);
  }

  setTimeout(saludar, 1000, "Hola", "John");
}

/*
También podría pasarse una cadena:

setTimeout("alert('Hola')", 1000);

Sin embargo, se recomienda utilizar una función, por ejemplo:

setTimeout(() => alert("Hola"), 1000);
*/

function ejemploFuncionFlecha() {
  setTimeout(() => alert("Hola"), 1000);
}

/*
2. CANCELAR setTimeout

setTimeout devuelve un identificador de temporizador.

Ese identificador puede utilizarse con clearTimeout para impedir que la función
programada llegue a ejecutarse.

Sintaxis:

const timerId = setTimeout(...);
clearTimeout(timerId);

Después de cancelar el temporizador, su identificador no cambia ni se convierte
automáticamente en null.
*/

function ejemploCancelarTimeout() {
  const timerId = setTimeout(() => {
    alert("Esto nunca debería mostrarse");
  }, 1000);

  clearTimeout(timerId);
}

/*
En un navegador, el identificador del temporizador suele ser un número.

En otros entornos puede tener otra forma. Por ejemplo, Node.js devuelve un objeto
temporizador con métodos adicionales.

No existe una especificación universal de JavaScript que determine el tipo exacto
del identificador.
*/

/*
3. setInterval

setInterval utiliza prácticamente la misma sintaxis que setTimeout:

setInterval(func, delay, arg1, arg2, ...)

La diferencia es que la función se ejecuta repetidamente después del intervalo
especificado.

Para detener las futuras ejecuciones se utiliza:

clearInterval(timerId);
*/

function ejemploSetInterval() {
  const timerId = setInterval(() => {
    alert("tick");
  }, 2000);

  setTimeout(() => {
    clearInterval(timerId);
    alert("stop");
  }, 5000);
}

/*
En el ejemplo anterior:

1. "tick" se programa repetidamente cada 2 segundos.
2. Después de aproximadamente 5 segundos se ejecuta el setTimeout.
3. clearInterval detiene las futuras llamadas.
4. Se muestra "stop".

En la mayoría de los navegadores, el temporizador interno continúa contando mientras
se muestran ventanas como alert, confirm o prompt.

Por eso, si una alerta permanece abierta durante suficiente tiempo, la siguiente
ejecución del intervalo puede producirse inmediatamente después de cerrarla.
*/

/*
4. setTimeout ANIDADO

Existen dos formas de ejecutar una tarea regularmente:

- setInterval.
- Programar un nuevo setTimeout al finalizar cada ejecución.

El segundo enfoque se denomina setTimeout anidado.
*/

function ejemploTimeoutAnidado() {
  let timerId;

  timerId = setTimeout(function ejecutar() {
    alert("tick");

    timerId = setTimeout(ejecutar, 2000);
  }, 2000);
}

/*
La siguiente llamada se programa al final de la ejecución actual.

Esto hace que setTimeout anidado sea más flexible que setInterval, porque el retraso
de la siguiente ejecución puede cambiar según el resultado de la ejecución actual.
*/

/*
Por ejemplo, un servicio podría comenzar realizando solicitudes cada 5 segundos.

Si el servidor se encuentra sobrecargado, el retraso podría aumentarse progresivamente:

5 segundos -> 10 segundos -> 20 segundos -> 40 segundos

El contenido original lo representa con el siguiente pseudocódigo:

let delay = 5000;

let timerId = setTimeout(function request() {
  ...enviar solicitud...

  if (la solicitud falló por sobrecarga del servidor) {
    delay *= 2;
  }

  timerId = setTimeout(request, delay);
}, delay);

La próxima ejecución puede decidirse usando el resultado de la ejecución anterior.
*/

/*
5. DIFERENCIA DE TIEMPO ENTRE setInterval Y setTimeout ANIDADO

Con setInterval, el tiempo empleado por la función forma parte del intervalo.

Conceptualmente:

setInterval(function () {
  funcion();
}, 100);

El planificador intenta ejecutar funcion() cada 100 ms.

Si funcion() consume una parte importante de esos 100 ms, el tiempo real entre el
final de una ejecución y el comienzo de la siguiente será menor que 100 ms.

Si la función tarda más que el intervalo configurado, el motor espera a que termine
y puede comenzar la siguiente ejecución inmediatamente.
*/

function ejemploIntervaloRegular() {
  let contador = 1;

  const timerId = setInterval(() => {
    funcionProgramada(contador++);
  }, 100);

  // Detener manualmente cuando ya no sea necesario.
  return timerId;
}

/*
Con setTimeout anidado, el nuevo temporizador se crea después de finalizar
la ejecución actual.
*/

function ejemploIntervaloConTimeoutAnidado() {
  let contador = 1;

  setTimeout(function ejecutar() {
    funcionProgramada(contador++);

    setTimeout(ejecutar, 100);
  }, 100);
}

/*
El setTimeout anidado garantiza un retraso mínimo entre el final de una ejecución
y el comienzo de la siguiente.

En el ejemplo anterior:

1. Se ejecuta funcionProgramada().
2. La función termina.
3. Se programa otro setTimeout de 100 ms.
4. Solo después de ese retraso puede comenzar la siguiente ejecución.

Con setInterval, en cambio, el tiempo de ejecución de la función puede consumir
parte o incluso todo el intervalo.
*/

// Función auxiliar utilizada únicamente por los ejemplos anteriores.
function funcionProgramada(numero) {
  console.log(numero);
}

/*
6. TEMPORIZADORES Y RECOLECCIÓN DE BASURA

Cuando una función se pasa a setTimeout o setInterval, el planificador mantiene
internamente una referencia a ella.

Mientras esa referencia exista, la función no puede ser eliminada por el recolector
de basura.

Por ejemplo:

setTimeout(function () {
  // ...
}, 100);

La función permanece en memoria hasta que el planificador la ejecuta.

Con setInterval, la función permanece referenciada mientras el intervalo continúe
activo, es decir, hasta que se llame a clearInterval.
*/

/*
Una función también puede mantener referencias a su entorno léxico externo.

Por lo tanto, mientras la función programada siga existiendo, las variables externas
que utiliza también pueden permanecer en memoria.

Esas variables pueden consumir más memoria que la propia función.

Cuando una tarea programada ya no sea necesaria, conviene cancelarla.
*/

function ejemploCancelarIntervalo() {
  const datos = "Variable externa utilizada por la función";

  const timerId = setInterval(() => {
    console.log(datos);
  }, 1000);

  clearInterval(timerId);
}

/*
7. setTimeout CON RETRASO CERO

Estas dos formas son equivalentes:

setTimeout(func, 0);
setTimeout(func);

No significan que func se ejecute inmediatamente.

La función queda programada para ejecutarse tan pronto como sea posible,
pero solamente después de que termine el script que se está ejecutando actualmente.
*/

function ejemploTimeoutCero() {
  setTimeout(() => {
    alert("Mundo");
  });

  alert("Hola");
}

/*
Flujo:

1. Se programa la función que muestra "Mundo".
2. El script actual continúa.
3. Se muestra "Hola".
4. Finaliza el script actual.
5. El planificador puede ejecutar la función pendiente.
6. Se muestra "Mundo".

Resultado:

Hola
Mundo
*/

/*
8. EL RETRASO CERO NO SIEMPRE ES REALMENTE CERO EN EL NAVEGADOR

Los navegadores limitan la frecuencia de los temporizadores anidados.

Después de cinco temporizadores anidados, el intervalo mínimo pasa a ser
aproximadamente 4 ms.

El comportamiento puede observarse reprogramando continuamente un setTimeout
sin indicar retraso.
*/

function ejemploTemporizadoresAnidadosSinRetraso() {
  const inicio = Date.now();
  const tiempos = [];

  setTimeout(function ejecutar() {
    tiempos.push(Date.now() - inicio);

    if (inicio + 100 < Date.now()) {
      alert(tiempos);
    } else {
      setTimeout(ejecutar);
    }
  });
}

/*
Una salida posible puede mostrar valores similares a:

1, 1, 1, 1, 9, 15, 20, 24, 30, ...

Las primeras ejecuciones pueden realizarse muy rápidamente.

Después entra en juego la limitación de aproximadamente 4 ms para temporizadores
anidados.

Una limitación semejante se aplica a setInterval cuando se utiliza sin retraso.

Esta restricción es específica del navegador y existe por razones históricas.
En JavaScript del lado del servidor no existe esta misma limitación.
*/

/*
9. LOS TEMPORIZADORES NO GARANTIZAN UN RETRASO EXACTO

setTimeout y setInterval establecen cuándo una función puede ejecutarse,
pero no garantizan que se ejecute exactamente después del tiempo solicitado.

El retraso real puede aumentar.

Entre las causas mencionadas se encuentran:

- La CPU está sobrecargada.
- La pestaña del navegador está en segundo plano.
- El portátil está utilizando el modo de ahorro de batería.

Dependiendo del navegador, del sistema operativo y de su configuración de rendimiento,
el retraso mínimo puede aumentar considerablemente.
*/

/*
RESUMEN

1. setTimeout(func, delay, ...args) ejecuta una función una vez después de un retraso.

2. setInterval(func, delay, ...args) ejecuta una función repetidamente.

3. setTimeout y setInterval devuelven un identificador de temporizador.

4. clearTimeout(timerId) cancela un setTimeout.

5. clearInterval(timerId) cancela un setInterval.

6. Debe pasarse una referencia a la función:

   setTimeout(funcion, 1000);

   No debe ejecutarse al pasarla:

   setTimeout(funcion(), 1000);

7. setTimeout anidado es una alternativa más flexible a setInterval porque permite
   calcular el retraso de la siguiente ejecución según el resultado de la actual.

8. setInterval cuenta el tiempo de ejecución de la función como parte del intervalo.

9. setTimeout anidado permite garantizar un retraso mínimo entre el final de una
   ejecución y el comienzo de la siguiente.

10. Una función programada permanece referenciada por el planificador y no puede ser
    recolectada mientras siga siendo necesaria para el temporizador.

11. setTimeout(func, 0) y setTimeout(func) programan la función para ejecutarse
    después de que termine el script actual.

12. En el navegador, después de varios temporizadores anidados aparece un retraso
    mínimo de aproximadamente 4 ms.

13. Ningún temporizador garantiza que la función se ejecute exactamente después
    del retraso solicitado.
*/

/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos que utilizan alert dependen de un entorno de navegador.
*/

// ejemploSetTimeoutBasico();
// ejemploSetTimeoutConArgumentos();
// ejemploFuncionFlecha();
// ejemploCancelarTimeout();
// ejemploSetInterval();
// ejemploTimeoutAnidado();
// ejemploIntervaloRegular();
// ejemploIntervaloConTimeoutAnidado();
// ejemploCancelarIntervalo();
// ejemploTimeoutCero();
// ejemploTemporizadoresAnidadosSinRetraso();
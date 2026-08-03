// ============================================================================
// FECHA Y HORA (DATE)
// ============================================================================

/*
El objeto Date es una clase incorporada de JavaScript que permite trabajar con
fechas y horas.

Con Date podemos:

- Obtener la fecha y hora actual.
- Crear fechas específicas.
- Modificar componentes de una fecha.
- Comparar fechas.
- Medir intervalos de tiempo.
- Obtener timestamps para almacenar o transmitir fechas.

La fecha internamente se almacena como la cantidad de milisegundos transcurridos
desde el 1 de enero de 1970 a las 00:00:00 UTC (Unix Epoch).
*/


// ============================================================================
// CREAR OBJETOS DATE
// ============================================================================

/*
Existen varias formas de crear un objeto Date.
*/


// ============================================================================
// 1. new Date()
// ============================================================================

/*
Sin argumentos.

Crea un objeto con la fecha y hora actuales según el reloj del sistema.
*/

let now = new Date();

alert(now);

// Ejemplo:
// Mon Aug 03 2026 15:30:45 GMT-0400


// ============================================================================
// 2. new Date(milliseconds)
// ============================================================================

/*
Permite crear una fecha a partir de un timestamp.

Un timestamp representa la cantidad de milisegundos transcurridos desde:

01/01/1970 00:00:00 UTC

1 segundo = 1000 ms
1 minuto = 60 000 ms
1 hora = 3 600 000 ms
1 día = 86 400 000 ms
*/


// Inicio del tiempo Unix

let epoch = new Date(0);

alert(epoch);
// 01/01/1970 UTC


// Un día después

let nextDay = new Date(24 * 60 * 60 * 1000);

alert(nextDay);
// 02/01/1970 UTC


/*
También pueden utilizarse timestamps negativos para representar fechas
anteriores a 1970.
*/

let previousDay = new Date(-24 * 60 * 60 * 1000);

alert(previousDay);
// 31/12/1969 UTC


/*
Un timestamp es una representación numérica muy eficiente de una fecha.

Podemos:

• Crear un Date desde un timestamp.
• Obtener el timestamp de un Date mediante getTime().
*/


// ============================================================================
// 3. new Date(dateString)
// ============================================================================

/*
Si se pasa una cadena, JavaScript intenta interpretarla automáticamente.

El formato recomendado es ISO 8601:

AAAA-MM-DD
*/

let date = new Date("2017-01-26");

alert(date);


/*
Como la hora no está especificada, JavaScript asume las 00:00:00 UTC.

Después convierte esa hora a la zona horaria local del usuario.

Por eso el resultado puede cambiar dependiendo del país donde se ejecute el
programa.
*/


// ============================================================================
// 4. new Date(año, mes, día, horas, minutos, segundos, milisegundos)
// ============================================================================

/*
Permite construir una fecha indicando cada componente por separado.

Sintaxis:

new Date(
    año,
    mes,
    día,
    horas,
    minutos,
    segundos,
    milisegundos
)

Solo los dos primeros parámetros son obligatorios.
*/


// Año completo (siempre usar 4 dígitos)

new Date(2011, 0);


// Todos los componentes

new Date(2011, 0, 1, 0, 0, 0, 0);


// Equivalente

new Date(2011, 0, 1);


/*
Detalles importantes:

• El año debe escribirse con 4 dígitos.

• Los meses comienzan en 0.

0 -> Enero
1 -> Febrero
2 -> Marzo
...
11 -> Diciembre

- El día del mes comienza en 1.

- Si no se especifican horas, minutos, segundos o milisegundos, todos toman el valor 0.
*/


let preciseDate = new Date(
    2011,
    0,
    1,
    2,
    3,
    4,
    567
);

alert(preciseDate);

// 01/01/2011 02:03:04.567


/*
La precisión máxima del objeto Date es de 1 milisegundo.
*/


// ============================================================================
// OBTENER COMPONENTES DE UNA FECHA
// ============================================================================

/*
Date ofrece múltiples métodos para acceder a cada parte de la fecha.
*/


let currentDate = new Date();


// Año (4 dígitos)

currentDate.getFullYear();


// Mes

/*
Devuelve un número entre:

0 -> Enero
...
11 -> Diciembre
*/

currentDate.getMonth();


// Día del mes

/*
Devuelve un valor entre:

1 y 31
*/

currentDate.getDate();


// Hora

currentDate.getHours();


// Minutos

currentDate.getMinutes();


// Segundos

currentDate.getSeconds();


// Milisegundos

currentDate.getMilliseconds();


// ============================================================================
// NO UTILIZAR getYear()
// ============================================================================

/*
Existe un método antiguo llamado:

getYear()

Está obsoleto.

Dependiendo del navegador puede devolver resultados inesperados
(como años de solo dos cifras).

Siempre utiliza:

getFullYear()
*/


// ============================================================================
// OBTENER EL DÍA DE LA SEMANA
// ============================================================================

/*
getDay() devuelve:

0 -> Domingo
1 -> Lunes
2 -> Martes
3 -> Miércoles
4 -> Jueves
5 -> Viernes
6 -> Sábado
*/

currentDate.getDay();


/*
Aunque en algunos países la semana comienza el lunes,
JavaScript siempre considera el domingo como el día 0.
*/


// ============================================================================
// MÉTODOS UTC
// ============================================================================

/*
Todos los métodos vistos anteriormente trabajan con la zona horaria local.

También existen versiones UTC que utilizan la hora universal.
*/

currentDate.getUTCFullYear();

currentDate.getUTCMonth();

currentDate.getUTCDate();

currentDate.getUTCDay();

currentDate.getUTCHours();

currentDate.getUTCMinutes();

currentDate.getUTCSeconds();

currentDate.getUTCMilliseconds();


/*
Basta con agregar "UTC" después de "get".
*/


// Comparación

let dateUTC = new Date();

alert(dateUTC.getHours());      // Hora local

alert(dateUTC.getUTCHours());   // Hora UTC


/*
Si tu zona horaria no coincide con UTC,
ambos valores serán distintos.
*/


// ============================================================================
// MÉTODOS ESPECIALES
// ============================================================================


// --------------------------------------------------------------------
// getTime()
// --------------------------------------------------------------------

/*
Devuelve el timestamp de la fecha.

Es decir, la cantidad de milisegundos transcurridos desde:

01/01/1970 00:00:00 UTC
*/

let timestamp = currentDate.getTime();

alert(timestamp);


// --------------------------------------------------------------------
// getTimezoneOffset()
// --------------------------------------------------------------------

/*
Devuelve la diferencia entre la zona horaria local y UTC,
expresada en minutos.
*/

alert(new Date().getTimezoneOffset());


/*
Ejemplos:

UTC-1  ->  60

UTC+3  -> -180

El signo puede parecer invertido porque el valor representa
la cantidad de minutos necesarios para llegar desde la hora local
hasta UTC.
*/

// ============================================================================
// ESTABLECER LOS COMPONENTES DE UNA FECHA
// ============================================================================

/*
Además de obtener información de un objeto Date mediante métodos get,
también es posible modificar cualquiera de sus componentes utilizando
los métodos set.

Cada método actualiza una parte específica de la fecha.
*/


// ============================================================================
// MÉTODOS SET
// ============================================================================

/*
Métodos disponibles:

setFullYear(año, [mes], [día])
setMonth(mes, [día])
setDate(día)

setHours(hora, [minutos], [segundos], [milisegundos])
setMinutes(minutos, [segundos], [milisegundos])
setSeconds(segundos, [milisegundos])
setMilliseconds(milisegundos)

setTime(timestamp)

Donde:

• Los parámetros entre corchetes [] son opcionales.
• Los componentes omitidos conservan su valor actual.
*/


// Ejemplo

let today = new Date();

today.setHours(0);

alert(today);
// Misma fecha, pero con la hora en 00


today.setHours(0, 0, 0, 0);

alert(today);
// Misma fecha, exactamente a las 00:00:00.000


/*
Excepto setTime(), todos los métodos tienen una versión UTC.

Por ejemplo:

setUTCFullYear()
setUTCMonth()
setUTCDate()
setUTCHours()
setUTCMinutes()
...

Estas variantes trabajan utilizando la zona horaria UTC en lugar de la
zona horaria local.
*/


// ============================================================================
// AUTOCORRECCIÓN DE DATE
// ============================================================================

/*
Una de las características más útiles del objeto Date es su capacidad de
autocorregir fechas inválidas.

Si algún componente queda fuera de su rango válido, JavaScript ajusta
automáticamente la fecha.
*/


// Día fuera del rango permitido

let date = new Date(2013, 0, 32);

alert(date);

// 01/02/2013


/*
Enero no tiene 32 días.

Date detecta automáticamente el exceso y lo convierte en el primer día
del mes siguiente.
*/


// ============================================================================
// SUMAR O RESTAR FECHAS
// ============================================================================

/*
Gracias a esta autocorrección, sumar o restar días resulta muy sencillo.

Solo debemos modificar el día y Date calculará el resultado correcto,
incluso si cambia el mes o el año.
*/


let leapDate = new Date(2016, 1, 28);

leapDate.setDate(leapDate.getDate() + 2);

alert(leapDate);

// 01/03/2016


/*
No necesitamos preocuparnos por:

- Meses con distinta cantidad de días.
- Años bisiestos.
- Cambios de mes.
- Cambios de año.

Date realiza todos esos cálculos automáticamente.
*/


// ============================================================================
// SUMAR SEGUNDOS, MINUTOS U HORAS
// ============================================================================

/*
La misma idea puede aplicarse a cualquier componente de la fecha.
*/


let currentDate = new Date();

currentDate.setSeconds(currentDate.getSeconds() + 70);

alert(currentDate);


/*
Si los segundos superan 59, Date incrementará automáticamente
los minutos correspondientes.
*/


// ============================================================================
// VALORES NEGATIVOS Y CERO
// ============================================================================

/*
También podemos utilizar valores negativos o cero.

Date volverá a corregir automáticamente la fecha.
*/


let exampleDate = new Date(2016, 0, 2);

exampleDate.setDate(1);

alert(exampleDate);

// 01/01/2016


exampleDate.setDate(0);

alert(exampleDate);

// 31/12/2015


/*
¿Por qué?

Porque el día mínimo válido es 1.

Al indicar 0, JavaScript interpreta que queremos "un día antes del
primer día del mes", es decir, el último día del mes anterior.
*/


// ============================================================================
// CONVERTIR UNA FECHA EN UN NÚMERO
// ============================================================================

/*
Cuando un objeto Date se convierte a número, el resultado es su timestamp.

Es exactamente el mismo valor que devuelve getTime().
*/


let now = new Date();

alert(+now);

alert(now.getTime());


/*
Ambas expresiones devuelven la cantidad de milisegundos transcurridos
desde el 1 de enero de 1970 a las 00:00:00 UTC.
*/


// ============================================================================
// CALCULAR DIFERENCIAS ENTRE FECHAS
// ============================================================================

/*
Los objetos Date pueden restarse entre sí.

El resultado siempre será la diferencia entre ambas fechas expresada
en milisegundos.
*/


let start = new Date();


// Código cuyo tiempo queremos medir

for (let i = 0; i < 100000; i++) {
    let doSomething = i * i * i;
}


let end = new Date();

alert(`Tiempo transcurrido: ${end - start} ms`);


/*
Esta técnica se utiliza con frecuencia para:

- Medir el rendimiento de un algoritmo.
- Comparar implementaciones.
- Saber cuánto tarda una operación.
- Crear herramientas de benchmarking.

Como el resultado está en milisegundos, puede convertirse fácilmente
a segundos, minutos o cualquier otra unidad de tiempo cuando sea necesario.
*/

// ============================================================================
// DATE.NOW()
// ============================================================================

/*
Si únicamente necesitamos obtener el timestamp actual para medir tiempo,
no es necesario crear un objeto Date.

En esos casos podemos utilizar:

Date.now()

Este método devuelve directamente la cantidad de milisegundos transcurridos
desde el 1 de enero de 1970 a las 00:00:00 UTC.
*/


// Equivalente a:

new Date().getTime();


// Pero más eficiente.

Date.now();


/*
¿Por qué?

Porque:

- No crea un objeto Date.
- Devuelve directamente un número.
- Consume menos recursos.
- Evita crear objetos temporales que luego deberán ser eliminados por el recolector de basura.

Por estas razones suele utilizarse para medir tiempos de ejecución,
especialmente en aplicaciones donde el rendimiento es importante.
*/


// ============================================================================
// MEDIR EL TIEMPO DE EJECUCIÓN
// ============================================================================

let start = Date.now();


// Código cuyo tiempo queremos medir

for (let i = 0; i < 100000; i++) {
    let doSomething = i * i * i;
}


let end = Date.now();

alert(`El bucle tardó ${end - start} ms`);


/*
Como Date.now() devuelve números, basta con restarlos para obtener el tiempo
transcurrido en milisegundos.
*/


// ============================================================================
// BENCHMARKING
// ============================================================================

/*
Un benchmark es una prueba cuyo objetivo es medir el rendimiento de un
algoritmo o una implementación.

Por ejemplo, supongamos que queremos averiguar cuál de estas funciones es
más rápida para calcular la diferencia entre dos fechas.
*/


function diffSubtract(date1, date2) {
    return date2 - date1;
}

function diffGetTime(date1, date2) {
    return date2.getTime() - date1.getTime();
}


/*
Ambas funciones producen exactamente el mismo resultado.

La diferencia está en cómo obtienen el timestamp:

• diffSubtract() confía en la conversión automática de Date a Number.

• diffGetTime() obtiene explícitamente el timestamp mediante getTime().
*/


// ============================================================================
// PRIMER BENCHMARK
// ============================================================================

/*
Como estas funciones son extremadamente rápidas, debemos ejecutarlas muchas
veces para poder medir diferencias apreciables.
*/


function bench(f) {

    let date1 = new Date(0);
    let date2 = new Date();

    let start = Date.now();

    for (let i = 0; i < 100000; i++) {
        f(date1, date2);
    }

    return Date.now() - start;
}


alert(
    "Tiempo de diffSubtract: " +
    bench(diffSubtract) +
    " ms"
);

alert(
    "Tiempo de diffGetTime: " +
    bench(diffGetTime) +
    " ms"
);


/*
En muchos motores JavaScript, diffGetTime() suele resultar más rápida porque
evita la conversión implícita de tipos.

Sin embargo, este benchmark todavía no es completamente confiable.
*/


// ============================================================================
// ¿POR QUÉ UN SOLO BENCHMARK NO ES SUFICIENTE?
// ============================================================================

/*
Mientras se ejecuta una prueba pueden ocurrir muchas cosas:

- El sistema operativo puede estar ejecutando otros procesos.
- La CPU puede estar ocupada.
- El navegador puede realizar tareas internas.
- Otros programas pueden consumir recursos.

Como consecuencia, una función podría ejecutarse con menos recursos que otra,
produciendo resultados engañosos.
*/


// ============================================================================
// BENCHMARK MÁS CONFIABLE
// ============================================================================

/*
Una mejor estrategia consiste en ejecutar ambas pruebas varias veces e ir
acumulando los resultados.
*/


let time1 = 0;
let time2 = 0;


for (let i = 0; i < 10; i++) {

    time1 += bench(diffSubtract);

    time2 += bench(diffGetTime);

}


alert(`Tiempo total de diffSubtract: ${time1} ms`);

alert(`Tiempo total de diffGetTime: ${time2} ms`);


/*
Al repetir las pruebas reducimos el impacto de factores externos y obtenemos
una medición mucho más representativa.
*/


// ============================================================================
// PRECALENTAMIENTO (WARM-UP)
// ============================================================================

/*
Los motores modernos de JavaScript (como V8) optimizan el código que se
ejecuta repetidamente.

Las primeras ejecuciones normalmente todavía no están optimizadas.

Por eso es habitual realizar unas ejecuciones de "calentamiento" antes de
medir el rendimiento.
*/


bench(diffSubtract);

bench(diffGetTime);


// Benchmark real

for (let i = 0; i < 10; i++) {

    time1 += bench(diffSubtract);

    time2 += bench(diffGetTime);

}


/*
De esta manera el motor ya tuvo tiempo de optimizar las funciones antes de
comenzar la medición.
*/


// ============================================================================
// CUIDADO CON LOS MICROBENCHMARKS
// ============================================================================

/*
Los microbenchmarks son pruebas muy pequeñas destinadas a medir operaciones
simples, por ejemplo:

- Un operador.
- Una función integrada.
- Una pequeña expresión.

Aunque pueden parecer útiles, sus resultados no siempre representan el
rendimiento en aplicaciones reales.
*/


/*
Los motores modernos realizan numerosas optimizaciones internas.

Estas optimizaciones pueden modificar significativamente los resultados de
una prueba artificial.

Por ello, un microbenchmark no siempre refleja cómo se comportará el código
durante un uso normal.

En la mayoría de los proyectos no es necesario crear este tipo de pruebas.
*/


// ============================================================================
// DATE.PARSE()
// ============================================================================

/*
Date.parse() permite convertir una fecha escrita como texto en un timestamp.

Sintaxis:

Date.parse(string)

Si el formato es válido, devuelve el timestamp correspondiente.

Si no puede interpretar la fecha, devuelve NaN.
*/


// ============================================================================
// FORMATO RECOMENDADO
// ============================================================================

/*
El formato estándar es ISO 8601:

YYYY-MM-DDTHH:mm:ss.sssZ

Donde:

YYYY -> año

MM -> mes

DD -> día

T -> separador entre fecha y hora

HH:mm:ss.sss -> hora, minutos, segundos y milisegundos

Z -> zona horaria (opcional)

También pueden utilizarse variantes abreviadas:

YYYY

YYYY-MM

YYYY-MM-DD
*/


// ============================================================================
// EJEMPLO
// ============================================================================

let ms = Date.parse(
    "2012-01-26T13:51:50.417-07:00"
);

alert(ms);

// 1327611110417


/*
El resultado es un timestamp expresado en milisegundos.
*/


// ============================================================================
// CREAR UN DATE A PARTIR DE DATE.PARSE()
// ============================================================================

/*
Como Date.parse() devuelve un timestamp, podemos utilizarlo inmediatamente
para crear un objeto Date.
*/


let date = new Date(

    Date.parse(
        "2012-01-26T13:51:50.417-07:00"
    )

);

alert(date);

// ============================================================================
// FECHA Y HORA (DATE) — RESUMEN
// ============================================================================
//
// El objeto Date es la forma en que JavaScript representa fechas y horas.
// Un objeto Date siempre contiene ambas; no existe un objeto que almacene
// únicamente la fecha o únicamente la hora.
//
// Se utiliza para:
//
// - Mostrar la fecha y hora actual.
// - Registrar fechas de creación o modificación.
// - Calcular diferencias de tiempo.
// - Medir el rendimiento de un programa.
// - Trabajar con timestamps.
//
// ============================================================================
// PUNTOS CLAVE
// ============================================================================
//
// - Date siempre almacena fecha y hora.
//
// - Los meses comienzan en 0:
//
//    0 → Enero
//    1 → Febrero
//    ...
//    11 → Diciembre
//
// - getDay() también comienza desde 0:
//
//    0 → Domingo
//    1 → Lunes
//    ...
//    6 → Sábado
//
// - Date corrige automáticamente valores fuera de rango.
//
//    new Date(2026, 0, 35)
//    // → 4 de febrero de 2026
//
// Gracias a esta autocorrección resulta muy sencillo sumar o restar:
//
// - días
// - meses
// - horas
// - minutos
//
// sin preocuparse por cambios de mes o años bisiestos.
//
// ============================================================================
// FECHAS COMO NÚMEROS
// ============================================================================
//
// Cuando un objeto Date se convierte a número, JavaScript utiliza su
// timestamp:
//
// timestamp = milisegundos transcurridos desde:
//
// 1 de enero de 1970
// 00:00:00 UTC
//
// Gracias a ello es posible restar fechas directamente.
//
// Ejemplo:
//
// const inicio = new Date();
//
// // ...código...
//
// const fin = new Date();
//
// console.log(fin - inicio); // milisegundos transcurridos
//
// ============================================================================
// Date.now()
// ============================================================================
//
// Si únicamente necesitas el timestamp actual, no hace falta crear un objeto
// Date.
//
// Es preferible utilizar:
//
// Date.now()
//
// porque:
//
// - es más rápido;
// - no crea un objeto Date;
// - consume menos memoria.
//
// Ejemplo:
//
// const inicio = Date.now();
//
// // código
//
// const fin = Date.now();
//
// console.log(fin - inicio);
//
// ============================================================================
// PRECISIÓN DE LOS TIMESTAMPS
// ============================================================================
//
// En JavaScript los timestamps SIEMPRE se expresan en:
//
// Milisegundos (ms)
//
// Esto es diferente de muchos otros lenguajes y sistemas, donde suelen
// utilizarse segundos.
//
// ============================================================================
// MEDICIONES DE ALTA PRECISIÓN
// ============================================================================
//
// Date tiene precisión de milisegundos.
//
// Cuando se necesitan mediciones mucho más precisas (por ejemplo, para medir
// el rendimiento de una aplicación), existen APIs especializadas.
//
// En navegadores:
//
// performance.now()
//
// Devuelve el tiempo con precisión de microsegundos
// (fracciones de milisegundo).
//
// Ejemplo:
//
// console.log(`Tiempo: ${performance.now()} ms`);
//
// Posible salida:
//
// 34731.260
//
// Donde:
//
// 34731 → milisegundos
// .260  → aproximadamente 260 microsegundos
//
// Esta función es mucho más adecuada que Date.now() para realizar benchmarks.
//
// ============================================================================
// EN NODE.JS
// ============================================================================
//
// Date sigue teniendo precisión de milisegundos.
//
// Si se necesita mayor precisión existen herramientas específicas del entorno,
// como módulos especializados (por ejemplo, microtime).
//
// En aplicaciones reales suele haber mecanismos para medir tiempos con una
// precisión superior a la que ofrece Date.
//
// ============================================================================
// IDEA CLAVE
// ============================================================================
//
// Date sirve para trabajar con fechas, horas y diferencias de tiempo.
//
// Para medir rendimiento:
//
// - Date.now() → rápido y suficiente en la mayoría de los casos.
//
// - performance.now() → recomendado cuando se necesita mayor precisión,
//   especialmente en benchmarks y mediciones de rendimiento.
//
// Recordatorio:
//
// - Date almacena fecha + hora.
// - Enero = mes 0.
// - Domingo = día 0.
// - Los timestamps están en milisegundos.
// - Date se autocorrige con valores fuera de rango.
// - Restar dos Date devuelve la diferencia en milisegundos.
// - Date.now() devuelve el timestamp actual.
// - performance.now() ofrece una medición mucho más precisa para rendimiento.
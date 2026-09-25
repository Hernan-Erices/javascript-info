/*
ALCANCE DE VARIABLES Y CIERRES

JavaScript está muy orientado al uso de funciones. Una función puede crearse,
pasarse como argumento, devolverse desde otra función y ejecutarse desde una
parte diferente del programa.

Una función también puede acceder a variables externas. Esto plantea varias
preguntas importantes:

- ¿Qué valor obtiene si una variable externa cambia después de crear la función?
- ¿Qué ocurre cuando la función se ejecuta desde otro lugar?
- ¿Cómo puede una función seguir accediendo a variables de una función que ya
  terminó su ejecución?

Para comprender estos comportamientos es necesario estudiar el alcance,
los entornos léxicos y los cierres.

Este tema se centra en variables declaradas con let y const. Ambas se comportan
de la misma forma respecto al alcance explicado aquí. var presenta diferencias
que corresponden a otro tema.

Fuente: javascript.info
:chatgpt-content-reference{index="0"}
*/


/*
1. ALCANCE DE BLOQUE

Cuando una variable se declara con let o const dentro de un bloque {...},
solo puede utilizarse dentro de ese bloque.

Esto permite mantener variables locales separadas del resto del código.
*/

function ejemploAlcanceDeBloque() {
  {
    let mensaje = "Hello";

    alert(mensaje); // Hello
  }

  // alert(mensaje);
  // Error: mensaje no está definido fuera del bloque.
}


/*
Los bloques también permiten reutilizar un mismo nombre de variable
en bloques independientes.
*/

function ejemploBloquesIndependientes() {
  {
    let mensaje = "Hello";
    alert(mensaje);
  }

  {
    let mensaje = "Goodbye";
    alert(mensaje);
  }
}


/*
Sin los bloques independientes, intentar declarar dos veces la misma variable
con let dentro del mismo alcance produce un error.

El siguiente ejemplo contiene un error intencional, por lo que se mantiene
comentado.
*/

function ejemploDeclaracionDuplicada() {
  /*
  let mensaje = "Hello";
  alert(mensaje);

  let mensaje = "Goodbye"; // Error: variable already declared
  alert(mensaje);
  */
}


/*
2. ALCANCE EN IF

Las variables declaradas dentro del bloque de un if también quedan limitadas
a ese bloque.
*/

function ejemploAlcanceEnIf() {
  if (true) {
    let frase = "Hello!";

    alert(frase); // Hello!
  }

  // alert(frase);
  // Error: frase no existe fuera del bloque del if.
}


/*
3. ALCANCE EN BUCLES

Las variables declaradas dentro de un for o while también tienen alcance local
al bloque correspondiente.

En un for, una variable declarada en la parte inicial de la estructura,
como let i, se considera parte del bloque del bucle.
*/

function ejemploAlcanceEnFor() {
  for (let i = 0; i < 3; i++) {
    alert(i); // 0, luego 1, luego 2
  }

  // alert(i);
  // Error: i no existe fuera del for.
}


/*
4. FUNCIONES ANIDADAS

Una función está anidada cuando se crea dentro de otra función.

La función interna puede acceder a:

- Sus propias variables.
- Los parámetros de la función externa.
- Las variables disponibles en los entornos externos.

Esto permite crear funciones auxiliares que trabajan con los datos de la
función que las contiene.
*/

function ejemploFuncionAnidada() {
  function saludarYDespedir(nombre, apellido) {
    function obtenerNombreCompleto() {
      return nombre + " " + apellido;
    }

    alert("Hello, " + obtenerNombreCompleto());
    alert("Bye, " + obtenerNombreCompleto());
  }

  saludarYDespedir("John", "Smith");
}


/*
Una característica especialmente importante es que una función anidada puede
devolverse y utilizarse posteriormente desde otra parte del código.

Aunque se ejecute después y desde otro lugar, continuará teniendo acceso a las
variables externas correspondientes al lugar donde fue creada.
*/


/*
5. PRIMER EJEMPLO DE CIERRE: CONTADOR

makeCounter crea una variable count y devuelve una función anidada.

La función devuelta sigue teniendo acceso a count incluso después de que
makeCounter haya terminado.

Cada llamada devuelve primero el valor actual y después lo incrementa debido
al operador count++.
*/

function ejemploContador() {
  function makeCounter() {
    let count = 0;

    return function () {
      return count++;
    };
  }

  const contador = makeCounter();

  alert(contador()); // 0
  alert(contador()); // 1
  alert(contador()); // 2
}


/*
6. ENTORNO LÉXICO

Cada función que se está ejecutando, cada bloque de código {...} y el script
completo tienen asociado internamente un objeto llamado Entorno Léxico.

El Entorno Léxico tiene dos partes:

1. Environment Record
   Almacena las variables locales como propiedades y también contiene otra
   información relacionada con la ejecución.

2. Referencia al entorno léxico externo
   Permite llegar al entorno correspondiente al código exterior.

Desde este punto de vista, una variable puede entenderse como una propiedad
del Environment Record correspondiente.

Obtener o modificar una variable equivale conceptualmente a obtener o modificar
esa propiedad interna.
*/


/*
7. ENTORNO LÉXICO GLOBAL

El script completo tiene su propio Entorno Léxico global.

Este entorno no tiene otro entorno exterior, por lo que su referencia externa
es null.

Durante la ejecución del script, el contenido de este entorno cambia a medida
que las variables se inicializan y reciben nuevos valores.
*/


/*
8. ESTADOS DE UNA VARIABLE let

Cuando comienza la ejecución del script, el motor ya conoce las variables
declaradas.

Una variable let pasa conceptualmente por estas etapas:

1. Existe internamente en estado "no inicializado".
2. Antes de su declaración no puede utilizarse.
3. Al ejecutarse la declaración sin asignación, su valor pasa a ser undefined.
4. Posteriormente puede recibir y cambiar valores.
*/

function ejemploInicializacionLet() {
  let frase;

  alert(frase); // undefined

  frase = "Hello";
  alert(frase); // Hello

  frase = "Goodbye";
  alert(frase); // Goodbye
}


/*
El Entorno Léxico es un objeto de especificación.

Sirve para describir cómo funciona JavaScript internamente, pero no es un objeto
al que podamos acceder o modificar directamente desde nuestro código.

Los motores de JavaScript pueden implementar optimizaciones internas siempre que
el comportamiento observable del programa siga siendo el descrito.
*/


/*
9. DECLARACIONES DE FUNCIONES

Una función también es un valor, pero una Function Declaration tiene una
diferencia importante frente a una variable let:

La declaración de función se inicializa completamente cuando se crea el
Entorno Léxico.

Por eso una función declarada mediante Function Declaration puede utilizarse
antes de la línea donde aparece su declaración.
*/

function ejemploDeclaracionDeFuncion() {
  saludar();

  function saludar() {
    alert("Hello!");
  }
}


/*
Este comportamiento corresponde a Function Declaration.

No debe confundirse con una Function Expression asignada a una variable.
*/


/*
10. ENTORNO LÉXICO INTERNO Y EXTERNO

Cada vez que se llama a una función se crea un nuevo Entorno Léxico para esa
ejecución.

Este nuevo entorno almacena:

- Los parámetros de la llamada.
- Las variables locales.
- Una referencia al Entorno Léxico exterior.

Cuando JavaScript necesita encontrar una variable, sigue este proceso:

1. Busca en el Entorno Léxico actual.
2. Si no está allí, busca en el entorno exterior.
3. Continúa siguiendo entornos exteriores.
4. El proceso termina al llegar al entorno global.

Si la variable no existe en ninguno de ellos, acceder a ella produce un error.
*/

function ejemploBusquedaDeVariables() {
  const frase = "Hello";

  function decir(nombre) {
    alert(frase + ", " + nombre);
  }

  decir("John");
}

/*
En decir("John"):

- nombre se encuentra en el Entorno Léxico creado para esa llamada.
- frase no existe localmente.
- JavaScript sigue la referencia al entorno exterior.
- frase se encuentra allí.

Flujo:
entorno interno -> entorno externo -> entorno global
*/


/*
11. DEVOLVER UNA FUNCIÓN

Volvamos al contador para analizarlo mediante entornos léxicos.
*/

function crearContador() {
  let count = 0;

  return function () {
    return count++;
  };
}


/*
Cada vez que se ejecuta crearContador(), se crea un nuevo Entorno Léxico.

Dentro de esa ejecución se crea también la función anidada que posteriormente
se devuelve.

Todas las funciones recuerdan el Entorno Léxico en el que fueron creadas.
*/


/*
12. PROPIEDAD OCULTA [[Environment]]

Toda función posee internamente una propiedad especial llamada [[Environment]].

Esta propiedad mantiene una referencia al Entorno Léxico donde la función fue
creada.

[[Environment]]:

- Se establece cuando se crea la función.
- Mantiene la referencia al entorno correspondiente.
- No cambia según el lugar desde el que posteriormente se invoque la función.

No podemos acceder directamente a [[Environment]] desde código JavaScript
normal; se utiliza para explicar internamente este comportamiento.
*/


/*
En el caso de crearContador():

const contador = crearContador();

la función guardada en contador conserva mediante [[Environment]] una referencia
al entorno donde existe:

count = 0

Cuando posteriormente se ejecuta contador(), se crea un nuevo Entorno Léxico
para esa llamada.

Como count no existe en ese nuevo entorno, JavaScript continúa hacia el entorno
exterior indicado por [[Environment]] y encuentra allí count.
*/


function ejemploPersistenciaDelContador() {
  const contador = crearContador();

  alert(contador()); // 0
  alert(contador()); // 1
  alert(contador()); // 2
}


/*
Una variable se actualiza en el Entorno Léxico donde reside.

Por eso las sucesivas llamadas al contador modifican siempre el mismo count.
*/


/*
13. CONTADORES INDEPENDIENTES

Cada llamada a crearContador() crea un nuevo Entorno Léxico.

Por lo tanto, si llamamos dos veces a crearContador(), cada función devuelta
mantendrá su propia referencia a su propio count.
*/

function ejemploContadoresIndependientes() {
  const contadorUno = crearContador();
  const contadorDos = crearContador();

  alert(contadorUno()); // 0
  alert(contadorUno()); // 1

  alert(contadorDos()); // 0
  alert(contadorDos()); // 1
}


/*
contadorUno y contadorDos no comparten count.

Cada uno recuerda el Entorno Léxico correspondiente a una ejecución diferente
de crearContador().
*/


/*
14. CIERRES

Un cierre es una función que recuerda sus variables externas y puede acceder
a ellas.

En JavaScript, las funciones son cierres por naturaleza, con una excepción
mencionada en el contenido original que corresponde al tema "new Function".

Las funciones recuerdan automáticamente dónde fueron creadas mediante
[[Environment]].

Gracias a esto pueden acceder a variables externas incluso cuando se ejecutan
posteriormente desde otra parte del código.
*/


function ejemploCierre() {
  function crearSaludo() {
    let mensaje = "Hello";

    return function () {
      alert(mensaje);
    };
  }

  const saludar = crearSaludo();

  saludar(); // Hello
}


/*
Aunque crearSaludo() ya terminó, la función almacenada en saludar continúa
teniendo acceso a mensaje porque recuerda el Entorno Léxico donde fue creada.
*/


/*
15. RECOGIDA DE BASURA Y ENTORNOS LÉXICOS

Normalmente, cuando una función termina, su Entorno Léxico puede eliminarse
junto con sus variables porque deja de ser accesible.

Sin embargo, esto cambia si una función anidada continúa siendo accesible.

Si una función interna permanece disponible, su [[Environment]] mantiene una
referencia al Entorno Léxico externo.

Mientras exista esa referencia, dicho entorno también debe mantenerse.
*/

function ejemploEntornoConservado() {
  function crearFuncion() {
    let valor = 123;

    return function () {
      alert(valor);
    };
  }

  const funcionGuardada = crearFuncion();

  funcionGuardada(); // 123
}


/*
Mientras funcionGuardada exista, el entorno correspondiente a la llamada de
crearFuncion() sigue siendo accesible y valor permanece disponible.
*/


/*
16. VARIAS LLAMADAS, VARIOS ENTORNOS

Si una función se ejecuta varias veces y en cada ejecución devuelve una función,
cada ejecución puede mantener su propio Entorno Léxico.
*/

function ejemploVariosEntornos() {
  function crearFuncion() {
    let valor = Math.random();

    return function () {
      alert(valor);
    };
  }

  const funciones = [
    crearFuncion(),
    crearFuncion(),
    crearFuncion(),
  ];

  funciones[0]();
  funciones[1]();
  funciones[2]();
}


/*
En este ejemplo existen tres funciones almacenadas.

Cada una está vinculada mediante [[Environment]] al Entorno Léxico de la
ejecución concreta de crearFuncion() en la que fue creada.
*/


/*
17. CUÁNDO PUEDE ELIMINARSE EL ENTORNO

Un Entorno Léxico deja de ser necesario cuando se vuelve inaccesible.

Si la última función que mantiene una referencia al entorno deja de ser
accesible, ese entorno también puede limpiarse de memoria.
*/

function ejemploLiberacionDeEntorno() {
  function crearFuncion() {
    let valor = 123;

    return function () {
      alert(valor);
    };
  }

  let funcionGuardada = crearFuncion();

  funcionGuardada();

  funcionGuardada = null;

  /*
  Mientras funcionGuardada contenía la función, su [[Environment]] mantenía
  accesible el entorno donde estaba valor.

  Después de asignar null, esa referencia deja de existir y el entorno puede
  limpiarse de memoria.
  */
}


/*
18. OPTIMIZACIONES DE LOS MOTORES

Teóricamente, mientras una función siga activa mediante un cierre, sus variables
externas correspondientes pueden permanecer disponibles.

En la práctica, los motores de JavaScript realizan optimizaciones.

Pueden analizar qué variables externas utiliza realmente una función y eliminar
aquellas que claramente no necesita.
*/


/*
19. EFECTO DURANTE LA DEPURACIÓN EN V8

En motores V8, utilizados por navegadores como Chrome, Edge y Opera según el
contenido original, una variable externa que haya sido eliminada por una
optimización puede dejar de estar disponible mientras se depura el código.

El siguiente ejemplo depende del navegador y de las herramientas de desarrollo.
No se ejecuta automáticamente.
*/

function ejemploOptimizacionV8() {
  let valor = Math.random();

  function inspeccionar() {
    debugger;

    /*
    Según el ejemplo original, al intentar evaluar:

    alert(valor)

    desde la consola durante la pausa, la variable puede no estar disponible
    debido a una optimización del motor.
    */
  }

  return inspeccionar;
}


/*
20. UNA VARIABLE EXTERNA DIFERENTE DURANTE LA DEPURACIÓN

Una consecuencia curiosa de estas optimizaciones es que durante la depuración
podría encontrarse una variable más externa con el mismo nombre en lugar de
la variable más cercana que fue optimizada.

Este comportamiento pertenece a la depuración y no cambia las reglas normales
de búsqueda de variables durante la ejecución del programa.
*/

let valorGlobalDepuracion = "Surprise!";

function ejemploVariableDuranteDepuracion() {
  let valorGlobalDepuracion = "the closest value";

  function inspeccionar() {
    debugger;

    /*
    El ejemplo original muestra que, debido a una optimización de V8, durante
    la depuración puede observarse una variable externa diferente de la que
    teóricamente debería estar disponible.
    */
  }

  return inspeccionar;
}


/*
RESUMEN

1. Una variable declarada con let o const dentro de {...} solo es visible
   dentro de ese bloque.

2. if, for y while también crean ámbitos de bloque para las variables
   declaradas con let o const.

3. Una función puede contener otras funciones.

4. Una función anidada puede acceder a las variables de funciones y entornos
   exteriores.

5. Cada función en ejecución, bloque y script tiene asociado conceptualmente
   un Entorno Léxico.

6. El Entorno Léxico contiene un Environment Record con las variables locales
   y una referencia al entorno exterior.

7. Cuando JavaScript busca una variable, comienza por el Entorno Léxico actual
   y continúa hacia los entornos exteriores.

8. Las Function Declaration se inicializan inmediatamente cuando se crea el
   entorno correspondiente.

9. Cada llamada a una función crea un nuevo Entorno Léxico para sus parámetros
   y variables locales.

10. Toda función recuerda el Entorno Léxico donde fue creada mediante la
    propiedad interna [[Environment]].

11. [[Environment]] se establece cuando se crea la función y permite que esta
    acceda posteriormente a sus variables externas.

12. Una variable se modifica en el Entorno Léxico donde está almacenada.

13. Un cierre es una función que recuerda sus variables externas y puede
    acceder a ellas.

14. En JavaScript las funciones son cierres por naturaleza, salvo la excepción
    relacionada con "new Function" mencionada en el contenido original.

15. Si una función anidada sigue siendo accesible, también puede mantenerse en
    memoria el Entorno Léxico al que hace referencia.

16. Varias ejecuciones de una misma función crean entornos diferentes, por lo
    que pueden producir cierres independientes.

17. Cuando un Entorno Léxico deja de ser accesible, puede eliminarse de memoria.

18. Los motores pueden optimizar y eliminar variables externas que no se
    utilizan.

19. En V8 estas optimizaciones pueden producir comportamientos particulares
    al inspeccionar variables durante la depuración.
*/


/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos que utilizan alert dependen del navegador.
Los ejemplos con debugger están pensados para ejecutarse con las herramientas
de desarrollo abiertas.
*/

// ejemploAlcanceDeBloque();
// ejemploBloquesIndependientes();
// ejemploDeclaracionDuplicada();
// ejemploAlcanceEnIf();
// ejemploAlcanceEnFor();
// ejemploFuncionAnidada();
// ejemploContador();
// ejemploInicializacionLet();
// ejemploDeclaracionDeFuncion();
// ejemploBusquedaDeVariables();
// ejemploPersistenciaDelContador();
// ejemploContadoresIndependientes();
// ejemploCierre();
// ejemploEntornoConservado();
// ejemploVariosEntornos();
// ejemploLiberacionDeEntorno();

// const funcionParaDepurar = ejemploOptimizacionV8();
// funcionParaDepurar();

// const otraFuncionParaDepurar = ejemploVariableDuranteDepuracion();
// otraFuncionParaDepurar();
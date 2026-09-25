/*
OBJETO DE FUNCIÓN Y EXPRESIONES DE FUNCIÓN CON NOMBRE (NFE)

En JavaScript, las funciones son objetos.

Una función puede ejecutarse mediante una llamada, pero también puede tratarse
como cualquier otro objeto: puede tener propiedades, esas propiedades pueden
consultarse o modificarse y la función puede pasarse por referencia.

Entre las propiedades integradas de las funciones se encuentran `name` y
`length`. También es posible añadir propiedades personalizadas.

Fuente del contenido: javascript.info.
Referencia del material proporcionado: :chatgpt-content-reference{index="0"}
*/


/*
1. LAS FUNCIONES SON OBJETOS

Una función puede imaginarse como un "objeto de acción" invocable.

Además de llamarla:

    funcion();

también podemos trabajar con ella como con un objeto.
*/


/*
2. PROPIEDAD `name`

Los objetos de función tienen una propiedad `name` que contiene el nombre
de la función.
*/

function ejemploNombreFuncion() {
  function saludar() {
    alert("Hola");
  }

  alert(saludar.name); // saludar
}


/*
JavaScript también puede deducir el nombre de una función a partir del
contexto en el que se asigna.

Aunque la expresión de función siguiente no contiene un nombre después
de `function`, JavaScript deduce `saludar` a partir de la variable a la
que fue asignada.

Esta característica se denomina "nombre contextual".
*/

function ejemploNombreContextual() {
  const saludar = function () {
    alert("Hola");
  };

  alert(saludar.name); // saludar
}


/*
El nombre contextual también puede deducirse cuando una función se utiliza
como valor predeterminado de un parámetro.
*/

function ejemploNombreEnParametroPredeterminado() {
  function ejecutar(saludar = function () {}) {
    alert(saludar.name); // saludar
  }

  ejecutar();
}


/*
Los métodos de los objetos también tienen nombres.
*/

function ejemploNombreMetodos() {
  const usuario = {
    saludar() {
      // ...
    },

    despedirse: function () {
      // ...
    },
  };

  alert(usuario.saludar.name); // saludar
  alert(usuario.despedirse.name); // despedirse
}


/*
JavaScript no siempre puede determinar el nombre correcto de una función.

En este ejemplo, la función se crea directamente dentro de un array.
El motor no dispone de un contexto del que pueda deducir un nombre adecuado,
por lo que `name` contiene una cadena vacía.
*/

function ejemploFuncionSinNombreDeducible() {
  const funciones = [function () {}];

  alert(funciones[0].name); // ""
}


/*
En la práctica, la mayoría de las funciones sí tienen un nombre.
*/


/*
3. PROPIEDAD `length`

La propiedad `length` de una función devuelve el número de parámetros
declarados en su definición.

Los parámetros rest no se cuentan.
*/

function ejemploLength() {
  function funcionUno(a) {}

  function funcionDos(a, b) {}

  function muchos(a, b, ...otros) {}

  alert(funcionUno.length); // 1
  alert(funcionDos.length); // 2
  alert(muchos.length); // 2
}


/*
La propiedad `length` puede utilizarse para examinar una función y decidir
cómo trabajar con ella.

En el siguiente ejemplo, `ask` recibe:

1. Una pregunta.
2. Un número arbitrario de funciones manejadoras.

Después de recibir la respuesta del usuario, distingue dos tipos de
manejadores:

- Si `handler.length === 0`, considera que el manejador no recibe argumentos
  y solamente lo llama cuando la respuesta es afirmativa.

- Si el manejador tiene parámetros, se llama tanto para respuestas afirmativas
  como negativas y recibe el resultado booleano.

Este tratamiento diferente según `length` es un caso particular de
polimorfismo.
*/

// Este ejemplo depende del navegador porque utiliza `confirm` y `alert`.
function ejemploLengthConManejadores() {
  function preguntar(pregunta, ...manejadores) {
    const esSi = confirm(pregunta);

    for (const manejador of manejadores) {
      if (manejador.length === 0) {
        if (esSi) {
          manejador();
        }
      } else {
        manejador(esSi);
      }
    }
  }

  preguntar(
    "¿Pregunta?",
    () => alert("Dijiste que sí"),
    (resultado) => alert(resultado),
  );
}


/*
4. PROPIEDADES PERSONALIZADAS

Como las funciones son objetos, podemos añadirles propiedades propias.

En el siguiente ejemplo, la propiedad `counter` guarda cuántas veces se
ejecutó la función.
*/

// Este ejemplo depende del navegador porque utiliza `alert`.
function ejemploPropiedadPersonalizada() {
  function saludar() {
    alert("Hola");
    saludar.counter++;
  }

  saludar.counter = 0;

  saludar();
  saludar();

  alert(`Llamada ${saludar.counter} veces`); // Llamada 2 veces
}


/*
5. UNA PROPIEDAD NO ES UNA VARIABLE

Una propiedad asignada a una función y una variable local son cosas distintas.

Por ejemplo:

    saludar.counter = 0;

no crea una variable local llamada `counter` dentro de `saludar`.

Las propiedades de una función y las variables de su ejecución pertenecen a
mecanismos diferentes. Añadir una propiedad al objeto función no crea
automáticamente una variable local dentro de esa función.
*/

function ejemploPropiedadNoEsVariable() {
  function saludar() {
    const contadorLocal = 100;

    return {
      contadorLocal,
      propiedadDeFuncion: saludar.counter,
    };
  }

  saludar.counter = 0;

  console.log(saludar());
}


/*
6. USAR UNA PROPIEDAD DE FUNCIÓN COMO CONTADOR

En algunos casos, una propiedad de función puede utilizarse en lugar de una
variable almacenada en un cierre.

Aquí `count` se almacena directamente en el objeto función `contador`.
*/

function crearContadorConPropiedad() {
  function contador() {
    return contador.count++;
  }

  contador.count = 0;

  return contador;
}

function ejemploContadorConPropiedad() {
  const contador = crearContadorConPropiedad();

  alert(contador()); // 0
  alert(contador()); // 1
}


/*
7. DIFERENCIA ENTRE UNA PROPIEDAD Y UNA VARIABLE EXTERNA

Si el valor del contador está almacenado en una variable externa perteneciente
al entorno léxico, el código exterior no puede acceder directamente a esa
variable. Solo las funciones que tienen acceso a ese entorno pueden modificarla.

Si el valor está almacenado como propiedad de la función, el código externo sí
puede acceder y modificar dicha propiedad.

Por eso, al usar `contador.count`, el código externo puede cambiar el valor.
*/

function ejemploModificarContadorDesdeFuera() {
  const contador = crearContadorConPropiedad();

  contador.count = 10;

  alert(contador()); // 10
}


/*
La elección entre guardar el estado en un cierre o en una propiedad de función
depende del objetivo:

- Una variable del entorno léxico no es accesible directamente desde fuera.
- Una propiedad del objeto función sí puede ser consultada o modificada desde
  el código externo.
*/


/*
8. EXPRESIÓN DE FUNCIÓN CON NOMBRE (NFE)

NFE significa "Named Function Expression", es decir, expresión de función
con nombre.

Una expresión de función ordinaria puede escribirse así:
*/

function ejemploExpresionFuncionOrdinaria() {
  const saludar = function (quien) {
    alert(`Hola, ${quien}`);
  };

  saludar("John");
}


/*
Podemos añadir un nombre interno a la expresión:
*/

function ejemploExpresionFuncionConNombre() {
  const saludar = function funcionInterna(quien) {
    alert(`Hola, ${quien}`);
  };

  saludar("John");
}


/*
Añadir `funcionInterna` después de `function` no convierte la expresión de
función en una declaración de función.

Sigue siendo una expresión creada como parte de una asignación.

La variable externa sigue siendo `saludar`.
*/


/*
9. CARACTERÍSTICAS DEL NOMBRE INTERNO DE UNA NFE

El nombre interno tiene dos características importantes:

1. Permite que la función se referencie a sí misma desde su propio cuerpo.
2. No es visible fuera de la función.

En este ejemplo, `funcionInterna` permite volver a llamar a la función cuando
no se proporciona `quien`.
*/

// Este ejemplo depende del navegador porque utiliza `alert`.
function ejemploNombreInternoNFE() {
  const saludar = function funcionInterna(quien) {
    if (quien) {
      alert(`Hola, ${quien}`);
    } else {
      funcionInterna("Invitado");
    }
  };

  saludar(); // Hola, Invitado

  /*
  `funcionInterna` solamente existe dentro del cuerpo de la función.

  Esta llamada produciría un error:

      funcionInterna();

  Error: funcionInterna no está definida fuera de la función.
  */
}


/*
10. PROBLEMA DE AUTORREFERENCIARSE MEDIANTE LA VARIABLE EXTERNA

Una función también podría intentar llamarse a sí misma utilizando la variable
a la que fue asignada.
*/

function ejemploAutorreferenciaMedianteVariable() {
  const saludar = function (quien) {
    if (quien) {
      alert(`Hola, ${quien}`);
    } else {
      saludar("Invitado");
    }
  };

  saludar();
}


/*
El problema aparece si la variable externa cambia.

Consideremos conceptualmente este código:

    let saludar = function (quien) {
      if (quien) {
        alert(`Hola, ${quien}`);
      } else {
        saludar("Invitado");
      }
    };

    let bienvenida = saludar;
    saludar = null;

    bienvenida();

La función obtiene `saludar` desde su entorno léxico externo.

Después de:

    saludar = null;

la llamada interna:

    saludar("Invitado");

intenta utilizar `null` como una función y produce un error.

Por eso, depender de la variable externa para que una función se llame a sí
misma puede dejar de funcionar si esa variable cambia.
*/


/*
11. SOLUCIÓN CON UNA NFE

El nombre interno de una expresión de función resuelve ese problema.

El nombre interno siempre hace referencia a la función actual desde el interior
de su propio cuerpo.

Por eso, aunque la variable externa cambie, la autorreferencia sigue
funcionando.
*/

// Este ejemplo depende del navegador porque utiliza `alert`.
function ejemploNFEResistenteAReasignacion() {
  let saludar = function funcionInterna(quien) {
    if (quien) {
      alert(`Hola, ${quien}`);
    } else {
      funcionInterna("Invitado");
    }
  };

  const bienvenida = saludar;

  saludar = null;

  bienvenida(); // Hola, Invitado
}


/*
Flujo del ejemplo anterior:

1. La función se asigna inicialmente a `saludar`.
2. La misma función también se guarda en `bienvenida`.
3. `saludar` cambia a `null`.
4. Se llama `bienvenida()`.
5. Dentro de la función se utiliza `funcionInterna`, no `saludar`.
6. `funcionInterna` sigue haciendo referencia a la función actual.
7. La llamada interna funciona correctamente.
*/


/*
12. ALCANCE DEL NOMBRE INTERNO

En una NFE como:

    let saludar = function funcionInterna() {
      // ...
    };

existen dos referencias con alcances diferentes:

- `saludar` pertenece al código exterior.
- `funcionInterna` solamente está disponible dentro de la función.

El código exterior puede utilizar `saludar`, o cualquier otra variable a la que
se haya asignado la misma función.

La propia función puede utilizar `funcionInterna` como una referencia fiable a
sí misma.
*/


/*
13. EL NOMBRE INTERNO ES PROPIO DE LAS EXPRESIONES DE FUNCIÓN

La característica del nombre interno descrita para las NFE está disponible
para expresiones de función.

No existe una sintaxis equivalente que permita añadir un segundo "nombre
interno" a una declaración de función.

Cuando se necesita una referencia interna fiable de este tipo, puede ser
necesario reescribir una declaración de función como una expresión de función
con nombre.
*/


/*
14. FUNCIONES CON FUNCIONALIDADES ADJUNTAS

Como las funciones son objetos, además de realizar su trabajo principal pueden
tener otras funcionalidades almacenadas en propiedades.

Esto permite disponer de una función principal y añadirle otras funciones
auxiliares como propiedades.

El contenido original menciona que algunas bibliotecas utilizan ampliamente
esta característica para reducir la cantidad de variables globales: una única
función global puede contener funcionalidades adicionales en sus propiedades.
*/


/*
RESUMEN

1. En JavaScript, las funciones son objetos invocables.

2. La propiedad `name` contiene el nombre de una función.

3. Si una función no tiene un nombre escrito explícitamente, JavaScript puede
   intentar deducirlo a partir de su contexto. Esto se denomina "nombre
   contextual".

4. No siempre existe suficiente contexto para deducir un nombre, por lo que
   `name` puede ser una cadena vacía.

5. La propiedad `length` indica el número de parámetros declarados de una
   función.

6. Los parámetros rest no se cuentan en `length`.

7. `length` puede utilizarse para examinar funciones y tratarlas de forma
   diferente según la cantidad de parámetros declarados.

8. Como una función es un objeto, podemos añadirle propiedades personalizadas.

9. Una propiedad de función no es lo mismo que una variable local.

10. Un estado almacenado en una propiedad de función puede modificarse desde
    fuera de la función.

11. Una expresión de función con nombre, o NFE, tiene un nombre interno.

12. El nombre interno de una NFE permite que la función se referencie a sí
    misma.

13. Ese nombre interno solamente es visible dentro de la propia función.

14. Una NFE evita depender de una variable externa que podría cambiar o ser
    reasignada.

15. El nombre interno de una NFE sigue haciendo referencia a la función actual,
    aunque cambie la variable externa que originalmente contenía la función.

16. Las funciones pueden realizar su tarea principal y además contener otras
    funcionalidades mediante propiedades.
*/


/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos que utilizan `alert` o `confirm` requieren un entorno de navegador.
*/

// ejemploNombreFuncion();
// ejemploNombreContextual();
// ejemploNombreEnParametroPredeterminado();
// ejemploNombreMetodos();
// ejemploFuncionSinNombreDeducible();
// ejemploLength();
// ejemploLengthConManejadores();
// ejemploPropiedadPersonalizada();
// ejemploPropiedadNoEsVariable();
// ejemploContadorConPropiedad();
// ejemploModificarContadorDesdeFuera();
// ejemploExpresionFuncionOrdinaria();
// ejemploExpresionFuncionConNombre();
// ejemploNombreInternoNFE();
// ejemploAutorreferenciaMedianteVariable();
// ejemploNFEResistenteAReasignacion();
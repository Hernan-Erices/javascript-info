/*
ENLACE DE FUNCIÓN

Cuando un método de objeto se pasa como devolución de llamada, puede perder su
contexto `this`.

Esto ocurre porque el método deja de llamarse mediante el objeto al que pertenece.
Una solución habitual consiste en crear una función envolvente o utilizar
`Function.prototype.bind()` para fijar explícitamente el valor de `this`.

`bind` también permite fijar argumentos iniciales, lo que permite crear funciones
parcialmente aplicadas.
*/

/*
1. PÉRDIDA DE `this`

Cuando un método se obtiene por separado de su objeto, pierde la relación usada
para determinar `this`.

En este ejemplo, `setTimeout` recibe solamente la función `usuario.saludar`,
no una llamada como `usuario.saludar()`.
*/
function ejemploPerdidaDeThis() {
  const usuario = {
    nombre: "John",

    saludar() {
      alert(`Hello, ${this.nombre}!`);
    },
  };

  setTimeout(usuario.saludar, 1000);

  /*
  En el navegador, `setTimeout` ejecuta la función con `this = window`.

  Por eso `this.nombre` intenta obtener `window.nombre` en lugar de
  `usuario.nombre`.

  Resultado esperado del ejemplo:

  Hello, undefined!
  */
}

/*
La situación anterior puede entenderse separando primero el método del objeto.
*/
function ejemploMetodoSeparado() {
  const usuario = {
    nombre: "John",

    saludar() {
      alert(`Hello, ${this.nombre}!`);
    },
  };

  const saludar = usuario.saludar;

  setTimeout(saludar, 1000);

  // `saludar` ya no se ejecuta como `usuario.saludar()`.
}

/*
2. SOLUCIÓN CON UNA FUNCIÓN ENVOLVENTE

Una función envolvente puede conservar acceso al objeto mediante el entorno
léxico y realizar después la llamada al método de forma normal.
*/
function ejemploEnvoltorio() {
  const usuario = {
    nombre: "John",

    saludar() {
      alert(`Hello, ${this.nombre}!`);
    },
  };

  setTimeout(function () {
    usuario.saludar();
  }, 1000);
}

/*
La misma solución puede escribirse mediante una función flecha.
*/
function ejemploEnvoltorioConFlecha() {
  const usuario = {
    nombre: "John",

    saludar() {
      alert(`Hello, ${this.nombre}!`);
    },
  };

  setTimeout(() => usuario.saludar(), 1000);
}

/*
3. PROBLEMA DEL ENVOLTORIO CUANDO CAMBIA LA VARIABLE

El envoltorio consulta la variable `usuario` cuando finalmente se ejecuta.

Si esa variable cambia antes de que termine el retraso, se utilizará el nuevo
objeto.
*/
function ejemploCambioDeReferencia() {
  let usuario = {
    nombre: "John",

    saludar() {
      alert(`Hello, ${this.nombre}!`);
    },
  };

  setTimeout(() => usuario.saludar(), 1000);

  usuario = {
    saludar() {
      alert("Another user in setTimeout!");
    },
  };

  /*
  Cuando se ejecute el temporizador, `usuario` ya contendrá el nuevo objeto.

  Resultado:

  Another user in setTimeout!
  */
}

/*
4. `bind`: FIJAR EL CONTEXTO

La sintaxis básica es:

const funcionVinculada = funcion.bind(contexto);

`funcion.bind(contexto)` devuelve una nueva función vinculada.

Cuando se llama a esa nueva función, la función original se ejecuta con:

this = contexto
*/
function ejemploBindBasico() {
  const usuario = {
    nombre: "John",
  };

  function mostrarNombre() {
    alert(this.nombre);
  }

  const mostrarNombreUsuario = mostrarNombre.bind(usuario);

  mostrarNombreUsuario(); // John
}

/*
Los argumentos enviados a la función vinculada continúan pasándose a la función
original normalmente.
*/
function ejemploBindConArgumentos() {
  const usuario = {
    nombre: "John",
  };

  function saludar(frase) {
    alert(`${frase}, ${this.nombre}`);
  }

  const saludarUsuario = saludar.bind(usuario);

  saludarUsuario("Hello"); // Hello, John
}

/*
5. VINCULAR UN MÉTODO DE OBJETO

Podemos obtener un método y vincularlo permanentemente a su objeto.

Después de hacerlo, la nueva función puede ejecutarse por separado o pasarse como
devolución de llamada sin perder el contexto.
*/
function ejemploMetodoVinculado() {
  let usuario = {
    nombre: "John",

    saludar() {
      alert(`Hello, ${this.nombre}!`);
    },
  };

  const saludar = usuario.saludar.bind(usuario);

  saludar(); // Hello, John!

  setTimeout(saludar, 1000);

  /*
  Aunque la variable `usuario` cambie después, `saludar` conserva como contexto
  la referencia al objeto utilizado cuando se ejecutó `bind`.
  */
  usuario = {
    saludar() {
      alert("Another user in setTimeout!");
    },
  };
}

/*
6. `bind` FIJA `this`, PERO LOS DEMÁS ARGUMENTOS SIGUEN SIENDO VARIABLES

En este caso, `usuario` queda fijado como `this`.

Las frases siguen proporcionándose normalmente en cada llamada.
*/
function ejemploMetodoVinculadoConArgumentos() {
  const usuario = {
    nombre: "John",

    decir(frase) {
      alert(`${frase}, ${this.nombre}!`);
    },
  };

  const decir = usuario.decir.bind(usuario);

  decir("Hello"); // Hello, John!
  decir("Bye"); // Bye, John!
}

/*
7. VINCULAR TODOS LOS MÉTODOS DE UN OBJETO

Si queremos pasar frecuentemente varios métodos de un objeto como devoluciones
de llamada, podemos recorrer sus propiedades y vincular todos los valores que
sean funciones.
*/
function vincularTodosLosMetodos(usuario) {
  for (const clave in usuario) {
    if (typeof usuario[clave] === "function") {
      usuario[clave] = usuario[clave].bind(usuario);
    }
  }
}

/*
8. FUNCIONES PARCIALES

`bind` no solo puede fijar `this`. También puede fijar uno o varios argumentos
iniciales.

Sintaxis:

const vinculada = funcion.bind(contexto, arg1, arg2, ...);

Los argumentos fijados mediante `bind` se colocan antes de los argumentos que
se proporcionen posteriormente al llamar a la función.
*/
function ejemploFuncionParcialDouble() {
  function multiplicar(a, b) {
    return a * b;
  }

  const duplicar = multiplicar.bind(null, 2);

  alert(duplicar(3)); // multiplicar(2, 3) = 6
  alert(duplicar(4)); // multiplicar(2, 4) = 8
  alert(duplicar(5)); // multiplicar(2, 5) = 10
}

/*
En este caso no se necesita `this`, pero `bind` requiere recibir un contexto.
Por eso se utiliza `null`.

La función resultante tiene fijado el primer argumento.
*/
function ejemploFuncionParcialTriple() {
  function multiplicar(a, b) {
    return a * b;
  }

  const triplicar = multiplicar.bind(null, 3);

  alert(triplicar(3)); // multiplicar(3, 3) = 9
  alert(triplicar(4)); // multiplicar(3, 4) = 12
  alert(triplicar(5)); // multiplicar(3, 5) = 15
}

/*
Una función parcial resulta útil cuando queremos crear una variante más específica
de una función general.

Por ejemplo, a partir de:

send(from, to, text)

podríamos crear conceptualmente una variante:

sendTo(to, text)

donde `from` ya se encuentre fijado.
*/

/*
9. APLICACIÓN PARCIAL SIN FIJAR `this`

El `bind` nativo siempre requiere proporcionar un contexto.

Si queremos fijar argumentos pero conservar dinámicamente el `this` usado en
cada llamada, podemos crear una función `partial`.

El envoltorio conserva el mismo `this` recibido al ejecutarse.
*/
function partial(funcion, ...argumentosFijos) {
  return function (...argumentos) {
    return funcion.call(this, ...argumentosFijos, ...argumentos);
  };
}

/*
Flujo de argumentos:

1. Se conserva el `this` de la llamada al envoltorio.
2. Se agregan primero los argumentos fijados con `partial`.
3. Después se agregan los argumentos proporcionados al llamar al envoltorio.
*/
function ejemploPartialSinFijarContexto() {
  const usuario = {
    nombre: "John",

    decir(hora, frase) {
      alert(`[${hora}] ${this.nombre}: ${frase}!`);
    },
  };

  const horaActual =
    new Date().getHours() + ":" + new Date().getMinutes();

  usuario.decirAhora = partial(usuario.decir, horaActual);

  usuario.decirAhora("Hello");

  /*
  Resultado aproximado:

  [10:00] John: Hello!

  `this` sigue siendo `usuario` porque la llamada se realiza como:

  usuario.decirAhora("Hello")
  */
}

/*
10. DIFERENCIA ENTRE `bind` Y `partial`

Con `bind`:

const funcion = original.bind(contexto, argumento);

Se pueden fijar:

- `this`.
- Uno o varios argumentos iniciales.

Con la función `partial` mostrada anteriormente:

const funcion = partial(original, argumento);

Se fijan solamente los argumentos.

El valor de `this` se conserva dinámicamente según la forma en que se llame a la
función resultante.
*/

/*
RESUMEN

1. Un método puede perder `this` cuando se separa de su objeto y se pasa como
   devolución de llamada.

2. Una función envolvente puede llamar al método mediante su objeto original:

   () => usuario.saludar()

3. El envoltorio tiene una posible vulnerabilidad: si la variable que contiene el
   objeto cambia antes de la ejecución, se utilizará el nuevo valor.

4. `func.bind(contexto)` devuelve una nueva función cuyo `this` queda fijado al
   contexto indicado.

5. Una función vinculada puede ejecutarse por separado o pasarse a `setTimeout`
   sin perder el contexto fijado.

6. Los argumentos normales continúan pasándose a la función original.

7. La sintaxis completa permite fijar también argumentos iniciales:

   func.bind(contexto, arg1, arg2, ...)

8. Fijar algunos argumentos de una función existente crea una función
   parcialmente aplicada.

9. Las funciones parciales permiten crear variantes más específicas y con nombres
   más claros a partir de funciones generales.

10. `bind` no permite fijar argumentos sin proporcionar también un contexto.

11. Una función `partial` personalizada puede fijar únicamente argumentos y
    conservar dinámicamente el valor de `this`.
*/

/*
ACTIVACIÓN MANUAL

Los ejemplos utilizan `alert` y algunos utilizan `setTimeout`, por lo que están
orientados al navegador.

Descomenta solamente el ejemplo que quieras probar.
*/

// ejemploPerdidaDeThis();
// ejemploMetodoSeparado();
// ejemploEnvoltorio();
// ejemploEnvoltorioConFlecha();
// ejemploCambioDeReferencia();
// ejemploBindBasico();
// ejemploBindConArgumentos();
// ejemploMetodoVinculado();
// ejemploMetodoVinculadoConArgumentos();

// const usuario = {
//   nombre: "John",
//   saludar() {
//     alert(`Hello, ${this.nombre}!`);
//   },
// };
// vincularTodosLosMetodos(usuario);
// usuario.saludar();

// ejemploFuncionParcialDouble();
// ejemploFuncionParcialTriple();
// ejemploPartialSinFijarContexto();
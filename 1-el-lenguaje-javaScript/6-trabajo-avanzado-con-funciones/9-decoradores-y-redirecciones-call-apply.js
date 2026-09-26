/*
DECORADORES Y REENVÍO DE LLAMADAS: call, apply Y PRÉSTAMO DE MÉTODOS

JavaScript permite trabajar con funciones de forma flexible: pueden pasarse como
argumentos, utilizarse como objetos y envolverse con otras funciones.

Un decorador es una función que recibe otra función y devuelve una nueva función
que modifica o amplía su comportamiento sin cambiar el código de la función original.

En este tema se utiliza un decorador de caché para estudiar:

1. Decoradores.
2. Almacenamiento en caché transparente.
3. Preservación del contexto `this` con `func.call`.
4. Reenvío de múltiples argumentos.
5. Uso de `func.apply`.
6. Reenvío de llamadas.
7. Préstamo de métodos.
8. Limitaciones relacionadas con las propiedades de las funciones.

Fuente del contenido: :chatgpt-content-reference{index="0"}
*/


/*
1. ALMACENAMIENTO EN CACHÉ TRANSPARENTE

Supongamos que una función `slow(x)` realiza una operación costosa, pero siempre
devuelve el mismo resultado cuando recibe el mismo argumento.

Si se ejecuta frecuentemente, podemos almacenar los resultados ya calculados para
evitar repetir el trabajo.

En lugar de modificar directamente `slow()`, podemos crear un decorador que añada
la lógica de caché.
*/

function ejemploCacheSimple() {
  function slow(x) {
    // Aquí podría existir una operación que consuma muchos recursos.
    console.log(`Llamada original con ${x}`);
    return x;
  }

  function cachingDecorator(func) {
    const cache = new Map();

    return function (x) {
      if (cache.has(x)) {
        return cache.get(x);
      }

      const resultado = func(x);

      cache.set(x, resultado);

      return resultado;
    };
  }

  const slowConCache = cachingDecorator(slow);

  console.log(slowConCache(1));
  console.log("Otra vez:", slowConCache(1));

  console.log(slowConCache(2));
  console.log("Otra vez:", slowConCache(2));
}

/*
El valor devuelto por `cachingDecorator(func)` es un envoltorio que ejecuta
`func(x)` dentro de una lógica de almacenamiento en caché.

Desde el exterior, la función sigue ofreciendo el mismo resultado, pero ahora
recuerda los resultados previamente calculados.

Ventajas de separar la caché mediante un decorador:

1. El decorador puede reutilizarse con otras funciones.
2. La lógica de caché queda separada de la función principal.
3. La función original mantiene un código más simple.
4. Pueden combinarse varios decoradores.
*/


/*
2. PROBLEMA DEL CONTEXTO this

El decorador anterior funciona correctamente con funciones normales de un argumento,
pero presenta un problema cuando la función original es un método que utiliza `this`.

El siguiente ejemplo produce intencionalmente un error.

El método original funciona porque:

    worker.slow(1)

establece `this` como `worker`.

Pero después de decorarlo, el envoltorio ejecuta:

    func(x)

Esa llamada pierde el contexto del objeto y la función original recibe
`this = undefined`.
*/

function ejemploPerdidaDeContexto() {
  const worker = {
    someMethod() {
      return 1;
    },

    slow(x) {
      console.log(`Llamada original con ${x}`);

      return x * this.someMethod();
    },
  };

  function cachingDecorator(func) {
    const cache = new Map();

    return function (x) {
      if (cache.has(x)) {
        return cache.get(x);
      }

      // Esta llamada no conserva el contexto del método.
      const resultado = func(x);

      cache.set(x, resultado);

      return resultado;
    };
  }

  console.log(worker.slow(1));

  worker.slow = cachingDecorator(worker.slow);

  // Error: la función original ya no recibe `worker` como `this`.
  console.log(worker.slow(2));
}


/*
La misma pérdida de contexto puede observarse al separar un método de su objeto.
*/

function ejemploMetodoSeparadoDelObjeto() {
  const worker = {
    someMethod() {
      return 1;
    },

    slow(x) {
      return x * this.someMethod();
    },
  };

  const func = worker.slow;

  // Error: `func` se ejecuta sin el contexto `worker`.
  console.log(func(2));
}


/*
3. func.call(context, ...args)

`func.call` permite ejecutar una función estableciendo explícitamente el valor
que tendrá `this`.

Sintaxis:

    func.call(context, arg1, arg2, ...)

El primer argumento se utiliza como `this`.
Los argumentos siguientes se entregan a la función.
*/

function ejemploCallConContextos() {
  function sayHi() {
    console.log(this.name);
  }

  const user = {
    name: "John",
  };

  const admin = {
    name: "Admin",
  };

  sayHi.call(user);
  sayHi.call(admin);
}


/*
También pueden pasarse argumentos normales después del contexto.
*/

function ejemploCallConArgumentos() {
  function say(phrase) {
    console.log(`${this.name}: ${phrase}`);
  }

  const user = {
    name: "John",
  };

  say.call(user, "Hello");
}


/*
Estas llamadas son prácticamente equivalentes respecto a los argumentos:

    func(1, 2, 3);
    func.call(obj, 1, 2, 3);

La diferencia es que la segunda establece explícitamente:

    this = obj
*/


/*
4. CORREGIR EL DECORADOR CON call

Cuando el método decorado se ejecuta como:

    worker.slow(2)

el envoltorio recibe:

    this = worker

Por lo tanto, puede reenviar ese mismo contexto hacia la función original usando:

    func.call(this, x)

Flujo:

worker.slow(2)
-> se ejecuta el envoltorio con this = worker
-> func.call(this, 2)
-> la función original recibe this = worker
*/

function ejemploDecoratorConContexto() {
  const worker = {
    someMethod() {
      return 1;
    },

    slow(x) {
      console.log(`Llamada original con ${x}`);

      return x * this.someMethod();
    },
  };

  function cachingDecorator(func) {
    const cache = new Map();

    return function (x) {
      if (cache.has(x)) {
        return cache.get(x);
      }

      const resultado = func.call(this, x);

      cache.set(x, resultado);

      return resultado;
    };
  }

  worker.slow = cachingDecorator(worker.slow);

  console.log(worker.slow(2));
  console.log(worker.slow(2));
}


/*
5. DECORADORES CON MÚLTIPLES ARGUMENTOS

El decorador anterior utiliza directamente el argumento `x` como clave del `Map`.

Esto funciona con:

    slow(x)

pero no es suficiente para una función como:

    slow(min, max)

porque ahora la caché debe identificar una combinación de argumentos.

`Map` utiliza un único valor como clave, por lo que necesitamos transformar varios
argumentos en una única clave.

El contenido plantea varias posibilidades:

1. Crear una estructura de datos capaz de manejar múltiples claves.
2. Utilizar mapas anidados.
3. Convertir los argumentos en un único valor mediante una función hash.

El ejemplo utiliza la tercera solución.
*/

function ejemploCacheMultiplesArgumentos() {
  const worker = {
    slow(min, max) {
      console.log(`Llamada original con ${min}, ${max}`);

      return min + max;
    },
  };

  function hash(args) {
    return `${args[0]},${args[1]}`;
  }

  function cachingDecorator(func, hashFunction) {
    const cache = new Map();

    return function () {
      const key = hashFunction(arguments);

      if (cache.has(key)) {
        return cache.get(key);
      }

      const resultado = func.call(this, ...arguments);

      cache.set(key, resultado);

      return resultado;
    };
  }

  worker.slow = cachingDecorator(worker.slow, hash);

  console.log(worker.slow(3, 5));
  console.log("Otra vez:", worker.slow(3, 5));
}

/*
Aquí ocurren dos cambios importantes.

Primero:

    hash(arguments)

convierte todos los argumentos recibidos por el envoltorio en una única clave.

Para los argumentos:

    3, 5

la función utilizada produce:

    "3,5"

Segundo:

    func.call(this, ...arguments)

reenvía a la función original tanto el contexto actual como todos los argumentos
recibidos por el envoltorio.
*/


/*
6. arguments

Dentro de una función tradicional puede utilizarse `arguments` para acceder a los
argumentos recibidos.

En el decorador universal se utiliza para:

1. Crear la clave de caché.
2. Reenviar todos los argumentos a la función original.

Ejemplo conceptual:

    return function () {
      const key = hash(arguments);

      const resultado = func.call(this, ...arguments);

      return resultado;
    };
*/


/*
7. func.apply(context, args)

En lugar de:

    func.call(this, ...arguments)

puede utilizarse:

    func.apply(this, arguments)

Sintaxis:

    func.apply(context, args)

`apply` ejecuta `func` estableciendo:

    this = context

y utiliza un objeto tipo array como lista de argumentos.
*/

function ejemploApply() {
  function mostrarDatos(a, b) {
    console.log(this.nombre, a, b);
  }

  const contexto = {
    nombre: "Contexto",
  };

  const argumentos = [1, 2];

  mostrarDatos.apply(contexto, argumentos);
}


/*
Estas dos formas realizan prácticamente la misma llamada:

    func.call(context, ...args);
    func.apply(context, args);

Diferencia:

`call` recibe los argumentos separados.

    func.call(context, arg1, arg2, arg3)

`apply` recibe los argumentos agrupados en un objeto tipo array.

    func.apply(context, args)

Además:

- La sintaxis de propagación `...` puede pasar un iterable a `call`.
- `apply` trabaja con un objeto tipo array.
*/


/*
8. REENVÍO DE LLAMADAS

Pasar a otra función tanto el contexto actual como todos los argumentos recibidos
se denomina reenvío de llamadas.

Una forma genérica es:

    function () {
      return func.apply(this, arguments);
    }

El envoltorio recibe una llamada y la transmite a la función original conservando
el contexto y los argumentos.
*/

function ejemploReenvioDeLlamadas() {
  function original(a, b) {
    console.log(this.nombre, a, b);

    return a + b;
  }

  const wrapper = function () {
    return original.apply(this, arguments);
  };

  const objeto = {
    nombre: "Objeto",
    ejecutar: wrapper,
  };

  console.log(objeto.ejecutar(2, 3));
}


/*
9. LIMITACIÓN DE arguments CON MÉTODOS DE ARRAY

Queremos mejorar la función hash para que funcione con cualquier cantidad de argumentos.

Podríamos intentar:

    function hash(args) {
      return args.join();
    }

Sin embargo, cuando se llama:

    hash(arguments)

`arguments` no es un array real, por lo que no dispone directamente del método `join`.
*/


function ejemploArgumentsSinJoin() {
  function hash() {
    // Error intencional:
    // `arguments` no posee directamente el método `join`.
    console.log(arguments.join());
  }

  hash(1, 2);
}


/*
10. PRÉSTAMO DE MÉTODOS

Aunque `arguments` no tenga su propio método `join`, podemos tomar prestado
`Array.prototype.join` mediante:

    [].join.call(arguments)

El método se obtiene de un array normal y se ejecuta utilizando `arguments`
como su contexto `this`.
*/

function ejemploPrestamoDeMetodo() {
  function hash() {
    console.log([].join.call(arguments));
  }

  hash(1, 2);
}


/*
La técnica anterior funciona porque `join` trabaja esencialmente con propiedades
del objeto utilizado como `this`.

De forma simplificada, su comportamiento consiste en:

1. Obtener el separador o utilizar ",".
2. Crear una cadena vacía.
3. Añadir `this[0]`.
4. Añadir el separador y `this[1]`.
5. Continuar con los siguientes elementos.
6. Detenerse según `this.length`.
7. Devolver el resultado.

Por ello puede trabajar con `arguments`, porque este objeto proporciona elementos
mediante índices y una propiedad `length`.
*/


/*
11. FUNCIÓN HASH PARA CUALQUIER CANTIDAD DE ARGUMENTOS

Mediante préstamo de métodos podemos escribir una función hash que una todos los
argumentos recibidos.
*/

function ejemploHashGenerico() {
  function hash(args) {
    return [].join.call(args);
  }

  function recibirArgumentos() {
    console.log(hash(arguments));
  }

  recibirArgumentos(1, 2, 3, 4);
}


/*
12. DECORADOR DE CACHÉ MÁS GENERAL

Podemos combinar los conceptos anteriores:

- `Map` para almacenar resultados.
- Una función hash para generar una clave.
- `arguments` para obtener todos los argumentos.
- `func.apply` para reenviar contexto y argumentos.
- Préstamo de `join` para convertir los argumentos en una clave.
*/

function ejemploDecoratorGeneral() {
  const worker = {
    slow(min, max) {
      console.log(`Llamada original con ${min}, ${max}`);

      return min + max;
    },
  };

  function hash(args) {
    return [].join.call(args);
  }

  function cachingDecorator(func, hashFunction) {
    const cache = new Map();

    return function () {
      const key = hashFunction(arguments);

      if (cache.has(key)) {
        return cache.get(key);
      }

      const resultado = func.apply(this, arguments);

      cache.set(key, resultado);

      return resultado;
    };
  }

  worker.slow = cachingDecorator(worker.slow, hash);

  console.log(worker.slow(3, 5));
  console.log(worker.slow(3, 5));

  console.log(worker.slow(4, 7));
  console.log(worker.slow(4, 7));
}


/*
13. DECORADORES Y PROPIEDADES DE LAS FUNCIONES

Normalmente es posible sustituir una función o método por su versión decorada.

Sin embargo, existe una limitación:

Si la función original posee propiedades propias, el envoltorio creado por el
decorador no las proporciona automáticamente.

Por ejemplo, conceptualmente:

    func.propiedad = valor;

    func = decorador(func);

La nueva función es un envoltorio diferente y no conserva automáticamente
las propiedades de la función anterior.

Algunos decoradores también pueden añadir propiedades propias. Por ejemplo,
podrían almacenar información acerca del número de llamadas realizadas o del
tiempo utilizado.

El contenido indica que existe otra técnica para mantener acceso a propiedades
mediante `Proxy`, pero ese tema se estudia posteriormente.
*/


/*
RESUMEN

1. Un decorador es una función que envuelve otra función para modificar o ampliar
   su comportamiento sin cambiar directamente el código original.

2. Un decorador de caché puede recordar resultados previamente calculados y evitar
   llamadas repetidas a una función costosa.

3. Un envoltorio que llama simplemente:

       func(x)

   puede perder el contexto `this` de un método.

4. `func.call` permite establecer explícitamente el contexto:

       func.call(context, arg1, arg2, ...)

5. Dentro de un decorador puede conservarse el contexto actual mediante:

       func.call(this, x)

6. Para reenviar múltiples argumentos puede utilizarse:

       func.call(this, ...arguments)

7. `func.apply` ofrece otra forma de realizar la misma operación:

       func.apply(this, arguments)

8. `call` recibe los argumentos como una lista.

9. `apply` recibe los argumentos agrupados en un objeto tipo array.

10. Reenviar contexto y argumentos hacia otra función se denomina reenvío de llamadas.

11. Una forma genérica de reenvío es:

       function () {
         return func.apply(this, arguments);
       }

12. `arguments` es similar a un array, pero no es un array real y no posee directamente
    métodos como `join`.

13. Un método puede tomarse prestado de otro objeto mediante `call`:

       [].join.call(arguments)

14. Este préstamo permite utilizar `join` sobre `arguments` y generar una clave
    para una caché con múltiples argumentos.

15. Los decoradores no conservan automáticamente las propiedades propias de la
    función original.
*/


/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos que producen errores intencionales permanecen desactivados.
*/

// ejemploCacheSimple();
// ejemploPerdidaDeContexto();
// ejemploMetodoSeparadoDelObjeto();
// ejemploCallConContextos();
// ejemploCallConArgumentos();
// ejemploDecoratorConContexto();
// ejemploCacheMultiplesArgumentos();
// ejemploApply();
// ejemploReenvioDeLlamadas();
// ejemploArgumentsSinJoin();
// ejemploPrestamoDeMetodo();
// ejemploHashGenerico();
// ejemploDecoratorGeneral();
/*
ITERACIÓN ASÍNCRONA Y GENERADORES

La iteración asíncrona permite recorrer datos que llegan de forma asíncrona
y bajo demanda, por ejemplo, datos recibidos por partes a través de una red.

Los generadores asíncronos permiten implementar este tipo de iteración
de una forma más cómoda y compacta.

Fuente del contenido proporcionado: :contentReference[oaicite:0]{index=0}
*/


/*
1. REPASO: ITERABLES SÍNCRONOS

Para que un objeto pueda utilizarse con `for..of`, debe proporcionar
un método especial llamado `Symbol.iterator`.

Funcionamiento:

1. `for..of` llama una vez a `objeto[Symbol.iterator]()`.
2. Ese método devuelve un objeto iterador.
3. El iterador debe tener un método `next()`.
4. En cada iteración se llama a `next()`.
5. `next()` devuelve un objeto:

   { done: false, value: valor }

   mientras existan valores.

6. Cuando termina la iteración devuelve:

   { done: true }
*/

function ejemploIterableSincrono() {
  const rango = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
      return {
        current: this.from,
        last: this.to,

        next() {
          if (this.current <= this.last) {
            return {
              done: false,
              value: this.current++,
            };
          }

          return { done: true };
        },
      };
    },
  };

  for (const valor of rango) {
    console.log(valor);
  }
}

/*
Resultado:

1
2
3
4
5

`Symbol.iterator` crea el iterador y `next()` entrega los valores uno por uno.
*/


/*
2. ITERABLES ASÍNCRONOS

La iteración asíncrona se utiliza cuando los valores no están disponibles
inmediatamente.

Por ejemplo, puede existir un retraso o puede ser necesario realizar
una solicitud de red antes de obtener el siguiente valor.

Para convertir un objeto en iterable asíncrono:

1. Se utiliza `Symbol.asyncIterator` en lugar de `Symbol.iterator`.

2. El método `next()` debe devolver una `Promise` que se resuelva con
   el siguiente resultado de la iteración.

3. Podemos declarar `next()` como `async` para poder utilizar `await`
   dentro de él.

4. Para recorrer el iterable se utiliza:

   for await (const valor of iterable) {
     ...
   }

La diferencia fundamental es que la obtención del siguiente valor
puede requerir esperar.
*/

async function ejemploIterableAsincrono() {
  const rango = {
    from: 1,
    to: 5,

    [Symbol.asyncIterator]() {
      return {
        current: this.from,
        last: this.to,

        async next() {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (this.current <= this.last) {
            return {
              done: false,
              value: this.current++,
            };
          }

          return { done: true };
        },
      };
    },
  };

  for await (const valor of rango) {
    console.log(valor);
  }
}

/*
Flujo:

Symbol.asyncIterator
-> next()
-> espera 1 segundo
-> Promise resuelta con { done: false, value }
-> for await obtiene el valor
-> vuelve a llamar a next()

Los valores aparecen uno por segundo:

1
2
3
4
5
*/


/*
3. ITERADORES SÍNCRONOS VS. ASÍNCRONOS

Iterable síncrono:

Método:
Symbol.iterator

Retorno de next():
{ value: ..., done: true/false }

Bucle:
for..of


Iterable asíncrono:

Método:
Symbol.asyncIterator

Retorno de next():
Promise que se resuelve en:

{ value: ..., done: true/false }

Bucle:
for await..of
*/


/*
4. LA SINTAXIS DE PROPAGACIÓN NO FUNCIONA CON ITERABLES ASÍNCRONOS

Las operaciones que esperan iteradores síncronos buscan `Symbol.iterator`.

Por eso un objeto que solamente tiene `Symbol.asyncIterator`
no puede utilizarse directamente con la sintaxis `...`.

El siguiente ejemplo produciría un error porque `rango`
no proporciona `Symbol.iterator`.
*/

function ejemploPropagacionNoAsincrona() {
  const rango = {
    from: 1,
    to: 5,

    async *[Symbol.asyncIterator]() {
      for (let valor = this.from; valor <= this.to; valor++) {
        yield valor;
      }
    },
  };

  // Error: no existe Symbol.iterator.
  // console.log([...rango]);
}

/*
Por la misma razón, un `for..of` normal no sustituye a `for await..of`.

`for..of` busca `Symbol.iterator`.

`for await..of` puede trabajar con la iteración asíncrona proporcionada
mediante `Symbol.asyncIterator`.
*/


/*
5. REPASO: GENERADORES SÍNCRONOS

Los generadores son funciones que producen valores.

Se declaran utilizando `function*` y generan valores mediante `yield`.

Sus valores pueden recorrerse con `for..of`.
*/

function* generarSecuencia(inicio, fin) {
  for (let numero = inicio; numero <= fin; numero++) {
    yield numero;
  }
}

function ejemploGeneradorSincrono() {
  for (const valor of generarSecuencia(1, 5)) {
    console.log(valor);
  }
}

/*
Resultado:

1
2
3
4
5

Cada `yield` entrega un valor y suspende temporalmente la ejecución
del generador hasta que se solicita el siguiente.
*/


/*
6. USAR UN GENERADOR COMO Symbol.iterator

Una práctica común consiste en implementar `Symbol.iterator`
mediante un generador.

Esto permite escribir un iterable síncrono de forma más compacta,
sin implementar manualmente el objeto con `next()`.
*/

function ejemploIterableConGenerador() {
  const rango = {
    from: 1,
    to: 5,

    *[Symbol.iterator]() {
      for (let valor = this.from; valor <= this.to; valor++) {
        yield valor;
      }
    },
  };

  for (const valor of rango) {
    console.log(valor);
  }
}

/*
Esta sintaxis:

*[Symbol.iterator]() {
  ...
}

es una forma abreviada de utilizar una función generadora
como método `Symbol.iterator`.

El generador se encarga de proporcionar el protocolo de iteración.
*/


/*
7. LIMITACIÓN DE LOS GENERADORES SÍNCRONOS

Los generadores normales producen sus valores de forma síncrona.

No podemos utilizar `await` dentro de un generador normal.

Cuando necesitamos esperar promesas, retrasos o solicitudes de red
antes de producir cada valor, necesitamos un generador asíncrono.
*/


/*
8. GENERADORES ASÍNCRONOS

Un generador asíncrono combina:

async
+
function*
+
yield
+
await

Su declaración utiliza:

async function* nombre() {
  ...
}

Al ser asíncrono, puede utilizar `await` dentro de su cuerpo.

Al ser generador, puede producir múltiples valores mediante `yield`.

Para recorrer sus valores usamos `for await..of`.
*/

async function* generarSecuenciaAsincrona(inicio, fin) {
  for (let numero = inicio; numero <= fin; numero++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    yield numero;
  }
}

async function ejemploGeneradorAsincrono() {
  const generador = generarSecuenciaAsincrona(1, 5);

  for await (const valor of generador) {
    console.log(valor);
  }
}

/*
Resultado:

1
2
3
4
5

Existe aproximadamente un segundo de espera entre cada valor.

Flujo:

for await solicita siguiente valor
-> el generador ejecuta await
-> termina la espera
-> yield produce el valor
-> for await recibe el valor
-> solicita el siguiente
*/


/*
9. generator.next() EN UN GENERADOR ASÍNCRONO

Existe una diferencia importante entre generadores normales
y generadores asíncronos.

En un generador normal:

const resultado = generador.next();

`resultado` contiene directamente:

{
  value: ...,
  done: true/false
}

En un generador asíncrono, `generator.next()` devuelve una `Promise`.

Por eso debemos esperar el resultado:

const resultado = await generador.next();

Después de resolver la promesa obtenemos:

{
  value: ...,
  done: true/false
}

Esta es la razón por la que los generadores asíncronos funcionan
naturalmente con `for await..of`.
*/

async function ejemploNextAsincrono() {
  const generador = generarSecuenciaAsincrona(1, 2);

  const primerResultado = await generador.next();
  console.log(primerResultado);

  const segundoResultado = await generador.next();
  console.log(segundoResultado);

  const resultadoFinal = await generador.next();
  console.log(resultadoFinal);
}


/*
10. Symbol.asyncIterator CON UN GENERADOR ASÍNCRONO

Así como un generador normal puede implementar `Symbol.iterator`,
un generador asíncrono puede implementar `Symbol.asyncIterator`.

Esto permite crear un iterable asíncrono de forma mucho más compacta.
*/

async function ejemploRangoConGeneradorAsincrono() {
  const rango = {
    from: 1,
    to: 5,

    async *[Symbol.asyncIterator]() {
      for (let valor = this.from; valor <= this.to; valor++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        yield valor;
      }
    },
  };

  for await (const valor of rango) {
    console.log(valor);
  }
}

/*
La declaración:

async *[Symbol.asyncIterator]() {
  ...
}

equivale conceptualmente a definir `Symbol.asyncIterator`
mediante una función generadora asíncrona.

Ahora el propio objeto `rango` puede utilizarse directamente
con `for await..of`.
*/


/*
11. UN OBJETO PUEDE TENER AMBOS TIPOS DE ITERACIÓN

Técnicamente, un objeto puede implementar simultáneamente:

Symbol.iterator

y

Symbol.asyncIterator

De esta manera podría recorrerse tanto mediante:

for..of

como mediante:

for await..of

Sin embargo, el contenido indica que hacerlo sería algo extraño
en la práctica.
*/


/*
12. CASO REAL: DATOS PAGINADOS

Muchos servicios entregan grandes conjuntos de datos por páginas.

Por ejemplo:

1. Se solicita una primera página.
2. La respuesta contiene un conjunto limitado de elementos.
3. La respuesta proporciona información para encontrar la página siguiente.
4. Se solicita esa siguiente página.
5. El proceso continúa hasta que no existen más páginas.

Un generador asíncrono puede ocultar todo ese proceso interno.

Desde el exterior solamente vemos una secuencia de elementos
que podemos recorrer mediante `for await..of`.
*/


/*
13. EJEMPLO: COMMITS PAGINADOS DE GITHUB

El contenido utiliza GitHub como ejemplo.

La solicitud inicial tiene la forma:

https://api.github.com/repos/<repo>/commits

La respuesta contiene:

- Un JSON con commits.
- Un encabezado `Link` que puede contener la URL de la página siguiente.

El generador realiza las solicitudes necesarias y entrega cada commit
individualmente con `yield`.

Este ejemplo depende del navegador y realiza solicitudes de red,
por lo que no se ejecuta automáticamente.
*/

async function* obtenerCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Our script",
      },
    });

    const commits = await response.json();

    let paginaSiguiente = response.headers
      .get("Link")
      .match(/<(.*?)>; rel="next"/);

    paginaSiguiente = paginaSiguiente?.[1];

    url = paginaSiguiente;

    for (const commit of commits) {
      yield commit;
    }
  }
}

/*
Flujo interno del generador:

1. Se construye la URL de la primera página.

2. `fetch()` espera la respuesta.

3. `response.json()` obtiene el arreglo de commits.

4. Se consulta el encabezado `Link`.

5. Una expresión regular intenta extraer la URL cuya relación es "next".

6. Esa URL se guarda para la siguiente iteración de `while`.

7. Los commits de la página actual se producen uno por uno mediante `yield`.

8. Cuando terminan los commits de esa página, continúa `while`.

9. Si existe otra URL, se descarga la página siguiente.

10. Si ya no existe una página siguiente, termina el generador.

Todo el mecanismo de paginación queda oculto para quien consume
`obtenerCommits()`.
*/


/*
14. CONSUMIR LOS COMMITS

Desde el exterior, no necesitamos gestionar páginas ni URLs.

Simplemente utilizamos `for await..of`.

El siguiente ejemplo muestra autores de commits y se detiene
después de 100 elementos.

Depende de una solicitud de red, por lo que no se ejecuta automáticamente.
*/

async function ejemploCommitsPaginados() {
  let cantidad = 0;

  for await (
    const commit of obtenerCommits(
      "javascript-tutorial/en.javascript.info"
    )
  ) {
    console.log(commit.author.login);

    if (++cantidad === 100) {
      break;
    }
  }
}

/*
Desde el punto de vista del código consumidor:

for await (const commit of obtenerCommits(...)) {
  ...
}

parece una iteración normal.

Internamente, sin embargo, el generador realiza nuevas solicitudes
cuando necesita más datos.
*/


/*
15. COMPARACIÓN FINAL: ITERADORES

ITERABLE SÍNCRONO

Método:
Symbol.iterator

next() devuelve:
{ value: ..., done: true/false }

Bucle habitual:
for..of


ITERABLE ASÍNCRONO

Método:
Symbol.asyncIterator

next() devuelve:
Promise que se resuelve en:
{ value: ..., done: true/false }

Bucle habitual:
for await..of
*/


/*
16. COMPARACIÓN FINAL: GENERADORES

GENERADOR SÍNCRONO

Declaración:
function*

Puede producir valores con:
yield

next() devuelve:
{ value: ..., done: true/false }

Iteración:
for..of


GENERADOR ASÍNCRONO

Declaración:
async function*

Puede producir valores con:
yield

Puede esperar operaciones con:
await

next() devuelve:
Promise que se resuelve en:
{ value: ..., done: true/false }

Iteración:
for await..of
*/


/*
RESUMEN

1. Los iteradores y generadores normales son apropiados cuando los valores
   pueden obtenerse de forma síncrona.

2. `Symbol.iterator` proporciona un iterador síncrono.

3. Un iterador síncrono devuelve directamente resultados desde `next()`.

4. Los iterables síncronos se recorren normalmente mediante `for..of`.

5. Cuando los datos llegan con retraso podemos utilizar iteración asíncrona.

6. Un iterable asíncrono utiliza `Symbol.asyncIterator`.

7. Su método `next()` devuelve una `Promise` que se resuelve con
   `{ value, done }`.

8. Los iterables asíncronos se recorren mediante `for await..of`.

9. La sintaxis de propagación `...` espera `Symbol.iterator`,
   por lo que no funciona directamente con un objeto que solamente
   proporciona `Symbol.asyncIterator`.

10. Los generadores normales se declaran con `function*` y utilizan `yield`.

11. Un generador normal no puede utilizar `await`.

12. Los generadores asíncronos se declaran con `async function*`.

13. Dentro de un generador asíncrono podemos utilizar tanto `await`
    como `yield`.

14. `next()` de un generador asíncrono devuelve una `Promise`.

15. Un generador asíncrono puede utilizarse para implementar
    `Symbol.asyncIterator`.

16. Los generadores asíncronos resultan especialmente útiles cuando
    los datos llegan por partes.

17. Un ejemplo práctico es consumir datos paginados: el generador puede
    solicitar nuevas páginas internamente mientras el código consumidor
    simplemente recorre los elementos.

18. En desarrollo web también existen flujos de datos transmitidos
    por partes, como la descarga o subida de archivos grandes.

19. El contenido menciona además la API Streams disponible en algunos
    entornos, como los navegadores, para trabajar específicamente
    con este tipo de flujos.
*/


/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos asíncronos que contienen esperas tardarán varios segundos.

El ejemplo de commits realiza solicitudes de red.
*/

// ejemploIterableSincrono();

// ejemploIterableAsincrono();

// ejemploPropagacionNoAsincrona();

// ejemploGeneradorSincrono();

// ejemploIterableConGenerador();

// ejemploGeneradorAsincrono();

// ejemploNextAsincrono();

// ejemploRangoConGeneradorAsincrono();

// ejemploCommitsPaginados();
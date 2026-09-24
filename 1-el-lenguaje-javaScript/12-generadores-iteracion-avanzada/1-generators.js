/*
GENERADORES

Los generadores son funciones especiales que pueden producir varios valores,
uno tras otro y bajo demanda.

A diferencia de una función regular, que devuelve un único valor o no devuelve
ninguno, un generador puede pausar su ejecución y continuarla más adelante.

Los generadores funcionan especialmente bien con objetos iterables y permiten
crear flujos de datos de forma sencilla.

Fuente del contenido: javascript.info.
:contentReference[oaicite:0]{index=0}
*/

/*
1. FUNCIONES GENERADORAS

Una función generadora se declara utilizando `function*`.

Dentro de ella se puede utilizar `yield` para producir valores.

Cuando se llama a una función generadora, su código no se ejecuta
inmediatamente. En su lugar, se devuelve un objeto generador que controla
la ejecución de la función.
*/

function ejemploCreacionGenerador() {
  function* generarSecuencia() {
    yield 1;
    yield 2;
    return 3;
  }

  const generador = generarSecuencia();

  alert(generador); // [object Generator]
}

/*
2. EL MÉTODO next()

El método principal de un generador es `next()`.

Cada llamada a `next()` continúa la ejecución del generador hasta encontrar
el siguiente `yield`.

Cuando llega a un `yield`:

1. Se produce su valor.
2. La ejecución del generador se pausa.
3. `next()` devuelve un objeto con esta estructura:

{
  value: valorProducido,
  done: false
}

La propiedad `done` indica si el generador terminó:

- `false`: todavía quedan instrucciones por ejecutar.
- `true`: el generador ha terminado.

Cuando se alcanza un `return`, su valor aparece como `value` y `done`
pasa a ser `true`.
*/

function ejemploNext() {
  function* generarSecuencia() {
    yield 1;
    yield 2;
    return 3;
  }

  const generador = generarSecuencia();

  const primero = generador.next();
  alert(JSON.stringify(primero)); // {"value":1,"done":false}

  const segundo = generador.next();
  alert(JSON.stringify(segundo)); // {"value":2,"done":false}

  const tercero = generador.next();
  alert(JSON.stringify(tercero)); // {"value":3,"done":true}
}

/*
Una vez finalizado el generador, las siguientes llamadas a `next()` ya no
reanudarán su ejecución.
*/

function ejemploGeneradorFinalizado() {
  function* generarSecuencia() {
    yield 1;
  }

  const generador = generarSecuencia();

  generador.next(); // { value: 1, done: false }
  generador.next(); // { value: undefined, done: true }
  generador.next(); // { value: undefined, done: true }
}

/*
3. POSICIÓN DEL ASTERISCO

Estas dos formas son válidas:

function* nombre() {}
function *nombre() {}

Normalmente se prefiere:

function* nombre() {}

El asterisco describe que la función es generadora, por lo que suele
mantenerse junto a la palabra `function`.
*/

/*
4. LOS GENERADORES SON ITERABLES

Los objetos generadores son iterables.

Por eso pueden recorrerse directamente con `for..of`.

Existe una diferencia importante entre `yield` y `return` durante esta
iteración:

`for..of` solo procesa valores cuyo resultado tenga `done: false`.

Por lo tanto, el valor devuelto mediante `return` cuando `done: true`
no aparece en el recorrido.
*/

function ejemploGeneradorConForOfYReturn() {
  function* generarSecuencia() {
    yield 1;
    yield 2;
    return 3;
  }

  const generador = generarSecuencia();

  for (const valor of generador) {
    alert(valor);
  }

  // Muestra 1 y después 2.
  // El valor 3 del `return` no se procesa con `for..of`.
}

/*
Si queremos que todos los valores formen parte de la iteración,
debemos producirlos con `yield`.
*/

function ejemploGeneradorCompletoConForOf() {
  function* generarSecuencia() {
    yield 1;
    yield 2;
    yield 3;
  }

  const generador = generarSecuencia();

  for (const valor of generador) {
    alert(valor);
  }

  // Muestra: 1, 2, 3.
}

/*
5. SINTAXIS DE PROPAGACIÓN

Como los generadores son iterables, también pueden utilizarse con la sintaxis
de propagación `...`.

En este caso, los valores generados se convierten en elementos de un array.
*/

function ejemploSpreadConGenerador() {
  function* generarSecuencia() {
    yield 1;
    yield 2;
    yield 3;
  }

  const secuencia = [0, ...generarSecuencia()];

  alert(secuencia); // 0,1,2,3
}

/*
6. GENERADORES PARA IMPLEMENTAR ITERABLES

Un objeto puede hacerse iterable implementando `Symbol.iterator`.

Sin generadores, `Symbol.iterator` necesita devolver un objeto que contenga
un método `next()` encargado de producir objetos con las propiedades
`value` y `done`.
*/

function ejemploIterableSinGenerador() {
  const rango = {
    desde: 1,
    hasta: 5,

    [Symbol.iterator]() {
      return {
        actual: this.desde,
        ultimo: this.hasta,

        next() {
          if (this.actual <= this.ultimo) {
            return {
              done: false,
              value: this.actual++,
            };
          }

          return {
            done: true,
          };
        },
      };
    },
  };

  alert([...rango]); // 1,2,3,4,5
}

/*
La misma funcionalidad puede implementarse de forma más compacta utilizando
una función generadora como `Symbol.iterator`.

La sintaxis:

*[Symbol.iterator]() {}

es una forma abreviada de:

[Symbol.iterator]: function* () {}

Esto funciona porque el generador devuelto cumple exactamente lo que
`for..of` necesita:

- Tiene un método `.next()`.
- `.next()` devuelve objetos con `value` y `done`.
*/

function ejemploIterableConGenerador() {
  const rango = {
    desde: 1,
    hasta: 5,

    *[Symbol.iterator]() {
      for (let valor = this.desde; valor <= this.hasta; valor++) {
        yield valor;
      }
    },
  };

  alert([...rango]); // 1,2,3,4,5
}

/*
Los generadores fueron diseñados teniendo en cuenta los iteradores,
por lo que facilitan considerablemente su implementación.
*/

/*
7. GENERADORES INDEFINIDOS

Un generador no está obligado a producir una cantidad finita de valores.

Puede generar valores indefinidamente.

Si se recorre un generador infinito con `for..of`, debe existir alguna forma
de detener el recorrido, como `break` o `return`.

De lo contrario, el bucle continuaría para siempre.
*/

/*
8. COMPOSICIÓN DE GENERADORES

La composición permite insertar el flujo de un generador dentro de otro.

Para ello existe la sintaxis:

yield* otroGenerador

`yield*` delega la ejecución al generador indicado y reenvía sus resultados
al exterior como si hubieran sido producidos directamente por el generador
que realiza la delegación.
*/

function ejemploComposicionGeneradores() {
  function* generarSecuencia(inicio, fin) {
    for (let numero = inicio; numero <= fin; numero++) {
      yield numero;
    }
  }

  function* generarCodigosContrasena() {
    // 0..9
    yield* generarSecuencia(48, 57);

    // A..Z
    yield* generarSecuencia(65, 90);

    // a..z
    yield* generarSecuencia(97, 122);
  }

  let texto = "";

  for (const codigo of generarCodigosContrasena()) {
    texto += String.fromCharCode(codigo);
  }

  alert(texto); // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
}

/*
El ejemplo anterior es equivalente, en cuanto a los valores producidos,
a escribir directamente todos los bucles dentro del mismo generador.
*/

function ejemploComposicionSinYieldEstrella() {
  function* generarCodigosAlfanumericos() {
    for (let codigo = 48; codigo <= 57; codigo++) {
      yield codigo;
    }

    for (let codigo = 65; codigo <= 90; codigo++) {
      yield codigo;
    }

    for (let codigo = 97; codigo <= 122; codigo++) {
      yield codigo;
    }
  }

  let texto = "";

  for (const codigo of generarCodigosAlfanumericos()) {
    texto += String.fromCharCode(codigo);
  }

  alert(texto); // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
}

/*
La composición permite reutilizar generadores sin tener que almacenar
resultados intermedios en memoria.
*/

/*
9. yield ES UNA VÍA DE DOBLE SENTIDO

`yield` no solo puede enviar un valor desde el generador hacia el código
externo.

El código externo también puede enviar un valor hacia el generador mediante:

generator.next(valor)

Ese argumento se convierte en el resultado de la expresión `yield` que tenía
pausada la ejecución.

IMPORTANTE:

La primera llamada a `next()` debe realizarse sin argumento.

Su función es iniciar la ejecución del generador y avanzar hasta el primer
`yield`. Si se proporciona un argumento en esa primera llamada, se ignora.
*/

function ejemploEnviarValorAlGenerador() {
  function* preguntar() {
    const resultado = yield "2 + 2 = ?";

    alert(resultado);
  }

  const generador = preguntar();

  const pregunta = generador.next().value;
  alert(pregunta); // 2 + 2 = ?

  generador.next(4);

  // Flujo:
  // next() -> yield produce la pregunta -> pausa
  // next(4) -> 4 se convierte en el resultado de yield -> continúa
}

/*
El código externo puede esperar antes de reanudar un generador.

Mientras no se vuelva a llamar a `next()`, el generador permanece pausado.
*/

// Este ejemplo depende de temporización del entorno.
function ejemploReanudarGeneradorMasTarde() {
  function* preguntar() {
    const resultado = yield "2 + 2 = ?";
    alert(resultado);
  }

  const generador = preguntar();

  generador.next();

  setTimeout(() => {
    generador.next(4);
  }, 1000);
}

/*
10. INTERCAMBIO DE VARIOS VALORES

Cada `next(valor)`, excepto el primero, puede enviar un valor hacia el
generador.

Ese valor se convierte en el resultado del `yield` donde el generador
estaba pausado.

Después, la ejecución continúa hasta encontrar el siguiente `yield` o
hasta finalizar la función.
*/

function ejemploIntercambioDeValores() {
  function* preguntar() {
    const respuesta1 = yield "2 + 2 = ?";

    alert(respuesta1); // 4

    const respuesta2 = yield "3 * 3 = ?";

    alert(respuesta2); // 9
  }

  const generador = preguntar();

  alert(generador.next().value); // 2 + 2 = ?
  alert(generador.next(4).value); // 3 * 3 = ?
  alert(generador.next(9).done); // true
}

/*
Flujo del ejemplo:

1. `next()` inicia el generador.
2. El primer `yield` produce "2 + 2 = ?" y pausa la ejecución.
3. `next(4)` introduce `4` como resultado del primer `yield`.
4. El generador continúa hasta el segundo `yield`.
5. El segundo `yield` produce "3 * 3 = ?".
6. `next(9)` introduce `9` como resultado del segundo `yield`.
7. La función llega al final.
8. El resultado tiene `done: true`.

Puede imaginarse como un intercambio de "ping-pong":

código externo -> next(valor) -> generador
generador -> yield valor -> código externo
*/

/*
11. generator.throw(error)

El código externo también puede enviar un error hacia un generador.

Se utiliza:

generator.throw(error)

El error se lanza exactamente en la posición del `yield` donde el generador
se encuentra pausado.

Si existe un `try..catch` dentro del generador, puede capturar ese error.
*/

/*
Este ejemplo lanza intencionalmente un error dentro del generador,
pero el propio generador lo captura.
*/

function ejemploThrowCapturadoDentro() {
  function* preguntar() {
    try {
      const resultado = yield "2 + 2 = ?";

      alert(
        "Esta línea no se ejecuta porque se lanza una excepción en el yield.",
      );

      return resultado;
    } catch (error) {
      alert(error);
    }
  }

  const generador = preguntar();

  generador.next();

  generador.throw(
    new Error("La respuesta no se encuentra en mi base de datos"),
  );
}

/*
Flujo:

1. `next()` pausa la ejecución en `yield`.
2. `generator.throw(error)` reanuda el generador.
3. El error aparece como si se hubiera lanzado en esa línea de `yield`.
4. El `catch` interno lo captura.
*/

/*
12. ERRORES NO CAPTURADOS DENTRO DEL GENERADOR

Si el generador no captura el error enviado mediante `throw()`, la excepción
sale del generador.

Entonces puede capturarse alrededor de la propia llamada
`generator.throw(...)`.
*/

/*
Este ejemplo produce un error intencional, pero se captura en el código
externo.
*/

function ejemploThrowCapturadoFuera() {
  function* generar() {
    const resultado = yield "2 + 2 = ?";
    return resultado;
  }

  const generador = generar();

  generador.next();

  try {
    generador.throw(
      new Error("La respuesta no se encuentra en mi base de datos"),
    );
  } catch (error) {
    alert(error);
  }
}

/*
Si el error tampoco se captura en el código externo, continuará propagándose
como cualquier otra excepción y puede terminar la ejecución del script.
*/

/*
13. generator.return(valor)

`generator.return(valor)` finaliza inmediatamente la ejecución del generador.

El resultado contiene:

{
  value: valor,
  done: true
}

Después de eso, el generador permanece terminado.
*/

function ejemploReturnGenerador() {
  function* generar() {
    yield 1;
    yield 2;
    yield 3;
  }

  const generador = generar();

  console.log(generador.next());
  // { value: 1, done: false }

  console.log(generador.return("fin"));
  // { value: "fin", done: true }

  console.log(generador.next());
  // { value: undefined, done: true }
}

/*
`generator.return()` no suele ser necesario cuando queremos consumir todos
los valores producidos.

Puede resultar útil cuando necesitamos detener el generador al cumplirse una
condición determinada.
*/

/*
14. DIFERENCIAS IMPORTANTES PARA RECORDAR

`yield`:
- Produce un valor.
- Pausa el generador.
- Permite reanudarlo más adelante.
- Puede recibir como resultado el argumento de una llamada posterior
  a `next(valor)`.

`return` dentro del generador:
- Finaliza el generador.
- Devuelve un resultado con `done: true`.
- Su valor no se procesa mediante `for..of`.

`next()`:
- Inicia o reanuda el generador.
- Devuelve un objeto `{ value, done }`.

`next(valor)`:
- Después de la primera llamada, introduce `valor` como resultado del
  `yield` actual.

`yield*`:
- Delega la producción de valores a otro generador.

`throw(error)`:
- Introduce un error en el `yield` donde el generador está pausado.

`return(valor)`:
- Finaliza externamente el generador y devuelve ese valor con `done: true`.
*/

/*
RESUMEN

1. Los generadores se crean con `function*`.

2. Dentro de un generador puede utilizarse `yield` para producir múltiples
   valores.

3. Llamar a una función generadora no ejecuta inmediatamente su cuerpo.
   Devuelve un objeto generador.

4. `generator.next()` reanuda la ejecución hasta el siguiente `yield`.

5. `next()` devuelve objetos con las propiedades `value` y `done`.

6. Cuando `done` es `false`, el generador todavía puede continuar.

7. Cuando `done` es `true`, el generador ha terminado.

8. Los generadores son iterables y pueden utilizarse con `for..of`.

9. `for..of` ignora el valor final asociado a `done: true`, por lo que un
   valor producido mediante `return` no aparece en el recorrido.

10. Al ser iterables, los generadores también pueden utilizarse con `...`.

11. Una función generadora puede implementarse como `Symbol.iterator`,
    simplificando la creación de objetos iterables.

12. Los generadores pueden producir secuencias finitas o indefinidas.

13. `yield*` permite componer generadores delegando la producción de valores
    a otro generador.

14. `yield` funciona en ambas direcciones: puede enviar valores al exterior
    y recibir valores desde `next(valor)`.

15. La primera llamada a `next()` inicia el generador y debe hacerse sin un
    argumento significativo.

16. `generator.throw(error)` lanza un error en el `yield` donde el generador
    está pausado.

17. Ese error puede capturarse dentro del generador o propagarse hacia el
    código externo.

18. `generator.return(valor)` finaliza el generador y devuelve ese valor con
    `done: true`.

19. Una de las características particulares de los generadores es que una
    función puede intercambiar datos con el código que la llama mientras su
    ejecución todavía no ha terminado.

20. También resultan especialmente útiles para crear objetos iterables.
*/

/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos que utilizan `alert` dependen de un entorno de navegador.
*/

// ejemploCreacionGenerador();
// ejemploNext();
// ejemploGeneradorFinalizado();
// ejemploGeneradorConForOfYReturn();
// ejemploGeneradorCompletoConForOf();
// ejemploSpreadConGenerador();
// ejemploIterableSinGenerador();
// ejemploIterableConGenerador();
// ejemploComposicionGeneradores();
// ejemploComposicionSinYieldEstrella();
// ejemploEnviarValorAlGenerador();
// ejemploReanudarGeneradorMasTarde();
// ejemploIntercambioDeValores();
// ejemploThrowCapturadoDentro();
// ejemploThrowCapturadoFuera();
// ejemploReturnGenerador();
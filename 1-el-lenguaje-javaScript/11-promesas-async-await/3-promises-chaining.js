/*
ENCADENAMIENTO DE PROMESAS

Una secuencia de tareas asíncronas puede necesitar ejecutarse una tras otra.
El encadenamiento de promesas permite transmitir el resultado de una operación
al siguiente manejador .then() de la cadena.

Fuente del contenido:
:chatgpt-content-reference{index="0"}
*/

/*
1. ENCADENAMIENTO BÁSICO

Cada llamada a .then() devuelve una nueva promesa.

Cuando un manejador devuelve un valor, ese valor se convierte en el resultado
de la promesa devuelta por .then(). El siguiente .then() recibe ese resultado.

Flujo:

promesa inicial
-> resolve(1)
-> primer .then() recibe 1 y devuelve 2
-> segundo .then() recibe 2 y devuelve 4
-> tercer .then() recibe 4
*/

function ejemploEncadenamientoBasico() {
  new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  })
    .then(function (resultado) {
      alert(resultado); // 1
      return resultado * 2;
    })
    .then(function (resultado) {
      alert(resultado); // 2
      return resultado * 2;
    })
    .then(function (resultado) {
      alert(resultado); // 4
      return resultado * 2;
    });
}

/*
La idea principal es que el resultado se transmite a través de la cadena.

Cada .then() trabaja con la promesa devuelta por el .then() anterior.
Por eso el resultado puede transformarse progresivamente:

1 -> 2 -> 4
*/


/*
2. VARIOS .then() SOBRE LA MISMA PROMESA NO FORMAN UNA CADENA

Es posible agregar varios manejadores .then() directamente a una misma promesa,
pero esto no es encadenamiento.

Cada manejador recibe de manera independiente el resultado original de la
promesa. Los valores devueltos por esos manejadores no se pasan entre ellos.

En este ejemplo, los tres manejadores reciben 1.
*/

function ejemploVariosThenIndependientes() {
  const promesa = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  });

  promesa.then(function (resultado) {
    alert(resultado); // 1
    return resultado * 2;
  });

  promesa.then(function (resultado) {
    alert(resultado); // 1
    return resultado * 2;
  });

  promesa.then(function (resultado) {
    alert(resultado); // 1
    return resultado * 2;
  });
}

/*
Diferencia importante:

Encadenamiento:

promesa
  .then(...)
  .then(...)
  .then(...)

Cada manejador recibe el resultado del anterior.

Manejadores independientes:

promesa.then(...)
promesa.then(...)
promesa.then(...)

Todos reciben el resultado de la misma promesa original.

En la práctica, el encadenamiento se utiliza con mucha más frecuencia.
*/


/*
3. DEVOLVER UNA PROMESA DESDE .then()

Un manejador de .then() también puede crear y devolver otra promesa.

Cuando eso ocurre, el resto de la cadena espera hasta que esa promesa se
estabilice. Después, su resultado se entrega al siguiente manejador.

Esto permite construir cadenas de acciones asíncronas.
*/

function ejemploDevolverPromesas() {
  new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  })
    .then(function (resultado) {
      alert(resultado); // 1

      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(resultado * 2), 1000);
      });
    })
    .then(function (resultado) {
      alert(resultado); // 2

      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(resultado * 2), 1000);
      });
    })
    .then(function (resultado) {
      alert(resultado); // 4
    });
}

/*
Flujo:

resolve(1)
-> primer .then()
-> devuelve una nueva Promise
-> la cadena espera
-> resolve(2)
-> segundo .then()
-> devuelve otra Promise
-> la cadena espera
-> resolve(4)
-> tercer .then()

El resultado sigue siendo:

1 -> 2 -> 4

Pero ahora existe un retraso de un segundo entre cada resultado.
*/


/*
4. CARGAR SCRIPTS EN SECUENCIA

El contenido utiliza la función loadScript() definida en el capítulo anterior.

Cada llamada a loadScript() devuelve una promesa. La siguiente carga comienza
solamente cuando la anterior se ha resuelto.

Este ejemplo depende del navegador y de una función loadScript() existente.
*/

function ejemploCargaScriptsSecuencial() {
  loadScript("/article/promise-chaining/one.js")
    .then(function (script) {
      return loadScript("/article/promise-chaining/two.js");
    })
    .then(function (script) {
      return loadScript("/article/promise-chaining/three.js");
    })
    .then(function (script) {
      one();
      two();
      three();
    });
}

/*
La misma cadena puede escribirse de forma más breve con funciones flecha.
*/

function ejemploCargaScriptsConFlechas() {
  loadScript("/article/promise-chaining/one.js")
    .then(script => loadScript("/article/promise-chaining/two.js"))
    .then(script => loadScript("/article/promise-chaining/three.js"))
    .then(script => {
      one();
      two();
      three();
    });
}

/*
La ventaja del encadenamiento es que el código permanece plano: crece hacia
abajo en lugar de anidarse progresivamente hacia la derecha.

Podemos añadir nuevas acciones asíncronas manteniendo esta estructura.
*/


/*
5. PROMESAS ANIDADAS EN LUGAR DE ENCADENADAS

Técnicamente, también podríamos agregar un .then() dentro de otro .then().
El resultado puede ser el mismo, pero el código comienza a crecer hacia la
derecha, reproduciendo el problema de las funciones de devolución de llamada.

Este ejemplo también depende de loadScript().
*/

function ejemploPromesasAnidadas() {
  loadScript("/article/promise-chaining/one.js").then(script1 => {
    loadScript("/article/promise-chaining/two.js").then(script2 => {
      loadScript("/article/promise-chaining/three.js").then(script3 => {
        one();
        two();
        three();
      });
    });
  });
}

/*
Generalmente se prefiere:

loadScript(...)
  .then(...)
  .then(...)
  .then(...)

en lugar de anidar manejadores.

Una posible razón para utilizar la forma anidada es que una función interna
puede acceder a las variables de los ámbitos externos.

En el ejemplo anterior, el manejador más interno tiene acceso a:

script1
script2
script3

Eso puede ser útil en algunos casos, pero es una excepción y no la regla.
*/


/*
6. OBJETOS THENABLE

Un manejador no tiene que devolver exactamente una instancia de Promise.

También puede devolver un objeto "thenable": un objeto que posee un método
invocable llamado .then().

JavaScript trata ese objeto de forma similar a una promesa.
*/

class Thenable {
  constructor(numero) {
    this.numero = numero;
  }

  then(resolve, reject) {
    alert(resolve); // function() { native code }

    setTimeout(() => resolve(this.numero * 2), 1000);
  }
}

function ejemploThenable() {
  new Promise(resolve => resolve(1))
    .then(resultado => {
      return new Thenable(resultado);
    })
    .then(alert); // Muestra 2 después de 1000 ms.
}

/*
Cuando un manejador devuelve un objeto, JavaScript comprueba si posee un método
invocable llamado then.

Si existe, JavaScript llama a ese método proporcionando funciones nativas
resolve y reject como argumentos y espera hasta que se invoque una de ellas.

En el ejemplo:

1. La promesa inicial se resuelve con 1.
2. El primer .then() devuelve new Thenable(1).
3. JavaScript encuentra su método then().
4. Después de un segundo se ejecuta resolve(2).
5. El siguiente .then() recibe 2.

Esto permite integrar objetos personalizados en cadenas de promesas sin que
tengan que heredar de Promise.
*/


/*
7. FETCH Y EL ENCADENAMIENTO DE PROMESAS

En programación frontend, las promesas se utilizan frecuentemente para
solicitudes de red.

La sintaxis básica mostrada en el contenido es:

let promise = fetch(url);

fetch() realiza una solicitud de red y devuelve una promesa.

Esa promesa se resuelve con un objeto response cuando el servidor remoto
responde con los encabezados, antes de que se haya descargado completamente
el contenido de la respuesta.
*/


/*
8. response.text()

Para obtener el texto completo de la respuesta se utiliza response.text().

response.text() devuelve otra promesa que se resuelve cuando el contenido
completo ha sido descargado.

Este ejemplo realiza una solicitud de red y depende del navegador.
*/

function ejemploFetchTexto() {
  fetch("/article/promise-chaining/user.json")
    .then(function (response) {
      return response.text();
    })
    .then(function (texto) {
      alert(texto); // {"name": "iliakan", "isAdmin": true}
    });
}

/*
Flujo:

fetch(...)
-> llega la respuesta del servidor
-> response.text()
-> espera la descarga completa del texto
-> siguiente .then()
-> recibe el texto
*/


/*
9. response.json()

El objeto response también posee response.json().

Este método lee los datos remotos y los analiza como JSON. Como devuelve una
promesa, puede integrarse directamente en la cadena.
*/

function ejemploFetchJson() {
  fetch("/article/promise-chaining/user.json")
    .then(response => response.json())
    .then(usuario => alert(usuario.name)); // iliakan
}


/*
10. ENCADENAR VARIAS SOLICITUDES

Después de obtener un usuario, el resultado puede utilizarse para iniciar otra
solicitud.

En este ejemplo:

1. Se obtiene user.json.
2. Se analiza como JSON.
3. Se utiliza user.name para consultar GitHub.
4. La respuesta de GitHub se analiza como JSON.
5. Se muestra el avatar durante tres segundos.

El ejemplo depende del navegador, de la red y del DOM.
*/

function ejemploAvatarSinPromesaFinal() {
  fetch("/article/promise-chaining/user.json")
    .then(response => response.json())
    .then(usuario => fetch(`https://api.github.com/users/${usuario.name}`))
    .then(response => response.json())
    .then(usuarioGithub => {
      const imagen = document.createElement("img");

      imagen.src = usuarioGithub.avatar_url;
      imagen.className = "promise-avatar-example";

      document.body.append(imagen);

      setTimeout(() => imagen.remove(), 3000);
    });
}

/*
PROBLEMA DEL EJEMPLO ANTERIOR

El último manejador inicia una operación asíncrona mediante setTimeout(), pero
no devuelve una promesa que represente esa operación.

Por eso la cadena no tiene una forma de esperar hasta que:

1. Pasen los tres segundos.
2. El avatar sea eliminado.
3. Termine realmente esa acción asíncrona.

Si quisiéramos continuar con otra acción después de eliminar el avatar,
necesitaríamos representar esa espera mediante una promesa.
*/


/*
11. HACER EXTENSIBLE LA CADENA

Para que la cadena pueda continuar después de que desaparezca el avatar,
el manejador debe devolver una nueva Promise.

La promesa solamente se resuelve después de eliminar la imagen.

El siguiente .then() espera esa resolución.
*/

function ejemploAvatarConPromesaFinal() {
  fetch("/article/promise-chaining/user.json")
    .then(response => response.json())
    .then(usuario => fetch(`https://api.github.com/users/${usuario.name}`))
    .then(response => response.json())
    .then(
      usuarioGithub =>
        new Promise(function (resolve, reject) {
          const imagen = document.createElement("img");

          imagen.src = usuarioGithub.avatar_url;
          imagen.className = "promise-avatar-example";

          document.body.append(imagen);

          setTimeout(() => {
            imagen.remove();
            resolve(usuarioGithub);
          }, 3000);
        })
    )
    .then(usuarioGithub => {
      alert(`Finished showing ${usuarioGithub.name}`);
    });
}

/*
Flujo:

fetch user.json
-> response.json()
-> fetch GitHub
-> response.json()
-> crear y mostrar avatar
-> devolver Promise
-> esperar 3 segundos
-> eliminar avatar
-> resolve(usuarioGithub)
-> siguiente .then()

La clave es que la acción asíncrona devuelve una promesa que representa su
finalización.

Como buena práctica presentada en el contenido, una acción asíncrona debe
devolver una promesa para permitir planificar acciones posteriores.
*/


/*
12. DIVIDIR LA CADENA EN FUNCIONES REUTILIZABLES

El mismo flujo puede separarse en funciones con responsabilidades concretas.

Este código depende del navegador, de fetch(), del DOM y de la red.
*/

function cargarJson(url) {
  return fetch(url).then(response => response.json());
}

function cargarUsuarioGithub(nombre) {
  return cargarJson(`https://api.github.com/users/${nombre}`);
}

function mostrarAvatar(usuarioGithub) {
  return new Promise(function (resolve, reject) {
    const imagen = document.createElement("img");

    imagen.src = usuarioGithub.avatar_url;
    imagen.className = "promise-avatar-example";

    document.body.append(imagen);

    setTimeout(() => {
      imagen.remove();
      resolve(usuarioGithub);
    }, 3000);
  });
}

function ejemploFuncionesReutilizables() {
  cargarJson("/article/promise-chaining/user.json")
    .then(usuario => cargarUsuarioGithub(usuario.name))
    .then(mostrarAvatar)
    .then(usuarioGithub => {
      alert(`Finished showing ${usuarioGithub.name}`);
    });
}


/*
RESUMEN

1. Cada llamada a .then() devuelve una nueva promesa.

2. Cuando un manejador devuelve un valor, ese valor se convierte en el
   resultado que recibe el siguiente .then().

3. Una cadena permite transformar resultados progresivamente:

   1 -> 2 -> 4

4. Agregar varios .then() directamente a una misma promesa no es
   encadenamiento. Todos esos manejadores reciben el mismo resultado original.

5. Un manejador puede devolver una Promise.

6. Si un manejador devuelve una promesa, el resto de la cadena espera hasta
   que esa promesa se estabilice.

7. Cuando la promesa devuelta termina, su resultado o error pasa al siguiente
   nivel de la cadena.

8. Devolver promesas permite construir secuencias de acciones asíncronas.

9. El encadenamiento mantiene el código plano y evita la anidación progresiva
   de manejadores.

10. Un manejador también puede devolver un objeto thenable: un objeto con un
    método invocable llamado then.

11. Los objetos thenable pueden integrarse en una cadena sin heredar de
    Promise.

12. fetch() devuelve una promesa que se resuelve con un objeto response cuando
    el servidor responde con los encabezados.

13. response.text() devuelve una promesa que obtiene el texto completo de la
    respuesta.

14. response.json() devuelve una promesa que lee y analiza la respuesta como
    JSON.

15. Si una acción asíncrona debe formar parte del flujo de una cadena, debe
    devolver una promesa que represente su finalización.

16. De esta forma, las acciones posteriores pueden esperar correctamente y la
    cadena permanece extensible.
*/


/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos utilizan alert(), setTimeout(), fetch(), operaciones de red,
funciones dependientes de otros scripts o manipulaciones del DOM, por lo que
no se ejecutan automáticamente.
*/

// ejemploEncadenamientoBasico();
// ejemploVariosThenIndependientes();
// ejemploDevolverPromesas();

// Requieren la función loadScript() y los scripts correspondientes:
// ejemploCargaScriptsSecuencial();
// ejemploCargaScriptsConFlechas();
// ejemploPromesasAnidadas();

// Usa alert() y setTimeout():
// ejemploThenable();

// Requieren navegador y solicitudes de red:
// ejemploFetchTexto();
// ejemploFetchJson();
// ejemploAvatarSinPromesaFinal();
// ejemploAvatarConPromesaFinal();
// ejemploFuncionesReutilizables();
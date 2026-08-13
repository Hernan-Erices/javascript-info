// ============================================================
// FUNCIONES DE FLECHA REVISADAS
// ============================================================
//
// Las funciones de flecha (=>) no son solamente una forma
// abreviada de escribir funciones pequeñas.
//
// Tienen características específicas que las diferencian de
// las funciones tradicionales:
//
//   - No tienen su propio `this`.
//   - No tienen su propio `arguments`.
//   - No pueden utilizarse con `new`.
//   - No tienen `super`.
//
// Son especialmente útiles cuando queremos crear una función
// pequeña y pasarla a otro lugar, manteniendo el contexto
// del entorno donde fue creada.
//
// Ejemplos:
//
//   arr.forEach(func)
//   setTimeout(func)
//   map(func)
//   filter(func)
//
// ============================================================


// ============================================================
// 1. LAS FUNCIONES DE FLECHA NO TIENEN `this`
// ============================================================
//
// Una función de flecha NO crea su propio `this`.
//
// Si utilizamos `this` dentro de una función de flecha,
// JavaScript lo busca en el entorno léxico exterior.
//
// Es decir, la flecha utiliza el `this` que ya existe
// en el lugar donde fue creada.
//
// ------------------------------------------------------------

// Ejemplo con un método de objeto:

let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
    // Aquí `this` pertenece al objeto `group`.
    //
    // Por lo tanto:
    //
    // this === group

    this.students.forEach(
      // Esta es una función de flecha.
      //
      // La flecha NO crea su propio `this`.
      // Por eso utiliza el `this` de showList().
        student => alert(this.title + ": " + student)
        );
    }
};

group.showList();

// Resultado:
//
// Our Group: John
// Our Group: Pete
// Our Group: Alice


// ============================================================
// 2. ¿QUÉ PASARÍA CON UNA FUNCIÓN REGULAR?
// ============================================================
//
// Una función tradicional SÍ tiene su propio `this`.
//
// Cuando `forEach` ejecuta una función regular, no le
// proporciona nuestro objeto `group` como `this`.
//
// En este caso, en modo estricto, `this` será `undefined`.
//
// ------------------------------------------------------------

// Ejemplo:
//
// let group = {
//   title: "Our Group",
//   students: ["John", "Pete", "Alice"],
//
//   showList() {
//     this.students.forEach(function(student) {
//       // `this` pertenece a esta función regular.
//       // No es el `this` de showList().
//
//       alert(this.title + ": " + student);
//     });
//   }
// };
//
// group.showList();
//
// Error:
//
// Cannot read properties of undefined


// ============================================================
// 3. ¿POR QUÉ LA FUNCIÓN DE FLECHA FUNCIONA?
// ============================================================
//
// La diferencia fundamental es:
//
// FUNCIÓN REGULAR:
//
// function () {
//   // Tiene su propio `this`.
// }
//
//
// FUNCIÓN DE FLECHA:
//
// () => {
//   // No tiene su propio `this`.
//   // Utiliza el `this` del entorno exterior.
// }
//
// ------------------------------------------------------------
//
// Podemos visualizarlo así:
//
//
// showList()
//     |
//     | this === group
//     |
//     └── forEach()
//             |
//             └── () => {
//                     // No tiene this propio.
//                     // Usa el this de showList().
//                 }
//
//
// ============================================================


// ============================================================
// 4. LAS FUNCIONES DE FLECHA NO PUEDEN USARSE CON `new`
// ============================================================
//
// Al no tener su propio `this`, las funciones de flecha
// tampoco pueden utilizarse como constructores.
//
// ------------------------------------------------------------

const User = () => {
  // ...
};

// Esto produce un error:
//
// const user = new User();
//
// TypeError: User is not a constructor


// Una función tradicional sí puede utilizarse con `new`:

function Person(name) {
    this.name = name;
}

const person = new Person("John");

console.log(person.name); // John


// ============================================================
// 5. FUNCIONES DE FLECHA VS `.bind(this)`
// ============================================================
//
// Una función de flecha y una función regular utilizando
// `.bind(this)` pueden parecer similares, pero funcionan
// de manera diferente.
//
// ------------------------------------------------------------
//
// `.bind(this)`
//
// Crea una nueva función cuyo `this` queda fijado.
//
// Ejemplo:

function sayHi() {
    console.log(this.name);
}

const user = {
    name: "John"
};

const boundSayHi = sayHi.bind(user);

boundSayHi(); // John


// En este caso:
//
// boundSayHi()
//     ↓
// sayHi()
//     ↓
// this === user
//
//
// `bind()` crea una versión vinculada de la función.
//
// ------------------------------------------------------------
//
// Función de flecha:
//
// const sayHi = () => {
//   console.log(this.name);
// };
//
// La flecha NO crea un enlace para `this`.
//
// Simplemente no tiene su propio `this`.
//
// Cuando se utiliza `this`, JavaScript lo busca en el
// entorno léxico exterior.
//
// ------------------------------------------------------------
//
// RESUMEN:
//
// `.bind(this)`
//   → crea una función vinculada con un `this` determinado.
//
// `=>`
//   → no tiene su propio `this`.
//   → utiliza el `this` del entorno exterior.
//
//
// ============================================================


// ============================================================
// 6. LAS FUNCIONES DE FLECHA NO TIENEN `arguments`
// ============================================================
//
// Las funciones de flecha tampoco tienen su propia variable
// `arguments`.
//
// Si necesitamos acceder a `arguments` dentro de una flecha,
// JavaScript buscará `arguments` en el entorno exterior.
//
// ------------------------------------------------------------

function example() {
  // Esta función regular sí tiene `arguments`.

    const arrow = () => {
    // La función de flecha NO tiene su propio `arguments`.
    //
    // Por lo tanto, utiliza el `arguments` de example().

        console.log(arguments);
    };

    arrow();
}

example("a", "b", "c");

// Resultado:
//
// [Arguments] { 0: "a", 1: "b", 2: "c" }


// ============================================================
// 7. USO DE `this` Y `arguments` EN DECORADORES
// ============================================================
//
// Esta característica resulta especialmente útil cuando
// creamos decoradores.
//
// Un decorador puede recibir una función y devolver otra
// función que modifica o retrasa su comportamiento.
//
// ------------------------------------------------------------
//
// `defer(f, ms)` recibe:
//
//   f  → función que queremos ejecutar.
//   ms → cantidad de milisegundos que queremos esperar.
//
// Devuelve una función que ejecutará `f` después del tiempo
// indicado.
//
// ------------------------------------------------------------

function defer(f, ms) {
    return function() {

    // Esta función exterior es regular, por lo que sí tiene:
    //
    // this
    // arguments
    //
    // La función de flecha que está dentro utilizará ambos
    // desde este entorno exterior.

    setTimeout(
        () => f.apply(this, arguments),
        ms
        );
    };
}


// Función que queremos retrasar:

function sayHi(who) {
    alert("Hello, " + who);
}


// Creamos una versión retrasada de sayHi:

let sayHiDeferred = defer(sayHi, 2000);


// Ejecutamos la función:

sayHiDeferred("John");

// Resultado:
//
// Hello, John
//
// Después de aproximadamente 2 segundos.


// ============================================================
// 8. ¿CÓMO FUNCIONA `defer()`?
// ============================================================
//
// Cuando ejecutamos:
//
// sayHiDeferred("John");
//
// La función retornada por `defer()` recibe:
//
//   arguments = ["John"]
//
// Y también conserva el `this` de esa llamada.
//
// Después:
//
// setTimeout(
//   () => f.apply(this, arguments),
//   ms
// );
//
// La función de flecha no tiene su propio:
//
//   this
//   arguments
//
// Por lo tanto, utiliza los de la función exterior.
//
// Finalmente:
//
// f.apply(this, arguments);
//
// Ejecuta la función original utilizando:
//
//   - el mismo `this`
//   - los mismos argumentos
//
// ------------------------------------------------------------


// ============================================================
// 9. LA MISMA SOLUCIÓN SIN FUNCIÓN DE FLECHA
// ============================================================
//
// También podemos implementar `defer()` utilizando una
// función regular dentro de setTimeout.
//
// Pero como esa función regular tendría su propio `this`
// y su propio `arguments`, necesitamos guardar los valores
// manualmente.
//
// ------------------------------------------------------------

function deferWithoutArrow(f, ms) {
    return function(...args) {

    // Guardamos manualmente el `this` actual.

    let ctx = this;

    setTimeout(function() {

      // Esta función regular tiene su propio `this`,
      // por lo que utilizamos el valor que guardamos
      // anteriormente en `ctx`.

      return f.apply(ctx, args);

    }, ms);
  };
}


// Aquí utilizamos:
//
// ...args
//
// para guardar todos los argumentos.
//
// Y:
//
// let ctx = this;
//
// para guardar el contexto.
//
// ------------------------------------------------------------
//
// Con una función de flecha:
//
// function defer(f, ms) {
//   return function() {
//     setTimeout(() => f.apply(this, arguments), ms);
//   };
// }
//
// No necesitamos crear manualmente:
//
//   ctx
//   args
//
// porque la flecha utiliza los `this` y `arguments`
// del entorno exterior.
//
//
// ============================================================


// ============================================================
// 10. RESUMEN
// ============================================================
//
// Las funciones de flecha tienen estas características:
//
// ------------------------------------------------------------
//
// 1. NO tienen su propio `this`
//
//    Utilizan el `this` del entorno exterior.
//
// ------------------------------------------------------------
//
// 2. NO tienen su propio `arguments`
//
//    Utilizan el `arguments` del entorno exterior.
//
// ------------------------------------------------------------
//
// 3. NO pueden utilizarse con `new`
//
//    No pueden funcionar como constructores.
//
// ------------------------------------------------------------
//
// 4. NO tienen `super`
//
//    Esta característica se relaciona con la herencia de
//    clases y se estudiará posteriormente.
//
// ------------------------------------------------------------
//
// La idea principal:
//
// Las funciones de flecha están diseñadas para pequeños
// fragmentos de código que normalmente no necesitan crear
// su propio contexto.
//
// Por eso son especialmente útiles como callbacks:
//
//   forEach()
//   map()
//   filter()
//   setTimeout()
//   etc.
//
// ------------------------------------------------------------
//
// REGLA MENTAL:
//
// Función regular:
//
//   function () {}
//       ↓
//   Tiene su propio `this`
//   Tiene su propio `arguments`
//   Puede utilizarse con `new`
//
//
// Función de flecha:
//
//   () => {}
//       ↓
//   NO tiene `this` propio
//   NO tiene `arguments` propio
//   NO puede utilizarse con `new`
//   Utiliza el contexto léxico exterior
//
// ============================================================
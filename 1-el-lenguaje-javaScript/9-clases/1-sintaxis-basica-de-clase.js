/*
SINTAXIS BÁSICA DE LAS CLASES

Una clase permite crear muchos objetos del mismo tipo mediante una estructura
que reúne la inicialización de los objetos y sus métodos.

En JavaScript moderno, la sintaxis `class` proporciona una forma más avanzada
de definir este tipo de estructuras.

Fuente del contenido proporcionado: javascript.info.
*/

/*
1. SINTAXIS BÁSICA DE UNA CLASE

La estructura básica de una clase puede contener:

- Un método `constructor()`.
- Métodos normales.
- Getters y setters.
- Métodos con nombres calculados.
- Campos de clase.

Cuando se utiliza `new NombreClase()`, JavaScript crea un nuevo objeto y llama
automáticamente al método `constructor()`.
*/

function ejemploClaseBasica() {
  class Usuario {
    constructor(nombre) {
      this.nombre = nombre;
    }

    saludar() {
      alert(this.nombre);
    }
  }

  const usuario = new Usuario("John");
  usuario.saludar();
}

/*
Cuando se ejecuta:

new Usuario("John")

el flujo principal es:

1. Se crea un nuevo objeto.
2. Se ejecuta `constructor("John")`.
3. `this.nombre` recibe el valor "John".
4. El objeto puede utilizar los métodos definidos por la clase.

Importante:

No se colocan comas entre los métodos de una clase.

Esta sintaxis:

class Usuario {
  metodo1() {}
  metodo2() {}
}

es correcta.

Agregar una coma entre `metodo1` y `metodo2` produciría un error de sintaxis.
*/


/*
2. UNA CLASE ES UN TIPO DE FUNCIÓN

En JavaScript, una clase es técnicamente una función.

Cuando se declara una clase, JavaScript crea una función con el nombre de la
clase. El código de esa función proviene del método `constructor()`.

Los demás métodos de la clase se almacenan en el `prototype` de esa función.
*/

function ejemploClaseComoFuncion() {
  class Usuario {
    constructor(nombre) {
      this.nombre = nombre;
    }

    saludar() {
      alert(this.nombre);
    }
  }

  alert(typeof Usuario); // function
}

/*
La declaración anterior produce, entre otras cosas, esta relación:

Usuario === Usuario.prototype.constructor

Además, el método `saludar` se encuentra en:

Usuario.prototype.saludar

Cuando un objeto creado mediante `new Usuario()` utiliza `saludar()`, el método
se obtiene desde `Usuario.prototype`.
*/

function ejemploInspeccionarClase() {
  class Usuario {
    constructor(nombre) {
      this.nombre = nombre;
    }

    saludar() {
      alert(this.nombre);
    }
  }

  alert(typeof Usuario); // function

  alert(Usuario === Usuario.prototype.constructor); // true

  alert(Usuario.prototype.saludar);

  alert(Object.getOwnPropertyNames(Usuario.prototype));
  // constructor, saludar
}


/*
3. COMPARACIÓN CON UNA FUNCIÓN CONSTRUCTORA

Una clase puede parecer una simplificación sintáctica para definir una función
constructora junto con sus métodos en el prototipo.

La siguiente implementación mediante funciones produce un resultado
prácticamente equivalente al ejemplo básico de la clase.
*/

function ejemploConstructorSinClass() {
  function Usuario(nombre) {
    this.nombre = nombre;
  }

  Usuario.prototype.saludar = function () {
    alert(this.nombre);
  };

  const usuario = new Usuario("John");
  usuario.saludar();
}


/*
4. `class` NO ES SOLAMENTE AZÚCAR SINTÁCTICO

Aunque una clase y una función constructora pueden producir estructuras
similares, existen diferencias importantes.

Primera diferencia:

Una función creada mediante `class` posee internamente una característica
especial:

[[IsClassConstructor]]: true

Por eso una clase debe invocarse utilizando `new`.
*/

function ejemploClaseRequiereNew() {
  class Usuario {
    constructor() {}
  }

  alert(typeof Usuario); // function

  // Produce un error intencional:
  // Usuario();
}

/*
La llamada directa:

Usuario();

no está permitida para una clase.

Debe utilizarse:

new Usuario();

Además, en la mayoría de los motores JavaScript, la representación textual
de un constructor de clase comienza con `class`.
*/

function ejemploRepresentacionClase() {
  class Usuario {
    constructor() {}
  }

  alert(Usuario);
  // Muestra una representación similar a:
  // class Usuario { ... }
}

/*
Segunda diferencia:

Los métodos definidos mediante una clase no son enumerables.

La definición de una clase establece `enumerable: false` para los métodos
almacenados en su `prototype`.

Esto es útil porque normalmente no queremos que los métodos de clase aparezcan
al recorrer un objeto con `for..in`.

Tercera diferencia:

Todo el código dentro de una clase se ejecuta automáticamente en modo estricto.
*/


/*
5. EXPRESIONES DE CLASE

Al igual que las funciones, las clases pueden formar parte de expresiones.

Una clase puede:

- Asignarse a una variable.
- Pasarse como argumento.
- Devolverse desde una función.
- Definirse dentro de otra expresión.
*/

function ejemploExpresionDeClase() {
  const Usuario = class {
    saludar() {
      alert("Hello");
    }
  };

  const usuario = new Usuario();
  usuario.saludar();
}


/*
6. EXPRESIONES DE CLASE CON NOMBRE

Una expresión de clase puede tener su propio nombre.

Ese nombre solo es visible dentro de la propia clase.
*/

function ejemploExpresionClaseConNombre() {
  const Usuario = class MiClase {
    saludar() {
      alert(MiClase);
    }
  };

  new Usuario().saludar();

  // `MiClase` no existe fuera de la expresión de clase.
  // La siguiente línea produciría un error:
  // alert(MiClase);
}


/*
7. CREACIÓN DINÁMICA DE CLASES

Una función también puede crear una clase y devolverla.

Esto permite construir clases dinámicamente "bajo demanda".
*/

function ejemploClaseDinamica() {
  function crearClase(frase) {
    return class {
      saludar() {
        alert(frase);
      }
    };
  }

  const Usuario = crearClase("Hello");

  new Usuario().saludar(); // Hello
}


/*
8. GETTERS Y SETTERS EN CLASES

Las clases pueden incluir getters y setters, de forma similar a los objetos
literales.

En el siguiente ejemplo, la propiedad `nombre` se controla mediante:

get nombre()
set nombre(valor)

Cuando el constructor ejecuta:

this.nombre = nombre;

se invoca automáticamente el setter.
*/

function ejemploGettersYSetters() {
  class Usuario {
    constructor(nombre) {
      // Invoca el setter.
      this.nombre = nombre;
    }

    get nombre() {
      return this._nombre;
    }

    set nombre(valor) {
      if (valor.length < 4) {
        alert("Name is too short.");
        return;
      }

      this._nombre = valor;
    }
  }

  let usuario = new Usuario("John");

  alert(usuario.nombre); // John

  usuario = new Usuario("");
  // Name is too short.
}

/*
Técnicamente, una declaración de este tipo crea los métodos getter y setter
en `Usuario.prototype`.
*/


/*
9. NOMBRES CALCULADOS

Los métodos de una clase pueden utilizar nombres calculados mediante
corchetes `[...]`.

La expresión entre corchetes determina el nombre final del método.
*/

function ejemploNombreCalculado() {
  class Usuario {
    ["say" + "Hi"]() {
      alert("Hello");
    }
  }

  new Usuario().sayHi();
}


/*
10. CAMPOS DE CLASE

Los campos de clase permiten agregar propiedades directamente mediante una
asignación dentro de la clase.

Los navegadores antiguos pueden necesitar un polyfill para esta característica.
*/

function ejemploCampoDeClase() {
  class Usuario {
    nombre = "John";

    saludar() {
      alert(`Hello, ${this.nombre}!`);
    }
  }

  new Usuario().saludar(); // Hello, John!
}

/*
Una diferencia importante entre los campos y los métodos es dónde se almacenan.

Un campo de clase se crea en cada objeto individual.

No se almacena en el `prototype`.
*/

function ejemploCampoNoEstaEnPrototype() {
  class Usuario {
    nombre = "John";
  }

  const usuario = new Usuario();

  alert(usuario.nombre); // John
  alert(Usuario.prototype.nombre); // undefined
}


/*
11. EXPRESIONES COMO VALORES DE CAMPOS

Los campos de clase también pueden recibir valores mediante expresiones
y llamadas a funciones.
*/

function ejemploCampoConExpresion() {
  // Este ejemplo depende del navegador porque utiliza `prompt`.

  class Usuario {
    nombre = prompt("Name, please?", "John");
  }

  const usuario = new Usuario();

  alert(usuario.nombre);
}


/*
12. EL PROBLEMA DE PERDER `this`

En JavaScript, `this` depende del contexto de la llamada.

Por eso, cuando un método de un objeto se pasa para ejecutarse en otro contexto,
puede dejar de tener como `this` al objeto original.

En el siguiente ejemplo se pasa `boton.click` directamente a `setTimeout`.
*/

function ejemploPerdidaDeThis() {
  // Este ejemplo depende del navegador.

  class Boton {
    constructor(valor) {
      this.valor = valor;
    }

    click() {
      alert(this.valor);
    }
  }

  const boton = new Boton("hello");

  setTimeout(boton.click, 1000);

  // El ejemplo original muestra `undefined`.
}

/*
Este problema se denomina "perder `this`".

Dos soluciones mencionadas son:

1. Pasar una función contenedora:

setTimeout(() => boton.click(), 1000);

2. Vincular el método al objeto, por ejemplo en el constructor.
*/

function ejemploFuncionContenedora() {
  // Este ejemplo depende del navegador.

  class Boton {
    constructor(valor) {
      this.valor = valor;
    }

    click() {
      alert(this.valor);
    }
  }

  const boton = new Boton("hello");

  setTimeout(() => boton.click(), 1000);
}


/*
13. MÉTODOS VINCULADOS MEDIANTE CAMPOS DE CLASE

Los campos de clase proporcionan otra forma de evitar la pérdida de `this`.

En lugar de declarar `click` como un método normal, se puede crear un campo
que contenga una función flecha.
*/

function ejemploMetodoConCampoDeClase() {
  // Este ejemplo depende del navegador.

  class Boton {
    constructor(valor) {
      this.valor = valor;
    }

    click = () => {
      alert(this.valor);
    };
  }

  const boton = new Boton("hello");

  setTimeout(boton.click, 1000); // hello
}

/*
El campo:

click = () => {
  alert(this.valor);
};

se crea de forma independiente para cada objeto `Boton`.

Por tanto, cada instancia posee su propia función `click`.

Dentro de esa función, `this` hace referencia al objeto correspondiente,
por lo que `boton.click` puede pasarse a otro lugar y conservar el `this`
esperado.

Esto resulta especialmente útil en entornos de navegador para detectores
de eventos.
*/


/*
14. FORMA GENERAL DE UNA CLASE

Una clase puede combinar campos, constructor, métodos, getters, setters
y nombres calculados.

La estructura general mostrada en la lección es equivalente a esta:
*/

function ejemploEstructuraGeneral() {
  class MiClase {
    propiedad = "valor";

    constructor(valor) {
      this.propiedad = valor;
    }

    metodo() {
      return this.propiedad;
    }

    get algo() {
      return this.propiedad;
    }

    set algo(valor) {
      this.propiedad = valor;
    }

    [Symbol.iterator]() {
      // Implementación omitida en el contenido original.
    }
  }

  const instancia = new MiClase("ejemplo");

  return instancia;
}


/*
RESUMEN

1. `class` permite definir una estructura para crear objetos del mismo tipo.

2. El método `constructor()` se ejecuta automáticamente cuando se crea una
   instancia mediante `new`.

3. No se utilizan comas entre los métodos de una clase.

4. Una clase es técnicamente una función.

5. El método `constructor` corresponde a la función de la clase.

6. Los métodos normales, getters y setters se almacenan en el `prototype`
   de la clase.

7. Los objetos creados mediante `new` pueden acceder a esos métodos a través
   del prototipo.

8. Una clase no es exactamente equivalente a una función constructora creada
   manualmente.

9. Una clase debe llamarse mediante `new`.

10. Los métodos de una clase no son enumerables.

11. Todo el código de una clase se ejecuta automáticamente en modo estricto.

12. Las clases pueden utilizarse como expresiones y asignarse a variables.

13. Una expresión de clase puede tener un nombre interno que solo sea visible
    dentro de la propia clase.

14. Una función puede crear y devolver dinámicamente una clase.

15. Las clases pueden contener getters y setters.

16. Los métodos pueden utilizar nombres calculados mediante `[...]`.

17. Los campos de clase permiten definir propiedades mediante `=`.

18. Los campos pertenecen a cada objeto individual y no al `prototype`.

19. Los campos pueden inicializarse mediante expresiones y llamadas a funciones.

20. Pasar un método normal a otro contexto puede provocar la pérdida de `this`.

21. Una función contenedora puede evitar la pérdida de `this`.

22. Un campo de clase que contiene una función flecha crea una función
    independiente para cada instancia y permite conservar el `this`
    correspondiente al objeto.

23. Técnicamente, `MiClase` es la función proporcionada por el constructor,
    mientras que los métodos, getters y setters se encuentran en
    `MiClase.prototype`.
*/


/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos que utilizan `alert`, `prompt` o `setTimeout` están pensados
para ejecutarse en un entorno de navegador.
*/

// ejemploClaseBasica();
// ejemploClaseComoFuncion();
// ejemploInspeccionarClase();
// ejemploConstructorSinClass();
// ejemploClaseRequiereNew();
// ejemploRepresentacionClase();
// ejemploExpresionDeClase();
// ejemploExpresionClaseConNombre();
// ejemploClaseDinamica();
// ejemploGettersYSetters();
// ejemploNombreCalculado();
// ejemploCampoDeClase();
// ejemploCampoNoEstaEnPrototype();
// ejemploCampoConExpresion();
// ejemploPerdidaDeThis();
// ejemploFuncionContenedora();
// ejemploMetodoConCampoDeClase();
// ejemploEstructuraGeneral();

/*
Contenido elaborado únicamente a partir del material proporcionado.
Referencia del archivo fuente: :chatgpt-content-reference{index="0"}
*/
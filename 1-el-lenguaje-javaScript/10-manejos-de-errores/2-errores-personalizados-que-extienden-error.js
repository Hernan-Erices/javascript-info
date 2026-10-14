/*
ERRORES PERSONALIZADOS: EXTENDER ERROR

En una aplicación puede ser útil crear clases de error propias para representar
situaciones específicas, por ejemplo:

- HttpError
- DbError
- NotFoundError
- ValidationError

Los errores personalizados deberían conservar las propiedades básicas de Error,
como message, name y stack. También pueden añadir propiedades propias.

Aunque JavaScript permite usar throw con cualquier valor, heredar de Error permite
identificar los errores mediante instanceof Error.

Además, los errores personalizados pueden formar jerarquías mediante herencia.
Por ejemplo, un error más específico puede heredar de otro error personalizado.

Fuente del resumen: :chatgpt-content-reference{index="0"}
*/


/*
1. EXTENDER LA CLASE ERROR

Para crear un error personalizado podemos extender Error.

El constructor hijo debe llamar a super(message). El constructor de Error establece
la propiedad message.

Error también establece name como "Error", por lo que podemos reemplazarlo por el
nombre correspondiente a nuestra clase personalizada.
*/

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}


/*
Este ejemplo demuestra que ValidationError conserva las características de Error,
pero utiliza su propio nombre.

Depende del navegador porque utiliza alert().
*/
function ejemploValidationErrorBasico() {
  function test() {
    throw new ValidationError("Whoops!");
  }

  try {
    test();
  } catch (err) {
    alert(err.message); // Whoops!
    alert(err.name); // ValidationError
    alert(err.stack); // Pila de llamadas.
  }
}


/*
2. VALIDACIÓN DE DATOS CON UN ERROR PERSONALIZADO

readUser(json) utiliza JSON.parse() para convertir el JSON recibido.

Pueden ocurrir dos situaciones diferentes:

1. El JSON está mal formado.
   JSON.parse() lanza SyntaxError.

2. El JSON es sintácticamente correcto, pero faltan datos necesarios.
   readUser() lanza ValidationError.

Esto permite distinguir los errores de sintaxis de los errores relacionados con
la validez de los datos.
*/

function readUserConValidationError(json) {
  const user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }

  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}


/*
instanceof permite comprobar la clase del error.

Es preferible comprobar:

err instanceof ValidationError

en lugar de depender solamente de:

err.name === "ValidationError"

La comprobación con instanceof también funciona si posteriormente aparecen
subclases que heredan de ValidationError.

Los errores desconocidos deben volver a lanzarse, porque este bloque catch solo
sabe cómo tratar determinados tipos de error.

Flujo:
JSON.parse o validación -> catch -> identificar error conocido -> manejarlo.
Error desconocido -> volver a lanzar.
*/
function ejemploManejoValidationError() {
  try {
    const user = readUserConValidationError('{ "age": 25 }');
    return user;
  } catch (err) {
    if (err instanceof ValidationError) {
      alert("Invalid data: " + err.message);
    } else if (err instanceof SyntaxError) {
      alert("JSON Syntax Error: " + err.message);
    } else {
      throw err;
    }
  }
}


/*
3. HERENCIA ENTRE ERRORES PERSONALIZADOS

ValidationError es bastante genérico. Podemos crear errores más específicos
que hereden de él.

PropertyRequiredError representa el caso concreto en el que falta una propiedad.

Además del mensaje, almacena el nombre de la propiedad problemática en
this.property.
*/

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}


function readUserConPropertyRequiredError(json) {
  const user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}


/*
PropertyRequiredError hereda de ValidationError.

Por eso una instancia de PropertyRequiredError también satisface:

err instanceof ValidationError

Esto permite manejar una familia completa de errores mediante su clase base.

Depende del navegador porque utiliza alert().
*/
function ejemploHerenciaDeErrores() {
  try {
    const user = readUserConPropertyRequiredError('{ "age": 25 }');
    return user;
  } catch (err) {
    if (err instanceof ValidationError) {
      alert("Invalid data: " + err.message);
      alert(err.name); // PropertyRequiredError
      alert(err.property); // name
    } else if (err instanceof SyntaxError) {
      alert("JSON Syntax Error: " + err.message);
    } else {
      throw err;
    }
  }
}


/*
4. CLASE BASE PARA ERRORES PERSONALIZADOS

Asignar manualmente this.name en cada clase personalizada puede ser repetitivo.

Podemos crear una clase base que establezca automáticamente el nombre usando:

this.constructor.name

Después, los demás errores personalizados pueden heredar de esta clase.
*/

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}


class ValidationErrorAutomatico extends MyError {}


class PropertyRequiredErrorAutomatico extends ValidationErrorAutomatico {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}


/*
El nombre se obtiene automáticamente del constructor real de la instancia.

Depende del navegador porque utiliza alert().
*/
function ejemploNombreAutomatico() {
  const error = new PropertyRequiredErrorAutomatico("field");

  alert(error.name); // PropertyRequiredErrorAutomatico
}


/*
5. ENCAPSULACIÓN DE EXCEPCIONES

Una función puede producir varios tipos de errores de bajo nivel.

Por ejemplo, una función que lee datos puede producir:

- SyntaxError al analizar JSON.
- ValidationError al validar los datos.
- Otros errores que podrían aparecer posteriormente.

El código externo podría comprobar cada tipo por separado, pero a medida que
aumentan los posibles errores esto se vuelve incómodo.

La encapsulación de excepciones permite convertir varios errores de bajo nivel
en un único error de nivel superior.

El proceso es:

1. Crear un error general, por ejemplo ReadError.
2. Detectar dentro de readUser() los errores conocidos.
3. Lanzar ReadError en su lugar.
4. Guardar el error original en la propiedad cause.

Así, el código externo solamente necesita comprobar ReadError y puede consultar
cause cuando necesite conocer el error original.
*/

class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ReadError";
  }
}


class ValidationErrorLectura extends Error {}


class PropertyRequiredErrorLectura extends ValidationErrorLectura {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredErrorLectura";
    this.property = property;
  }
}


function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredErrorLectura("age");
  }

  if (!user.name) {
    throw new PropertyRequiredErrorLectura("name");
  }
}


function readUserConReadError(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    }

    throw err;
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationErrorLectura) {
      throw new ReadError("Validation Error", err);
    }

    throw err;
  }

  return user;
}


/*
Ahora el código externo no necesita conocer todos los errores internos que puede
producir readUserConReadError().

Solo comprueba si recibió un ReadError.

Si necesita conocer el error original, puede acceder a:

error.cause

Flujo con JSON incorrecto:

JSON.parse
-> SyntaxError
-> ReadError
-> catch externo
-> error.cause contiene SyntaxError

Los errores desconocidos continúan relanzándose.

Depende del navegador porque utiliza alert().
*/
function ejemploEncapsulacionDeExcepciones() {
  try {
    readUserConReadError("{bad json}");
  } catch (err) {
    if (err instanceof ReadError) {
      alert(err);
      alert("Original error: " + err.cause);
    } else {
      throw err;
    }
  }
}


/*
RESUMEN

1. Los errores personalizados pueden heredar de Error.

2. Al extender Error, el constructor debe llamar a super(message).

3. La propiedad name puede establecerse manualmente para identificar el tipo
   de error.

4. instanceof permite comprobar tipos de errores y también funciona con herencia.

5. Una clase de error personalizada puede heredar de otra para crear una jerarquía.

6. Los errores pueden incluir información adicional mediante propiedades propias,
   como property o cause.

7. Una clase base personalizada puede asignar automáticamente:

   this.name = this.constructor.name

8. Un bloque catch debe manejar solamente los errores que conoce.

9. Los errores desconocidos deben volver a lanzarse con throw.

10. La encapsulación de excepciones convierte varios errores de bajo nivel en un
    error de nivel superior.

11. El error de nivel superior puede conservar el error original en cause.

12. Con este enfoque, el código externo puede comprobar un único tipo de error,
    como ReadError, sin conocer todos los detalles internos.
*/


/*
ACTIVACIÓN MANUAL

Descomenta solamente el ejemplo que quieras probar.

Los ejemplos utilizan alert(), por lo que están pensados para ejecutarse
en un entorno de navegador.
*/

// ejemploValidationErrorBasico();
// ejemploManejoValidationError();
// ejemploHerenciaDeErrores();
// ejemploNombreAutomatico();
// ejemploEncapsulacionDeExcepciones();
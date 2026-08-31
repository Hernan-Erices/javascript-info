/**
 * ERRORES PERSONALIZADOS QUE EXTIENDEN ERROR
 *
 * Podemos crear clases de error propias para representar problemas
 * específicos de nuestra aplicación.
 *
 * Al heredar de Error podemos conservar las características básicas
 * de los errores y utilizar instanceof para identificarlos.
 */


// ============================================================
// 1. ERROR PERSONALIZADO
// ============================================================

// ValidationError hereda de Error.
//
// super(message) llama al constructor de Error y establece
// la información correspondiente al mensaje.
//
// Después modificamos name para identificar nuestro error.

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}


// Podemos lanzar el error con throw.

function test() {
  throw new ValidationError("Whoops!");
}


// El error puede capturarse con try...catch.

try {
  test();

} catch (err) {
  alert(err.message); // Whoops!
  alert(err.name);    // ValidationError
  alert(err.stack);   // Pila de llamadas
}


// ============================================================
// 2. VALIDACIÓN DE UN USUARIO
// ============================================================

// JSON.parse genera SyntaxError cuando el JSON está mal formado.
//
// Pero un JSON válido también puede contener datos incorrectos.
// En ese caso utilizamos ValidationError.

function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }

  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}


// Podemos diferenciar los errores mediante instanceof.

try {
  let user = readUser('{ "age": 25 }');

} catch (err) {

  if (err instanceof ValidationError) {

    alert("Invalid data: " + err.message);

  } else if (err instanceof SyntaxError) {

    alert("JSON Syntax Error: " + err.message);

  } else {

    // Los errores desconocidos no deben ocultarse.
    throw err;
  }
}


// ============================================================
// 3. instanceof Y name
// ============================================================

// También sería posible comprobar:
//
// err.name == "SyntaxError"
//
// Sin embargo, instanceof es especialmente útil cuando existe
// una jerarquía de errores.
//
// Por ejemplo, si PropertyRequiredError hereda de ValidationError,
// también podrá ser identificada mediante:
//
// err instanceof ValidationError


// ============================================================
// 4. HERENCIA DE ERRORES
// ============================================================

// ValidationError representa un error general de validación.
//
// PropertyRequiredError representa un caso más específico:
// una propiedad requerida no existe.
//
// Además, guarda el nombre de la propiedad en property.

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);

    this.name = "PropertyRequiredError";
    this.property = property;
  }
}


// Podemos utilizar el error específico dentro de readUser.

function readUserWithPropertyError(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}


// Aunque el error sea PropertyRequiredError,
// también es una instancia de ValidationError.

try {
  let user = readUserWithPropertyError('{ "age": 25 }');

} catch (err) {

  if (err instanceof ValidationError) {

    alert("Invalid data: " + err.message);
    alert(err.name);     // PropertyRequiredError
    alert(err.property); // name

  } else if (err instanceof SyntaxError) {

    alert("JSON Syntax Error: " + err.message);

  } else {

    throw err;
  }
}


// ============================================================
// 5. CLASE BASE MyError
// ============================================================

// Escribir manualmente this.name en cada clase personalizada
// puede resultar repetitivo.
//
// MyError utiliza this.constructor.name para obtener
// automáticamente el nombre de la clase.

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}


// Los errores personalizados pueden heredar de MyError.

class ValidationErrorBase extends MyError {}

class PropertyRequiredErrorBase extends ValidationErrorBase {
  constructor(property) {
    super("No property: " + property);

    this.property = property;
  }
}


// El nombre se obtiene automáticamente.

let error = new PropertyRequiredErrorBase("field");

alert(error.name); // PropertyRequiredErrorBase


// ============================================================
// 6. PROBLEMA DE MÚLTIPLES ERRORES
// ============================================================

// readUser puede generar distintos tipos de errores.
//
// Si existen muchos tipos, el código externo tendría que comprobar
// cada uno individualmente:
//
// ValidationError
// SyntaxError
// otros errores...
//
// Para evitarlo podemos utilizar un error más general:
// ReadError.


// ============================================================
// 7. ENCAPSULACIÓN DE EXCEPCIONES
// ============================================================

// ReadError representa un error general relacionado con la lectura.
//
// cause conserva una referencia al error original.

class ReadError extends Error {
  constructor(message, cause) {
    super(message);

    this.cause = cause;
    this.name = "ReadError";
  }
}


// ============================================================
// 8. VALIDACIÓN SEPARADA
// ============================================================

// Esta función se encarga exclusivamente de validar los datos.

function validateUser(user) {

  if (!user.age) {
    throw new PropertyRequiredErrorBase("age");
  }

  if (!user.name) {
    throw new PropertyRequiredErrorBase("name");
  }
}


// ============================================================
// 9. ENVOLVER LOS ERRORES EN readUser
// ============================================================

// readUser captura los errores conocidos y los convierte
// en un ReadError.
//
// Los errores desconocidos continúan propagándose.

function readUserWrapped(json) {

  let user;

  try {

    user = JSON.parse(json);

  } catch (err) {

    if (err instanceof SyntaxError) {

      // El error original queda almacenado en cause.
      throw new ReadError("Syntax Error", err);

    } else {

      throw err;
    }
  }


  try {

    validateUser(user);

  } catch (err) {

    if (err instanceof ValidationErrorBase) {

      throw new ReadError("Validation Error", err);

    } else {

      throw err;
    }
  }

  return user;
}


// ============================================================
// 10. MANEJAR EL ERROR ENVUELTO
// ============================================================

// El código externo ya no necesita conocer todos los errores
// internos de readUser.
//
// Solo comprueba si recibió un ReadError.

try {

  readUserWrapped("{bad json}");

} catch (err) {

  if (err instanceof ReadError) {

    alert(err);

    // cause permite acceder al error original.
    alert("Original error: " + err.cause);

  } else {

    // Los errores desconocidos siguen propagándose.
    throw err;
  }
}


// ============================================================
// JERARQUÍA DE ERRORES
// ============================================================
//
// Los errores personalizados pueden formar una jerarquía:
//
//
//                 Error
//                   |
//                MyError
//                   |
//            ValidationError
//                   |
//        PropertyRequiredError
//
//
// También podemos tener un error de nivel superior:
//
//                 Error
//                   |
//               ReadError
//
//
// ReadError puede encapsular errores producidos internamente,
// como SyntaxError o ValidationError.
//
//
// ============================================================
// RESUMEN
// ============================================================
//
// 1. Podemos crear errores personalizados heredando de Error.
//
// 2. Al crear una clase hija debemos llamar a super().
//
// 3. Podemos establecer name para identificar el tipo de error.
//
// 4. instanceof permite comprobar el tipo de error.
//
// 5. instanceof también funciona con la herencia.
//
// 6. MyError permite establecer automáticamente name mediante:
//
//      this.constructor.name
//
// 7. Los errores personalizados pueden organizarse en una jerarquía.
//
// 8. Los errores desconocidos deben volver a lanzarse.
//
// 9. La encapsulación de excepciones permite transformar varios
//    errores de bajo nivel en un error más general.
//
// 10. ReadError puede conservar el error original mediante cause.
//
//      ReadError
//          |
//          +-- cause --> error original
//
// De esta forma, el código externo solo necesita comprobar
// instanceof ReadError y puede consultar cause cuando necesite
// conocer los detalles del error original.
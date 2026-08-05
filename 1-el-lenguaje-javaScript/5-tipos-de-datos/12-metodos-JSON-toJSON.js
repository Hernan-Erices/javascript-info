// ============================================================================
// MÉTODOS JSON Y toJSON
// ============================================================================
//
// JSON (JavaScript Object Notation) es el formato estándar más utilizado para
// representar e intercambiar datos entre aplicaciones.
//
// Se emplea para:
//
// - Enviar información entre cliente y servidor.
// - Guardar datos en archivos.
// - Almacenar información en bases de datos.
// - Registrar (log) objetos de forma estructurada.
//
// JavaScript incluye dos métodos principales:
//
// - JSON.stringify() -> Convierte un objeto en una cadena JSON.
// - JSON.parse() -> Convierte una cadena JSON nuevamente en un objeto.
//
// ============================================================================
// ¿POR QUÉ UTILIZAR JSON?
// ============================================================================
//
// Supongamos que tenemos un objeto complejo:
//
// const user = {
//   name: "John",
//   age: 30
// };
//
// Si queremos enviarlo por Internet o guardarlo en un archivo, necesitamos
// convertirlo en texto.
//
// Una posibilidad sería crear nuestro propio método:
//
// const user = {
//   name: "John",
//   age: 30,
//
//   toString() {
//     return `{name: "${this.name}", age: ${this.age}}`;
//   }
// };
//
// console.log(String(user));
//
// Problema:
//
// - Cada vez que agregamos o eliminamos propiedades debemos actualizar
//   manualmente el método.
//
// - Si existen objetos anidados, el proceso se vuelve mucho más complicado.
//
// Afortunadamente, JavaScript resuelve este problema automáticamente mediante
// JSON.
//
// ============================================================================
// JSON.stringify()
// ============================================================================
//
// Convierte cualquier valor compatible en una cadena con formato JSON.
//
// Sintaxis:
//
// JSON.stringify(valor)
//
// Ejemplo:
//
// const student = {
//   name: "John",
//   age: 30,
//   isAdmin: false,
//   courses: ["HTML", "CSS", "JavaScript"],
//   spouse: null
// };
//
// const json = JSON.stringify(student);
//
// console.log(typeof json); // "string"
// console.log(json);
//
// Resultado:
//
// {
//   "name":"John",
//   "age":30,
//   "isAdmin":false,
//   "courses":["HTML","CSS","JavaScript"],
//   "spouse":null
// }
//
// La cadena obtenida recibe distintos nombres:
//
// - Cadena JSON.
// - Objeto serializado.
// - Objeto convertido a cadena (stringified).
//
// Una vez serializado puede:
//
// - enviarse por la red;
// - almacenarse en un archivo;
// - guardarse en una base de datos.
//
// ============================================================================
// DIFERENCIAS ENTRE UN OBJETO Y JSON
// ============================================================================
//
// Aunque se parecen visualmente, JSON tiene reglas propias.
//
// 1. Todas las cadenas utilizan comillas dobles.
//
// Correcto:
//
// "John"
//
// Incorrecto:
//
// 'John'
// `John`
//
// ------------------------------------------------
//
// 2. Los nombres de las propiedades SIEMPRE van entre comillas dobles.
//
// Objeto:
//
// {
//   age: 30
// }
//
// JSON:
//
// {
//   "age": 30
// }
//
// ============================================================================
// TIPOS DE DATOS COMPATIBLES
// ============================================================================
//
// JSON puede representar:
//
// - Objetos
//
// {
//   "name": "John"
// }
//
// - Arrays
//
// [1, 2, 3]
//
// - Strings
//
// "Hola"
//
// - Números
//
// 100
//
// - Booleanos
//
// true
// false
//
// - null
//
// null
//
// Ejemplos:
//
// console.log(JSON.stringify(1));
// // "1"
//
// console.log(JSON.stringify("test"));
// // "\"test\""
//
// console.log(JSON.stringify(true));
// // "true"
//
// console.log(JSON.stringify([1, 2, 3]));
// // "[1,2,3]"
//
// ============================================================================
// ¿QUÉ NO SERIALIZA JSON.stringify()?
// ============================================================================
//
// JSON solamente almacena datos.
//
// Todo aquello que pertenezca exclusivamente a JavaScript será ignorado.
//
// En particular:
//
// - Funciones (métodos).
// - Propiedades Symbol.
// - Propiedades cuyo valor sea undefined.
//
// Ejemplo:
//
// const user = {
//   sayHi() {
//     console.log("Hola");
//   },
//
//   [Symbol("id")]: 123,
//
//   value: undefined
// };
//
// console.log(JSON.stringify(user));
//
// Resultado:
//
// {}
//
// Es decir, todas esas propiedades desaparecen durante la serialización.
//
// En la mayoría de los casos este comportamiento es exactamente el deseado.
//
// ============================================================================
// OBJETOS ANIDADOS
// ============================================================================
//
// Una de las grandes ventajas de JSON.stringify() es que convierte
// automáticamente estructuras complejas.
//
// Ejemplo:
//
// const meetup = {
//   title: "Conference",
//
//   room: {
//     number: 23,
//     participants: ["John", "Ann"]
//   }
// };
//
// console.log(JSON.stringify(meetup));
//
// Resultado:
//
// {
//   "title":"Conference",
//   "room":{
//      "number":23,
//      "participants":["John","Ann"]
//   }
// }
//
// No es necesario recorrer manualmente cada objeto interno.
//
// JSON.stringify() serializa toda la estructura de forma recursiva.
//
// ============================================================================
// LIMITACIÓN: REFERENCIAS CIRCULARES
// ============================================================================
//
// JSON.stringify() NO puede convertir objetos que se referencian mutuamente.
//
// Ejemplo:
//
// const room = {
//   number: 23
// };
//
// const meetup = {
//   title: "Conference",
//   participants: ["John", "Ann"]
// };
//
// meetup.place = room;
//
// room.occupiedBy = meetup;
//
// Ahora ocurre lo siguiente:
//
// meetup
//    │
//    ▼
// room
//    │
//    ▼
// meetup
//
// Se forma un ciclo infinito.
//
// Al intentar serializar:
//
// JSON.stringify(meetup);
//
// JavaScript lanza:
//
// TypeError: Converting circular structure to JSON
//
// Esto ocurre porque el algoritmo intenta recorrer el objeto de manera
// recursiva y nunca encuentra un final debido a la referencia circular.
//
// En estos casos es necesario eliminar dichas referencias o personalizar el
// proceso de serialización (tema que continúa en la siguiente sección con
// replacer y el método toJSON()).

// ============================================================================
// JSON: REPLACER, ESPACIADO, toJSON() Y JSON.parse()
// ============================================================================
//
// En la mayoría de los casos basta con utilizar:
//
// JSON.stringify(valor)
//
// Sin embargo, este método admite dos argumentos opcionales que permiten
// personalizar completamente el proceso de serialización.
//
// Sintaxis:
//
// JSON.stringify(valor, replacer, space)
//
// ┌──────────┬──────────────────────────────────────────────┐
// │ Parámetro│ Descripción                                  │
// ├──────────┼──────────────────────────────────────────────┤
// │ value    │ Valor que será convertido a JSON.           │
// │ replacer │ Filtra o transforma propiedades.            │
// │ space    │ Agrega sangría para mejorar la legibilidad. │
// └──────────┴──────────────────────────────────────────────┘
//
// ============================================================================
// REPLACER
// ============================================================================
//
// El segundo parámetro permite controlar exactamente qué información será
// serializada.
//
// Puede recibir:
//
// - Un array de propiedades.
// - Una función.
//
// ============================================================================
// REPLACER COMO ARRAY
// ============================================================================
//
// Si se proporciona un array, únicamente las propiedades incluidas en él serán
// convertidas a JSON.
//
// Ejemplo:
//
// const room = {
//   number: 23
// };
//
// const meetup = {
//   title: "Conference",
//   participants: [
//     { name: "John" },
//     { name: "Alice" }
//   ],
//   place: room
// };
//
// room.occupiedBy = meetup;
//
// console.log(
//   JSON.stringify(meetup, ["title", "participants"])
// );
//
// Resultado:
//
// {
//   "title":"Conference",
//   "participants":[{},{}]
// }
//
// ¿Por qué los objetos del array aparecen vacíos?
//
// Porque únicamente se autorizó:
//
// - title
// - participants
//
// La propiedad "name" no forma parte del array y, por tanto, también se elimina.
//
// ============================================================================
// INCLUYENDO MÁS PROPIEDADES
// ============================================================================
//
// Podemos ampliar la lista:
//
// JSON.stringify(
//   meetup,
//   [
//     "title",
//     "participants",
//     "place",
//     "name",
//     "number"
//   ]
// );
//
// Resultado:
//
// {
//   "title":"Conference",
//   "participants":[
//      {"name":"John"},
//      {"name":"Alice"}
//   ],
//   "place":{
//      "number":23
//   }
// }
//
// Ahora todas las propiedades necesarias se serializan,
// excepto occupiedBy, evitando así la referencia circular.
//
// El inconveniente es que, en objetos grandes, mantener una lista completa de
// propiedades puede resultar poco práctico.
//
// ============================================================================
// REPLACER COMO FUNCIÓN
// ============================================================================
//
// En lugar de un array, podemos pasar una función.
//
// Sintaxis:
//
// JSON.stringify(valor, function(key, value) {
//     ...
// });
//
// Esta función será llamada para cada propiedad del objeto.
//
// Debe devolver:
//
// - value      -> conservar el valor.
// - undefined  -> eliminar la propiedad.
// • otro valor -> reemplazar el valor original.
//
// Ejemplo:
//
// const room = {
//   number: 23
// };
//
// const meetup = {
//   title: "Conference",
//   participants: [
//     { name: "John" },
//     { name: "Alice" }
//   ],
//   place: room
// };
//
// room.occupiedBy = meetup;
//
// const json = JSON.stringify(
//   meetup,
//   function replacer(key, value) {
//
//     if (key === "occupiedBy") {
//       return undefined;
//     }
//
//     return value;
//   }
// );
//
// console.log(json);
//
// De esta manera únicamente se elimina la propiedad que provoca la referencia
// circular.
//
// ============================================================================
// ¿CÓMO FUNCIONA EL REPLACER?
// ============================================================================
//
// La función replacer() recorre toda la estructura del objeto de forma
// recursiva.
//
// Es decir, recibe:
//
// - propiedades del objeto principal;
// - objetos anidados;
// - elementos de arrays.
//
// Por ejemplo:
//
// ""
// title
// participants
// 0
// name
// 1
// name
// place
// number
// occupiedBy
//
// La primera llamada es especial.
//
// JavaScript crea internamente un objeto contenedor:
//
// {
//   "": meetup
// }
//
// Por ello, la primera clave recibida siempre es una cadena vacía ("").
//
// Gracias a este comportamiento, replacer() incluso puede reemplazar o eliminar
// el objeto completo antes de comenzar la serialización.
//
// ============================================================================
// SPACE (FORMATO)
// ============================================================================
//
// El tercer parámetro controla únicamente la apariencia del JSON.
//
// NO modifica los datos.
//
// Se utiliza para generar un JSON fácil de leer.
//
// Ejemplo:
//
// const user = {
//   name: "John",
//   age: 25,
//   roles: {
//     isAdmin: false,
//     isEditor: true
//   }
// };
//
// console.log(
//   JSON.stringify(user, null, 2)
// );
//
// Resultado:
//
// {
//   "name": "John",
//   "age": 25,
//   "roles": {
//     "isAdmin": false,
//     "isEditor": true
//   }
// }
//
// Si usamos:
//
// JSON.stringify(user, null, 4);
//
// la sangría será de cuatro espacios.
//
// ============================================================================
// INDENTACIÓN CON CADENAS
// ============================================================================
//
// El parámetro space no tiene por qué ser un número.
//
// También puede ser una cadena:
//
// JSON.stringify(user, null, "--");
//
// Resultado:
//
// {
// --"name":"John",
// --"age":25
// }
//
// Esto suele utilizarse únicamente para depuración o generación de archivos
// legibles por personas.
//
// ============================================================================
// MÉTODO toJSON()
// ============================================================================
//
// Al igual que existe toString() para convertir objetos en texto,
// también existe toJSON() para controlar cómo un objeto será convertido a JSON.
//
// Si un objeto implementa este método,
// JSON.stringify() lo ejecutará automáticamente.
//
// ============================================================================
// EJEMPLO CON Date
// ============================================================================
//
// const meetup = {
//   title: "Conference",
//   date: new Date(Date.UTC(2017, 0, 1))
// };
//
// console.log(JSON.stringify(meetup));
//
// Resultado:
//
// {
//   "title":"Conference",
//   "date":"2017-01-01T00:00:00.000Z"
// }
//
// Date ya incorpora internamente su propio método toJSON(),
// por eso se convierte automáticamente en una cadena.
//
// ============================================================================
// CREANDO UN toJSON() PERSONALIZADO
// ============================================================================
//
// const room = {
//   number: 23,
//
//   toJSON() {
//     return this.number;
//   }
// };
//
// const meetup = {
//   title: "Conference",
//   room
// };
//
// console.log(JSON.stringify(room));
//
// Resultado:
//
// 23
//
// console.log(JSON.stringify(meetup));
//
// Resultado:
//
// {
//   "title":"Conference",
//   "room":23
// }
//
// En lugar de serializar el objeto completo,
// únicamente se serializa el valor devuelto por toJSON().
//
// Este método funciona:
//
// - al serializar directamente el objeto;
//
// - cuando el objeto está anidado dentro de otro.
//
// ============================================================================
// JSON.parse()
// ============================================================================
//
// JSON.parse() realiza la operación inversa.
//
// Convierte una cadena JSON nuevamente en objetos de JavaScript.
//
// Sintaxis:
//
// JSON.parse(texto, reviver)
//
// • texto   -> cadena JSON.
// • reviver -> función opcional para transformar valores.
//
// ============================================================================
// EJEMPLO CON ARRAYS
// ============================================================================
//
// const numbers = "[0,1,2,3]";
//
// const array = JSON.parse(numbers);
//
// console.log(array[1]);
//
// Resultado:
//
// 1
//
// ============================================================================
// EJEMPLO CON OBJETOS
// ============================================================================
//
// const userData = `{
//   "name":"John",
//   "age":35,
//   "isAdmin":false,
//   "friends":[0,1,2,3]
// }`;
//
// const user = JSON.parse(userData);
//
// console.log(user.friends[1]);
//
// Resultado:
//
// 1
//
// JSON.parse() reconstruye automáticamente:
//
// - objetos;
// - arrays;
// - números;
// - booleanos;
// - null.
//
// ============================================================================
// EL PARÁMETRO reviver
// ============================================================================
//
// El segundo parámetro es una función opcional:
//
// JSON.parse(texto, function(key, value) {
//     ...
// });
//
// Se ejecuta para cada propiedad reconstruida y permite:
//
// - modificar valores;
// - eliminar propiedades;
// - transformar datos durante el proceso de lectura.
//
// Funciona de forma muy similar al replacer de JSON.stringify(),
// pero en sentido contrario.
//
// ============================================================================
// ERRORES COMUNES EN JSON
// ============================================================================
//
// JSON es mucho más estricto que los objetos de JavaScript.
//
// Errores frecuentes:
//
// - Propiedades sin comillas.
//
// {
//   name: "John"
// }
//
// - Correcto:
//
// {
//   "name": "John"
// }
//
// ------------------------------------------------
//
// - Comillas simples.
//
// {
//   "name": 'John'
// }
//
// - Correcto:
//
// {
//   "name": "John"
// }
//
// ------------------------------------------------
//
// - Claves con comillas simples.
//
// {
//   'age': 20
// }
//
// - Correcto:
//
// {
//   "age": 20
// }
//
// ------------------------------------------------
//
// - Expresiones JavaScript.
//
// {
//   "birthday": new Date()
// }
//
// JSON únicamente admite datos, no código.
//
// ------------------------------------------------
//
// - Comentarios.
//
// {
//   // comentario
//   "name":"John"
// }
//
// JSON no permite comentarios.
//
// ============================================================================
// JSON5
// ============================================================================
//
// Existe un formato llamado JSON5 que admite características adicionales:
//
// - comentarios;
// - comillas simples;
// - propiedades sin comillas;
// - entre otras.
//
// Sin embargo:
//
// - JSON5 NO forma parte del estándar oficial.
// - JavaScript no lo soporta mediante JSON.parse().
// - Requiere bibliotecas externas.
//
// ============================================================================
// ¿POR QUÉ JSON ES TAN ESTRICTO?
// ============================================================================
//
// La simplicidad de JSON permite que cualquier lenguaje de programación pueda
// leerlo e interpretarlo de forma rápida, eficiente y confiable.
//
// Gracias a ello se ha convertido en el formato de intercambio de datos más
// utilizado entre aplicaciones y servicios web.

// ============================================================================
// JSON.parse() CON REVIVER
// ============================================================================
//
// En la sección anterior vimos que JSON.parse() convierte una cadena JSON en
// un objeto de JavaScript.
//
// Sin embargo, existe un detalle importante:
//
// JSON no almacena tipos especiales como Date. Cuando un objeto Date se
// serializa mediante JSON.stringify(), se convierte en una cadena de texto.
//
// Al reconstruir el objeto con JSON.parse(), esa cadena seguirá siendo una
// cadena, no un objeto Date.
//
// Para solucionar este problema existe el segundo parámetro de JSON.parse():
//
// reviver
//
// Sintaxis:
//
// JSON.parse(textoJSON, reviver)
//
// El reviver es una función que se ejecuta para cada propiedad reconstruida y
// permite transformar sus valores antes de devolver el objeto final.
//
// ============================================================================
// PROBLEMA
// ============================================================================
//
// Supongamos que recibimos desde un servidor el siguiente JSON:
//
// const str =
//   '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
//
// Lo convertimos a un objeto:
//
// const meetup = JSON.parse(str);
//
// A simple vista parece correcto:
//
// console.log(meetup);
//
// Resultado:
//
// {
//   title: "Conference",
//   date: "2017-11-30T12:00:00.000Z"
// }
//
// Sin embargo, la propiedad date NO es un objeto Date.
//
// Es simplemente una cadena.
//
// Si intentamos usar un método propio de Date:
//
// meetup.date.getDate();
//
// obtenemos:
//
// TypeError
//
// porque los strings no poseen ese método.
//
// ============================================================================
// SOLUCIÓN: REVIVER
// ============================================================================
//
// Podemos indicar a JSON.parse() cómo transformar determinadas propiedades.
//
// Ejemplo:
//
// const str =
//   '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
//
// const meetup = JSON.parse(
//   str,
//   function (key, value) {
//
//     if (key === "date") {
//       return new Date(value);
//     }
//
//     return value;
//   }
// );
//
// Ahora:
//
// console.log(meetup.date.getDate());
//
// Resultado:
//
// 30
//
// Durante el proceso de deserialización:
//
// - todas las propiedades distintas de "date" permanecen iguales;
//
// - la propiedad "date" deja de ser un string y pasa a convertirse en una
//   instancia de Date.
//
// ============================================================================
// ¿CÓMO FUNCIONA EL REVIVER?
// ============================================================================
//
// La función reviver recibe dos argumentos:
//
// function(key, value) {
//
// }
//
// key
// -> nombre de la propiedad actual.
//
// value
// -> valor ya reconstruido.
//
// Debe devolver:
//
// - value       -> conservar el valor.
// - otro valor  -> reemplazar el valor.
// - undefined   -> eliminar la propiedad.
//
// Al igual que replacer() de JSON.stringify(),
// reviver() recorre toda la estructura del objeto de forma recursiva.
//
// ============================================================================
// OBJETOS ANIDADOS
// ============================================================================
//
// reviver también funciona con objetos complejos y arrays anidados.
//
// Ejemplo:
//
// const schedule = `{
//   "meetups":[
//     {
//       "title":"Conference",
//       "date":"2017-11-30T12:00:00.000Z"
//     },
//     {
//       "title":"Birthday",
//       "date":"2017-04-18T12:00:00.000Z"
//     }
//   ]
// }`;
//
// const data = JSON.parse(
//   schedule,
//   function(key, value) {
//
//     if (key === "date") {
//       return new Date(value);
//     }
//
//     return value;
//   }
// );
//
// Ahora:
//
// console.log(data.meetups[1].date.getDate());
//
// Resultado:
//
// 18
//
// No importa cuán profunda esté la propiedad "date":
//
// - dentro de objetos;
// - dentro de arrays;
// - dentro de otros objetos.
//
// reviver será ejecutado para cada una de ellas.
//
// ============================================================================
// RESUMEN
// ============================================================================
//
// - JSON es un formato estándar para representar e intercambiar datos entre
//   aplicaciones y lenguajes de programación.
//
// - JSON admite únicamente:
//
//   - Objetos
//   - Arrays
//   - Strings
//   - Números
//   - Booleanos
//   - null
//
// - JSON.stringify() serializa valores de JavaScript y los convierte en una
//   cadena JSON.
//
// - JSON.parse() realiza el proceso inverso, reconstruyendo los objetos a
//   partir de una cadena JSON.
//
// - Tanto JSON.stringify() como JSON.parse() permiten personalizar el proceso:
//
//   - replacer -> modifica o filtra datos durante la serialización.
//
//   - reviver -> transforma datos durante la deserialización.
//
// - Si un objeto implementa el método toJSON(), JSON.stringify() lo ejecutará
//   automáticamente y utilizará el valor que este devuelva como representación
//   JSON del objeto.
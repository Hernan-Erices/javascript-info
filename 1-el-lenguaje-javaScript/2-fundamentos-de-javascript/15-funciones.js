/*==============================================================================
    FUNCIONES
==============================================================================*/

/*
Las funciones son uno de los elementos más importantes de JavaScript.

Una función es un bloque de código reutilizable que realiza una tarea
específica. Permite escribir código una sola vez y ejecutarlo tantas
veces como sea necesario.

Beneficios:

- Evitan repetir código.
- Facilitan el mantenimiento.
- Hacen el código más organizado.
- Mejoran la legibilidad.
*/

/*==============================================================================
    DECLARACIÓN DE UNA FUNCIÓN
==============================================================================*/

/*
Una función se declara utilizando la palabra reservada function.

Sintaxis:

function nombre(parametros) {

    // código

}
*/

function showMessage() {
    console.log("¡Hola!");
}

/*
La función todavía no se ejecuta.

Solo queda almacenada en memoria esperando ser llamada.
*/

/*==============================================================================
    LLAMAR (INVOCAR) UNA FUNCIÓN
==============================================================================*/

/*
Para ejecutar una función simplemente escribimos su nombre seguido
de paréntesis.
*/

showMessage();

/*
Salida:

¡Hola!
*/

/*
Una función puede llamarse tantas veces como sea necesario.
*/

showMessage();
showMessage();
showMessage();

/*
Esto evita duplicar código.
*/

/*==============================================================================
    CUERPO DE LA FUNCIÓN
==============================================================================*/

/*
El código que se encuentra entre las llaves {} se conoce como
cuerpo de la función.

Todo ese código se ejecutará cada vez que la función sea llamada.
*/

function greet() {
    console.log("Hola");
    console.log("Bienvenido");
    console.log("JavaScript");
}

/*==============================================================================
    VARIABLES LOCALES
==============================================================================*/

/*
Las variables declaradas dentro de una función solo existen
dentro de esa función.

Se llaman variables locales.
*/

function example() {
    let message = "Hola";
    console.log(message);
}

example();

// console.log(message); // Error

/*
Una variable local desaparece cuando la función termina.
*/

/*==============================================================================
    VARIABLES GLOBALES
==============================================================================*/

/*
Las variables declaradas fuera de cualquier función son variables
globales.

Pueden utilizarse desde cualquier parte del programa.
*/

let user = "Juan";

function showUser() {
    console.log(user);
}

showUser();

/*
Aunque son accesibles desde cualquier función, es recomendable
usar pocas variables globales.

Demasiadas variables globales hacen el código difícil de mantener.
*/

/*==============================================================================
    VARIABLES LOCALES VS GLOBALES
==============================================================================*/

/*
Si existe una variable local con el mismo nombre que una global,
la local tiene prioridad.

A esto se le conoce como "shadowing" (ocultamiento).
*/

let language = "JavaScript";

function showLanguage() {

    let language = "Python";

    console.log(language);

}

showLanguage(); // Python

console.log(language); // JavaScript

/*
La variable global no fue modificada.
*/

/*==============================================================================
    MODIFICAR VARIABLES GLOBALES
==============================================================================*/

/*
Una función también puede modificar una variable global.

Sin embargo, esto debe evitarse cuando sea posible porque puede
hacer el código más difícil de entender.
*/

let username = "Juan";

function changeName() {

    username = "Carlos";

}

changeName();

console.log(username);

/*==============================================================================
    PARÁMETROS
==============================================================================*/

/*
Los parámetros permiten que una función reciba información.

Se escriben entre los paréntesis de la declaración.
*/

function greetUser(name) {

    console.log("Hola " + name);

}

greetUser("Ana");

greetUser("Pedro");

/*
"name" es un parámetro.
*/

/*==============================================================================
    ARGUMENTOS
==============================================================================*/

/*
Los argumentos son los valores que enviamos cuando llamamos
a una función.
*/

function sum(a, b) {

    console.log(a + b);

}

sum(5, 8);

/*
En este ejemplo:

Parámetros:

a
b

Argumentos:

5
8

Recordatorio:

Parámetro -> Variable definida en la función.

Argumento -> Valor enviado al llamar la función.
*/

/*==============================================================================
    PASO POR VALOR
==============================================================================*/

/*
Los parámetros reciben una copia del valor enviado.

Modificar el parámetro no modifica la variable original.
*/

function modify(number) {

    number = number * 2;

    console.log(number);

}

let value = 10;

modify(value);

console.log(value);

/*
Salida:

20
10
*/

/*==============================================================================
    PARÁMETROS PREDETERMINADOS
==============================================================================*/

/*
Podemos asignar un valor por defecto a un parámetro.

Ese valor se utilizará cuando el argumento no sea enviado.
*/

function greet(name = "Invitado") {

    console.log("Hola " + name);

}

greet();

greet("Carlos");

/*
Salida:

Hola Invitado

Hola Carlos
*/

/*
El valor predeterminado solo se utiliza cuando el argumento
es undefined.
*/

greet(undefined);

/*==============================================================================
    VALORES PREDETERMINADOS COMO EXPRESIONES
==============================================================================*/

/*
El valor por defecto puede ser cualquier expresión válida.
*/

function randomNumber() {

    return Math.random();

}

function createValue(value = randomNumber()) {

    console.log(value);

}

createValue();

/*
La función randomNumber() solo se ejecuta cuando no se proporciona
el argumento.
*/

/*==============================================================================
    DEVOLVER UN VALOR (RETURN)
==============================================================================*/

/*
La palabra reservada return finaliza la función y devuelve un valor.
*/

function sum(a, b) {

    return a + b;

}

let result = sum(10, 20);

console.log(result);

/*
Salida:

30
*/

/*
Sin return una función devuelve undefined.
*/

function test() {

}

console.log(test());

/*
undefined
*/

/*==============================================================================
    RETURN FINALIZA LA FUNCIÓN
==============================================================================*/

/*
Cuando JavaScript encuentra un return, deja de ejecutar el resto
del código de la función.
*/

function checkAge(age) {

    if (age < 18) {

        return "Acceso denegado";

    }

    console.log("Acceso permitido");

}

console.log(checkAge(15));

/*
"Acceso permitido" nunca se ejecuta cuando age < 18.
*/

/*==============================================================================
    RETURN SIN VALOR
==============================================================================*/

/*
También es posible usar return sin devolver ningún valor.

En ese caso simplemente finaliza la función.
*/

function print(number) {

    if (number < 0) {

        return;

    }

    console.log(number);

}

/*==============================================================================
    SALTO DE LÍNEA CON RETURN
==============================================================================*/

/*
Nunca coloques el valor devuelto en la línea siguiente.
*/

function wrong() {

    // return
    // 5;

}

/*
JavaScript interpreta automáticamente:

return;

Por lo tanto devuelve undefined.

Si la expresión ocupa varias líneas, el primer paréntesis debe
estar en la misma línea del return.
*/

function correct() {

    return (
        5 +
        8
    );

}

/*==============================================================================
    BUENAS PRÁCTICAS PARA NOMBRAR FUNCIONES
==============================================================================*/

/*
El nombre de una función debe describir claramente la acción
que realiza.

Generalmente se utilizan verbos.
*/

/*
Ejemplos:

showMessage()

getUser()

createAccount()

calculateTotal()

checkPermission()

sendEmail()

saveData()
*/

/*
Prefijos comunes:

show...

Mostrar información.

-------------------------

get...

Obtener un valor.

-------------------------

set...

Modificar un valor.

-------------------------

create...

Crear algo.

-------------------------

check...

Verificar una condición.

-------------------------

calculate...

Realizar un cálculo.

-------------------------

is...

Devolver true o false.
*/

/*==============================================================================
    UNA FUNCIÓN, UNA RESPONSABILIDAD
==============================================================================*/

/*
Una buena función debería realizar una sola tarea.

Si una función hace demasiadas cosas, probablemente deba dividirse
en funciones más pequeñas.
*/

/*
Incorrecto:

createUser()

- crea el usuario
- guarda en la base de datos
- envía un correo
- imprime un mensaje
- registra un log

Demasiadas responsabilidades.
*/

/*
Mejor:

createUser()

saveUser()

sendEmail()

showMessage()
*/

/*
Las funciones pequeñas son:

- Más fáciles de entender.

- Más fáciles de reutilizar.

- Más fáciles de probar.

- Más fáciles de mantener.
*/

/*==============================================================================
    LAS FUNCIONES TAMBIÉN DOCUMENTAN EL CÓDIGO
==============================================================================*/

/*
Una función con un buen nombre explica por sí sola qué hace el código.

Ejemplo:
*/

function isPrime(number) {

    // ...

}

/*
Es mucho más fácil leer:

if (isPrime(number))

que leer directamente todo el algoritmo para comprobar si un
número es primo.

Por eso se dice que un buen nombre reduce la necesidad de comentarios.
*/


//TAREA 1: ¿Es necesario "else"?
/*
La siguiente función devuelve un valor true si el parámetro age es 
mayor que 18.

De lo contrario, solicita confirmación y devuelve el resultado:
*/

function checkAge(age) {
    if (age > 18) {
        return true;
    } else {
    // ...
    return confirm('Did parents allow you?');
    }
}

//¿Funcionará de forma diferente si elsese elimina?

function checkAge(age) {
    if (age > 18) {
        return true;
    }
  // ...
    return confirm('Did parents allow you?');
}

//RESPESTA: No existe diferencia, sin el else igual se ejecutara
//          el return confirm se ejecuta cuando la condicion no
//          se cumple.
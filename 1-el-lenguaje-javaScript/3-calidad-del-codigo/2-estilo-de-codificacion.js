/*
https://javascript.info/coding-style

Estilo de codificación (Coding Style)

Escribir código que funcione es solo una parte del trabajo de un
programador. Igual de importante es escribir código que cualquier
persona (incluyéndote a ti en unos meses) pueda entender, mantener
y modificar fácilmente.

Un buen estilo de codificación hace que el código sea:

- Más fácil de leer.
- Más fácil de depurar.
- Más sencillo de mantener.
- Más seguro al reducir errores.
- Más fácil de trabajar en equipo.

Recuerda:

"El código se escribe una vez, pero se lee cientos o miles de veces."

Por ello, escribir código limpio es una habilidad fundamental en
JavaScript y en cualquier lenguaje de programación.

====================================================================
SINTAXIS CONSISTENTE
====================================================================

Utiliza siempre un estilo uniforme en todo el proyecto.

Ejemplo:

if (age >= 18) {
    console.log("Mayor de edad");
}

No mezcles distintos estilos:

// Incorrecto

if(age>=18){
console.log("Mayor");
}

El código consistente es mucho más fácil de leer.

====================================================================
LLAVES {}
====================================================================

La mayoría de los proyectos JavaScript utilizan el llamado
"Estilo Egipcio", donde la llave de apertura se coloca en la
misma línea de la sentencia.

Correcto:

if (condition) {
    // código
}

Incorrecto:

if (condition)
{
    // código
}

También debe existir un espacio antes de la llave de apertura.

Correcto:

function saludar() {
}

Incorrecto:

function saludar(){
}

====================================================================
UTILIZA SIEMPRE LLAVES
====================================================================

Aunque JavaScript permite omitir las llaves cuando existe una sola
instrucción, es una práctica poco recomendable.

Permitido:

if (age >= 18)
    console.log("Mayor");

Pero es mucho mejor escribir:

if (age >= 18) {
    console.log("Mayor");
}

¿Por qué?

Porque si más adelante agregas otra línea es muy fácil introducir
errores.

Ejemplo peligroso:

if (age >= 18)
    console.log("Mayor");
    console.log("Puede entrar");

Visualmente parece que ambas líneas pertenecen al if,
pero solamente la primera está dentro de él.

El código realmente ejecuta:

if (age >= 18) {
    console.log("Mayor");
}

console.log("Puede entrar");

Por ello se recomienda usar siempre llaves.

====================================================================
LONGITUD DE LAS LÍNEAS
====================================================================

Las líneas extremadamente largas dificultan la lectura.

En lugar de esto:

if (user.age >= 18 && user.country === "Chile" && user.isPremium && user.accountVerified) {
    console.log("Acceso permitido");
}

Es preferible dividir la condición:

if (
    user.age >= 18 &&
    user.country === "Chile" &&
    user.isPremium &&
    user.accountVerified
) {
    console.log("Acceso permitido");
}

Muchos equipos limitan las líneas a entre 80 y 120 caracteres.

====================================================================
SANGRÍA (INDENTACIÓN)
====================================================================

La sangría permite visualizar claramente la estructura del código.

Generalmente se utilizan:

• 2 espacios
o
• 4 espacios

La mayoría de proyectos modernos utilizan espacios en lugar de
tabulaciones.

Ejemplo:

function saludar(nombre) {
    if (nombre) {
        console.log("Hola " + nombre);
    }
}

Sin sangría sería mucho más difícil de entender.

====================================================================
SANGRÍA VERTICAL
====================================================================

No solo importa la indentación horizontal.

También conviene separar bloques lógicos mediante líneas vacías.

Ejemplo:

function calcularPrecio(precio) {

    let impuesto = precio * 0.19;

    let total = precio + impuesto;

    return total;

}

Los bloques separados hacen que el código sea más fácil de leer.

====================================================================
PUNTO Y COMA ;
====================================================================

JavaScript inserta automáticamente puntos y coma cuando es posible
(ASI: Automatic Semicolon Insertion).

Ejemplo:

let a = 5
let b = 10

JavaScript normalmente interpreta esto como:

let a = 5;
let b = 10;

Sin embargo, existen situaciones donde ASI falla.

Ejemplo:

alert("Hola")

[1,2,3].forEach(console.log);

JavaScript puede interpretarlo como:

alert("Hola")[1,2,3].forEach(...)

lo que produce un error.

Por esta razón se recomienda terminar siempre las sentencias con ;

Ejemplo recomendado:

let nombre = "Juan";

console.log(nombre);

====================================================================
EVITAR ANIDAMIENTOS PROFUNDOS
====================================================================

Mientras más niveles de if, for o while existan, más difícil será
entender el código.

Poco recomendable:

function login(user) {

    if (user) {

        if (user.active) {

            if (user.admin) {

                console.log("Acceso");

            }

        }

    }

}

Mucho mejor:

function login(user) {

    if (!user) {
        return;
    }

    if (!user.active) {
        return;
    }

    if (!user.admin) {
        return;
    }

    console.log("Acceso");

}

Esta técnica se conoce como "Early Return".

Reduce considerablemente la complejidad.

====================================================================
USAR continue PARA REDUCIR ANIDAMIENTO
====================================================================

En los bucles también podemos evitar niveles adicionales.

En lugar de:

for (let i = 0; i < users.length; i++) {

    if (users[i].active) {

        console.log(users[i]);

    }

}

Podemos escribir:

for (let i = 0; i < users.length; i++) {

    if (!users[i].active) {
        continue;
    }

    console.log(users[i]);

}

El flujo queda mucho más limpio.

====================================================================
NOMBRES DESCRIPTIVOS
====================================================================

Utiliza nombres que indiquen claramente qué representan.

Mal:

let x = 100;
let y = 20;

Bien:

let precio = 100;
let descuento = 20;

También en funciones.

Mal:

function f() {
}

Bien:

function calcularTotal() {
}

====================================================================
CONSTANTES
====================================================================

Utiliza const siempre que el valor no vaya a cambiar.

Correcto:

const PI = 3.1416;

const nombre = "Juan";

Solo utiliza let cuando realmente necesites modificar el valor.

let contador = 0;

contador++;

====================================================================
ESPACIOS
====================================================================

Los espacios mejoran mucho la lectura.

Correcto:

let suma = a + b;

Incorrecto:

let suma=a+b;

También:

if (age > 18) {
}

No:

if(age>18){
}

====================================================================
FUNCIONES PEQUEÑAS
====================================================================

Una función debería realizar una sola tarea.

Mal:

function usuario() {

    validar();

    guardar();

    enviarCorreo();

    imprimir();

}

Mucho mejor:

validarUsuario();

guardarUsuario();

enviarCorreo();

imprimirResumen();

Las funciones pequeñas son más fáciles de reutilizar y probar.

====================================================================
ORDEN DE LAS FUNCIONES
====================================================================

Una práctica muy utilizada consiste en escribir primero el código
principal y debajo las funciones auxiliares.

Ejemplo:

iniciarAplicacion();

function iniciarAplicacion() {

    cargarUsuarios();

    mostrarMenu();

}

function cargarUsuarios() {

}

function mostrarMenu() {

}

Así el lector entiende rápidamente qué hace el programa antes de
leer los detalles.

====================================================================
COMENTARIOS
====================================================================

Los comentarios deben explicar el "por qué", no el "qué".

Malo:

// suma 1
contador++;

Bueno:

// El primer usuario comienza en índice 1 por compatibilidad
contador++;

No abuses de los comentarios.

Si el código es claro, muchas veces no hacen falta.

====================================================================
CONSISTENCIA
====================================================================

Lo más importante de un estilo de código no es qué reglas eliges,
sino mantener siempre las mismas.

Si decides utilizar:

• 4 espacios
• comillas dobles
• punto y coma

Hazlo en todo el proyecto.

====================================================================
GUÍAS DE ESTILO
====================================================================

Las empresas suelen utilizar una guía de estilo para que todo el
equipo escriba código de forma uniforme.

Algunas de las más conocidas son:

• Google JavaScript Style Guide
• Airbnb JavaScript Style Guide
• StandardJS
• Idiomatic.JS

No existe una única guía "correcta". Lo importante es que todo el
equipo siga la misma.

====================================================================
LINTERS
====================================================================

Un linter es una herramienta que analiza automáticamente el código
para detectar errores, malas prácticas e inconsistencias de estilo.

Puede ayudarte a encontrar:

• Variables sin usar.
• Errores de sintaxis.
• Problemas de indentación.
• Falta de punto y coma.
• Comparaciones incorrectas.
• Código inalcanzable.
• Errores comunes antes de ejecutar el programa.

El linter más utilizado actualmente es ESLint.

Para instalarlo:

npm install -g eslint

Luego puedes crear su archivo de configuración:

.eslintrc

Ejemplo:

{
    "extends": "eslint:recommended",

    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },

    "rules": {
        "indent": 4,
        "semi": ["error", "always"],
        "no-console": 0
    }
}

La mayoría de editores modernos (VS Code, WebStorm, etc.)
integran ESLint automáticamente y muestran los errores mientras
escribes.

====================================================================
BUENAS PRÁCTICAS GENERALES
====================================================================

- Usa nombres descriptivos.

- Mantén funciones pequeñas.

- Evita anidamientos innecesarios.

- Utiliza siempre llaves {}.

- Usa const cuando el valor no cambie.

- Usa let únicamente cuando sea necesario.

- Mantén una indentación consistente.

- Escribe líneas de longitud razonable.

- Separa bloques lógicos mediante líneas en blanco.

- Finaliza las sentencias con punto y coma.

- Mantén un estilo uniforme en todo el proyecto.

- Utiliza un linter como ESLint para detectar errores y mantener
el código limpio.

*/
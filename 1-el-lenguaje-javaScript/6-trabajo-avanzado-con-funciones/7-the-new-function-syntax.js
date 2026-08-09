/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                         LA SINTAXIS "new Function"                          ║
╚══════════════════════════════════════════════════════════════════════════════╝

JavaScript tiene otra forma de crear funciones:

    new Function()

No es una forma que utilicemos normalmente.

Sin embargo, es importante conocerla porque permite crear una función
dinámicamente a partir de una cadena de texto.

La idea principal es:

    CÓDIGO EN TEXTO
            ↓
    new Function(...)
            ↓
        FUNCIÓN


──────────────────────────────────────────────────────────────────────────────
IMPORTANTE
──────────────────────────────────────────────────────────────────────────────

En la mayoría de los casos debemos utilizar:

    function
    function expressions
    arrow functions

"new Function" se utiliza principalmente en situaciones muy específicas,
cuando necesitamos construir código dinámicamente durante la ejecución.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 1. SINTAXIS
// ═════════════════════════════════════════════════════════════════════════════

/*
La sintaxis general es:

    let func = new Function(arg1, arg2, ..., argN, functionBody);


Los argumentos pueden representar los parámetros de la función.

El último argumento siempre contiene el cuerpo de la función
como una cadena de texto.


Por ejemplo:
*/


let sum = new Function(
    "a",
    "b",
    "return a + b"
);


console.log(sum(1, 2)); // 3


/*
Es equivalente, conceptualmente, a escribir:

    function sum(a, b) {
        return a + b;
    }


Pero hay una diferencia fundamental:

Con "new Function", el código de la función se proporciona
como una cadena de texto.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 2. FUNCIÓN SIN PARÁMETROS
// ═════════════════════════════════════════════════════════════════════════════

/*
También podemos crear una función que no reciba argumentos.

En ese caso solamente necesitamos proporcionar
el cuerpo de la función.
*/


let sayHi = new Function(
    'console.log("Hello")'
);


sayHi(); // Hello


/*
Esto sería equivalente a:

    function sayHi() {
        console.log("Hello");
    }


Pero nuevamente, "new Function" está construyendo la función
a partir de texto.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 3. EL CUERPO DE LA FUNCIÓN ES UNA CADENA
// ═════════════════════════════════════════════════════════════════════════════

/*
Podemos verlo más claramente con este ejemplo:
*/


let operation = "return a * b";

let multiply = new Function(
    "a",
    "b",
    operation
);


console.log(multiply(5, 4)); // 20


/*
Aquí:

    operation

contiene el código como texto:

    "return a * b"


Y después hacemos:

    new Function("a", "b", operation)


Es decir:

    cadena de texto
            ↓
    código de función
            ↓
        ejecución


Esto permite generar funciones dinámicamente.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 4. ¿POR QUÉ ES DIFERENTE DE UNA FUNCIÓN NORMAL?
// ═════════════════════════════════════════════════════════════════════════════

/*
Cuando escribimos una función normalmente:

    function sum(a, b) {
        return a + b;
    }


el código de la función ya forma parte del programa
cuando escribimos nuestro código.


Con "new Function":

    let sum = new Function(
        "a",
        "b",
        "return a + b"
    );


el código puede ser construido durante la ejecución.


Por ejemplo, podríamos recibir una cadena de texto
desde otra fuente y utilizarla para construir una función.

Conceptualmente:

    servidor
        │
        │ código en texto
        ▼
    "return a + b"
        │
        ▼
    new Function(...)
        │
        ▼
    función
*/


// ═════════════════════════════════════════════════════════════════════════════
// 5. EJEMPLO DE CÓDIGO DINÁMICO
// ═════════════════════════════════════════════════════════════════════════════

/*
Supongamos que durante la ejecución recibimos
el cuerpo de una función como texto.

Por ejemplo:
*/


let functionBody = "return a ** 2";

let square = new Function(
    "a",
    functionBody
);


console.log(square(5)); // 25


/*
Aquí la función se construyó utilizando:

    functionBody

que contiene:

    "return a ** 2"


Esto es lo que hace especial a "new Function":

el código puede conocerse DESPUÉS de que el programa
haya comenzado a ejecutarse.


IMPORTANTE:

Recibir y ejecutar código arbitrario desde un servidor
puede ser extremadamente peligroso si la fuente no es confiable.

No debemos utilizar "new Function" para ejecutar código
proporcionado por usuarios sin un diseño de seguridad adecuado.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 6. EL PROBLEMA DEL CLOSURE
// ═════════════════════════════════════════════════════════════════════════════

/*
Aquí aparece una de las características más importantes
de "new Function".

Normalmente, una función recuerda el entorno donde fue creada.

Esto está relacionado con:

    [[Environment]]

La propiedad interna [[Environment]] hace referencia
al Entorno Léxico donde se creó la función.

Gracias a esto funcionan los closures.


Por ejemplo:
*/


function getFuncNormal() {

    let value = "test";

    let func = function () {
        console.log(value);
    };

    return func;
}


let normalFunc = getFuncNormal();

normalFunc(); // "test"


/*
¿Por qué funciona?

Porque la función fue creada dentro de:

    getFuncNormal()


Y por lo tanto puede acceder a:

    value


aunque "getFuncNormal()" ya haya terminado.


Podemos representarlo así:

    getFuncNormal()
            │
            ├── value = "test"
            │
            └── function()
                    │
                    └── recuerda "value"


Esto es un closure.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 7. new Function NO CAPTURA EL ENTORNO EXTERNO
// ═════════════════════════════════════════════════════════════════════════════

/*
Ahora hacemos lo mismo utilizando "new Function".
*/


function getFuncDynamic() {

    let value = "test";

    let func = new Function(
        'console.log(value)'
    );

    return func;
}


let dynamicFunc = getFuncDynamic();

// dynamicFunc();
// x ReferenceError: value is not defined


/*
¿Por qué?

Porque una función creada con "new Function"
NO utiliza el entorno léxico local donde fue creada.


En términos simplificados:

Función normal:

    function () {
        console.log(value);
    }

            │
            ▼
    [[Environment]]
            │
            ▼
    entorno de getFuncNormal()


new Function:

    new Function("console.log(value)")

            │
            ▼
    [[Environment]]
            │
            ▼
    entorno global


Por eso "value" no puede encontrarse.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 8. COMPARACIÓN DIRECTA
// ═════════════════════════════════════════════════════════════════════════════

/*
FUNCIÓN NORMAL
*/


function normalExample() {

    let message = "Hello";

    return function () {
        return message;
    };
}


let normal = normalExample();

console.log(normal()); // "Hello"


/*
La función interna recuerda el entorno de "normalExample".



NEW FUNCTION
*/


function dynamicExample() {

    let message = "Hello";

    return new Function(
        "return message"
    );
}


let dynamic = dynamicExample();

// console.log(dynamic());
// x ReferenceError: message is not defined


/*
"new Function" no puede acceder directamente a "message".

Por eso debemos pasar los datos como parámetros.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 9. LA FORMA CORRECTA DE PASAR DATOS
// ═════════════════════════════════════════════════════════════════════════════

/*
Si una función creada mediante "new Function"
necesita información externa,
lo correcto es pasarla mediante parámetros.

Por ejemplo:
*/


function createFunction() {

    let value = "test";

    let func = new Function(
        "value",
        "return value"
    );

    return func;
}


let func = createFunction();

console.log(func("Hello")); // "Hello"


/*
Aquí no estamos intentando acceder directamente
a la variable externa "value".

En lugar de eso:

    function(value) {
        return value;
    }


recibe el valor explícitamente.


Esto es mejor desde el punto de vista arquitectónico:

    datos
        │
        ▼
    parámetro
        │
        ▼
    función


En lugar de depender de variables externas.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 10. ¿POR QUÉ NO PUEDE ACCEDER AL ENTORNO LOCAL?
// ═════════════════════════════════════════════════════════════════════════════

/*
Una razón importante está relacionada con los MINIFICADORES.


Antes de publicar una aplicación JavaScript,
normalmente el código puede pasar por un minificador.


Un minificador intenta reducir el tamaño del código.

Por ejemplo, podemos escribir:
*/


function example() {

    let userName = "Yvnir";

    console.log(userName);
}


/*
Un minificador podría convertirlo conceptualmente en algo como:

    function example() {
        let a = "Yvnir";
        console.log(a);
    }


Esto es seguro porque "userName" es una variable local.

El minificador sabe dónde se utiliza
y puede cambiar todas sus referencias.


Pero imaginemos que "new Function" pudiera acceder
a variables locales de forma dinámica.


Tendríamos algo como:

    let userName = "Yvnir";

    let func = new Function(
        "return userName"
    );


El minificador podría cambiar:

    userName

por:

    a


y producir:

    let a = "Yvnir";

Pero el código almacenado dentro de la cadena:

    "return userName"

seguiría diciendo:

    userName


El minificador no puede modificar de forma segura
el contenido arbitrario de una cadena como si fuera
una referencia normal del código.


Entonces aparecería un problema:

    variable real:
        a

    variable buscada por new Function:
        userName


No coinciden.


Por eso "new Function" no captura el entorno léxico local.

Esto permite que el código dinámico sea independiente
de los nombres internos utilizados por el minificador.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 11. PASAR PARÁMETROS ES MÁS SEGURO Y PREDECIBLE
// ═════════════════════════════════════════════════════════════════════════════

/*
En lugar de depender de variables externas:

    let userName = "Yvnir";

    let func = new Function(
        "return userName"
    );


es mejor pasar explícitamente el dato:
*/


let userName = "Yvnir";

let greetUser = new Function(
    "name",
    'return "Hello, " + name'
);


console.log(greetUser(userName));
// "Hello, Yvnir"


/*
Aquí tenemos una separación clara:

    userName
        │
        │ argumento
        ▼
    name
        │
        ▼
    función


La función no necesita conocer
de dónde viene el dato.


Esto es una buena práctica de diseño:
pasar explícitamente las dependencias que necesita una función.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 12. OTRA FORMA DE ESCRIBIR LOS PARÁMETROS
// ═════════════════════════════════════════════════════════════════════════════

/*
Por razones históricas, "new Function"
permite escribir los parámetros de diferentes maneras.


Forma estándar:
*/


let sum1 = new Function(
    "a",
    "b",
    "return a + b"
);


/*
También podemos colocar varios parámetros
en una sola cadena separados por comas:
*/


let sum2 = new Function(
    "a,b",
    "return a + b"
);


/*
Incluso podemos utilizar espacios:
*/


let sum3 = new Function(
    "a , b",
    "return a + b"
);


/*
Las tres producen esencialmente la misma función.
*/


console.log(sum1(1, 2)); // 3
console.log(sum2(1, 2)); // 3
console.log(sum3(1, 2)); // 3


/*
La forma más clara normalmente es:

    new Function(
        "a",
        "b",
        "return a + b"
    )


porque permite distinguir fácilmente
cada parámetro.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 13. EL ÚLTIMO ARGUMENTO ES EL CUERPO
// ═════════════════════════════════════════════════════════════════════════════

/*
Recordemos:

    new Function(arg1, arg2, ..., functionBody)


Todos los argumentos excepto el último
se interpretan como parámetros.

El último argumento es el cuerpo de la función.


Ejemplo:
*/


let calculate = new Function(
    "a",              // parámetro
    "b",              // parámetro
    "operator",       // parámetro
    `
        if (operator === "+") {
            return a + b;
        }

        if (operator === "-") {
            return a - b;
        }

        return null;
    `
);


console.log(calculate(10, 5, "+")); // 15
console.log(calculate(10, 5, "-")); // 5


/*
Aquí el último argumento contiene varias líneas de código.

Por eso también podemos utilizar un template literal:

    ` ... `

Esto hace más cómodo escribir cuerpos de funciones
que ocupan varias líneas.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 14. CUÁNDO PODRÍA UTILIZARSE
// ═════════════════════════════════════════════════════════════════════════════

/*
"new Function" tiene usos muy específicos.

Por ejemplo:

    1. Generación dinámica de funciones.
    2. Sistemas que utilizan plantillas dinámicas.
    3. Algunos motores de plantillas.
    4. Herramientas que generan código durante la ejecución.
    5. Situaciones donde el código realmente llega como texto.


Sin embargo, NO debería ser nuestra herramienta habitual
para crear funciones.


En código normal:

    function
    function expression
    arrow function

son opciones mucho más apropiadas.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 15. PRECAUCIÓN DE SEGURIDAD
// ═════════════════════════════════════════════════════════════════════════════

/*
"new Function" ejecuta el texto como código JavaScript.

Por lo tanto, nunca debemos ejecutar directamente
código proporcionado por un usuario no confiable.


Por ejemplo, esto sería peligroso si "code"
proviene directamente de una entrada de usuario:
*/


let code = "return 2 + 2";

let generatedFunction = new Function(code);

console.log(generatedFunction()); // 4


/*
El ejemplo anterior es seguro porque nosotros controlamos
el contenido de "code".


Pero si el contenido fuera controlado por un usuario,
podría contener código arbitrario.

Por eso debemos tener mucho cuidado cuando el código
dinámico proviene de fuentes externas.


Regla práctica:

    "new Function" = ejecutar código generado dinámicamente

y ejecutar código dinámico debe considerarse
una operación sensible desde el punto de vista de seguridad.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 16. RESUMEN
// ═════════════════════════════════════════════════════════════════════════════

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ SINTAXIS                                                                    │
└─────────────────────────────────────────────────────────────────────────────┘

    let func = new Function(
        arg1,
        arg2,
        ...,
        functionBody
    );


Ejemplo:

    let sum = new Function(
        "a",
        "b",
        "return a + b"
    );

    sum(1, 2); // 3


┌─────────────────────────────────────────────────────────────────────────────┐
│ CARACTERÍSTICA PRINCIPAL                                                    │
└─────────────────────────────────────────────────────────────────────────────┘

La función se crea a partir de una cadena de texto.

    "return a + b"
            │
            ▼
    new Function(...)
            │
            ▼
        función


┌─────────────────────────────────────────────────────────────────────────────┐
│ [[Environment]]                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Una función normal recuerda el entorno donde fue creada:

    function getFunc() {

        let value = "test";

        return function () {
            return value;
        };
    }


La función interna puede acceder a "value"
gracias al closure.


En cambio:

    new Function("return value")


NO captura el entorno local.

Su entorno es el global.


┌─────────────────────────────────────────────────────────────────────────────┐
│ VARIABLES EXTERNAS                                                          │
└─────────────────────────────────────────────────────────────────────────────┘

Esto NO funciona:

    function getFunc() {

        let value = "test";

        return new Function("return value");
    }


Porque "value" es una variable local.


Debemos pasar el valor explícitamente:

    function getFunc() {

        let value = "test";

        return new Function(
            "value",
            "return value"
        );
    }


┌─────────────────────────────────────────────────────────────────────────────┐
│ ¿POR QUÉ?                                                                   │
└─────────────────────────────────────────────────────────────────────────────┘

Una de las razones importantes está relacionada
con los minificadores.

Si "new Function" pudiera depender de variables locales,
los minificadores podrían renombrar esas variables
y romper el código dinámico.


Por eso "new Function" no captura el entorno local.


┌─────────────────────────────────────────────────────────────────────────────┐
│ REGLA PRÁCTICA                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

Usa normalmente:

    function
    function expression
    arrow function


Usa "new Function" solo cuando realmente necesitas
crear código dinámicamente.


┌─────────────────────────────────────────────────────────────────────────────┐
│ IDEA PRINCIPAL                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

"new Function" permite convertir texto en una función:

    texto
        ↓
    new Function()
        ↓
    función


Pero esa función:

    - no captura variables locales
    - no tiene acceso al closure donde fue creada
    - no debería utilizarse innecesariamente
    - puede ser peligrosa si ejecuta código no confiable

Y, cuando necesita datos externos:

    - pásalos explícitamente como parámetros.
*/


// ═════════════════════════════════════════════════════════════════════════════
// 17. EJEMPLO FINAL
// ═════════════════════════════════════════════════════════════════════════════

/*
Vamos a reunir todo:
*/


function createMultiplier(multiplier) {

    /*
    En lugar de intentar acceder a "multiplier"
    desde dentro de "new Function", lo pasamos como parámetro.
    */

    let func = new Function(
        "number",
        "multiplier",
        "return number * multiplier"
    );

    return function (number) {

        return func(number, multiplier);
    };
}


let double = createMultiplier(2);
let triple = createMultiplier(3);

console.log(double(10)); // 20
console.log(triple(10)); // 30


/*
Aquí:

    multiplier

pertenece al closure de createMultiplier.


"new Function" no accede directamente a ese closure.

Por eso hacemos:

    func(number, multiplier)


y pasamos los valores explícitamente.


Este patrón demuestra la idea fundamental:

    new Function
            │
            │ no depende directamente
            │ del entorno local
            ▼
    parámetros explícitos
            │
            ▼
        resultado
*/


// ═════════════════════════════════════════════════════════════════════════════
// CONCEPTO PARA RECORDAR
// ═════════════════════════════════════════════════════════════════════════════

/*
                    FUNCIÓN NORMAL
                            │
                            ▼
                recuerda su entorno
                            │
                            ▼
                        CLOSURE


                    new Function
                            │
                            ▼
                NO captura entorno local
                            │
                            ▼
                utiliza el entorno global
                            │
                            ▼
                pasar datos por parámetros


En una frase:

    "new Function crea funciones desde texto, pero no captura el entorno local donde fue creada."

*/
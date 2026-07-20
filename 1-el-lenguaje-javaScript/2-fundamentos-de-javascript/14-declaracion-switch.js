/*==============================================================================
    SWITCH
==============================================================================*/

/*
La sentencia switch permite ejecutar diferentes bloques de código
dependiendo del valor de una expresión.

Es una alternativa más clara que escribir muchos if...else if cuando
todos comparan la misma variable.
*/

/*
Sintaxis

switch (expresión) {

    case valor1:
        // código
        break;

    case valor2:
        // código
        break;

    default:
        // código
}
*/

/*
Funcionamiento

1. Se evalúa la expresión del switch.

2. Se compara con cada case utilizando igualdad estricta (===).

3. Cuando encuentra una coincidencia, ejecuta ese bloque.

4. La ejecución continúa hasta encontrar un break o llegar al final
    del switch.

5. Si ningún case coincide, se ejecuta default (si existe).
*/

/*==============================================================================
    EJEMPLO BÁSICO
==============================================================================*/

let day = 3;

switch (day) {

    case 1:
        console.log("Lunes");
        break;

    case 2:
        console.log("Martes");
        break;

    case 3:
        console.log("Miércoles");
        break;

    default:
        console.log("Día inválido");
}

/*
Salida:

Miércoles
*/

/*==============================================================================
    IMPORTANCIA DE BREAK
==============================================================================*/

/*
La instrucción break termina inmediatamente el switch.

Si se omite, JavaScript continuará ejecutando los siguientes case,
aunque ya no coincidan.

Este comportamiento se conoce como "fall-through".
*/

let number = 2;

switch (number) {

    case 1:
        console.log("Uno");

    case 2:
        console.log("Dos");

    case 3:
        console.log("Tres");

    default:
        console.log("Fin");
}

/*
Salida:

Dos
Tres
Fin

Esto ocurre porque no existe ningún break.
*/

/*
Con break el comportamiento es el esperado.
*/

switch (number) {

    case 1:
        console.log("Uno");
        break;

    case 2:
        console.log("Dos");
        break;

    case 3:
        console.log("Tres");
        break;

    default:
        console.log("Fin");
}

/*
Salida:

Dos
*/

/*==============================================================================
    DEFAULT
==============================================================================*/

/*
default funciona igual que el else de un if.

Se ejecuta cuando ningún case coincide.

No es obligatorio.
*/

let option = 10;

switch (option) {

    case 1:
        console.log("Opción 1");
        break;

    case 2:
        console.log("Opción 2");
        break;

    default:
        console.log("Opción no válida");
}

/*==============================================================================
    AGRUPAR CASE
==============================================================================*/

/*
Varios case pueden compartir el mismo bloque de código.

Esto evita repetir instrucciones.
*/

let month = 2;

switch (month) {

    case 12:
    case 1:
    case 2:
        console.log("Invierno");
        break;

    case 3:
    case 4:
    case 5:
        console.log("Primavera");
        break;

    default:
        console.log("Otro mes");
}

/*
Cuando varios case no tienen break, todos apuntan al mismo código.
*/

/*==============================================================================
    SWITCH UTILIZA ===
==============================================================================*/

/*
switch compara usando igualdad estricta (===).

El valor y el tipo deben coincidir.
*/

let value = "3";

switch (value) {

    case 3:
        console.log("Número");
        break;

    case "3":
        console.log("Cadena");
        break;
}

/*
Salida:

Cadena

Porque:

"3" !== 3
*/

/*==============================================================================
    EXPRESIONES EN SWITCH Y CASE
==============================================================================*/

/*
La expresión del switch y los valores de cada case pueden ser
expresiones válidas de JavaScript.
*/

let a = "1";
let b = 0;

switch (+a) {

    case b + 1:
        console.log("Coinciden");
        break;

    default:
        console.log("No coinciden");
}

/*
+a convierte "1" en 1.

b + 1 también vale 1.

Por eso se ejecuta el primer case.
*/

/*==============================================================================
    SWITCH VS IF
==============================================================================*/

/*
Usa switch cuando:

✔ Comparas una misma variable contra varios valores.

Ejemplo:

switch (color)

case "rojo"

case "azul"

case "verde"

--------------------------------------------------

Usa if cuando:

- Las condiciones son diferentes.

- Utilizas operadores como:

>

<

>=

<=

&&

||

Ejemplo:

if (age >= 18 && hasLicense)

switch no sirve para este tipo de comparaciones.
*/

/*==============================================================================
    BUENAS PRÁCTICAS
==============================================================================*/

/*
- Usa break al final de cada case, salvo que realmente quieras
    aprovechar el fall-through.

- Coloca default al final del switch.

- Agrupa varios case cuando ejecuten exactamente el mismo código.

- Recuerda que switch utiliza ===.

- Si solo tienes dos o tres condiciones, normalmente un if...else
    es más sencillo.
*/

//TAREA 1

//Reescribe la instrucción "switch" como una instrucción "if".

switch (browser) {
    case 'Edge':
        alert( "You've got the Edge!" );
        break;

    case 'Chrome':
    case 'Firefox':
    case 'Safari':
    case 'Opera':
        alert( 'Okay we support these browsers too' );
        break;

    default:
        alert( 'We hope that this page looks ok!' );
}

// SOLUCION TAREA 1

if(browser === 'edge'){
    alert("You' ve got the Edge!")
}else if(browser === 'chrome' || browser === 'Firefox' || browser === 'Safari' || browser === 'Opera'){
    alert('Okay we support these browsers too')
}else{
    alert('We hope that this page looks ok!')
}
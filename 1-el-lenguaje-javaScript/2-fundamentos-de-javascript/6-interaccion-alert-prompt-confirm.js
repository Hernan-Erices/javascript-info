/*==============================================================================
    INTERACCIÓN CON EL USUARIO
    alert(), prompt() y confirm()
==============================================================================*/

/*
JavaScript ofrece tres funciones integradas para interactuar con el usuario
mediante ventanas modales del navegador:

1. alert()   -> Muestra un mensaje.
2. prompt()  -> Solicita información al usuario.
3. confirm() -> Solicita una confirmación (Sí o No).

Estas funciones son muy utilizadas para aprender JavaScript, aunque en
aplicaciones reales suelen reemplazarse por interfaces HTML personalizadas.
*/

/*==============================================================================
    ALERT()
==============================================================================*/

/*
¿Qué hace?

Muestra una ventana modal con un mensaje y un botón "Aceptar".

Sintaxis:

alert(mensaje);

Parámetros:

mensaje -> Texto que se mostrará al usuario.

Valor de retorno:

No devuelve ningún valor (undefined).
*/

alert("¡Hola!");

/*
IMPORTANTE

Una ventana modal bloquea la interacción con la página.

Mientras el usuario no cierre la ventana:

- No puede hacer clic en otros elementos.
- No puede escribir en la página.
- El código queda detenido hasta cerrar la ventana.
*/

/*==============================================================================
    PROMPT()
==============================================================================*/

/*
¿Qué hace?

Muestra una ventana con:

- Un mensaje.
- Un cuadro de texto.
- Botones "Aceptar" y "Cancelar".

Permite solicitar información al usuario.

Sintaxis:

resultado = prompt(mensaje, valorInicial);

Parámetros:

mensaje
Texto que verá el usuario.

valorInicial (opcional)
Valor que aparece escrito por defecto en el cuadro de texto.
*/

/*
Los corchetes que suelen aparecer en la documentación:

prompt(mensaje, [valorInicial])

indican que ese parámetro es opcional.
*/

/*
Valor de retorno

Si el usuario pulsa "Aceptar":
-> Devuelve el texto escrito.

Si pulsa "Cancelar" o presiona Esc:
-> Devuelve null.
*/

let age = prompt("¿Cuántos años tienes?", 18);

alert(`Tienes ${age} años.`);

/*
Ejemplos posibles:

Usuario escribe: 25
Resultado:
age = "25"

Usuario pulsa Cancelar:
Resultado:
age = null

IMPORTANTE

prompt() siempre devuelve texto (string), incluso si el usuario escribe
un número.

Ejemplo:

let edad = prompt("Edad");

console.log(typeof edad); // "string"

Si necesitas trabajar con números, debes convertir el valor.
*/

/*==============================================================================
    CONFIRM()
==============================================================================*/

/*
¿Qué hace?

Muestra una ventana con una pregunta y dos botones:

- Aceptar
- Cancelar

Se utiliza cuando el usuario debe confirmar una acción.

Sintaxis:

resultado = confirm(pregunta);

Parámetros:

pregunta
Texto que verá el usuario.
*/

/*
Valor de retorno

Aceptar
-> true

Cancelar
-> false
*/

let isBoss = confirm("¿Eres el jefe?");

alert(isBoss);

/*
Ejemplos

Aceptar:
isBoss = true

Cancelar:
isBoss = false
*/

/*==============================================================================
    RESUMEN
==============================================================================*/

/*
alert()

- Muestra un mensaje.
- Solo tiene un botón (Aceptar).
- No devuelve ningún valor.

----------------------------------------

prompt()

- Solicita información al usuario.
- Devuelve un string o null.
- Puede tener un valor inicial.

----------------------------------------

confirm()

- Solicita una confirmación.
- Devuelve true o false.
*/
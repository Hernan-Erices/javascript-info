/*======================================================================
                            CÓDIGO NINJA
======================================================================*/

/*

Este capítulo está escrito de forma irónica y satírica.

Presenta una serie de "malos consejos" para escribir código difícil
de leer y mantener. El objetivo no es seguir estas prácticas, sino
reconocerlas y evitarlas.

La idea es reflexionar sobre qué hace que un código sea claro y fácil
de mantener para otros desarrolladores.

*/


//======================================================================
// LA BREVEDAD NO SIEMPRE ES MEJOR
//======================================================================

/*

Escribir el menor número de caracteres posible no significa escribir
mejor código.

Aunque una expresión muy corta pueda parecer ingeniosa, normalmente
resulta más difícil de entender.

Ejemplo:

*/

i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

/*

Este tipo de expresiones obligan al lector a detenerse para entender
qué hacen.

Un código ligeramente más largo, pero claro, suele ser una mejor opción.

*/


//======================================================================
// VARIABLES DE UNA SOLA LETRA
//======================================================================

/*

Usar nombres como:

a
b
c
x
y

hace que el código sea difícil de comprender.

La única excepción habitual es el contador de un bucle sencillo,
como "i" dentro de un for.

Fuera de esos casos, es recomendable utilizar nombres descriptivos.

*/


//======================================================================
// ABREVIATURAS
//======================================================================

/*

Abreviar excesivamente los nombres también dificulta la lectura.

Ejemplos:

list      -> lst
userAgent -> ua
browser   -> brsr

Aunque escribimos menos caracteres, el código pierde claridad.

*/


//======================================================================
// NOMBRES DEMASIADO ABSTRACTOS
//======================================================================

/*

Nombres como:

data
value
item
obj
elem

aportan muy poca información sobre el contenido real de la variable.

Tampoco es recomendable nombrar variables únicamente según su tipo:

str
num
arr

El nombre debería indicar qué representa la información, no solamente
el tipo de dato que almacena.

*/


//======================================================================
// VARIABLES DEMASIADO PARECIDAS
//======================================================================

/*

Utilizar nombres muy similares aumenta la probabilidad de cometer errores.

Ejemplos:

data
date

user
users

item
items

Durante una lectura rápida resulta muy fácil confundirlas.

*/


//======================================================================
// USAR SINÓNIMOS PARA LO MISMO
//======================================================================

/*

Si varias funciones realizan acciones similares, es mejor utilizar
una convención de nombres consistente.

Por ejemplo:

displayMessage()
showMessage()
renderMessage()
paintMessage()

Usar distintos verbos para la misma acción hace pensar que existe
alguna diferencia importante cuando realmente no la hay.

Del mismo modo, no es recomendable usar el mismo prefijo para funciones
que realizan tareas completamente distintas.

*/


//======================================================================
// REUTILIZAR VARIABLES
//======================================================================

/*

Cambiar constantemente el contenido de una misma variable hace que
sea difícil seguir el flujo del programa.

Ejemplo:

*/

function ninjaFunction(elem) {

    // ...

    elem = clone(elem);

    // Ahora "elem" ya no contiene el elemento original.

}

/*

Es preferible crear una nueva variable cuando el significado del dato
ha cambiado.

*/


//======================================================================
// USAR GUIONES BAJOS SIN MOTIVO
//======================================================================

/*

Agregar "_" o "__" delante de nombres únicamente por costumbre puede
confundir a otros desarrolladores.

Ejemplos:

_name
__value

Si el proyecto utiliza una convención específica para estos prefijos,
debe respetarse. En caso contrario, es mejor evitarlos.

*/


//======================================================================
// NOMBRES EXAGERADOS
//======================================================================

/*

Nombres como:

superElement
megaFrame
niceItems

no describen realmente qué representa la variable.

Un buen nombre debe ser descriptivo, no llamativo.

*/


//======================================================================
// OCULTAR VARIABLES EXTERNAS
//======================================================================

/*

Declarar una variable local con el mismo nombre que otra variable
externa puede generar confusión.

Ejemplo:

*/

let user = authenticateUser();

function render() {

    let user = anotherValue();

    // ...

}

/*

Dentro de la función "render", la variable local oculta a la variable
global con el mismo nombre.

Esto puede provocar errores difíciles de detectar.

*/


//======================================================================
// EFECTOS SECUNDARIOS INESPERADOS
//======================================================================

/*

Una función cuyo nombre indica que únicamente consulta información
no debería modificar el estado del programa.

Ejemplos:

isReady()
checkPermission()
findTags()

El lector espera que estas funciones solo devuelvan información.

Si además modifican datos o producen otros efectos, el código se vuelve
difícil de comprender.

*/


//======================================================================
// FUNCIONES QUE HACEN DEMASIADAS COSAS
//======================================================================

/*

El nombre de una función debería describir exactamente su responsabilidad.

Por ejemplo:

validateEmail(email)

El lector espera que únicamente valide el correo electrónico.

Si además muestra mensajes, solicita nuevos datos o modifica otros
elementos del programa, la función deja de tener una responsabilidad
clara y resulta más difícil reutilizarla.

*/
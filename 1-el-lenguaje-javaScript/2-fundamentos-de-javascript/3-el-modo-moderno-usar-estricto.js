/*

EL MODO MODERNO, "USAR ESTRICTO"

Durante mucho tiempo, JS evoluciono sin problemas de compatibilidad.
Se añadieron nuevas características al lenguaje, mientras que la 
funcionalidad antigua permaneció inalterada.

Eso tenía la ventaja de no romper nunca el código existente. Pero la
desventaja era que cualquier error o decision imperfecta tomada por
los creadores de JS quedaban arraigada en el lenguaje para siempre.

Esto fue así hasta 2009, cuando apareció ECMAScript 5 (ES5).
Añadió nuevas características al lenguaje y modificó algunas de las 
existentes. Para que el código antiguo siga funcionando, la mayoría de 
modificaciones están desactivadas por defecto. Es necesario habilitarlas 
explícitamente con una directiva especial: "use strict".

*/

/*--------------------------------------------------------------------------------*/

/*

"USAR ESTRICTO"

La directiva se ve como una cadena: "use strict"o 'use strict'. Cuando se ubica al principio 
de un script, todo el script funciona de la manera “moderna”.

Por ejemplo:

*/

"use strict";
// this code works the modern way.

/*

Pronto aprenderemos sobre funciones (una forma de agrupar comandos), asi que tengamos en cuenta
que "use strict"se puede colocar al principio de una función. Al hacerlo, se habilita el modo
estricto solo en esa funcion. Sin embargo, normalmente se utiliza para todo el script.

Asegúrese de que “use strict” esté en la parte superior.

Asegúrese de que esto "use strict" esté al principio de sus scripts; de lo contrario, es posible 
que no se active el modo estricto.

*/

//El modo estricto no está habilitado aquí:

alert("some code");
// "use strict" below is ignored--it must be at the top

"use strict";
// strict mode is not activated

//Solo se permiten comentarios arriba "use strict".

/*

No hay forma de cancelaruse strict

No existe ninguna directiva "no use strict"que revierta el motor a su comportamiento anterior.
Una vez que entramos en modo estricto, no hay vuelta atrás.

*/

/*----------------------------------------------------------------------------------------*/

/*

CONSOLA DEL NAVEGADOR

Cuando utilice una consola del desarrollador para ejecutar codigo, tenga en cuenta que no
lo hace 'use strict' de forma predeterminada.

A veces, cuando 'use strict' hay algo que marca diferencia, obtendras resultados incorrectos.

Entonces, ¿cómo se hace realmente 'use strict' en la consola?

rimero, puedes intentar presionar para ingresar varias líneas y colocarlas arriba, 
así:Shift+Enteruse strict

'use strict'; <Shift+Enter for a newline>
//  ...your code
<Enter to run>

*/

/*----------------------------------------------------------------------------------------*/

/*

¿Deberíamos “usar estricto”?

La pregunta puede parecer obvia, pero no lo es.

Se podría recomendar comenzar los guiones con "use strict"… ¿Pero sabes qué es genial?

JavaScript moderno admite "clases" y "módulos", estructuras de lenguaje avanzadas que se
habilitan use strictautomáticamente. Por lo tanto, no necesitamos agregar la 
"use strict" directiva si los usamos.

Por ahora, "use strict";es un elemento bienvenido al principio de tus scripts. 

Por ahora, tenemos que saberlo use stricten general.

*/
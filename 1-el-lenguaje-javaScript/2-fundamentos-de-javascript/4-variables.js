/*

VARIABLES

La mayoria de las veces, una aplicacion JS necesita trabajr con informacion. 
Aqui hay 2 ejemplos:

1. Una tienda en linea: la informacion puede incluir los productos que se venden y
un carrito de compras

2. Una aplicacion de chat: la informacion puede incluir usuarios, mensajes y mucho mas.

Las variables se utilizan para almacenar esta informacion.

Una variable es un "almacenamiento con nombre" para datos.
Podemos usar variables para almacenar informacion sobre objetos, visitantes y otros datos.

Para crear una variable en JS, utilice la 'let' palabra clave.

La siguiente instruccion crea (es decir, declara) una variable con el nombre "mensaje":

*/

let message;

//Ahora podemos introducir algunos datos utilizando el operar de asignacion =:

message = 'Hello';

//La cadena ahora se guarda en el area de memoria asociada con la varible.

alert(message);

//Para ser concisos, podemos combinar la declaración y la asignación de variables en una sola línea:

let message = 'Hello!';
alert(message);

//También podemos declarar varias variables en una sola línea:

let user = 'John', age = 25, message = 'Hello'; //puede ser mas corto, pero no es recomendable por legibilidad.

//También podemos cambiarlo tantas veces como queramos:

let message;
message = 'Hello!';
message = 'World!'; // valor cambiado
alert(message);

//También podemos declarar dos variables y copiar datos de una a la otra.

let hello = 'Hello world!';
let message;
message = hello;

alert(hello); // Hello world!
alert(message); // Hello world!

/*---------------------------------------------------------------------------------------*/

/*

NOMENCLATURA DE VARIABLES

En JS existen dos limitaciones en cuanto a los nombres de las variables:

1. El nombre debe contener solo letras, digitos o los simbolos $ y _.
2. El primer caracter no debe ser un digito.

Ejemplos de nombres válidos:

let userName;
let test123;

cuando el nombre contiene varias palabras, se suele utilizar camelCase.

Lo interesante es que el simbolo de dolar '$' y el guion bajo '_' tambien se pueden usar
en nombres. Son simbolso comunes, como las letras, sin ningun significado especial

Estos nombres son validos:

*/

let $ = 1;
let _ = 2;

alert($ + _); // 3

//Asuntos del caso: Las variables llamadas apple y APPLE son dos variables diferentes.
//Se permiten caracteres no latinos, pero no se recomiendan. 
//Es posible utilizar cualquier idioma, incluyendo caracteres cirílicos, logogramas chinos, etc.

/*--------------------------------------------------------------------------------*/

/*

NOMBRES RESERVADOS

Existen una lista de palabras reservadas que no se pueden usar como nombres de variables porque
son utiliadas por el propio lenguaje

Por ejemplo: let, class, return, y functionestán reservados.

El siguiente código produce un error de sintaxis:

let let = 5;
let return = 5;


UNA TAREA SIN 'use strict'

Normalmente, necesitamos definir una variable antes de usarla. Pero antiguamente, era técnicamente 
posible crear una variable simplemente asignandole un valor sin usar let. Esto sigue
funcionando si no incluimos use strict en nuestors scripts para mantener la compatibilidad con
scripts antiguos

Esta es una mala práctica y provocaría un error en modo estricto:

"use strict";

num = 5; 

*/

/*--------------------------------------------------------------------------------------*/

/*

CONSTANTES:

Para declarar una variable constante (inmutable), utilice const en lugar de let:

const myBirthday = '18.04.1982';

Las variables declaradas de forma const se denominan "constantes". No se pueden reasignar,
intentarlo provocaria un error.

const myBirthday = '18.04.1982';
myBirthday = '01.01.2001';

Cuando un programador está seguro de que una variable nunca cambiará, puede declararla 
con const para garantizar y comunicar ese hecho a todos.

CONSTANTES EN MAYUSCULAS

Es practicamente comun utilizar constantes como alias para valores dificiles de recordar
que se conocen antes de la ejecucion.

Dichas constantes se nombran utilizando letras mayusculas y guiones bajos.

Por ejemplo, vamos a crear constantes para los colores en el formato denominado "web" (hexadec)

*/

const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

let color = COLOR_ORANGE;
alert(color); // #FF7F00

/*

Beneficios:

1. COLOR_ORANGEes mucho más fácil de recordar que "#FF7F00".
2. Es mucho más fácil equivocarse al escribir "#FF7F00"que COLOR_ORANGE.
3. Al leer el código, COLOR_ORANGEes mucho más significativo que #FF7F00.


¿Cuándo debemos usar mayúsculas para una constante y cuándo debemos nombrar normalmente? 

Que una variable sea "constante" simplemente significa que su valor nunca cambia, Sin embargo,
algunas constantes se conocen antes de la ejecucion (como el valor hexadecimal del color rojo)
y otras se calculan en tiempo de ejecucion, pero no cambian despues de su asignacion inicial

Por ejemplo:

const pageLoadTime

El valor de pageLoadTimeno se conoce antes de que se cargue la página, por lo que se le asigna
un nombre normal. Pero sigue siendo una constante porque no cambia despues de la asignacion.

En otras palabras, las constantes con nombres en mayusculas solo se utilizan como alias para
valores "codificados directamente".


*/

/*---------------------------------------------------------------------------------*/

/*

NOMBRA LAS COSAS CORRECTAMENTE

El nombre de una variable debe tener un significado claro y obvio, que describa los datos que almacena.

La asignación de nombres a las variables es una de las habilidades más importantes y complejas
en la programacion. Un simple vistazo a los nombres de las variables puede revelar si el codigo
fue escrito por un principiante o por un desarrollador experimentado.

En un proyecto real, la mayor parte del tiempo se dedica a modificar y ampliar una base de
codigo existente, en lugar de escribir algo completamente nuevo desde cero.

1. Utilice nombres legibles para humanos como userNameo shoppingCart.
2. Evita usar abreviaturas o nombres cortos como a, b, y c, a menos que sepas lo que estás haciendo.
3. Utilice nombres lo más descriptivos y concisos posible.
4. Acuerden los términos dentro de su equipo y en su mente. Si a un visitante del sitio se 
le llama "usuario", entonces deberíamos nombrar las variables relacionadas currentUsero newUser
en lugar de currentVisitoro newManInTown.


*/
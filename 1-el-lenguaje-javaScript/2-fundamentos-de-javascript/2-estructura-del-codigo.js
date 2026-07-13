/*

ESTRUCTURA DEL CODIGO

Lo priemro que estudiaremos son los componentes basicos del codigo

Declaraciones:

Las sestencias son construcciones sintacticas y comandos que realizan acciones.

Ya hemos visto una declaración alert('Hello, world!')que muestra el mensaje “¡Hola, mundo!”.

Podemos incluir tantas instrucciones en nuestro código como queramos. Las intrucciones se
pueden seprar con un punto y coma ";"

Por ejemplo, aquí dividimos “Hola Mundo” en dos alertas:

*/

alert('Hello'); alert('World');

//Normalmente, las instrucciones se escriben en lineas separadas.

alert('Hello');
alert('World');

/*

PUNTOS Y COMAS

En la mayoria de los casos, se puede omitir el punto y coma cuando hay un salto de linea

Esto tambien funcionaria:

*/

alert('Hello')
alert('World')

/*

Aqui JS interpreata el salto de linea como un punto y coma "Implicito". Esto se denomina
insercion automatica de punto y coma.

En la mayoria de los casos, un salto de linea implicita un punto y com. Pero "en la mayoria
de los casos" no significa "Siempre".

Hay casos en los que un salto de linea no significa un punto y coma.

Por ejemplo:

*/

alert(3 +
1
+ 2);

/*

El codigo muestra "6" porque JS no inserta punto y comas aqui. Es intuitivo que si la linea
termina con un signo "+", entonces es una "Expresion incompleta", por lo que un punto y coma
seria incorrecto. Y en este caso, funciona como se espera.

Pero hay situaciones en las que JS "Falla" al asumir un punto y coma donde realmente es necesario.

Los errores que se producen en estos casos son bastantes dificiles de encontrar y corregir.

*/

//UN EJEMPLO DE ERROR:

alert("Hello");
[1,2].forEach(alert);

/*

No hace falta pensar en el significado de los parentesis [] y forEach aun.
solo recuerda el resultado de ejecutar el código: muestra Hello, luego 1, luego 2.

Ahora quitemos el punto y coma después de los dos puntos alert.

*/

alert("Hello")
[1, 2].forEach(alert);

/*

La diferencia con respecto al codigo anteriro es solo un caracter: El punto y coma al final de
la primera linea ha desaparecido.

Si ejecutamos este codigo, solo 'Hello' se muestra primero (y hay un error; es posible que
tengas que abrir la consola para verlo). YA no aprecen numeros

Eso se debe a que JS no asume que haya punto y coma antes de los corchetes [...]. por lo tanto,
el codigo del ultimo ejemplo se trata como una sola instruccion.

Asi es como lo ve el motor:

*/

alert("Hello")[1, 2].forEach(alert);

/*

Parece raro, ¿verdad? Esta fusión es incorrecta. Necesitamos añadir un punto y coma alert
para que el código funcione correctamente.

*/
/*

¿Qué es JavaScript?

JS se creo principalmente para "dar vida a las paginas web"

Los programas escrito en JS se denominan script. Los script
proporcionan y ejecutan como texto plano. No requieren preparacion
ni compilacion especiales para su funcionamiento.

JS puede ejecutarse no solo en el navegador, sino tambien en el
servidor, o de hecho en cualquier dispositivo que tenga un programa
especial llamado motor de JS.

Los distintos motores tienen diferentes "nombres en clave".
por ejemplo:

1. V8: en Chrome, Opera y Edge
2. SpiderMonkey: en Firefox

existen otros nombres en clave como "Chakra" para IE y
"JavaScriptCore", "Nitro" y "SquirrelFish" para Safari, etc.

*/

/*--------------------------------------------------------------------*/

/*

¿Cómo funcionan los motores?

1. El motor (integrado si se trata de un navegador) lee ("analiza")
el script

2. Luego convierte ("compila") el script a codigo maquina

3. Y entonces el codigo maquina se ejcuta, bastante rapido

El motor aplica optimizaciones en cada paso del proceso. Incluso
supervisa el script compilado mientras se ejcuta, analiza los datos
que los atraviesan y optimiza aun mas el codigo maquina basandose
en ese conocimiento.

*/

/*--------------------------------------------------------------------*/

/*

¿Qué puede hacer JavaScript en el navegador?

JS Moderno es un lenguaje de programcion "seguro". No proporciona
acceso de bajo nivel a la memoria ni a la CPU, ya que fue creado
inicialmente para navegadores que no lo requieren.

JS depende en gran medida del entorno en el que se ejecuta.
Por ejemplo, Node.js admite funciones que permiten a JS leer y
escribir archivos arbitrarios, realizar solicitudes de red, etc.

JS se ejecuta en el navagador puede hacer todo lo relacionaod con
la manipulacion de paginas web, la interaccion con el usuario y el
servidor web.


¿Qué NO puede hacer JavaScript en el navegador?

Lasa capacidades de JS en el navegador estan limitadas para proteger
la seguridad del usuario. EL objetivo es impedir que una pagina web
maliciosa acceda a informacion privaada o dañe los datos del usuario.

Ejemplos:

1. El codigo JS no pude leer ni escribir archivos en el disco duro,
copiarlos ni ejecutar programas, NO tiene acceso directo al SO.
Los navegadores modernos permiten trabajr con archivos, pero el 
acceso es limitado y solo se proporciona si el usuario lo permite
entre otras funciones como el acceso a camara, microfono y otros
dispositivos.

*/

/*--------------------------------------------------------------------*/

/*

¿Qué hace que JavaScript sea único?

Tiene al menos 3 grandes ventajas:

1. Integracion completa con HTML/CSS.
2. Las cosas sencillas se hacen de forma sencilla.
3. Compatible con los principales navegadores y habilitado por defecto en todos ellos.

Dicho esto, JS se puede utilizar para crear servidores, aplicaciones
moviles, etc.

*/
/*

HOLA MUNDO

Esta parte trata sobre JS Basico.Pero necesitamos un entorno de trabajo para ejecutar 
nuestros scripts

La etiqueta ?script?

Los programas JS se pueden insertar en casi cualquier lugar de un documento HTML utilizando
la <script> etiqueta.

EJEMPLO: 

<!DOCTYPE HTML>
<html>

<body>

<p>Before the script...</p>

<script>
    alert( 'Hello, world!' );
</script>

<p>...After the script.</p>

</body>

</html>

*/

/*-------------------------------------------------------------------*/

/*

MARCADO MORDERNO

La <script>etiqueta tiene algunos atributos que rara vez se utilizan hoy en día, Pero que aun
se pueden encontrar en codigo antiguo:

El type atributo: <script type=....>

El antiguo estandar HTML, HTML4, requería que un script tuviera un atributo `<script>` type.
Normalmente era `<script>` type="text/javascript". Ya no es necesario. Además, el estándar
HTML moderno cambió.

El languageatributo:<script language=?> Este atributo estaba pensado para indicar el idioma del script.
embargo, ya no tiene sentido, puesto que JavaScript es el idioma predeterminado.

*/

/*-------------------------------------------------------------------*/

/*

SCRIPTS EXTERNOS

Si tenemos mucho codigo JS, podemos ponerlo en un archivo aparte.
Los archivos de script se adjuntan al HTML con el src atributo:

<script src="/path/to/script.js"></script>

Aquí, /path/to/script.jsse indica la ruta absoluta al script desde la raíz del sitio. 

También podemos proporcionar una URL completa. Por ejemplo:

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>

Para adjuntar varios scripts, utilice varias etiquetas:

<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>

*/
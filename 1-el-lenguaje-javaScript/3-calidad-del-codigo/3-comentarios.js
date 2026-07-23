/*======================================================================
https://javascript.info/comments
                    COMENTARIOS EN JAVASCRIPT
======================================================================*/

/*

Los comentarios permiten agregar explicaciones al código sin afectar
su ejecución. El motor de JavaScript ignora completamente todo el
contenido de un comentario.

Son una herramienta muy útil para documentar el código, explicar
decisiones importantes, describir algoritmos complejos o desactivar
temporalmente una parte del programa durante las pruebas.

Sin embargo, un exceso de comentarios puede dificultar la lectura.
Siempre que sea posible, el propio código debe ser lo suficientemente
claro para explicarse por sí mismo.

JavaScript admite dos tipos de comentarios:

1. Comentarios de una sola línea.
2. Comentarios de múltiples líneas.

*/


//======================================================================
// COMENTARIOS DE UNA SOLA LÍNEA
//======================================================================

/*

Comienzan con //

Todo lo que se encuentre después de // en esa misma línea será ignorado
por JavaScript.

Se utilizan normalmente para:

- Explicar una línea específica.
- Agregar pequeñas aclaraciones.
- Desactivar temporalmente una instrucción.

Ejemplo:

*/

let edad = 20; // Edad del usuario

// console.log("Esta línea no se ejecutará");


//======================================================================
// COMENTARIOS DE MÚLTIPLES LÍNEAS
//======================================================================

/*

Comienzan con:

    /*

y terminan con:

    *\/

Todo el contenido entre ambos símbolos será ignorado.

Son ideales para:

- Explicaciones largas.
- Documentación.
- Describir funciones complejas.
- Crear encabezados dentro del código.

Ejemplo:

*/

/*

Este programa calcula el precio final
de un producto considerando descuentos
e impuestos.

*/

let precio = 1000;


//======================================================================
// MALOS COMENTARIOS
//======================================================================

/*

Un error muy común entre los principiantes es comentar exactamente
lo mismo que el código ya dice.

Ejemplo:

*/

// Suma 5 al contador
contador += 5;

/*

Ese comentario no aporta información nueva.

Cualquier persona que lea el código puede entender fácilmente
qué hace esa línea.

Mientras más obvio sea un comentario, menos útil resulta.

Si necesitas explicar cada línea del programa, probablemente el
problema no sean los comentarios, sino que el código puede mejorarse.

*/


//======================================================================
// EL CÓDIGO DEBE SER AUTOEXPLICATIVO
//======================================================================

/*

Un buen código intenta describirse por sí mismo mediante nombres claros.

En lugar de escribir comentarios para explicar variables con nombres
confusos, es preferible usar nombres descriptivos.

Malo:

*/

let x = 0;

// aumenta x
x++;

/*

Mejor:

*/

let contadorUsuarios = 0;

contadorUsuarios++;


/*

Ahora el comentario ya no es necesario.

Los nombres explican perfectamente qué representa la variable.

*/


//======================================================================
// REFACTORIZAR ES MEJOR QUE COMENTAR
//======================================================================

/*

Cuando un bloque de código necesita demasiados comentarios para ser
entendido, normalmente es una señal de que conviene dividirlo en funciones
más pequeñas.

Ejemplo poco legible:

*/

function mostrarPrimos(limite) {

siguienteNumero:

    for (let i = 2; i < limite; i++) {

        // verificar si es primo

        for (let j = 2; j < i; j++) {

            if (i % j === 0) {
                continue siguienteNumero;
            }

        }

        console.log(i);

    }

}

/*

Una mejor alternativa consiste en mover esa lógica a una función.

*/

function esPrimo(numero) {

    for (let i = 2; i < numero; i++) {

        if (numero % i === 0) {
            return false;
        }

    }

    return true;

}

function mostrarPrimos2(limite) {

    for (let i = 2; i < limite; i++) {

        if (!esPrimo(i)) continue;

        console.log(i);

    }

}

/*

Ahora prácticamente no hacen falta comentarios.

Los nombres de las funciones describen claramente su propósito.

Este tipo de código recibe el nombre de código autoexplicativo.

*/


//======================================================================
// DIVIDIR EL CÓDIGO EN FUNCIONES
//======================================================================

/*

Supongamos el siguiente código:

*/

// Preparar café
// ...

// Calentar leche
// ...

// Servir café
// ...

/*

En lugar de depender de comentarios, es mucho mejor expresar
la intención mediante funciones.

*/

prepararCafe();
calentarLeche();
servirCafe();

/*

Los nombres de las funciones comunican perfectamente qué ocurre
en cada paso del proceso.

Esto mejora la organización, facilita el mantenimiento y reduce
la necesidad de comentarios.

*/


//======================================================================
// ¿CUÁNDO SÍ DEBEMOS COMENTAR?
//======================================================================

/*

Existen situaciones donde un comentario sí aporta información valiosa.

Los mejores comentarios explican aquello que el código por sí solo
no puede expresar.

Por ejemplo:

- La razón por la que se tomó una decisión.
- Restricciones técnicas.
- Casos especiales.
- Algoritmos complejos.
- Advertencias importantes.
- Arquitectura del sistema.

Ejemplo:

*/

const MAX_INTENTOS = 5;

// El servidor bloquea la IP después de 5 intentos fallidos.


//======================================================================
// EXPLICAR EL "POR QUÉ", NO EL "QUÉ"
//======================================================================

/*

El código normalmente ya muestra QUÉ hace.

Lo verdaderamente útil es explicar POR QUÉ se hace de esa manera.

Ejemplo:

*/

usuario.edad = 18;

/*

No sería útil escribir:

    // Asignamos 18 a la edad

En cambio sí tendría sentido algo como:

*/

// La API rechaza usuarios menores de 18 años.

usuario.edad = 18;


/*

Ese comentario explica una decisión de negocio que el código
no puede expresar por sí solo.

*/


//======================================================================
// DOCUMENTAR FUNCIONES (JSDoc)
//======================================================================

/*

Cuando una función será utilizada por otras personas o en proyectos
grandes, es recomendable documentarla utilizando JSDoc.

JSDoc permite indicar:

- Qué hace la función.
- Qué parámetros recibe.
- Qué tipo de dato recibe cada parámetro.
- Qué devuelve.

Muchos editores (como VS Code o WebStorm) utilizan esta información
para mostrar ayuda automática mientras escribimos código.

Ejemplo:

*/

/**
 * Calcula una potencia.
 *
 * @param {number} base Número base.
 * @param {number} exponente Potencia a elevar.
 * @returns {number} Resultado de la operación.
 */

function potencia(base, exponente) {

    return base ** exponente;

}

console.log(potencia(2, 5));


//======================================================================
// COMENTAR CÓDIGO COMPLEJO
//======================================================================

/*

Si una parte del código implementa un algoritmo difícil de entender,
es recomendable agregar una explicación.

Ejemplo:

*/

/*

Se utiliza búsqueda binaria porque la lista ya está ordenada,
reduciendo la complejidad de O(n) a O(log n).

*/


//======================================================================
// COMENTAR LIMITACIONES O CASOS ESPECIALES
//======================================================================

/*

También es recomendable documentar situaciones especiales.

Ejemplo:

*/

// Esta función solo acepta fechas posteriores al año 1970.


//======================================================================
// COMENTARIOS TEMPORALES
//======================================================================

/*

Durante el desarrollo es común desactivar código temporalmente.

Ejemplo:

*/

// console.log(usuario);

// iniciarSesion(usuario);

// enviarCorreo(usuario);


/*

Sin embargo, cuando el proyecto esté terminado, es recomendable
eliminar ese código comentado si ya no será necesario.

Los sistemas de control de versiones como Git conservan el historial,
por lo que no es necesario dejar grandes bloques de código comentados.

*/


//======================================================================
// BUENAS PRÁCTICAS
//======================================================================

/*

- Escribe código que sea fácil de entender.

- Usa nombres descriptivos para variables y funciones.

- Comenta únicamente cuando el código no pueda explicar completamente la intención.

- Explica el "por qué" de una decisión, no el "qué".

- Documenta funciones importantes con JSDoc.

- Evita comentarios redundantes.

- Elimina comentarios obsoletos o código comentado que ya no sea necesario.

*/
/*
https://javascript.info/testing-mocha
=========================================================
PRUEBAS AUTOMATIZADAS CON MOCHA
=========================================================

Las pruebas automatizadas permiten verificar automáticamente
que nuestro código funciona correctamente.

En lugar de ejecutar la función manualmente cada vez que
hacemos un cambio, escribimos pruebas independientes que
comprueban distintos casos y comparan el resultado obtenido
con el resultado esperado.

Las pruebas automatizadas son muy utilizadas tanto en el
aprendizaje como en proyectos reales.

=========================================================
¿POR QUÉ NECESITAMOS PRUEBAS?
=========================================================

Cuando desarrollamos una función, normalmente imaginamos qué
debería hacer para distintos valores de entrada.

Durante el desarrollo solemos hacer pruebas manuales.

Ejemplo:

function suma(a, b) {
    return a + b;
}

console.log(suma(2, 3)); // 5

Si encontramos un error, corregimos el código y volvemos
a ejecutarlo.

El problema es que las pruebas manuales son propensas a
errores.

Ejemplo:

- Probamos f(1) y funciona.
- Probamos f(2) y falla.
- Corregimos el problema.
- Volvemos a probar únicamente f(2).
- Olvidamos comprobar nuevamente f(1).

Es posible que al corregir un error hayamos provocado otro
sin darnos cuenta.

Las pruebas automatizadas evitan este problema porque
ejecutan todos los casos de prueba cada vez que modificamos
el código.

=========================================================
BDD (Behavior Driven Development)
Desarrollo Dirigido por el Comportamiento
=========================================================

BDD es una técnica de desarrollo basada en escribir primero
el comportamiento esperado de una función.

BDD combina tres elementos:

- Pruebas.
- Documentación.
- Ejemplos.

Primero se describe qué debe hacer la función y luego se
desarrolla el código hasta que todas las pruebas pasen.

=========================================================
ESPECIFICACIÓN
=========================================================

Antes de implementar una función se puede escribir una
especificación que describa cómo debe comportarse.

Ejemplo:

describe("pow", function () {

it("eleva un número a una potencia", function () {
    assert.equal(pow(2, 3), 8);
});

});

Una especificación está formada principalmente por:

---------------------------------------------------------
describe()
---------------------------------------------------------

Agrupa un conjunto de pruebas relacionadas.

describe("pow", function () {

});

---------------------------------------------------------
it()
---------------------------------------------------------

Describe un caso de prueba específico.

it("2 elevado a 3 es 8", function () {

});

---------------------------------------------------------
assert
---------------------------------------------------------

Comprueba que el resultado obtenido sea el esperado.

assert.equal(pow(2, 3), 8);

Si los valores coinciden, la prueba pasa.

Si no coinciden, la prueba falla.

=========================================================
FLUJO DE DESARROLLO CON BDD
=========================================================

El proceso normalmente sigue estos pasos:

1. Escribir una especificación.

2. Crear una implementación inicial.

3. Ejecutar las pruebas.

4. Corregir el código hasta que todas las pruebas pasen.

5. Agregar nuevas pruebas.

6. Volver a corregir la implementación.

Este proceso se repite hasta completar la funcionalidad.

=========================================================
LIBRERÍAS UTILIZADAS
=========================================================

Para ejecutar las pruebas se utilizan principalmente tres
bibliotecas.

---------------------------------------------------------
Mocha
---------------------------------------------------------

Es el framework de pruebas.

Proporciona funciones como:

describe()
it()

y ejecuta todas las pruebas.

---------------------------------------------------------
Chai
---------------------------------------------------------

Proporciona las funciones de comprobación (assert).

Ejemplos:

assert.equal()
assert.strictEqual()
assert.isTrue()
assert.isFalse()
assert.isNaN()

---------------------------------------------------------
Sinon
---------------------------------------------------------

Permite crear espías, simulaciones y reemplazar funciones.

Se utiliza en pruebas más avanzadas.

=========================================================
ESTRUCTURA BÁSICA
=========================================================

Normalmente el proyecto contiene:

- La función que queremos probar.
- Un archivo con las pruebas.
- Mocha para ejecutar esas pruebas.

=========================================================
MEJORANDO LAS PRUEBAS
=========================================================

Supongamos la siguiente prueba:

describe("pow", function () {

it("eleva a una potencia", function () {
    assert.equal(pow(2, 3), 8);
});

});

Una implementación como esta haría pasar la prueba:

function pow(x, n) {
    return 8;
}

Aunque la prueba pasa, la función realmente está mal.

Por eso debemos agregar más casos.

Ejemplo:

describe("pow", function () {

it("2 elevado a 3 es 8", function () {
    assert.equal(pow(2, 3), 8);
});

it("3 elevado a 4 es 81", function () {
    assert.equal(pow(3, 4), 81);
});

});

Es preferible crear varias pruebas pequeñas que una única
prueba con muchas comprobaciones.

=========================================================
GENERAR PRUEBAS AUTOMÁTICAMENTE
=========================================================

Cuando queremos probar muchos valores similares podemos
generar las pruebas con un bucle.

Ejemplo:

describe("pow", function () {

function makeTest(x) {

    let expected = x * x * x;

    it(`${x} elevado a 3 es ${expected}`, function () {
        assert.equal(pow(x, 3), expected);
    });

}

for (let x = 1; x <= 5; x++) {
    makeTest(x);
}

});

=========================================================
DESCRIBE ANIDADOS
=========================================================

Los bloques describe() pueden contener otros describe()
para organizar mejor las pruebas.

Ejemplo:

describe("pow", function () {

describe("potencia 3", function () {

    // pruebas

});

});

Esto ayuda a mantener las pruebas agrupadas y organizadas.

=========================================================
before, after, beforeEach y afterEach
=========================================================

Mocha permite ejecutar código automáticamente antes y
después de las pruebas.

before()

Se ejecuta una sola vez antes de todas las pruebas.

after()

Se ejecuta una sola vez al finalizar todas las pruebas.

beforeEach()

Se ejecuta antes de cada prueba.

afterEach()

Se ejecuta después de cada prueba.

Ejemplo:

describe("test", function () {

before(() => { });

after(() => { });

beforeEach(() => { });

afterEach(() => { });

});

Generalmente se utilizan para preparar el entorno de pruebas,
reiniciar variables o limpiar información.

=========================================================
AMPLIANDO LA ESPECIFICACIÓN
=========================================================

Cuando una funcionalidad básica ya funciona, se agregan
nuevos casos de prueba.

Ejemplo:

it("para exponentes negativos devuelve NaN", function () {
    assert.isNaN(pow(2, -1));
});

it("para exponentes decimales devuelve NaN", function () {
    assert.isNaN(pow(2, 1.5));
});

Al agregar estas pruebas es normal que inicialmente fallen.

Después se modifica la implementación hasta que vuelvan a
pasar correctamente.

=========================================================
ALGUNAS ASERCIONES DE CHAI
=========================================================

assert.equal(valor1, valor2)

Comprueba igualdad.

----------------------------------

assert.strictEqual(valor1, valor2)

Comprueba igualdad estricta (===).

----------------------------------

assert.notEqual()

Comprueba que los valores sean diferentes.

----------------------------------

assert.notStrictEqual()

Comprueba desigualdad estricta.

----------------------------------

assert.isTrue(valor)

Comprueba que el valor sea true.

----------------------------------

assert.isFalse(valor)

Comprueba que el valor sea false.

----------------------------------

assert.isNaN(valor)

Comprueba que el resultado sea NaN.

*/
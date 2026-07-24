/*
==================================================
RECOLECCIÓN DE BASURA (GARBAGE COLLECTION)
==================================================

JavaScript administra la memoria automáticamente.

Cuando un dato deja de ser necesario, el motor de
JavaScript puede liberar la memoria que ocupa.
*/


/*
==================================================
ALCANZABILIDAD (REACHABILITY)
==================================================

Un valor es alcanzable si todavía puede accederse a él.

Mientras un objeto sea alcanzable, permanecerá en memoria.

Las principales raíces (roots) son:

• La función que se está ejecutando.
• Sus variables locales y parámetros.
• Las funciones de la cadena de llamadas.
• Las variables globales.
*/


/*
==================================================
OBJETO ALCANZABLE
==================================================
*/

let user = {
    name: "John"
};


/*
==================================================
OBJETO INALCANZABLE
==================================================

Al eliminar la última referencia, el objeto deja
de ser alcanzable y podrá eliminarse de la memoria.
*/

user = null;


/*
==================================================
DOS REFERENCIAS
==================================================

Un objeto permanece en memoria mientras exista
al menos una referencia hacia él.
*/

let person = {
    name: "John"
};

let admin = person;

person = null;

// El objeto sigue siendo accesible mediante admin.


/*
==================================================
OBJETOS ENTRELAZADOS
==================================================

Los objetos pueden referenciarse entre sí.
*/

function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;

    return {
        father: man,
        mother: woman
    };
}

let family = marry(
    { name: "John" },
    { name: "Ann" }
);


/*
==================================================
ELIMINAR REFERENCIAS
==================================================

Si un objeto deja de tener referencias entrantes,
se vuelve inalcanzable y puede eliminarse.
*/

delete family.father;
delete family.mother.husband;


/*
==================================================
ISLA INALCANZABLE
==================================================

Si un conjunto completo de objetos deja de estar
conectado con alguna raíz, todo el conjunto será
eliminado.
*/

family = null;


/*
==================================================
ALGORITMO "MARK AND SWEEP"
==================================================

El recolector de basura funciona así:

1. Marca las raíces.
2. Marca todos los objetos accesibles desde ellas.
3. Repite el proceso con sus referencias.
4. Elimina los objetos que no fueron marcados.
*/


/*
==================================================
OPTIMIZACIONES
==================================================

• Recolección generacional
    Divide los objetos en "nuevos" y "antiguos".
    Los nuevos se revisan con mayor frecuencia.

• Recolección incremental
    Divide el trabajo en pequeñas partes para evitar
    pausas largas.

• Recolección en tiempo inactivo
    Intenta ejecutarse cuando la CPU está libre para
    reducir el impacto en el rendimiento.
*/
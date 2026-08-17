// ============================================================
// GETTERS Y SETTERS
// ============================================================


// ============================================================
// 1. TIPOS DE PROPIEDADES
// ============================================================

// En JavaScript existen dos tipos principales de propiedades:
//
// 1. Propiedades de datos
// 2. Propiedades de acceso
//
// Las propiedades de datos son las que hemos utilizado hasta ahora.
// Almacenan directamente un valor.
//
// Ejemplo:

let user = {
    name: "John",
    age: 25
};


// Una propiedad de acceso no almacena necesariamente un valor
// directamente. En su lugar, utiliza funciones que se ejecutan
// automáticamente al LEER o MODIFICAR la propiedad.
//
// Estas funciones son:
//
// get -> se ejecuta al leer.
// set -> se ejecuta al asignar.


// ============================================================
// 2. GETTER
// ============================================================

// Un getter se ejecuta automáticamente cuando intentamos
// obtener el valor de una propiedad.
//
// Sintaxis:
//
// get propiedad() {
//     ...
// }


let user2 = {

    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    }

};


// El getter se ejecuta automáticamente:

console.log(user2.fullName);

// John Smith


// IMPORTANTE:
//
// No se utiliza:
//
// user2.fullName()
//
// Se utiliza:
//
// user2.fullName
//
// Desde el exterior, el getter se comporta como una propiedad
// normal, aunque internamente ejecuta una función.


// ============================================================
// 3. SETTER
// ============================================================

// Un setter se ejecuta automáticamente cuando asignamos
// un valor a una propiedad.
//
// Sintaxis:
//
// set propiedad(valor) {
//     ...
// }


let user3 = {

    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }

};


// El setter recibe el valor asignado:

user3.fullName = "Alice Cooper";

console.log(user3.name);    // Alice
console.log(user3.surname); // Cooper


// Desde el exterior parece una asignación normal:
//
// user3.fullName = "Alice Cooper";
//
// Pero internamente se ejecuta:
//
// set fullName(value) { ... }


// ============================================================
// 4. GETTER SIN SETTER
// ============================================================

// Podemos crear una propiedad que solamente tenga getter.

let user4 = {

    name: "John",

    get upperName() {
        return this.name.toUpperCase();
    }

};

console.log(user4.upperName); // JOHN


// Si intentamos asignarle un valor:
//
// user4.upperName = "Pete";
//
// En modo estricto se producirá un error porque no existe
// un setter que pueda manejar la asignación.


// ============================================================
// 5. PROPIEDADES "VIRTUALES"
// ============================================================

// Un getter puede crear propiedades cuyo valor se calcula
// a partir de otras propiedades.
//
// Por ejemplo:
//
// name + surname -> fullName


let user5 = {

    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    }

};

console.log(user5.fullName);

// John Smith


// fullName no necesita almacenarse directamente.
//
// Si name o surname cambian, fullName también cambia:

user5.name = "Alice";

console.log(user5.fullName);

// Alice Smith


// Por eso podemos considerar fullName una propiedad "virtual":
// su valor se obtiene dinámicamente a partir de otros datos.


// ============================================================
// 6. DESCRIPTORES DE PROPIEDADES DE ACCESO
// ============================================================

// Las propiedades de acceso tienen un descriptor diferente
// al de las propiedades de datos.
//
// Propiedad de datos:
//
// {
//     value,
//     writable,
//     enumerable,
//     configurable
// }
//
// Propiedad de acceso:
//
// {
//     get,
//     set,
//     enumerable,
//     configurable
// }


// Por ejemplo:

let user6 = {

    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }

};


console.log(
    Object.getOwnPropertyDescriptor(user6, "fullName")
);


// Conceptualmente:
//
// {
//     get: function,
//     set: function,
//     enumerable: true,
//     configurable: true
// }


// ============================================================
// 7. CREAR GETTERS Y SETTERS CON Object.defineProperty()
// ============================================================

// También podemos crear propiedades de acceso mediante
// Object.defineProperty().
//
// Ejemplo:

let user7 = {
    name: "John",
    surname: "Smith"
};


Object.defineProperty(user7, "fullName", {

    get() {
        return `${this.name} ${this.surname}`;
    },

    set(value) {
        [this.name, this.surname] = value.split(" ");
    }

});


console.log(user7.fullName); // John Smith

user7.fullName = "Alice Cooper";

console.log(user7.name);    // Alice
console.log(user7.surname); // Cooper


// Como no especificamos enumerable ni configurable,
// al utilizar defineProperty() para crear la propiedad,
// ambos serán false por defecto.


// Si queremos que aparezca en enumeraciones:

Object.defineProperty(user7, "fullName", {
    enumerable: true
});


// ============================================================
// 8. UNA PROPIEDAD NO PUEDE SER DE DATOS Y DE ACCESO
//    AL MISMO TIEMPO
// ============================================================

// Una propiedad debe ser:
//
// Propiedad de datos:
//
// {
//     value,
//     writable,
//     enumerable,
//     configurable
// }
//
// O propiedad de acceso:
//
// {
//     get,
//     set,
//     enumerable,
//     configurable
// }


// No podemos mezclar ambos tipos.


// Esto produciría un error:
//
// Object.defineProperty({}, "prop", {
//
//     get() {
//         return 1;
//     },
//
//     value: 2
//
// });


// No podemos tener simultáneamente:
//
// get / set
//
// y:
//
// value / writable


// ============================================================
// 9. GETTERS Y SETTERS PARA VALIDAR DATOS
// ============================================================

// Uno de los usos más importantes de los setters es controlar
// qué valores pueden asignarse a una propiedad.
//
// Podemos validar el valor antes de almacenarlo.

let user8 = {

    get name() {
        return this._name;
    },

    set name(value) {

        if (value.length < 4) {
            console.log(
                "El nombre debe tener al menos 4 caracteres."
            );

            return;
        }

        this._name = value;
    }

};


user8.name = "Pete";

console.log(user8.name); // Pete


user8.name = "Jo";

// El valor no se almacena porque no cumple la condición.


// ============================================================
// 10. PROPIEDADES INTERNAS CON "_"
// ============================================================

// Es común utilizar una propiedad como:
//
// _name
//
// para almacenar internamente el valor real.
//
// Mientras que:
//
// name
//
// actúa como interfaz pública mediante getter/setter.

let user9 = {

    get name() {
        return this._name;
    },

    set name(value) {

        if (value.length < 4) {
            return;
        }

        this._name = value;
    }

};


user9.name = "John";

console.log(user9.name);  // John
console.log(user9._name); // John


// El prefijo "_" es una CONVENCIÓN.
//
// JavaScript no impide acceder a:
//
// user9._name
//
// pero normalmente indica que esa propiedad debe considerarse
// interna y no debería modificarse directamente desde fuera.


// ============================================================
// 11. GETTER + SETTER COMO CAPA DE CONTROL
// ============================================================

// El patrón general es:
//
// propiedad pública
//        ↓
//     setter
//        ↓
// validación / transformación
//        ↓
// propiedad interna
//
//
// Y al leer:
//
// propiedad pública
//        ↓
//     getter
//        ↓
// propiedad interna


let user10 = {

    get age() {
        return this._age;
    },

    set age(value) {

        if (value < 0) {
            return;
        }

        this._age = value;
    }

};


user10.age = 25;

console.log(user10.age); // 25


// Esto permite controlar cómo se leen y modifican los datos.


// ============================================================
// 12. GETTERS PARA VALORES CALCULADOS
// ============================================================

// Un getter también puede calcular un valor a partir
// de otros datos almacenados.

// Ejemplo:

let user11 = {

    name: "John",
    birthday: new Date(1992, 6, 1),

    get age() {

        let currentYear = new Date().getFullYear();

        return currentYear - this.birthday.getFullYear();
    }

};


console.log(user11.age);


// age no necesita almacenarse.
//
// Se calcula cada vez que accedemos a:
//
// user11.age


// Esto permite cambiar la forma en que almacenamos los datos
// sin necesariamente cambiar la interfaz pública del objeto.


// ============================================================
// 13. GETTERS Y SETTERS PARA COMPATIBILIDAD
// ============================================================

// Los getters y setters también permiten modificar internamente
// la implementación de un objeto sin romper el código que
// utiliza una propiedad determinada.
//
// Por ejemplo, inicialmente podríamos tener:

function User(name, age) {

    this.name = name;
    this.age = age;

}


let john = new User("John", 25);

console.log(john.age); // 25


// Más adelante podemos decidir que almacenar directamente
// la edad no es ideal.
//
// En su lugar, podemos almacenar la fecha de nacimiento:

function User2(name, birthday) {

    this.name = name;
    this.birthday = birthday;

}


// Ahora podemos proporcionar nuevamente "age" como getter,
// calculándola a partir de birthday.

function User3(name, birthday) {

    this.name = name;
    this.birthday = birthday;

    Object.defineProperty(this, "age", {

        get() {

            let currentYear = new Date().getFullYear();

            return currentYear - this.birthday.getFullYear();

        }

    });

}


let john2 = new User3(
    "John",
    new Date(1992, 6, 1)
);


console.log(john2.birthday);
console.log(john2.age);


// El código externo puede seguir utilizando:
//
// john2.age
//
// aunque internamente ya no almacenamos age.
//
// Ahora:
//
// birthday -> dato almacenado
// age      -> dato calculado mediante getter


// ============================================================
// 14. IDEA CLAVE: ABSTRACCIÓN
// ============================================================

// Los getters y setters permiten ocultar parte de la
// implementación interna del objeto.
//
// Desde fuera:
//
// user.name
//
// Desde dentro:
//
// _name
//
// El código externo no necesita saber cómo se almacena
// o calcula realmente el valor.


// Esto permite:
//
// - validar datos.
// - transformar valores.
// - calcular valores.
// - controlar modificaciones.
// - cambiar la implementación interna.
// - mantener una interfaz pública estable.


// ============================================================
// 15. DIFERENCIA FUNDAMENTAL
// ============================================================

// PROPIEDAD DE DATOS
//
// Almacena directamente un valor:
//
// let user = {
//     name: "John"
// };
//
//
// PROPIEDAD DE ACCESO
//
// Utiliza funciones:
//
// let user = {
//
//     get name() {
//         return this._name;
//     },
//
//     set name(value) {
//         this._name = value;
//     }
//
// };


// Desde fuera ambas pueden utilizarse de forma similar:
//
// user.name
//
// Pero internamente funcionan de manera diferente.


// ============================================================
// 16. RESUMEN
// ============================================================

// GETTER
// ------------------------------------------------------------
// Se ejecuta al LEER una propiedad.
//
// get name() {
//     return this._name;
// }
//
// Uso:
//
// user.name


// SETTER
// ------------------------------------------------------------
// Se ejecuta al ASIGNAR una propiedad.
//
// set name(value) {
//     this._name = value;
// }
//
// Uso:
//
// user.name = "John"


// ============================================================
//
// PROPIEDAD DE DATOS
//
// {
//     value,
//     writable,
//     enumerable,
//     configurable
// }
//
//
//
// PROPIEDAD DE ACCESO
//
// {
//     get,
//     set,
//     enumerable,
//     configurable
// }
//
// ============================================================


// REGLA IMPORTANTE:
//
// Una propiedad es de datos O de acceso.
// No puede tener:
//
// value / writable
//
// y:
//
// get / set
//
// al mismo tiempo.


// ============================================================
//
// USOS PRINCIPALES DE GETTERS Y SETTERS:
//
// 1. Obtener valores calculados.
//
// 2. Validar valores antes de almacenarlos.
//
// 3. Transformar datos.
//
// 4. Controlar cómo se modifican las propiedades.
//
// 5. Ocultar detalles internos de implementación.
//
// 6. Mantener compatibilidad cuando cambia la estructura
//    interna de un objeto.
//
// ============================================================


// IDEA FINAL:
//
// Un getter convierte una función en una propiedad de lectura.
//
// Un setter convierte una función en una propiedad de escritura.
//
// Esto permite que una propiedad parezca normal desde fuera,
// mientras que internamente podemos controlar qué sucede
// cuando se lee o modifica.
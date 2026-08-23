// ============================================================
// PROPIEDADES Y MÉTODOS PRIVADOS Y PROTEGIDOS
// ============================================================
//
// La idea principal:
//
// INTERFAZ EXTERNA
// → Lo que permitimos usar desde fuera de la clase.
//
// INTERFAZ INTERNA
// → Detalles internos que la clase utiliza para funcionar.
//
// JavaScript tiene:
// - Públicos → accesibles desde cualquier lugar.
// - Privados (#) → accesibles SOLO dentro de la clase.
//
// JavaScript NO tiene campos "protected" reales.
// Se suele simular usando "_" como convención.
//
// ============================================================



// ============================================================
// 1. PROPIEDADES PÚBLICAS
// ============================================================
//
// Por defecto, las propiedades y métodos son públicos.
//
// Se pueden leer y modificar desde fuera de la clase.
// ============================================================

class CoffeeMachine {

    waterAmount = 0;

    constructor(power) {
        this.power = power;
    }

    makeCoffee() {
        console.log("Preparando café...");
    }
}

const machine = new CoffeeMachine(1000);

machine.waterAmount = 200;
machine.makeCoffee();

console.log(machine.waterAmount); // 200



// ============================================================
// 2. PROPIEDADES "PROTEGIDAS" CON _
// ============================================================
//
// JavaScript no tiene protected como otros lenguajes.
//
// Por convención se utiliza:
//
//     _property
//
// El "_" significa:
//
// "Esta propiedad es interna; no deberías acceder directamente
// desde fuera de la clase."
//
// IMPORTANTE:
// "_" NO proporciona privacidad real.
// Técnicamente sigue siendo accesible.
// ============================================================

class CoffeeMachine2 {

    _waterAmount = 0;

    constructor(power) {
        this._power = power;
    }

    get waterAmount() {
        return this._waterAmount;
    }

    set waterAmount(value) {
        if (value < 0) {
            value = 0;
        }

        this._waterAmount = value;
    }
}

const machine2 = new CoffeeMachine2(1000);

machine2.waterAmount = -50;

console.log(machine2.waterAmount); // 0

// Aunque no deberíamos hacerlo:
//
// machine2._waterAmount = -100;
//
// Técnicamente funciona porque "_" NO es privacidad real.



// ============================================================
// 3. GETTER Y SETTER
// ============================================================
//
// Permiten controlar cómo se lee y modifica una propiedad.
//
//     get → leer
//     set → modificar
//
// Ejemplo:
//
//     machine.waterAmount = 100;
//     console.log(machine.waterAmount);
//
// Aunque parecen propiedades normales, internamente ejecutan
// los métodos get/set.
// ============================================================

class CoffeeMachine3 {

    _waterAmount = 0;

    get waterAmount() {
        return this._waterAmount;
    }

    set waterAmount(value) {

        if (value < 0) {
            value = 0;
        }

        this._waterAmount = value;
    }
}

const machine3 = new CoffeeMachine3();

machine3.waterAmount = 100;

console.log(machine3.waterAmount); // 100



// ============================================================
// 4. PROPIEDAD DE SOLO LECTURA
// ============================================================
//
// Podemos crear solamente un getter:
//
//     get power()
//
// Sin setter, desde fuera no existe una forma definida por la
// clase para modificar esa propiedad mediante:
//
//     machine.power = ...
//
// Es útil para valores que deberían establecerse al crear
// el objeto y no cambiar posteriormente.
// ============================================================

class CoffeeMachine4 {

    constructor(power) {
        this._power = power;
    }

    get power() {
        return this._power;
    }
}

const machine4 = new CoffeeMachine4(1500);

console.log(machine4.power); // 1500

// No existe setter para "power".



// ============================================================
// 5. LOS CAMPOS "PROTEGIDOS" SE HEREDAN
// ============================================================
//
// Como "_" es solamente una convención, una clase hija puede
// acceder directamente a ellos.
//
// ============================================================

class CoffeeMachine5 {

    _waterAmount = 0;

    addWater(amount) {
        this._waterAmount += amount;
    }
}

class AdvancedCoffeeMachine extends CoffeeMachine5 {

    showWater() {
        console.log(this._waterAmount);
    }
}

const advancedMachine = new AdvancedCoffeeMachine();

advancedMachine.addWater(200);
advancedMachine.showWater(); // 200



// ============================================================
// 6. CAMPOS PRIVADOS #
// ============================================================
//
// Los campos privados SÍ tienen privacidad real.
//
// Se declaran utilizando:
//
//     #property
//
// Solo pueden utilizarse dentro de la clase que los declara.
//
// Desde fuera:
//
//     machine.#waterAmount
//
//   Error
//
// Desde una clase hija:
//
//     this.#waterAmount
//
//   Error
//
// ============================================================

class CoffeeMachine6 {

    #waterAmount = 0;

    #waterLimit = 200;

    #fixWaterAmount(value) {

        if (value < 0) {
            return 0;
        }

        if (value > this.#waterLimit) {
            return this.#waterLimit;
        }

        return value;
    }

    setWaterAmount(value) {
        this.#waterAmount = this.#fixWaterAmount(value);
    }

    getWaterAmount() {
        return this.#waterAmount;
    }
}

const machine6 = new CoffeeMachine6();

machine6.setWaterAmount(500);

console.log(machine6.getWaterAmount()); // 200

//  No se puede acceder:
//
// machine6.#waterAmount;
// machine6.#waterLimit;
// machine6.#fixWaterAmount();



// ============================================================
// 7. PRIVADO + GETTER/SETTER PÚBLICOS
// ============================================================
//
// Una combinación muy útil:
//
//     #waterAmount → almacenamiento interno privado
//
//     waterAmount → interfaz pública
//
// El usuario puede interactuar con la propiedad sin conocer
// cómo está implementada internamente.
// ============================================================

class CoffeeMachine7 {

    #waterAmount = 0;

    get waterAmount() {
        return this.#waterAmount;
    }

    set waterAmount(value) {

        if (value < 0) {
            value = 0;
        }

        this.#waterAmount = value;
    }
}

const machine7 = new CoffeeMachine7();

machine7.waterAmount = 100;

console.log(machine7.waterAmount); // 100

// El usuario utiliza:
//
// machine7.waterAmount
//
// Pero internamente:
//
// #waterAmount
//
// permanece oculto.



// ============================================================
// 8. LOS CAMPOS PRIVADOS NO SE HEREDAN
// ============================================================
//
// Una clase hija NO puede acceder directamente a los campos
// privados de la clase padre.
//
// ============================================================

class CoffeeMachine8 {

    #waterAmount = 100;

    get waterAmount() {
        return this.#waterAmount;
    }
}

class SuperCoffeeMachine extends CoffeeMachine8 {

    showWater() {

        //  No permitido:
        // console.log(this.#waterAmount);

        //  Podemos utilizar la interfaz pública:
        console.log(this.waterAmount);
    }
}

const superMachine = new SuperCoffeeMachine();

superMachine.showWater(); // 100



// ============================================================
// 9. _ VS #
// ============================================================
//
// PROTEGIDO (convención):
//
//     _waterAmount
//
// - No es realmente privado.
// - Se puede acceder desde fuera.
// - Se puede acceder desde clases hijas.
// - "_" solamente indica "uso interno".
//
//
//
// PRIVADO:
//
//     #waterAmount
//
// - Privacidad real del lenguaje.
// - No se puede acceder desde fuera.
// - No se puede acceder desde clases hijas.
// - Solo puede utilizarlo la clase que lo declaró.
//
// ============================================================

class Example {

    _protected = "convención";

    #private = "privado real";

    show() {

        console.log(this._protected);
        console.log(this.#private);
    }
}

const example = new Example();

console.log(example._protected); // Funciona técnicamente

// console.log(example.#private); // ❌ Error



// ============================================================
// 10. LOS CAMPOS PRIVADOS NO USAN this["nombre"]
// ============================================================
//
// Las propiedades normales pueden accederse dinámicamente:
//
//     this["name"]
//
// Pero los campos privados NO:
//
//     this["#name"]
//
// #name utiliza una sintaxis especial del lenguaje.
// ============================================================

class User {

    #name = "Yvnir";

    sayHi() {

        console.log(this.#name); // Correcto

        // console.log(this["#name"]); // Incorrecto
    }
}

const user = new User();

user.sayHi();



// ============================================================
// 11. MÉTODOS PRIVADOS
// ============================================================
//
// Los métodos también pueden ser privados utilizando #.
//
// Son útiles para ocultar operaciones internas que no deberían
// formar parte de la API pública de la clase.
// ============================================================

class CoffeeMachine9 {

    #checkWater() {
        console.log("Comprobando agua...");
    }

    makeCoffee() {

        this.#checkWater();

        console.log("Preparando café...");
    }
}

const machine9 = new CoffeeMachine9();

machine9.makeCoffee();

//  No accesible desde fuera:
//
// machine9.#checkWater();



// ============================================================
// 12. INTERFAZ PÚBLICA VS IMPLEMENTACIÓN INTERNA
// ============================================================
//
// Una buena clase puede ocultar sus detalles internos:
//
//              COFFEE MACHINE
//
//        INTERFAZ PÚBLICA
//        ─────────────────
//        makeCoffee()
//        waterAmount
//
//              ↓
//
//        IMPLEMENTACIÓN
//        ───────────────
//        #waterLimit
//        #waterAmount
//        #checkWater()
//
// El usuario necesita conocer solamente la interfaz pública.
//
// Esto permite cambiar la implementación interna sin tener que
// modificar el código que utiliza la clase.
// ============================================================



// ============================================================
// RESUMEN
// ============================================================
//
// PÚBLICO
// -------
//
//     waterAmount
//     makeCoffee()
//
// Accesible desde cualquier lugar.
//
//
//
// PROTEGIDO (CONVENCIÓN)
// ----------------------
//
//     _waterAmount
//     _power
//
// JavaScript NO lo protege realmente.
//
// "_" significa:
//
//     "No deberías acceder directamente a esto."
//
// Se puede utilizar desde clases hijas.
//
//
//
// PRIVADO
// -------
//
//     #waterAmount
//     #checkWater()
//
// Privacidad real proporcionada por JavaScript.
//
// Solo la clase que lo declara puede acceder.
//
//
//
// GETTER
// ------
//
//     get waterAmount() {}
//
// Permite controlar cómo se obtiene una propiedad.
//
//
//
// SETTER
// ------
//
//     set waterAmount(value) {}
//
// Permite controlar cómo se modifica una propiedad.
//
//
//
// SOLO LECTURA
// ------------
//
// Getter sin setter:
//
//     get power() {}
//
// Se puede leer, pero no modificar mediante la interfaz
// proporcionada por la clase.
//
//
//
// HERENCIA
// --------
//
// _campo
// → puede ser utilizado por clases hijas.
//
// #campo
// → NO puede ser utilizado directamente por clases hijas.
//
//
//
// ============================================================
// REGLAS CLAVE PARA MEMORIZAR
// ============================================================
//
// 1. Las propiedades son públicas por defecto.
//
// 2. "_" es una convención para indicar "protegido".
//    No proporciona privacidad real.
//
// 3. "#campo" es realmente privado.
//
// 4. Los campos privados solo son accesibles dentro de la
//    clase que los declara.
//
// 5. Los campos privados NO son accesibles directamente
//    desde clases hijas.
//
// 6. Los getters permiten controlar la lectura:
//
//       get property() {}
//
// 7. Los setters permiten controlar la modificación:
//
//       set property(value) {}
//
// 8. Getter sin setter → propiedad de solo lectura.
//
// 9. Los métodos también pueden ser privados:
//
//       #method() {}
//
// 10. La encapsulación consiste en ocultar detalles internos
//     y exponer solamente una interfaz necesaria.
//
// ============================================================
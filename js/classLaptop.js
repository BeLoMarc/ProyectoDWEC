'use strict'
import {Product} from "./classProduct.js"
import {EmptyValueException} from "./Excepciones.js";
export class Laptop extends Product {
    #model;//get
    #CPU;//get y set
    #charger;//get y set
    #keyboard;//get 
    //variables de clase product
    constructor(serialNumber, name, description, price, tax, images,
        // variables clase Laptop
        model, CPU, charger, keyboard) {

        super(serialNumber, name, description, price, tax, images);

        if (!model) {
            throw new EmptyValueException("model","classLaptop",14);
        } else {
            this.#model = model;
        }
        if (!CPU) {
            throw new EmptyValueException("CPU","classLaptop",19);
        } else {
            this.#CPU = CPU;
        }
        this.#charger = charger;
        this.#keyboard = keyboard;
    }
    //Los metodos aqui
    get model() {
        return this.#model;
    }
    set model(newModel) {
        return this.#model = newModel;
    }
    get CPU() {
        return this.#CPU;
    }
    set CPU(newCPU) {
        return this.#CPU = newCPU;
    }
    get charger() {
        return this.#charger;
    }

    set charger(newCharger) {
        return this.#charger = newCharger;
    }
    get keyboard() {
        return this.#keyboard;
    }

}

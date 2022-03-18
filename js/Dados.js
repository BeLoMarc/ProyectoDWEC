'use strict'
import {Product} from "./classProduct.js"
import {EmptyValueException} from "./Excepciones.js";
export class Dados extends Product {
    #model;
    #color;
    constructor(serialNumber, name, description, price, tax, images,
        //model=-->metalicos,plastico
        model, color) {

        super(serialNumber, name, description, price, tax, images);
        if (!model) {
            throw new EmptyValueException("model","Dados",13);
        } else {
            this.#model = model;
        }

        if (!color) {
            throw new EmptyValueException("color","Dados",19);
        } else {
            this.#color = color;
        }
    }
    //Los metodos aqui
    get model() {
        return this.#model;
    }
    set model(newModel) {
        return this.#model = newModel;
    }
    get color() {
        return this.#color;
    }
    set color(newcolor) {
        return this.#color = newcolor;
    }
   
}

'use strict'
import {Product} from "./classProduct.js"
import {EmptyValueException} from "./Excepciones.js";
export class Phone extends Product {
    #battery;
    #screen;
    #OS;
    constructor(serialNumber, name, description, price, tax, images,
        //battery--> set y get
        //screen --> set y get
        //OS--> get
        battery, screen, OS) {

        super(serialNumber, name, description, price, tax, images);
        if (!battery) {
            throw new EmptyValueException("battery","classPhone",13);
        } else {
            this.#battery = battery;
        }
        if (!screen) {
            throw new EmptyValueException("screen","classPhone",18);
        } else {
            this.#screen = screen;
        }

        if (!OS) {
            throw new EmptyValueException("OS","classPhone",24);
        } else {
            this.#OS = OS;
        }


    }
    //Los metodos aqui

    get battery() {
        return this.#battery;
    }
    set battery(newBattery) {
        return this.#battery = newBattery;
    }
    get screen() {
        return this.#screen;
    }
    set screen(newScreen) {
        return this.#screen = newScreen
    }
    get OS() {
        return this.#OS;
    }
    
}

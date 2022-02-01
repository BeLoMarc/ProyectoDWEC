'use strict'
import {Product} from "./classProduct.js"
import {EmptyValueException} from "./Excepciones.js";
export class Headset extends Product {
    #model;
    #microphone;
    #frequency;
    constructor(serialNumber, name, description, price, tax, images,
        //model=-->Internos,Pinganillos,De diadema-----> get
        //micrphone Microauricular,----> get
        //frequency--> 20 Hz y 20 000 Hz.--->set y get
        model, microphone = "none", frequency) {

        super(serialNumber, name, description, price, tax, images);
        if (!model) {
            throw new EmptyValueException("model","classHeadset",13);
        } else {
            this.#model = model;
        }

        if (!frequency) {
            throw new EmptyValueException("frequency","classheadset",19);
        } else {
            this.#frequency = frequency;
        }
        this.#microphone = microphone;
    }
    //Los metodos aqui
    get model() {
        return this.#model;
    }
    set model(newModel) {
        return this.#model = newModel;
    }
    get microphone() {
        return this.#microphone;
    }
    set microphone(newMicrophone) {
        return this.#microphone = newMicrophone;
    }
    get frequency() {
        return this.#frequency;
    }
    set frequency(newFrequency) {
        return this.#frequency = newFrequency;
    }
}

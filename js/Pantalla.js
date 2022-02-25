'use strict'
import { Product } from "./classProduct.js"
import { EmptyValueException } from "./Excepciones.js";
export class Pantalla extends Product {
    #model;
    #size;
    #campaign;
    constructor(serialNumber, name, description, price, tax, images,
        // DM o Jugadores o homebrew
        //size tamaño de la pantalla
        //campaign si pertenece a alguna campaña
        model, size, campaign = "none") {

        super(serialNumber, name, description, price, tax, images);
        if (!model) {
            throw new EmptyValueException("model", "pantallas", 13);
        } else {
            this.#model = model;
        }

        if (!size) {
            throw new EmptyValueException("size", "pantallas", 19);
        } else {
            this.#size = size;
        }
        this.#campaign = campaign;
    }
    //Los metodos aqui
    get model() {
        return this.#model;
    }
    set model(newModel) {
        return this.#model = newModel;
    }
    get campaign() {
        return this.#campaign;
    }
    set campaign(newCampaign) {
        return this.#campaign = newCampaign;
    }
    get size() {
        return this.#size;
    }
    set size(newSize) {
        return this.#size = newSize;
    }
}

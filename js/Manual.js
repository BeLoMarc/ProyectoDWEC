'use strict'
import {Product} from "./classProduct.js"
import {EmptyValueException} from "./Excepciones.js";
export class Manual extends Product {
    #cover;
    #size;
    #target;
    constructor(serialNumber, name, description, price, tax, images,
        //cover=-->tapa dura o tapa blanda
        //target si va al jugador a los DMs o ambos
        //size tamaño
        cover, size, target) {

        super(serialNumber, name, description, price, tax, images);
        if (!cover) {
            throw new EmptyValueException("cover","Manuales",16);
        } else {
            this.#model = model;
        }

        if (!size) {
            throw new EmptyValueException("size","Manuales",22);
        } else {
            this.#size = size;
        }

        if (!target) {
            throw new EmptyValueException("target","Manuales",22);
        } else {
            this.#target = target;
        }
    }
    //Los metodos aqui
    get cover() {
        return this.#cover;
    }
    set cover(newcover) {
        return this.#cover = newcover;
    }
    get size() {
        return this.#size;
    }
    set size(newsize) {
        return this.#size = newsize;
    }
    get target() {
        return this.#target;
    }
    set target(newtarget) {
        return this.#target = newtarget;
    }
}

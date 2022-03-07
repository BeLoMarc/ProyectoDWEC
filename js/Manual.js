'use strict'
import {Product} from "./classProduct.js"
import {EmptyValueException} from "./Excepciones.js";
export class Manual extends Product {
    #cover;
    #author;
    #target;
    constructor(serialNumber, name, description, price, tax, images,
        //cover=-->tapa dura o tapa blanda
        //target si va al jugador a los DMs o ambos
        //size tamaño
        cover="none", author, target) {

        super(serialNumber, name, description, price, tax, images);
        // if (!cover) {
        //     throw new EmptyValueException("cover","Manuales",16);
        // } else {
            this.#cover = cover;
        //}

        if (!author) {
            throw new EmptyValueException("author","Manuales",22);
        } else {
            this.#author = author;
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
    get author() {
        return this.#author;
    }
    set author(newauthor) {
        return this.#author = newauthor;
    }
    get target() {
        return this.#target;
    }
    set target(newtarget) {
        return this.#target = newtarget;
    }
}

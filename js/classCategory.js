'use strict'
/**
- title: Con el título de la categoría.
- description: Con la descripción de la misma. 

Sus métodos serán los habituales getter y setter de estas propiedades,
aunque el título no podrá ser vacío
 */
import {EmptyValueException} from "./Excepciones.js";

export class Category {
    #title;
    #description;
    constructor(title, description) {
        if (!title) {
            throw new EmptyValueException("title","classCategory",13);
        } else {
            this.#title = title;
        }
        this.#description = description;
    }
    get title() {
        return this.#title;
    }
    set title(newTitle) {
        this.#title = newTitle;
    }
    toString() {
       return ("El titulo de la categoria es: " + this.#title + " y su descripcion: " + this.#description);
    }
    

}

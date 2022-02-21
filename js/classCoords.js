'use strict'
import {EmptyValueException} from "./Excepciones.js";
export class Coords {
    #latitude;
    #longitude;
    constructor(latitude, longitude) {
        if (!latitude) {
            throw new EmptyValueException("latitude","classCords",7 );
        } else {
            this.#latitude = latitude;
        }
        if (!longitude) {
            throw new EmptyValueException("longitude","classCords",12);
        } else {
            this.#longitude = longitude;
        }


    }
    get latitude() {
        return this.#latitude;
    }
    set latitude(newLatitude) {
        return this.#latitude = newLatitude;
    }
    get longitude() {
        return this.#longitude;
    }
    set longitude(newLongitude) {
        return this.#longitude = newLongitude;
    }
    toString() {
        return("La longitud de la tiensa es: " + this.#longitude + " y la latitud " + this.#latitude);
    }
    //Los metodos aqui
}

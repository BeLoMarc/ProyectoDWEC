/**
- serialNumber: Número de serie del producto. Obligatorio.
- name: Nombre del producto. Obligatoria.
- description: Descripción de la imagen
- price: Precio del producto. Obligatorio.
- tax: Porcentaje de impuestos sobre el precio del producto.
- images: Array con diferentes imágenes sobre el producto.
Como métodos tendrá los getter y setter habituales para cada propiedad.

 **/
import {EmptyValueException,InvalidValueException,InvalidAccessConstructorException} from "./Excepciones.js";
export class Product {
    #serialNumber;// solo get
    #name;// set y get
    #description;// set y get
    #price;// set y get
    #tax;// get
    #images;// set y get

    //los compos obligatorios les doy como valor undefined
    constructor(serialNumber, name, description, price, tax, images) {
        if (new.target === Product) {
            throw new InvalidAccessConstructorException("classProduct",23);
        }
        if (!serialNumber) {
            throw new InvalidValueException("serialNumber",serialNumber,25);
        } else {
            this.#serialNumber = serialNumber;
        }
        if (!name) {
            throw new EmptyValueException("name",serialNumber,30);
        } else {
            this.#name = name;
        }
        if (!price) {
            throw new EmptyValueException("price",serialNumber,35);
        } else {
            this.#price = price;
        }

        this.#description = description;
        this.#tax = tax;
        this.#images = images;

    }
    //los metodos aqui

    get serialNumber() {
        return this.#serialNumber;
    }
    get name() {
        return this.#name;
    }
    set name(newName) {
        this.#name = newName;
    }
    get description() {
        return this.#description;
    }
    set description(newDescription) {
        return this.#description = newDescription;
    }
    get price() {
        return this.#price;
    }
    set price(newPrice) {
        return this.#price = newPrice;
    }
    get tax() {
        return this.#tax;
    }
    get images() {
        return this.#images;
    }
    set images(newImages) {
        return this.#images = newImages;
    }
    
}

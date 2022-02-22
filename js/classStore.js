/**
- CIF: Código de identificación fiscal.
- name: Nombre de la tienda. Obligatorio.
- address: Dirección.
- phone: Teléfono.
- coords. Objeto Coords donde se ubique la tienda.

 */
import {EmptyValueException} from "./Excepciones.js";

export class Store {
    // solo hay gets porque entiendo que precisamente estos argumentos no deben cambiarse
    
    #name;// get
    #CIF;//get
    #address;//get
    #phone;//get
    #coords;//get
    #warehouse;//
    constructor(CIF, name,address,phone,coords) {
        if (!name) {
            throw new EmptyValueException("name ","classStore","20");
        } else {
            this.#name = name;
        }
            this.#CIF=CIF;
            this.#address=address;
            this.#phone=phone;
            this.#coords=coords
            
    }
    //Los metodos aqui
    get name() {
        return this.#name;
    }
    get CIF() {
        return this.#CIF;
    }
    get address() {
        return this.#address;
    }
    get phone() {
        return this.#phone;
    }
    get coords() {
        return this.#coords;
    }
    get warehouse(){
        return this.#warehouse;
    }
}

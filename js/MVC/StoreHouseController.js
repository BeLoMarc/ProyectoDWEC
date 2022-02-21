'use strict'
 class StoreHouseController {
    //campos privados
    #modelStoreHouse;
    #viewStoreHouse;
    constructor(modelStoreHouse, viewStoreHouse) {
        this.#modelStoreHouse =modelStoreHouse;
        this.#viewStoreHouse =viewStoreHouse;
        //esto llama al on init de abajo que llama al init de storehouseview
        // que es el que carga el html
        this.onInit();
    }
    /**Desde el Controlador necesitamos un método que invoque el método que acabamos de crear
 en la Vista. Como nomenclatura para nombrar este tipo de métodos vamos a utilizar la
 preposición on en respuesta a los eventos que nos ocurran en el Controlador. Estos eventos los
 tenemos que invocar en respuesta a un cambio de datos en el Modelo. */

    onInit = () => {
        this.#viewStoreHouse.init();
    }


}

export default StoreHouseController;
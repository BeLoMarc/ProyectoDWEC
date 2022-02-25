'use strict'
import { Category } from "../classCategory.js";
import { Coords } from "../classCoords.js";
import { Product } from "../classProduct.js";
import { Store } from "../classStore.js";

import { Pantalla } from "../Pantalla.js";
import { Dados } from "../Dados";
import { Manual } from "../Manual";
import {
   BaseException,
   InvalidAccessConstructorException,
   EmptyValueException,
   InvalidValueException,
   AbstractClassException
} from "../Excepciones.js";

class StoreHouseController {
   //Campos Privados
   #StoreHouse;
   #StoreHouseView;

   constructor(model, view) {
      console.log('Manager Controller');
      this.#StoreHouse = model;
      this.#StoreHouseView = view;
   }
   /**Desde el Controlador necesitamos un método que invoque el método que acabamos de crear
en la Vista. Como nomenclatura para nombrar este tipo de métodos vamos a utilizar la
preposición on en respuesta a los eventos que nos ocurran en el Controlador. Estos eventos los
tenemos que invocar en respuesta a un cambio de datos en el Modelo. */

   #loadStoreHouseObjects() {
      let category1 = new Category("Materiales", "Materiales que sirven para el desarrollo de dnd");
      let category2 = new Category("libros", "libros de reglas ");
      let category3 = new Category("electronica", "material electronico para llevar las campañas a distancia");

      let d1 = new Dados
         ("111111",
            "dadoRosa",
            "set de dados",
            5.34,
            "21%",
            "IMAGEN",
            "Plastico",
            "Rosa");

      let d2 = new Dados
         ("22222",
            "dadoNegro",
            "set de dados",
            3.34,
            "21%",
            "IMAGEN",
            "Plastico",
            "Negro");

      let d3 = new Dados
         ("33333",
            "dadoDorado",
            "set de dados",
            25.34,
            "21%",
            "IMAGEN",
            "Metalicos",
            "Rosa");

      let p1 = new Pantalla("1111",
         "PantallaDM",
         "Pantalla estandar del DM",
         15,
         "21%",
         "IMAGEN",
         "Fisico",
         "30x45",
         "");// la campaña esta vacia porqie por defeccto es none


   }



}

export default StoreHouseController;
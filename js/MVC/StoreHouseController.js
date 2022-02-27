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
      // Creamos las categorias
      let category1 = new Category("Materiales", "Materiales que sirven para el desarrollo de dnd");
      let category2 = new Category("libros", "libros de reglas ");
      let category3 = new Category("electronica", "material electronico para llevar las campañas a distancia");
      //Creamos las Coordenadas
      let coordenada1 = new Coords("12344", "44444");
      let coordenada2 = new Coords("00344", "22224");
      let coordenada3 = new Coords("59279", "36401");
      // Creamos las tiendas
      let TabernaHumeante = new Store("1111", "Taberna Humeante", "bhalkia", "576545678", coordenada1);
      let PonyPisador = new Store("2222", "Pony Pisador", "Tierra Media", "876548", coordenada2);
      let CuernoInsaciable = new Store("3333", "Cuerno Insaciable", "Valhalla", "98765", coordenada3);
      // Creamos los objetos
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
      let p2 = new Pantalla("2222",
         "PantallaStradh",
         "Pantalla Para la campaña de stradh",
         15,
         "21%",
         "IMAGEN",
         "Fisico",
         "20x35",
         "La Maldicion de Stradh");
      let p3 = new Pantalla("3333",
         "PantallaWaterdeep",
         "Pantalla Para la campaña de Waterdeep",
         15,
         "21%",
         "IMAGEN",
         "Fisico",
         "20x35",
         "El golpe a los dragones");
      let m1 = new Manual(
         "1111",
         "players handbook",
         "Manual del jugador para DND 5e",
         50,
         "21%",
         "IMAGEN",
         "Tapa dura",
         "Wizard of the coast",
         "Fisico");
      let m2 = new Manual(
         "2222",
         "Manual del DM",
         "Manual del DM para DND 5e",
         50,
         "21%",
         "IMAGEN",
         "Tapa dura",
         "Wizard of the coast",
         "Fisico");
      let m3 = new Manual(
         "2222",
         "Monster Manual",
         "Manual de monstruos para DND 5e",
         50,
         "21%",
         "IMAGEN",
         "",// no pongo cover porque por defecto no tiene
         "Wizard of the coast",
         "Fisico");

      // LAPTOPS
      // let ordenador= new Laptop(serialNumber, name, description, price, tax, images,model, CPU, charger, keyboard);
      let msi = new Laptop(
         "111111",
         "msi",
         "ordenador",
         1000,
         "21%",
         "sasas",
         "masi",
         "Muy buena",
         "17A",
         "keyboard fino");
      let asus = new Laptop(
         "22222",
         "msi",
         "ordenador",
         1000,
         "21%",
         "sasas",
         "asus",
         "Muy buena",
         "17A",
         "keyboard fino");
      let nisu = new Laptop(
         "33333",
         "msi",
         "ordenador",
         1000,
         "21%",
         "sasas",
         "nisu",
         "Muy buena",
         "17A",
         "keyboard fino");

      //Añadimos las categorias
      this.#StoreHouse.addCategory(category1);
      this.#StoreHouse.addCategory(category2);
      this.#StoreHouse.addCategory(category3);
      //Añadimos las tiendas
      this.#StoreHouse.addShop(TabernaHumeante);
      this.#StoreHouse.addShop(PonyPisador);
      this.#StoreHouse.addShop(CuernoInsaciable);
      //Añadimos productos a categorias
      this.#StoreHouse.addProduct(d1, category1);
      this.#StoreHouse.addProduct(d2, category1);
      this.#StoreHouse.addProduct(d3, category1);
      this.#StoreHouse.addProduct(p1, category1);
      this.#StoreHouse.addProduct(p2, category1);
      this.#StoreHouse.addProduct(p3, category1);
      this.#StoreHouse.addProduct(m1, category2);
      this.#StoreHouse.addProduct(m2, category2);
      this.#StoreHouse.addProduct(m2, category2);
      this.#StoreHouse.addProduct(msi, category3);
      this.#StoreHouse.addProduct(asus, category3);
      this.#StoreHouse.addProduct(nisu, category3);
      // Añadimos los productos a las tiendas con una cantidad
      this.#StoreHouse.addProduct(d1, TabernaHumeante, 10);
      this.#StoreHouse.addProduct(d2, TabernaHumeante, 10);
      this.#StoreHouse.addProduct(d3, PonyPisador, 10);
      this.#StoreHouse.addProduct(p1, PonyPisador, 10);
      this.#StoreHouse.addProduct(p2, TabernaHumeante, 10);
      this.#StoreHouse.addProduct(p3, PonyPisador, 10);
      this.#StoreHouse.addProduct(m1, CuernoInsaciable, 10);
      this.#StoreHouse.addProduct(m2, CuernoInsaciable, 10);
      this.#StoreHouse.addProduct(m3, CuernoInsaciable, 10);
      this.#StoreHouse.addProduct(msi, TabernaHumeante, 10);
      this.#StoreHouse.addProduct(asus, CuernoInsaciable, 10);
      this.#StoreHouse.addProduct(nisu, PonyPisador, 10);
      
   }



}

export default StoreHouseController;
'use strict'
import { Category } from "../classCategory.js";
import { Coords } from "../classCoords.js";
import { Product } from "../classProduct.js";
import { Store } from "../classStore.js";
import { Laptop } from "../classLaptop.js";
import { Phone } from "../classPhone.js";
import { Headset } from "../classHeadset.js";
import { Pantalla } from "../Pantalla.js";
import { Dados } from "../Dados.js";
import { Manual } from "../Manual.js";
import {
   InvalidAccessConstructorException,
   EmptyValueException,
   InvalidValueException,
   AbstractClassException
} from "../Excepciones.js";

class StoreHouseController {
   //Campos Privados
   #StoreHouse;
   #StoreHouseView;
   //Aqui cargamos todos los objetos con los que vamos a trabajr oncluyendo
   //las tiendas y las categorias
   #loadStoreHouseObjects() {
      let StoreHouse = this.#StoreHouse;
      // Creamos las categorias                    las descripciones de las categorias creo que son las url de las fotos
      let category1 = new Category("Materiales", "Materiales que sirven para el desarrollo de dnd");
      let category2 = new Category("libros", "libros de reglas ");
      let category3 = new Category("electronica", "material electronico para llevar las campañas a distancia");
      //Creamos las Coordenadas
      let coordenada1 = new Coords("12344", "44444");
      let coordenada2 = new Coords("00344", "22224");
      let coordenada3 = new Coords("59279", "36401");
      // Creamos las tiendas
      let TabernaHumeante = new Store(
         "1111",
         "Taberna Humeante",
         "bhalkia",
         "576545678",
         coordenada1,
         ["../Multimedia/tienda1.jpg"]);
      let PonyPisador = new Store(
         "2222",
         "Pony Pisador",
         "Tierra Media",
         "876548",
         coordenada2,
         ["../Multimedia/tienda2.jpg"]);
      let CuernoInsaciable = new Store(
         "3333",
         "Cuerno Insaciable",
         "Valhalla",
         "98765",
         coordenada3,
         ["../Multimedia/tienda3.jpg"]);
      // Creamos los objetos
      let d1 = new Dados
         ("111111",
            "dadoRosa",
            "set de dados",
            5.34,
            "21%",
            "../Multimedia/Dados.jpg",
            "Plastico",
            "Rosa");

      let d2 = new Dados
         ("22222",
            "dadoNegro",
            "set de dados",
            3.34,
            "21%",
            "../Multimedia/dados2.jpg",
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
         "../Multimedia/curseOfStrahd.jpg",
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
         "ASUS",
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
         "NISU",
         "ordenador",
         1000,
         "21%",
         "sasas",
         "nisu",
         "Muy buena",
         "17A",
         "keyboard fino");

      //Añadimos las categorias
      StoreHouse.addCategory(category1);
      StoreHouse.addCategory(category2);
      StoreHouse.addCategory(category3);
      //Añadimos las tiendas
      StoreHouse.addShop(TabernaHumeante);
      StoreHouse.addShop(PonyPisador);
      StoreHouse.addShop(CuernoInsaciable);
      //Añadimos productos a categorias
      StoreHouse.addProduct(d1, category1);
      StoreHouse.addProduct(d2, category1);
      StoreHouse.addProduct(d3, category1);
      StoreHouse.addProduct(p1, category1);
      StoreHouse.addProduct(p2, category1);
      StoreHouse.addProduct(p3, category1);
      StoreHouse.addProduct(m1, category2);
      StoreHouse.addProduct(m2, category2);
      StoreHouse.addProduct(m2, category2);
      StoreHouse.addProduct(msi, category3);
      StoreHouse.addProduct(asus, category3);
      StoreHouse.addProduct(nisu, category3);
      // Añadimos los productos a las tiendas con una cantidad
      StoreHouse.addProductInShop(d1, TabernaHumeante, 10);
      StoreHouse.addProductInShop(d2, TabernaHumeante, 10);
      StoreHouse.addProductInShop(d3, PonyPisador, 10);
      StoreHouse.addProductInShop(p1, PonyPisador, 10);
      StoreHouse.addProductInShop(p2, TabernaHumeante, 10);
      StoreHouse.addProductInShop(p3, PonyPisador, 10);
      StoreHouse.addProductInShop(m1, CuernoInsaciable, 10);
      StoreHouse.addProductInShop(m2, CuernoInsaciable, 10);
      StoreHouse.addProductInShop(m3, CuernoInsaciable, 10);
      StoreHouse.addProductInShop(msi, TabernaHumeante, 10);
      StoreHouse.addProductInShop(asus, CuernoInsaciable, 10);
      StoreHouse.addProductInShop(nisu, PonyPisador, 10);


   }

   constructor(model, view) {
      console.log('StoreHouse Controller');
      this.#StoreHouse = model;
      this.#StoreHouseView = view;
      // Eventos iniciales del controlador

      //this.onInit();estos eventos van dirigos al view que se encargara de pintar
      this.onLoad();// esto nos vale para cargar los productos

      //enlazamos handlers con la vista
      //Este en concreto me pinta las tiendas desde la vista
      this.#StoreHouseView.bindLoadStores(this.handleShowStores);
      // this.#StoreHouseView.bindShowProducts(this.handleShowProducts);

      //Este me pinta el submenu de la categoría
      //llama al bindloadmenu del view y el handler me remanda al de aqui
      this.#StoreHouseView.bindLoadSubMenuStores(this.handleLoadSubMenuStores);
      this.#StoreHouseView.bindLoadSubMenuCategories(this.handleLoadSubMenuCategories);
      // Estos van a cargar los productos de las tiendas
      this.#StoreHouseView.bindShowProductStore(this.handleShowProductStore);
      //Estos van a cargar los productos de las categorias
      this.#StoreHouseView.bindShowProductCategory(this.handleShowProductCategory);
      //Esto me va a recargar la pagina
      this.#StoreHouseView.bindRecargar(this.handleRecargar);
      //Esto me va a mirar los detallles de un producto en particular
      this.#StoreHouseView.bindShowProduct(this.handleShowProduct);
      //esto trata de abrir el producto en una nueva ventana 
      this.#StoreHouseView.bindShowProductInWindow(this.handleShowProductInWindow);
   }
   /**Desde el Controlador necesitamos un método que invoque el método que acabamos de crear
      en la Vista. Como nomenclatura para nombrar este tipo de métodos vamos a utilizar la
      preposición on en respuesta a los eventos que nos ocurran en el Controlador. Estos eventos los
      tenemos que invocar en respuesta a un cambio de datos en el Modelo. */


   onLoad = () => {
      this.#loadStoreHouseObjects();
      //   this.#StoreHouseView.showProductTypes();
   }
   // nos va a coger las tiendas
   // se encargan de manejar los eventos q estan en el modelo

   // me carga las tiendas mediante el iterador del modelo
   handleShowStores = () => {
      //Simulamos 1 peticion a la BBDD y la recogemos en formato JSON
      let mapStores = {
         store: this.#StoreHouse.shops,
      };
      this.#StoreHouseView.ShowStores(mapStores)
   }
   // me carga las tiendas mediante el iterador del modelo del submenu
   //en la vista controlo que los encuentre porque al generarse despues tratar con ellos da problemas
   handleLoadSubMenuStores = () => {
      //Simulamos 1 peticion a la BBDD y la recogemos en formato JSON
      let mapStores = {
         store: this.#StoreHouse.shops,
      };

      this.#StoreHouseView.ShowLoadSubMenuStores(mapStores)
   }
   // me carga las tiendas mediante el iterador del modelo del submenu
   //en la vista controlo que los encuentre porque al generarse despues tratar con ellos da problemas
   handleLoadSubMenuCategories = () => {
      //Simulamos 1 peticion a la BBDD y la recogemos en formato JSON
      let mapCategories = {
         category: this.#StoreHouse.categories,
      };
      this.#StoreHouseView.ShowLoadSubMenuCategories(mapCategories);
   }
   // Este parametro es el que se le pasa desde el bind de la vista
   //tienda Ciff es el Ciff de la tienda y el getShopProducts el generador que necesita el Ciff como parametro
   handleShowProductStore = (tiendaCiff) => {
      //Simulamos 1 peticion a la BBDD y la recogemos en formato JSON
      let tiendaCIF = tiendaCiff;
      let mapStores = {
         store: this.#StoreHouse.shops,
         generador: this.#StoreHouse.getShopProducts(tiendaCIF)
      };
      this.#StoreHouseView.ShowProductStore(mapStores);
   }
   // Este parametro es el que se le pasa desde el bind de la vista
   //tienda Ciff es el Ciff de la tienda y el getCategoryProducts el generador que necesita el nombre de la categoria como parametro
   handleShowProductCategory = (tituloCategoria) => {
      //Simulamos 1 peticion a la BBDD y la recogemos en formato JSON
      let mapCategories = {
         category: this.#StoreHouse.categories,
         generador: this.#StoreHouse.getCategoryProducts(tituloCategoria)
      };
      this.#StoreHouseView.ShowProductCategory(mapCategories);
   }

   handleShowProduct = (nombreProducto) => {
      //Simulamos 1 peticion a la BBDD y la recogemos en formato JSON
      let recoger = {
         producto: this.#StoreHouse.getProduct(nombreProducto),
      };

      this.#StoreHouseView.ShowProduct(recoger)
   }


   handleShowProductInWindow = (nombreProducto) => {
      //Simulamos 1 peticion a la BBDD y la recogemos en formato JSON
      
      let recoger = {
         producto: this.#StoreHouse.getProduct(nombreProducto),
      };

      this.#StoreHouseView.ShowProductInWindow(recoger)
   }


   handleRecargar = () => {
      //Esto recarga la pagina y la deja fina 
      location.reload(true);
   }
}

export default StoreHouseController;
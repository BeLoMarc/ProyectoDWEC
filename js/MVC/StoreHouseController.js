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
      let categories;
      let dados;
      let pantalla;
      let manual;
      let laptop;
      let stores;

      $.ajax({
         url: "../js/MVC/Carga.json",
         method: 'GET',
         async: true,
      }).done((data) => {
         categories = data.categories;
         categories.forEach(elem => {
            let categoriaInsertar = new Category(elem.title, elem.description);
            StoreHouse.addCategory(categoriaInsertar);
         });

         stores = data.stores;
         stores.forEach(elem => {
            let TiendaInsertar = new Store(elem.CIF, elem.name, elem.address, elem.phone, new Coords(elem.coords.latitude, elem.coords.longitud), elem.img);
            StoreHouse.addShop(TiendaInsertar);
         });
         /**
          * DATA --> NOS DEVUELVE TODO EL JSON
          * DADOS -->   DATA-->PRODUCTS-->DADOS
          */
         dados = data.products.Dados;
         dados.forEach(elem => {
            let DadoInsertar = new Dados(elem.serialNumber, elem.name, elem.description, elem.price,
               elem.tax, elem.images, elem.model, elem.color);

            for (let i of StoreHouse.categories) {
               //esto me busca la categoria perteneciente de cada producto
               if (i.title == elem.nombreCat) {
                  StoreHouse.addProduct(DadoInsertar, i)

               }
            }
            for (let j of StoreHouse.shops) {
               if (j.CIF == elem.CifTienda) {
                  StoreHouse.addProductInShop(DadoInsertar, j,10);
               }
            }
         });



         pantalla = data.products.Pantalla;
         pantalla.forEach(elem => {
            let PantallaInsertar = new Pantalla(elem.serialNumber, elem.name, elem.description, elem.price,
               elem.tax, elem.images, elem.model, elem.size, elem.campaign);

            for (let i of StoreHouse.categories) {
               //esto me busca la categoria perteneciente de cada producto
               if (i.title == elem.nombreCat) {
                  StoreHouse.addProduct(PantallaInsertar, i)
               }
            }
            for (let j of StoreHouse.shops) {
               if (j.CIF == elem.CifTienda) {
                  StoreHouse.addProductInShop(PantallaInsertar, j,10);
               }
            }
         })


         manual = data.products.Manual;
         manual.forEach(elem => {
            let ManualInsertar = new Manual(elem.serialNumber, elem.name, elem.description, elem.price,
               elem.tax, elem.images, elem.cover, elem.author, elem.target);

            for (let i of StoreHouse.categories) {
               //esto me busca la categoria perteneciente de cada producto
               if (i.title === elem.nombreCat) {
                  StoreHouse.addProduct(ManualInsertar, i)

               }
            }
            for (let j of StoreHouse.shops) {
               if (j.CIF == elem.CifTienda) {
                  StoreHouse.addProductInShop(ManualInsertar, j,10);
               }
            }
         });



         laptop = data.products.Laptop;
         laptop.forEach(elem => {
            let LaptopInsertar = new Laptop(elem.serialNumber, elem.name, elem.description, elem.price,
               elem.tax, elem.images, elem.model, elem.CPU, elem.charger, elem.keyboard);

            for (let i of StoreHouse.categories) {
               //esto me busca la categoria perteneciente de cada producto
               if (i.title == elem.nombreCat) {
                  StoreHouse.addProduct(LaptopInsertar, i)

               }
            }
            for (let j of StoreHouse.shops) {
               if (j.CIF == elem.CifTienda) {
                  StoreHouse.addProductInShop(LaptopInsertar, j,10);
               }
            }
         });




      }).fail(function (res) {
         console.log(res)
      });
      // Creamos las categorias                    las descripciones de las categorias creo que son las url de las fotos
      // let category1 = new Category("Materiales", "Materiales que sirven para el desarrollo de dnd");
      // let category2 = new Category("libros", "libros de reglas ");
      // let category3 = new Category("electronica", "material electronico para llevar las campañas a distancia");
      // //Creamos las Coordenadas
      // let coordenada1 = new Coords("12344", "44444");
      // let coordenada2 = new Coords("00344", "22224");
      // let coordenada3 = new Coords("59279", "36401");
      // // Creamos las tiendas
      // let TabernaHumeante = new Store(
      //    "1111",
      //    "Taberna Humeante",
      //    "bhalkia",
      //    "576545678",
      //    coordenada1,
      //    ["../Multimedia/tienda1.jpg"]);
      // let PonyPisador = new Store(
      //    "2222",
      //    "Pony Pisador",
      //    "Tierra Media",
      //    "876548",
      //    coordenada2,
      //    ["../Multimedia/tienda2.jpg"]);
      // let CuernoInsaciable = new Store(
      //    "3333",
      //    "Cuerno Insaciable",
      //    "Valhalla",
      //    "98765",
      //    coordenada3,
      //    ["../Multimedia/tienda3.jpg"]);
      // // Creamos los objetos
      // let d1 = new Dados
      //    ("111111",
      //       "dadoRosa",
      //       "set de dados",
      //       5.34,
      //       "21%",
      //       "../Multimedia/Dados.jpg",
      //       "Plastico",
      //       "Rosa");

      // let d2 = new Dados
      //    ("22222",
      //       "dadoNegro",
      //       "set de dados",
      //       3.34,
      //       "21%",
      //       "../Multimedia/dados2.jpg",
      //       "Plastico",
      //       "Negro");

      // let d3 = new Dados
      //    ("33333",
      //       "dadoDorado",
      //       "set de dados",
      //       25.34,
      //       "21%",
      //       "IMAGEN",
      //       "Metalicos",
      //       "Rosa");

      // let p1 = new Pantalla("1111",
      //    "PantallaDM",
      //    "Pantalla estandar del DM",
      //    15,
      //    "21%",
      //    "../Multimedia/PanrallaDND.jpg",
      //    "Fisico",
      //    "30x45",
      //    "");// la campaña esta vacia porqie por defeccto es none
      // let p2 = new Pantalla("2222",
      //    "PantallaStradh",
      //    "Pantalla Para la campaña de stradh",
      //    15,
      //    "21%",
      //    "../Multimedia/curseOfStrahd.jpg",
      //    "Fisico",
      //    "20x35",
      //    "La Maldicion de Stradh");
      // let p3 = new Pantalla("3333",
      //    "PantallaWaterdeep",
      //    "Pantalla Para la campaña de Waterdeep",
      //    15,
      //    "21%",
      //    "IMAGEN",
      //    "Fisico",
      //    "20x35",
      //    "El golpe a los dragones");
      // let m1 = new Manual(
      //    "1111",
      //    "players handbook",
      //    "Manual del jugador para DND 5e",
      //    50,
      //    "21%",
      //    "IMAGEN",
      //    "Tapa dura",
      //    "Wizard of the coast",
      //    "Fisico");
      // let m2 = new Manual(
      //    "2222",
      //    "Manual del DM",
      //    "Manual del DM para DND 5e",
      //    50,
      //    "21%",
      //    "IMAGEN",
      //    "Tapa dura",
      //    "Wizard of the coast",
      //    "Fisico");
      // let m3 = new Manual(
      //    "3333",
      //    "Monster Manual",
      //    "Manual de monstruos para DND 5e",
      //    50,
      //    "21%",
      //    "IMAGEN",
      //    "",// no pongo cover porque por defecto no tiene
      //    "Wizard of the coast",
      //    "Fisico");

      // // LAPTOPS
      // // let ordenador= new Laptop(serialNumber, name, description, price, tax, images,model, CPU, charger, keyboard);
      // let msi = new Laptop(
      //    "111111",
      //    "msi",
      //    "ordenador",
      //    1000,
      //    "21%",
      //    "sasas",
      //    "masi",
      //    "Muy buena",
      //    "17A",
      //    "keyboard fino");
      // let asus = new Laptop(
      //    "22222",
      //    "ASUS",
      //    "ordenador",
      //    1000,
      //    "21%",
      //    "sasas",
      //    "asus",
      //    "Muy buena",
      //    "17A",
      //    "keyboard fino");
      // let nisu = new Laptop(
      //    "33333",
      //    "NISU",
      //    "ordenador",
      //    1000,
      //    "21%",
      //    "sasas",
      //    "nisu",
      //    "Muy buena",
      //    "17A",
      //    "keyboard fino");

      // //Añadimos las categorias
      // StoreHouse.addCategory(category1);
      // StoreHouse.addCategory(category2);
      // StoreHouse.addCategory(category3);
      // //Añadimos las tiendas
      // StoreHouse.addShop(TabernaHumeante);
      // StoreHouse.addShop(PonyPisador);
      // StoreHouse.addShop(CuernoInsaciable);
      // //Añadimos productos a categorias
      // StoreHouse.addProduct(d1, category1);
      // StoreHouse.addProduct(d2, category1);
      // StoreHouse.addProduct(d3, category1);
      // StoreHouse.addProduct(p1, category1);
      // StoreHouse.addProduct(p2, category1);
      // StoreHouse.addProduct(p3, category1);
      // StoreHouse.addProduct(m1, category2);
      // StoreHouse.addProduct(m2, category2);
      // StoreHouse.addProduct(m3, category2);
      // StoreHouse.addProduct(msi, category3);
      // StoreHouse.addProduct(asus, category3);
      // StoreHouse.addProduct(nisu, category3);
      // // Añadimos los productos a las tiendas con una cantidad
      // StoreHouse.addProductInShop(d1, TabernaHumeante, 10);
      // StoreHouse.addProductInShop(d2, TabernaHumeante, 10);
      // StoreHouse.addProductInShop(d3, PonyPisador, 10);
      // StoreHouse.addProductInShop(p1, PonyPisador, 10);
      // StoreHouse.addProductInShop(p2, TabernaHumeante, 10);
      // StoreHouse.addProductInShop(p3, PonyPisador, 10);
      // StoreHouse.addProductInShop(m1, CuernoInsaciable, 10);
      // StoreHouse.addProductInShop(m2, CuernoInsaciable, 10);
      // StoreHouse.addProductInShop(m3, CuernoInsaciable, 10);
      // StoreHouse.addProductInShop(msi, TabernaHumeante, 10);
      // StoreHouse.addProductInShop(asus, CuernoInsaciable, 10);
      // StoreHouse.addProductInShop(nisu, PonyPisador, 10);


   }

   constructor(model, view) {
      console.log('StoreHouse Controller');



      this.#StoreHouse = model;
      this.#StoreHouseView = view;
      // Eventos iniciales del controlador
      setTimeout(() => {
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
         //esto Borra las ventanas emergentes
         this.#StoreHouseView.bindCleanMaps(this.handleCleanMaps);
         //esto Maneja el historial
         this.#StoreHouseView.bindHistory(this.handleHistory);
         //Esto me muestra el formulario de añadir categoria
         this.#StoreHouseView.bindMostrarAñadirCat();
         //Esto me muestra el formulario de añadir categoria
         this.#StoreHouseView.bindValidarAñadirCat(this.handlerValidarAñadirCat);
         //Esto me muestra el formulario para rellenar la tienda
         this.#StoreHouseView.bindMostrarAñadirTienda();
         //Esto me Valida el formulario de la tienda
         this.#StoreHouseView.bindValidarAñadirTienda(this.handlerValidarAñadirTienda);
         //Esto me Valida el formulario Añadir Dados
         this.#StoreHouseView.bindValidarAñadirDados(this.handlerValidarAñadirDados);

         //Esto me Valida el formulario Añadir manual
         this.#StoreHouseView.bindValidarAñadirManual(this.handlerValidarAñadirManual);
         //Esto me Valida el formulario Añadir pantalla
         this.#StoreHouseView.bindValidarAñadirPantalla(this.handlerValidarAñadirPantalla);
         //Esto me Valida el formulario Añadir ordenador
         this.#StoreHouseView.bindValidarAñadirOrdenador(this.handlerValidarAñadirOrdenador);


         //Esto me muestra el select para borrar categorias
         this.#StoreHouseView.bindMostrarSelectBorrarCategorias();
         //Esto me muestra el select para borrar tiendas
         this.#StoreHouseView.bindMostrarSelectBorrarTiendas();
         //Esto me muestra el select para borrar Productos
         this.#StoreHouseView.bindMostrarSelectBorrarProducto();
         //Esto me muestra el select para añadir dados
         this.#StoreHouseView.bindMostrarAñadirDados();
         //Esto me muestra el select para añadir Manual
         this.#StoreHouseView.bindMostrarMostrarAñadirManual();
         //Esto me muestra el select para añadir Pantalla
         this.#StoreHouseView.bindMostrarAñadirPantalla();
         //Esto me muestra el select para añadir Laptops
         this.#StoreHouseView.bindMostrarAñadirLaptop();

         //Esto me muestra el formulario de login
         this.#StoreHouseView.bindValidarLogin(this.handleValidarLogin);
         //Esto me muestra el formulario de login
         this.#StoreHouseView.bindCerrarSesion(this.handleCerrarSesion);
         //Esto me muestra el formulario para rellenar la tienda
         this.#StoreHouseView.bindLoadSelects(this.handleLoadSelects);
         //Esto Me elimina la categoria
         this.#StoreHouseView.bindEliminarCategoria(this.handleEliminarCategoria);
         //Esto Me elimina las tiendas
         this.#StoreHouseView.bindEliminarTienda(this.handleEliminarTienda);
         //Esto Me elimina los productos
         this.#StoreHouseView.bindEliminarProducto(this.handleEliminarproducto);

      }, 200);
      //this.onInit();estos eventos van dirigos al view que se encargara de pintar

   }
   /**Desde el Controlador necesitamos un método que invoque el método que acabamos de crear
      en la Vista. Como nomenclatura para nombrar este tipo de métodos vamos a utilizar la
      preposición on en respuesta a los eventos que nos ocurran en el Controlador. Estos eventos los
      tenemos que invocar en respuesta a un cambio de datos en el Modelo. */


   onLoad = () => {
      this.#loadStoreHouseObjects();
      //Miro si la cookie ya existe
      if ((getCookie("usuarios") == "admin") && getCookie("contraseña") == "admin") {
         alert("HOLA DE NUEVO, LA COOKIE ESTA GUARDADA");
         $('#ContainerLogin').css("display", "none");
         $('#containerCerrarSesion').css("display", "block");
      }
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
      // console.log(this.#StoreHouse.ver());
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
      console.log(mapCategories);
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

   handleCleanMaps = () => {
      //Simulamos 1 peticion a la BBDD y la recogemos en formato JSON

      this.#StoreHouseView.CleanMaps();
   }

   handleHistory = (Direccion) => {
      //Simulamos 1 peticion a la BBDD y la recogemos en formato JSON

      this.#StoreHouseView.History(Direccion);
   }

   handlerValidarAñadirCat = (nuevoTitulo, nuevaDescripcion) => {
      let a = new Category(nuevoTitulo, nuevaDescripcion);
      this.#StoreHouse.addCategory(a);


      let mapCategories = {
         category: this.#StoreHouse.categories,
      };
      this.#StoreHouseView.ShowLoadSubMenuCategories(mapCategories);
   }

   handlerValidarAñadirTienda = (nuevoNombre, nuevoCif, nuevaDireccion, nuevoTelefono, nuevaLatitud, nuevaLongitud, nuevaFoto) => {
      let a = new Coords(nuevaLatitud, nuevaLongitud);
      let b = new Store(nuevoCif, nuevoNombre, nuevaDireccion, nuevoTelefono, a, nuevaFoto);
      this.#StoreHouse.addShop(b);

      let mapStores = {
         store: this.#StoreHouse.shops,
      };
      this.#StoreHouseView.ShowStores(mapStores)

      let mapsub = {
         store: this.#StoreHouse.shops,
      };

      this.#StoreHouseView.ShowLoadSubMenuStores(mapsub);
   }

   handlerValidarAñadirDados = (SN, nombre, nuevaDireccion, Precio, Impuesto, modelo, color, categoria, foto) => {
      let arrcat = categoria.split(" ");
      arrcat.forEach(element => {
         let a = new Dados(SN, nombre, nuevaDireccion, Precio, Impuesto, foto, modelo, color);
         this.#StoreHouse.addProduct(a, element);
      });

      let mapStores = {
         store: this.#StoreHouse.shops,
      };
      this.#StoreHouseView.ShowStores(mapStores)

      let mapsub = {
         store: this.#StoreHouse.shops,
      };

      this.#StoreHouseView.ShowLoadSubMenuStores(mapsub);
   }


   handlerValidarAñadirManual = (SN, nombre, nuevaDireccion, Precio, Impuesto, cover, autor, targer, categoria, foto) => {
      let arrcat = categoria.split(" ");
      arrcat.forEach(element => {
         let a = new Manual(SN, nombre, nuevaDireccion, Precio, Impuesto, foto, cover, autor, targer);
         this.#StoreHouse.addProduct(a, element);
      });

      let mapStores = {
         store: this.#StoreHouse.shops,
      };
      this.#StoreHouseView.ShowStores(mapStores)

      let mapsub = {
         store: this.#StoreHouse.shops,
      };

      this.#StoreHouseView.ShowLoadSubMenuStores(mapsub);
   }

   handlerValidarAñadirPantalla = (SN, nombre, descripcion, Precio, Impuesto, model, size, campaña, categoria, foto) => {
      let arrcat = categoria.split(" ");
      arrcat.forEach(element => {
         let a = new Pantalla(SN, nombre, descripcion, Precio, Impuesto, foto, model, size, campaña);
         this.#StoreHouse.addProduct(a, element);
      });

      let mapStores = {
         store: this.#StoreHouse.shops,
      };
      this.#StoreHouseView.ShowStores(mapStores)

      let mapsub = {
         store: this.#StoreHouse.shops,
      };

      this.#StoreHouseView.ShowLoadSubMenuStores(mapsub);
   }

   handlerValidarAñadirOrdenador = (SN, nombre, descripcion, Precio, Impuesto, model, cpu, cargador, teclado, categoria, foto) => {
      let arrcat = categoria.split(" ");
      arrcat.forEach(element => {
         let a = new Laptop(SN, nombre, descripcion, Precio, Impuesto, foto, model, cpu, cargador, teclado);
         this.#StoreHouse.addProduct(a, element);
      });

      let mapStores = {
         store: this.#StoreHouse.shops,
      };
      this.#StoreHouseView.ShowStores(mapStores)

      let mapsub = {
         store: this.#StoreHouse.shops,
      };

      this.#StoreHouseView.ShowLoadSubMenuStores(mapsub);
   }

   handleLoadSelects = () => {
      //Simulamos 1 peticion a la BBDD y la recogemos en formato JSON
      let mapStores = {
         store: this.#StoreHouse.shops,
      };

      let mapCategories = {
         category: this.#StoreHouse.categories,
      };
      let mapProducts = {
         Producto: this.#StoreHouse.getProducts(),
      };

      this.#StoreHouseView.LoadSelect(mapCategories, mapStores, mapProducts);
   }

   handleEliminarCategoria = (nombreCat) => {
      let a = new Category(nombreCat, "");

      this.#StoreHouse.removeCategory(a);

      let mapStores = {
         store: this.#StoreHouse.shops,
      };
      this.#StoreHouseView.ShowStores(mapStores)

      this.#StoreHouseView.ShowLoadSubMenuStores(mapStores);
   }



   handleEliminarTienda = (nombreTienda) => {

      let a = new Coords("1111", "1111");
      let b = new Store(nombreTienda, "aaa", "aaa", "aaaa", a, "aaaaa");
      this.#StoreHouse.removeShop(b);

      let mapStores = {
         store: this.#StoreHouse.shops,
      };
      this.#StoreHouseView.ShowStores(mapStores)

      let mapsub = {
         store: this.#StoreHouse.shops,
      };

      this.#StoreHouseView.ShowLoadSubMenuStores(mapsub);
   }

   handleEliminarproducto = (nombreproducto) => {

      let a = new Dados(" ", nombreproducto, " ", " ", " ", " ", " ", " ");
      this.#StoreHouse.removeProduct(a);

      let mapStores = {
         store: this.#StoreHouse.shops,
      };
      this.#StoreHouseView.ShowStores(mapStores)

      let mapsub = {
         store: this.#StoreHouse.shops,
      };

      this.#StoreHouseView.ShowLoadSubMenuStores(mapsub);
   }
   /**
    * AYUDA
    * @param {*} usuario 
    * @param {*} contraseña 
    */
   handleValidarLogin = (usuario, contraseña) => {
      if (usuario == "admin" && contraseña == "admin") {

         setCookie("usuarios", "admin", 5);

         setCookie("contraseña", "admin", 5);

         alert("HOLA");
         $('#ContainerLogin').css("display", "none");
         $('#containerCerrarSesion').css("display", "block");
      }
   }

   handleCerrarSesion() {
      setCookie("usuarios", "", 0);
      setCookie("contraseña", "", 0);
      this.handleRecargar;
   }

   handleRecargar = () => {
      //Esto recarga la pagina y la deja fina 
      location.reload(true);
   }
}
function setCookie(cname, cvalue, exdays) {
   const d = new Date();
   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
   let expires = "expires=" + d.toUTCString();
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
   let re = new RegExp('(?:(?:^|.*;\\s*)' + cname +
      '\\s*\\=\\s*([^;]*).*$)|^.*$');
   return document.cookie.replace(re, "$1");
}
function greetUser() {
   let user = getCookie("username");
   if (user) {
      alert("Hola " + user);
   } else {
      user = prompt("Dime tu nombre:", "");
      if (user != "" && user != null) {
         setCookie("username", user, 10);
      }
   }
}
export default StoreHouseController;
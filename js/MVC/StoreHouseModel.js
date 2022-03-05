'use strict'

/**
    Objeto StoreHouse
    Este objeto mantendrá el estado del almacén, donde debemos relacionar los productos que
    tenemos en el almacén, con las categorías a las que pertenecen y las tiendas en las que se
    pueden encontrar, con el stock de cada producto.
    La información que debe mantener es:
- Nombre del almacén.
- Los productos que hayamos añadido en el almacén.
- Las categorías de productos que tengas en el almacén.
- Las tiendas en las que están disponibles los productos.
- El stock de cada producto.
 
- Categoría por defecto. Todos los productos deben pertenecer al menos una categoría, 
la categoría por defecto es utilizada cuando un producto no encaja en ninguna categoría.
 
- Tienda por defecto. De la misma manera cada producto debe pertenecer al menos una tienda.
 
 
a la hora de hacer los imports me ha eliminado los .js finales
 
let MapaAJason=Object.fromEntries(mi mapa); con esto se pasa un mapa a JSON
y el paso de vuelta
const map2 = new Map(Object.entries(obj));
*/

import { Category } from "../classCategory.js";
import { Coords } from "../classCoords.js";
import { Product } from "../classProduct.js";
import { Store } from "../classStore.js";
import { Pantalla } from "../Pantalla.js";
import { Dados } from "../Dados.js";
import { Manual } from "../Manual.js";
import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException
} from "../Excepciones.js";

class StoreHouseModel {
    #name;
    #categories;
    #stores;
    #baseCoords;
    #baseShop;
    #baseCategory;
    constructor(name) {
        this.#name = name;
        // la clave sera el Serialnumber del producto y el valor el Stock


        // array donde se guardaran las tiendas, es decir almacena los objetos store

        this.#stores = [];
        /**
         * Cada elemento en la categoría puede ser un objeto literal con dos propiedades, una con
         * la categoría, y la otra un array que contenga los productos asignados a esa categoría.
         */
        this.#categories = [];
        this.#baseCoords = new Coords("0000", "0000");
        //CIF, name,address,phone,coords
        this.#baseShop = new Store("0000", "tienda base", "direccion base", "telefono base", this.#baseCoords);
        this.#baseCategory = new Category("categoria base", "descripcion de la categoria por defecto");
        this.addShop(this.#baseShop);
        this.addCategory(this.#baseCategory);
    }

    get name() {
        return this.#name;
    }

    set name(newName) {
        if (!newName) {
            throw new InvalidValueException("newName", "StoreHouseModel", 59);
        }
        return this.#name = newName;
    }

    get categories() {

        let categories = this.#categories;
        let nextIndex = 0;
        return {
            // Cerramiento                
            [Symbol.iterator]() {

                return {

                    next: function () {
                        if (nextIndex < categories.length) {
                            return {
                                value: categories[nextIndex++].category,
                                done: false
                            }
                        } else {
                            return {
                                done: true
                            }
                        }

                    },

                };

            },
            // se que no se usan pero tampoco lo vas a leer xd
            First: function () {
                return {
                    value: categories[0]
                }
            },
            Last: function () {
                return {
                    value: categories[categories.length]
                }
            }


        };
    }
    get shops() {
        let shops = this.#stores;
        let nextIndex = 0;
        return {
            // Cerramiento                
            [Symbol.iterator]() {

                return {

                    next: function () {
                        if (nextIndex < shops.length) {
                            return {
                                value: shops[nextIndex++].shop,
                                done: false
                            }
                        } else {
                            return {
                                done: true
                            }
                        }

                    },

                };

            },

            First: function () {
                return {
                    value: shops[0]
                }
            },
            Last: function () {
                return {
                    value: shops[shops.length]
                }
            }


        };
    }

    // el type lo igualamaos para q si no me pasas un tipo de producto devuelva todos
    *getShopProducts(shop, product = Object) {
        // el asterisco indica q es un generador y el yield pausa la funcion y proporciona el estado del generador
        // recorro el array de tiendas con un for of
        for (const tienda of this.#stores) {
            // si la tienda de mi array coincide con la tienda introducida por parametro
            if (tienda.shop.CIF === shop) {
                //buscamos en los productos de la tienda de mi array
                for (const productos of tienda.warehouse) {
                    //si estos productos son de tipo objeto porque no se ha introducido ningun producto nos devuelve todos
                    //actuando asi como filtro
                    if (productos.product instanceof product) {
                        yield {
                            nombre: productos.product.name,
                            cantidad: productos.stock,
                            imagen: productos.product.images
                        };
                    }
                }
            }
        }
        /*
        CATEGORIES[    CATEGORY:CATEGORIA
                        PRODUCTS[
                            PRODUCT: PRODUCT
                            SHOPS[CIF DE LA TIENDA]
                        ]
                    ]
        STORES[      SHOP:SHOP  
                     WAREHOUSE[
                         PRODUCT: PRODUCT
                         STOCK[CANTIDAD EN TIENDA]
                     ]
                ]
        */
    }
    //Este product es el nombre
    getProduct(product) {
        let valores;//declaro valores y aqui sera donde guarde todos los datos del producto una vez encontrado en categorias
        for (const categoria of this.#categories) {
            if (!(categoria.category.title == "categoria base")) {
                for (const producto of categoria.products) {
                    if (producto.product.name == product) {
                        valores = {
                            imagen: producto.product.images,
                            nombre: producto.product.name,
                            descripcion: producto.product.description,
                            precio: producto.product.price,
                            IVA: producto.product.tax,
                            numeroDeSerie: producto.product.serialNumber,
                            CIF: producto.shops
                        }
                    }
                }
            }

        }
        let devolver;
        //busco en las tiendas este producto para encontrar su stock y uso la variable devovler para añadir los nuevos datos a los anteriores
        for (const tienda of this.#stores) {
            // si la tienda de mi array coincide con la tienda introducida por parametro
            if (tienda.shop.CIF === valores.CIF) {
                //buscamos en los productos de la tienda de mi array
                for (const productos of tienda.warehouse) {
                    
                    if (productos.product.name == product) {
                        devolver = {
                            imagen: valores.imagen,
                            nombre: valores.nombre,
                            descripcion: valores.descripcion,
                            precio: valores.precio,
                            IVA: valores.IVA,
                            numeroDeSerie: valores.numeroDeSerie,
                            CIF: valores.CIF,
                            cantidad: productos.stock,
                            nombreTienda: tienda.shop.name
                        };
                    }
                }
            }
        }
        return devolver;
    }

    // MIRAR COMO SACAR EL STOCK DE TODOS LOS PRODUCTOS DE TODAS LAS TIENDAS
    * getCategoryProducts(category, product = Object) {
        // if (!(category instanceof Category)) {

        //     throw new InvalidValueException("Category", "StoreHouseModel", 486);

        // }

        // recorremos el array de categorias 
        for (const categoria of this.#categories) {
            // si la categoria de mi array coincide con la categoria introducida por parametro
            if (categoria.category.title === category) {
                //testamos en el array de productos de cateogrias
                for (const productos of categoria.products) {
                    /*
                    por cada producto vamos a dar una vuelta a todo lo q hay aqui dentro
                    asique voy a recorrer por producto el array de tiendas para buscar en mi array de tiendas a q tienda
                    pertenece mi producto
                    */
                    for (const tienda of this.#stores) {
                        // recorro mi array de tienas
                        //Si hacen match el ciff de la tienda de mi producto en categorias con el ciff de mi tienda 
                        if (productos.shops === tienda.shop.CIF) {
                            //podremos recorrer esa tienda y sacar su stock
                            for (const productotienda of tienda.warehouse) {

                                if (productos.product instanceof product) {
                                    // arriba seria el filtro, pero me repite los productos el
                                    // mismo numero de veces qie el numero de tiendas distintas que recorro
                                    if (productos.product.name == productotienda.product.name) {
                                        yield {
                                            imagen: productos.product.imagen,
                                            nombre: productos.product.name,
                                            cantidad: productotienda.stock
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        /*
                      CATEGORIES[    CATEGORY:CATEGORIA
                                      PRODUCTS[
                                          PRODUCT: PRODUCT
                                          SHOPS:CIF DE LA TIENDA
                                      ]
                                  ]
                      STORES[      SHOP:SHOP  
                                   WAREHOUSE[
                                       PRODUCT: PRODUCT
                                       STOCK[CANTIDAD EN TIENDA]
                                   ]
                              ]
                      */
    }

    addCategory(category) {

        if (category == null) {
            throw new InvalidValueException("category", "StoreHouseModel", 150);
        }
        //variable conde guardamos nuestro this.#categories
        // let comprobante = this.#categories;


        if (this.#categories.findIndex(function (elem) {
            return elem.title == category.title;
        }) !== -1) {
            throw new InvalidValueException("category", "StoreHouseModel", 159);
        } else {

            this.#categories.push({
                category: category,
                products: []// aqui van los nombres de los productos
            })
        }
        return this.#categories.length;
    }
    /**
     * 
     CATEGORIES[    CATEGORY:CATEGORIA
                     PRODUCTS[
                         PRODUCT: PRODUCT
                         SHOPS[CIF DE LA TIENDA]
                     ]]
     */
    //añade un nuevo producto asociado a una o mas categorias
    addProduct(Product, Category) {
        if (Product == null) {
            throw new InvalidValueException("Product", "StoreHouseModel", 194);
        }
        let cont = 0;

        this.#categories.forEach(element => {

            if (element.category.title == Category.title) {
                this.#categories[cont].products.push({
                    // esto es un JSON y en el array de productos de la categoria pasada por parametro tendre el productID con valor de serialNumber de ese Producto
                    //{ ProductId: Product.serialNumber }
                    product: Product,
                    shops: "0000" //CIF DE LA TIENDA BASE

                });
            } else {
                cont = cont + 1;
            }
        });
        return this.#categories.length;
    }
    /**
     * 
     stores[         SHOP:SHOP  
                     WAREHOUSE[
                         PRODUCT: PRODUCT
                         STOCK[CANTIDAD EN TIENDA]
                     ]]
     */
    addShop(shop) {
        if (!(shop instanceof Store)) {
            throw new InvalidValueException("shop", "StoreHouseModel", 240);
        }
        if (!(shop)) {
            throw new EmptyValueException("shop", "StoreHouseModel", 243);
        }
        this.#stores.forEach(element => {
            if (element.CIF == shop.CIF) {
                throw new InvalidValueException("shop", "StoreHouseModel", 247);
            }

        });


        this.#stores.push({
            shop: shop,
            warehouse: []
        });
        return this.#stores.length;
    }
    /**
     * 
    stores      [   SHOP:SHOP  
                    WAREHOUSE{
                         PRODUCT: PRODUCT
                         STOCK:CANTIDAD EN TIENDA
                     }
                ]
    CATEGORIES[    CATEGORY:CATEGORIA
                    PRODUCTS[
                         PRODUCT: PRODUCT
                         SHOPS[CIF DE LA TIENDA]
                    ]
                ]
     */
    addProductInShop(product, shop, number) {

        // esto me mira si existe la tienda y me devuelve la posicion
        let posiciontienda = (this.#stores.findIndex(function (tienda) {
            return tienda.shop.CIF == shop.CIF
        }));
        if (posiciontienda == -1) {
            throw new InvalidValueException("shop", "StoreHouseModel", 318);
        }

        // Esto me busca si existe el producto
        let posicionProducto;
        posicionProducto = this.#stores[posiciontienda].warehouse.findIndex(function (producto) {
            return producto.product.name == product.name;
        })


        if (!(posicionProducto == -1)) {

            throw new InvalidValueException("product", "StoreHouseModel", 318);
        }

        this.#stores[posiciontienda].warehouse.push({
            product: product,
            stock: number
        });
        //Actualizamos El Ciff de ese producto
        let contcat = 0;
        this.#categories.forEach(categoria => {
            if (!(categoria.category.title == "categoria base")) {
                let contprod = 0;
                for (const productos of categoria.products) {
                    if (product.name == productos.product.name) {
                        this.#categories[contcat].products[contprod].shops = shop.CIF;
                    }
                    contprod += 1;
                }

            }
            contcat += 1;
        });
        /**
            CATEGORIES[    CATEGORY:CATEGORIA
                           PRODUCTS[
                                PRODUCT: PRODUCT
                                SHOPS:CIF DE LA TIENDA
                           ]
                       ]
        
           stores      [   SHOP:SHOP  
                           WAREHOUSE{
                                PRODUCT: PRODUCT
                                STOCK:CANTIDAD EN TIENDA
                            }
                       ]
        */
        return this.#stores[posiciontienda].warehouse.lenght;

    }
    addQuantityProductInShop(product, shop, number) {
        // el numero es positivo
        if (number < 0) {
            throw new InvalidValueException("number", "StoreHouseModel", 351);
        }

        // esto me mira si existe la tienda
        let posiciontienda = (this.#stores.findIndex(function (tienda) {
            return tienda.shop.CIF == shop.CIF
        }));

        if (posiciontienda == -1) {
            throw new InvalidValueException("shop", "StoreHouseModel", 318);
        }

        // de esta forma saco la posicion del producto
        let posicionProducto;
        posicionProducto = this.#stores[posiciontienda].warehouse.findIndex(function (producto) {
            return producto.product.name == product.name;
        })

        let ValorAnterior = this.#stores[posiciontienda].warehouse[posicionProducto].stock;
        let total = number + ValorAnterior;
        this.#stores[posiciontienda].warehouse[posicionProducto].stock = total;
        return this.#stores[posiciontienda].warehouse[posicionProducto].stock;
        /** 
          CATEGORIES[    CATEGORY:CATEGORIA
                         PRODUCTS[
                              PRODUCT: PRODUCT
                              SHOPS[CIF DE LA TIENDA]
                         ]
                     ]
     
         stores      [   SHOP:SHOP  
                         WAREHOUSE{
                              PRODUCT: PRODUCT
                              STOCK:CANTIDAD EN TIENDA
                          }
                     ]
          */

    }

    removeProduct(product) {
        if (Product == null) {
            throw new InvalidValueException("Product", "StoreHouseModel", 198);
        }


        let ExisteProductoEnCategoria = false;
        let ExisteProductoEnTienda = false;

        this.#stores.forEach(tienda => {
            tienda.warehouse.forEach(element => {
                if (element.product.name == product.name) {
                    ExisteProductoEnTienda = true;
                }
            });
        });

        this.#categories.forEach(categoria => {
            categoria.products.forEach(producto => {
                if (producto.product.name == product.name) {
                    ExisteProductoEnCategoria = true;
                }
            });
        });

        if (!(ExisteProductoEnCategoria) || !(ExisteProductoEnTienda)) {
            throw new InvalidValueException("product", "StoreHouseModel", 320);
        }

        this.#categories.forEach(categoria => {
            let i = 0;
            categoria.products.forEach((producto, index) => {

                if (producto.product.name == product.name) {
                    i = index;
                }

            })
            categoria.products.splice(i, 1);
        });


        this.#stores.forEach(tienda => {
            let i = 0;
            tienda.warehouse.forEach((element, index) => {
                if (element.product.name == product.name) {
                    i = index;
                }
            });
            tienda.warehouse.splice(i, 1);

        });

        /** 
            CATEGORIES[    CATEGORY:CATEGORIA
                           PRODUCTS[
                                PRODUCT: PRODUCT
                                SHOPS[CIF DE LA TIENDA]
                           ]
                       ]
       
           stores      [   SHOP:SHOP  
                           WAREHOUSE{
                                PRODUCT: PRODUCT
                                STOCK:CANTIDAD EN TIENDA
                            }
                       ]
            */


    }

    removeCategory(category) {
        if (category == null) {
            throw new InvalidValueException("category", "StoreHouseModel", 171);
        }

        // guardo la posicion de la categoria que vamos a eliminar del array this.#categories
        let posicion = this.#categories.findIndex(function (elem) { return elem.category.title == category.title });

        // si no encontramos esa categoria salta el error
        // en caso de que si este recorro el array de productos de esa categoría y los voy añadiendo a la tienda por defecto si no los tenia registrados ya
        //dandoles un valor de 0
        if (posicion == -1) {
            throw new InvalidValueException("category", "StoreHouseModel", 180);
        }
        // for (let i = 0; i < this.#categories[posicion].products.lenght; i++) {
        //     if (!(this.#baseCategory.product.includes(this.#categories[posicion].products[i].ProductId))) {

        //         this.#baseCategory.product.push(this.#categories[posicion].products[i].ProductId);
        //     }

        // }

        this.#categories[posicion].products.forEach(element => {
            // si no lo contiene, pushea el producto en la categoria base
            if (!(this.#categories[0].products.includes(element.product.name))) {
                this.#categories[0].products.push({
                    // esto es un JSON y en el array de productos de la categoria pasada por parametro tendre el productID con valor de serialNumber de ese Producto
                    product: element.product,
                    shops: [] //Aqui van los ciffs de las tiendas a las que perteneces los productos

                });
            }

        });

        /** 
            CATEGORIES[    CATEGORY:CATEGORIA
                           PRODUCTS[
                                PRODUCT: PRODUCT
                                SHOPS[CIF DE LA TIENDA]
                           ]
                       ]
       
           stores      [   SHOP:SHOP  
                           WAREHOUSE{
                                PRODUCT: PRODUCT
                                STOCK:CANTIDAD EN TIENDA
                            }
                       ]
            */


        this.#categories.splice(posicion, 1);


        return this.#categories.length;

    }

    removeShop(shop) {
        if (!(shop instanceof Store)) {
            throw new InvalidValueException("shop", "StoreHouseModel", 402);
        }
        if (!(shop)) {
            throw new EmptyValueException("shop", "StoreHouseModel", 405);
        }
        let comprueba = (this.#stores.findIndex(function (elem) {
            return elem.shop.CIF == shop.CIF
        }));
        if (comprueba == -1) {

            throw new InvalidValueException("shop", "StoreHouseModel", 412);

        }
        /**
           * 
           CATEGORIES[    CATEGORY:CATEGORIA
                          PRODUCTS[
                               PRODUCT: PRODUCT
                               SHOPS[CIF DE LA TIENDA]
                          ]
                      ]
      
          stores      [   SHOP:SHOP  
                          WAREHOUSE{
                               PRODUCT: PRODUCT
                               STOCK:CANTIDAD EN TIENDA
                           }
                      ]
           */

        let tiendaPosicion = this.#stores.findIndex(function (buscar) {
            return buscar.shop.CIF == shop.CIF
        });
        // esta variable me va a recorrer todos los productos y sus stocks
        this.#stores[tiendaPosicion].warehouse.forEach(element => {
            // si no lo contiene, pushea el producto en la categoria base
            if (!(this.#stores[0].warehouse.includes(element.product.name))) {
                this.#categories[0].products.push({
                    // esto es un JSON y en el array de productos de la categoria pasada por parametro tendre el productID con valor de serialNumber de ese Producto
                    product: element.product,
                    stock: element.stock //Aqui van los ciffs de las tiendas a las que perteneces los productos

                });
            }
        });

        this.#stores.splice(tiendaPosicion, 1);


        return this.#stores.length;

    }


}

const SingletonStoreHouseModel = (function () {
    var instance;

    function createInstance(name) {
        var classObj = new StoreHouseModel(name);
        return classObj;
    }

    return {
        getInstance: function (name) {
            if (!instance) {
                instance = createInstance(name);
            }
            return instance;
        }
    }
})();

export default SingletonStoreHouseModel;



export { Category };
export { Coords };
export { Product };
export { Store };
export { Pantalla }
export { Dados };
export { Manual };
export {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException
};
// aqui las funciones







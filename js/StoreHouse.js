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
import { Category } from "./classCategory.js";
import { Coords } from "./classCoords.js";
import { Product } from "./classProduct.js";
import { Store } from "./classStore.js";
import { EmptyValueException, InvalidValueException } from "./Excepciones.js";

class StoreHouse {
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
            throw new InvalidValueException("newName", "StoreHouse", 59);
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
    *getShopProducts(shop, type = Object) {
        // el asterisco indica q es un generador y el yield pausa la funcion y proporciona el estado del generador

        if (!(shop instanceof Store)) {

            throw new InvalidValueException("shop", "StoreHouse", 436);

        }
        /**
         * el primer bucle me saca las tiendas del array de tiendas
         * cojo todos los productos de esa tienda
         * y los devuelvo con su stock
         */
        for (const tienda of this.#stores) {
            if (tienda.shop.CIF == shop.CIF) {
                for (const almacen of tienda.warehouse) {
                    if (almacen.product instanceof type) {
                        yield {
                            producto: almacen.product,
                            stock: almacen.stock
                        }
                    }
                }
            }
        }

        // cada vez q se itere me devuelve el yields 
        /*for (const product of this.#products) {
            if (product instanceof type) {
                yield product
            }
        }*/
        /**
     * stores[       SHOP:SHOP  
                     WAREHOUSE[
                         PRODUCT: PRODUCT
                         STOCK[CANTIDAD EN TIENDA]
                     ]]

        CATEGORIES[    CATEGORY:CATEGORIA
                    PRODUCTS[
                        PRODUCT: PRODUCT
                        SHOPS[CIF DE LA TIENDA]
                    ]]
        */
    }


    // MIRAR COMO SACAR EL STOCK DE TODOS LOS PRODUCTOS DE TODAS LAS TIENDAS
    * getCategoryProducts(category, type = Object) {
        /**Devuelve la relación de todos los productos
        añadidos en una categoría con sus
        cantidades en stock. Si pasamos un tipo de
        producto, el resultado estará filtrado por
        ese tipo */

        if (!(category instanceof Category)) {

            throw new InvalidValueException("Category", "StoreHouse", 486);

        }
        /* 
        CATEGORIES[    CATEGORY:CATEGORIA
                    PRODUCTS[
                        PRODUCT: PRODUCT
                        SHOPS[CIF DE LA TIENDA]
                    ]]

        STORES[       SHOP:SHOP  
                     WAREHOUSE[
                         PRODUCT: PRODUCT
                         STOCK[CANTIDAD EN TIENDA]
                     ]]
        */
       //recorro el array de categorias con el forof
       // avanzo si la categoria del array corresponde con la categoria introducida
       //dentro busco los productos de esa categoria
       //entonces al tener esos productos donde ademas guardo los cifs de sus tiendas
       // recorro el array de tiendas para buscar esos productos y así sacar su stock
        for (const categoria of this.#categories) {
            if ((categoria.title === category.title) && (categoria.description === category.description)) {
                for (const producto of categoria.products) {
                    if (producto.product instanceof type) {

                        for (const tienda of this.#stores) {
                            if (tienda.shop.CIF == producto.shop) {
                                for (const almacen of tienda.warehouse) {
                                    if (almacen.product instanceof type) {
                                        yield {
                                            producto: producto.product,
                                            stock: almacen.stock
                                        }
                                    }
                                }
                            }
                        }
                        //Va sacando los productos si esta en la tienda y filtra por el tipo de Producto
                        // yield {
                        //     product: producto.product,
                        //     stock: "ESTOCK"
                        // };
                    }

                }
            }

        }


    }

    addCategory(category) {

        if (category == null) {
            throw new InvalidValueException("category", "StoreHouse", 150);
        }
        //variable conde guardamos nuestro this.#categories
        // let comprobante = this.#categories;


        if (this.#categories.findIndex(function (elem) {
            return elem.title == category.title;
        }) !== -1) {
            throw new InvalidValueException("category", "StoreHouse", 159);
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
            throw new InvalidValueException("Product", "StoreHouse", 194);
        }
        let cont = 0;

        this.#categories.forEach(element => {

            if (element.category.title == Category.title) {
                this.#categories[cont].products.push({
                    // esto es un JSON y en el array de productos de la categoria pasada por parametro tendre el productID con valor de serialNumber de ese Producto
                    //{ ProductId: Product.serialNumber }
                    product: Product,
                    shops: this.#stores[0].CIF //Aqui van los ciffs de las tiendas a las que perteneces los productos

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
            throw new InvalidValueException("shop", "StoreHouse", 240);
        }
        if (!(shop)) {
            throw new EmptyValueException("shop", "StoreHouse", 243);
        }
        this.#stores.forEach(element => {
            if (element.CIF == shop.CIF) {
                throw new InvalidValueException("shop", "StoreHouse", 247);
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
    addProductInShop(product, shop, number) {

        // esto me mira si existe la tienda
        let posiciontienda = (this.#stores.findIndex(function (tienda) {
            return tienda.shop.CIF == shop.CIF
        }));
        if (posiciontienda == -1) {
            throw new InvalidValueException("shop", "StoreHouse", 318);
        }

        // Esto me busca si existe el producto
        let posicionProducto;
        posicionProducto = this.#stores[posiciontienda].warehouse.findIndex(function (producto) {
            return producto.product.name == product.name;
        })


        if (!(posicionProducto == -1)) {

            throw new InvalidValueException("product", "StoreHouse", 318);
        }

        this.#stores[posiciontienda].warehouse.push({
            product: product,
            stock: number
        });
        this.#categories.forEach(element => {

            element.products.forEach(ele => {
                if (ele.product.name === product.name) {
                    ele.shops = shop.CIF
                }
            })
        });
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
        return this.#stores[posiciontienda].warehouse.lenght;

    }
    addQuantityProductInShop(product, shop, number) {
        // el numero es positivo
        if (number < 0) {
            throw new InvalidValueException("number", "StoreHouse", 351);
        }

        // esto me mira si existe la tienda
        let posiciontienda = (this.#stores.findIndex(function (tienda) {
            return tienda.shop.CIF == shop.CIF
        }));

        if (posiciontienda == -1) {
            throw new InvalidValueException("shop", "StoreHouse", 318);
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
        // // Esto me busca si existe el producto
        // console.log(this.#stores)

        // let posicionProducto = (this.#stores.forEach(function (tiendas) {
        //     console.log(1)
        //     return tiendas.warehouse.findIndex(function (producto) {

        //         return producto.product.name == product.name;
        //     })
        // }));
        // console.log(posicionProducto)

        // if (posicionProducto == -1) {

        //     throw new InvalidValueException("product", "StoreHouse", 318);
        // }

        // let guardar = 0;// esta variable me almacena el anterior valor del stock de dicho producto
        // guardar = this.#stores[posiciontienda].warehouse.stock;

        // this.#stores[posiciontienda].warehouse.splice(posiciontienda, 1);


        // // return this.#stores[cuentatienda].warehouse.get(product.serialNumber);
        // return this.#stores[posiciontienda].warehouse[posicionProducto].product.name;
    }

    removeProduct(product) {
        if (Product == null) {
            throw new InvalidValueException("Product", "StoreHouse", 198);
        }

        // los productos estan guardados en this.#categories y dentro del array products guardan su numero de serie en el parametro ProductoId
        // ademas en this.#stores que es DONDE SE GUARDAN LAS TIENDAS debe haber un mapa llamado warehouse donde se guarda como clave el numero de serie 
        // y como valor la cantidad de productos

        //this.#categories[numerodecategoria].products[numeroproducto].ProductoId;

        // let cont = 0;
        // let flag = false;
        // this.#categories.forEach(element => {
        //     if (flag == false) {
        //         if (element.products[cont].ProductId == product.serialNumber) {
        //             flag == true;
        //         } else {
        //             cont = cont + 1;
        //         }
        //     } else {
        //         throw new InvalidValueException("product", "StoreHouse", 320);
        //     }

        // });
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
            throw new InvalidValueException("product", "StoreHouse", 320);
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

        // let cuentatienda = 0;
        // let guardar = 0;// variable q nos ayuda a contar la cantidad de productos eliminados
        // let total = 0;// variable donde almacenamos todos los productos eliminados
        // this.#stores.forEach(element => {
        //     // if (element.warehouse.has(product.serialNumber)) {
        //     if (element.warehouse.has(product.name)) {
        //         // guardar = this.#stores[cuentatienda].warehouse.get(product.serialNumber);
        //         guardar = this.#stores[cuentatienda].warehouse.get(product.name);


        //         //this.#stores[cuentatienda].warehouse.delete(product.serialNumber);
        //         this.#stores[cuentatienda].warehouse.delete(product.name);
        //         this.#stores[cuentatienda].warehouse.size;
        //         cuentatienda = cuentatienda + 1;
        //     } else {
        //         cuentatienda = cuentatienda + 1;
        //     }
        //     total = total + guardar;
        // });
        // //asi borramos dicho producto de todas las categorias del array categorias
        // let cuentacategoria = 0;
        // this.#categories.forEach(elementCat => {
        //     let posicionProducto = 0;
        //     elementCat.products.forEach(elementProd => {
        //         if (elementProd.ProductId == product.serialNumber) {
        //             this.#categories[cuentacategoria].products;
        //             this.#categories[cuentacategoria].products.splice(posicionProducto, 1)
        //             this.#categories[cuentacategoria].products.lenght;
        //         }
        //         else {
        //             posicionProducto += 1;
        //         }
        //     })
        //     cuentacategoria = cuentacategoria + 1;
        // });
        // return "se han eliminado " + total + " productos con numero de serie " + product.serialNumber

    }

    removeCategory(category) {
        if (category == null) {
            throw new InvalidValueException("category", "StoreHouse", 171);
        }

        // guardo la posicion de la categoria que vamos a eliminar del array this.#categories
        let posicion = this.#categories.findIndex(function (elem) { return elem.category.title == category.title });

        // si no encontramos esa categoria salta el error
        // en caso de que si este recorro el array de productos de esa categoría y los voy añadiendo a la tienda por defecto si no los tenia registrados ya
        //dandoles un valor de 0
        if (posicion == -1) {
            throw new InvalidValueException("category", "StoreHouse", 180);
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
            throw new InvalidValueException("shop", "StoreHouse", 402);
        }
        if (!(shop)) {
            throw new EmptyValueException("shop", "StoreHouse", 405);
        }
        let comprueba = (this.#stores.findIndex(function (elem) {
            return elem.shop.CIF == shop.CIF
        }));
        if (comprueba == -1) {

            throw new InvalidValueException("shop", "StoreHouse", 412);

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

        // let guardar = 0;
        // //   let total = 0;
        // let cuentatienda = 0;// esta variable me dice la posicion de la tienda en el array

        // let index = this.#stores.findIndex((elem) => {
        //     return elem.shop.CIF === shop.CIF
        // });

        // this.#stores[index].warehouse.forEach((elem) => {
        //     this.#categories.forEach((categoria) => {
        //         categoria.products.forEach((product) => {
        //             if (product.serialNumber === elem.serialNumber) {

        //             }
        //         })
        //     })
        // })



        // this.#stores.splice(cuentatienda, 1);
        // return this.#stores.length;

    }


}

const SingletonStoreHouse = (function () {
    var instance;

    function createInstance(name) {
        var classObj = new StoreHouse(name);
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

export default SingletonStoreHouse;
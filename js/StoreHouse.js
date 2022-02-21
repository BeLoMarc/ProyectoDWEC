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
        //addShop(this.#baseShop); creo que tengo que hacer esto para poder usar la tienda base
        //addCategory(this.#baseCategory);

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
                products: []
            })
        }
        return this.#categories.length;
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
        } else {
            for (let i = 0; i < this.#categories[posicion].products.lenght; i++) {
                if (!(this.#baseCategory.product.includes(this.#categories[posicion].products[i].ProductId))) {

                    this.#baseCategory.product.push(this.#categories[posicion].products[i].ProductId);
                }

            }

        }

        this.#categories.splice(posicion, 1);

        //variable conde guardamos nuestro this.#categories
        /**this.#categories.forEach(element => {

            if (element.category == category) {
                this.#categories.splice(cont, 1);
            } else {
                cont = cont + 1;
            }

        });*/
        return this.#categories.length;

    }

    //añade un nuevo producto asociado a una o mas categorias
    addProduct(Product, Category) {
        if (Product == null) {
            throw new InvalidValueException("Product", "StoreHouse", 194);
        }
        let cont = 0;
        this.#categories.forEach(element => {

            if (element.category.title == Category.title) {
                this.#categories[cont].products.push(

                    // esto es un JSON y en el array de productos de la categoria pasada por parametro tendre el productID con valor de serialNumber de ese Producto
                    { ProductId: Product.serialNumber }

                );
            } else {
                cont = cont + 1;
            }
        });
        return this.#categories.length;
    }

    removeProduct(product) {
        if (Product == null) {
            throw new InvalidValueException("Product", "StoreHouse", 198);
        }

        // los productos estan guardados en this.#categories y dentro del array products guardan su numero de serie en el parametro ProductoId
        // ademas en this.#stores que es DONDE SE GUARDAN LAS TIENDAS debe haber un mapa llamado warehouse donde se guarda como clave el numero de serie 
        // y como valor la cantidad de productos

        //this.#categories[numerodecategoria].products[numeroproducto].ProductoId;

        let cont = 0;
        let flag = false;
        this.#categories.forEach(element => {
            if (flag == false) {
                if (element.products[cont].ProductId == product.serialNumber) {
                    flag == true;
                } else {
                    cont = cont + 1;
                }
            } else {
                throw new InvalidValueException("product", "StoreHouse", 320);
            }

        });

        let cuentatienda = 0;
        let guardar = 0;// variable q nos ayuda a contar la cantidad de productos eliminados
        let total = 0;// variable donde almacenamos todos los productos eliminados
        this.#stores.forEach(element => {
            // if (element.warehouse.has(product.serialNumber)) {
            if (element.warehouse.has(product.name)) {
                // guardar = this.#stores[cuentatienda].warehouse.get(product.serialNumber);
                guardar = this.#stores[cuentatienda].warehouse.get(product.name);


                //this.#stores[cuentatienda].warehouse.delete(product.serialNumber);
                this.#stores[cuentatienda].warehouse.delete(product.name);
                this.#stores[cuentatienda].warehouse.size;
                cuentatienda = cuentatienda + 1;
            } else {
                cuentatienda = cuentatienda + 1;
            }
            total = total + guardar;
        });
        //asi borramos dicho producto de todas las categorias del array categorias
        let cuentacategoria = 0;
        this.#categories.forEach(elementCat => {
            let posicionProducto = 0;
            elementCat.products.forEach(elementProd => {
                if (elementProd.ProductId == product.serialNumber) {
                    this.#categories[cuentacategoria].products;
                    this.#categories[cuentacategoria].products.splice(posicionProducto, 1)
                    this.#categories[cuentacategoria].products.lenght;
                }
                else {
                    posicionProducto += 1;
                }
            })
            cuentacategoria = cuentacategoria + 1;
        });
        return "se han eliminado " + total + " productos con numero de serie " + product.serialNumber

    }

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
            warehouse: new Map()
        });
        return this.#stores.length;
    }

    addProductInShop(product, shop, number) {
        let cuentatienda = 0;
        //  let guardar = 0;
        //  let total = 0;
        let cont = 0;
        let flag = false;
        this.#categories.forEach(element => {
            if (flag == false) {
                if (element.products[cont].ProductId == product.serialNumber) {
                    flag == true;
                } else {
                    cont = cont + 1;
                }
            } else {
                throw new InvalidValueException("product", "StoreHouse", 320);
            }

        });





        //   if (!(this.#stores.includes(shop.CIF))) {
        //      throw new InvalidValueException("shop", "StoreHouse", 304);
        // }
        let comprueba = (this.#stores.findIndex(function (elem) {
            return elem.CIF == shop.CIF
        }));
        if (comprueba == -1) {

            throw new InvalidValueException("shop", "StoreHouse", 318);

        }

        //busco en el array de tiendas la posicion de la tienda que la lleva ademas cuentatienda
        this.#stores.forEach(element => {
            if (element.CIF == shop.CIF) {

                //guardar = this.#stores[cuentatienda].warehouse.get(product.serialNumber);

                // total = guardar + number;

                //this.#stores[cuentatienda].warehouse.set(product.serialNumber, number);
                this.#stores[cuentatienda].warehouse.set(product.name, number);
            }
            else {
                cuentatienda = cuentatienda + 1;
            }
        });
        return this.#stores[cuentatienda].warehouse.size;
    }
    addQuantityProductInShop(product, shop, number) {

        if (number < 0) {
            throw new InvalidValueException("number", "StoreHouse", 351);
        }



        let cont = 0;
        let flag = false;
        this.#categories.forEach(element => {
            if (flag == false) {
                if (element.products[cont].ProductId == product.serialNumber) {
                    flag == true;
                    cont = cont + 1;
                } else {
                    cont = cont + 1;
                }
            } else {
                throw new InvalidValueException("product", "StoreHouse", 320);
            }

        });




        let comprueba = (this.#stores.findIndex(function (elem) {
            return elem.CIF == shop.CIF
        }));
        if (comprueba == -1) {

            throw new InvalidValueException("shop", "StoreHouse", 367);
        }



        let cuentatienda = 0;
        let guardar = 0;
        let total = 0;
        this.#stores.forEach(element => {
            if (element.CIF == shop.CIF) {

                // guardar = this.#stores[cuentatienda].warehouse.get(product.serialNumber);
                guardar = this.#stores[cuentatienda].warehouse.get(product.name);
                total = guardar + number;

                //this.#stores[cuentatienda].warehouse.set(product.serialNumber, total);
                this.#stores[cuentatienda].warehouse.set(product.name, total);
            }
            else {
                cuentatienda = cuentatienda + 1;
            }
        });
        // return this.#stores[cuentatienda].warehouse.get(product.serialNumber);
        return this.#stores[cuentatienda].warehouse.get(product.name);
    }
    // el type lo igualamaos para q si no me pasas un tipo de producto devuelva todos
    *  getShopProducts(shop, product, type = Object) {
        // el asterisco indica q es un generador y el yield pausa la funcion y proporciona el estado del generador

        if (!(shop instanceof Store)) {

            throw new InvalidValueException("shop", "StoreHouse", 436);

        }




        // cada vez q se itere me devuelve el yields 
        for (const product of this.#products) {
            if (product instanceof type) {
                yield product
            }
        }


        // el yield tiene q mostrar 
        // SI PASAMOS UNA TIENDA:
        //nos tiene que decir todos los productos y el stock de estos en esa tienda concreta
        if ((product instanceof Product)) {
            for (const siguiente of this.shops()) {
                if (siguiente.value.CIF == shop.CIF)
                    yield siguiente.value.CIF;
            }

        } else {

            // el yield tiene q mostrar 
            //SI PASAMOS UN PRODUCTO:
            // devolvera todos el stock de ese producto en esa tienda en concreto

            let cuentatienda = 0;
            if (product instanceof Product) {
                for (const siguiente of this.shops()) {
                    if (siguiente.value.CIF == shop.CIF) {
                        //  this.#stores[cuentatienda].warehouse.get(product.ID);
                        this.#stores[cuentatienda].warehouse.get(product.name);
                    }
                    cuentatienda += 1;
                }

            }
        }




    }


    // MIRAR COMO SACAR EL STOCK DE TODOS LOS PRODUCTOS DE TODAS LAS TIENDAS
    * getCategoryProducts(category, product) {
        /**Devuelve la relación de todos los productos
        añadidos en una categoría con sus
        cantidades en stock. Si pasamos un tipo de
        producto, el resultado estará filtrado por
        ese tipo */

        if (!(category instanceof Category)) {

            throw new InvalidValueException("Category", "StoreHouse", 486);

        }

        // el yield tiene q mostrar 
        // SI PASAMOS UNA CATEGORIA:
        //no tiene que decir todos los productos y el stock de estos en esa CATEGORIA concreta y su stock
        if (product == undefined) {
            for (const siguiente of this.categories()) {
                if (siguiente.value.title == category.title) {
                    yield siguiente.value.title;
                }
            }

        } else {

            // el yield tiene q mostrar 
            //SI PASAMOS UN PRODUCTO:
            // devolvera todos el stock de ese producto en esa tienda en concreto

            let cuentacategoria = 0;
            if (product instanceof Product) {
                for (const siguiente of this.categories()) {
                    if (siguiente.value.title == category.title) {
                        //  this.#stores[cuentatienda].warehouse.get(product.ID);
                        this.#categories[cuentacategoria].products;
                    }
                    cuentacategoria += 1;
                }

            }
        }

    }

    removeShop(shop) {
        if (!(shop instanceof Store)) {
            throw new InvalidValueException("shop", "StoreHouse", 402);
        }
        if (!(shop)) {
            throw new EmptyValueException("shop", "StoreHouse", 405);
        }
        let comprueba = (this.#stores.findIndex(function (elem) {
            return elem.CIF == shop.CIF
        }));
        if (comprueba == -1) {

            throw new InvalidValueException("shop", "StoreHouse", 412);

        }

        let guardar = 0;
        //   let total = 0;
        let cuentatienda = 0;// esta variable me dice la posicion de la tienda en el array



        this.#stores.forEach(element => {

            if (element.CIF == shop.CIF) {

                // creo q el valor no me hace falta, pero para cogerlo en la cajita de la key habria que añadir ,value
                //aqui lo que hagi es que conforme voy leyendo el mapa de la tienda a borrar,
                //voy añadiendo dichos productos a la tienda base comprobando si ademas estos ya existian para añadir la suma total;

                for (let [key] of this.#stores[cuentatienda].warehouse) {

                    // guardar = this.#stores[cuentatienda].warehouse.get(key.serialNumber);
                    guardar = this.#stores[cuentatienda].warehouse.get(key.name);
                    // recojo el valor del producto de la tienda base
                    //total = guardar + this.#stores[0].warehouse.get(key.serialNumber);

                    //  this.#stores[0].warehouse.set(key, guardar);
                    this.#baseShop.warehouse.set(key, guardar);
                }

            }
            else {
                cuentatienda = cuentatienda + 1;
            }
        });

        this.#stores.splice(cuentatienda, 1);
        return this.#stores.length;

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
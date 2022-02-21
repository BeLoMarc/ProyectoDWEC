'use strict'
import SingletonStoreHouse from "./StoreHouse.js";
import { Product } from "./classProduct.js";
import { Category } from "./classCategory.js";
import { Coords } from "./classCoords.js";
import { Phone } from "./classPhone.js";
import { Laptop } from "./classLaptop.js";
import { Headset } from "./classHeadset.js";
import { Store } from "./classStore.js";


function test() {

  //COORDENADAS
  let coordenada1 = new Coords("12344", "44444");
  let coordenada2 = new Coords("00344", "22224");
  //TIENDAS
  let TabernaHumeante = new Store("1111", "Taberna Humeante", "bhalkia", "576545678", coordenada1);
  let PonyPisador = new Store("2222", "Pony Pisador", "Tierra Media", "876548", coordenada2);
  // LAPTOPS
  // let ordenador= new Laptop(serialNumber, name, description, price, tax, images,model, CPU, charger, keyboard);
  let msi = new Laptop("111111", "msi", "ordenador", 1000, "21%", "sasas", "masi", "Muy buena", "17A", "keyboard fino");
  let asus = new Laptop("22222", "msi", "ordenador", 1000, "21%", "sasas", "asus", "Muy buena", "17A", "keyboard fino");
  let nisu = new Laptop("33333", "msi", "ordenador", 1000, "21%", "sasas", "nisu", "Muy buena", "17A", "keyboard fino");
  //CASCOS
  //serialNumber, name, description, price, tax, images,model, microphone = "none", frequency
  let cascos1 = new Headset("21111", "superCascos1", "azules", "100", "30%", "aaaaaaaa", "bbbbbbb", "si tiene micro", "80GHZ");
  let cascos2 = new Headset("22222", "superCascos2", "verdes", "100", "30%", "aaaaaaaa", "bbbbbbb", "si tiene micro", "80GHZ");
  let cascos3 = new Headset("23333", "superCascos3", "rojos", "100", "30%", "aaaaaaaa", "bbbbbbb", "si tiene micro", "80GHZ");
  //TELEFONOS
  //serialNumber, name, description, price, tax, images,battery, screen, OS
  let xiaomi = new Phone("31111", "xiaomi", "bbbbbbbbbbb", "12432", "42%", "blob", "13A", "pequeña", "ANDROid");
  let lg = new Phone("32222", "lg", "bbbbbbbbbbb", "12432", "42%", "blob", "13A", "pequeña", "ANDROid");
  let huawei = new Phone("33333", "huawei", "bbbbbbbbbbb", "12432", "42%", "blob", "13A", "pequeña", "ANDROid");
  // CATEGORIAS
  let p = new Category("pepino", "verde");
  let c = new Category("cebolla", "blanca");
  let l = new Category("lentejas", "legumbres");
  let pizza = new Category("pizza", "pepperonni");

  // a la hora de hacer el test me he econtrado con el problema de que los productos aparecen en la tienda
  // antes de añadirlos

  let almacen = SingletonStoreHouse.getInstance("Almacen");
  console.log(almacen.name);
  almacen.addCategory(p);
  almacen.addCategory(c);

  almacen.addShop(TabernaHumeante);
  almacen.addShop(PonyPisador);
  // nos enseña las categorias
  for (const categoria of almacen.categories) {
    console.log(categoria);
  }
  // nos enseña las tiendas
  for (const iterator of almacen.shops) {
    console.log(iterator);
  }

  console.log("añado el mismo producto a la categoria P y c");
  almacen.addProduct(msi, p);
  almacen.addProduct(msi, c);

  console.log("añado el mismo producto anterios a dos tiendas diferentes cuyas cantidaddes son 10 y 30")
  almacen.addProductInShop(msi, PonyPisador, 10);
  almacen.addProductInShop(msi, TabernaHumeante, 30);
  console.log("Voy a recorrer tanto las tiendas como las categorias")
  for (const iterator of almacen.categories) {
    console.log(iterator);
  }
  // nos enseña las tiendas
  for (const iterator of almacen.shops) {
    console.log(iterator);
  }

  // si se añade un producto sin añadir antes la categoria no se trabajara con el
  console.log("Voy a eliminar la categoria c y la tienda del pony pisador")
  console.log(almacen.removeCategory(p));
  console.log(almacen.removeShop(PonyPisador));

  console.log("Voy a añadir a la tienda de la taberna humeante 100 productos de los que ya existen")
  console.log(almacen.addQuantityProductInShop(msi, TabernaHumeante, 100));
  //expected output 130s
  for (const iterator of almacen.categories) {
    console.log(iterator);
  }
  // nos enseña las tiendas
  for (const iterator of almacen.shops) {
    console.log(iterator);
  }
  console.log("voy a eliminar el producto con el que hemos estado trabajando")
  console.log(almacen.removeProduct(msi));
  for (const iterator of almacen.categories) {
    console.log(iterator);
  }
  // nos enseña las tiendas
  for (const iterator of almacen.shops) {
    console.log(iterator);
  }
  almacen.name = "LA GRAN TIENDA";
  console.log(almacen.name);
  try {
    console.log("añado una cantidad negativa a una tienda");
    (almacen.addQuantityProductInShop(msi, TabernaHumeante, -100));
  } catch (error) {
    console.error(error.message);
  }
  try {
    console.log("borro un objeto que no existe");
    (almacen.removeProduct(asus));
  } catch (error) {
    console.error(error.message);
  }

  try {
    console.log("añado una categoria nula");
    (almacen.addCategory(null));
  } catch (error) {
    console.error(error.message);
  }
  try {
    console.log("cambio el nombre del almacen a uno vacio");
    (almacen.name = "");
  } catch (error) {
    console.error(error.message);
  }
  try {
    console.log("instancio un producto");
    let producto = new Product("21111", "superCascos", "azules", "100", "30%", "aaaaaaaa");
  } catch (error) {
    console.error(error.message)
  }
  try {
    console.log("instancio un producto");
    almacen.addQuantityProductInShop(asus, TabernaHumeante, 200);
  } catch (error) {
    console.error(error.message)
  }


  try {
    console.log("PRUEBA DEL GENERADOR")
    almacen.addProduct(cascos1, c);
    almacen.addProduct(cascos2, c);
    almacen.addProduct(cascos3, c);
    almacen.addProductInShop(cascos1, TabernaHumeante, 100);
    almacen.addProductInShop(cascos2, TabernaHumeante, 100);
    almacen.addProductInShop(cascos3, TabernaHumeante, 100);

    for (const siguiente of almacen.ShopProducts(TabernaHumeante, cascos1)) {
      console.log(siguiente.next);
    }
    
    for (const siguiente of almacen.ShopProducts(TabernaHumeante)) {
      console.log(siguiente.next);
    }

  } catch (error) {
    console.error(error.message)
  }
}
test();
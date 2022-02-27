import StoreHouseController from './StoreHouseController.js';
import StoreHouseModel from './StoreHouseModel.js';
import StoreHouseView from './StoreHouseView.js';
console.log("STOREHOUSE APP")

$(function(){
    const StoreHouseApp = new StoreHouseController(
      StoreHouseModel.getInstance("Almacen"), new StoreHouseView()
    );
  });
  

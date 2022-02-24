import StoreHouseController from './StoreHouseController.js';
import StoreHouseModel from './StoreHouseModel.js';
import StoreHouseView from './StoreHouseView.js';

$(function(){
    const StoreHouseApp = new StoreHouseController(
      StoreHouse.getInstance(), new StoreHouseView()
    );
  });

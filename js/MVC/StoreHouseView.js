'use strict'
class StoreHouseView {
    constructor() {
        console.log("StoreHouse VIEW");
        this.main = $('#main');
        this.categories = $('#categories');
        this.menu = $('.navbar-nav');// la clase de mi nav es "nav" 
    }
    // la data es lo que vamos a mostrar para q sea dinamico
    //este mapStores es el del controller
    ShowStores(mapStores) {
        this.main.empty();
        let cont = 0;
        for (const store of mapStores.store) {
            if (!(store.name == "tienda base")) {
                this.main.append(` 
                <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Mi cesta</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                  <p>Más adelante se implementaran aqui las compras.</p>
                    </div>
                </div>
            
            
                <div class="card" id="tienda${cont}" style="width: 18rem;">
                    <img src="${store.img[0]}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Conjunto de dados</h5>
                <!-- pone shop.name porq miro como esta el objeto de la tienda en el modelo -->
                    <p class="card-text">${store.name}</p>
                    <a href="#" class="btn btn-primary">Añadir al carrito</a>
                </div>
                </div>`);
            }
            cont += 1;
        };

    }
    //los bind enlazan la vista con el controlador mediante el manejador(handler)
    //Las condiciones las maneja el controlador q es quien tiene los handler
    bindLoadStores(handler) {
        $(document).ready(function () {
            handler();
        });
    }



    showProductTypes() {
        this.categories.empty();
        this.categories.append();
    }

}






export default StoreHouseView;

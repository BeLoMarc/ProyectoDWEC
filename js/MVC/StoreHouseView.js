'use strict'
class StoreHouseView {
    constructor() {
        console.log("StoreHouse VIEW");
        this.main = $('#main');

        // this.menu = $('.navbar-nav');// la clase de mi nav es "nav" 
        this.navCat = $('#Categories');
        this.navStor = $('#Stores');
    }
    // la data es lo que vamos a mostrar para q sea dinamico
    //este mapStores es el del controller
    ShowStores(mapStores) {
        this.main.empty();
        let cont = 0;
        for (const store of mapStores.store) {
            if (!(store.name == "tienda base")) {
                this.main.append(` 
                <div class="card"  style="width: 18rem;">
                    <img src="${store.img[0]}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${store.name}</h5>
                <!-- pone shop.name porq miro como esta el objeto de la tienda en el modelo -->
                    <p class="card-text">Direccion: ${store.address}</p>
                    <a href="#" id="tienda${cont}" class="btn btn-primary">Mostrar Productos</a>
                </div>
                </div>`);
            }
            cont += 1;
        };

    }
    ShowLoadSubMenuStores(mapStores) {
        this.navStor.empty();
        let cont = 0;
        for (const store of mapStores.store) {
            if (!(store.name == "tienda base")) {
                this.navStor.append(` 
                <a id="tienda${cont}" class="nav__options__link" href="#">${store.name}</a>`);
            }
            cont += 1;
        };
    }

    ShowLoadSubMenuCategories(mapCategories) {
        this.navCat.empty();
        let cont = 0;
        for (const category of mapCategories.category) {

            if (!(category.title == "categoria base")) {
                this.navCat.append(` 
                <a id="Categoria${cont}" class="nav__options__link" href="#">${category.title}</a>`);
            }
            cont += 1;
        };
    }

    ShowProductStore(mapStores) {
        this.main.empty();
        let precargar = mapStores.store;
        for (const store of precargar) {
            this.main.append(` 
                ${store}
                `);

            
        };
    }
    //los bind enlazan la vista con el controlador mediante el manejador(handler)
    //Las condiciones las maneja el controlador q es quien tiene los handler
    bindLoadStores(handler) {
        $(document).ready(function () {
            handler();
        });
    }

    bindLoadSubMenuStores(handler) {
        $("#ShowStores").hover(function () {
            handler();
        });
    }

    bindLoadSubMenuCategories(handler) {
        $("#ShowCategories").hover(function () {
            handler();
        });
    }
    //Anido aqui el documento.ready porque si trado de coger la id directamente
    //Al no existir previamente no la encuentra, 
    //Espera a q ya exista y añade el evento
    bindShowProductStore(handler) {
        $(document).ready(function () {
            $("#tienda1").click(function () {
                handler();
            });
        });


    }

    showProductTypes() {
        this.categories.empty();
        this.categories.append();
    }

}






export default StoreHouseView;

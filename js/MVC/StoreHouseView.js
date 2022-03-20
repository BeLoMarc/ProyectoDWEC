'use strict'
class StoreHouseView {
    #ventanas;
    #estadoAnterior;
    #estadoPosterior;
    constructor() {
        /**
         * podria hacer aqui una variable provada llamada ventanas
         * y cada vez q se crean ventanas ir añadiendolas
         * despues recorrer dicho array y por posicion hacer un .focus y rezar porque funcione
         */
        console.log("StoreHouse VIEW");
        this.main = $('#main');
        this.navCat = $('#Categories');
        this.navStor = $('#Stores');
        this.#ventanas = new Map();
        this.#estadoAnterior = [];
        this.#estadoPosterior = [];
    }

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
                    <a href="#" id="tienda${cont}" value="${store.CIF}" class="btn btn-primary botonTienda">Mostrar Productos</a>
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
                <a id="tienda${cont}" value="${store.CIF}" class="nav__options__link botonTienda" href="#">${store.name}</a>`);
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
                <a id="Categoria${cont}" value="${category.title}"class="nav__options__link botonCategoria" href="#">${category.title}</a>`);
            }
            cont += 1;
        };
    }

    ShowProductStore(mapStores) {
        this.main.empty();
        // generator(tienda)

        for (const tienda of mapStores.store) {
            if (!(tienda.name == "tienda base")) {
                let precargar = mapStores.generador;
                for (const producto of precargar) {

                    this.main.append(`
               <div class="card" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Cantidad: ${producto.cantidad}.</p>
                        <a href="#" value="${producto.nombre}" class="btn btn-primary botonProducto">DETALLES DEL PRODUCTO</a>
                        <a href="#" value="${producto.nombre}" class="btn btn-danger botonNuevaVentana">DETALLES NUEVA PAGINA</a>

                    </div>
                        </div> `);
                };

            }

        };
    }

    ShowProductCategory(mapCategories) {
        this.main.empty();
        // generator(tienda)

        for (const categoria of mapCategories.category) {
            if (!(categoria.title == "categoria base")) {

                for (const producto of mapCategories.generador) {
                    this.main.append(`
                    <div class="card" style="width: 18rem;">
                        <img src="${producto.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Cantidad: ${producto.cantidad}.</p>
                            <a href="#" value="${producto.nombre}" class="btn btn-primary botonProducto">DETALLES DEL PRODUCTO</a>
                            <a href="#" value="${producto.nombre}" class="btn btn-danger botonNuevaVentana">DETALLES NUEVA PAGINA</a>

                        </div>
                            </div>
                        `);
                };

            }

        };
    }
    ShowProduct(producto) {
        this.main.empty();
        if (producto.producto.tipo == "Dados") {
            //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor
            this.main.append(`
                <div class="card" style="width: 18rem;">
                    <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${producto.producto.nombre}</h5>
                    <p class="card-text">${producto.producto.descripcion}.</p>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">precio: ${producto.producto.precio}</li>
                        <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                        <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                        <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                        <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                        <li class="list-group-item">Color: ${producto.producto.color}</li>
                        <li class="list-group-item">modelo: ${producto.producto.modelo}</li>
                    </ul>
                </div>`);
        } else if (producto.producto.tipo == "Manual") {
            this.main.append(`
                <div class="card" style="width: 18rem;">
                    <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${producto.producto.nombre}</h5>
                    <p class="card-text">${producto.producto.descripcion}.</p>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">precio: ${producto.producto.precio}</li>
                        <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                        <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                        <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                        <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                        <li class="list-group-item">Portada: ${producto.producto.portada}</li>
                        <li class="list-group-item">autor: ${producto.producto.autor}</li>
                        <li class="list-group-item">destinatario: ${producto.producto.destino}</li>
                    </ul>
                </div>`);
        } else if (producto.producto.tipo == "Pantalla") {
            this.main.append(`
                <div class="card" style="width: 18rem;">
                    <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${producto.producto.nombre}</h5>
                    <p class="card-text">${producto.producto.descripcion}.</p>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">precio: ${producto.producto.precio}</li>
                        <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                        <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                        <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                        <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                        <li class="list-group-item">modelo: ${producto.producto.modelo}</li>
                        <li class="list-group-item">tamaño: ${producto.producto.tamaño}</li>
                        <li class="list-group-item">campaña: ${producto.producto.campaña}</li>
                    </ul>
                </div>`);
        } else if (producto.producto.tipo == "Laptop") {
            this.main.append(`
                <div class="card" style="width: 18rem;">
                    <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${producto.producto.nombre}</h5>
                    <p class="card-text">${producto.producto.descripcion}.</p>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">precio: ${producto.producto.precio}</li>
                        <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                        <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                        <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                        <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                        <li class="list-group-item">CPU: ${producto.producto.CPU}</li>
                        <li class="list-group-item">Cargador: ${producto.producto.cargador}</li>
                        <li class="list-group-item">Teclado: ${producto.producto.teclado}</li>
                    </ul>
                </div>`);
        } else if (producto.producto.tipo == "Headset") {
            this.main.append(`
        <div class="card" style="width: 18rem;">
            <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${producto.producto.nombre}</h5>
            <p class="card-text">${producto.producto.descripcion}.</p>
        </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">precio: ${producto.producto.precio}</li>
                <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                <li class="list-group-item">Modelo: ${producto.producto.modelo}</li>
                <li class="list-group-item">Microfono: ${producto.producto.microfono}</li>
                <li class="list-group-item">Frecuencia: ${producto.producto.frecuencia}</li>
            </ul>
        </div>`);
        } else if (producto.producto.tipo == "Phone") {
            this.main.append(`
        <div class="card" style="width: 18rem;">
            <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${producto.producto.nombre}</h5>
            <p class="card-text">${producto.producto.descripcion}.</p>
        </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">precio: ${producto.producto.precio}</li>
                <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                <li class="list-group-item">Bateria: ${producto.producto.bateria}</li>
                <li class="list-group-item">Pantalla: ${producto.producto.pantalla}</li>
                <li class="list-group-item">Sistema Operativo: ${producto.producto.OS}</li>
            </ul>
        </div>`);
        }
    }

    ShowProductInWindow(producto) {
        //La llamada open devuelve una referencia a la nueva ventana//el nombre de la ventana para abrir más debe ser diferente ``
        // let miVentana = window.open(//Recurso que quieri abrir //Nombre de la ventana// Opciones de como queremos que se visualice la ventana
        //     "../../html/lienzo.html", "Mywindow", "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
        /**
         * tener en cuenta: inmediatamente después de window.open la nueva ventana no 
         * está cargada aún. 
         * Así que esperamos a que onload lo modifique. 
         * 
         * insertAdjacentHTML:analiza la cadena de texto introducida como cadena HTML o XML e inserta al árbol DOM los nodos resultantes de dicho análisis en la posición especificada. Este método no re-analiza el elemento sobre el cual se está invocando y por lo tanto no corrompe los elementos ya existentes dentro de dicho elemento. Esto evita el paso adicional de la serialización, haciéndolo mucho más rápido que la manipulación directa con innerHTML.
         * 'afterbegin': Justo dentro del elemento, antes de su primer elemento hijo.
        */
        let objeto;
        //if (miVentana && !(miVentana.closed)) {
        //      miVentana.focus();
        if (producto.producto.tipo == "Dados") {
            if (this.#ventanas.has(producto.producto.nombre)) {
                this.#ventanas.get(producto.producto.nombre).focus();
            } else {


                let miVentana = window.open(//Recurso que quieri abrir //Nombre de la ventana// Opciones de como queremos que se visualice la ventana
                    "../../html/lienzo.html", `${producto.producto.nombre}`, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
                miVentana.focus();
                // tan pronto como se carga la pagina
                miVentana.onload = function () {
                    objeto = `
                    <div class="card" style="width: 18rem;">
                        <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${producto.producto.nombre}</h5>
                        <p class="card-text">${producto.producto.descripcion}.</p>
                    </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">precio: ${producto.producto.precio}</li>
                            <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                            <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                            <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                            <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                            <li class="list-group-item">Color: ${producto.producto.color}</li>
                            <li class="list-group-item">modelo: ${producto.producto.modelo}</li>
                        </ul>
                    </div>`;
                    miVentana.document.body.insertAdjacentHTML("afterbegin", objeto);
                }

                this.#ventanas.set(miVentana.name, miVentana);
            }
        } else if (producto.producto.tipo == "Manual") {
            if (this.#ventanas.has(producto.producto.nombre)) {
                this.#ventanas.get(producto.producto.nombre).focus();
            } else {
                let miVentana = window.open(//Recurso que quieri abrir //Nombre de la ventana// Opciones de como queremos que se visualice la ventana
                    "../../html/lienzo.html", `${producto.producto.nombre}`, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
                miVentana.focus();

                miVentana.onload = function () {
                    objeto = `
                        <div class="card" style="width: 18rem;">
                            <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${producto.producto.nombre}</h5>
                            <p class="card-text">${producto.producto.descripcion}.</p>
                        </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">precio: ${producto.producto.precio}</li>
                                <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                                <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                                <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                                <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                                <li class="list-group-item">Portada: ${producto.producto.portada}</li>
                                <li class="list-group-item">autor: ${producto.producto.autor}</li>
                                <li class="list-group-item">destinatario: ${producto.producto.destino}</li>
                            </ul>
                        </div>`;
                    miVentana.document.body.insertAdjacentHTML("afterbegin", objeto);

                }
                this.#ventanas.set(miVentana.name, miVentana);
            }
        } else if (producto.producto.tipo == "Pantalla") {
            if (this.#ventanas.has(producto.producto.nombre)) {
                this.#ventanas.get(producto.producto.nombre).focus();
            } else {
                let miVentana = window.open(//Recurso que quieri abrir //Nombre de la ventana// Opciones de como queremos que se visualice la ventana
                    "../../html/lienzo.html", `${producto.producto.nombre}`, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
                miVentana.focus();

                miVentana.onload = function () {
                    objeto = `
                        <div class="card" style="width: 18rem;">
                            <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${producto.producto.nombre}</h5>
                            <p class="card-text">${producto.producto.descripcion}.</p>
                        </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">precio: ${producto.producto.precio}</li>
                                <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                                <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                                <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                                <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                                <li class="list-group-item">modelo: ${producto.producto.modelo}</li>
                                <li class="list-group-item">tamaño: ${producto.producto.tamaño}</li>
                                <li class="list-group-item">campaña: ${producto.producto.campaña}</li>
                            </ul>
                        </div>`;
                    miVentana.document.body.insertAdjacentHTML("afterbegin", objeto);

                }
                this.#ventanas.set(miVentana.name, miVentana);
            }
        } else if (producto.producto.tipo == "Laptop") {
            if (this.#ventanas.has(producto.producto.nombre)) {
                this.#ventanas.get(producto.producto.nombre).focus();
            } else {
                let miVentana = window.open(//Recurso que quieri abrir //Nombre de la ventana// Opciones de como queremos que se visualice la ventana
                    "../../html/lienzo.html", `${producto.producto.nombre}`, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
                miVentana.focus();

                miVentana.onload = function () {
                    objeto = `
                            <div class="card" style="width: 18rem;">
                                <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">${producto.producto.nombre}</h5>
                                <p class="card-text">${producto.producto.descripcion}.</p>
                            </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">precio: ${producto.producto.precio}</li>
                                    <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                                    <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                                    <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                                    <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                                    <li class="list-group-item">CPU: ${producto.producto.CPU}</li>
                                    <li class="list-group-item">Cargador: ${producto.producto.cargador}</li>
                                    <li class="list-group-item">Teclado: ${producto.producto.teclado}</li>
                                </ul>
                            </div>`;
                    miVentana.document.body.insertAdjacentHTML("afterbegin", objeto);

                }
                this.#ventanas.set(miVentana.name, miVentana);
            }
        } else if (producto.producto.tipo == "Headset") {
            if (this.#ventanas.has(producto.producto.nombre)) {
                this.#ventanas.get(producto.producto.nombre).focus();
            } else {
                let miVentana = window.open(//Recurso que quieri abrir //Nombre de la ventana// Opciones de como queremos que se visualice la ventana
                    "../../html/lienzo.html", `${producto.producto.nombre}`, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
                miVentana.focus();

                miVentana.onload = function () {
                    objeto = `
                    <div class="card" style="width: 18rem;">
                        <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${producto.producto.nombre}</h5>
                        <p class="card-text">${producto.producto.descripcion}.</p>
                    </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">precio: ${producto.producto.precio}</li>
                            <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                            <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                            <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                            <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                            <li class="list-group-item">Modelo: ${producto.producto.modelo}</li>
                            <li class="list-group-item">Microfono: ${producto.producto.microfono}</li>
                            <li class="list-group-item">Frecuencia: ${producto.producto.frecuencia}</li>
                        </ul>
                    </div>`;
                    miVentana.document.body.insertAdjacentHTML("afterbegin", objeto);

                }
                this.#ventanas.set(miVentana.name, miVentana);
            }
        } else if (producto.producto.tipo == "Phone") {
            if (this.#ventanas.has(producto.producto.nombre)) {
                this.#ventanas.get(producto.producto.nombre).focus();
            } else {
                let miVentana = window.open(//Recurso que quieri abrir //Nombre de la ventana// Opciones de como queremos que se visualice la ventana
                    "../../html/lienzo.html", `${producto.producto.nombre}`, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
                miVentana.focus();

                miVentana.onload = function () {

                    objeto = `
                    <div class="card" style="width: 18rem;">
                        <img src="${producto.producto.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${producto.producto.nombre}</h5>
                        <p class="card-text">${producto.producto.descripcion}.</p>
                    </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">precio: ${producto.producto.precio}</li>
                            <li class="list-group-item">CIF de Tienda que la puedes encontrar: ${producto.producto.CIF}</li>
                            <li class="list-group-item">Nombre de la Tienda: ${producto.producto.nombreTienda}</li>
                            <li class="list-group-item">Cantidad: ${producto.producto.cantidad}</li>
                            <li class="list-group-item">CARACTERISTICAS CONCRETAS</li>
                            <li class="list-group-item">Bateria: ${producto.producto.bateria}</li>
                            <li class="list-group-item">Pantalla: ${producto.producto.pantalla}</li>
                            <li class="list-group-item">Sistema Operativo: ${producto.producto.OS}</li>
                        </ul>
                    </div>`;
                    miVentana.document.body.insertAdjacentHTML("afterbegin", objeto);

                }
                this.#ventanas.set(miVentana.name, miVentana);
            }


        }
        //        }


    }


    CleanMaps() {
        for (const [key, value] of this.#ventanas) {
            value.close();
        }
        this.#ventanas.clear();
    }


    LoadSelect(mapCategories, mapStores, mapProducts) {
        $('#SelectEliminarCategorias').empty();
        $('#SelectEliminarTienda').empty();
        $('#SelectEliminarProducto').empty();
        let cont = 0;
        for (const category of mapCategories.category) {

            if (!(category.title == "categoria base")) {
                $('#SelectEliminarCategorias').append(` 
            <option id="Categoria${cont}" value="${category.title}" href="#">${category.title}</option>`);
            }
            cont += 1;
        };
        cont = 0;
        for (const store of mapStores.store) {
            if (!(store.name == "tienda base")) {
                $('#SelectEliminarTienda').append(` 
                <option id="tienda${cont}" value="${store.CIF}" href="#">${store.name}</option>`);

            }

            cont += 1;
        };
        cont = 0;
        let gua = mapProducts.producto;
        // for (const p of gua) {
        //     if (!(p.producto.nombre == "tienda base")) {
        //         $('#SelectEliminarProducto').append(` 
        //         <option id="tienda${p.producto.nombre}" value="${p.producto.nombre}" href="#">${p.producto.nombre}</option>`);

        //     }


        // };

    }


    //el 0 es ir atras y el 1 es ir adelante
    History(Direccion) {
        if (Direccion == 0) {
            window.history.go(-1);


        } else {
            window.history.go();
        }

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
        $("#ShowStores").on("click", ".botonTienda", function () {
            //recogemos el valor del boton
            let tiendaCIF = $(this).attr("value");
            handler(tiendaCIF);
        });
        // $(document).ready(function () {

        this.main.on("click", ".botonTienda", function () {
            //recogemos el valor del boton
            let tiendaCIF = $(this).attr("value");
            handler(tiendaCIF);
        })
        // 

    }


    bindShowProductCategory(handler) {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        //aqui es donde quiero pintar //el evento q lo triguea y como quiero q lo haga
        $("#ShowCategories").on("click", ".botonCategoria", function () {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            //recogemos el valor del boton
            let tituloCategoria = $(this).attr("value");
            handler(tituloCategoria);
        });

    }

    bindRecargar(handler) {

        //     $(document).ready(function () {

        $(".botonReiniciar").click(function () {
            //recogemos el valor del boton

            handler();
        });
        //   });
    }

    bindShowProduct(handler) {
        this.main.empty();
        $("#main").on("click", ".botonProducto", function () {
            //recogemos el valor del boton
            let nombreProducto = $(this).attr("value");
            handler(nombreProducto);
        });
    }

    bindShowProductInWindow(handler) {

        $("#main").on("click", ".botonNuevaVentana", function () {
            //recogemos el valor del boton
            let nombreProducto = $(this).attr("value");
            handler(nombreProducto);
        });
    }


    bindCleanMaps(handler) {
        //aqui es donde quiero pintar //el evento q lo triguea y como quiero q lo haga
        $("#Limpiar").click(function () {
            //recogemos el valor del boton
            handler();
        });

    }

    bindMostrarAñadirCat() {
        $('#MostrarAñadirCat').click(function () {
            if ($('#ContainerAñadirCat').css("display") == "none") {
                $('#ContainerAñadirCat').css("display", "block");
            } else {
                $('#ContainerAñadirCat').css("display", "none");
            }


        });

    }

    bindValidarAñadirCat(handler) {
        //Pongo aqui que niegue el submit del form
        //Para que no me recarge la pagina/intente masndar datos fuera de esta
        $('#AñadirCat').submit(function (event) {
            event.preventDefault();
            let inputTitulo = $('#TituloCat');
            let inputDescripcion = $('#DescripcionCat');
            if (correctoAñadirCategoria()) {

                handler(
                    inputTitulo.val(),
                    inputDescripcion.val()
                );

                $('#ContainerAñadirCat').css("display", "none");

            }

        });

        $('#AñadirCat').change(function (event) {
            event.preventDefault();

            validadAñadirCategoria();



        })
    }




    bindMostrarAñadirTienda() {
        $('#MostrarAñadirTienda').click(function () {
            if ($('#ContainerAñadirTienda').css("display") == "none") {
                $('#ContainerAñadirTienda').css("display", "block");
            } else {
                $('#ContainerAñadirTienda').css("display", "none");
            }
        });
    }




    bindValidarAñadirTienda(handler) {
        //Pongo aqui que niegue el submit del form
        //Para que no me recarge la pagina/intente masndar datos fuera de esta
        $('#AñadirTienda').submit(function (event) {
            event.preventDefault();
            let inputnombreTienda = $('#nombreTienda');//
            let inputCIFTienda = $('#CIFTienda');//
            let inputDireccionTienda = $('#DireccionTienda');//
            let inputtelefonoTienda = $('#telefonoTienda');//
            let inputLatitudTienda = $('#LatitudTienda');//
            let inputLongitudTienda = $('#LongitudTienda');//
            let inputFotoTienda = $('#FotoTienda');

            if (correctoAñadirTienda()) {

                handler(
                    inputnombreTienda.val(),
                    inputCIFTienda.val(),
                    inputDireccionTienda.val(),
                    inputtelefonoTienda.val(),
                    inputLatitudTienda.val(),
                    inputLongitudTienda.val(),
                    inputFotoTienda.val(),
                );

                $('#ContainerAñadirTienda').css("display", "none");

            }

        });

        $('#AñadirTienda').change(function (event) {
            // event.preventDefault();

            validadAñadirTienda();



        })
    }



    //MostrarEliminarCat boton del sibmenu
    bindMostrarSelectBorrarCategorias() {
        $('#MostrarEliminarCat').click(function () {
            if ($('#ContainerEliminarCat').css("display") == "none") {
                $('#ContainerEliminarCat').css("display", "block");
            } else {
                $('#ContainerEliminarCat').css("display", "none");
            }

        });

    }

    bindMostrarSelectBorrarTiendas() {
        $('#MostrarEliminarTienda').click(function () {
            if ($('#ContainerEliminarTienda').css("display") == "none") {
                $('#ContainerEliminarTienda').css("display", "block");
            } else {
                $('#ContainerEliminarTienda').css("display", "none");
            }

        });

    }

    bindLoadSelects(handler) {
        $("#ShowSelects").hover(function () {
            handler();
        });
    }


    bindEliminarCategoria(handler) {
        $('#FormBorrarCategoria').submit(function (event) {
            event.preventDefault();
            let nombreCat = $('#SelectEliminarCategorias').val();

            handler(nombreCat);

            $('#ContainerEliminarCat').css("display", "none");

        });
    }


    bindEliminarTienda(handler) {
        $('#FormBorrarTienda').submit(function (event) {
            event.preventDefault();
            let nombretienda = $('#SelectEliminarTienda').val();

            handler(nombretienda);

            $('#ContainerEliminarTienda').css("display", "none");

        });
    }







    bindMostrarAñadirDados() {
        $('#MostrarAñadirDados').click(function () {
            if ($('#ContainerAñadirDados').css("display") == "none") {
                $('#ContainerAñadirDados').css("display", "block");
            } else {
                $('#ContainerAñadirDados').css("display", "none");
            }

        });

    }


    bindValidarAñadirDados(handler) {
        //Pongo aqui que niegue el submit del form
        //Para que no me recarge la pagina/intente masndar datos fuera de esta
        $('#AñadirDados').submit(function (event) {
            event.preventDefault();
            let inputinputNumeroSerieDado = $('#NumeroSerieDado');//
            let inputnombreDado = $('#nombreDado');//
            let inputDescripcionDado = $('#DescripcionDado');//
            let inputprecioDado = $('#precioDado');//
            let inputImpuestoDado = $('#ImpuestoDado');//
            let inputModeloDado = $('#ModeloDado');//
            let inputcolorDado = $('#colorDado');//
            let inputCategoriaDado = $('#CategoriaDado');//
            let inputFotoDado = $('#FotoDado');//

            if (correctoAñadirDados()) {

                handler(
                    inputinputNumeroSerieDado.val(),
                    inputnombreDado.val(),
                    inputDescripcionDado.val(),
                    inputprecioDado.val(),
                    inputImpuestoDado.val(),
                    inputModeloDado.val(),
                    inputcolorDado.val(),
                    inputCategoriaDado.val(),
                    inputFotoDado.val(),
                );

                $('#ContainerAñadirDados').css("display", "none");

            }

        });

        $('#AñadirDados').change(function (event) {
            // event.preventDefault();

            validarAñadirDados();

        })
    }




    bindMostrarMostrarAñadirManual() {
        $('#MostrarAñadirManual').click(function () {
            if ($('#ContainerAñadirManual').css("display") == "none") {
                $('#ContainerAñadirManual').css("display", "block");
            } else {
                $('#ContainerAñadirManual').css("display", "none");
            }

        });

    }

    bindValidarAñadirManual(handler) {
        //Pongo aqui que niegue el submit del form
        //Para que no me recarge la pagina/intente masndar datos fuera de esta
        $('#AñadirManual').submit(function (event) {
            event.preventDefault();
            let inputNumeroSerieManual = $('#NumeroSerieManual');//
            let inputnombreManual = $('#nombreManual');//
            let inputDescripcionManual = $('#DescripcionManual');//
            let inputprecioManual = $('#precioManual');//
            let inputImpuestoManual = $('#ImpuestoManual');//
            let inputCoverManual = $('#CoverManual');//
            let inputAuthorManual = $('#AuthorManual');//
            let inputTargetManual = $('#TargetManual');//
            let inputCategoriaManual = $('#CategoriaManual');//
            let inputFotoManual = $('#FotoManual');//
            if (correctoAñadirManual()) {

                handler(
                    inputNumeroSerieManual.val(),
                    inputnombreManual.val(),
                    inputDescripcionManual.val(),
                    inputprecioManual.val(),
                    inputImpuestoManual.val(),
                    inputCoverManual.val(),
                    inputAuthorManual.val(),
                    inputTargetManual.val(),
                    inputCategoriaManual.val(),
                    inputFotoManual.val(),
                );

                $('#ContainerAñadirManual').css("display", "none");

            }

        });

        $('#AñadirManual').change(function (event) {
            // event.preventDefault();

            validarAñadirManual();

        })
    }





    bindMostrarAñadirPantalla() {
        $('#MostrarAñadirPantalla').click(function () {
            if ($('#ContainerAñadirPantalla').css("display") == "none") {
                $('#ContainerAñadirPantalla').css("display", "block");
            } else {
                $('#ContainerAñadirPantalla').css("display", "none");
            }

        });

    }





    bindValidarAñadirPantalla(handler) {
        //Pongo aqui que niegue el submit del form
        //Para que no me recarge la pagina/intente masndar datos fuera de esta
        $('#AñadirPantalla').submit(function (event) {
            event.preventDefault();
            let inputNumeroSeriePantalla = $('#NumeroSeriePantalla');//
            let inputnombrePantalla = $('#nombrePantalla');//
            let inputDescripcionPantalla = $('#DescripcionPantalla');//
            let inputprecioPantalla = $('#precioPantalla');//
            let inputImpuestoPantalla = $('#ImpuestoPantalla');//
            let inputModelPantalla = $('#ModelPantalla');//
            let inputSizePantalla = $('#SizePantalla');//
            let inputCampañaPantalla = $('#CampañaPantalla');//
            let inputCategoriaPantalla = $('#CategoriaPantalla');//
            let inputFotoPantalla = $('#FotoPantalla');//
            if (correctoAñadirPantalla()) {

                handler(
                    inputNumeroSeriePantalla.val(),
                    inputnombrePantalla.val(),
                    inputDescripcionPantalla.val(),
                    inputprecioPantalla.val(),
                    inputImpuestoPantalla.val(),
                    inputModelPantalla.val(),
                    inputSizePantalla.val(),
                    inputCampañaPantalla.val(),
                    inputCategoriaPantalla.val(),
                    inputFotoPantalla.val(),
                );

                $('#ContainerAñadirPantalla').css("display", "none");

            }

        });

        $('#AñadirPantalla').change(function (event) {
            // event.preventDefault();

            validarAñadirPantalla();

        })
    }





    bindMostrarAñadirLaptop() {
        $('#MostrarAñadirLaptop').click(function () {
            if ($('#ContainerAñadirOrdenador').css("display") == "none") {
                $('#ContainerAñadirOrdenador').css("display", "block");
            } else {
                $('#ContainerAñadirOrdenador').css("display", "none");
            }

        });

    }




    bindValidarAñadirOrdenador(handler) {
        //Pongo aqui que niegue el submit del form
        //Para que no me recarge la pagina/intente masndar datos fuera de esta
        $('#AñadirOrdenador').submit(function (event) {
            event.preventDefault();
            let inputNumeroSerieOrdenador = $('#NumeroSerieOrdenador');//
            let inputnombreOrdenador = $('#nombreOrdenador');//
            let inputDescripcionOrdenador = $('#DescripcionOrdenador');//
            let inputprecioOrdenador = $('#precioOrdenador');//
            let inputImpuestoOrdenador = $('#ImpuestoOrdenador');//
            let inputModelOrdenador = $('#ModelOrdenador');//
            let inputCPUOrdenador = $('#CPUOrdenador');//
            let inputCargadorOrdenador = $('#CargadorOrdenador');//
            let inputKeyboardOrdenador = $('#KeyboardOrdenador');//
            let inputCategoriaOrdenador = $('#CategoriaOrdenador');//
            let inputFotoOrdenador = $('#FotoOrdenador');//

            if (correctoAñadirOrdenador()) {

                handler(
                    inputNumeroSerieOrdenador.val(),
                    inputnombreOrdenador.val(),
                    inputDescripcionOrdenador.val(),
                    inputprecioOrdenador.val(),
                    inputImpuestoOrdenador.val(),
                    inputModelOrdenador.val(),
                    inputCPUOrdenador.val(),
                    inputCargadorOrdenador.val(),
                    inputKeyboardOrdenador.val(),
                    inputCategoriaOrdenador.val(),
                    inputFotoOrdenador.val(),
                );

                $('#ContainerAñadirOrdenador').css("display", "none");

            }

        });

        $('#AñadirOrdenador').change(function (event) {
            // event.preventDefault();

            validarAñadirOrdenador();

        })
    }










    bindHistory(handler) {
        //aqui es donde quiero pintar //el evento q lo triguea y como quiero q lo haga
        $(".History").click(function () {
            //recogemos el valor del boton
            let Direccion = $(this).attr("value");
            handler(Direccion);
        });

    }



}
let TituloCorrecto;
let DescripcionCorrecta;
function validadAñadirCategoria() {
    //ASi recojo los valores de los inputs
    let inputTitulo = $('#TituloCat');
    let inputDescripcion = $('#DescripcionCat');
    if (!inputTitulo.val()) {

        inputTitulo.addClass("is-invalid");

        inputTitulo.removeClass("is-valid");
        $('#maltituloCategoria').append(`No puede estar Vacio el titulo`);

    } else {

        inputTitulo.addClass("is-valid");

        inputTitulo.removeClass("is-invalid");
        $('#buentituloCategoria').append(`El titulo cumple los requisitos`);

        TituloCorrecto = true;
    }

    if (!inputDescripcion.val()) {

        inputDescripcion.addClass("is-invalid");

        inputDescripcion.removeClass("is-valid");

        $('#malDescripcionCategoria').append(`No puede estar Vacio la descripcion`);



    } else {

        inputDescripcion.addClass("is-valid");

        inputDescripcion.removeClass("is-invalid");

        $('#buenDescripcionCategoria').append(`La categoria cumple los requisitos`);

        // inputDescripcion.closest(".valid-feedback").html("La categoria cumple los requisitos")
        DescripcionCorrecta = true;
    }


}

function correctoAñadirCategoria() {
    if (TituloCorrecto && DescripcionCorrecta) {
        return true;
    } else {
        return false;
    }
}



let nombreTiendaCorrecto;//
let CIFTiendaCorrecto;//
let DireccionTiendaCorrecto;//
let telefonoTiendaCorrecto;//
let LatitudTiendaCorrecto;//
let LongitudTiendaCorrecto;//
let FotoTiendaCorrecto;
let regexCIF = /[0-9]{6}/g;
let regexCoordenadas = /[0-9]{4}/g;
let regextelefono = /[0-9]{3}-[0-9]{3}-[0-9]{3}/g;
let regexFoto = /.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

// inputnameTienda
//     inputCIFTienda
//     inputaddressTienda
//     inputphoneTienda
//     inputlatitudTienda
//     inputlongitudTienda
//     inputimgTienda
function validadAñadirTienda() {
    //ASi recojo los valores de los inputs
    let inputnombreTienda = $('#nombreTienda');//
    let inputCIFTienda = $('#CIFTienda');//
    let inputDireccionTienda = $('#DireccionTienda');//
    let inputtelefonoTienda = $('#telefonoTienda');//
    let inputLatitudTienda = $('#LatitudTienda');//
    let inputLongitudTienda = $('#LongitudTienda');//
    let inputFotoTienda = $('#FotoTienda');

    /**
     * INICIO VALIDACION NOMBRE TIENDA
     */
    if (!inputnombreTienda.val()) {

        inputnombreTienda.addClass("is-invalid");

        inputnombreTienda.removeClass("is-valid");

        $('#malNombreTienda').append(`No puede estar Vacio el Nombre de la tienda`);

        // inputnombreTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else {

        inputnombreTienda.addClass("is-valid");

        inputnombreTienda.removeClass("is-invalid");
        $('#buenNombreTienda').append(`El nombre de la tienda esta correcto`);

        // inputnombreTienda.closest(".valid-feedback").html("El nombre de la tienda esta correcto")
        nombreTiendaCorrecto = true;
    }

    /**
     * INICIO VALIDACION CIF TIENDA
     */
    if (!inputCIFTienda.val()) {

        inputCIFTienda.addClass("is-invalid");

        inputCIFTienda.removeClass("is-valid");
        $('#malCifTienda').append(`No puede estar Vacio el cif de la tienda`);

        //inputCIFTienda.closest(".invalid-feedback").html("No puede estar Vacio la descripcion")

    } else if (!(/[0-9]{6}/g.test(inputCIFTienda.val())) || (Number.parseInt(inputCIFTienda.val().length) > 6)) {
        inputCIFTienda.addClass("is-invalid");

        inputCIFTienda.removeClass("is-valid");

        $('#malCifTienda').append(`El Cif de la tienda SOLO puede tener 6 DEL 0 AL 9 digitos`);
        //inputCIFTienda.closest(".invalid-feedback").html("El Cif de la tienda SOLO puede tener 6 DEL 0 AL 9 digitos")
    }

    else {

        inputCIFTienda.addClass("is-valid");

        inputCIFTienda.removeClass("is-invalid");
        $('#buenCifTienda').append(`La categoria cumple los requisitos`);
        //inputCIFTienda.closest(".valid-feedback").html("La categoria cumple los requisitos")
        CIFTiendaCorrecto = true;
    }

    /**
     * INICIO VALIDACION DIRECCION TIENDA
     */
    if (!inputDireccionTienda.val()) {

        inputDireccionTienda.addClass("is-invalid");

        inputDireccionTienda.removeClass("is-valid");
        $('#malDireccionTienda').append(`No puede estar Vacio la direccion de la tienda`);

        //inputDireccionTienda.closest(".invalid-feedback").html("No puede estar Vacio la direccion de la tienda")

    }
    else {

        inputDireccionTienda.addClass("is-valid");

        inputDireccionTienda.removeClass("is-invalid");

        $('#buenDireccionTienda').append(`la direccion de la tienda esta correcto`);

        //        inputDireccionTienda.closest(".valid-feedback").html("la direccion de la tienda esta correcto")
        DireccionTiendaCorrecto = true;
    }



    /**
     * INICIO VALIDACION TELEFONO TIENDA
     */
    if (!inputtelefonoTienda.val()) {



        inputtelefonoTienda.addClass("is-invalid");

        inputtelefonoTienda.removeClass("is-valid");

        $('#malTelefonoTienda').append(`el telefono no puede estar vacio`);
        //inputtelefonoTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else if (!(/[0-9]{3}-[0-9]{3}-[0-9]{3}/g.test(inputtelefonoTienda.val())) || (Number.parseInt(inputtelefonoTienda.val().length) > 11)) {
        inputtelefonoTienda.addClass("is-invalid");

        inputtelefonoTienda.removeClass("is-valid");

        $('#malTelefonoTienda').append(`el telefono debe tener 9 numeros siguiendo el patron XXX-XXX-XXX`);

        //inputtelefonoTienda.closest(".invalid-feedback").html("el telefono debe tener 9 numeros siguiendo el patron XXX-XXX-XXX")
    }
    else {

        inputtelefonoTienda.addClass("is-valid");

        inputtelefonoTienda.removeClass("is-invalid");

        $('#buenTelefonoTienda').append(`El telefono de la tienda esta correcto`);

        //inputtelefonoTienda.closest(".valid-feedback").html("El telefono de la tienda esta correcto")

        telefonoTiendaCorrecto = true;
    }
    /**
     * INICIO VALIDACION LATITUD
     */
    if (!inputLatitudTienda.val()) {

        inputLatitudTienda.addClass("is-invalid");

        inputLatitudTienda.removeClass("is-valid");

        $('#malLatitudTienda').append(`latutud no puede estar vacia`);


        //inputLatitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else if (!(/[0-9]{4}/g.test(inputLatitudTienda.val())) || (Number.parseInt(inputLatitudTienda.val().length) > 4)) {
        inputLatitudTienda.addClass("is-invalid");

        inputLatitudTienda.removeClass("is-valid");

        $('#malLatitudTienda').append(`LA LATITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9`);

        //inputLatitudTienda.closest(".invalid-feedback").html("LA LATITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9")
    } else {

        inputLatitudTienda.addClass("is-valid");

        inputLatitudTienda.removeClass("is-invalid");

        $('#buenLatitudTienda').append(`LA LATITUD de la tienda esta correcto`);

        //inputLatitudTienda.closest(".valid-feedback").html("LA LATITUD de la tienda esta correcto")
        LatitudTiendaCorrecto = true;
    }


    /**
     * INICIO VALIDACION LONGITUD
     */
    if (!inputLongitudTienda.val()) {

        inputLongitudTienda.addClass("is-invalid");

        inputLongitudTienda.removeClass("is-valid");

        $('#malLongitudTienda').append(`No puede estar Vacio el LONGITUD de la tienda`);


        //inputLongitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else if (!(/[0-9]{4}/g.test(inputLongitudTienda.val())) || (Number.parseInt(inputLongitudTienda.val().length) > 4)) {
        inputLongitudTienda.addClass("is-invalid");

        inputLongitudTienda.removeClass("is-valid");


        $('#malLongitudTienda').append(`LA LONGITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9`);


        //inputLongitudTienda.closest(".invalid-feedback").html("LA LONGITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9")
    } else {

        inputLongitudTienda.addClass("is-valid");

        inputLongitudTienda.removeClass("is-invalid");

        $('#buenLongitudTienda').append(`LA LONGITUD de la tienda esta correcto`);

        //inputLongitudTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        LongitudTiendaCorrecto = true;
    }


    /**
     * INICIO VALIDACION FOTO
     */
    if (!inputFotoTienda.val()) {

        inputFotoTienda.addClass("is-invalid");

        inputFotoTienda.removeClass("is-valid");

        $('#malFotoTienda').append(`No puede la foto vacia`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else if (!(/.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(inputFotoTienda.val()))) {
        inputFotoTienda.addClass("is-invalid");

        inputFotoTienda.removeClass("is-valid");

        $('#malFotoTienda').append(`El archivo no cumple con es ni .gif ni jpg, jpeg,tiff? png webp bmp`);

        //inputFotoTienda.closest(".invalid-feedback").html("LA LONGITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9")
    } else {

        inputFotoTienda.addClass("is-valid");

        inputFotoTienda.removeClass("is-invalid");
        $('#buenFotoTienda').append(`La foto ta bien`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        FotoTiendaCorrecto = true;
    }


}

function correctoAñadirTienda() {
    if (nombreTiendaCorrecto &&
        CIFTiendaCorrecto &&
        DireccionTiendaCorrecto &&
        telefonoTiendaCorrecto &&
        LatitudTiendaCorrecto &&
        LongitudTiendaCorrecto &&
        FotoTiendaCorrecto) {
        return true;
    } else {
        return false;
    }
}


let NumeroSerieDadoCorrecto;
let nombreDadoCorrecto;
let DescripcionDadoCorrecto;
let precioDadoCorrecto;
let ImpuestoDadoCorrecto;
let ModeloDadoCorrecto;
let colorDadoCorrecto;
let CategoriaDadoCorrecto;
let FotoDadoCorrecto;
function validarAñadirDados() {

    //ASi recojo los valores de los inputs
    let inputinputNumeroSerieDado = $('#NumeroSerieDado');//
    let inputnombreDado = $('#nombreDado');//
    let inputDescripcionDado = $('#DescripcionDado');//
    let inputprecioDado = $('#precioDado');//
    let inputImpuestoDado = $('#ImpuestoDado');//
    let inputModeloDado = $('#ModeloDado');//
    let inputcolorDado = $('#colorDado');//
    let inputCategoriaDado = $('#CategoriaDado');//
    let inputFotoDado = $('#FotoDado');//

    /**
     * INICIO VALIDACION NUMERO DE SERIE
     */
    if (!inputinputNumeroSerieDado.val()) {

        inputinputNumeroSerieDado.addClass("is-invalid");

        inputinputNumeroSerieDado.removeClass("is-valid");

        $('#malNumeroSerieDado').append(`No puede estar Vacio el Numero de serie `);

        // inputnombreTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else if (!(/[0-9]{5}/g.test(inputinputNumeroSerieDado.val())) || (Number.parseInt(inputinputNumeroSerieDado.val().length) > 5)) {
        inputinputNumeroSerieDado.addClass("is-invalid");

        inputinputNumeroSerieDado.removeClass("is-valid");

        $('#malNumeroSerieDado').append(`El Numero de serie SOLO puede tener 5 digitod DEL 0 AL 9 `);
        //inputCIFTienda.closest(".invalid-feedback").html("El Cif de la tienda SOLO puede tener 6 DEL 0 AL 9 digitos")
    }

    else {

        inputinputNumeroSerieDado.addClass("is-valid");

        inputinputNumeroSerieDado.removeClass("is-invalid");
        $('#buenNumeroSerieDado').append(`Numero de serie correcto`);

        // inputnombreTienda.closest(".valid-feedback").html("El nombre de la tienda esta correcto")
        NumeroSerieDadoCorrecto = true;
    }

    /**
     * INICIO NOMBRE PRODUCTO
     */
    if (!inputnombreDado.val()) {

        inputnombreDado.addClass("is-invalid");

        inputnombreDado.removeClass("is-valid");
        $('#malNombreDado').append(`No puede estar Vacio EL NOMBRE DEL PRODUCTO`);

        //inputCIFTienda.closest(".invalid-feedback").html("No puede estar Vacio la descripcion")

    }
    else {

        inputnombreDado.addClass("is-valid");

        inputnombreDado.removeClass("is-invalid");
        $('#buenNombreDado').append(`NOMBRE CORRECTO`);
        //inputCIFTienda.closest(".valid-feedback").html("La categoria cumple los requisitos")
        nombreDadoCorrecto = true;
    }

    /**
     * INICIO VALIDACION DESCRIPCION PRODUCTO
     */
    if (!inputDescripcionDado.val()) {

        inputDescripcionDado.addClass("is-invalid");

        inputDescripcionDado.removeClass("is-valid");
        $('#malDescripcionDado').append(`No puede estar Vacio la DESCRIPCION DEL PRODUCTO`);

        //inputDireccionTienda.closest(".invalid-feedback").html("No puede estar Vacio la direccion de la tienda")

    }
    else {

        inputDescripcionDado.addClass("is-valid");

        inputDescripcionDado.removeClass("is-invalid");

        $('#buenDescripcionDado').append(`DESCRIPCION DEL PRODUCTO ES CORRECTA`);

        //        inputDireccionTienda.closest(".valid-feedback").html("la direccion de la tienda esta correcto")
        DescripcionDadoCorrecto = true;
    }



    /**
     * INICIO VALIDACION PRECIO PRODUCTO
     */
    if (!inputprecioDado.val()) {



        inputprecioDado.addClass("is-invalid");

        inputprecioDado.removeClass("is-valid");

        $('#malprecioDado').append(`el PRECIO DEL PRODUCTO NO PUEDE ESTAR VACIO`);
        //inputtelefonoTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    }
    else {

        inputprecioDado.addClass("is-valid");

        inputprecioDado.removeClass("is-invalid");

        $('#buenprecioDado').append(`El PRECIO ESTA CORRRRRECCTO`);

        //inputtelefonoTienda.closest(".valid-feedback").html("El telefono de la tienda esta correcto")

        precioDadoCorrecto = true;
    }
    /**
     * INICIO VALIDACION IMPUESTO PRODUCTO
     */
    if (!inputImpuestoDado.val()) {

        inputImpuestoDado.addClass("is-invalid");

        inputImpuestoDado.removeClass("is-valid");

        $('#malImpuestoDado').append(`EL IMPUESTO NO PUEDE ESTAR VACIO`);


        //inputLatitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else {

        inputImpuestoDado.addClass("is-valid");

        inputImpuestoDado.removeClass("is-invalid");

        $('#buenImpuestoDado').append(`EL IMPUESTO ESTA CORRECTO `);

        //inputLatitudTienda.closest(".valid-feedback").html("LA LATITUD de la tienda esta correcto")
        ImpuestoDadoCorrecto = true;
    }


    /**
     * INICIO VALIDACION MODELO DADO
     */
    if (!inputModeloDado.val()) {

        inputModeloDado.addClass("is-invalid");

        inputModeloDado.removeClass("is-valid");

        $('#malModeloDado').append(`EL MODELO DEL DADO NO PUEDE ESTAR VACIO`);


        //inputLongitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputModeloDado.addClass("is-valid");

        inputModeloDado.removeClass("is-invalid");

        $('#buenModeloDado').append(`EL MODELO DEL DADO ES CORRECTO`);

        //inputLongitudTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        ModeloDadoCorrecto = true;
    }
    /**
         * INICIO VALIDACION COLOR DADO
         */
    if (!inputcolorDado.val()) {

        inputcolorDado.addClass("is-invalid");

        inputcolorDado.removeClass("is-valid");

        $('#malCategoriaDado').append(`EL COLOR DEL DADO NO PUEDE ESTAR VACIO`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputcolorDado.addClass("is-valid");

        inputcolorDado.removeClass("is-invalid");
        $('#buenCategoriaDado').append(`EL CAMPO DEL COLOR ESTA CORRECTO`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        colorDadoCorrecto = true;
    }
    /**
         * INICIO VALIDACION MODELO CATEGORIAS
         */
    if (!inputCategoriaDado.val()) {

        inputCategoriaDado.addClass("is-invalid");

        inputCategoriaDado.removeClass("is-valid");

        $('#malCategoriaDado').append(`ESTE CAMPO NO PUEDE ESTAR VACIO`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputCategoriaDado.addClass("is-valid");

        inputCategoriaDado.removeClass("is-invalid");
        $('#buenCategoriaDado').append(`CATEGORIA/AS RECOGIDA/AS`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        CategoriaDadoCorrecto = true;
    }


    /**
     * INICIO VALIDACION FOTO
     */
    if (!inputFotoDado.val()) {

        inputFotoDado.addClass("is-invalid");

        inputFotoDado.removeClass("is-valid");

        $('#malFotoDado').append(`No puede ESTAR la foto vacia`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else if (!(/.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(inputFotoDado.val()))) {
        inputFotoDado.addClass("is-invalid");

        inputFotoDado.removeClass("is-valid");

        $('#malFotoDado').append(`El archivo no cumple con es ni .gif ni jpg, jpeg,tiff png webp bmp`);

        //inputFotoTienda.closest(".invalid-feedback").html("LA LONGITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9")
    } else {

        inputFotoDado.addClass("is-valid");

        inputFotoDado.removeClass("is-invalid");
        $('#buenFotoDado').append(`La foto ta bien`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        FotoDadoCorrecto = true;
    }


}


function correctoAñadirDados() {
    if (NumeroSerieDadoCorrecto &&
        nombreDadoCorrecto &&
        DescripcionDadoCorrecto &&
        precioDadoCorrecto &&
        ImpuestoDadoCorrecto &&
        ModeloDadoCorrecto &&
        colorDadoCorrecto &&
        CategoriaDadoCorrecto &&
        FotoDadoCorrecto) {
        return true;
    } else {
        return false;
    }
}
let NumeroSerieManualCorrecto;
let nombreManualCorrecto;
let DescripcionManualCorrecto;
let precioManualCorrecto;
let ImpuestoManualCorrecto;
let CoverManualCorrecto;
let AuthorManualCorrecto;
let TargetManualCorrecto;
let CategoriaManualCorrecto;
let FotoManualCorrecto;

function validarAñadirManual() {

    //ASi recojo los valores de los inputs
    let inputNumeroSerieManual = $('#NumeroSerieManual');//
    let inputnombreManual = $('#nombreManual');//
    let inputDescripcionManual = $('#DescripcionManual');//
    let inputprecioManual = $('#precioManual');//
    let inputImpuestoManual = $('#ImpuestoManual');//
    let inputCoverManual = $('#CoverManual');//
    let inputAuthorManual = $('#AuthorManual');//
    let inputTargetManual = $('#TargetManual');//
    let inputCategoriaManual = $('#CategoriaManual');//
    let inputFotoManual = $('#FotoManual');//

    /**
     * INICIO VALIDACION NUMERO DE SERIE
     */
    if (!inputNumeroSerieManual.val()) {

        inputNumeroSerieManual.addClass("is-invalid");

        inputNumeroSerieManual.removeClass("is-valid");

        $('#malNumeroSerieManual').append(`No puede estar Vacio el Numero de serie `);

        // inputnombreTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else if (!(/[0-9]{5}/g.test(inputNumeroSerieManual.val())) || (Number.parseInt(inputNumeroSerieManual.val().length) > 5)) {
        inputNumeroSerieManual.addClass("is-invalid");

        inputNumeroSerieManual.removeClass("is-valid");

        $('#malNumeroSerieManual').append(`El Numero de serie SOLO puede tener 5 digitod DEL 0 AL 9 `);
        //inputCIFTienda.closest(".invalid-feedback").html("El Cif de la tienda SOLO puede tener 6 DEL 0 AL 9 digitos")
    }

    else {

        inputNumeroSerieManual.addClass("is-valid");

        inputNumeroSerieManual.removeClass("is-invalid");
        $('#buenNumeroSerieManual').append(`Numero de serie correcto`);

        // inputnombreTienda.closest(".valid-feedback").html("El nombre de la tienda esta correcto")
        NumeroSerieManualCorrecto = true;
    }

    /**
     * INICIO VALIDACION NOMBRE PRODUCTO
     */
    if (!inputnombreManual.val()) {

        inputnombreManual.addClass("is-invalid");

        inputnombreManual.removeClass("is-valid");
        $('#malNombreManual').append(`No puede estar Vacio EL NOMBRE DEL PRODUCTO`);

        //inputCIFTienda.closest(".invalid-feedback").html("No puede estar Vacio la descripcion")

    }
    else {

        inputnombreManual.addClass("is-valid");

        inputnombreManual.removeClass("is-invalid");
        $('#buenNombreManual').append(`NOMBRE CORRECTO`);
        //inputCIFTienda.closest(".valid-feedback").html("La categoria cumple los requisitos")
        nombreManualCorrecto = true;
    }

    /**
     * INICIO VALIDACION DESCRIPCION PRODUCTO
     */
    if (!inputDescripcionManual.val()) {

        inputDescripcionManual.addClass("is-invalid");

        inputDescripcionManual.removeClass("is-valid");

        $('#malDescripcionManual').append(`No puede estar Vacio la DESCRIPCION DEL PRODUCTO`);

        //inputDireccionTienda.closest(".invalid-feedback").html("No puede estar Vacio la direccion de la tienda")

    }
    else {

        inputDescripcionManual.addClass("is-valid");

        inputDescripcionManual.removeClass("is-invalid");

        $('#buenDescripcionManual').append(`LA DESCRIPCION DEL PROCUTO ES CORRECTA`);

        //        inputDireccionTienda.closest(".valid-feedback").html("la direccion de la tienda esta correcto")
        DescripcionManualCorrecto = true;
    }



    /**
     * INICIO VALIDACION PRECIO PRODUCTO
     */
    if (!inputprecioManual.val()) {



        inputprecioManual.addClass("is-invalid");

        inputprecioManual.removeClass("is-valid");

        $('#malprecioManual').append(`el PRECIO DEL PRODUCTO NO PUEDE ESTAR VACIO`);
        //inputtelefonoTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    }
    else {

        inputprecioManual.addClass("is-valid");

        inputprecioManual.removeClass("is-invalid");

        $('#buenprecioManual').append(`El PRECIO ESTA CORRRRRECCTO`);

        //inputtelefonoTienda.closest(".valid-feedback").html("El telefono de la tienda esta correcto")

        precioManualCorrecto = true;
    }
    /**
     * INICIO VALIDACION IMPUESTO PRODUCTO
     */
    if (!inputImpuestoManual.val()) {

        inputImpuestoManual.addClass("is-invalid");

        inputImpuestoManual.removeClass("is-valid");

        $('#malImpuestoManual').append(`EL IMPUESTO NO PUEDE ESTAR VACIO`);


        //inputLatitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else {

        inputImpuestoManual.addClass("is-valid");

        inputImpuestoManual.removeClass("is-invalid");

        $('#buenImpuestoManual').append(`EL IMPUESTO ESTA CORRECTO `);

        //inputLatitudTienda.closest(".valid-feedback").html("LA LATITUD de la tienda esta correcto")
        ImpuestoManualCorrecto = true;
    }


    /**
     * INICIO VALIDACION MODELO DADO
     */
    if (!inputCoverManual.val()) {

        inputCoverManual.addClass("is-invalid");

        inputCoverManual.removeClass("is-valid");

        $('#malModeloDado').append(`EL TAMAÑO NO PUEDE ESTAR VACIO`);


        //inputLongitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    }
    // else if (!(/([0-9]{1,2}[x-X][0-9]{1,2})$/i.test(inputCoverManual.val()))) {
    //     inputCoverManual.addClass("is-invalid");

    //     inputCoverManual.removeClass("is-valid");

    //     $('#malModeloDado').append(`DEBE TENER 1 O 2 NUMEROS SEGUIDOS DE UNA X MAYUSCULA O MINUSCULA Y OTRA VEZ 1 O 2 NUMEROS COMPRENDIDOS ENTRE EL 1 Y EL 0`);

    //     //inputFotoTienda.closest(".invalid-feedback").html("LA LONGITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9")
    //}
    else {

        inputCoverManual.addClass("is-valid");

        inputCoverManual.removeClass("is-invalid");

        $('#buenModeloDado').append(`EL TAMAÑO DEL DADO ES CORRECTO`);

        //inputLongitudTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        CoverManualCorrecto = true;
    }
    /**
         * INICIO AUTOR COLOR DADO
         */
    if (!inputAuthorManual.val()) {

        inputAuthorManual.addClass("is-invalid");

        inputAuthorManual.removeClass("is-valid");

        $('#malAuthorManual').append(`EL AUTOR DEL MANUAL NO PUEDE ESTAR VACIO`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputAuthorManual.addClass("is-valid");

        inputAuthorManual.removeClass("is-invalid");
        $('#buenAuthorManual').append(`EL CAMPO DEL AUTOR ESTA CORRECTO`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        AuthorManualCorrecto = true;
    }
    /**
         * INICIO VALIDACION MODELO CATEGORIAS
         */
    if (!inputTargetManual.val()) {

        inputTargetManual.addClass("is-invalid");

        inputTargetManual.removeClass("is-valid");

        $('#malTargetManual').append(`EL TARGET DEL LIBRO NO PUEDE ESTAR VACIO`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputTargetManual.addClass("is-valid");

        inputTargetManual.removeClass("is-invalid");
        $('#buenTargetManual').append(`TARGET CORRECTO`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        TargetManualCorrecto = true;
    }

    /**
           * INICIO VALIDACION TARGETS
           */
    if (!inputCategoriaManual.val()) {

        inputCategoriaManual.addClass("is-invalid");

        inputCategoriaManual.removeClass("is-valid");

        $('#malCategoriaManual').append(`ESTE CAMPO NO PUEDE ESTAR VACIO`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputCategoriaManual.addClass("is-valid");

        inputCategoriaManual.removeClass("is-invalid");
        $('#buenCategoriaManual').append(`CATEGORIA/AS RECOGIDA/AS`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        CategoriaManualCorrecto = true;
    }
    /**
     * INICIO VALIDACION FOTO
     */
    if (!inputFotoManual.val()) {

        inputFotoManual.addClass("is-invalid");

        inputFotoManual.removeClass("is-valid");

        $('#malFotoManual').append(`No puede ESTAR la foto vacia`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else if (!(/.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(inputFotoManual.val()))) {
        inputFotoManual.addClass("is-invalid");

        inputFotoManual.removeClass("is-valid");

        $('#malFotoManual').append(`El archivo no cumple con es ni .gif ni jpg, jpeg,tiff png webp bmp`);

        //inputFotoTienda.closest(".invalid-feedback").html("LA LONGITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9")
    } else {

        inputFotoManual.addClass("is-valid");

        inputFotoManual.removeClass("is-invalid");
        $('#buenFotoManual').append(`La foto ta bien`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        FotoManualCorrecto = true;
    }
}

function correctoAñadirManual() {
    if (NumeroSerieManualCorrecto &&
        nombreManualCorrecto &&
        DescripcionManualCorrecto &&
        precioManualCorrecto &&
        ImpuestoManualCorrecto &&
        CoverManualCorrecto &&
        AuthorManualCorrecto &&
        TargetManualCorrecto &&
        CategoriaManualCorrecto &&
        FotoManualCorrecto) {
        return true;
    } else {
        return false;
    }
}

let NumeroSeriePantallaCorrecto;
let nombrePantallaCorrecto;
let DescripcionPantallaCorrecto;
let precioPantallaCorrecto;
let ImpuestoPantallaCorrecto;
let ModelPantallaCorrecto;
let SizePantallaCorrecto;
let CampañaPantallaCorrecto;
let CategoriaPantallaCorrecto;
let FotoPantallaCorrecto;

function validarAñadirPantalla() {

    //ASi recojo los valores de los inputs
    let inputNumeroSeriePantalla = $('#NumeroSeriePantalla');//
    let inputnombrePantalla = $('#nombrePantalla');//
    let inputDescripcionPantalla = $('#DescripcionPantalla');//
    let inputprecioPantalla = $('#precioPantalla');//
    let inputImpuestoPantalla = $('#ImpuestoPantalla');//
    let inputModelPantalla = $('#ModelPantalla');//
    let inputSizePantalla = $('#SizePantalla');//
    let inputCampañaPantalla = $('#CampañaPantalla');//
    let inputCategoriaPantalla = $('#CategoriaPantalla');//
    let inputFotoPantalla = $('#FotoPantalla');//


    /**
     * INICIO VALIDACION NUMERO DE SERIE
     */
    if (!inputNumeroSeriePantalla.val()) {

        inputNumeroSeriePantalla.addClass("is-invalid");

        inputNumeroSeriePantalla.removeClass("is-valid");

        $('#malNumeroSerieManual').append(`No puede estar Vacio el Numero de serie `);

        // inputnombreTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else if (!(/[0-9]{5}/g.test(inputNumeroSeriePantalla.val())) || (Number.parseInt(inputNumeroSeriePantalla.val().length) > 5)) {
        inputNumeroSeriePantalla.addClass("is-invalid");

        inputNumeroSeriePantalla.removeClass("is-valid");

        $('#malNumeroSeriePantalla').append(`El Numero de serie SOLO puede tener 5 digitod DEL 0 AL 9 `);
        //inputCIFTienda.closest(".invalid-feedback").html("El Cif de la tienda SOLO puede tener 6 DEL 0 AL 9 digitos")
    }

    else {

        inputNumeroSeriePantalla.addClass("is-valid");

        inputNumeroSeriePantalla.removeClass("is-invalid");
        $('#buenNumeroSeriePantalla').append(`Numero de serie correcto`);

        // inputnombreTienda.closest(".valid-feedback").html("El nombre de la tienda esta correcto")
        NumeroSeriePantallaCorrecto = true;
    }

    /**
     * INICIO VALIDACION NOMBRE PRODUCTO
     */
    if (!inputnombrePantalla.val()) {

        inputnombrePantalla.addClass("is-invalid");

        inputnombrePantalla.removeClass("is-valid");
        $('#malNombrePantalla').append(`No puede estar Vacio EL NOMBRE DEL PRODUCTO`);

        //inputCIFTienda.closest(".invalid-feedback").html("No puede estar Vacio la descripcion")

    }
    else {

        inputnombrePantalla.addClass("is-valid");

        inputnombrePantalla.removeClass("is-invalid");
        $('#buenNombrePantalla').append(`NOMBRE CORRECTO`);
        //inputCIFTienda.closest(".valid-feedback").html("La categoria cumple los requisitos")
        nombrePantallaCorrecto = true;
    }

    /**
     * INICIO VALIDACION DESCRIPCION PRODUCTO
     */
    if (!inputDescripcionPantalla.val()) {

        inputDescripcionPantalla.addClass("is-invalid");

        inputDescripcionPantalla.removeClass("is-valid");

        $('#malDescripcionPantalla').append(`No puede estar Vacio la DESCRIPCION DEL PRODUCTO`);

        //inputDireccionTienda.closest(".invalid-feedback").html("No puede estar Vacio la direccion de la tienda")

    }
    else {

        inputDescripcionPantalla.addClass("is-valid");

        inputDescripcionPantalla.removeClass("is-invalid");

        $('#buenDescripcionPantalla').append(`LA DESCRIPCION DEL PROCUTO ES CORRECTA`);

        //        inputDireccionTienda.closest(".valid-feedback").html("la direccion de la tienda esta correcto")
        DescripcionPantallaCorrecto = true;
    }



    /**
     * INICIO VALIDACION PRECIO PRODUCTO
     */
    if (!inputprecioPantalla.val()) {



        inputprecioPantalla.addClass("is-invalid");

        inputprecioPantalla.removeClass("is-valid");

        $('#malprecioPantalla').append(`el PRECIO DEL PRODUCTO NO PUEDE ESTAR VACIO`);
        //inputtelefonoTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    }
    else {

        inputprecioPantalla.addClass("is-valid");

        inputprecioPantalla.removeClass("is-invalid");

        $('#buenprecioPantalla').append(`El PRECIO ESTA CORRRRRECCTO`);

        //inputtelefonoTienda.closest(".valid-feedback").html("El telefono de la tienda esta correcto")

        precioPantallaCorrecto = true;
    }
    /**
     * INICIO VALIDACION IMPUESTO PRODUCTO
     */
    if (!inputImpuestoPantalla.val()) {

        inputImpuestoPantalla.addClass("is-invalid");

        inputImpuestoPantalla.removeClass("is-valid");

        $('#malImpuestoPantalla').append(`EL IMPUESTO NO PUEDE ESTAR VACIO`);


        //inputLatitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else {

        inputImpuestoPantalla.addClass("is-valid");

        inputImpuestoPantalla.removeClass("is-invalid");

        $('#buenImpuestoPantalla').append(`EL IMPUESTO ESTA CORRECTO `);

        //inputLatitudTienda.closest(".valid-feedback").html("LA LATITUD de la tienda esta correcto")
        ImpuestoPantallaCorrecto = true;
    }


    /**
     * INICIO VALIDACION MODELO DADO
     */
    if (!inputModelPantalla.val()) {

        inputModelPantalla.addClass("is-invalid");

        inputModelPantalla.removeClass("is-valid");

        $('#malModelPantalla').append(`EL MODELO NO PUEDE ESTAR VACIO`);


        //inputLongitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    }

    else {

        inputModelPantalla.addClass("is-valid");

        inputModelPantalla.removeClass("is-invalid");

        $('#buenModelPantalla').append(`EL MODELO DE LA PANTALLA ES CORRECTO`);

        //inputLongitudTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        ModelPantallaCorrecto = true;
    }
    /**
         * INICIO AUTOR COLOR DADO
         */
    if (!inputSizePantalla.val()) {

        inputSizePantalla.addClass("is-invalid");

        inputSizePantalla.removeClass("is-valid");

        $('#malSizePantalla').append(`EL TAMAÑO DE LA PANTALLA NO PUEDE ESTAR VACIO`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputSizePantalla.addClass("is-valid");

        inputSizePantalla.removeClass("is-invalid");
        $('#buenSizePantalla').append(`EL CAMPO DEL TAMAÑO DE LA PANTALLA ESTA CORRECTO`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        SizePantallaCorrecto = true;
    }
    /**
         * INICIO VALIDACION MODELO CATEGORIAS
         */
    if (!inputCampañaPantalla.val()) {

        inputCampañaPantalla.addClass("is-invalid");

        inputCampañaPantalla.removeClass("is-valid");

        $('#malCampañaPantalla').append(`EL LA CAMPAÑA DE LA PANTALLA NO PUEDE ESTAR VACIO`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputCampañaPantalla.addClass("is-valid");

        inputCampañaPantalla.removeClass("is-invalid");
        $('#buenCampañaPantalla').append(`CAMPAÑA CORRECTA`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        CampañaPantallaCorrecto = true;
    }

    /**
           * INICIO VALIDACION TARGETS
           */
    if (!inputCategoriaPantalla.val()) {

        inputCategoriaPantalla.addClass("is-invalid");

        inputCategoriaPantalla.removeClass("is-valid");

        $('#malCategoriaPantalla').append(`ESTE CAMPO NO PUEDE ESTAR VACIO`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputCategoriaPantalla.addClass("is-valid");

        inputCategoriaPantalla.removeClass("is-invalid");
        $('#buenCategoriaPantalla').append(`CATEGORIA/AS RECOGIDA/AS`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        CategoriaPantallaCorrecto = true;
    }
    /**
     * INICIO VALIDACION FOTO
     */
    if (!inputFotoPantalla.val()) {

        inputFotoPantalla.addClass("is-invalid");

        inputFotoPantalla.removeClass("is-valid");

        $('#malFotoPantalla').append(`No puede ESTAR la foto vacia`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else if (!(/.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(inputFotoPantalla.val()))) {
        inputFotoPantalla.addClass("is-invalid");

        inputFotoPantalla.removeClass("is-valid");

        $('#malFotoPantalla').append(`El archivo no cumple con es ni .gif ni jpg, jpeg,tiff png webp bmp`);

        //inputFotoTienda.closest(".invalid-feedback").html("LA LONGITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9")
    } else {

        inputFotoPantalla.addClass("is-valid");

        inputFotoPantalla.removeClass("is-invalid");
        $('#buenFotoPantalla').append(`La foto ta bien`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        FotoPantallaCorrecto = true;
    }
}

function correctoAñadirPantalla() {
    if (NumeroSeriePantallaCorrecto &&
        nombrePantallaCorrecto &&
        DescripcionPantallaCorrecto &&
        precioPantallaCorrecto &&
        ImpuestoPantallaCorrecto &&
        ModelPantallaCorrecto &&
        SizePantallaCorrecto &&
        CampañaPantallaCorrecto &&
        CategoriaPantallaCorrecto &&
        FotoPantallaCorrecto) {
        return true;
    } else {
        return false;
    }
}



let NumeroSerieOrdenadorCorreccto;//
let nombreOrdenadorCorreccto;//
let DescripcionOrdenadorCorreccto;//
let precioOrdenadorCorreccto;//
let ImpuestoOrdenadorCorreccto;//
let ModelOrdenadorCorreccto;//
let CPUOrdenadorCorreccto;//
let CargadorOrdenadorCorreccto;//
let KeyboardOrdenadorCorreccto;//
let CategoriaOrdenadorCorreccto;//
let FotoOrdenadorCorreccto;

function validarAñadirOrdenador() {

    //ASi recojo los valores de los inputs
    let inputNumeroSerieOrdenador = $('#NumeroSerieOrdenador');//
    let inputnombreOrdenador = $('#nombreOrdenador');//
    let inputDescripcionOrdenador = $('#DescripcionOrdenador');//
    let inputprecioOrdenador = $('#precioOrdenador');//
    let inputImpuestoOrdenador = $('#ImpuestoOrdenador');//
    let inputModelOrdenador = $('#ModelOrdenador');//
    let inputCPUOrdenador = $('#CPUOrdenador');//
    let inputCargadorOrdenador = $('#CargadorOrdenador');//
    let inputKeyboardOrdenador = $('#KeyboardOrdenador');//
    let inputCategoriaOrdenador = $('#CategoriaOrdenador');//
    let inputFotoOrdenador = $('#FotoOrdenador');//


    /**
     * INICIO VALIDACION NUMERO DE SERIE
     */
    if (!inputNumeroSerieOrdenador.val()) {

        inputNumeroSerieOrdenador.addClass("is-invalid");

        inputNumeroSerieOrdenador.removeClass("is-valid");

        $('#malNumeroSerieOrdenador').append(`No puede estar Vacio el Numero de serie `);

        // inputnombreTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else if (!(/[0-9]{5}/g.test(inputNumeroSerieOrdenador.val())) || (Number.parseInt(inputNumeroSerieOrdenador.val().length) > 5)) {
        inputNumeroSerieOrdenador.addClass("is-invalid");

        inputNumeroSerieOrdenador.removeClass("is-valid");

        $('#malNumeroSerieOrdenador').append(`El Numero de serie SOLO puede tener 5 digitod DEL 0 AL 9 `);
        //inputCIFTienda.closest(".invalid-feedback").html("El Cif de la tienda SOLO puede tener 6 DEL 0 AL 9 digitos")
    }

    else {

        inputNumeroSerieOrdenador.addClass("is-valid");

        inputNumeroSerieOrdenador.removeClass("is-invalid");
        $('#buenNumeroSerieOrdenador').append(`Numero de serie correcto`);

        // inputnombreTienda.closest(".valid-feedback").html("El nombre de la tienda esta correcto")
        NumeroSerieOrdenadorCorreccto = true;
    }

    /**
     * INICIO VALIDACION NOMBRE PRODUCTO
     */
    if (!inputnombreOrdenador.val()) {

        inputnombreOrdenador.addClass("is-invalid");

        inputnombreOrdenador.removeClass("is-valid");
        $('#malNombreOrdenador').append(`No puede estar Vacio EL NOMBRE DEL PRODUCTO`);

        //inputCIFTienda.closest(".invalid-feedback").html("No puede estar Vacio la descripcion")

    }
    else {

        inputnombreOrdenador.addClass("is-valid");

        inputnombreOrdenador.removeClass("is-invalid");
        $('#buenNombreOrdenador').append(`NOMBRE CORRECTO`);
        //inputCIFTienda.closest(".valid-feedback").html("La categoria cumple los requisitos")
        nombreOrdenadorCorreccto = true;
    }

    /**
     * INICIO VALIDACION DESCRIPCION PRODUCTO
     */
    if (!inputDescripcionOrdenador.val()) {

        inputDescripcionOrdenador.addClass("is-invalid");

        inputDescripcionOrdenador.removeClass("is-valid");

        $('#malDescripcionOrdenador').append(`No puede estar Vacio la DESCRIPCION DEL PRODUCTO`);

        //inputDireccionTienda.closest(".invalid-feedback").html("No puede estar Vacio la direccion de la tienda")

    }
    else {

        inputDescripcionOrdenador.addClass("is-valid");

        inputDescripcionOrdenador.removeClass("is-invalid");

        $('#buenDescripcionOrdenador').append(`LA DESCRIPCION DEL PROCUTO ES CORRECTA`);

        //inputDireccionTienda.closest(".valid-feedback").html("la direccion de la tienda esta correcto")
        DescripcionOrdenadorCorreccto = true;
    }



    /**
     * INICIO VALIDACION PRECIO PRODUCTO
     */
    if (!inputprecioOrdenador.val()) {



        inputprecioOrdenador.addClass("is-invalid");

        inputprecioOrdenador.removeClass("is-valid");

        $('#malprecioOrdenador').append(`el PRECIO DEL PRODUCTO NO PUEDE ESTAR VACIO`);
        //inputtelefonoTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    }
    else {

        inputprecioOrdenador.addClass("is-valid");

        inputprecioOrdenador.removeClass("is-invalid");

        $('#buenprecioOrdenador').append(`El PRECIO ESTA CORRRRRECCTO`);

        //inputtelefonoTienda.closest(".valid-feedback").html("El telefono de la tienda esta correcto")

        precioOrdenadorCorreccto = true;
    }
    /**
     * INICIO VALIDACION IMPUESTO PRODUCTO
     */
    if (!inputImpuestoOrdenador.val()) {

        inputImpuestoOrdenador.addClass("is-invalid");

        inputImpuestoOrdenador.removeClass("is-valid");

        $('#malImpuestoOrdenador').append(`EL IMPUESTO NO PUEDE ESTAR VACIO`);


        //inputLatitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else {

        inputImpuestoOrdenador.addClass("is-valid");

        inputImpuestoOrdenador.removeClass("is-invalid");

        $('#buenImpuestoOrdenador').append(`EL IMPUESTO ESTA CORRECTO `);

        //inputLatitudTienda.closest(".valid-feedback").html("LA LATITUD de la tienda esta correcto")
        ImpuestoOrdenadorCorreccto = true;
    }


    /**
     * INICIO VALIDACION MODELO DADO
     */
    if (!inputModelOrdenador.val()) {

        inputModelOrdenador.addClass("is-invalid");

        inputModelOrdenador.removeClass("is-valid");

        $('#malModelOrdenador').append(`EL MODELO NO PUEDE ESTAR VACIO`);


        //inputLongitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    }

    else {

        inputModelOrdenador.addClass("is-valid");

        inputModelOrdenador.removeClass("is-invalid");

        $('#buenModelOrdenador').append(`EL MODELO DEL ORDENADOR ES CORRECTO`);

        //inputLongitudTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        ModelOrdenadorCorreccto = true;
    }
    /**
         * INICIO AUTOR COLOR DADO
         */
    if (!inputCPUOrdenador.val()) {

        inputCPUOrdenador.addClass("is-invalid");

        inputCPUOrdenador.removeClass("is-valid");

        $('#malCPUOrdenador').append(`LA CPU DEL ORDENADOR NO PUEDE ESTAR VACIA`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputCPUOrdenador.addClass("is-valid");

        inputCPUOrdenador.removeClass("is-invalid");
        $('#buenCPUOrdenador').append(`LA CPU DEL ORDENADOR ES VALIDA`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        CPUOrdenadorCorreccto = true;
    }
    /**
       * INICIO AUTOR COLOR DADO
       */
    if (!inputCargadorOrdenador.val()) {

        inputCargadorOrdenador.addClass("is-invalid");

        inputCargadorOrdenador.removeClass("is-valid");

        $('#malCargadorOrdenador').append(`EL CARGADOR NO PUEDE ESTAR VACIO`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputCargadorOrdenador.addClass("is-valid");

        inputCargadorOrdenador.removeClass("is-invalid");
        $('#buenCargadorOrdenador').append(`EL CARGADOR ESTA CORRECTO`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        CargadorOrdenadorCorreccto = true;
    }
    /**
         * INICIO VALIDACION MODELO CATEGORIAS
         */
    if (!inputKeyboardOrdenador.val()) {

        inputKeyboardOrdenador.addClass("is-invalid");

        inputKeyboardOrdenador.removeClass("is-valid");

        $('#malKeyboardOrdenador').append(`EL TECLADO NO PUEDE ESTAR VACIO`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputKeyboardOrdenador.addClass("is-valid");

        inputKeyboardOrdenador.removeClass("is-invalid");
        $('#buenKeyboardOrdenador').append(`TECLADO INSERTADO CORRECTAMENTE`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        KeyboardOrdenadorCorreccto = true;
    }

    /**
           * INICIO VALIDACION TARGETS
           */
    if (!inputCategoriaOrdenador.val()) {

        inputCategoriaOrdenador.addClass("is-invalid");

        inputCategoriaOrdenador.removeClass("is-valid");

        $('#malCategoriaOrdenador').append(`ESTE CAMPO NO PUEDE ESTAR VACIO`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else {

        inputCategoriaOrdenador.addClass("is-valid");

        inputCategoriaOrdenador.removeClass("is-invalid");
        $('#buenCategoriaOrdenador').append(`CATEGORIA/AS RECOGIDA/AS`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        CategoriaOrdenadorCorreccto = true;
    }
    /**
     * INICIO VALIDACION FOTO
     */
    if (!inputFotoOrdenador .val()) {

        inputFotoOrdenador .addClass("is-invalid");

        inputFotoOrdenador .removeClass("is-valid");

        $('#malFotoPantalla').append(`No puede ESTAR la foto vacia`);


        //        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else if (!(/.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(inputFotoOrdenador .val()))) {
        inputFotoOrdenador .addClass("is-invalid");

        inputFotoOrdenador .removeClass("is-valid");

        $('#malFotoOrdenador').append(`El archivo no cumple con es ni .gif ni jpg, jpeg,tiff png webp bmp`);

        //inputFotoTienda.closest(".invalid-feedback").html("LA LONGITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9")
    } else {

        inputFotoOrdenador .addClass("is-valid");

        inputFotoOrdenador .removeClass("is-invalid");
        $('#buenFotoOrdenador').append(`La foto ta bien`);
        // inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        FotoOrdenadorCorreccto = true;
    }
}

function correctoAñadirOrdenador() {
    if (NumeroSerieOrdenadorCorreccto &&
        nombreOrdenadorCorreccto &&
        DescripcionOrdenadorCorreccto &&
        precioOrdenadorCorreccto &&
        ImpuestoOrdenadorCorreccto &&
        ModelOrdenadorCorreccto &&
        CPUOrdenadorCorreccto &&
        CargadorOrdenadorCorreccto &&
        KeyboardOrdenadorCorreccto &&
        CategoriaOrdenadorCorreccto &&
        FotoOrdenadorCorreccto) {
        return true;
    } else {
        return false;
    }
}
export default StoreHouseView;

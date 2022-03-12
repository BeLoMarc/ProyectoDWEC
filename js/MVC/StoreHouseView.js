'use strict'
class StoreHouseView {
    #ventanas;
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
                let precargar = mapCategories.generador;
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
         * Por favor, tenga en cuenta: inmediatamente después de window.open la nueva ventana no 
         * está cargada aún. Esto queda demostrado por el alert en la linea (*). 
         * Así que esperamos a que onload lo modifique. También podríamos usar DOMContentLoaded 
         * de los manejadores de newWin.document.
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
            // } else {
            //     miVentana.onload = function () {
            //         miVentana.close();
            //     }

        }
        //        }

        // Esto pinta nada más entrar
        // window.open(//Recurso que quieri abrir //Nombre de la ventana// Opciones de como queremos que se visualice la ventana
        //     "../../html/lienzo.html", "Mywindow", "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
        // this.main.empty(); esto efectivamente me limpia la pagina principal (en este caso el main)
        /**
         * La propiedad closed devuelve un booleano indicando si
          la ventana está abierta o se ha cerrado
         */
        // if (!a || a.closed) {
        //     this.main.append(a);

        // } else {
        /**
        Makes a request to bring the window to the front.
        It may fail due to user settings and the window
        isn't guaranteed to be frontmost before this method returns.
         */
        //   a.focus();
        //     a.close();
        // }
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
        $(document).ready(function () {

            $(".botonTienda").click(function () {
                //recogemos el valor del boton
                let tiendaCIF = $(this).attr("value");
                handler(tiendaCIF);
            });
        });

    }


    bindShowProductCategory(handler) {
        //aqui es donde quiero pintar //el evento q lo triguea y como quiero q lo haga
        $("#ShowCategories").on("click", ".botonCategoria", function () {
            //recogemos el valor del boton
            let tituloCategoria = $(this).attr("value");
            handler(tituloCategoria);
        });

    }

    bindRecargar(handler) {

        $(document).ready(function () {

            $(".botonReiniciar").click(function () {
                //recogemos el valor del boton

                handler();
            });
        });
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

    showProductTypes() {
        this.categories.empty();
        this.categories.append();
    }

}






export default StoreHouseView;

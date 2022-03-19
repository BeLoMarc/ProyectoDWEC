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

        inputTitulo.closest(".invalid-feedback").html("No puede estar Vacio el titulo")

    } else {

        inputTitulo.addClass("is-valid");

        inputTitulo.removeClass("is-invalid");

        inputTitulo.closest(".valid-feedback").html("El titulo cumple los requisitos")
        TituloCorrecto = true;
    }

    if (!inputDescripcion.val()) {

        inputDescripcion.addClass("is-invalid");

        inputDescripcion.removeClass("is-valid");

        inputDescripcion.closest(".invalid-feedback").html("No puede estar Vacio la descripcion")

    } else {

        inputDescripcion.addClass("is-valid");

        inputDescripcion.removeClass("is-invalid");

        inputDescripcion.closest(".valid-feedback").html("La categoria cumple los requisitos")
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

        inputnombreTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else {

        inputnombreTienda.addClass("is-valid");

        inputnombreTienda.removeClass("is-invalid");

        inputnombreTienda.closest(".valid-feedback").html("El nombre de la tienda esta correcto")
        nombreTiendaCorrecto = true;
    }

    /**
     * INICIO VALIDACION CIF TIENDA
     */
    if (!inputCIFTienda.val()) {

        inputCIFTienda.addClass("is-invalid");

        inputCIFTienda.removeClass("is-valid");

        inputCIFTienda.closest(".invalid-feedback").html("No puede estar Vacio la descripcion")

    } else if (!(/[0-9]{6}/g.test(inputCIFTienda.val()))||(Number.parseInt(inputCIFTienda.val().length)>6)) {
        inputCIFTienda.addClass("is-invalid");

        inputCIFTienda.removeClass("is-valid");

        inputCIFTienda.closest(".invalid-feedback").html("El Cif de la tienda SOLO puede tener 6 DEL 0 AL 9 digitos")
    }
    
    else {

        inputCIFTienda.addClass("is-valid");

        inputCIFTienda.removeClass("is-invalid");

        inputCIFTienda.closest(".valid-feedback").html("La categoria cumple los requisitos")
        CIFTiendaCorrecto = true;
    }

    /**
     * INICIO VALIDACION DIRECCION TIENDA
     */
    if (!inputDireccionTienda.val()) {

        inputDireccionTienda.addClass("is-invalid");

        inputDireccionTienda.removeClass("is-valid");

        inputDireccionTienda.closest(".invalid-feedback").html("No puede estar Vacio la direccion de la tienda")

    }
    else {

        inputDireccionTienda.addClass("is-valid");

        inputDireccionTienda.removeClass("is-invalid");

        inputDireccionTienda.closest(".valid-feedback").html("la direccion de la tienda esta correcto")
        DireccionTiendaCorrecto = true;
    }



    /**
     * INICIO VALIDACION TELEFONO TIENDA
     */
    if (!inputtelefonoTienda.val()) {

        inputtelefonoTienda.addClass("is-invalid");

        inputtelefonoTienda.removeClass("is-valid");

        inputtelefonoTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else if (!(/[0-9]{3}-[0-9]{3}-[0-9]{3}/g.test(inputtelefonoTienda.val()))||(Number.parseInt(inputtelefonoTienda.val().length)>11)) {
        inputtelefonoTienda.addClass("is-invalid");

        inputtelefonoTienda.removeClass("is-valid");

        inputtelefonoTienda.closest(".invalid-feedback").html("el telefono debe tener 9 numeros siguiendo el patron XXX-XXX-XXX")
    }
    else {

        inputtelefonoTienda.addClass("is-valid");

        inputtelefonoTienda.removeClass("is-invalid");

        inputtelefonoTienda.closest(".valid-feedback").html("El telefono de la tienda esta correcto")

        telefonoTiendaCorrecto = true;
    }
    /**
     * INICIO VALIDACION LATITUD
     */
    if (!inputLatitudTienda.val()) {

        inputLatitudTienda.addClass("is-invalid");

        inputLatitudTienda.removeClass("is-valid");

        inputLatitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el Nombre de la tienda")

    } else if (!(/[0-9]{4}/g.test(inputLatitudTienda.val()))||(Number.parseInt(inputLatitudTienda.val().length)>4)) {
        inputLatitudTienda.addClass("is-invalid");

        inputLatitudTienda.removeClass("is-valid");

        inputLatitudTienda.closest(".invalid-feedback").html("LA LAITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9")
    } else {

        inputLatitudTienda.addClass("is-valid");

        inputLatitudTienda.removeClass("is-invalid");

        inputLatitudTienda.closest(".valid-feedback").html("LA LATITUD de la tienda esta correcto")
        LatitudTiendaCorrecto = true;
    }


    /**
     * INICIO VALIDACION LONGITUD
     */
    if (!inputLongitudTienda.val()) {

        inputLongitudTienda.addClass("is-invalid");

        inputLongitudTienda.removeClass("is-valid");

        inputLongitudTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else if (!(/[0-9]{4}/g.test(inputLongitudTienda.val()))||(Number.parseInt(inputLongitudTienda.val().length)>4)) {
        inputLongitudTienda.addClass("is-invalid");

        inputLongitudTienda.removeClass("is-valid");

        inputLongitudTienda.closest(".invalid-feedback").html("LA LONGITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9")
    } else {

        inputLongitudTienda.addClass("is-valid");

        inputLongitudTienda.removeClass("is-invalid");

        inputLongitudTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
        LongitudTiendaCorrecto = true;
    }


    /**
     * INICIO VALIDACION FOTO
     */
    if (!inputFotoTienda.val()) {

        inputFotoTienda.addClass("is-invalid");

        inputFotoTienda.removeClass("is-valid");

        inputFotoTienda.closest(".invalid-feedback").html("No puede estar Vacio el LONGITUD de la tienda")

    } else if (!(/.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(inputFotoTienda.val()))) {
        inputFotoTienda.addClass("is-invalid");

        inputFotoTienda.removeClass("is-valid");

        inputFotoTienda.closest(".invalid-feedback").html("LA LONGITUD de la tienda SOLO puede tener 4 digitos DEL 0 AL 9")
    } else {

        inputFotoTienda.addClass("is-valid");

        inputFotoTienda.removeClass("is-invalid");

        inputFotoTienda.closest(".valid-feedback").html("LA LONGITUD de la tienda esta correcto")
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








export default StoreHouseView;

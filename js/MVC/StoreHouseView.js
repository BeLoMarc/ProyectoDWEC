'use strict'
export class StoreHouseViewView {
    constructor() {

        this.main=$('main');
    }

init(){
    this.main.empty();
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


<div class="card" style="width: 18rem;">
    <img src="../Multimedia/Dados.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Conjunto de dados</h5>
        <p class="card-text">6 packs de dados para jugar.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>
<div class="card" style="width: 18rem;">
    <img src="../Multimedia/PanrallaDND.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Pantalla de DM</h5>
        <p class="card-text">Objeto imprescindible si quieres probar a ser DM.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>
<div class="card" style="width: 18rem;">
    <img src="../Multimedia/phbCaratula.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Manual del jugador</h5>
        <p class="card-text">Libro para que los jugadores se inicien en el mundo de dragones y mazmorras.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>

<div class="card" style="width: 18rem;">
    <img src="../Multimedia/Dados.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Conjunto de dados</h5>
        <p class="card-text">6 packs de dados para jugar.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>
<div class="card" style="width: 18rem;">
    <img src="../Multimedia/PanrallaDND.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Pantalla de DM</h5>
        <p class="card-text">Objeto imprescindible si quieres probar a ser DM.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>
<div class="card" style="width: 18rem;">
    <img src="../Multimedia/phbCaratula.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Manual del jugador</h5>
        <p class="card-text">Libro para que los jugadores se inicien en el mundo de dragones y mazmorras.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>

<div class="card" style="width: 18rem;">
    <img src="../Multimedia/Dados.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Conjunto de dados</h5>
        <p class="card-text">6 packs de dados para jugar.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>
<div class="card" style="width: 18rem;">
    <img src="../Multimedia/PanrallaDND.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Pantalla de DM</h5>
        <p class="card-text">Objeto imprescindible si quieres probar a ser DM.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>
<div class="card" style="width: 18rem;">
    <img src="../Multimedia/phbCaratula.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Manual del jugador</h5>
        <p class="card-text">Libro para que los jugadores se inicien en el mundo de dragones y mazmorras.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>

<div class="card" style="width: 18rem;">
    <img src="../Multimedia/Dados.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Conjunto de dados</h5>
        <p class="card-text">6 packs de dados para jugar.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>
<div class="card" style="width: 18rem;">
    <img src="../Multimedia/PanrallaDND.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Pantalla de DM</h5>
        <p class="card-text">Objeto imprescindible si quieres probar a ser DM.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>
<div class="card" style="width: 18rem;">
    <img src="../Multimedia/phbCaratula.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Manual del jugador</h5>
        <p class="card-text">Libro para que los jugadores se inicien en el mundo de dragones y mazmorras.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>

<div class="card" style="width: 18rem;">
    <img src="../Multimedia/Dados.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Conjunto de dados</h5>
        <p class="card-text">6 packs de dados para jugar.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>
<div class="card" style="width: 18rem;">
    <img src="../Multimedia/PanrallaDND.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Pantalla de DM</h5>
        <p class="card-text">Objeto imprescindible si quieres probar a ser DM.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>
<div class="card" style="width: 18rem;">
    <img src="../Multimedia/phbCaratula.jpg" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Manual del jugador</h5>
        <p class="card-text">Libro para que los jugadores se inicien en el mundo de dragones y mazmorras.</p>
        <a href="#" class="btn btn-primary">Añadir al carrito</a>
    </div>
</div>

`)
}




    
}

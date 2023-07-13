import React from 'react';
import '../estilos/Deslizable.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { Link } from 'react-router-dom';


function Carrito(){
    return(
<>
<div className="container">
  <div className="row">
    {/* Elementos generados a partir del JSON */}
    <main id="items" className="col-sm-8 row"></main>
    {/* Carrito */}
    <aside className="col-sm-4">
      <h2>Carrito</h2>
      {/* Elementos del carrito */}
      <ul id="carrito" className="list-group" />
      <hr />
      {/* Precio total */}
      <p className="text-right">
        Total: <span id="total" /> MXN
      </p>
      <button id="boton-vaciar" className="btn btn-danger">
        Vaciar
      </button>
    </aside>
  </div>
</div>
</>

    );
}

export default Carrito;
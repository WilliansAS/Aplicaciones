import React from "react";
import Encabezado from "../componentes/Encabezado";
import { Link } from "react-router-dom";

function Cuerpo(){
    return(
        <>
        <Encabezado></Encabezado>
        <div className="acomodo">
  <section id="Texto">
    {/*En este HREF haremos referencia a la página CATEGORIAS, tanto en la IMG, como en el HREF*/}
    <a href="lista_pro.html">
      <img src={require('../imagenes/colaboradores.jpg')} alt="Nuestra_Ayuda" id="foto" />
    </a>
    <span className="Exclamar2">!YA CASI ESTAMOS LISTOS :D!</span>
    <h1>"Demos los últimos pasos"</h1>
    <p>
      De parte de todo el personal detrás de esta empresa, te damos las gracias,
      pues con tu ayuda, cada 15% de tus compras son destinadas a causas
      importantes para conservación del planeta.
    </p>
    <p>
      Para conocer más acerca de detalles de nuestros convenios y nuestros
      aliados, te invitamos a conocer nuestros <Link to="#">Aliados Unidos.</Link>
    </p>
    <h1 className="Exclamar">!TU CARRITO!</h1>
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
    <hr />
    <div className="boton">
      <Link to="/Compras">Confirmación De Compra</Link>
      <Link to="/">Comprar</Link>
    </div>
  </section>
</div>
        </>
    );
}

export default Cuerpo;
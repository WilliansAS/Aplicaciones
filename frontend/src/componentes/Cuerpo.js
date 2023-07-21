import React from "react";
import Encabezado from "../componentes/Encabezado";
import { Link } from "react-router-dom";
import Carrito from "../componentes/Carrito";

function Cuerpo(){
    return(
        <>
        <Encabezado></Encabezado>
        <div className="acomodo">
  <section id="Texto">
   
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
    <Carrito></Carrito>
    <hr />
    <div className="botoncar">
      <Link to="/Compras">Confirmación De Compra</Link>
      <Link to="/">Comprar</Link>
    </div>
  </section>
</div>
        </>
    );
}

export default Cuerpo;
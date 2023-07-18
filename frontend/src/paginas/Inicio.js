import React from "react";
import Encabezado from "../componentes/Encabezado";
import '../estilos/index.css'
import Pie_de_pagina from "../componentes/Pie_de_pagina";


function Inicio(){
    return(
        <>
        <Encabezado></Encabezado>
        <>
  <div className="banner-section">
    <div className="banner-section-text">
      <h1>¡La Boda De Tus Sueños!</h1>
      <h4>
        “Tu amor es la pieza de rompecabezas que le hacía falta a la historia de
        mi vida”
      </h4>
    </div>
  </div>
  <p id="parrafo">
    ¡Bienvenidos a nuestro sitio web de bodas, el destino perfecto para todas
    tus necesidades matrimoniales! En nuestra página web, te sumergirás en un
    mundo lleno de inspiración, ideas y recursos para planificar la boda de tus
    sueños. Desde el momento en que llegas a nuestra página de inicio, serás
    recibido por un diseño elegante y moderno que captura la esencia del amor y
    la celebración. Navegar por nuestra plataforma es sencillo y te sentirás
    cómodo mientras exploras las diversas secciones que hemos creado pensando en
    cada aspecto de tu gran día. Si buscas inspiración, nuestro apartado de
    "Ideas y Tendencias" te sorprenderá con las últimas tendencias en vestidos
    de novia, decoración, arreglos florales y mucho más. Además, encontrarás
    consejos útiles y trucos de expertos para ayudarte a personalizar cada
    detalle de tu boda y hacerla única.{" "}
  </p>
  <h1>
    ¡Bienvenidos a Marings, un lugar donde el amor se celebra en cada detalle!
  </h1>
  <h1>Conoce todo lo que Marings te ofrece:</h1>
  <div className="categorias">
    <div id="b1" className="block">
      <img alt="" src={require("../imagenes/img-cat2.jpg")} />
    </div>
    <div id="b2" className="block">
    <img alt="" src={require("../imagenes/img-cat1.jpg")} />
    </div>
    <div id="b3" className="block">
    <img alt="" src={require("../imagenes/img-cat4.jpeg")} />
    </div>
    <div id="b4" className="block">
    <img alt="" src={require("../imagenes/img-cat3.jpeg")} />
    </div>
    <div alt="" id="b5" className="block">
    <img alt="" src={require("../imagenes/img-cat5.jpeg")} />
    </div>
  </div>
  <h3>
    Explora nuestras categorías y sumérgete en la magia de nuestro sitio web de
    bodas. Estamos emocionados de compartir este viaje con todos ustedes y
    esperamos que disfruten cada momento tanto como nosotros.
  </h3>
</>
<Pie_de_pagina />
        </>
    );
}

export default Inicio;
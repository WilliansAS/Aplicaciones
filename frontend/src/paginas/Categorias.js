import React from "react";
import Encabezado from "../componentes/Encabezado";
import Pie_de_pagina from "../componentes/Pie_de_pagina";
import '../estilos/categorias.css'
import 'bootstrap';
import Deslizable from "../componentes/Deslizable";
import Categoria from "../componentes/Categoria";

function Categorias(){
    return(
        <>
        <Encabezado></Encabezado>
        
        <Deslizable />

  <p id="parf">
    Explora las diferentes opciones de temáticas y estilos de bodas, desde lo
    clásico y romántico hasta lo moderno y vanguardista. Descubre cómo
    incorporar elementos de diseño únicos y detalles personalizados que harán
    que tu boda sea verdaderamente especial. Desde la elección de flores y
    arreglos florales hasta la iluminación, la papelería y los detalles de la
    mesa, te ofrecemos una variedad de ideas y ejemplos para inspirarte en cada
    aspecto de tu celebración. Además, también te mantenemos actualizado sobre
    las últimas tendencias en moda nupcial. Explora las colecciones de
    diseñadores reconocidos, descubre estilos y siluetas que se adaptan a tu
    personalidad y cuerpo, y encuentra inspiración en las últimas tendencias en
    vestidos de novia, trajes de novio y vestimenta para los invitados.
  </p>

  
 <Categoria />

        <Pie_de_pagina />
        </>
    );
}

export default Categorias;
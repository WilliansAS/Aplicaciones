import React from "react";
import "../estilos/Carrito.css"; // (Si tienes un archivo de estilos específico para Compras, asegúrate de importarlo aquí)
import Encabezado from "../componentes/Encabezado";
import Deslizable from "../componentes/Deslizable";
import Texto from "../componentes/Texto";
import Pie_de_pagina from "../componentes/Pie_de_pagina";
import ContenedorP from "../componentes/ContenedorP";
import Carrito from "../componentes/Carrito";

function Compras() {
  return (
    <>
      <Encabezado />
      <Deslizable />
      <Texto />
      <h1 className="Exclamar">¡Nuestros Anillos!</h1>
      <Carrito />
      <Pie_de_pagina />
    </>
  );
}

export default Compras;
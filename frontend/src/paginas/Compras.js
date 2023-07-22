import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../estilos/Carrito.css"; // (Si tienes un archivo de estilos específico para Compras, asegúrate de importarlo aquí)
import Encabezado from "../componentes/Encabezado";
import Deslizable from "../componentes/Deslizable";
import Texto from "../componentes/Texto";
import Pie_de_pagina from "../componentes/Pie_de_pagina";
import ContenedorP from "../componentes/ContenedorP";
import Carrito from "../componentes/Carrito";

function Compras() {
  const [productos, setProductos] = useState([]);
useEffect(() => {
  axios.get('http://localhost:8082/obtenerProductos')
    .then(respuesta => {
      if (respuesta.data.Estatus === 'Exitoso') {
        setProductos(respuesta.data.Resultado);
      } else {
        console.log("Error")
      }
    })
    .catch(error => console.log(error));
}, []);
  return (
    <>
      <Encabezado />
      <Deslizable />
      <Texto />
      <h1 className="Exclamar">¡Nuestros Anillos!</h1>
      <Carrito />
      <ContenedorP />
      <Pie_de_pagina />

    </>
  );
}

export default Compras;
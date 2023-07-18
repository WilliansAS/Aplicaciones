import React, { useEffect, useState } from 'react';
import Encabezado from "../componentes/Encabezado";
import ContenedorP from "../componentes/ContenedorP";
import Pie_de_pagina from "../componentes/Pie_de_pagina";
import '../estilos/contenedorpro.css';
import axios from 'axios';

function Productos(){
    const[productos, setProductos] = useState([]);
    //Obtener todos los productos
    useEffect(()=> {
      axios.get('http://localhost:8082/obtenerProductos')
      .then(respuesta => {
          if(respuesta.data.Estatus==='Exitoso'){
              setProductos(respuesta.data.Resultado);
              
          }else{
            console.log("Error")
          }
      })
      .catch(error=>console.log(error));
  },[]); 
    return(
        <>
        <Encabezado />
        <ContenedorP />
            
        <Pie_de_pagina />
        </>
    );
}

export default Productos;
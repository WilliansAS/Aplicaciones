import React from "react";
import Encabezado from "../componentes/Encabezado";
import ContenedorP from "../componentes/ContenedorP";
import Pie_de_pagina from "../componentes/Pie_de_pagina";
import { Link } from "react-router-dom";
import Carrito from "../componentes/Carrito";
import '../estilos/contenedorpro.css';

function Productos(){
    return(
        <>
        <Encabezado />
        <ContenedorP />
        <Carrito />
            <div class="boton">
                <Link to="/Confirmacion">Comprar</Link>
            </div>
            
        <Pie_de_pagina />
        </>
    );
}

export default Productos;
import React from "react";
import Encabezado from "../componentes/Encabezado";
import Deslizable from "../componentes/Deslizable";
import Texto from "../componentes/Texto";
import Carrito from "../componentes/Carrito";
import Pie_de_pagina from "../componentes/Pie_de_pagina";
import { Link } from "react-router-dom";


function Compras() {
    return (
        <>
            <Encabezado></Encabezado>
            <Deslizable></Deslizable>
            <Texto></Texto>
            <h1 className="Exclamar">!Nuestros Anillos!</h1>
            <Carrito></Carrito>
            <div class="boton">
                <Link to="/Confirmacion">Comprar</Link>
            </div>
            <Pie_de_pagina></Pie_de_pagina>
        </>
    );
}

export default Compras;
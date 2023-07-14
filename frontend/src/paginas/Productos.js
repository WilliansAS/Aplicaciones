import React from "react";
import Encabezado from "../componentes/Encabezado";
import ContenedorP from "../componentes/ContenedorP";
import Pie_de_pagina from "../componentes/Pie_de_pagina";

import '../estilos/contenedorpro.css';

function Productos(){
    return(
        <>
        <Encabezado />
        <ContenedorP />
            
        <Pie_de_pagina />
        </>
    );
}

export default Productos;
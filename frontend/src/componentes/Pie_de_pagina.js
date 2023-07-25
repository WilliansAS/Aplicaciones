import React from "react";
import '../estilos/Pie_de_Pagina.css';

function Pie_de_pagina() {
    return (
<>
<div className="footer">
  <h5>Todos Los Derechos Reservados | SM-33 | © Marings 2023</h5>
  <img src={require("../imagenes/call.png")} />
  <img src={require("../imagenes/correo.png")} />
  <img src={require("../imagenes/whatt.png")} />
</div>
</>

    );
}

export default Pie_de_pagina;
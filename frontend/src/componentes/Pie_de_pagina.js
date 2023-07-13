import React from "react";
import '../estilos/Pie_de_Pagina.css';

function Pie_de_pagina() {
    return (
<>
<div className="footer">
  <h5>Alvarado Salazar Anthony Willians | SM-33</h5>
  <h5>Garcia Canul Guillermo De Jesus | SM-33</h5>
  <img src={require("../imagenes/call.png")} />
  <img src={require("../imagenes/correo.png")} />
  <img src={require("../imagenes/whatt.png")} />
</div>
</>

    );
}

export default Pie_de_pagina;
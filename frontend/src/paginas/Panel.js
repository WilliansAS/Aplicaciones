import React from "react";
import '../estilos/panel.css';
import Encabezado from "../componentes/Encabezado";
import { Link } from "react-router-dom";

function Panel(){
    return(
        <>
        <Encabezado />
  <div className="holy-grail-grid">
  <div className="holy-grail-left">
    <h3>Nav</h3>
    <ul>
      <li>
        <Link to="">Categorias</Link>
      </li>
      <li>
      <Link to="">Usuarios</Link>
      </li>
      <li>
      <Link to="">Productos</Link>
      </li>
    </ul>
  </div>
  <div className="holy-grail-middle">
    <h3>Dashboard</h3>
    <div className="botones">
    <Link to="/form1"><button type="button" class="btn btn-primary" id="categoria">Agregar categorias</button></Link>
    <button type="button" class="btn btn-primary">Agregar productos</button>
    <Link to="/registrar"><button type="button" class="btn btn-primary">Agregar usuarios</button></Link>

    <section>
  
    </section>
    </div>
  </div>
 

</div>

        </>
    )
}

export default Panel;
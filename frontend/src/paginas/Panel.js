import React from "react";
import '../estilos/panel.css';
import Encabezado from "../componentes/Encabezado";
import { Link } from "react-router-dom";
import Tabla2 from "../componentes/Tablausu";
import Tabla1 from "../componentes/Tablaprod";
import Tabla3 from "../componentes/Tablacat";


function Panel(){
    return(
        <>
        <Encabezado />
  <div className="holy-grail-grid">
  <div className="holy-grail-left">
    <h3>Registros</h3>
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
    </div>

    <div>
  <Tabla2 />
  <Tabla1 />
  <Tabla3 />
    </div>
    
  </div>
 

</div>

        </>
    )
}

export default Panel;
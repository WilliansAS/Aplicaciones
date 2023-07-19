import React, {useState} from "react";
import '../estilos/panel.css';
import Encabezado from "../componentes/Encabezado";
import { Link } from "react-router-dom";
import Tabla2 from "../componentes/Tablausu";
import Tabla1 from "../componentes/Tablaprod";
import Tabla3 from "../componentes/Tablacat";


function Panel(){
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [mostrarProductos, setMostrarProductos] = useState(false);
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  const handleMostrarUsuarios = () => {
      setMostrarUsuarios(true);
      setMostrarProductos(false);
      setMostrarCategorias(false);
  };

  const handleMostrarProductos = () => {
      setMostrarUsuarios(false);
      setMostrarProductos(true);
      setMostrarCategorias(false);
  };

  const handleMostrarCategorias = () => {
      setMostrarUsuarios(false);
      setMostrarProductos(false);
      setMostrarCategorias(true);
  };
    return(
        <>
        <Encabezado />
  <div className="holy-grail-grid">
  <div className="holy-grail-left">
    <h3>Registros</h3>
    <ul>
    <li>
        <Link to="" onClick={handleMostrarCategorias}>Categorias</Link>
    </li>
    <li>
        <Link to="" onClick={handleMostrarUsuarios}>Usuarios</Link>
    </li>
    <li>
        <Link to="" onClick={handleMostrarProductos}>Productos</Link>
    </li>
</ul>
  </div>
  <div className="holy-grail-middle">
    <div id="menu"><h3>Bienvenido Al Dashboard</h3></div>

  <div className="contenedor-principal">
  <div className="contenedor-interno">
    <span className="icono">👤</span>
    <h2 className="titulo">Usuarios</h2>
    <p className="texto2">Este es el texto del Contenedor 1.</p>
    <button className="boton">Agregar</button>
    <button className="boton">Eliminar</button>
  </div>
  <div className="contenedor-interno">
    <span className="icono">🛒</span>
    <h2 className="titulo">Productos</h2>
    <p className="texto2">Este es el texto del Contenedor 2.</p>
    <button className="boton">Agregar</button>
    <button className="boton">Eliminar</button>
  </div>
  <div className="contenedor-interno">
    <span className="icono">📝</span>
    <h2 className="titulo">Categorias</h2>
    <p className="texto2">Este es el texto del Contenedor 3.</p>
    <button className="boton">Agregar</button>
    <button className="boton">Eliminar</button>
  </div>
</div>

<div>
{mostrarUsuarios && <Tabla2 />} {/* Muestra Tabla2 cuando mostrarUsuarios es true */}
{mostrarProductos && <Tabla1 />} {/* Muestra Tabla1 cuando mostrarProductos es true */}
{mostrarCategorias && <Tabla3 />} {/* Muestra Tabla3 cuando mostrarCategorias es true */}
</div>

  </div>
 


</div>

        </>
    )
}

export default Panel;
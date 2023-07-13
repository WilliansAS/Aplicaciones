import react from 'react';
import '../estilos/estilo.css';
import { Link } from 'react-router-dom';

function Encabezado() {
    return (
<>
<nav>
  <ul>
    <li>
      <img src={require('../imagenes/icon_eyelash.png')} className="photo" alt="Logo" />
    </li>
    <li className="photo_and_name_of_company">
      {" "}
      <Link to="/">Marings</Link>
    </li>
    <li>
      <Link to="/">Inicio</Link>
    </li>
    <li>
      <Link to="/productos">Productos</Link>
    </li>
    <li>
      <Link to="/compras">Compras</Link>
    </li>
    <li>
      <Link to="/nosotros">Nosotros</Link>
    </li>
    <li>
      <Link to="/categorias">Categorías</Link>
    </li>
    <li>
      <Link to="/contactos">Contactos</Link>
    </li>
  </ul>
</nav>
</>

    );
}

export default Encabezado;
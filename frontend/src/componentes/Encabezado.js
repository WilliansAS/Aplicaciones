import React, { useState } from 'react';
import '../estilos/encabezado.css';
import { Link, useNavigate } from 'react-router-dom';

function Encabezado() {
  const login = localStorage.getItem('usuario');
  const navegacion = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const salir = () => {
    localStorage.clear();
    navegacion('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={require('../imagenes/icon_eyelash.png')} className="photo" alt="Logo" />
          <span className="logo-text navbar-link">Marings</span>
        </Link>
      </div>
      <nav className={menuOpen ? 'menu-open' : ''}>
        <div className="menu-toggle" onClick={toggleMenu}></div>
        <ul className="navbar">
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
          {login ? (
            <li>
              <a onClick={salir}>Salir</a>
            </li>
          ) : (
            <li>
              <Link to="/acceso">Acceder</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Encabezado;
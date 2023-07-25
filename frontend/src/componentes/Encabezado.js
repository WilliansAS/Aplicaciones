import React, { useState } from 'react';
import '../estilos/encabezado.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from "../context/CarritoContext"; // Importamos el contexto del carrito

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

  const { carrito } = useCarrito(); // Obtenemos el estado del carrito del contexto

  // Obtenemos la cantidad total de productos en el carrito
  const totalProductosEnCarrito = carrito.reduce((total, producto) => total + producto.cantidad, 0);

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
              <Link to="/" onClick={salir}>Salir</Link>
            </li>
          ) : (
            <li>
              <Link to="/acceso">Acceder</Link>
            </li>
          )}
          {/* Mostramos la cantidad de productos en el carrito */}
          {login ? (
            <li>
            <Link to="/carr">
              Carrito ({totalProductosEnCarrito})
            </Link>
          </li>
          ) : (
            <li>
              <Link to="/carr">Carrito</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Encabezado;
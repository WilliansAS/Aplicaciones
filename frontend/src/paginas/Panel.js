import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/panel.css';
import { Link, useNavigate } from "react-router-dom";
import Tabla2 from "../componentes/Tablausu";
import Tabla1 from "../componentes/Tablaprod";
import Tabla3 from "../componentes/Tablacat";
import Dashregistro from "../componentes/Formus";
import Formulario1 from '../componentes/Formcat';
import Formulario2 from '../componentes/Formprod';
import Usuarios from '../componentes/Dashusers';
import Dashprod from '../componentes/Dashprod';
import Dashcat from '../componentes/Dashcat';
import { useCarrito } from "../context/CarritoContext"; 
import Carrito from '../componentes/Carrito';


function Panel(){
  const { carrito } = useCarrito(); // Obtenemos el estado del carrito del contexto
  // Obtenemos la cantidad total de productos en el carrito
  const totalProductosEnCarrito = carrito.reduce((total, producto) => total + producto.cantidad, 0);

  //Mostrar registros
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [mostrarProductos, setMostrarProductos] = useState(false);
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  const handleMostrarUsuarios = () => {
      setMostrarUsuarios(true);
      setMostrarProductos(false);
      setMostrarCategorias(false);
      setMostrarFormUs(false);
      setMostrarFormCat(false);
      setMostrarFormProd(false);
      setMostrarContUs(false);
      setMostrarContProd(false);
      setMostrarContCat(false);
      setMostrarCarrito(false);
  };

  const handleMostrarProductos = () => {
      setMostrarUsuarios(false);
      setMostrarProductos(true);
      setMostrarCategorias(false);
      setMostrarFormUs(false);
      setMostrarFormCat(false);
      setMostrarFormProd(false);
      setMostrarContUs(false);
      setMostrarContProd(false);
      setMostrarContCat(false);
      setMostrarCarrito(false);
  };

  const handleMostrarCategorias = () => {
      setMostrarUsuarios(false);
      setMostrarProductos(false);
      setMostrarCategorias(true);
      setMostrarFormUs(false);
      setMostrarFormCat(false);
      setMostrarFormProd(false);
      setMostrarContUs(false);
      setMostrarContProd(false);
      setMostrarContCat(false);
      setMostrarCarrito(false);
  };

   //Mostrar contenedores
   const [mostrarContUs, setMostrarContUs] = useState(false);
   const [mostrarContProd, setMostrarContProd] = useState(false);
   const [mostrarContCat, setMostrarContCat] = useState(false);

   const handleMostrarContUS = () =>{
    setMostrarContUs(true);
    setMostrarContProd(false);
    setMostrarContCat(false);
    setMostrarUsuarios(false);
    setMostrarProductos(false);
    setMostrarCategorias(false);
    setMostrarFormUs(false);
    setMostrarFormCat(false);
    setMostrarFormProd(false);
    setMostrarCarrito(false);
   }

   const handleMostrarContProd = () =>{
    setMostrarContUs(false);
    setMostrarContProd(true);
    setMostrarContCat(false);
    setMostrarUsuarios(false);
    setMostrarProductos(false);
    setMostrarCategorias(false);
    setMostrarFormUs(false);
    setMostrarFormCat(false);
    setMostrarFormProd(false);
    setMostrarCarrito(false);
   }

   const handleMostrarContCat = () =>{
    setMostrarContUs(false);
    setMostrarContProd(false);
    setMostrarContCat(true);
    setMostrarUsuarios(false);
    setMostrarProductos(false);
    setMostrarCategorias(false);
    setMostrarFormUs(false);
    setMostrarFormCat(false);
    setMostrarFormProd(false);
    setMostrarCarrito(false);
   }


  //Mostrar formularios
  const [mostrarFormUs, setMostrarFormUs] = useState(false);
  const [mostrarFormProd, setMostrarFormProd] = useState(false);
  const [mostrarFormCat, setMostrarFormCat] = useState(false);

  const handleMostrarFormUs = () => {
    setMostrarFormUs(true);
    setMostrarFormProd(false);
    setMostrarFormCat(false);
    setMostrarUsuarios(false);
    setMostrarProductos(false);
    setMostrarCategorias(false);
    setMostrarContUs(false);
    setMostrarContProd(false);
    setMostrarContCat(false);
    setMostrarCarrito(false);
};

const handleMostrarFormProd = () => {
  setMostrarFormUs(false);
  setMostrarFormProd(true);
  setMostrarFormCat(false);
  setMostrarUsuarios(false);
  setMostrarProductos(false);
  setMostrarCategorias(false);
  setMostrarContUs(false);
  setMostrarContProd(false);
  setMostrarContCat(false);
  setMostrarCarrito(false);
};

const handleMostrarFormCat = () => {
  setMostrarFormUs(false);
  setMostrarFormProd(false);
  setMostrarFormCat(true);
  setMostrarUsuarios(false);
  setMostrarProductos(false);
  setMostrarCategorias(false);
  setMostrarContUs(false);
  setMostrarContProd(false);
  setMostrarContCat(false);
  setMostrarCarrito(false);
};

const [mostrarCarrito, setMostrarCarrito] = useState(false);

const handleMostrarCarrito = () => {
  setMostrarCarrito(true);
  setMostrarFormUs(false);
  setMostrarFormProd(false);
  setMostrarFormCat(false );
  setMostrarUsuarios(false);
  setMostrarProductos(false);
  setMostrarCategorias(false);
  setMostrarContUs(false);
  setMostrarContProd(false);
  setMostrarContCat(false);
};

//Contador de usuarios
const[numusuarios, setNumusuarios] = useState([]);
useEffect(()=> {
    axios.get('http://localhost:8082/numUsuarios')
    .then(respuesta => {
        if(respuesta.data.Estatus==='Exitoso'){
            setNumusuarios(respuesta.data.Resultado);
            
        }else{
          console.log("Error")
        }
    })
    .catch(error=>console.log(error));
},[]); 

//Contador de productos
const[numproductos, setNumproductos] = useState([]);
useEffect(()=> {
    axios.get('http://localhost:8082/numProductos')
    .then(respuesta => {
        if(respuesta.data.Estatus==='Exitoso'){
            setNumproductos(respuesta.data.Resultado);
            
        }else{
          console.log("Error")
        }
    })
    .catch(error=>console.log(error));
},[]); 

//Contador de categorias
const[numcategorias, setNumcategorias] = useState([]);
useEffect(()=> {
    axios.get('http://localhost:8082/numCategorias')
    .then(respuesta => {
        if(respuesta.data.Estatus==='Exitoso'){
            setNumcategorias(respuesta.data.Resultado);
            
        }else{
          console.log("Error")
        }
    })
    .catch(error=>console.log(error));
},[]); 

//Actualizar conteo de usuarios
const handleActualizarUsuarios = (cantidad) => {
  setNumusuarios(cantidad);
};

//Actualizar conteo de productos
const handleActualizarProductos = (cantidad) => {
  setNumproductos(cantidad);
};

//Actualizar conteo de categorias
const handleActualizarCategorias = (cantidad) => {
  setNumcategorias(cantidad);
};

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

    return(
        <>
  {/*Encabezado*/}
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
          <Link to="" onClick={handleMostrarCategorias}>Categorias</Link>
          </li>
            <li>
                <Link to="" onClick={handleMostrarUsuarios}>Usuarios</Link>
            </li>
            <li>
                <Link to="" onClick={handleMostrarProductos}>Productos</Link>
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
          
        </ul>
      </nav>
    </header>
  

  {/*Contenedores de opciones*/}
  <div className="contenedor-principal">
  {numusuarios.map((usuarios, index) =>{
  return<>
  <div className="contenedor-interno">
    <span className="icono">👤</span>
    <h2 className="titulo">Usuarios</h2>
    <p className="texto2">Usuarios registrados:</p>
    <h3>{usuarios.Usuarios}</h3>
    <Link to="" onClick={handleMostrarFormUs}><button className="boton">Agregar</button></Link>
    <Link to="" onClick={handleMostrarContUS}><button className="boton">Gestionar</button></Link>
  </div>
  </>
   })}
 
 {numproductos.map((productos, index) =>{
  return<>
  <div className="contenedor-interno">
    <span className="icono">🛒</span>
    <h2 className="titulo">Productos</h2>
    <p className="texto2">Productos registrados:</p>
    <h3>{productos.Productos}</h3>
    <Link to="" onClick={handleMostrarFormProd}><button className="boton">Agregar</button></Link>
    <Link to="" onClick={handleMostrarContProd}><button className="boton">Gestionar</button></Link>
  </div>
  </>
   })}
 
 {numcategorias.map((categorias, index) =>{
  return<>
  <div className="contenedor-interno">
    <span className="icono">📝</span>
    <h2 className="titulo">Categorias</h2>
    <p className="texto2">Categorias registradas:</p>
    <h3>{categorias.Categorias}</h3>
    <Link to="" onClick={handleMostrarFormCat}><button className="boton">Agregar</button></Link>
    <Link to="" onClick={handleMostrarContCat}><button className="boton">Gestionar</button></Link>
  </div>
  </>
   })}

  <div className="contenedor-interno">
    <span className="icono">🛒</span>
    <h2 className="titulo">Pedidos</h2>
    <p className="texto2">Pedidos registrados:</p>
    <h3>{totalProductosEnCarrito}</h3>
    <Link to="" onClick={handleMostrarCarrito}><button className="boton">Gestionar</button></Link>
  </div>
</div>


<div className="holy-grail-middle">
  <div id="menu"><h3>Bienvenido Al Dashboard</h3></div>

<div>
{mostrarUsuarios && <Tabla2 />} {/* Muestra Tabla2 cuando mostrarUsuarios es true */}
{mostrarProductos && <Tabla1 />} {/* Muestra Tabla1 cuando mostrarProductos es true */}
{mostrarCategorias && <Tabla3 />} {/* Muestra Tabla3 cuando mostrarCategorias es true */}
{mostrarFormUs && <Dashregistro onRegistroExitoso={handleActualizarUsuarios} />} {/* Muestra Tabla3 cuando mostrarCategorias es true */}
{mostrarFormCat && <Formulario1 onRegistroExitoso={handleActualizarCategorias}/>}
{mostrarFormProd && <Formulario2 onRegistroExitoso={handleActualizarProductos}/>}
{mostrarContUs && <Usuarios onEliminacionExitoso={handleActualizarUsuarios} />}
{mostrarContProd && <Dashprod  onEliminacionExitoso={handleActualizarProductos}/>}
{mostrarContCat && <Dashcat onEliminacionExitoso={handleActualizarCategorias}/>}
{mostrarCarrito && <Carrito />}


</div>
 
  </div>

        </>
    )
}

export default Panel;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/panel.css';
import Encabezado from "../componentes/Encabezado";
import { Link } from "react-router-dom";
import Tabla2 from "../componentes/Tablausu";
import Tabla1 from "../componentes/Tablaprod";
import Tabla3 from "../componentes/Tablacat";
import Dashregistro from "../componentes/Formus";


function Panel(){
  //Mostrar registros
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

  //Mostrar formularios
  const [mostrarFormUs, setMostrarFormUs] = useState(false);
  const [mostrarFormProd, setMostrarFormProd] = useState(false);
  const [mostrarFormCat, setMostrarFormCat] = useState(false);

  const handleMostrarFormUs = () => {
    setMostrarFormUs(true);
    setMostrarFormProd(false);
    setMostrarFormCat(false);
};

const handleMostrarFormProd = () => {
  setMostrarFormUs(false);
  setMostrarFormProd(true);
  setMostrarFormCat(false);
};

const handleMostrarFormCat = () => {
  setMostrarFormUs(false);
  setMostrarFormProd(false);
  setMostrarFormCat(true);
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
  {numusuarios.map((usuarios, index) =>{
  return<>
  <div className="contenedor-interno">
    <span className="icono">👤</span>
    <h2 className="titulo">Usuarios</h2>
    <p className="texto2">Usuarios registrados: {usuarios.Usuarios}</p>
    <Link to="" onClick={handleMostrarFormUs}><button className="boton">Agregar</button></Link>
    <button className="boton">Eliminar</button>
  </div>
  </>
   })}
 

 {numproductos.map((productos, index) =>{
  return<>
  <div className="contenedor-interno">
    <span className="icono">🛒</span>
    <h2 className="titulo">Productos</h2>
    <p className="texto2">Productos registrados: {productos.Productos}</p>
    <button className="boton">Agregar</button>
    <button className="boton">Eliminar</button>
  </div>
  </>
   })}

  
 {numcategorias.map((categorias, index) =>{
  return<>
  <div className="contenedor-interno">
    <span className="icono">📝</span>
    <h2 className="titulo">Categorias</h2>
    <p className="texto2">Categorias registrados: {categorias.Categorias}</p>
    <button className="boton">Agregar</button>
    <button className="boton">Eliminar</button>
  </div>
  </>
   })}

  <div className="contenedor-interno">
    <span className="icono">🛒</span>
    <h2 className="titulo">Pedidos</h2>
    <p className="texto2">Contenedor 4.</p>
    <button className="boton">Agregar</button>
    <button className="boton">Eliminar</button>
  </div>
</div>

<div>
{mostrarUsuarios && <Tabla2 />} {/* Muestra Tabla2 cuando mostrarUsuarios es true */}
{mostrarProductos && <Tabla1 />} {/* Muestra Tabla1 cuando mostrarProductos es true */}
{mostrarCategorias && <Tabla3 />} {/* Muestra Tabla3 cuando mostrarCategorias es true */}
{mostrarFormUs && <Dashregistro />} {/* Muestra Tabla3 cuando mostrarCategorias es true */}
</div>
 
  </div>
 
 

</div>

        </>
    )
}

export default Panel;
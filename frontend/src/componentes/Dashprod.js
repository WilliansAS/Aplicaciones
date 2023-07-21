import React, { useEffect, useState } from 'react';
import '../estilos/productos.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Dashprod({ onEliminacionExitoso }){

  const[productos, setProductos] = useState([]);
    const [error, setError] = useState();
      const navegacion = useNavigate();

  //Obtener todos los productos
  useEffect(()=> {
    axios.get('http://localhost:8082/obtenerProductos')
    .then(respuesta => {
        if(respuesta.data.Estatus==='Exitoso'){
            setProductos(respuesta.data.Resultado);
            
        }else{
          console.log("Error")
        }
    })
    .catch(error=>console.log(error));
},[]); 

//Eliminar Productos
const eliminarProducto = (id) => {
  const confirmacion = window.confirm('¿Estás seguro de eliminar este producto?');
      if (confirmacion) {
  axios
    .delete(`http://localhost:8082/eliminarProducto/${id}`)
    .then((respuesta) => {
      if (respuesta.data.Estatus === "CORRECTO") {
        navegacion('/panel')
        alert('¡Se eliminó el producto!');
        setProductos((prevProductos) => prevProductos.filter((producto) => producto.id_producto !== id));
      // Aquí llamamos a la función para actualizar el conteo de usuarios
      axios.get('http://localhost:8082/numProductos')
        .then(respuesta => {
          if (respuesta.data.Estatus === 'Exitoso') {
            // Aquí puedes hacer algo con el nuevo conteo de usuarios, si es necesario
            console.log(respuesta.data.Resultado);
            // Llamamos a la función pasada desde el componente padre para actualizar el conteo de usuarios allí
            onEliminacionExitoso(respuesta.data.Resultado);
          } else {
            console.log("Error");
          }
        })
        .catch(error => console.log(error));
      } else {
        setError(respuesta.data.Error);
      }
    })
    .catch(error => console.log(error));
  }
}

    return(
      <>
       <h1>Productos</h1>
      <div className="contprod">
      {productos.map((elproducto, index) =>{
        return<>

        <div className="column2" key={elproducto.id_producto}>
          <div className="product-container2">
            <img className="product-image2" src={require("../imagenes/"+elproducto.imagen)} alt="Producto 1" />
            <p>Nombre imagen: {elproducto.imagen}</p>
            <p>ID: {elproducto.id_producto}</p>
            <p>ID Categoria: {elproducto.id_categoria_id}</p>
            <h4>{elproducto.nombre_producto}</h4>
            <div className='texto3'>
            <p>{elproducto.descripcion_producto}</p>
            </div>
            <h5>$ {elproducto.precio_unitario}</h5>
            <button type="button" class="btn btn-success" onClick={() => eliminarProducto(elproducto.id_producto)}>Eliminar</button>
          </div>
        </div>

      </>
    
      })}
        </div>          
        
       </>
      
    );
}

export default Dashprod;
import React, { useEffect, useState } from 'react';
import '../estilos/contenedorpro.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function ContenedorP(){
  const[productos, setProductos] = useState([]);
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
  

//Obtener los productos por categoria
const { id } = useParams();
useEffect(()=> {
    axios.get(`http://localhost:8082/obtenerProductos/${id}`)
    .then(respuesta => {
        if(respuesta.data.Estatus==='Exitoso'){
            setProductos(respuesta.data.Resultado);
            
        }else{
          console.log("Error")
        }
    })
    .catch(error=>console.log(error));
},[id]); 

    return(
      <>
      <div className="container">
      {productos.map((elproducto, index) =>{
        return<>

        <div className="column" key={elproducto.id_producto}>
          <div className="product-container" >
            <img className="product-image" src={require("../imagenes/"+elproducto.imagen)} alt="Producto 1" />
            <h4>{elproducto.nombre_producto}</h4>
            <div className='texto'>
            <p>{elproducto.descripcion_producto}</p>
            </div>
            <h5>$ {elproducto.precio_mayoria}</h5>
            <button type="button" class="btn btn-success">Comprar</button>
          </div>
        </div>

      </>
    
      })}
        </div>          
        
       </>
      
    );
}

export default ContenedorP;
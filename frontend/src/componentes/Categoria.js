import React, { useEffect, useState } from 'react';
import '../estilos/categorias.css';
import { Link } from "react-router-dom";
import axios from 'axios';


function Categoria(){
  //Obtener las categorias
    const[categorias, setCategoria] = useState([]);
  useEffect(()=> {
      axios.get('http://localhost:8082/obtenerCategorias')
      .then(respuesta => {
          if(respuesta.data.Estatus==='Exitoso'){
              setCategoria(respuesta.data.Resultado);
              
          }else{
            console.log("Error")
          }
      })
      .catch(error=>console.log(error));
  },[]); 

  

    return(
        <>
        <div className='container'>
    {categorias.map((lacategoria, index) =>{
        return<>
    
    <div className="inner-container" key={lacategoria.id_categoria}>
      <img className="image" src={require("../imagenes/"+lacategoria.imagen)} alt="Imagen 1" />
      <Link to={"/Salones/"+lacategoria.id_categoria}><h3>{lacategoria.nombre_categoria}</h3></Link>
      <p>
      {lacategoria.descripcion_categoria}
      </p>
    </div>
    
    </>
    
})}
  </div>
 </>
    );
}

export default Categoria;
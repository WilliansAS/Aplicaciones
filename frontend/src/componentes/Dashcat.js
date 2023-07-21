import React, { useEffect, useState } from 'react';
import '../estilos/dashcat.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Dashcat({ onEliminacionExitoso }){
  //Obtener las categorias
    const[categorias, setCategoria] = useState([]);
    const [error, setError] = useState();
    const navegacion = useNavigate();

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

  //Eliminar Categorias
const eliminarCategoria = (id) => {
  const confirmacion = window.confirm('¿Estás seguro de eliminar esta categoria?');
      if (confirmacion) {
  axios
    .delete(`http://localhost:8082/eliminarCategoria/${id}`)
    .then((respuesta) => {
      if (respuesta.data.Estatus === "CORRECTO") {
        navegacion('/panel')
        alert('¡Se eliminó la categoría!');
        setCategoria((prevCategorias) => prevCategorias.filter((categoria) => categoria.id_categoria !== id));
      // Aquí llamamos a la función para actualizar el conteo de usuarios
      axios.get('http://localhost:8082/numCategorias')
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
        <div className='container'>
    {categorias.map((lacategoria, index) =>{
        return<>
    
    <div className="inner-container2" key={lacategoria.id_categoria}>
      <img className="image2" src={require("../imagenes/"+lacategoria.imagen)} alt="Imagen 1" />
      <h5>{lacategoria.imagen}</h5>
      <h5>{lacategoria.id_categoria}</h5>
      <h3>{lacategoria.nombre_categoria}</h3>
     <div> <p>
      {lacategoria.descripcion_categoria}
      </p></div>
    <button className="boton" onClick={() => eliminarCategoria(lacategoria.id_categoria)}>Eliminar</button>
    </div>
    
    </>
    
})}
  </div>
 </>
    );
}

export default Dashcat;
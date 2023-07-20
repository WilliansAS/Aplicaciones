import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tabla3(){
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
        <table className="table table-striped">
        <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre Categoria</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Imagen</th>
    </tr>
  </thead>
        {categorias.map((lacategoria, index) =>{
        return<>
  
  <tbody>
    <tr>
      <th scope="row">{lacategoria.id_categoria}</th>
      <td>{lacategoria.nombre_categoria}</td>
      <td>{lacategoria.descripcion_categoria}</td>
      <td>{lacategoria.imagen}</td>
    </tr>
  </tbody>

        </>
            
})}
</table>
</>
    );
}

export default Tabla3;
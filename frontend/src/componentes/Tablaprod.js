import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tabla1(){
    const[productos, setProductos] = useState([]);
  //Obtener todos los productos
  useEffect(()=> {
    axios.get('http://localhost:8082/obtenerProductos/')
    .then(respuesta => {
        if(respuesta.data.Estatus==='Exitoso'){
            setProductos(respuesta.data.Resultado);
            
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
      <th scope="col">Nombre Producto</th>
      <th scope="col">Precio Unitario</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Imagen</th>
      <th scope="col">Categoria</th>
    </tr>
  </thead>
        {productos.map((elproducto, index) =>{
        return<>
  
  <tbody>
    <tr>
      <th scope="row">{elproducto.id_producto}</th>
      <td>{elproducto.nombre_producto}</td>
      <td>{elproducto.precio_unitario}</td>
      <td>{elproducto.descripcion_producto}</td>
      <td>{elproducto.imagen}</td>
      <td>{elproducto.id_categoria_id}/</td>
    </tr>
  </tbody>

        </>
            
})}
</table>
</>
    );
}

export default Tabla1;
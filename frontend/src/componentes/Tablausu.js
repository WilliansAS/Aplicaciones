import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tabla2(){
  const[usuarios, setUsuario] = useState([]);
  useEffect(()=> {
      axios.get('http://localhost:8082/obtenerUsuarios')
      .then(respuesta => {
          if(respuesta.data.Estatus==='Exitoso'){
              setUsuario(respuesta.data.Resultado);
              
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
      <th scope="col">Nombre</th>
      <th scope="col">Numero</th>
      <th scope="col">Direccion</th>
      <th scope="col">Correo</th>
    </tr>
  </thead>
        {usuarios.map((elusuario, index) =>{
        return<>
  
  <tbody>
    <tr>
      <th scope="row">{elusuario.id_usuario}</th>
      <td>{elusuario.nombre_usuario}</td>
      <td>{elusuario.numero_telefono}</td>
      <td>{elusuario.direccion}</td>
      <td>{elusuario.correo}</td>
    </tr>
  </tbody>

        </>
            
})}
</table>
</>
    );
}

export default Tabla2;
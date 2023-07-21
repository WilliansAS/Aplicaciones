import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../estilos/usuarios.css";

function Usuarios({ onEliminacionExitoso }){
  const [error, setError] = useState();
    const navegacion = useNavigate();
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

    //Eliminar Productos
    const eliminarUsuario = (id) => {
      // Mostrar el mensaje de confirmación antes de eliminar el usuario
      const confirmacion = window.confirm('¿Estás seguro de eliminar este usuario?');
      if (confirmacion) {
        axios
          .delete(`http://localhost:8082/eliminarUsuario/${id}`)
          .then((respuesta) => {
            if (respuesta.data.Estatus === "CORRECTO") {
              navegacion('/panel')
              alert('¡Se eliminó el usuario!');
              setUsuario((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id_usuario !== id));
              // Aquí llamamos a la función para actualizar el conteo de usuarios
              axios.get('http://localhost:8082/numUsuarios')
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
        <div className="contenido">
        {usuarios.map((elusuario, index) => {
        return<>
  <div className="contus">
    <div className="textous">ID: {elusuario.id_usuario}</div>
    <div className="textous">Usuario: {elusuario.nombre_usuario}</div>
    <div className="textous">Numero Telefono: {elusuario.numero_telefono}</div>
    <div className="textous">Direccion: {elusuario.direccion}</div>
    <div className="textous">Correo Electronico: {elusuario.correo}</div>
    <div className="textous">Contraseña: {elusuario.contrasenia}</div>
    <div className="botoneus">
    <button type="button" class="btonus" onClick={() => eliminarUsuario(elusuario.id_usuario)}>Eliminar</button>
      
    </div>
  </div>
  </>
   })}
</div>
        </>
    );

}

export default Usuarios;
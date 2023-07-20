import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../estilos/registro.css';

function Formulario1({ onRegistroExitoso }){
    const [campos, setCampos] = useState({
        nombre_categoria: "",
        descripcion_categoria: "",
        imagen: ""
    });

    const [error, setError] = useState();
    const navegacion = useNavigate();

    const registrar = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/registrarcat', campos)
            .then(respuesta => {
                if (respuesta.data.Estatus === "CORRECTO") {
                    navegacion('/panel')
                    alert('¡Se agregó una nueva categoria!');
                    setCampos({
                      nombre_categoria: "",
                      descripcion_categoria: "",
                      imagen: ""
                    });
                 // Aquí llamamos a la función para actualizar el conteo de usuarios
          axios.get('http://localhost:8082/numCategorias')
          .then(respuesta => {
            if (respuesta.data.Estatus === 'Exitoso') {
              onRegistroExitoso(respuesta.data.Resultado);
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

    return (
        <>
            <form onSubmit={registrar} className="registro">
                <h1 className="py-4">Registro Categorías</h1>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Nombre de categoría"
                        name="nombre_categoria"
                        onChange={e => setCampos({ ...campos, nombre_categoria: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Descripcion de categoría"
                        name="descripcion_categoria"
                        onChange={e => setCampos({ ...campos, descripcion_categoria: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Agrega una imagen"
                        name="imagen"
                        onChange={e => setCampos({ ...campos, imagen: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>
                <button type="submit" className="btn bg-marino w-100 rounded-10 ">
                    Ingresar
                </button>
            </form>
        </>
    );
}

export default Formulario1;
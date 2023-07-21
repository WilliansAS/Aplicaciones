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

        // Validar campos requeridos
    if (!campos.nombre_categoria || !campos.descripcion_categoria ||  !campos.imagen) {
        setError("Por favor, complete todos los campos.");
        return;
      }
  
      setError(""); // Limpiar mensaje de error
  
      const formData = new FormData();
      formData.append("nombre_categoria", campos.nombre_categoria);    
      formData.append("descripcion_categoria", campos.descripcion_categoria);
      formData.append("imagen", campos.imagen);
    

        axios.post('http://localhost:8082/registrarcat', formData)
            .then(respuesta => {
                if (respuesta.data.Estatus === "CORRECTO") {
                    navegacion('/panel')
                    alert('¡Se agregó una nueva categoría!');
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
                        type="file"
                        placeholder="Agrega una imagen"
                        name="imagen"
                        accept="image/*"
                        className="form-control rounded-21"
                        required
                        onChange={(e) =>
                          setCampos({ ...campos, imagen: e.target.files[0] })
                        }
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
import React, { useState } from "react";
import axios from 'axios';  
import { useNavigate } from "react-router-dom";
import '../estilos/registro.css';

function Formulario2({ onRegistroExitoso }) {

    const [campos, setCampos] = useState({
        nombre_producto: "",
        precio_unitario: "",
        descripcion_producto: "",
        imagen: "",
        id_categoria_id: ""
    });

    const [error, setError] = useState();
    const navegacion = useNavigate();

    
  const registrar = (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!campos.nombre_producto || !campos.precio_unitario || !campos.descripcion_producto || !campos.imagen || !campos.id_categoria_id) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    setError(""); // Limpiar mensaje de error

    const formData = new FormData();
    formData.append("nombre_producto", campos.nombre_producto);
    formData.append("precio_unitario", campos.precio_unitario);
    formData.append("descripcion_producto", campos.descripcion_producto);
    formData.append("imagen", campos.imagen);
    formData.append("id_categoria_id", campos.id_categoria_id);

    axios.post('http://localhost:8082/registrarprod', formData)
      .then(respuesta => {
        if (respuesta.data.Estatus === "CORRECTO") {
          navegacion('/panel');
          alert('¡Se agregó un nuevo producto!');
          setCampos({
            nombre_producto: "",
            precio_unitario: "",
            descripcion_producto: "",
            imagen: "",
            id_categoria_id: ""
          });
          // Aquí llamamos a la función para actualizar el conteo de usuarios
          axios.get('http://localhost:8082/numProductos')
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
                <h1 className="py-4">Registro Productos</h1>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        name="nombre_producto"
                        onChange={e => setCampos({ ...campos, nombre_producto: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Precio del producto"
                        name="precio_unitario"
                        onChange={e => setCampos({ ...campos, precio_unitario: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>

                
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Descripcion del producto"
                        name="descripcion_producto"
                        onChange={e => setCampos({ ...campos, descripcion_producto: e.target.value })}
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
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Categoria del producto"
                        name="id_categoria_id"
                        onChange={e => setCampos({ ...campos, id_categoria_id: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>
                <button type="submit">
                    Ingresar
                </button>
            </form>
        </>
    );
}

export default Formulario2;
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function CategoriaEdit({ categoriaId, onEditSuccess }) {
  // State para almacenar los datos de la categoría
  const [categoria, setCategoria] = useState({});
  // State para mostrar un mensaje de error
  const [error, setError] = useState();
  const navegacion = useNavigate();

  // Obtener los datos de la categoría para cargarlos en el formulario
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8082/obtenerCategorias/${id}`)
      .then(respuesta => {
        if (respuesta.data.Estatus === 'Exitoso') {
          setCategoria(respuesta.data.Resultado);
        } else {
          console.log("Error")
        }
      })
      .catch(error => console.log(error));
  }, [id]);

  // Función para manejar la edición de la categoría
  const editarCategoria = (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!categoria.nombre_categoria || !categoria.descripcion_categoria || !categoria.imagen) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    setError(""); // Limpiar mensaje de error

    const formData = new FormData();
    formData.append("nombre_categoria", categoria.nombre_categoria);
    formData.append("descripcion_categoria", categoria.descripcion_categoria);
    formData.append("imagen", categoria.imagen);
    
    axios.put(`http://localhost:8082/actualizarCategoria/${id}`, formData)
    .then(respuesta => {
      if (respuesta.data.Estatus === "CORRECTO") {
        navegacion('/panel');
        alert('¡Se actualizó la categoría!');
        onEditSuccess();
      } else {
        setError(respuesta.data.Error);
      }
    })
    .catch(error => console.log(error));
}

  return (
    <form onSubmit={editarCategoria} className="registro">
      <h1 className="py-4">Editar Categoría</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Nombre de la categoría"
          name="nombre_categoria"
          value={categoria.nombre_categoria || ''}
          onChange={e => setCategoria({ ...categoria, nombre_categoria: e.target.value })}
          className="form-control rounded-21"
        />
      </div>

      <div className="mb-3">
        <textarea
          placeholder="Descripción de la categoría"
          name="descripcion_categoria"
          value={categoria.descripcion_categoria || ''}
          onChange={e => setCategoria({ ...categoria, descripcion_categoria: e.target.value })}
          className="form-control rounded-21"
        /> 
      </div>

      <div className="mb-3">
        <input
          type="file"
          name="imagen"
          accept="image/*"
          className="form-control rounded-21"
          required
          onChange={(e) => setCategoria({ ...categoria, imagen: e.target.files[0] })}
        />
      </div>
      
      <button type="submit">
        Guardar Cambios
      </button>
    </form>
  );
}

export default CategoriaEdit;

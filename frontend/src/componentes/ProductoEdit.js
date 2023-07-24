import React, { useEffect, useState } from "react";
import axios from 'axios';  
import { useParams, useNavigate } from "react-router-dom";
import '../estilos/registro.css';

function ProductoEdit({ onEditSuccess }) {
    const navegacion = useNavigate();

    const [producto, setProducto] = useState({
        nombre_producto: "",
        precio_unitario: "",
        descripcion_producto: "",
        imagen: "",
        id_categoria_id: ""
    });

    const [error, setError] = useState();
    
    const { id } = useParams();
    useEffect(() => {
      // Obtener los datos del producto para cargarlos en el formulario
      axios.get(`http://localhost:8082/obtenerProducto/${id}`)
        .then(respuesta => {
          if (respuesta.data.Estatus === "Exitoso") {
            setProducto(respuesta.data.Resultado);
          } else {
            console.log("Error");
          }
        })
        .catch(error => console.log(error));
    }, [id]);

    const editarProducto = (e) => {
        e.preventDefault();

        // Validar campos requeridos
        if (!producto.nombre_producto || !producto.precio_unitario || !producto.descripcion_producto || !producto.imagen || !producto.id_categoria_id) {
          setError("Por favor, complete todos los campos.");
          return;
        }

        setError(""); // Limpiar mensaje de error

        const formData = new FormData();
        formData.append("nombre_producto", producto.nombre_producto);
        formData.append("precio_unitario", producto.precio_unitario);
        formData.append("descripcion_producto", producto.descripcion_producto);
        formData.append("imagen", producto.imagen);
        formData.append("id_categoria_id", producto.id_categoria_id);

        axios.put(`http://localhost:8082/actualizarProducto/${id}`, formData)
          .then(respuesta => {
            if (respuesta.data.Estatus === "CORRECTO") {
              navegacion('/panel');
              alert('¡Se actualizó el producto!');
              onEditSuccess();
            } else {
              setError(respuesta.data.Error);
            }
          })
          .catch(error => console.log(error));
    }

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

    return (
        <>
            <form onSubmit={editarProducto} className="registro">
                <h1 className="py-4">Editar Producto</h1>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        name="nombre_producto"
                        value={producto.nombre_producto || ''}
                        onChange={e => setProducto({ ...producto, nombre_producto: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Precio del producto"
                        name="precio_unitario"
                        value={producto.precio_unitario || ''}
                        onChange={e => setProducto({ ...producto, precio_unitario: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>

                
                <div className="mb-3">
                    <textarea
                        type="text"
                        placeholder="Descripcion del producto"
                        name="descripcion_producto"
                        value={producto.descripcion_producto || ''}
                        onChange={e => setProducto({ ...producto, descripcion_producto: e.target.value })}
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
                        onChange={(e) => setProducto({ ...producto, imagen: e.target.files[0] })}
                    />
                    
                </div>

                <div className="mb-3">             
                    <select 
                        name="id_categoria_id"
                        value={producto.id_categoria_id || ''}
                        onChange={e => setProducto({ ...producto, id_categoria_id: e.target.value })}
                        className="form-control rounded-21"
                    >
                       <option value="">Seleccione una categoria</option>
                       {categorias.map((lacategoria, index) => (
                         <option key={lacategoria.id_categoria} value={lacategoria.id_categoria}>{lacategoria.nombre_categoria}</option>
                       ))}
                      </select>
                      
                </div>
                
                <button type="submit">
                    Guardar Cambios
                </button>
            </form>
        </>
    );
}

export default ProductoEdit;

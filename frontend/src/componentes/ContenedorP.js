import React, { useEffect, useState } from 'react';
import '../estilos/contenedorpro.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCarrito } from "../context/CarritoContext";
import Swal from 'sweetalert2';

function ContenedorP() {

  const [productos, setProductos] = useState([]);
  const { agregarProducto } = useCarrito();

  // Obtener todos los productos
  useEffect(() => {
    axios.get('http://localhost:8082/obtenerProductos')
      .then(respuesta => {
        if (respuesta.data.Estatus === 'Exitoso') {
          setProductos(respuesta.data.Resultado);
        } else {
          console.log("Error")
        }
      })
      .catch(error => console.log(error));
  }, []);

  // Obtener los productos por categoría
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8082/obtenerProductos/${id}`)
      .then(respuesta => {
        if (respuesta.data.Estatus === 'Exitoso') {
          setProductos(respuesta.data.Resultado);
        } else {
          console.log("Error")
        }
      })
      .catch(error => console.log(error));
  }, [id]);

    // Función para agregar un producto al carrito y mostrar el mensaje de confirmación
    const agregarProductoConConfirmacion = (producto) => {
      Swal.fire({
        title: `¿Deseas agregar ${producto.nombre_producto} al carrito?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deseo agregarlo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          agregarProducto(producto);
          Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            showConfirmButton: false,
            timer: 1000 // Tiempo en milisegundos para mostrar el mensaje
          });
        }
      });
    };

  return (
    <>
      <div className="container">
        {productos.map((elproducto, index) => (
          <div className="column" key={elproducto.id_producto}>
            <div className="product-container">
              <img className="product-image" src={require("../imagenes/" + elproducto.imagen)} alt="Producto 1" />
              <h4>{elproducto.nombre_producto}</h4>
              <div className='texto'>
                <p>{elproducto.descripcion_producto}</p>
              </div>
              <h5>$ {elproducto.precio_unitario}</h5>
              <button
                className="btn btn-success"
                onClick={() => agregarProductoConConfirmacion(elproducto)}
              >
                Comprar
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ContenedorP;
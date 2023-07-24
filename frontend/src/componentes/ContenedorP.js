import React, { useEffect, useState } from 'react';
import '../estilos/contenedorpro.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCarrito } from "../context/CarritoContext";

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
                onClick={() => agregarProducto(elproducto)}
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
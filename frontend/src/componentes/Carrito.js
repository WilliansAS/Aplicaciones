import React from "react";
import "../estilos/Carrito.css";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import axios from "axios";

function Carrito() {
  const { carrito, eliminarProducto } = useCarrito();
  const login = localStorage.getItem('usuario');
  const navigate = useNavigate();
  
  const crearPedido = () => {
  const usuarioId = localStorage.getItem("usuarioId"); // Obtener el ID del usuario del almacenamiento local
  const detallesPedido = carrito.map((producto) => `${producto.nombre_producto} x ${producto.cantidad}`)
  .join(", "); // Obtener los detalles del pedido concatenando los nombres de los productos y las cantidades

     // Objeto con los datos del pedido
     const pedidoData = {
      id_usuario_id: usuarioId,
      detalles: detallesPedido,
      total: redondearTotal,
    };

    // Enviar el pedido al servidor
    axios
      .post("http://localhost:8082/crear-pedido", pedidoData)
      .then((respuesta) => {
        if (respuesta.data.Estatus === "CORRECTO") {
          // Aquí puedes redirigir al usuario a una página de confirmación o hacer cualquier otra acción necesaria
          console.log("Pedido creado exitosamente");
        } else {
          console.log("Error al crear el pedido");
        }
      })
      .catch((error) => console.log(error));
  };

  if (!login) {
    // Si el usuario no está logeado, mostrar un mensaje o un contenido diferente
    return (
      <section className="compra">
        <h2>Carrito de compras</h2>
        <p>Para ver el contenido del carrito, por favor inicia sesión o regístrate.</p>
        <Link to="/acceso" className="btn-primary">
          Iniciar sesión
        </Link>
        <Link to="/registro" className="btn-info">
          Registrarse
        </Link>
      </section>
    );
  }

  // Función para redondear el total a dos decimales
  const redondearTotal = (total) => {
    return total.toFixed(2);
  };

  const handlePagarPayPal = () => {
    // Agregar aquí la lógica para el pago con PayPal
    const total = carrito.reduce(
      (total, producto) =>
        total + producto.precio_unitario * producto.cantidad,
      0
    );

    // Redondear el total a dos decimales
    const totalRedondeado = redondearTotal(total);

    // Colocar la lógica para procesar el pago con PayPal aquí
    // Utilizando totalRedondeado como el monto a pagar

    console.log("Pago con PayPal");
  };

  const handleSeguirComprando = () => {
    navigate("/Productos");
  };

  //Mensaje
  const eliminarProductoDelCarrito = (idProducto) => {
    // Mostrar el mensaje de confirmación antes de eliminar el producto
    Swal.fire({
      title: '¿Deseas eliminar este producto del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(idProducto); // Llama a la función para eliminar el producto
        Swal.fire(
          '¡Producto eliminado!',
          'El producto ha sido eliminado del carrito.',
          'success'
        );
      }
    });
  };

  return (
    <section>
      <h1 className="Exclamar">¡TU CARRITO!</h1>
      <div className="cart">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.nombre_producto}</td>
                <td>${producto.precio_unitario}</td>
                <td>{producto.cantidad}</td>
                <td>${redondearTotal(producto.precio_unitario * producto.cantidad)}</td>
                <td>
                  <button
                    onClick={() => eliminarProductoDelCarrito(producto.id_producto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>Total:</td>
              <td>
                $
                {carrito.reduce(
                  (total, producto) =>
                    total + producto.precio_unitario * producto.cantidad,
                  0
                )}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="buttons-container">
          {carrito.length > 0 && (
            <PayPalScriptProvider options={{ "client-id": "AbcsaMQYqfMsORH4nNv8qVBPeCZWULhqmWTxzWJH7y2sboHlRlZBWzZh9svp1b3qnuBmIR3-NqhkfJeB" }}>
              <PayPalButtons 
                createOrder={(data, actions) =>{
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: redondearTotal(carrito.reduce(
                            (total, producto) =>
                              total + producto.precio_unitario * producto.cantidad,
                            0
                          ))
                        },
                      },
                    ],
                  });
                }}                 
                onClick={crearPedido} // Llama a la función crearPedido al hacer clic en el botón de PayPal 
              />
            </PayPalScriptProvider>
          )}
          <button onClick={handleSeguirComprando} className="seguir-comprando-button">
            Seguir comprando
          </button>
        </div>
      </div>
    </section>
  );
}

export default Carrito;
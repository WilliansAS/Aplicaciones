import React from "react";
import "../estilos/Carrito.css";
import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";

function Carrito() {
  const { carrito, eliminarProducto } = useCarrito();

  return (
    <section>
      <h2>Carrito de compras</h2>
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
                <td>${producto.precio_unitario * producto.cantidad}</td>
                <td>
                  <button
                    onClick={() => eliminarProducto(producto.id_producto)}
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
        <Link to="/Confirmacion" className="btn">
          Pagar
        </Link>
      </div>
    </section>
  );
}

export default Carrito;


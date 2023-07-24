import React from "react";
import "../estilos/Carrito.css";
import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Carrito from "../componentes/Carrito";

function CarritoEnc() {

    return(
        <>
    <Encabezado />
    <Carrito />
    </>
    )
}

export default CarritoEnc;

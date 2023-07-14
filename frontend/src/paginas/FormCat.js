import React, { useState } from "react";
import Encabezado from "../componentes/Encabezado";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../estilos/registro.css';
import { Link } from 'react-router-dom';

function Formulario1(){
    const [campos, setCampos] = useState({
        nombre_categoria: "",
        descripcion_categoria: ""
    });

    const [error, setError] = useState();
    const navegacion = useNavigate();

    const registrar = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/registrarcat', campos)
            .then(respuesta => {
                if (respuesta.data.Estatus === "CORRECTO") {
                    navegacion('/panel')
                } else {
                    setError(respuesta.data.Error);
                }
            })
            .catch(error => console.log(error));

    }

    return (
        <>
 <Encabezado></Encabezado>
            <form onSubmit={registrar} className="formulario">
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
                <button type="submit" className="btn bg-marino w-100 rounded-10 text-black">
                    Ingresar
                </button>
            </form>
        </>
    );
}

export default Formulario1;
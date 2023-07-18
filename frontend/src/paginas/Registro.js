import React, { useState } from "react";
import Encabezado from "../componentes/Encabezado";
import axios from 'axios';  
import { useNavigate } from "react-router-dom";
import '../estilos/registro.css';
import { Link } from 'react-router-dom';

function Registro() {

    const [campos, setCampos] = useState({
        nombre_usuario: "",
        numero_telefono: "",
        direccion: "",
        correo: "",
        contrasenia: ""
    });

    const [error, setError] = useState();
    const navegacion = useNavigate();

    const registrar = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/registrar', campos)
            .then(respuesta => {
                if (respuesta.data.Estatus === "CORRECTO") {
                    navegacion('/acceso')
                } else {
                    setError(respuesta.data.Error);
                }
            })
            .catch(error => console.log(error));

    }

    return (
        <>
 <Encabezado></Encabezado>
            <form onSubmit={registrar} className="registro">
                <h1 className="py-4">Registro</h1>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Nombre de Usuario"
                        name="nombre_usuario"
                        onChange={e => setCampos({ ...campos, nombre_usuario: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Numero de telefono"
                        name="numero_telefono"
                        onChange={e => setCampos({ ...campos, numero_telefono: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>

                
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Direccion"
                        name="direccion"
                        onChange={e => setCampos({ ...campos, direccion: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        name="correo_electronico"
                        onChange={e => setCampos({ ...campos, correo: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="contrasenia"
                        onChange={e => setCampos({ ...campos, contrasenia: e.target.value })}
                        className="form-control rounded-21"
                    />
                </div>
                <h6 className="py-4">
                    ¿Ya tienes una cuenta?
                    <Link to="/acceso"> Inicia sesión</Link>
                </h6>
                <button type="submit">
                    Ingresar
                </button>
            </form>
        </>
    );
}

export default Registro;
import React, { useState } from "react";
import axios from 'axios';
import Encabezado from "../componentes/Encabezado";
import { Link, useNavigate } from "react-router-dom";
import '../estilos/acceso.css';

function Acceso() {
    const [campos, setCampos] = useState({
        correo: "",
        contrasenia: ""
    });

    const [error, setError] = useState();
    const navegacion = useNavigate();

    const acceder = (e) => {
        e.preventDefault();
    
        axios
        .post('http://localhost:8082/acceso', campos)
            .then(respuesta => {
                if (respuesta.data.Estatus === "CORRECTO") {
                    localStorage.setItem('usuario', respuesta.data);
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
            <div className="container-fluid w-50 p-3 text-center container-background">
                <h1 className="mb-4 mt-2">Acceso</h1>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="p-3 rounded w-100">
                        <div className="text-danger">
                            {error && error}
                        </div>
                        <form onSubmit={acceder}>
                            <div className="mb-3">
                                <input type="email" placeholder="Correo Electrónico" name="correo"
                                    onChange={e => setCampos({ ...campos, correo: e.target.value })} className="form-control rounded-21 input-field" autoComplete="">
                                </input>
                            </div>
                            <div className="mb-3">
                                <input type="password" placeholder="Contraseña" name="contrasenia"
                                    onChange={e => setCampos({ ...campos, contrasenia: e.target.value })} className="form input-field">
                                </input>
                            </div>
                            <h6 className="py-4">
                            ¿No tienes cuenta?
                            <Link to="/registrar"> Registrate</Link>
                            </h6>
                            <button type="submit">Ingresar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Acceso;
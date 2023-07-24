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
        <body className="inicio">
            
            <div className="wrapper">
            <div class="title">Inicio de Sesión</div>
            
                        <div className="text-danger">
                            {error && error}
                        </div>
                        <form onSubmit={acceder}>
                            <div className="field">
                                <input type="email" placeholder="Correo Electrónico" name="correo"
                                    onChange={e => setCampos({ ...campos, correo: e.target.value })}>
                                </input>
                            </div>
                            
                            <div className="field">
                                <input type="password" placeholder="Contraseña" name="contrasenia"
                                    onChange={e => setCampos({ ...campos, contrasenia: e.target.value })} >
                                </input>
                            </div>

                            <div className="field">
                            <input type="submit" value="Ingresar">
                                </input>
                            </div>

                            <div className="signup-link">
                            ¿No tienes cuenta?
                            <Link to="/registrar"> Regístrate</Link>
                            </div>
                        </form>
                    
                </div>
                </body>
        </>
    );
}

export default Acceso;

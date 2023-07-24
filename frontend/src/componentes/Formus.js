import React, { useState } from "react";
import axios from 'axios';  
import { useNavigate } from "react-router-dom";
import '../estilos/registro.css';

function Dashregistro({ onRegistroExitoso }) {
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
        axios.post('http://localhost:8082/registrarUsuario', campos)
            .then(respuesta => {
                if (respuesta.data.Estatus === "CORRECTO") {
                    navegacion('/panel');
                    alert('¡Se agregó un nuevo usuario!');
                    setCampos({
                        nombre_usuario: "",
                        numero_telefono: "",
                        direccion: "",
                        correo: "",
                        contrasenia: ""
                    });
                    // Aquí llamamos a la función para actualizar el conteo de usuarios
                    axios.get('http://localhost:8082/numUsuarios')
                        .then(respuesta => {
                            if (respuesta.data.Estatus === 'Exitoso') {
                                onRegistroExitoso(respuesta.data.Resultado);
                            } else {
                                console.log("Error");
                            }
                        })
                        .catch(error => console.log(error));
                } else {
                    setError(respuesta.data.Error);
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <form onSubmit={registrar} className="registro">
                <h1 className="py-4">Registro</h1>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Nombre de Usuario"
                        name="nombre_usuario"
                        onChange={e => setCampos({ ...campos, nombre_usuario: e.target.value })}
                        className="form-control rounded-21"
                        required // Campo requerido
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Numero de telefono"
                        name="numero_telefono"
                        onChange={e => setCampos({ ...campos, numero_telefono: e.target.value })}
                        className="form-control rounded-21"
                        required // Campo requerido
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Direccion"
                        name="direccion"
                        onChange={e => setCampos({ ...campos, direccion: e.target.value })}
                        className="form-control rounded-21"
                        required // Campo requerido
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        name="correo_electronico"
                        onChange={e => setCampos({ ...campos, correo: e.target.value })}
                        className="form-control rounded-21"
                        required // Campo requerido
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="contrasenia"
                        onChange={e => setCampos({ ...campos, contrasenia: e.target.value })}
                        className="form-control rounded-21"
                        required // Campo requerido
                    />
                </div>
                <button type="submit">
                    Agregar
                </button>
            </form>
        </>
    );
}

export default Dashregistro;

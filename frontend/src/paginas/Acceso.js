import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Encabezado from "../componentes/Encabezado";
import { Link, useNavigate } from "react-router-dom";
import '../estilos/acceso.css';
import Swal from 'sweetalert2'

function Acceso() {
    const [campos, setCampos] = useState({
        correo: "",
        contrasenia: ""
    });

    const [error, setError] = useState();
    const navegacion = useNavigate();
    const[usuarios, setUsuario] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:8082/obtenerUsuarios')
        .then(respuesta => {
            if(respuesta.data.Estatus==='Exitoso'){
                setUsuario(respuesta.data.Resultado);
                
            }else{
              console.log("Error")
            }
        })
        .catch(error=>console.log(error));
    },[]); 

    const acceder = (e) => {
        e.preventDefault();
    
        axios
        .post('http://localhost:8082/acceso', campos)
            .then(respuesta => {
                if (respuesta.data.Estatus === "CORRECTO") {
                    const usuario = respuesta.data;

                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    // Redirigir al usuario dependiendo del nivel
                    if (usuario.nivel === 1) {
                        navegacion('/panel');
                    } else {
                        navegacion('/');
                    }

                    Swal.fire({
                        icon: 'success',
                        title: 'Inicio de sesión exitoso',
                        text: '¡Bienvenido!',
                        showConfirmButton: false,
                        timer: 1000 // Tiempo en milisegundos para mostrar el mensaje
                    });

                } else {
                    setError(respuesta.data.Error);
                }
            })
            .catch(error => console.log(error));
    };
    
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
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            name="correo"
                            onChange={e => setCampos({ ...campos, correo: e.target.value })}
                            required
                        />
                    </div>
                            
                    <div className="field">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            name="contrasenia"
                            onChange={e => setCampos({ ...campos, contrasenia: e.target.value })}
                            required
                        />
                    </div>

                    <div className="field">
                        <input type="submit" value="Ingresar" />
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

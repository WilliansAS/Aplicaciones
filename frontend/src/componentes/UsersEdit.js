import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";
import "../estilos/registro.css";

function UsersEdit({ onEditSuccess }) {
  const navegacion = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre_usuario: "",
    numero_telefono: "",
    direccion: "",
    correo: "",
    nivel: ""
  });

  const [error, setError] = useState();

  const { id } = useParams();
  useEffect(() => {
    // Obtener los datos del usuario para cargarlos en el formulario
    axios.get(`http://localhost:8082/obtenerUsuario/${id}`)
      .then(respuesta => {
        if (respuesta.data.Estatus === "Exitoso") {
          setUsuario(respuesta.data.Resultado[0]); // Los datos del usuario deben estar en el índice 0 del array
        } else {
          console.log("Error al obtener el usuario");
        }
      })
      .catch(error => console.log(error));
  }, [id]);

  const editarUsuario = (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!usuario.nombre_usuario || !usuario.numero_telefono || !usuario.direccion || !usuario.correo) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    setError(""); // Limpiar mensaje de error

    axios.put(`http://localhost:8082/actualizarUsuario/${id}`, usuario)
      .then(respuesta => {
        if (respuesta.data.Estatus === "CORRECTO") {
          navegacion('/panel');
          alert('¡Se actualizó el usuario!');
          onEditSuccess();
        } else {
          setError(respuesta.data.Error);
        }
      })
      .catch(error => console.log(error));
  }

const login = localStorage.getItem('usuario');
const [menuOpen, setMenuOpen] = useState(false);

const salir = () => {
  localStorage.clear();
  navegacion('/');
};

const toggleMenu = () => {
  setMenuOpen(!menuOpen);
};

  return (
    <>
{/*Encabezado*/}
<header>
      <div className="logo">
        <Link to="/">
          <img src={require('../imagenes/icon_eyelash.png')} className="photo" alt="Logo" />
          <span className="logo-text navbar-link">Marings</span>
        </Link>
      </div>
      <nav className={menuOpen ? 'menu-open' : ''}>
        <div className="menu-toggle" onClick={toggleMenu}></div>
        <ul className="navbar">
          <li>
            <Link to="/Panel">Regresar</Link>
          </li>
          
          {login ? (
            <li>
              <Link to="/" onClick={salir}>Salir</Link>
            </li>
          ) : (
            <li>
              <Link to="/acceso">Acceder</Link>
            </li>
          )}
          
        </ul>
      </nav>
    </header>

      <form onSubmit={editarUsuario} className="registro">
        <h1 className="py-4">Editar Usuario</h1>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Nombre del usuario"
            name="nombre_usuario"
            value={usuario.nombre_usuario || ''}
            onChange={e => setUsuario({ ...usuario, nombre_usuario: e.target.value })}
            className="form-control rounded-21"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Número de teléfono"
            name="numero_telefono"
            value={usuario.numero_telefono || ''}
            onChange={e => setUsuario({ ...usuario, numero_telefono: e.target.value })}
            className="form-control rounded-21"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Dirección"
            name="direccion"
            value={usuario.direccion || ''}
            onChange={e => setUsuario({ ...usuario, direccion: e.target.value })}
            className="form-control rounded-21"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Correo electrónico"
            name="correo"
            value={usuario.correo || ''}
            onChange={e => setUsuario({ ...usuario, correo: e.target.value })}
            className="form-control rounded-21"
          />
        </div>
{/*
        <div className="mb-3">
          <select
            name="nivel"
            value={usuario.nivel}
            onChange={e => setUsuario({ ...usuario, nivel: e.target.value })}
            className="form-control rounded-21"
          >
            <option value="">Seleccione un nivel</option>
            <option value={usuario.nivel}>Administrador</option>
            <option value={usuario.nivel}>Usuario</option>
        </select>
        </div>
*/}
        <button type="submit">
          Guardar Cambios
        </button>
      </form>
    </>
  );
}

export default UsersEdit;

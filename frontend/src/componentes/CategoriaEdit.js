import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";

function CategoriaEdit({ onEditSuccess }) {
  const [categoria, setCategoria] = useState({});
  const [error, setError] = useState();
  const navegacion = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8082/obtenerCategorias/${id}`)
      .then(respuesta => {
        if (respuesta.data.Estatus === 'Exitoso') {
          setCategoria(respuesta.data.Resultado[0]); // Aquí ajustamos el estado de 'categoria' con el resultado de la consulta
        } else {
          console.log("Error");
        }
      })
      .catch(error => console.log(error));
  }, [id]);

  const editarCategoria = (e) => {
    e.preventDefault();
    if (!categoria.nombre_categoria || !categoria.descripcion_categoria || !categoria.imagen) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    setError(""); // Limpiar mensaje de error

    const formData = new FormData();
    formData.append("nombre_categoria", categoria.nombre_categoria);
    formData.append("descripcion_categoria", categoria.descripcion_categoria);
    formData.append("imagen", categoria.imagen);

    axios.put(`http://localhost:8082/actualizarCategoria/${id}`, formData)
      .then(respuesta => {
        if (respuesta.data.Estatus === "CORRECTO") {
          navegacion('/panel');
          alert('¡Se actualizó la categoría!');
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

    <form onSubmit={editarCategoria} className="registro">
      <h1 className="py-4">Editar Categoría</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Nombre de la categoría"
          name="nombre_categoria"
          value={categoria.nombre_categoria || ''}
          onChange={e => setCategoria({ ...categoria, nombre_categoria: e.target.value })}
          className="form-control rounded-21"
        />
      </div>

      <div className="mb-3">
        <textarea
          placeholder="Descripción de la categoría"
          name="descripcion_categoria"
          value={categoria.descripcion_categoria || ''}
          onChange={e => setCategoria({ ...categoria, descripcion_categoria: e.target.value })}
          className="form-control rounded-21"
        />
      </div>

      <div className="mb-3">
        <input
          type="file"
          name="imagen"
          accept="image/*"
          className="form-control rounded-21"
          required
          onChange={(e) => setCategoria({ ...categoria, imagen: e.target.files[0] })}
        />
      </div>

      <button type="submit">
        Guardar Cambios
      </button>
    </form>
    </>
  );
}

export default CategoriaEdit;

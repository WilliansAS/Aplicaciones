import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import axios from 'axios'; // Importar axios
import Inicio from './paginas/Inicio';
import Compras from './paginas/Compras';
import Productos from './paginas/Productos';
import Nosotros from './paginas/Nosotros';
import Categorias from './paginas/Categorias';
import Contactos from './paginas/Contactos';
import Confirmacion from './paginas/Confirmacion';
import Salones from './paginas/Salones';
import Registro from './paginas/Registro';
import Acceso from './paginas/Acceso';
import Panel from './paginas/Panel';
import Dashregistro from './componentes/Formus';
import Formulario2 from './componentes/Formprod';
import Usuarios from './componentes/Dashusers';
import Dashprod from './componentes/Dashprod';
import Dashcat from './componentes/Dashcat';
import { CarritoProvider } from './context/CarritoContext';
import Formulario1 from './componentes/Formcat';
import Carrito from './componentes/Carrito';
import ProductoEdit from './componentes/ProductoEdit';
import CategoriaEdit from './componentes/CategoriaEdit';
import CarritoEnc from './paginas/CarritoEnc';


function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/obtenerProductos')
      .then(respuesta => {
        if (respuesta.data.Estatus === 'Exitoso') {
          setProductos(respuesta.data.Resultado);
        } else {
          console.log("Error")
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta para la página de compras */}
          <Route path='/Compras' element={<Compras productos={productos} />} />

          {/* Ruta para la página del carrito */}
          <Route path='/carr' element={<CarritoEnc />} />

          {/* Otras rutas */}
          <Route path='/' element={<Inicio />} />
          <Route path='/Productos' element={<Productos />} />
          <Route path='/Nosotros' element={<Nosotros />} />
          <Route path='/Categorias' element={<Categorias />} />
          <Route path='/Contactos' element={<Contactos />} />
          <Route path='/Confirmacion' element={<Confirmacion />} />
          <Route path='/Salones/:id' element={<Salones />} />
          <Route path='/registrar' element={<Registro />} />
          <Route path='/acceso' element={<Acceso />} />
          <Route path='/panel' element={<Panel />} />
          <Route path='/form1' element={<Formulario1 />} />
           <Route path='/form2' element={<Formulario2/>}></Route>
          <Route path='/formus' element={<Dashregistro />} />
          <Route path='/usuarios' element={<Usuarios/>}></Route>
          <Route path='/dashprod' element={<Dashprod/>}></Route>
          <Route path='/dashcat' element={<Dashcat/>}></Route>
          <Route path='/editprod/:id' element={<ProductoEdit/>}></Route>
          <Route path='/editcat/:id' element={<CategoriaEdit/>}></Route>
        
          
      
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;


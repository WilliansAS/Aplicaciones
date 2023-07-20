import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Routes, BrowserRouter} from 'react-router-dom';
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
import Formulario1 from './componentes/Formcat';
import Formulario2 from './componentes/Formprod';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Inicio/>}></Route>
      <Route path='/Compras' element={<Compras/>}></Route>
      <Route path='/Productos' element={<Productos/>}></Route>
      <Route path='/Nosotros' element={<Nosotros/>}></Route>
      <Route path='/Categorias' element={<Categorias/>}></Route>
      <Route path='/Contactos' element={<Contactos/>}></Route>
      <Route path='/Confirmacion' element={<Confirmacion/>}></Route>
      <Route path='/Salones/:id' element={<Salones/>}></Route>
      <Route path='/registrar' element={<Registro/>}></Route>
      <Route path='/acceso' element={<Acceso/>}></Route>
      <Route path='/panel' element={<Panel/>}></Route>
      <Route path='/form1' element={<Formulario1/>}></Route>
      <Route path='/form2' element={<Formulario2/>}></Route>
      <Route path='/formus' element={<Dashregistro/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
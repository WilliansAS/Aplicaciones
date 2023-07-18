import { Link } from "react-router-dom";


function Texto(){
    return(
<>
<div className="acomodo">
  <section id="Texto">
    <h1>"Estas a unos pasos de alcanzar"</h1>
    {/*En este HREF haremos referencia a la página CATEGORIAS, tanto en la IMG, como en el HREF*/}
    <Link to="/Categorias">
      <img src={require('../imagenes/carrito02.png')} alt="Carrito_Compras" id="foto" />
    </Link>
    <h1 className="Exclamar">¡LA BODA DE TUS SUEÑOS!</h1>
    <p>
      Gracias a nuestro amplio repertorio de aliados, podemos ofrecer a nuestros
      clientes una experiencia más diversa, en cuánto a la selección de todos
      los insumos que se pudieran requerir al celebrar la boda de sus sueños.
    </p>
    <p>
      Para conocer más acerca de detalles de nuestros productos y nuestros
      aliados, te invitamos a conocer nuestras{" "}
      <Link to="/Categorias">Categorias de productos.</Link>
    </p>
  </section>
</div>
</>
    );
    }

export default Texto;
import React from "react";
import Encabezado from "../componentes/Encabezado";
import { Link } from "react-router-dom";

function Cuerpo2(){
    return(
        <>
        <Encabezado></Encabezado>
        <div className="acomodo">
  <section id="Texto">
    <h1 className="Exclamar">!Conócenos!</h1>
    <Link to="#">
      <img src={require('../imagenes/boda.jpeg')} alt="Carrito_Compras" id="foto" />
    </Link>
    <p>
      Somos una compañía con 15 años de experiencia en el mercado, basada en
      darle a nuestros clientes la boda de sus sueños, poniendo en sus manos
      productos de alta calidad, lugares asombrosos, eventos para que tanto los
      novios, como sus invitados puedan pasar un día inolvidable.
    </p>
    <p>
      Conocemos lo importante que es cada detalle en este día tan especial, por
      lo que nosotros nos aseguraremos que todo este planeado minimétricamente
      planeado, para que usted no se tenga que preocupar de nada y pueda
      disfrutar ese momento memorable en la vida de todos nosotros.
    </p>
  </section>
  <section id="Texto2">
    <h1 className="Exclamar">!Nuestros Valores!</h1>
    <p>
      Para nosotros el cliente, es lo más importante, por lo tanto su
      satisfacción, es nuestra prioridad, somos fieles creyentes del "El cliente
      siempre tiene la razón", por lo que nuestros colaboradores siempre se
      dirigiran a usted con la mejor actitud de servicio, con respeto y
      cortesía, a todos nos gusta que nos traten como reyes, así que usted será
      siempre el rey.
    </p>
    <p>
      Por su parte, le invitamos a dejar sus quejas o sugerencias, con la
      finalidad de que podamos ir mejorando este servicio que está a la
      disposición de todos y cada uno de nosotros, esperamos que usted pueda
      tener una ceremonia perfecta, que se sienta cómodo y en confianza con
      nuestro servicio, cualquier queja y aclaración, será siempre bien
      recibida.
    </p>
  </section>
  <section id="Texto">
    <h1 className="Exclamar">!Nuestra Ubicación!</h1>
    <Link to="https://www.oceanviewcancunarenas.com/">
      <img src={require('../imagenes/cancun.jpg')}alt="Playa_Cancun" id="foto" />
    </Link>
    <p>
      Contamos con múltiples puntos, a lo largo y ancho de toda la república,
      por lo cuál siéntase libre de escoger cualquiera de nuestras direcciones,
      en caso de que algún punto quede retirado de su ubicación, en automático
      se le asignará el que le quede más cerca, no obstante usted tiene el
      control, y puede escoger la ubicación que desee.
    </p>
    <p>
      Guatemala, Cancún, Puebla, Zacatemas, Monterrey, Durango, Baja California,
      Baja California Sur, Tamaulipas, CDMX, Mérida, Veracruz, entre otros
      tantos estados y municipios de la república.
    </p>
  </section>
</div>
        </>
    );
}

export default Cuerpo2;
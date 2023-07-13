import React from "react";
import Encabezado from "../componentes/Encabezado";
import '../estilos/contactos.css'
import Pie_de_pagina from "../componentes/Pie_de_pagina";

function Contactos(){
    return(
        <>
        <Encabezado></Encabezado>
        <div id="div">
  <div className="contacts">
    <img src={require("../imagenes/whatt.png")} />
    <div id="texto">
      <h2>Nuestro Whatssapp</h2>
      <h5>
        Si tienes alguna pregunta, comentario o simplemente quieres compartir un
        mensaje de felicitación, no dudes en contactarnos a través de WhatsApp
      </h5>
      <h5>223-765-01800</h5>
    </div>
  </div>
  <div className="contacts">
  <img src={require("../imagenes/inst.png")} />
    <div id="texto">
      <h2>Nuestro Instagram</h2>
      <h5>
        Si quieres mantenerte actualizado sobre todos los detalles, momentos
        especiales y fotos exclusivas de nuestra boda, te invitamos a seguirnos
        en Instagram. Nos encantaría compartir esta experiencia única contigo y
        que formes parte de nuestra historia.
      </h5>
      <h5>@MaringsMexico</h5>
    </div>
  </div>
  <div className="contacts">
    <img src={require("../imagenes/faceb.png")} />
    <div id="texto">
      <h2>Nuestro Facebook</h2>
      <h5>
        No dudes en visitar nuestra página de Facebook y darle "Me gusta" para
        unirte a nuestra comunidad y ser parte de nuestra historia de amor.
        ¡Esperamos verte allí!
      </h5>
      <h5>Marings</h5>
    </div>
  </div>
  <div className="contacts">
  <img src={require("../imagenes/twitter.png")} />
    <div id="texto">
      <h2>Nuestro Twitter</h2>
      <h5>
        En nuestra cuenta de Twitter, compartiremos detalles sobre la
        planificación de la boda, fotos de los preparativos y, por supuesto,
        todas las sorpresas que tenemos reservadas para nuestros invitados. No
        te pierdas ninguna actualización y únete a la conversación en línea.
      </h5>
      <h5>MaringsMexicoTW</h5>
    </div>
  </div>
  <div className="contacts">
  <img src={require("../imagenes/call.png")} />
    <div id="texto">
      <h2>Nuestro Telefono</h2>
      <h5>
        Puedes comunicarte con nosotros directamente llamando a nuestro número
        de teléfono. Estaremos encantados de responder tus llamadas y brindarte
        toda la información que necesitas para hacer de tu boda un evento
        inolvidable.
      </h5>
      <h5>+52 998-345-745-2</h5>
    </div>
  </div>
  <div className="contacts">
  <img src={require("../imagenes/correo.png")} />
    <div id="texto">
      <h2>Nuestro Correo Electronico</h2>
      <h5>
        No dudes en enviarnos un correo electrónico a nuestra dirección de
        contacto. Estaremos atentos a tu mensaje y responderemos lo antes
        posible.
      </h5>
      <h5>info@marings.com</h5>
    </div>
  </div>
</div>

        <Pie_de_pagina />
        </>
    );
}

export default Contactos;
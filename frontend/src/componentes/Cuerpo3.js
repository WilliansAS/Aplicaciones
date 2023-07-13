import React from "react";
import Pie_de_pagina from "../componentes/Pie_de_pagina";
import { Link } from "react-router-dom";

function Cuerpo3() {
    return (
        <>
            <section id="Texto">
                <br />
                <h1 className="Exclamar">!Nuestros Proveedores y Aliados!</h1>
                <Link to="http://www.utcancun.edu.mx/">
                    <img src={require('../imagenes/proveedor.jpg')} alt="Proveedor" id="foto" />
                </Link>
                <p>
                    Junto a nuestros aliados y proveedores, buscamos darle la mejor experiencia,
                    en lugares de primera mano, y con paquetes que se adapten a sus necesidades,
                    incluso si son fuera de este mundo, contamos con paquetes personalizables,
                    con la finalidad de que sea como siempre lo soñó
                </p>
                <p>
                    Así como trabajamos codo a codo con nuestro equipo de trabajo, queremos que
                    nuestros clientes esten seguros que ponemos el mismo empeño, con tal de
                    ofrecer la mejor experiencia, avalándonos en nuestros años prestando nuestro
                    servicio a toda la república.
                </p>
                <h2>Conoce Más</h2>
                <div id="Proveedores">
                    <article className="proveedor">
                        <img src={require('../imagenes/hotel_fox.jpg')} alt="hotel_fox" />
                        <h4>Hotel Vicente Fox</h4>
                        <p>
                            Situado en una de las avenidas principales de la ciudad, Quinta San
                            Vicente Hotel &amp; Hostal es un refugio acogedor y seguro, que ofrece a
                            sus huéspedes un ambiente agradable y tranquilo para asegurarles una
                            estancia placentera.
                        </p>
                        <Link to="https://www.google.com/maps/place/Quinta+San+Vicente+Hotel+%26+Hostal/@21.1300212,-86.9148832,15z/data=!4m2!3m1!1s0x0:0xc427232248f95b24?sa=X&ved=2ahUKEwjX9brT287_AhXcmGoFHbmQDSUQ_BJ6BAhcEAc">
                            Leer más
                        </Link>
                    </article>
                    <article className="proveedor">
                        <img src={require('../imagenes/flower2.jpg')} alt="Flores" />
                        <h4>LolaFlora</h4>
                        <p>
                            Regalar flores es un detalle que nunca pasa de moda. Son una forma
                            excelente de expresar tus sentimientos. Quieras demostrar tu
                            agradecimiento?, darle un detalle especial a tu madre o simplemente
                            alegrar el día de una persona.
                        </p>
                        <Link to="https://www.lolaflora.com.mx/flores?utm_source=google&utm_medium=cpc&utm_campaign=958582442&gclid=Cj0KCQjw1rqkBhCTARIsAAHz7K2-OB0itX-CqAonqQ1iCeb4G-O1KRaSFjrPIKZ9iy1AtYLEMTAyF4YaAqsGEALw_wcB">
                            Leer más
                        </Link>
                    </article>
                </div>
            </section>

            <Pie_de_pagina></Pie_de_pagina>
        </>
    );
}

export default Cuerpo3;
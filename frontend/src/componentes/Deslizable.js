import React from 'react';
import '../estilos/Deslizable.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


function Deslizable(){
    return(
<>
<div id="carouselExampleIndicators" className="carousel slide">
    <div className="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to={0}
        className="active"
        aria-current="true"
        aria-label="Slide 1"
      />
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to={1}
        aria-label="Slide 2"
      />
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to={2}
        aria-label="Slide 3"
      />
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to={3}
        aria-label="Slide 4"
      />
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          src={require('../imagenes/boda1.jpg')}
          className="d-block w-100"
          id="first_img"
          alt="Boda_Aliados"
        />
      </div>
      <div className="carousel-item" >
        <img
          src={require('../imagenes/boda2.jpg')}
          className="d-block w-100"
          id="first_img"
          alt="Boda_Aliados"
        />
      </div>
      <div className="carousel-item" >
        <img
           src={require('../imagenes/boda5.jpg')}
           className="d-block w-100"
          id="first_img"
          alt="Boda_Aliados"
        />
      </div>
      <div className="carousel-item" >
        <img
          src={require("../imagenes/boda6.jpg")}
          className="d-block w-100"
          id="first_img"
          alt="Boda_Aliados"
        />
      </div>
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="visually-hidden">Previo</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="visually-hidden">Siguiente</span>
    </button>
  </div>
</>

    );
}

export default Deslizable;
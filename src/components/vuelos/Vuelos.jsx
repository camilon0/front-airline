import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

import "./style.scss";
import bag from "./icons/briefcase.svg";
import dollar from "./icons/dollar-sign.svg";

const Vuelos = () => {
  const flight = JSON.parse(sessionStorage.getItem("infoVuelos")) || [];
  //console.log(flights);

  const navigate = useNavigate();

  const page = () => {
    navigate("/");
  };
  //const [pasaje, setPasaje] = useState({} || pasaje);
  const [valor, setValor] = useState(0);
  const getFlight = (element) => {
    console.log(element);
    //setPasaje(element);
  };
  const changeValor = (item) => {
    if (item === "maletaA") {
      console.log(500);
      setValor(500);
    }
    if (item === "maletaB") {
      console.log(1000);
      setValor(1000);
    }
    if (item === "maletaC") {
      console.log(1900);
      setValor(1900);
    }
  };
  return (
    <>
      <div className="main">
        <div className="vuelos">
          <div className="vuelo-salida-container">
            <div className="vuelo__salida">
              <h2>Vuelo de salida</h2>
              <button onClick={page} className="button">
                <span className="buttonVuelos">Cambiar vuelo</span>
              </button>
            </div>
            <div className="vuelo-fecha">
              {flight.map((element, index) => (
                <>
                  <span>{element.salidaDate}</span>
                  <div>
                    {element.origen} - {element.destino}
                  </div>
                </>
              ))}
            </div>
            <span>Selección de horarios y equipajes</span>
            <div className="horarios">
              {flight.map((element, index) => (
                <>
                  <section className="vuelo__option" key={index}>
                    <article
                      onClick={() => {
                        getFlight(element);
                      }}
                      className="vuelo__dates"
                    >
                      <nav>{element.timeSalida}</nav>
                      <div>
                        <span>Sin escalas</span>
                      </div>
                    </article>
                    <article className="vuelo__equipaje">
                      <button
                        onClick={() => {
                          changeValor("maletaA");
                        }}
                      >
                        <img src={bag} alt="brief" />
                        <span>1 objeto personal</span>
                        <img src={dollar} alt="dollar" />
                        <div>500 MXN</div>
                      </button>
                      <button
                        onClick={() => {
                          changeValor("maletaB");
                        }}
                      >
                        <img src={bag} alt="brief" />
                        <span>Equipaje de mano</span>
                        <img src={dollar} alt="dollar" />
                        <div>1000 MXN</div>
                      </button>
                      <button
                        onClick={() => {
                          changeValor("maletaC");
                        }}
                      >
                        <img src={bag} alt="brief" />
                        <span>Equipaje 25kg</span>
                        <img src={dollar} alt="dollar" />
                        <div>1900 MXN</div>
                      </button>
                    </article>
                  </section>
                </>
              ))}
            </div>
          </div>

          <div className="vuelo-salida-container">
            <div className="vuelo__salida">
              <h2>Vuelo de regreso</h2>
              <button onClick={page} className="button">
                <span className="buttonVuelos">Cambiar vuelo</span>
              </button>
            </div>
            <div className="vuelo-fecha">
              {flight.map((element, index) => (
                <>
                  <span>{element.regresoDate}</span>
                  <div>
                    {element.destino} - {element.origen}
                  </div>
                </>
              ))}
            </div>
            <span>Selección de horarios y equipajes</span>
            <div className="horarios">
              {flight.map((element, index) => (
                <>
                  <section className="vuelo__option" key={index}>
                    <article
                      onClick={() => {
                        getFlight(element);
                      }}
                      className="vuelo__dates"
                    >
                      <nav>{element.timeRegreso}</nav>
                      <div>
                        <span>Sin escalas</span>
                      </div>
                    </article>
                    <article className="vuelo__equipaje">
                      <button
                        onClick={() => {
                          changeValor("maletaA");
                        }}
                      >
                        <img src={bag} alt="brief" />
                        <span>1 objeto personal</span>
                        <img src={dollar} alt="dollar" />
                        <div>500 MXN</div>
                      </button>
                      <button
                        onClick={() => {
                          changeValor("maletaB");
                        }}
                      >
                        <img src={bag} alt="brief" />
                        <span>Equipaje de mano</span>
                        <img src={dollar} alt="dollar" />
                        <div>1000 MXN</div>
                      </button>
                      <button
                        onClick={() => {
                          changeValor("maletaC");
                        }}
                      >
                        <img src={bag} alt="brief" />
                        <span>Equipaje 25kg</span>
                        <img src={dollar} alt="dollar" />
                        <div>1900 MXN</div>
                      </button>
                    </article>
                  </section>
                </>
              ))}
            </div>
          </div>
        </div>
        <section className="right">
          <article className="right-flights">
            <span> Tu reservación</span>
            <div className="right-pasajeros">
              <span>Pasajeros</span>
              <span>1 Adulto</span>
            </div>

            <div className="destino">
              <div>Vuelo de salida</div>
              {flight.map((element, index) => (
                <>
                  <span>{element.salidaDate}</span>
                  <div>
                    {element.origen} - {element.destino}
                  </div>
                  <nav>{element.timeSalida}</nav>
                </>
              ))}
            </div>

            <div className="regreso">
              <div>Vuelo de regreso</div>
              {flight.map((element, index) => (
                <>
                  <span>{element.regresoDate}</span>
                  <div>
                    {element.destino} - {element.origen}
                  </div>
                  <nav>{element.timeRegreso}</nav>
                </>
              ))}
            </div>
            <article className="book__flights">
              <span>Costo de vuelo</span>
              <div>
                <span>Tarifa base</span>
                {flight.map((element, index) => (
                  <>
                    <span>{element.precio}</span>
                  </>
                ))}
              </div>

              <div>
                <span>Equipaje</span>
                <span>{valor}</span>
              </div>
              <div>
                {/* {flight.map(
                ((element) => element.precio).reduce((c, valor) => (
                  <>
                    <span>{c + valor}</span>
                  </>
                ))
              )} */}
              </div>
            </article>
          </article>
        </section>
      </div>
    </>
  );
};

export default Vuelos;

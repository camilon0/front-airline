import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useForm from "../../hooks/useForm";
import { searchFligths } from "../services/getData";

const Filter = () => {
  const navigate = useNavigate();
  const [dataForm, handleChangeInput] = useForm({
    origen: "",
    destino: "",
    salidaDate: "",
    regresoDate: "",
  });

  const filterFligth = async (dataForm) => {
    const vuelosFiltrados = await searchFligths(dataForm);

    if (vuelosFiltrados.length) {
      //console.log(vuelosFiltrados);
      sessionStorage.setItem("infoVuelos", JSON.stringify(vuelosFiltrados));

      navigate("/vuelos");
    } else {
      Swal.fire("upps", "No se encontraron vuelos!", "error");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dataForm);
    if (
      dataForm.origen !== "" &&
      dataForm.destino !== "" &&
      dataForm.salidaDate !== "" &&
      dataForm.regresoDate !== ""
    ) {
      console.log("se puede continuar");
      await filterFligth(dataForm);
    } else {
      console.log("llene los datos porfavor");
    }
  };

  const [openOptions, setOpenOptions] = useState(0);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    baby: 0,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <>
      <div className="container">
        <div className="filter">
          <form className="vuelos__form" onSubmit={handleSubmit}>
            <div className="header">
              <h2>Busca un nuevo destino y comienza la aventura.</h2>
              <span className="text">
                Descubre vuelos al mejor precio y perfectos para cualquier
                viaje.
              </span>
            </div>
            <div className="buttons">
              <button className="btnViaje">Viaje redondo</button>
              <button className="btnViaje">Viaje sencillo</button>
            </div>
            <div className="ciudades__container">
              <div className="origen">
                <span>
                  <h3>
                    <select name="origen" onChange={handleChangeInput}>
                      <option value="">------</option>
                      <option value="Medellin">Medellín</option>
                      <option value="Bogota">Bogotá</option>
                      <option value="Bucaramanga">Bucaramanga</option>
                      <option value="Cucuta">Cúcuta</option>
                      <option value="San Andres">San Andrés</option>
                      <option value="Pasto">Pasto</option>
                    </select>
                  </h3>
                  <span className="spanOrigen">Origen</span>
                </span>
              </div>
              <div className="destino">
                <span>
                  <h3>
                    <select name="destino" onChange={handleChangeInput}>
                      <option value="">------</option>
                      <option value="Monteria">Montería</option>
                      <option value="Bogota">Bogotá</option>
                      <option value="Cartagena">Cartagena</option>
                      <option value="Cali">Cali</option>
                      <option value="Monteria">Montería</option>
                      <option value="Medellin">Medellín</option>
                    </select>
                  </h3>
                  <span className="spanDestino">Selecione un destino</span>
                </span>
              </div>
            </div>
            <div className="salidaRegreso">
              <div className="salida">
                <span>
                  <h3>Salida</h3>
                  <input
                    onChange={handleChangeInput}
                    type="date"
                    name="salidaDate"
                    className="main_form_control"
                    aria-label="Fecha"
                    aria-describedby="date"
                    min=""
                    max=""
                  />
                </span>
              </div>
              <div className="regreso">
                <span>
                  <h3>Regreso</h3>
                  <input
                    onChange={handleChangeInput}
                    type="date"
                    name="regresoDate"
                    className="main_form_control"
                    aria-label="Fecha"
                    aria-describedby="date"
                    min=""
                    max=""
                  />
                </span>
              </div>
            </div>
            <div className="pasajerosContainer">
              <div
                onClick={() => setOpenOptions(!openOptions)}
                className="pasajeros"
              >
                <span>
                  <h3>Pasajeros</h3>
                </span>
                <span>{`${options.adult} Adultos · ${options.children} Niños · ${options.baby} Bebés`}</span>
              </div>
              {openOptions && (
                <div className="options" onChange={handleChangeInput}>
                  <div className="optionItem">
                    <span>Adulto</span>
                    <span
                      disabled={options.adult <= 1}
                      onClick={() => {
                        handleOption("adult", "d");
                      }}
                      className="Counter"
                    >
                      -
                    </span>
                    <span className="CounterNumber">{options.adult}</span>
                    <span
                      onClick={() => {
                        handleOption("adult", "i");
                      }}
                      className="Counter"
                    >
                      +
                    </span>
                  </div>
                  <div className="optionItem">
                    <span>Niños</span>
                    <span
                      disabled={options.children <= 1}
                      onClick={() => {
                        handleOption("children", "d");
                      }}
                      className="Counter"
                    >
                      -
                    </span>
                    <span className="CounterNumber">{options.children}</span>
                    <span
                      onClick={() => {
                        handleOption("children", "i");
                      }}
                      className="Counter"
                    >
                      +
                    </span>
                  </div>
                  <div className="optionItem">
                    <span>Bebés</span>
                    <span
                      disabled={options.baby <= 1}
                      onClick={() => {
                        handleOption("baby", "d");
                      }}
                      className="Counter"
                    >
                      -
                    </span>
                    <span className="CounterNumber">{options.baby}</span>
                    <span
                      onClick={() => {
                        handleOption("baby", "i");
                      }}
                      className="Counter"
                    >
                      +
                    </span>
                  </div>
                </div>
              )}

              <div className="codigo">
                <span>
                  <h3>¿Tienes un código de promoción?</h3>
                  <input type="text" placeholder="-- -- -- --" />
                </span>
              </div>
            </div>

            <button className="button" type="submit">
              <span className="buttonVuelos">Buscar vuelos</span>
            </button>
          </form>
        </div>
        <div className="img">
          <img
            src="https://i.blogs.es/a5cc14/istock-538347884/1366_2000.jpg"
            alt="ala"
          />
        </div>
      </div>
      <div className="container__pago">
        <div className="header__pago">
          <h1>Pago seguro</h1>
        </div>
        <div className="row">
          <div className="izquierda">
            <div className="payment__cards">
              <div className="imgList">
                <div>
                  <p>
                    {" "}
                    Tarjeta de crédito, tarjeta de débito y pago electrónico
                  </p>
                </div>
                <img
                  className="targets"
                  src="https://cms.volaris.com/globalassets/1nextgen/payments/visa.svg"
                  alt="visa"
                />
                <img
                  className="targets"
                  src="https://cms.volaris.com/globalassets/1nextgen/payments/mastercard.svg"
                  alt="mastercard"
                />
                <img
                  className="targets"
                  src="https://cms.volaris.com/globalassets/1nextgen/payments/amex.svg"
                  alt="amex"
                />
                <img
                  className="targets"
                  src="https://cms.volaris.com/globalassets/1nextgen/payments/paypal.svg"
                  alt="paypal"
                />
                <img
                  className="targets"
                  src="https://cms.volaris.com/globalassets/1nextgen/payments/invex.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="derecha">
            <div className="sucursales__cards">
              <div className="imgList">
                <div>
                  <p> Efectivo en cualquiera de las sucursales participantes</p>
                </div>
                <img
                  className="targets"
                  src="https://cms.volaris.com/globalassets/1nextgen/payments/oxxo.svg"
                  alt="oxxo"
                />
                <img
                  className="targets"
                  src="https://cms.volaris.com/globalassets/1nextgen/payments/seven.svg"
                  alt="seven"
                />
                <img
                  className="targets"
                  src="https://cms.volaris.com/globalassets/1nextgen/payments/walmart.svg"
                  alt="walmart"
                />
                <img
                  className="targets"
                  src="https://cms.volaris.com/globalassets/1nextgen/payments/famahorro.svg"
                  alt="farmahorro"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container__items">
        <div className="items">
          <div className="item-mas-texto">
            <div className="transporte">
              <img
                src="https://cms.volaris.com/globalassets/1nextgen/externalproducts/hovertransportation.svg"
                alt="carro"
              />
              <div className="card-header">Transporte</div>
              <p className="card-content">
                Renta un auto o reserva un shuttle.
              </p>
            </div>
            <div className="yavas">
              <img
                src="https://cms.volaris.com/globalassets/1nextgen/externalproducts/hoveryavas.svg"
                alt="yavas"
              />
              <div className="card-header">Vuelo + Hotel</div>
              <p className="card-content">
                Encuentra las mejores ofertas para tu viaje.
              </p>
            </div>
            <div className="grupos">
              <img
                src="https://cms.volaris.com/globalassets/1nextgen/externalproducts/hovergroups.svg"
                alt="grupos"
              />
              <div className="card-header">Grupos</div>
              <p className="card-content">
                Obtén una cotización para grupos de más de 9 personas.
              </p>
            </div>
            <div className="hoteles">
              <img
                src="https://cms.volaris.com/globalassets/1nextgen/externalproducts/hoverhotels.svg"
                alt="hoteles"
              />
              <div className="card-header">Hoteles</div>
              <p className="card-content">
                Reserva una habitación en cualquier parte del mundo.
              </p>
            </div>
            <div className="carga">
              <img
                src="https://cms.volaris.com/globalassets/1nextgen/externalproducts/hovercargo.svg"
                alt="carga"
              />
              <div className="card-header">Carga</div>
              <p className="card-content">
                Contamos con servicio de carga y mensajería.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;

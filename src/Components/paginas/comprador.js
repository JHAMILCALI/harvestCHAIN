import React, { useState, useEffect } from 'react';
import img1 from '../../assets/img/quinua2.jpg';
import img2 from '../../assets/img/cacao.jpg';
import img3 from '../../assets/img/arroz.jpg';

const Comprador = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const cargar = (item) => {
    const mostrador = document.getElementById("mostrador");
    const seleccion = document.getElementById("seleccion");
    const imgSeleccionada = document.getElementById("img");
    const modeloSeleccionado = document.getElementById("modelo");
    const descripSeleccionada = document.getElementById("descripcion");
    const precioSeleccionado = document.getElementById("precio");

    // Reset borders
    document.querySelectorAll('.item').forEach(el => el.style.border = "none");

    // Update selection
    mostrador.style.width = "60%";
    seleccion.style.width = "40%";
    seleccion.style.opacity = "1";
    item.style.border = "2px solid red";

    imgSeleccionada.src = item.querySelector("img").src;
    modeloSeleccionado.innerHTML = item.querySelector("p").innerHTML;
    descripSeleccionada.innerHTML = "Descripción del modelo";
    precioSeleccionado.innerHTML = item.querySelector("span").innerHTML;
  };

  const cerrar = () => {
    const mostrador = document.getElementById("mostrador");
    const seleccion = document.getElementById("seleccion");

    mostrador.style.width = "100%";
    seleccion.style.width = "0%";
    seleccion.style.opacity = "0";
    document.querySelectorAll('.item').forEach(el => el.style.border = "none");
  };

  useEffect(() => {
    // Attach event listeners
    document.querySelectorAll('.item').forEach(item => {
      item.addEventListener('click', () => cargar(item));
    });

    document.querySelector('.cerrar').addEventListener('click', cerrar);

    // Clean up event listeners on component unmount
    return () => {
      document.querySelectorAll('.item').forEach(item => {
        item.removeEventListener('click', () => cargar(item));
      });
      const cerrarElement = document.querySelector('.cerrar');
      if (cerrarElement) {
        cerrarElement.removeEventListener('click', cerrar);
      }
    };
  }, []);

  return (
    <div>
      <h1>TRANSACCIÓN DE COMPRADOR</h1>
      <section className="contenido">
        <div className="mostrador" id="mostrador">
          <div className="fila">
            <div className="item">
              <div className="contenedor-foto">
                <img src={img1} alt="NIKE AIR 97"/>
              </div>
              <p className="descripcion">NIKE AIR 97</p>
              <span className="precio">$ 1.300</span>
            </div>
            <div className="item">
              <div className="contenedor-foto">
                <img src={img2} alt="NIKE RUNNING TERRA"/>
              </div>
              <p className="descripcion">NIKE RUNNING TERRA</p>
              <span className="precio">$ 1.800</span>
            </div>
            <div className="item">
              <div className="contenedor-foto">
                <img src={img3} alt="NIKE WINFLO 8"/>
              </div>
              <p className="descripcion">NIKE WINFLO 8</p>
              <span className="precio">$ 3.600</span>
            </div>
          </div>
        </div>
        <div className="seleccion" id="seleccion">
          <div className="cerrar" onClick={cerrar}>
            &#x2715;
          </div>
          <div className="info">
            <img src={img1} id="img" alt=""/>
            <h2 id="modelo">NIKE MODEL 1</h2>
            <p id="descripcion">Descripción Modelo 1</p>
            <span className="precio" id="precio">$ 130</span>
            <div className="fila">
              <div className="size">
                <label htmlFor="">SIZE</label>
                <select id="">
                  <option value="">40</option>
                  <option value="">42</option>
                  <option value="">44</option>
                  <option value="">46</option>
                </select>
              </div>
              <button>AGREGAR AL CARRITO</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comprador;

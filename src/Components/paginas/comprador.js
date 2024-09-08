import React, { useState, useEffect } from 'react';
import img1 from '../../assets/img/quinua2.jpg';
import img2 from '../../assets/img/cacao.jpg';
import img3 from '../../assets/img/arroz.jpg';
import { ethers, parseEther, formatEther, Contract, BrowserProvider } from 'ethers';
import ContractABI from './FundMe.json';
import Alert from '../navegacion/alert'; // Asegúrate de importar el componente Alert

const CONTRACT_ADDRESS = '0xb1b353a20cf0be3b1122a18cb4a00cf8bfd51b4b';

const Comprador = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [fundedAmount, setFundedAmount] = useState(0);
  const [userAddress, setUserAddress] = useState("0x2051EbdD86aCc8F81989B7CAd4B46dE1F9536355");
  const [alert, setAlert] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const initEthers = async () => {
      const provider = new BrowserProvider(window.ethereum);
      setProvider(provider);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setSigner(signer);
      const contractInstance = new Contract(CONTRACT_ADDRESS, ContractABI, signer);
      setContract(contractInstance);
    };

    initEthers();
  }, []);

  const getFundedAmount = async () => {
    if (contract) {
      const amount = await contract.getBalance();
      setFundedAmount(formatEther(amount));
    }
  };

  const handleFund = async () => {
    if (contract && userAddress) {
      try {
        const tx = await contract.fundWallet(userAddress, {
          value: parseEther("0.0005"),
        });
        await tx.wait();
        setAlert({ message: 'Funds sent successfully!', type: 'success' });

        // Set timeout to close alert after 5 seconds
        setTimeout(() => {
          setAlert(null);
        }, 5000);

      } catch (error) {
        setAlert({ message: 'Error sending funds.', type: 'error' });

        // Set timeout to close alert after 5 seconds
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
    }
  };

  const closeAlert = () => {
    setAlert(null);
  };

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
    descripSeleccionada.innerHTML = "Descripción";
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
      <h1>BUYER TRANSACTION</h1>
      <section className="contenido">
        {alert && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}
        <div className="mostrador" id="mostrador">
          <div className="fila">
            <div className="item">
              <div className="contenedor-foto">
                <img src={img1} alt="QUINOA"/>
              </div>
              <p className="descripcion">QUINOA</p>
              <span className="precio">ETH 0.05</span>
            </div>
            <div className="item">
              <div className="contenedor-foto">
                <img src={img2} alt="COCOA"/>
              </div>
              <p className="descripcion">COCOA</p>
              <span className="precio">ETH 0.008</span>
            </div>
            <div className="item">
              <div className="contenedor-foto">
                <img src={img3} alt="RICE"/>
              </div>
              <p className="descripcion">RICE</p>
              <span className="precio">ETH 0.005</span>
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
            <p id="descripcion">Description 1</p>
            <span className="precio" id="precio">$ 130</span>
            <div className="fila">
              <div className="size">
                <label htmlFor="">AMOUNT</label>
                <select id="">
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                </select>
              </div>
              <button onClick={handleFund}>Buy</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comprador;

import React, { useState, useEffect } from 'react';
import img1 from '../../assets/img/quinua2.jpg';
import img2 from '../../assets/img/cacao.jpg';
import img3 from '../../assets/img/arroz.jpg';
import { ethers, parseEther, formatEther, Contract, BrowserProvider } from 'ethers';
import ContractABI from './FundMe.json';

const CONTRACT_ADDRESS = '0xb1b353a20cf0be3b1122a18cb4a00cf8bfd51b4b';


const Comprador = () => {

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [fundedAmount, setFundedAmount] = useState(0);
  const [userAddress, setUserAddress] = useState("0x2051EbdD86aCc8F81989B7CAd4B46dE1F9536355");

  useEffect(() => {
      const initEthers = async () => {
          // Crea una instancia de un proveedor de Ethereum (MetaMask)
          const provider = new BrowserProvider(window.ethereum);
          setProvider(provider);

          // Solicita acceso a la cuenta del usuario
          await provider.send("eth_requestAccounts", []);

          // Obtén el signer (la cuenta que firma las transacciones)
          const signer = await provider.getSigner();
          setSigner(signer);

          // Crea una instancia del contrato
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
          const tx = await contract.fundWallet(userAddress, {
              value: parseEther("0.0005"), // Monto que deseas enviar (0.1 ETH en este caso)
          });
          await tx.wait(); // Espera la confirmación de la transacción
          alert('Funds sent!');
      }
  };
  
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
        <div className="mostrador" id="mostrador">
          <div className="fila">
            <div className="item">
              <div className="contenedor-foto">
                <img src={img1} alt="NIKE AIR 97"/>
              </div>
              <p className="descripcion">QUINOA</p>
              <span className="precio">ETH 0.05</span>
            </div>
            <div className="item">
              <div className="contenedor-foto">
                <img src={img2} alt="NIKE RUNNING TERRA"/>
              </div>
              <p className="descripcion">COCOA</p>
              <span className="precio">ETH 0.008</span>
            </div>
            <div className="item">
              <div className="contenedor-foto">
                <img src={img3} alt="NIKE WINFLO 8"/>
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
            <p id="descripcion">Descripción 1</p>
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

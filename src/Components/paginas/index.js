import React, { useEffect, useState } from 'react';
import { ethers, parseEther, formatEther, Contract, BrowserProvider } from 'ethers';
import ContractABI from './FundMe.json';

const CONTRACT_ADDRESS = '0xb1b353a20cf0be3b1122a18cb4a00cf8bfd51b4b';

const App = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [fundedAmount, setFundedAmount] = useState(0);
    const [userAddress, setUserAddress] = useState("");

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
            alert('¡Fondos enviados!');
        }
    };

    return (
        <div>
            <h1>Contrato de Fondos</h1>

            <div>
                <button onClick={getFundedAmount}>Consultar Balance del Contrato</button>
                <p>Balance: {fundedAmount} ETH</p>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Ingresa la dirección del destinatario"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                />
                <button onClick={handleFund}>Enviar Fondos</button>
            </div>
        </div>
    );
};

export default App;
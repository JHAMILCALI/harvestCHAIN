import React, { useState } from 'react';
import { BrowserProvider, Contract, parseEther } from 'ethers';
import SimpleDAOABI from './SimpleDAOABI.js';

const SimpleDAO = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  // Cargar el contrato
  const loadContract = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = '0xb68966ed40a3233ac23d14de6a219a1d8e1f0769338a4a8433d08bc0729ed002';  // Dirección del contrato desplegado
    const contract = new Contract(contractAddress, SimpleDAOABI, signer);
    return contract;
  };

  // Comprar acciones
  const buyShares = async () => {
    const contract = await loadContract();
    try {
      const tx = await contract.buyShares({ value: parseEther(amount) });
      await tx.wait();
      setMessage("Shares bought successfully!");
    } catch (error) {
      setMessage("Error buying shares: " + error.message);
    }
  };

  // Proponer un gasto
  const proposeSpending = async () => {
    const contract = await loadContract();
    try {
      const tx = await contract.proposeSpending(parseEther(amount), recipient);
      await tx.wait();
      setMessage("Spending proposed successfully!");
    } catch (error) {
      setMessage("Error proposing spending: " + error.message);
    }
  };

  return (
    <div>
      <h1>SimpleDAO Interaction</h1>
      <div>
        <h2>Buy Shares</h2>
        <input 
          type="text" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          placeholder="Amount in Ether" 
        />
        <button onClick={buyShares}>Buy Shares</button>
      </div>

      <div>
        <h2>Propose Spending</h2>
        <input 
          type="text" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          placeholder="Amount in Ether" 
        />
        <input 
          type="text" 
          value={recipient} 
          onChange={e => setRecipient(e.target.value)} 
          placeholder="Recipient Address" 
        />
        <button onClick={proposeSpending}>Propose Spending</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SimpleDAO;
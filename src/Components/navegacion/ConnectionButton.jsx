import React, { useState } from 'react';
import walletIcon from '../../assets/img/login_usuario.png';
import '../estilos/estilo.css';

export default function ConnectionButton() {
  const [buttonText, setButtonText] = useState('Conectar wallet');
  const [account, setAccount] = useState(null);

  const connectWallet = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          setAccount(result[0]);
          setButtonText(null);
        })
        .catch(error => {
          setButtonText(error.message);
        });
    } else {
      setButtonText('Necesitas tener MetaMask');
    }
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <button className="button-rounded" onClick={connectWallet}>
      {account && (
        <img src={walletIcon} alt="Wallet Icon" style={{ width: '50px', marginRight: '8px' }} />
      )}
      {account ? truncateAddress(account) : buttonText}
    </button>
  );
}

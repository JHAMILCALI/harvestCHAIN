import React from 'react';
import '../estilos/estilo.css'; // Asegúrate de crear este archivo CSS para estilos

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert ${type}`} onClick={onClose}>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
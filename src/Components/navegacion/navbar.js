// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/img/img1.png';
import ConnectionButton from './ConnectionButton'; // Make sure the path is correct
import '../estilos/estilo.css'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-color">
        <div className="container-fluid">
          <Link to='/'>
            <img src={img1} width='50%' alt="Logo"/>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse color-ul" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/productor'>Producer</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/distribuidor'>Distributor</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/comprador'>Buyer</Link>
              </li>
            </ul>
            <div className="navbar-nav">
              <ConnectionButton/>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

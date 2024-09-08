// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/estilo.css'

const Footer = () => {
  return (
    <div>
      <footer>
    <div class="footerContainer">
        <div class="socialIcons">
        <a href="https://github.com/JHAMILCALI/harvestCHAIN" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
        </div>
        <div class="footerNav">
            <ul><li></li>
                <li><Link to='/'>Home</Link></li>
                <li> <Link to='/productor'>Producer</Link></li>
                <li><Link to='/distribuidor'>Distributor</Link></li>
                <li><Link to='/comprador'>Buyer</Link></li>
            </ul>
        </div>
        
    </div>
    <div class="footerBottom">
        <p>&copy; 2024 harvestCHAIN. All rights reserved.</p>
    </div>
</footer>
    </div>
  );
};

export default Footer;

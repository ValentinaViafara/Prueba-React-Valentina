import React from 'react';
import logo from '../assets/logo192.png';

function Header() {

  const fontStyle = {
    fontSize: '40px', 
    textAlign: 'left' 
  };

  return (
    <header className="header">
      <div className="header-container">
      <div className="header-column" style={{maxWidth: '5%'}}>
          <img src={logo} alt="Logo" className="header-logo" style={{height: '80px', width: '80px'}}/>
      </div>
        <div className="header-column" style={{maxWidth: '50%', marginTop: '15px'}}>
          <h1 className="header-title"  style={fontStyle}>Prueba REACT - Valentina Viafara</h1>
        </div>
        <div className="header-column" style={{maxWidth: '40%'}}>
          <nav className="navbar">
            <ul className="nav-list" style={{'font-size': '30px', marginTop: '20px', 'font-size': '30px'}}>
              <li className="nav-item" style={{paddingRight: '50px'}}><a href="/client">Cliente</a></li>
              <li className="nav-item" style={{paddingRight: '50px'}}><a href="/stretch">Tramos</a></li>
              <li className="nav-item" style={{paddingRight: '50px'}}><a href="/client-stretch">Tramos Clientes</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

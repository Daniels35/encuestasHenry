import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className='header-container-link'>
        <Link className='header-link' to="/encuestasHenry">
        </Link>
      </div>
    </header>
  );
}

export default Header;

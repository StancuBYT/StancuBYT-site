import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header({ showLogo }) {
  return (
    <header>
      {showLogo && <img src={logo} alt="StancuBYT Logo" className="logo" />}
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> | 
        <Link to="/roadmap">Roadmap</Link> | 
        <Link to="/team">Team</Link> | 
        <Link to="/whitepaper">Whitepaper</Link>
      </nav>
    </header>
  );
}


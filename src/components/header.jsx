import React from 'react';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      background: 'linear-gradient(90deg, #4b00ff, #8e2de2)',
      color: 'white'
    }}>
      <img src={logo} alt="StancuBYT Logo" style={{ width: '50px', marginRight: '20px' }} />
      <h1>StancuBYT Official</h1>
    </header>
  );
}


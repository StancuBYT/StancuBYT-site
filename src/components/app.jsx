import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4b00ff, #8e2de2)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      color: 'white'
    }}>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}


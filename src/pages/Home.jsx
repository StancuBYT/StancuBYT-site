import React from 'react';
import PriceChart from '../components/PriceChart';
import logo from '../assets/logo.png';

export default function Home() {
  const pairAddress = "0xabfa4bdb1b4485e0c590bba4adc93a3980f591e4"; // adresa pair token/STBYT

  return (
    <main style={{
      textAlign: 'center',
      padding: '50px',
      backgroundImage: `url(${logo})`,
      backgroundPosition: 'center',
      backgroundSize: '20%',
      backgroundRepeat: 'no-repeat'
    }}>
      <h2>StancuBYT - Token Oficial</h2>
      <p>Tranzacții rapide, sigure și recompense pentru comunitatea noastră digitală.</p>
      <div style={{ maxWidth: '800px', margin: '50px auto' }}>
        <PriceChart pairAddress={pairAddress} />
      </div>
    </main>
  );
}


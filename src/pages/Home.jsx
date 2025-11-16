import React from 'react';
import PriceChart from '../components/PriceChart';

export default function Home() {
  const pairAddress = "0xabfa4bdb1b4485e0c590bba4adc93a3980f591e4"; // adresa pair token/STBYT

  return (
    <main style={{ padding: '50px', textAlign: 'center' }}>
      <h1>StancuBYT - Token Oficial</h1>
      <p>Tranzacții rapide și sigure pentru comunitatea noastră digitală.</p>
      <div style={{ maxWidth: '800px', margin: '50px auto' }}>
        <PriceChart pairAddress={pairAddress} />
      </div>
    </main>
  );
}


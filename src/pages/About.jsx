import React from "react";

export default function About(){
  return (
    <div className="panel">
      <h2 className="h1">Despre StancuBYT</h2>
      <p className="lead">Obiective</p>
      <ul className="small">
        <li>Crearea unei comunități puternice axate pe adoptare token</li>
        <li>Integrare în aplicații descentralizate și staking</li>
        <li>Transparență și comunicare deschisă</li>
      </ul>

      <h3 style={{marginTop:16}}>Tokenomics</h3>
      <div className="small">
        Total supply: <strong>4,000,000 STBYT</strong><br/>
        Contract: <code>0x44Cf220399be798baeaE45fd7C4fF44623713833</code>
      </div>
    </div>
  )
}


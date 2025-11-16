import React from "react";
import TokenInfo from "../components/TokenInfo";
import BuyButton from "../components/BuyButton";

export default function Home(){
  return (
    <>
      <section className="panel">
        <h2 className="h1">Bine ai venit la StancuBYT</h2>
        <p className="lead">StancuBYT (STBYT) — tokenul comunității. Supply limitat: 4.000.000.</p>
        <TokenInfo />
        <div style={{marginTop:16}}>
          <BuyButton />
        </div>
      </section>

      <section className="panel">
        <h3 className="section-title">Scurtă descriere</h3>
        <p className="small">
          STBYT oferă tranzacții rapide, opțiuni pentru staking și integrare în aplicații descentralizate. Ne concentrăm pe transparență, securitate și creșterea comunității.
        </p>
      </section>
    </>
  )
}


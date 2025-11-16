import React from "react";

export default function Team(){
  return (
    <div className="panel">
      <h2 className="h1">Echipa</h2>

      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        <div style={{minWidth:220}} className="panel">
          <div style={{fontWeight:700}}>Marian Stancu</div>
          <div className="small">Fondator · Product</div>
          <div style={{marginTop:8}} className="small">
            LinkedIn: <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">profil</a><br/>
            Email: <a href="mailto:stancubyt@gmail.com">stancubyt@gmail.com</a>
          </div>
        </div>

        {/* Poți adăuga membri suplimentari */}
      </div>

      <p className="small" style={{marginTop:12}}>
        Pentru validare Etherscan, asigură-te că ai profil LinkedIn real pentru fiecare membru listat.
      </p>
    </div>
  )
}


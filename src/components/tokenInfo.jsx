import React from "react";

export default function TokenInfo(){
  return (
    <div className="panel">
      <h3>Token info</h3>
      <div className="token-grid" style={{marginTop:12}}>
        <div className="token-card">
          <div className="small">Contract</div>
          <div style={{wordBreak:"break-all"}}>0x44Cf220399be798baeaE45fd7C4fF44623713833</div>
        </div>
        <div className="token-card">
          <div className="small">Total Supply</div>
          <div>4,000,000 STBYT</div>
        </div>
        <div className="token-card">
          <div className="small">Symbol</div>
          <div>STBYT</div>
        </div>
      </div>
    </div>
  )
}


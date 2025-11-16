import React, {useState} from "react";

const roadmap = [
  {id:1,title:"Lansare contract",note:"Contract verificat pe Etherscan (finalizat)"},
  {id:2,title:"Pool Uniswap",note:"Pregătire lichiditate (în curs)"},
  {id:3,title:"Listări CMC/CG",note:"Aplicare după lichiditate (planificat)"},
];

export default function Roadmap(){
  const [open,setOpen] = useState([]);
  const toggle = (id)=> setOpen(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]);

  return (
    <div className="panel">
      <h2 className="h1">Roadmap</h2>
      {roadmap.map(r => (
        <div className="roadmap-item" key={r.id}>
          <button className="btn" onClick={()=>toggle(r.id)}>{r.title}</button>
          {open.includes(r.id) && <div style={{marginTop:8}} className="small panel">{r.note}</div>}
        </div>
      ))}
    </div>
  )
}


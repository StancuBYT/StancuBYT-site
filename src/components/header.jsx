import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(){
  return (
    <header className="header container">
      <img src="/logo.svg" alt="logo" className="logo" />
      <div>
        <div className="h1">StancuBYT (STBYT)</div>
        <div className="small">Token oficial al comunității StancuBYT</div>
      </div>

      <nav className="nav" aria-label="main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/roadmap">Roadmap</NavLink>
        <NavLink to="/team">Team</NavLink>
        <NavLink to="/whitepaper">Whitepaper</NavLink>
      </nav>
    </header>
  )
}


import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="flex items-center justify-between p-4">
      {isHome && <img src={logo} alt="StancuBYT Logo" className="h-16" />}
      <nav>
        <ul className="flex gap-4 text-white font-semibold">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/roadmap">Roadmap</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><Link to="/whitepaper">Whitepaper</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


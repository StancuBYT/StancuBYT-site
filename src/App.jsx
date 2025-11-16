import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Roadmap from "./pages/Roadmap";
import Team from "./pages/Team";
import WhitepaperPage from "./pages/WhitepaperPage";

export default function App(){
  return (
    <div className="page-root">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/roadmap" element={<Roadmap/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/whitepaper" element={<WhitepaperPage/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Roadmap from './pages/Roadmap';
import Team from './pages/Team';
import WhitepaperPage from './pages/WhitepaperPage';
import './index.css';

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Header showLogo={true} />
              <Home />
              <Footer />
            </>
          }/>
          <Route path="/about" element={
            <>
              <Header showLogo={false} />
              <About />
              <Footer />
            </>
          }/>
          <Route path="/roadmap" element={
            <>
              <Header showLogo={false} />
              <Roadmap />
              <Footer />
            </>
          }/>
          <Route path="/team" element={
            <>
              <Header showLogo={false} />
              <Team />
              <Footer />
            </>
          }/>
          <Route path="/whitepaper" element={
            <>
              <Header showLogo={false} />
              <WhitepaperPage />
              <Footer />
            </>
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


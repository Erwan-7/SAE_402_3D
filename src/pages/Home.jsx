import React, { useState, useEffect } from "react";
import WorldMap3D from "../components/WorldMap3D";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { HeaderMotifs, FooterMotifs, MapMotifs } from "../components/EgyptianMotifs";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? false : true;
  });

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      // Small delay to ensure the first frame of the globe is rendered
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Si on est en mode sombre, on supprime l'assombrissement du logo pour qu'il soit bien visible
  const logoFilter = isDarkMode 
    ? 'drop-shadow(0px 0px 5px rgba(212,175,55,0.3))' 
    : 'brightness(0.6) contrast(1.5) drop-shadow(0px 0px 1.5px rgba(0,0,0,0.8))';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isReady ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ willChange: "opacity" }}
      className="layout-container"
    >
      <header style={{ 
        padding: '0 min(4rem, 5vw)',
        justifyContent: 'center' // Center content on mobile
      }}>
        <HeaderMotifs />
        <Link to="/" style={{ 
          zIndex: 2000, 
          position: 'absolute', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          left: 'clamp(1rem, 5vw, 4rem)' 
        }}>
          <img src={logo} alt="Notre Logo" decoding="async" className="logo-main" style={{ filter: logoFilter, transition: 'filter 0.3s ease' }} />
        </Link>
        <h1 style={{ 
          margin: 0, 
          zIndex: 1, 
          position: 'relative',
          fontSize: 'clamp(0.8rem, 4.5vw, 1.5rem)',
          textAlign: 'right',
          width: '100%'
        }}>LE SEIGNEUR DE VIE</h1>
      </header>

      <main style={{ position: 'relative' }}>
        <MapMotifs />
        <section className="map-section" style={{ zIndex: 1 }}>
          <button 
             className="theme-toggle-btn"
             onClick={toggleTheme}
             title="Changer le thème"
          >
             {isDarkMode ? '☀️' : '🌙'}
          </button>
          <WorldMap3D />
        </section>
      </main>

      <footer>
        <FooterMotifs />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Explorateurs. Tous droits réservés. - Suivez la trace du Seigneur de Vie.</p>
        </div>
      </footer>
    </motion.div>
  );
}

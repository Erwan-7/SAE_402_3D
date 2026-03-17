import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { MapMotifs } from '../components/EgyptianMotifs';

export default function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? false : true;
  });

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Si on est en mode sombre, on supprime l'assombrissement du logo
  const logoFilter = isDarkMode 
    ? 'drop-shadow(0px 0px 5px rgba(212,175,55,0.3))' 
    : 'brightness(0.6) contrast(1.5) drop-shadow(0px 0px 1.5px rgba(0,0,0,0.8))';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--color-white)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        willChange: "opacity"
      }}
    >
      <button 
         className="theme-toggle-btn"
         onClick={toggleTheme}
         title="Changer le thème"
         style={{ position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 100 }}
      >
         {isDarkMode ? '☀️' : '🌙'}
      </button>

      <MapMotifs />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'var(--color-black)',
        textAlign: 'center',
        padding: '0 2rem',
        maxWidth: '1200px',
        marginTop: '-12vh'
      }}>
        <img src={logo} alt="Logo" style={{ 
            height: '60vh', 
            maxWidth: '90vw', 
            objectFit: 'contain', 
            marginBottom: '-15vh', /* Annule l'énorme marge interne invisible proportionnellement */
            filter: logoFilter, 
            transition: 'filter 0.3s ease' 
        }} />
        
        <h2 style={{ 
          fontSize: 'clamp(1.3rem, 3vh, 1.8rem)', 
          margin: '0 0 1.5vh 0', 
          fontFamily: 'var(--font-title)', 
          color: 'var(--color-gray)',
          textTransform: 'uppercase',
          letterSpacing: '5px'
        }}>
          Le Seigneur de Vie
        </h2>
        
        <h1 style={{ 
          fontSize: 'clamp(2.7rem, 6.5vh, 6rem)', 
          margin: '0 0 3vh 0', 
          fontFamily: '"Times New Roman", Times, Georgia, serif', 
          color: 'var(--color-gold)'
        }}>
          Bienvenue dans l'Antiquité
        </h1>
        
        <p style={{ 
          fontSize: 'clamp(1.2rem, 2.5vh, 1.8rem)', 
          lineHeight: '1.4', 
          margin: '0 0 4.5vh 0',
          fontFamily: 'var(--font-title)'
        }}>
          Embarquez pour une expédition virtuelle inédite à travers les millénaires.<br />
          Venez découvrir les divinités secrètes des pharaons, la richesse d'une culture intemporelle,<br />
          et la force créatrice du Seigneur de Vie, dissimulée dans chaque hiéroglyphe de notre histoire.
        </p>
        
        <Link 
          to="/map" 
          style={{
            padding: '2vh 5.5vh',
            backgroundColor: 'var(--color-gold)',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontSize: 'clamp(1.3rem, 2.2vh, 1.6rem)',
            fontFamily: '"Times New Roman", Times, Georgia, serif',
            fontWeight: 'bold',
            borderRadius: '5px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(200, 160, 88, 0.4)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(200, 160, 88, 0.6)';
            e.currentTarget.style.backgroundColor = '#dcb974';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(200, 160, 88, 0.4)';
            e.currentTarget.style.backgroundColor = '#C8A058';
          }}
        >
          Accéder à la carte
        </Link>
      </div>
    </motion.div>
  );
}

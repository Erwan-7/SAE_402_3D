import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { MapMotifs } from '../components/EgyptianMotifs';
import OpeningAnimation from '../components/OpeningAnimation';

// Variable outside the component to persist only during the current page session (clears on refresh)
let hasAnimationPlayedThisSession = false;

export default function Landing() {
  const [showAnimation, setShowAnimation] = useState(() => {
    // If we already played it since the last full page refresh, don't show it again
    if (hasAnimationPlayedThisSession) return false;
    
    // Fallback/safety check with sessionStorage if needed, but the user specifically asked for "only on refresh"
    return true;
  });

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

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    hasAnimationPlayedThisSession = true;
    sessionStorage.setItem('animationShown', 'true');
  };

  // Si on est en mode sombre, on supprime l'assombrissement du logo
  const logoFilter = isDarkMode 
    ? 'drop-shadow(0px 0px 5px rgba(212,175,55,0.3))' 
    : 'brightness(0.6) contrast(1.5) drop-shadow(0px 0px 1.5px rgba(0,0,0,0.8))';

  return (
    <>
      {showAnimation && <OpeningAnimation onComplete={handleAnimationComplete} />}
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showAnimation ? 0 : 1 }}
        transition={{ duration: 0.8, delay: showAnimation ? 0 : 0.2 }}
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
          padding: '0 1rem',
          width: '100%',
          maxWidth: '1200px',
          marginTop: 'clamp(-5vh, -2vh, 0vh)'
        }}>
          <img src={logo} alt="Logo" style={{ 
              height: 'min(50vh, 400px)', 
              maxWidth: '85vw', 
              objectFit: 'contain', 
              marginBottom: '-8vh',
              filter: logoFilter, 
              transition: 'filter 0.3s ease' 
          }} />
          
          <h2 style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', 
            margin: '0 0 1vh 0', 
            fontFamily: 'var(--font-title)', 
            color: 'var(--color-gray)',
            textTransform: 'uppercase',
            letterSpacing: 'clamp(2px, 1vw, 5px)'
          }}>
            Le Seigneur de Vie
          </h2>
          
          <h1 style={{ 
            fontSize: 'clamp(1.8rem, 5.5vw, 5rem)', 
            margin: '0 0 2vh 0', 
            fontFamily: '"Times New Roman", Times, Georgia, serif', 
            color: 'var(--color-gold)',
            lineHeight: 1.1
          }}>
            Bienvenue dans l'Antiquité
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(0.95rem, 2vw, 1.4rem)', 
            lineHeight: '1.4', 
            margin: '0 0 4vh 0',
            fontFamily: 'var(--font-title)',
            padding: '0 5%'
          }}>
            Embarquez pour une expédition virtuelle inédite à travers les millénaires.<br className="hidden-mobile" />
            Venez découvrir les divinités secrètes des pharaons, la richesse d'une culture intemporelle,<br className="hidden-mobile" />
            et la force créatrice du Seigneur de Vie.
          </p>
          
          <Link 
            to="/map" 
            style={{
              padding: '1.5vh 4vh',
              backgroundColor: 'var(--color-gold)',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: 'clamp(1rem, 2vh, 1.4rem)',
              fontFamily: '"Times New Roman", Times, Georgia, serif',
              fontWeight: 'bold',
              borderRadius: '5px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
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
    </>
  );
}


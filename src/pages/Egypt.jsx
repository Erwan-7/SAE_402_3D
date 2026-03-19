import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Model3D from "../components/Model3D";
import logo from "../assets/logo.png";
import art1 from "../assets/art1.png";
import art2 from "../assets/art2.png";
import { HeaderMotifs, FooterMotifs, MapMotifs } from "../components/EgyptianMotifs";

export default function Egypt() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? false : true;
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const logoFilter = isDarkMode 
    ? 'drop-shadow(0px 0px 8px rgba(212,175,55,0.5)) contrast(1.1)' 
    : 'brightness(0.6) contrast(1.5) drop-shadow(0px 0px 2.5px rgba(0,0,0,0.6))';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ willChange: "opacity" }} 
      className="layout-container"
    >
      <header style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        padding: '0 min(4rem, 5vw)'
      }}>
        <HeaderMotifs />
        <Link to="/" style={{ 
          zIndex: 2000, 
          position: 'absolute', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          left: 'clamp(0.5rem, 3.5vw, 4rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
             position: 'relative',
             padding: '8px',
             borderRadius: '50%',
             background: isDarkMode 
               ? 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 75%)' 
               : 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 75%)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.background = isDarkMode 
              ? 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 75%)' 
              : 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, transparent 75%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = isDarkMode 
              ? 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 75%)' 
              : 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 75%)';
          }}
          >
            <img src={logo} alt="Notre Logo" className="logo-main" style={{ 
              filter: logoFilter, 
              transition: 'all 0.4s ease',
              position: 'relative',
              zIndex: 2
            }} />
          </div>
        </Link>
        <h1 className="header-title" style={{ 
          margin: 0, 
          zIndex: 1, 
          position: 'relative',
          fontSize: 'clamp(0.8rem, 4.5vw, 1.5rem)',
          textAlign: window.innerWidth <= 768 ? 'center' : 'right',
          width: '100%',
          paddingRight: window.innerWidth <= 768 ? '0' : '2rem'
        }}>LE SEIGNEUR DE VIE</h1>
      </header>
      
      <main style={{ 
        marginTop: 'clamp(70px, 12vh, 85px)',
        position: 'relative', 
        overflowY: 'auto', 
        backgroundColor: 'var(--color-white)', 
        scrollBehavior: 'smooth', 
        flex: 1 
      }}>
        <MapMotifs />

        {/* Navigation Buttons Row - Uses nav-row class for responsive padding */}
        <div className="nav-row" style={{ 
          position: 'absolute', 
          top: '40px', 
          left: 0, 
          zIndex: 101, 
          pointerEvents: 'none' 
        }}>
          <Link to="/map" className="back-link" style={{ 
            pointerEvents: 'auto',
            color: 'var(--color-gold)',
            fontWeight: 'bold',
            fontFamily: '"Times New Roman", Times, Georgia, serif',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: 'clamp(0.75rem, 3.5vw, 0.9rem)',
            margin: 0
          }}>
            ← <span className="hidden-mobile">Retour à la </span>carte
          </Link>

          <button 
             className="theme-toggle-btn"
             onClick={toggleTheme}
             title="Changer le thème"
             style={{ 
               position: 'relative', 
               top: '0', 
               right: '0',
               pointerEvents: 'auto',
               margin: 0
             }}
          >
             {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        
        <div className="article-wrapper" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: 'clamp(5rem, 15vh, 8rem) 1.5rem 2rem 1.5rem', 
          position: 'relative',
          zIndex: 1,
          color: 'var(--color-black)',
          fontFamily: '"Times New Roman", Times, Georgia, serif'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(1.8rem, 6vw, 3.8rem)', 
            color: 'var(--color-gold)', 
            marginBottom: 'clamp(2rem, 8vh, 4rem)',
            lineHeight: '1.2',
            textAlign: 'center',
            textShadow: isDarkMode ? '0 0 20px rgba(212, 175, 55, 0.2)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span>L'Éternité Sculptée :</span>
            <span>Le Mystère des Sarcophages Égyptiens</span>
          </h1>

          <div className="responsive-flex">
            <p style={{ flex: '2', minWidth: 'min(350px, 100%)', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', lineHeight: '1.8', fontStyle: 'italic', opacity: 0.9, borderLeft: '5px solid var(--color-gold)', paddingLeft: '2rem' }}>
              Bien plus qu’un simple réceptacle funéraire, le sarcophage égyptien de l’Antiquité représente une véritable forme culturelle dont la sophistication technique défie les millénaires. Objet de passage entre le monde des vivants et l’au-delà, cette demeure d’éternel témoigne d’un savoir-faire artisanal exceptionnel, mêlant ingénierie spirituelle et précision matérielle.
            </p>
            <img src={art1} alt="Artefact égyptien" loading="lazy" decoding="async" style={{ flex: '1', minWidth: 'min(250px, 100%)', height: 'auto', maxWidth: '100%', objectFit: 'cover', borderRadius: '15px', boxShadow: '0 15px 40px rgba(0,0,0,0.3)', border: '1.5px solid var(--color-gold)' }} />
          </div>

          {/* 3D Frame - Reduced Height */}
          <div 
            ref={containerRef}
            style={{ 
            height: isFullscreen ? '100vh' : 'clamp(300px, 50vh, 450px)', 
            width: '100%', 
            backgroundColor: isDarkMode ? '#1a1814' : '#fdfaf5', 
            margin: isFullscreen ? '0' : 'clamp(2rem, 8vh, 5rem) 0',
            position: 'relative',
            border: isFullscreen ? 'none' : 'clamp(8px, 2vw, 20px) solid var(--color-gold)',
            borderImage: isFullscreen ? 'none' : 'linear-gradient(45deg, #C8A058, #F3E5AB, #D4AF37, #C8A058) 1',
            boxShadow: isFullscreen ? 'none' : '0 30px 60px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              style={{
                position: 'absolute',
                top: '50%',
                right: isFullscreen ? '30px' : '20px',
                transform: 'translateY(-50%)',
                zIndex: 100,
                background: 'rgba(200, 160, 88, 0.15)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid var(--color-gold)',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-gold)',
                fontSize: '1.2rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                outline: 'none'
              }}
              title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1) rotate(5deg)';
                e.currentTarget.style.background = 'rgba(200, 160, 88, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1) rotate(0deg)';
                e.currentTarget.style.background = 'rgba(200, 160, 88, 0.15)';
              }}
            >
              {isFullscreen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              )}
            </button>
            {/* Corner Motifs */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', color: 'var(--color-gold)', fontSize: '2rem', zIndex: 2 }}>𓂀</div>
            <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--color-gold)', fontSize: '2rem', zIndex: 2 }}>𓂀</div>
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', color: 'var(--color-gold)', fontSize: '2rem', zIndex: 2 }}>𓆗</div>
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', color: 'var(--color-gold)', fontSize: '2rem', zIndex: 2 }}>𓆗</div>

             <Canvas 
                dpr={[1, 1.5]} 
                gl={{ powerPreference: "high-performance", antialias: true }} 
                camera={{ position: [0, 0, 5], fov: 35 }}
              >
                <Suspense fallback={null}>
                  <Stage environment="city" intensity={0.4} shadows={false}>
                    <Model3D />
                  </Stage>
                </Suspense>
                <OrbitControls autoRotate autoRotateSpeed={0.8} makeDefault enableZoom={true} />
              </Canvas>
              
              <div className="hidden-mobile" style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '2.5rem', 
                transform: 'translateY(-50%)', 
                writingMode: 'vertical-rl', 
                textOrientation: 'upright',
                color: 'var(--color-gold)',
                opacity: 0.25,
                fontSize: '1.4rem',
                letterSpacing: '8px'
              }}>
                𓀀 𓀁 𓀂 𓀃 𓀄 𓀅 𓀆
              </div>
          </div>

          <h2 style={{ 
            fontSize: 'clamp(1.3rem, 4vw, 2.2rem)', 
            color: 'var(--color-gold)', 
            margin: '4rem 0 2rem 0',
            fontFamily: '"Times New Roman", Times, Georgia, serif',
            borderBottom: '1px solid rgba(200, 160, 88, 0.3)',
            paddingBottom: '1rem',
            textAlign: 'left'
          }}>
            L'artisanat égyptien : de la pierre brute à la silhouette humaine.
          </h2>

          <div className="responsive-flex" style={{ flexWrap: 'wrap-reverse' }}>
            <img src={art2} alt="Papyrus égyptien" loading="lazy" decoding="async" style={{ width: 'min(350px, 100%)', height: 'auto', maxWidth: '100%', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 15px 35px rgba(0,0,0,0.25)', transform: 'rotate(-1.5deg)' }} />
            <p style={{ flex: '1', minWidth: 'min(350px, 100%)', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', lineHeight: '2' }}>
              En fonction du statut social du défunt, le sarcophage pouvait être fabriqué en utilisant du bois précieux, surtout le cèdre du Liban, et de la pierre massive dans laquelle on retrouve du basalte, du granit rose et du calcaire. Pour les modèles anthropoïdes, les ouvriers donnaient un aspect approximatif avant de sculpter en habillant la silhouette humaine. Ensuite, la surface était enduite avec du sable fin puis, grâce aux pigments naturels comme le bleu de lapis-lazuli, le jaune d’or et le vert de malachite, souvent fixés par de la cire d'abeille ou de la résine pour garantir leur éclat éternel.
            </p>
          </div>

          <h2 style={{ 
            fontSize: 'clamp(1.3rem, 4vw, 2.2rem)', 
            color: 'var(--color-gold)', 
            margin: '4rem 0 2rem 0',
            fontFamily: '"Times New Roman", Times, Georgia, serif',
            borderBottom: '1px solid rgba(200, 160, 88, 0.3)',
            paddingBottom: '1rem',
            textAlign: 'left'
          }}>
            Symbolisme et protection : le dialogue des dieux et des hommes.
          </h2>

          <div style={{ 
            padding: 'clamp(1.5rem, 5vw, 4rem)', 
            backgroundColor: isDarkMode ? 'rgba(212, 175, 55, 0.08)' : 'rgba(200, 160, 88, 0.08)', 
            borderRadius: '25px', 
            border: '2px solid var(--color-gold)',
            marginBottom: '4rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', lineHeight: '2', margin: 0, textAlign: 'justify' }}>
              L’élément qui donne à l’objet son caractère fascinant, c’est son organisation narrative. Chaque centimètre carré est saturé de hiéroglyphes et de dieux gardiens, Isis et Nephtys, gravés au ciseau de bronze. Le sarcophage n’est pas une boîte, mais un instrument d’une machine à remonter le temps, un ensemble d’art pur où la dureté de la pierre se marie avec la fragilité de l’espoir humain face à la mort. C’est au fond, le premier chef-d’œuvre de design dans l’histoire.
            </p>
          </div>
        </div>

        <footer style={{ 
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <FooterMotifs />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Explorateurs. Tous droits réservés. - L'Éternité au bout des doigts.</p>
          </div>
        </footer>
      </main>
    </motion.div>
  );
}



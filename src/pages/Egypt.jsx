import React, { Suspense, useState, useEffect } from "react";
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

  const logoFilter = isDarkMode 
    ? 'drop-shadow(0px 0px 5px rgba(212,175,55,0.3))' 
    : 'brightness(0.6) contrast(1.5) drop-shadow(0px 0px 1.5px rgba(0,0,0,0.8))';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ willChange: "opacity" }} 
      className="layout-container"
    >
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <HeaderMotifs />
        <Link to="/" style={{ zIndex: 20, position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '4rem' }}>
          <img src={logo} alt="Notre Logo" className="logo-main" style={{ filter: logoFilter, transition: 'filter 0.3s ease' }} />
        </Link>
        <h1 style={{ margin: 0, zIndex: 1, position: 'relative' }}>LE SEIGNEUR DE VIE</h1>
      </header>
      
      <main style={{ 
        marginTop: '80px', // Header height
        position: 'relative', 
        overflowY: 'auto', 
        backgroundColor: 'var(--color-white)', 
        scrollBehavior: 'smooth', 
        flex: 1 
      }}>
        <MapMotifs />

        {/* Navigation Buttons Row - Now scrolls with content */}
        <div style={{ 
          position: 'absolute', 
          top: '40px', // Space below the fixed header
          left: 0, 
          right: 0, 
          height: '40px', 
          zIndex: 101, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '0 4rem', 
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
            fontSize: '0.85rem'
          }}>
            ← Retour à la carte
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
          padding: '8rem 2rem 2rem 2rem', // Increased top padding to accommodate buttons
          position: 'relative',
          zIndex: 1,
          color: 'var(--color-black)',
          fontFamily: '"Times New Roman", Times, Georgia, serif'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 6vw, 3.8rem)', 
            color: 'var(--color-gold)', 
            marginBottom: '4rem',
            lineHeight: '1.2',
            textAlign: 'center',
            textShadow: isDarkMode ? '0 0 20px rgba(212, 175, 55, 0.2)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span style={{ whiteSpace: 'nowrap' }}>L'Éternité Sculptée :</span>
            <span style={{ whiteSpace: 'nowrap' }}>Le Mystère des Sarcophages Égyptiens</span>
          </h1>

          <div style={{ display: 'flex', gap: '3rem', marginBottom: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <p style={{ flex: '2', minWidth: '350px', fontSize: '1.4rem', lineHeight: '1.8', fontStyle: 'italic', opacity: 0.9, borderLeft: '5px solid var(--color-gold)', paddingLeft: '2rem' }}>
              Bien plus qu’un simple réceptacle funéraire, le sarcophage égyptien de l’Antiquité représente une véritable forme culturelle dont la sophistication technique défie les millénaires. Objet de passage entre le monde des vivants et l’au-delà, cette demeure d’éternel témoigne d’un savoir-faire artisanal exceptionnel, mêlant ingénierie spirituelle et précision matérielle.
            </p>
            <img src={art1} alt="Artefact égyptien" style={{ flex: '1', minWidth: '250px', height: 'auto', objectFit: 'cover', borderRadius: '15px', boxShadow: '0 15px 40px rgba(0,0,0,0.3)', border: '1.5px solid var(--color-gold)' }} />
          </div>

          {/* 3D Frame - Reduced Height */}
          <div style={{ 
            height: '450px', 
            width: '100%', 
            backgroundColor: isDarkMode ? '#1a1814' : '#fdfaf5', 
            margin: '5rem 0',
            position: 'relative',
            border: '20px solid var(--color-gold)',
            borderImage: 'linear-gradient(45deg, #C8A058, #F3E5AB, #D4AF37, #C8A058) 1',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            overflow: 'hidden'
          }}>
            {/* Corner Motifs */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', color: 'var(--color-gold)', fontSize: '2rem', zIndex: 2 }}>𓂀</div>
            <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--color-gold)', fontSize: '2rem', zIndex: 2 }}>𓂀</div>
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', color: 'var(--color-gold)', fontSize: '2rem', zIndex: 2 }}>𓆗</div>
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', color: 'var(--color-gold)', fontSize: '2rem', zIndex: 2 }}>𓆗</div>

             <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
                <Suspense fallback={null}>
                  <Stage environment="city" intensity={0.65}>
                    <Model3D />
                  </Stage>
                </Suspense>
                <OrbitControls autoRotate autoRotateSpeed={0.8} makeDefault enableZoom={true} />
              </Canvas>
              
              <div style={{ 
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

          <div style={{ display: 'flex', gap: '4rem', marginBottom: '4rem', flexWrap: 'wrap-reverse' }}>
            <img src={art2} alt="Papyrus égyptien" style={{ width: '350px', height: 'auto', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 15px 35px rgba(0,0,0,0.25)', transform: 'rotate(-1.5deg)' }} />
            <p style={{ flex: '1', minWidth: '350px', fontSize: '1.3rem', lineHeight: '2' }}>
              En fonction du statut social du défunt, le sarcophage pouvait être fabriqué en utilisant du bois précieux, surtout le cèdre du Liban, et de la pierre massive dans laquelle on retrouve du basalte, du granit rose et du calcaire. Pour les modèles anthropoïdes, les ouvriers donnaient un aspect approximatif avant de sculpter en habillant la silhouette humaine. Ensuite, la surface était enduite avec du sable fin puis, grâce aux pigments naturels comme le bleu de lapis-lazuli, le jaune d’or et le vert de malachite, souvent fixés par de la cire d'abeille ou de la résine pour garantir leur éclat éternel.
            </p>
          </div>

          <div style={{ 
            padding: '4rem', 
            backgroundColor: isDarkMode ? 'rgba(212, 175, 55, 0.08)' : 'rgba(200, 160, 88, 0.08)', 
            borderRadius: '25px', 
            border: '2px solid var(--color-gold)',
            marginBottom: '4rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            <p style={{ fontSize: '1.3rem', lineHeight: '2', margin: 0, textAlign: 'justify' }}>
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



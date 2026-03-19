import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import egyptSound from '../assets/egypt_sound.mp3';
import { MapMotifs } from '../components/EgyptianMotifs';
import OpeningAnimation from '../components/OpeningAnimation';
import { AnimatePresence } from 'framer-motion';

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

  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleStartAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.currentTime = 5; // Start 5 seconds in to skip silence
        audioRef.current.volume = 0.05;
        audioRef.current.play().then(() => {
          setIsAudioPlaying(true);
          // Fade in logic
          let vol = 0;
          const fadeInInterval = setInterval(() => {
            if (vol < 0.5 && !isMuted) {
              vol += 0.02;
              if (audioRef.current) audioRef.current.volume = Math.min(vol, 0.5);
            } else {
              clearInterval(fadeInInterval);
            }
          }, 100);
        }).catch(err => console.log("Manual play block", err));
      }
    }
  };

  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.currentTime = 5; // Start 5 seconds in to skip silence
        // Instant start at low volume to eliminate perceived delay
        audioRef.current.volume = 0.05;
        audioRef.current.play()
          .then(() => {
            setIsAudioPlaying(true);
            let vol = 0.05;
            const fadeInInterval = setInterval(() => {
              if (audioRef.current && vol < 0.5 && !isMuted) {
                vol += 0.03; // Slightly faster fade in
                audioRef.current.volume = Math.min(vol, 0.5);
              } else {
                clearInterval(fadeInInterval);
              }
            }, 60); // 60ms steps for more responsiveness
          })
          .catch(() => {});
      }
    };

    if (showAnimation) {
      // Autoplay attempt
      playMusic();
      // Reliable listener for any interaction
      window.addEventListener('click', playMusic);
      window.addEventListener('touchstart', playMusic);
    }

    return () => {
      window.removeEventListener('click', playMusic);
      window.removeEventListener('touchstart', playMusic);
    };
  }, [showAnimation, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.5;
    }
  }, [isMuted]);

  // Handle Mute/Unmute
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(console.error);
      }
    } else {
      setIsMuted(true);
    }
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    hasAnimationPlayedThisSession = true;
    sessionStorage.setItem('animationShown', 'true');
  };

  const handleNavigateToMap = (e) => {
    e.preventDefault();
    
    // Fade out logic
    if (audioRef.current) {
      let volume = audioRef.current.volume;
      const fadeInterval = setInterval(() => {
        if (volume > 0.02) {
          volume -= 0.02;
          audioRef.current.volume = Math.max(volume, 0);
        } else {
          audioRef.current.pause();
          clearInterval(fadeInterval);
          navigate('/map');
        }
      }, 30); // Faster fade (approx 0.6-0.8s for 0.5 volume)
    } else {
      navigate('/map');
    }
  };

  // Si on est en mode sombre, on supprime l'assombrissement du logo
  const logoFilter = isDarkMode 
    ? 'drop-shadow(0px 0px 15px rgba(212,175,55,0.6)) contrast(1.1)' 
    : 'brightness(0.6) contrast(1.5) drop-shadow(0px 0px 5px rgba(0,0,0,0.4))';

  return (
    <>
      <audio 
        ref={audioRef} 
        src={egyptSound} 
        loop 
        preload="auto" 
        onCanPlayThrough={() => console.log("Audio ready")}
      />
      {showAnimation && <OpeningAnimation onComplete={handleAnimationComplete} onInteraction={handleStartAudio} isAudioPlaying={isAudioPlaying} />}
      
      {/* Persistent Controls - Hidden during animation for immersion */}
      <div style={{
           position: 'fixed',
           top: '1.5rem',
           right: '2rem',
           zIndex: 10001,
           display: showAnimation ? 'none' : 'flex',
           gap: '1rem'
      }}>
        <button 
          onClick={toggleMute}
          className="theme-toggle-btn"
          style={{ 
            position: 'relative',
            top: '0',
            right: '0',
            zIndex: 10001,
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={isMuted ? "Activer la musique" : "Couper la musique"}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        <button 
           className="theme-toggle-btn"
           onClick={toggleTheme}
           title="Changer le thème"
           style={{ 
             position: 'relative', 
             top: '0', 
             right: '0',
             zIndex: 10001 
           }}
        >
           {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showAnimation ? 0 : 1 }}
        transition={{ duration: 0.4, delay: 0 }}
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
        <MapMotifs />

        {/* Music Indicator Text */}
        {!showAnimation && (
           <div style={{
             position: 'absolute',
             bottom: '2rem',
             right: '2rem',
             zIndex: 100,
             display: 'flex',
             alignItems: 'center',
             gap: '0.5rem',
             color: 'var(--color-gold)',
             fontSize: '0.8rem',
             opacity: 0.6
           }}>
             <span>{isAudioPlaying ? (isMuted ? 'Mute' : 'Musique ✓') : 'Volume 🔕'}</span>
             {isAudioPlaying && !isMuted && <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-gold)', animation: 'pulse 1.5s infinite' }} />}
           </div>
        )}

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
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '-5vh'
          }}>
            <div style={{
               position: 'absolute',
               width: 'min(60vh, 500px)',
               height: 'min(60vh, 500px)',
               borderRadius: '50%',
               background: isDarkMode 
                 ? 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)' 
                 : 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%)',
               zIndex: -1,
               filter: 'blur(10px)'
            }} />
            <img src={logo} alt="Logo" decoding="async" style={{ 
                height: 'min(50vh, 400px)', 
                maxWidth: '85vw', 
                objectFit: 'contain', 
                filter: logoFilter, 
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
            }} 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
            }}
            />
          </div>
          
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
          
          <button 
            onClick={handleNavigateToMap}
            style={{
              padding: '1.5vh 4vh',
              backgroundColor: 'var(--color-gold)',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: 'clamp(1rem, 2vh, 1.4rem)',
              fontFamily: '"Times New Roman", Times, Georgia, serif',
              fontWeight: 'bold',
              borderRadius: '5px',
              border: 'none',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(200, 160, 88, 0.4)',
              zIndex: 10
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
          </button>

          <AnimatePresence>
            {!isAudioPlaying && !showAnimation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                style={{
                  marginTop: '2rem',
                  color: 'var(--color-gold)',
                  fontSize: '0.8rem',
                  fontStyle: 'italic',
                  letterSpacing: '2px',
                  cursor: 'pointer'
                }}
                onClick={handleStartAudio}
              >
                𓂀 Cliquer ici pour l'ambiance sonore 𓂀
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}


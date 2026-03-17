import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AmbientGrain = React.memo(({ index }) => {
  const data = useMemo(() => {
    const colors = ['#C8A058', '#d2b48c', '#c2b280', '#8b7355', '#f5deb3'];
    const color = colors[index % colors.length];
    const size = Math.random() * 2.5 + 1.0;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const moveX = (Math.random() - 0.5) * 30;
    const moveY = (Math.random() - 0.5) * 30;
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * -10;

    return { color, size, startX, startY, moveX, moveY, duration, delay };
  }, [index]);

  return (
    <motion.div
      initial={{ x: `${data.startX}vw`, y: `${data.startY}vh`, opacity: 0 }}
      animate={{ 
        x: `${data.startX + data.moveX}vw`,
        y: `${data.startY + data.moveY}vh`,
        opacity: [0, 0.6, 0] 
      }}
      transition={{ 
        duration: data.duration, 
        delay: data.delay, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      style={{
        position: 'absolute',
        width: `${data.size}px`,
        height: `${data.size}px`,
        backgroundColor: data.color,
        borderRadius: '50%',
        zIndex: 1,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
      }}
    />
  );
});

const BurstGrain = React.memo(({ index }) => {
  const data = useMemo(() => {
    const colors = ['#C8A058', '#d2b48c', '#c2b280', '#8b7355'];
    const color = colors[index % colors.length];
    const size = Math.random() * 3.5 + 1.2;
    const angle = Math.random() * Math.PI * 2;
    const velocity = 200 + Math.random() * 450;
    const endX = Math.cos(angle) * velocity;
    const endY = Math.sin(angle) * velocity;
    const duration = 2.5 + Math.random() * 1.5;
    const delay = 2.0 + Math.random() * 1.0;

    return { color, size, endX, endY, duration, delay };
  }, [index]);

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
      animate={{ 
        x: data.endX, 
        y: data.endY, 
        opacity: [0, 1, 0],
        scale: [0.4, 1.4, 0.2] 
      }}
      transition={{ 
        duration: data.duration, 
        delay: data.delay, 
        ease: "easeOut"
      }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${data.size}px`,
        height: `${data.size}px`,
        backgroundColor: data.color,
        borderRadius: '50%',
        zIndex: 150,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
      }}
    />
  );
});

const OpeningAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Optimized particle counts: 400 ambient + 400 burst = 800 total
  // Reduced from 1600 to significantly boost performance on mobile
  const ambientGrains = useMemo(() => [...Array(400)], []);
  const burstGrains = useMemo(() => [...Array(400)], []);

  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    const originalOverflow = document.body.style.overflow;
    
    document.body.style.backgroundColor = '#000';
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
      document.body.style.backgroundColor = originalBg;
      document.body.style.overflow = originalOverflow;
    }, 6000);

    return () => {
      clearTimeout(timer);
      document.body.style.backgroundColor = originalBg;
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#1a140d', // Desert background
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Atmosphere Layer - Rich Sand Fog */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(200, 160, 88, 0.25) 0%, rgba(26, 20, 13, 0.95) 70%, rgba(26, 20, 13, 1) 100%)',
            pointerEvents: 'none',
            zIndex: 0
          }} />

          {/* Particle Groups */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
            {ambientGrains.map((_, i) => (
              <AmbientGrain key={`ambient-${i}`} index={i} />
            ))}
            {burstGrains.map((_, i) => (
              <BurstGrain key={`burst-${i}`} index={i} />
            ))}
          </div>

          {/* THE PYRAMID - Proportional and Majestic */}
          <div style={{ 
            position: 'relative', 
            width: 'clamp(280px, 80vw, 380px)', 
            height: 'clamp(260px, 75vw, 350px)', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100
          }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="pyrF" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5e6ab" />
                  <stop offset="100%" stopColor="#C8A058" />
                </linearGradient>
                <linearGradient id="pyrS" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8f7340" />
                  <stop offset="100%" stopColor="#2b2313" />
                </linearGradient>
              </defs>

              <motion.g
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              >
                {/* Shadow */}
                <ellipse cx="50" cy="98" rx="48" ry="8" fill="rgba(0,0,0,0.9)" filter="blur(10px)" />

                {/* Left Half opening */}
                <motion.g
                  initial={{ x: 0 }}
                  animate={{ x: [0, 0, -220], opacity: [1, 1, 0] }}
                  transition={{ duration: 5.5, times: [0, 0.45, 1], ease: "easeInOut" }}
                >
                  <path d="M 50 15 L 20 90 L 50 90 Z" fill="url(#pyrF)" />
                  <path d="M 50 15 L -5 75 L 20 90 Z" fill="#8f7340" />
                  <path d="M 50 15 L 44 32 L 50 32 Z" fill="#FFD700" />
                </motion.g>

                {/* Right Half opening */}
                <motion.g
                  initial={{ x: 0 }}
                  animate={{ x: [0, 0, 220], opacity: [1, 1, 0] }}
                  transition={{ duration: 5.5, times: [0, 0.45, 1], ease: "easeInOut" }}
                >
                  <path d="M 50 15 L 80 90 L 50 90 Z" fill="#8f7340" />
                  <path d="M 50 15 L 105 75 L 80 90 Z" fill="#2b2313" />
                  <path d="M 50 15 L 56 32 L 50 32 Z" fill="#FFD700" />
                </motion.g>

                {/* Light pulse */}
                <motion.circle
                  cx="50"
                  cy="60"
                  r="2"
                  fill="#FFD700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0, 1, 0], scale: [1, 1, 55, 75] }}
                  transition={{ duration: 5.5, times: [0, 0.4, 0.55, 1] }}
                  style={{ filter: 'blur(20px)', zIndex: 10 }}
                />
              </motion.g>
            </svg>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: [0, 1, 1, 0], y: [15, 0, 0, -15] }}
              transition={{ duration: 5.5, times: [0, 0.2, 0.8, 1], delay: 0.8 }}
              style={{
                position: 'absolute',
                bottom: '-25%',
                width: '100%',
                textAlign: 'center',
                color: '#C8A058',
                fontFamily: 'serif',
                fontSize: 'clamp(0.9rem, 4.5vw, 1.6rem)',
                letterSpacing: 'clamp(4px, 2.5vw, 12px)',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                textShadow: '0 0 20px rgba(200, 160, 88, 0.8)',
                zIndex: 300
              }}
            >
              L'Héritage des Pharaons
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningAnimation;

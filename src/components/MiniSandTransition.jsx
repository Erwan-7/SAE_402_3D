import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Global variable to track the initial entry point of the site
let isAppInitialLoad = true;

const Grain = React.memo(({ index }) => {
  const data = useMemo(() => {
    const colors = ['#C8A058', '#d2b48c', '#c2b280', '#8b7355', '#f5deb3'];
    const color = colors[index % colors.length];
    const size = Math.random() * 3.5 + 1.2;
    
    const startX = -20; 
    const endX = 120; 
    const startY = Math.random() * 100;
    const endY = startY + (Math.random() - 0.5) * 15;
    
    const duration = 1.2 + Math.random() * 1.2; 
    const delay = Math.random() * 0.6;
    return { color, size, startX, endX, startY, endY, duration, delay };
  }, [index]);

  return (
    <motion.div
      initial={{ x: `${data.startX}vw`, y: `${data.startY}vh`, opacity: 0, scale: 0.8 }}
      animate={{ 
        x: `${data.endX}vw`, 
        y: `${data.endY}vh`,
        opacity: [0, 0.9, 0.9, 0],
        scale: [0.8, 1.1, 1.1, 0.8]
      }}
      transition={{ duration: data.duration, delay: data.delay, ease: "linear" }}
      style={{
        position: 'absolute',
        width: `${data.size}px`,
        height: `${data.size}px`,
        backgroundColor: data.color,
        borderRadius: '50%',
        filter: 'blur(0.8px)',
        zIndex: 999999,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
      }}
    />
  );
});

const MiniSandTransition = ({ children }) => {
  const location = useLocation();
  
  // Decide if we should animate based on whether it's truly the first time 
  // the app is loading or a subsequent navigation back home.
  const [isAnimating, setIsAnimating] = useState(() => {
    if (isAppInitialLoad && location.pathname === '/') {
      return false; // Skip only on the very first arrival on Landing
    }
    return true; // Always animate for other pages or returns to home
  });

  const DURATION = 2.5;

  useEffect(() => {
    // Once the first component has mounted once, we are no longer in "Initial Load"
    if (isAppInitialLoad) {
      isAppInitialLoad = false;
    }

    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), (DURATION + 1.0) * 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Optimized grain count: 150 particles for smooth transitions
  const grains = useMemo(() => [...Array(150)], []); 

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 1.0, delay: 0.6, ease: "easeInOut" } 
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    },
    direct: {
      opacity: 1,
      transition: { duration: 0 }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <motion.div
        variants={contentVariants}
        initial={!isAnimating ? "direct" : "initial"}
        animate="animate"
        exit="exit"
        style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {isAnimating && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999999,
             pointerEvents: 'none',
             overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', contain: 'strict' }}>
              {grains.map((_, i) => (
                <Grain key={i} index={i} />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiniSandTransition;

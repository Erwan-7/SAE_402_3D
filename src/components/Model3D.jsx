import React, { useState } from "react";
import { useGLTF, Html } from "@react-three/drei";

/**
 * Hotspot component represents a single interactive point on the 3D model.
 */
const Hotspot = ({ position, title, description }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Html
      position={position}
      center
      occlude={false}
      zIndexRange={[100, 0]}
    >
      <div
        className="hotspot-container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          cursor: 'pointer',
          pointerEvents: 'auto',
          zIndex: 1000
        }}
      >
        {/* Pulsing circle - Reduced to 20px and semi-transparent */}
        <div style={{
          width: '14px',
          height: '14px',
          background: 'rgba(212, 175, 55, 0.3)', 
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 0 8px rgba(212, 175, 55, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          userSelect: 'none'
        }}>
          <div className="pulse" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2px solid rgba(212, 175, 55, 0.4)',
            animation: 'pulse-animation 2s infinite',
            opacity: 0.4
          }} />
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '10px' }}>+</span>
        </div>

        {/* Info Popup - Width: 230px */}
        {hovered && (
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '230px',
            background: 'rgba(15, 12, 8, 0.98)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '15px',
            border: '1.5px solid var(--color-gold)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.8)',
            color: 'white',
            zIndex: 1001,
            pointerEvents: 'none',
            fontFamily: '"Times New Roman", Times, Georgia, serif',
            animation: 'fadeInUp 0.3s ease-out'
          }}>
            <h4 style={{
              margin: '0 0 8px 0',
              color: 'var(--color-gold)',
              fontSize: '1rem',
              fontWeight: 'bold',
              letterSpacing: '0.6px',
              borderBottom: '1px solid rgba(212, 175, 55, 0.4)',
              paddingBottom: '6px',
              lineHeight: '1.2'
            }}>
              {title}
            </h4>
            <p style={{
              margin: 0,
              fontSize: '0.85rem',
              lineHeight: '1.5',
              fontStyle: 'italic',
              textAlign: 'justify',
              color: '#f0e6d2'
            }}>
              {description}
            </p>
          </div>
        )}
      </div>
    </Html>
  );
};

export default function Model3D(props) {
  const { scene } = useGLTF("/Sarcophage.glb");

  // Spacing along the X-axis (Horizontal length in current orientation)
  // Head on the LEFT (negative X), Socle on the RIGHT (positive X).
  // Y: 0.6 to stay on top of the sarcophagus.
  const hotspotsData = [
    {
      id: "face",
      position: [0, 8.5, -12], // 1. La tête (LEFT)
      title: "1. Le Visage : Le Miroir du Ka",
      description: "Ce visage idéalisé sert de réceptacle au Ka, l’énergie vitale du défunt. Les yeux grands ouverts et le sourire serein symbolisent la victoire sur la mort."
    },
    {
      id: "beard",
      position: [0, 7, -8], // 2. Le bouc
      title: "2. La Perruque et la Barbe : Signes de Divinité",
      description: "La coiffe tripartite et la barbe postiche tressée assimilent le défunt à Osiris, dieu des morts."
    },
    {
      id: "body",
      position: [0, 4, 0], // 3. Le corps (CENTER)
      title: "3. Le Corps : La Demeure d'Éternité",
      description: "Le sarcophage agit comme une « coque » protectrice, une seconde peau indestructible. Les hiéroglyphes gravés récitent des formules du Livre des Morts."
    },
    {
      id: "socle",
      position: [0, 0.5, 12], // 4. Le socle (RIGHT)
      title: "4. Le Socle : L'ancrage au Monde des Morts",
      description: "La base du sarcophage repose symboliquement sur la terre d'Égypte. Elle assure la stabilité du monument funéraire dans la chambre souterraine."
    }
  ];

  return (
    <group {...props}>
      <primitive object={scene} />

      {hotspotsData.map((h) => (
        <Hotspot
          key={h.id}
          position={h.position}
          title={h.title}
          description={h.description}
        />
      ))}
    </group>
  );
}






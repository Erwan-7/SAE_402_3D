import React, { useRef, useMemo, useState, Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Text, useTexture, Billboard } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import egyptImg from "../assets/egypt.jpg";

// --- HELPERS ---

function latLonToVector3(lat, lon, radius = 10) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));

    return [x, y, z];
}

// --- COMPONENTS ---

// 1. GLOBE
const Globe = React.memo(() => {
    const colorMap = useTexture("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg");

    return (
        <group>
            {/* Main Earth Sphere - Optimized segments 48x48 */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[10, 48, 48]} />
                <meshStandardMaterial map={colorMap} roughness={0.7} metalness={0.1} />
            </mesh>

            {/* Atmosphere soft glow - Optimized segments 32x32 */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[10.3, 32, 32]} />
                <meshStandardMaterial
                    color="#4aa6ff"
                    transparent
                    opacity={0.15}
                    roughness={1}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
});

// 2. MARKER (3D Pyramide)
const EgyptMarker = React.memo(({ lat, lon, onZoomStart }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);
    const position = useMemo(() => latLonToVector3(lat, lon, 10.45), [lat, lon]);
    const groupRef = useRef();
    const meshRef = useRef();
    const { camera } = useThree();
    const [isZooming, setIsZooming] = useState(false);

    useLayoutEffect(() => {
        if (groupRef.current) {
            const [x, y, z] = position;
            groupRef.current.lookAt(x * 2, y * 2, z * 2);
        }
    }, [position]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
            meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
        }

        if (isZooming) {
            const factor = 13.5 / 10.45; 
            const targetCamPos = { x: position[0] * factor, y: position[1] * factor, z: position[2] * factor };
            camera.position.lerp(targetCamPos, delta * 3.5);
            camera.lookAt(0, 0, 0); 
            
            const currentScale = meshRef.current.scale.x;
            const newScale = currentScale + (0.15 - currentScale) * delta * 3.5;
            meshRef.current.scale.set(newScale, newScale, newScale);
        }
    });

    const handleClick = (e) => {
        e.stopPropagation();
        if (onZoomStart) onZoomStart();
        setIsZooming(true);
        setHovered(false);
        document.body.style.cursor = 'default';
        
        setTimeout(() => {
            navigate('/egypt');
        }, 1200);
    };

    return (
        <group position={position} ref={groupRef}>
            <group ref={meshRef}>
                <mesh
                    rotation={[Math.PI / 2, 0, 0]} 
                    scale={[1.2, 1.2, 1.2]} 
                    onClick={handleClick}
                    onPointerOver={(e) => { if(!isZooming) { e.stopPropagation(); document.body.style.cursor = 'pointer'; setHovered(true); } }}
                    onPointerOut={(e) => { if(!isZooming) { e.stopPropagation(); document.body.style.cursor = 'default'; setHovered(false); } }}
                >
                    <coneGeometry args={[0.3, 0.55, 4]} />
                    <meshStandardMaterial
                        color="#D4AF37"
                        emissive="#D4AF37"
                        emissiveIntensity={hovered ? 0.6 : 0.2}
                        metalness={0.9}
                        roughness={0.15}
                        flatShading={true} 
                    />
                </mesh>
            </group>

            {hovered && !isZooming && (
                <Html position={[0, 1.5, 0]} center zIndexRange={[100, 0]}>
                    <div style={{
                        background: 'var(--color-white)',
                        border: '2px solid var(--color-gold)',
                        borderRadius: '8px',
                        padding: '10px',
                        width: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
                        animation: 'popUp 0.3s ease-out forwards',
                        pointerEvents: 'none',
                        transform: 'translateZ(0)'
                    }}>
                        <style>{`
                            @keyframes popUp {
                                0% { opacity: 0; transform: translateY(10px) scale(0.9); }
                                100% { opacity: 1; transform: translateY(0) scale(1); }
                            }
                        `}</style>
                        <img src={egyptImg} alt="Sarcophage" style={{ width: '100%', borderRadius: '4px', marginBottom: '8px', objectFit: 'cover', height: '100px' }} />
                        <span style={{ 
                            fontFamily: 'var(--font-title)', 
                            color: 'var(--color-gold)', 
                            fontSize: '0.9rem', 
                            textAlign: 'center',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            lineHeight: '1.2'
                        }}>
                            Découvrez le sarcophage
                        </span>
                    </div>
                </Html>
            )}
        </group>
    );
});

// 3. TEXT LABELS (Smaller & Cleaner)
const CountryLabel = React.memo(({ text, lat, lon, isSea = false }) => {
    const position = useMemo(() => latLonToVector3(lat, lon, 10.02), [lat, lon]);
    const ref = useRef();

    useLayoutEffect(() => {
        if (ref.current) {
            const [x, y, z] = position;
            ref.current.lookAt(x * 2, y * 2, z * 2);
        }
    }, [position]);

    return (
        <group position={position} ref={ref}>
            <Text
                fontSize={isSea ? 0.35 : 0.3}
                color={isSea ? "#A0D9FF" : "#EEEEEE"}
                anchorX="center"
                anchorY="middle"
                outlineWidth={isSea ? 0 : 0.02}
                outlineColor="#000000"
                fillOpacity={0.9}
            >
                {text}
            </Text>
        </group>
    );
});

// --- MAIN SCENE ---
export default function WorldMap3D() {
    const [camX, camY, camZ] = latLonToVector3(26.8, 30.8, 25); // Initial point toward Egypt
    const [isGlobalZooming, setIsGlobalZooming] = useState(false);
    
    // Responsive FOV logic
    const isMobile = window.innerWidth <= 768;
    const fov = isMobile ? 50 : 35; // Wider FOV for mobile to see more of the globe

    return (
        <div style={{
            width: "100%",
            height: "100%",
            background: "transparent"
        }}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [camX, camY, camZ], fov }}>

                {/* Lighting setup: high ambient light removes the dark shadow side of the globe */}
                <ambientLight intensity={1.8} />
                <directionalLight position={[20, 10, 10]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-20, -10, -10]} intensity={0.5} color="#4aa6ff" />

                <Suspense fallback={null}>
                    <group>
                        <Globe />

                        {/* Adjusted ping closer to Egypt text */}
                        <EgyptMarker lat={23.5} lon={29.0} onZoomStart={() => setIsGlobalZooming(true)} />

                        {/* Countries - Spaced out labels */}
                        <CountryLabel text="ÉGYPTE" lat={26.5} lon={29.0} />
                        <CountryLabel text="ALGÉRIE" lat={28.0} lon={2.0} />
                        <CountryLabel text="MAROC" lat={32.0} lon={-5.0} />
                        <CountryLabel text="AFRIQUE DU SUD" lat={-30.0} lon={25.0} />
                        <CountryLabel text="NIGERIA" lat={10.0} lon={8.0} />
                        <CountryLabel text="KENYA" lat={0.0} lon={38.0} />
                        <CountryLabel text="RDC" lat={-4.0} lon={21.0} />
                        <CountryLabel text="SÉNÉGAL" lat={14.0} lon={-14.0} />
                        <CountryLabel text="MADAGASCAR" lat={-19.0} lon={47.0} />

                        {/* Europe */}
                        <CountryLabel text="FRANCE" lat={46.0} lon={2.0} />
                        <CountryLabel text="ALLEMAGNE" lat={51.0} lon={9.0} />
                        <CountryLabel text="ROYAUME-UNI" lat={55.0} lon={-3.0} />
                        <CountryLabel text="ITALIE" lat={41.0} lon={12.0} />
                        <CountryLabel text="ESPAGNE" lat={40.0} lon={-4.0} />
                        <CountryLabel text="RUSSIE" lat={60.0} lon={90.0} />
                        <CountryLabel text="SUÈDE" lat={60.0} lon={15.0} />
                        <CountryLabel text="UKRAINE" lat={48.0} lon={31.0} />

                        {/* Americas */}
                        <CountryLabel text="ÉTATS-UNIS" lat={38.0} lon={-97.0} />
                        <CountryLabel text="CANADA" lat={56.0} lon={-106.0} />
                        <CountryLabel text="MEXIQUE" lat={23.0} lon={-102.0} />
                        <CountryLabel text="BRÉSIL" lat={-14.0} lon={-51.0} />
                        <CountryLabel text="ARGENTINE" lat={-38.0} lon={-63.0} />
                        <CountryLabel text="COLOMBIE" lat={4.0} lon={-72.0} />
                        <CountryLabel text="PÉROU" lat={-9.0} lon={-75.0} />

                        {/* Asia & Pacific */}
                        <CountryLabel text="CHINE" lat={35.0} lon={105.0} />
                        <CountryLabel text="JAPON" lat={36.0} lon={138.0} />
                        <CountryLabel text="CORÉE DU SUD" lat={35.0} lon={127.0} />
                        <CountryLabel text="INDE" lat={22.0} lon={78.0} />
                        <CountryLabel text="INDONÉSIE" lat={-2.0} lon={113.0} />
                        <CountryLabel text="AUSTRALIE" lat={-25.0} lon={133.0} />
                        <CountryLabel text="NOUVELLE-ZÉLANDE" lat={-40.0} lon={174.0} />
                        <CountryLabel text="PHILIPPINES" lat={12.0} lon={121.0} />
                        <CountryLabel text="VIETNAM" lat={14.0} lon={108.0} />

                        {/* Middle East */}
                        <CountryLabel text="ARABIE SAOUDITE" lat={24.0} lon={45.0} />
                        <CountryLabel text="IRAK" lat={33.0} lon={43.5} />
                        <CountryLabel text="IRAN" lat={32.0} lon={54.0} />
                        <CountryLabel text="TURQUIE" lat={39.0} lon={35.0} />
                        <CountryLabel text="ISRAËL" lat={30.5} lon={34.5} />

                        {/* Seas (smaller labels because of our prop) */}
                        <CountryLabel text="OCÉAN ATLANTIQUE" lat={25.0} lon={-40.0} isSea />
                        <CountryLabel text="OCÉAN PACIFIQUE" lat={0.0} lon={-140.0} isSea />
                        <CountryLabel text="OCÉAN INDIEN" lat={-20.0} lon={80.0} isSea />
                        <CountryLabel text="MÉDITERRANÉE" lat={34.0} lon={18.0} isSea />
                    </group>
                </Suspense>

                <OrbitControls
                    enabled={!isGlobalZooming}
                    enableRotate={!isGlobalZooming}
                    rotateSpeed={0.3}
                    autoRotate={!isGlobalZooming}
                    autoRotateSpeed={0.5}
                    enableZoom={true}
                    zoomSpeed={0.7}
                    enablePan={false}
                    minDistance={11}
                    maxDistance={35}
                />

            </Canvas>
        </div>
    );
}

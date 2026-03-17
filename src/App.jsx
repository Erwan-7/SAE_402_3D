import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useTexture } from "@react-three/drei";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Egypt from "./pages/Egypt";
import MiniSandTransition from "./components/MiniSandTransition";
import "./index.css";

import egyptImg from "./assets/egypt.jpg";

// Preload the globe texture to avoid blank screen/suspense when navigating to /map
useTexture.preload("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg");
useTexture.preload(egyptImg);


function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MiniSandTransition><Landing /></MiniSandTransition>} />
        <Route path="/map" element={<MiniSandTransition><Home /></MiniSandTransition>} />
        <Route path="/egypt" element={<MiniSandTransition><Egypt /></MiniSandTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
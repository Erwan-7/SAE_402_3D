import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Model3D(props) {
  // useGLTF va automatiquement chercher le fichier dans le dossier "public"
  // Assure-toi que le nom du fichier correspond EXACTEMENT.
  const { scene } = useGLTF("/Sarcophage.glb");

  // On retourne l'objet 3D (scene) et on lui passe les propriétés (props) 
  // comme l'échelle ou la position si on veut les modifier plus tard.
  return <primitive object={scene} {...props} />;
}
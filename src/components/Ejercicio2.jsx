import React, { useRef, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";

export default function Ejercicio2() {
  const group = useRef();
  const lightRef = useRef();
  const gltf = useLoader(GLTFLoader, "/assets/Modular%20Road%20Kit.glb");
  const [bright, setBright] = useState(false);

  useEffect(() => {
    if (!gltf) return;
    lightRef.current = gltf.scene.getObjectByName("light_curved-Mesh");
    if (!lightRef.current) console.warn("No se encontró light_curved-Mesh");
  }, [gltf]);

  const handleLightClick = () => {
    setBright((prev) => !prev);
    console.log("💡 Iluminación:", bright ? "desactivada" : "activada");
  };

  const handleObjectClick = (event) => {
    event.stopPropagation();
    const clickedObject = event.object.name;

    if (clickedObject === "light_curved-Mesh") {
      handleLightClick();
      console.log("💡 Click en light_curved-Mesh");
    }
  };

  return (
    <Canvas camera={{ position: [0, 2, 5] }} shadows>
      <ambientLight intensity={bright ? 0.5 : 0.2} />
      {bright && (
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
        />
      )}

      <primitive
        ref={group}
        object={gltf.scene}
        onPointerDown={handleObjectClick}
      />

      <OrbitControls />
    </Canvas>
  );
}

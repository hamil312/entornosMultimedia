import { useLoader, Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { TextureLoader } from "three";

// scene content component (must live inside Canvas)
function Scene4() {
  const cubeTexture = useLoader(TextureLoader, "/assets/texture1.jpg");
  const sphereTexture = useLoader(TextureLoader, "/assets/texture2.jpg");
  const coneTexture = useLoader(TextureLoader, "/assets/alpha.png");
  const groupTexture = useLoader(TextureLoader, "/assets/texture1.jpg");
  const group2Ref = useRef();
  const boxRef = useRef();
  const esfeRef = useRef();
  const groupRef = useRef();

  const [rotation, setRotation] = useState(0.01);
  const [groupColor, setGroupColor] = useState("white");
  const [group2Color, setGroup2Color] = useState("blue");

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotation;
    }
    if (group2Ref.current){
        group2Ref.current.rotation.y += rotation;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setGroupColor((c) => (c === "white" ? "red" : "white"));
  };
  
  const handleGroup2Click = (e) => {
    e.stopPropagation();
    setGroup2Color((c) => (c === "blue" ? "green" : "blue"));
  };

  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow/>

      <group ref={groupRef}>
        {/* Cubo con textura */}
        <mesh
          ref={boxRef}
          name="cube"
          position={[-4, 2, 0]}
          castShadow
          onPointerDown={handleClick}
        >
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial map={cubeTexture} color={groupColor} />
        </mesh>

        {/* Esfera con textura */}
        <mesh
          ref={esfeRef}
          name="sphere"
          position={[0, 2, 0]}
          castShadow
          onPointerDown={handleClick}
        >
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial map={sphereTexture} color={groupColor} />
        </mesh>

        {/* Cono con textura */}
        <mesh
          name="cone"
          position={[4, 1, 0]}
          castShadow
          onPointerDown={handleClick}
        >
          <coneGeometry args={[1, 3, 32]} />
          <meshStandardMaterial map={coneTexture} color={groupColor} />
        </mesh>
      </group>
      <group ref={group2Ref} onPointerDown={handleGroup2Click}>
        {/* Cubo con textura */}
        <mesh
          ref={boxRef}
          name="cube"
          position={[-4, 5, 0]}
          castShadow
          onPointerDown={handleGroup2Click}
        >
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial map={cubeTexture} color={group2Color} />
        </mesh>

        {/* Esfera con textura */}
        <mesh
          ref={esfeRef}
          name="sphere"
          position={[0, 5, 0]}
          castShadow
          onPointerDown={handleGroup2Click}
        >
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial map={sphereTexture} color={group2Color} />
        </mesh>

        {/* Cono con textura */}
        <mesh
          name="cone"
          position={[4, 5, 0]}
          castShadow
          onPointerDown={handleGroup2Click}
        >
          <coneGeometry args={[1, 3, 32]} />
          <meshStandardMaterial map={coneTexture} color={group2Color} />
        </mesh>
      </group>
    </>
  );
}

// top‑level component provides Canvas wrapper
const Ejercicio4 = () => {
  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
      <Scene4 />
    </Canvas>
  );
};

export default Ejercicio4;

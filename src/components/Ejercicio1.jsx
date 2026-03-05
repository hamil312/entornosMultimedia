import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";


const MovingCylinder = () => {
  const ref = useRef();
  const tex1 = useLoader(TextureLoader, "/assets/texture2.jpg");
  const tex2 = useLoader(TextureLoader, "/assets/texture1.jpg");
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (tex1) setCurrent(tex1);
  }, [tex1]);

  const handleClick = () => {
    setCurrent((t) => (t === tex1 ? tex2 : tex1));
  };

  return (
    <mesh ref={ref} onClick={handleClick} position={[5, 0, 0]}>
      <cylinderGeometry args={[2, 2, 2, 32]} />
      <meshStandardMaterial
        map={current}
        transparent={false}
        opacity={0.9}
        roughness={1.0}
        metalness={0.5}
      />
    </mesh>
  );
};



const Ejercicio1 = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={3.0} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <MovingCylinder />
      <OrbitControls />
    </Canvas>
  );
};

export default Ejercicio1;
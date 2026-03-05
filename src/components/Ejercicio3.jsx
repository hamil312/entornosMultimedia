import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader, Sprite, SpriteMaterial, Vector3 } from "three";

function SphereSpeaker() {
  const ref = useRef();
  const map = useLoader(TextureLoader, "/assets/texture1.jpg");
  const alphaMap = useLoader(TextureLoader, "/assets/alpha.png");
  const emmissiveMap = useLoader(TextureLoader, "/assets/texture2.jpg");

  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef(new Audio("/assets/ambiente.mp3"));
  const notesRef = useRef([]);
  const noteTextures = [
    useLoader(TextureLoader, "/assets/note1.png"),
    useLoader(TextureLoader, "/assets/note2.png"),
    useLoader(TextureLoader, "/assets/note3.png"),
  ];
  const noteIntervalRef = useRef(null);

  const startNotes = () => {
    stopNotes();
    noteIntervalRef.current = setInterval(() => {
      const texture = noteTextures[Math.floor(Math.random() * noteTextures.length)];
      const material = new SpriteMaterial({ map: texture, transparent: true, opacity: 1 });
      const note = new Sprite(material);
      if (ref.current) {
        const pos = ref.current.position.clone();
        note.position.set(pos.x, pos.y + 2, pos.z);
      }
      note.scale.set(0.3,0.3,0.3);
      ref.current.parent.add(note);
      notesRef.current.push(note);
    }, 500);
  };

  const stopNotes = () => {
    clearInterval(noteIntervalRef.current);
  };

  useFrame(() => {
    notesRef.current.forEach((note, index) => {
      note.position.y += 0.02;
      note.material.opacity -= 0.005;
      if (note.material.opacity <= 0) {
        note.parent.remove(note);
        notesRef.current.splice(index, 1);
      }
    });
  });

  const handleClick = () => {
    if (audioRef.current.paused) {
      audioRef.current.play().catch(console.error);
      setAudioOn(true);
      startNotes();
    } else {
      audioRef.current.pause();
      setAudioOn(false);
      stopNotes();
    }
  };

  return (
    <mesh ref={ref} onClick={handleClick} position={[5, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        map={map}
        alphaMap={alphaMap}
        emissiveMap={emmissiveMap}
        transparent={true}
        opacity={0.9}
        roughness={1.0}
        metalness={0.5}
      />
    </mesh>
  );
}

export default function Ejercicio3() {
  return (
    <Canvas camera={{ position: [0, 0, 10] }} shadows>
      <ambientLight intensity={3.0} />
      <SphereSpeaker />
      <OrbitControls />
    </Canvas>
  );
}
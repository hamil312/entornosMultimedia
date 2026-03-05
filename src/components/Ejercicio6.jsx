import React, { useRef, useEffect, useState } from "react";
import { useLoader, useFrame, Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader, Sprite, SpriteMaterial, VideoTexture, Vector3 } from "three";

function ModelContent() {
  const gltf = useLoader(GLTFLoader, "/assets/modifiedLiving.glb");
  const videoRef = useRef(document.createElement("video"));
  const audioRef = useRef(new Audio("/assets/ambiente.mp3"));
  const audioRef1 = useRef(new Audio("/assets/Intergalactic.mp3"));
  const audioRef2 = useRef(new Audio("/assets/StakeOut.mp3"));
  const modelRef = useRef();
  //Hacer click en los speakers que se ubican a los lados del monitor o en los controles de la mesa para activar o desactivar la música
  const speakerRef = useRef();
  const controller1Ref = useRef();
  const controller2Ref = useRef();

  useEffect(() => {
    if (!gltf) return;

    videoRef.current.src = "/assets/video.mp4";
    videoRef.current.crossOrigin = "anonymous";
    videoRef.current.loop = true;
    videoRef.current.muted = true;
    videoRef.current.play();
    const videoTexture = new VideoTexture(videoRef.current);

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "Box") {
          child.material = child.material.clone();
          child.material.map = videoTexture;
        }
        child.material.needsUpdate = true;
        console.log("🔹 Objeto encontrado:", child.name);
      }
    });

    speakerRef.current = gltf.scene.getObjectByName("Cube008_Cube019-Mesh");
    controller1Ref.current = gltf.scene.getObjectByName("Cylinder005_Cylinder003");
    controller2Ref.current = gltf.scene.getObjectByName("Cylinder003_Cylinder002");

    if (!speakerRef.current) console.warn("No se encontró el speaker");
    if (!controller1Ref.current) console.warn("No se encontró el controlador 1");
    if (!controller2Ref.current) console.warn("No se encontró el controlador 2");

    audioRef.current.loop = true;
    audioRef1.current.loop = true;
    audioRef2.current.loop = true;
  }, [gltf]);

  const handleSpeakerClick = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      console.log("🎵 Música activada");
    } else {
      audioRef.current.pause();
      console.log("🔇 Música pausada");
    }
  };

  const handleController1Click = () => {
    if (audioRef1.current.paused) {
      audioRef1.current.play();
      console.log("🎵 Música 1 activada");
    } else {
      audioRef1.current.pause();
      console.log("🔇 Música 1 pausada");
    }
  };

  const handleController2Click = () => {
    if (audioRef2.current.paused) {
      audioRef2.current.play();
      console.log("🎵 Música 2 activada");
    } else {
      audioRef2.current.pause();
      console.log("🔇 Música 2 pausada");
    }
  };

  const handleObjectClick = (event) => {
    event.stopPropagation();
    const clickedObject = event.object.name;

    if (clickedObject === "Cube008_Cube019-Mesh") {
      handleSpeakerClick();
      console.log("🔊 Click en Speaker");
    } else if (clickedObject === "Cylinder005_Cylinder003") {
      handleController1Click();
    } else if (clickedObject === "Cylinder003_Cylinder002") {
      handleController2Click();
    } else if (clickedObject === "Box") {
      console.log("🖥️ Click en monitor 1");
    }
  };

  return (
    <>
      <primitive
        ref={modelRef}
        object={gltf.scene}
        scale={1}
        position={[2.9, -1, 0]}
        onPointerDown={handleObjectClick}
      />
      <OrbitControls />
    </>
  );
}

export default function Ejercicio6() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <ModelContent />
    </Canvas>
  );
}

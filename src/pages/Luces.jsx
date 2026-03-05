import React from "react";
import ThreeScene from "../components/LucesPractica";

/**
 * Se muestra un cubo animado que rota y se desplaza, mostrando dos texturas alternadas en sus caras.
 */
const Luces = () => {
  return (
    <div style={{
      backgroundColor: "black",
      color: "white",
      minHeight: "100vh",
    }}>
      <h3>Manejo de Luces</h3>
      <div style={{ height: "500px" }}>
        <ThreeScene />
      </div>
    </div>
  );
};

export default Luces;

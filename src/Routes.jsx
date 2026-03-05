// src/app/router.jsx
import React from "react";
import Inicio from "./pages/Inicio";
import Ejercicio2 from "./pages/Ejercicio2";
import Ejercicio3 from "./pages/Ejercicio3";
import Ejercicio4 from "./pages/Ejercicio4";
import Ejercicio5 from "./pages/Ejercicio5";
import Luces from "./pages/Luces";
import Lab1 from "./pages/lab1";
import Lab2 from "./pages/lab2";
import Lab3 from "./pages/lab3";
import Lab4 from "./pages/lab4";
import Lab5 from "./pages/lab5";
import { path } from "framer-motion/client";

const routes = [
  { path: "/", element: <Inicio />, index: true },
  // Practicas 1
  { path: "ejercicio2", element: <Ejercicio2 /> },
  { path: "ejercicio3", element: <Ejercicio3 /> },
  { path: "ejercicio4", element: <Ejercicio4 /> },
  { path: "ejercicio5", element: <Ejercicio5 /> },
  { path: "luces", element: <Luces />},

  // Laboratorio
  { path: "laboratorio1", element: <Lab1 /> },
  { path: "laboratorio2", element: <Lab2 /> },
  { path: "laboratorio3", element: <Lab3 /> },
  { path: "laboratorio4", element: <Lab4 /> },
  { path: "laboratorio5", element: <Lab5 /> },

];

export default routes;

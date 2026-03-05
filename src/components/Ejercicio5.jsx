import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const Ejercicio5 = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1e1e2f);
        scene.fog = new THREE.Fog(0x1e1e2f, 1, 10);

        const rgbeLoader = new RGBELoader();
        rgbeLoader.load('/assets/pergola_walkway_4k.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = texture;
            scene.environment = texture;
        });

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(1, 1, 2);
        scene.add(camera);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffcc00, 0.7);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.6);
        scene.add(hemisphereLight);

        const pointLight = new THREE.PointLight(0xff9000, 1, 10, 2);
        pointLight.position.set(0, 1, 2);
        scene.add(pointLight);

        const spotLight = new THREE.SpotLight(0x78ff00, 2, 10, Math.PI * 0.1, 0.25, 1);
        spotLight.position.set(0, 2, 3);
        scene.add(spotLight);


        const material = new THREE.MeshStandardMaterial({ roughness: 0.4 });
        const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material);

        scene.add(torus);

        const tick = () => {
            controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        };
        tick();


        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            controls.dispose();
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Ejercicio5;
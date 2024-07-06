import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();
const textFolder = gui.addFolder("Text").close();

const sceneVariables = {
  text: "@Hyru1ean",
  size: 0.5,
  depth: 0.2,
  donuts: 1500,
};
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const donutGroup = new THREE.Group();
scene.add(donutGroup);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("textures/matcaps/9.png");
const matcapTexture2 = textureLoader.load("textures/matcaps/10.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Material
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const material2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 });
  // Donuts
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);
/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Text
  const textGeometry = new TextGeometry(sceneVariables.text, {
    font: font,
    size: sceneVariables.size,
    depth: sceneVariables.depth,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry.center();
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
  textFolder.add(sceneVariables, "text").onChange(() => {
    text.geometry.dispose();
    text.geometry = new TextGeometry(sceneVariables.text, {
      font: font,
      size: sceneVariables.size,
      depth: sceneVariables.depth,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    text.geometry.center();
  });
  textFolder
    .add(sceneVariables, "size")
    .min(0.1)
    .max(10)
    .step(0.1)
    .onFinishChange(() => {
      text.geometry.dispose();
      text.geometry = new TextGeometry(sceneVariables.text, {
        font: font,
        size: sceneVariables.size,
        depth: sceneVariables.depth,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      text.geometry.center();
    });

  for (let i = 0; i < sceneVariables.donuts; i++) {
    let matcapPick = Math.random() < 0.5 ? material : material2;
    const donut = new THREE.Mesh(donutGeometry, matcapPick);
    donut.position.x = (Math.random() - 0.5) * 100;
    donut.position.y = (Math.random() - 0.5) * 100;
    donut.position.z = (Math.random() - 0.5) * 100;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    const scale = Math.random() * 2;
    donut.scale.set(scale, scale, scale);
    donutGroup.add(donut);
  }
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

gui
  .add(sceneVariables, "donuts")
  .min(0)
  .max(5000)
  .step(1)
  .onFinishChange(() => {
    donutGroup.children.forEach((child) => {
      child.geometry.dispose();
      child.material.dispose();
    });
    donutGroup.clear()
    renderer.renderLists.dispose();


    for (let i = 0; i < sceneVariables.donuts; i++) {
      let matcapPick = Math.random() < 0.5 ? material : material2;
      const donut = new THREE.Mesh(donutGeometry, matcapPick);
      donut.position.x = (Math.random() - 0.5) * 100;
      donut.position.y = (Math.random() - 0.5) * 100;
      donut.position.z = (Math.random() - 0.5) * 100;
      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;
      const scale = Math.random() * 2;
      donut.scale.set(scale, scale, scale);
      donutGroup.add(donut);
    }
    renderer.info.reset();
  });

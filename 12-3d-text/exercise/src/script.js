import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
//const helper = new THREE.AxesHelper()
//scene.add(helper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('./textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('./textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('./textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('./textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('./textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('./textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('./textures/matcaps/8.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture2.colorSpace = THREE.SRGBColorSpace
matcapTexture3.colorSpace = THREE.SRGBColorSpace
matcapTexture4.colorSpace = THREE.SRGBColorSpace
matcapTexture5.colorSpace = THREE.SRGBColorSpace
matcapTexture6.colorSpace = THREE.SRGBColorSpace
matcapTexture7.colorSpace = THREE.SRGBColorSpace
matcapTexture8.colorSpace = THREE.SRGBColorSpace
const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture4});

/**
 * font loader
 */
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hyru1e", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
textGeometry.center()
const meshMaterial = new THREE.Mesh(textGeometry, material);
scene.add(meshMaterial)
});
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

for (let i = 0; i<2000; i++) {
  const donut = new THREE.Mesh(donutGeometry, material)
  donut.position.x = (Math.random() - 0.5) * 100 
  donut.position.y = (Math.random() - 0.5) * 100 
  donut.position.z = (Math.random() - 0.5) * 100
  donut.rotation.x = Math.random() * Math.PI
  donut.rotation.y = Math.random() * Math.PI
  let randInt = Math.random();
  donut.scale.set(randInt, randInt, randInt)
  scene.add(donut)
}



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

import * as THREE from 'three';

//Canvas
const canvas = document.querySelector('canvas.webgl');

//Scene
const scene = new THREE.Scene();

//Object

//Geometry - WxHxD
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new  THREE.MeshBasicMaterial({ color: 0x8E96F2, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//sizes
const sizes = {
    width: 800,
    height: 600
}

//Camera
//75 is considered large (typically websites you may use around 35)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
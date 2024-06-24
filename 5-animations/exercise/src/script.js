import * as THREE from 'three';
import gsap from 'gsap';
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const group = new THREE.Group();
scene.add(group);

// Objects
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial( {color: 0x70DDF3} )
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial( {color: 0x8E96F2} )
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial( {color: 0xD7BFF6} )
)
cube2.position.set(-2, 0, 0);
cube3.position.set(2, 0, 0);

group.add(cube1);
group.add(cube2);
group.add(cube3);


// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//Clock
const clock = new THREE.Clock(); 

//gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})
//gsap.to(mesh.position, {duration: 1, delay: 2, x: 0})

//Animations
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    //update mesh
    //camera.position.y = Math.sin(elapsedTime);
    //camera.position.x = Math.cos(elapsedTime);
    //camera.lookAt(mesh.position);
    cube1.rotation.x = elapsedTime * Math.PI * 0.25;
    cube1.rotation.y = elapsedTime * Math.PI * 0.25;

    cube1.position.y = Math.sin(elapsedTime);
    cube2.position.y = -Math.sin(elapsedTime);
    cube3.position.y = Math.cos(elapsedTime);
    cube2.rotation.x = elapsedTime * Math.PI * 0.25;
    cube3.rotation.y = elapsedTime * Math.PI * 0.25;

    //Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();
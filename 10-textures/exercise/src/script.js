import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import imageSource from '/textures/door/color.jpg'
import GUI from 'lil-gui'

const gui = new GUI(
    {
        width: 300,
        title: "Debug GUI",
    }
).close();
/**
 * gui folders
 */
const transformationsFolder = gui.addFolder('Texture Transformations').close();
const rotationFolder = transformationsFolder.addFolder('Rotation').close();

/**
 * native js load
 * Textures
 */
/*
const image = new Image();
const texture = new THREE.Texture(image);
texture.colorSpace = THREE.SRGBColorSpace;
image.onload = () => {
    //update texture once image is loaded
    texture.needsUpdate = true;

}
image.src = '/textures/door/color.jpg'
*/
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log("starting loading manager")
}
loadingManager.onLoad = () => {
    console.log("load manager complete")
}
loadingManager.onProgress = () => {
    console.log("loading manager progress")
}
loadingManager.onError = () => {
    console.log("loading manager on error")
}

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/textures/minecraft.png',
    () => {
        console.log("load")
    }, 
    () => {
        console.log("progress")
    },
    () => {
        console.log('error')
    }
)
colorTexture.colorSpace = THREE.SRGBColorSpace;

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping
//colorTexture.wrapS = THREE.MirroredRepeatWrapping
//colorTexture.wrapT = THREE.MirroredRepeatWrapping
transformationsFolder.add(colorTexture.repeat, 'x').name('texture repeate x')
transformationsFolder.add(colorTexture.repeat, 'y').name('texture repeate y')
//colorTexture.offset

rotationFolder.add(colorTexture, 'rotation').name('texture rotation')
rotationFolder.add(colorTexture.center, 'x').name('texture center x (set rotation first)')
rotationFolder.add(colorTexture.center, 'y').name('texture center y (set rotation first)')

colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;
/*
*
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
//const geometry = new THREE.SphereGeometry(1, 32, 32)
//const geometry = new THREE.ConeGeometry(1, 1, 32)
//const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100);
const material = new THREE.MeshBasicMaterial({ map:  colorTexture})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



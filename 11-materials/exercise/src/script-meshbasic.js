import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const sphereGeometry = new THREE.SphereGeometry(0.5)
const sphereMaterial = new THREE.MeshBasicMaterial({ map: doorColorTexture })
sphereMaterial.transparent = true
sphereMaterial.alphaMap = doorAlphaTexture
sphereMaterial.side = THREE.DoubleSide
const sphereMesh = new THREE.Mesh (
    sphereGeometry,
    sphereMaterial
)
sphereMesh.position.x = -1.5


const planeGeometry = new THREE.PlaneGeometry(1);
const planeMaterial = new THREE.MeshBasicMaterial({ map: doorColorTexture});
planeMaterial.transparent = true
planeMaterial.alphaMap = doorAlphaTexture
planeMaterial.side = THREE.DoubleSide
const planeMesh = new THREE.Mesh(
    planeGeometry,
    planeMaterial
)

const torusGeometry = new THREE.TorusGeometry(0.4, 0.2);
const torusMaterial = new THREE.MeshBasicMaterial({map: doorColorTexture});
torusMaterial.transparent = true
torusMaterial.alphaMap = doorAlphaTexture
torusMaterial.side = THREE.DoubleSide
const torusMesh = new THREE.Mesh(
    torusGeometry, 
    torusMaterial
)
torusMesh.position.x = 1.5


scene.add(sphereMesh, planeMesh, torusMesh);

//alpha values


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
camera.position.z = 2
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
    sphereMesh.rotation.y = elapsedTime * Math.PI * 0.1
    sphereMesh.rotation.x = elapsedTime * Math.PI * 0.25
    planeMesh.rotation.y = elapsedTime * Math.PI * 0.25
    planeMesh.rotation.x = elapsedTime * Math.PI * -0.25
    torusMesh.rotation.y = elapsedTime * Math.PI * -0.25
    torusMesh.rotation.x = elapsedTime * Math.PI * -0.25
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
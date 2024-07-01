import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('./textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('./textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('./textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('./textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('./textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('./textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('./textures/matcaps/8.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')
const gradientTexture5 = textureLoader.load('./textures/gradients/5.jpg')


doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture2.colorSpace = THREE.SRGBColorSpace
matcapTexture3.colorSpace = THREE.SRGBColorSpace
matcapTexture4.colorSpace = THREE.SRGBColorSpace
matcapTexture5.colorSpace = THREE.SRGBColorSpace
matcapTexture6.colorSpace = THREE.SRGBColorSpace
matcapTexture7.colorSpace = THREE.SRGBColorSpace
matcapTexture8.colorSpace = THREE.SRGBColorSpace


const gui = new GUI(
    {
        width: 300,
        title: "Debug GUI",
    }
).close();
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//const ambientLight = new THREE.AmbientLight(0xFFFFFF,1 )
//const pointLight = new THREE.PointLight(0xFFFFFF, 30)
//pointLight.position.x = 2
//pointLight.position.y = 3
//pointLight.position.z = 4
//scene.add(ambientLight)
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/textures/environmentMap/town.hdr', (env) => {
    env.mapping = THREE.EquirectangularReflectionMapping
    scene.background = env
    scene.environment = env
})


//const material = new THREE.MeshStandardMaterial()
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
material.map = doorColorTexture
material.side = THREE.DoubleSide
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.1
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.normalScale.set(0.5, 0.5)
material.transparent = false
material.alphaMap = doorAlphaTexture

gui.add(material, 'metalness').min(0).max(1).step(0.1)
gui.add(material, 'roughness').min(0).max(1).step(0.1)
gui.add(material, 'side')
gui.add(material, 'aoMapIntensity')
gui.add(material, 'displacementScale').min(0).max(1).step(0.1)
gui.add(material, 'transparent').onChange(() => {
    material.needsUpdate = true
})
gui.add(material, 'clearcoat').min(0).max(1).step(0.1)
gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.1)
gui.add(material, 'sheen').min(0).max(1).step(0.1)
gui.add(material, 'sheenRoughness').min(0).max(1).step(0.1)
gui.addColor(material, 'sheenColor')
gui.add(material, 'iridescence').min(0).max(1).step(0.1)
gui.add(material, 'iridescenceIOR').min(0).max(2.333).step(0.1)
gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)
gui.add(material, 'transmission').min(0).max(1).step(0.1)
gui.add(material, 'ior').min(0).max(10).step(0.1)
gui.add(material, 'thickness').min(0).max(1).step(0.1)

const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64)
const sphereMesh = new THREE.Mesh (
    sphereGeometry,
    material
)
sphereMesh.position.x = -1.5



const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);
const planeMesh = new THREE.Mesh(
    planeGeometry,
    material
)

const torusGeometry = new THREE.TorusGeometry(0.4, 0.2, 64, 128);
const torusMesh = new THREE.Mesh(
    torusGeometry, 
    material
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
    sphereMesh.rotation.x = elapsedTime * Math.PI * 0.1
    planeMesh.rotation.y = elapsedTime * Math.PI * 0.1
    planeMesh.rotation.x = elapsedTime * Math.PI * -0.15
    torusMesh.rotation.y = elapsedTime * Math.PI * -0.15
    torusMesh.rotation.x = elapsedTime * Math.PI * -0.15
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
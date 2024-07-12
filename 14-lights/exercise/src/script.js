import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import GUI from 'lil-gui'


const sceneVariables = {
    ambientColor: 0xffbd00,
    directionalLightColor: 0xff5400,
    hemisphereLightSkyColor: 0xb892ff,
    hemisphereLightGroundColor: 0x9e0059,
    pointLightColor: 0xffbd00,
    rectAreaLightColor: 0xff7b00,
    spotLightColor: 0x6e44ff
}
/**
 * Base
 */
// Debug
const gui = new GUI()
const ambientFolder = gui.addFolder('Ambient Light')
const directionalLightFolder = gui.addFolder('Directional Light')
const hemisphereLightFolder = gui.addFolder('Hemisphere Light')
const pointLightFolder = gui.addFolder('Point Light')
const rectAreaLightFolder = gui.addFolder('Rect Area Light')
const spotLightFolder = gui.addFolder('Spot Light')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(sceneVariables.ambientColor, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(sceneVariables.directionalLightColor, 0.9)
scene.add(directionalLight)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const hemisphereLight = new THREE.HemisphereLight(sceneVariables.hemisphereLightSkyColor, sceneVariables.hemisphereLightGroundColor, 0.9)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(sceneVariables.pointLightColor, 1.5)
scene.add(pointLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight, .5)
scene.add(pointLightHelper)

const rectAreaLight = new THREE.RectAreaLight(sceneVariables.rectAreaLightColor, 6, 1, 1)
scene.add(rectAreaLight)
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

const spotLight = new THREE.SpotLight(sceneVariables.spotLightColor, 4.5, 10, Math.PI * 0.1, 4, 1)
scene.add(spotLight)
scene.add(spotLight.target)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)


/**
 * Helpers 
 */
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


ambientFolder.add(ambientLight, 'intensity').min(0).max(20).step(0.1)
ambientFolder.addColor(sceneVariables, 'ambientColor').name("light color").onChange(() => {
    ambientLight.color.set(sceneVariables.ambientColor)
})
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(20).step(0.1)
directionalLightFolder.addColor(sceneVariables, 'directionalLightColor').name('light color').onChange(() => {
    directionalLight.color.set(sceneVariables.directionalLightColor)
})
directionalLightFolder.add(directionalLight.position, 'x')
directionalLightFolder.add(directionalLight.position, 'y')

hemisphereLightFolder.addColor(sceneVariables, 'hemisphereLightSkyColor').name("sky color").onChange(() => {
   hemisphereLight.color.set(sceneVariables.hemisphereLightSkyColor)
})
hemisphereLightFolder.addColor(sceneVariables, 'hemisphereLightGroundColor').name("ground color").onChange(() => {
    hemisphereLight.color.set(sceneVariables.hemisphereLightGroundColor)
 })

 hemisphereLightFolder.add(hemisphereLight, 'intensity').min(0).max(20).step(0.1)
 hemisphereLightFolder.add(hemisphereLight.position, 'x')
 hemisphereLightFolder.add(hemisphereLight.position, 'y')


 pointLightFolder.addColor(sceneVariables, 'pointLightColor').name("light color").onChange(() => {
    pointLight.color.set(sceneVariables.pointLightColor)
 })

 pointLightFolder.add(pointLight, 'intensity').min(0).max(20).step(0.05)
 pointLightFolder.add(pointLight.position, 'x').step(0.1)
 pointLightFolder.add(pointLight.position, 'y').step(0.1)
 pointLightFolder.add(pointLight, 'distance').min(0).max(100).step(1)
 pointLightFolder.add(pointLight, 'decay')


 rectAreaLightFolder.addColor(sceneVariables, 'rectAreaLightColor').name("light color").onChange(() => {
    rectAreaLight.color.set(sceneVariables.rectAreaLightColor)
 })

 rectAreaLightFolder.add(rectAreaLight, 'intensity').min(0).max(100).step(0.05)
 rectAreaLightFolder.add(rectAreaLight, 'width')
 rectAreaLightFolder.add(rectAreaLight, 'height')
 rectAreaLightFolder.add(rectAreaLight.position, 'x').onChange(() => {
    rectAreaLight.lookAt(new THREE.Vector3(0, 0, 0))
 })
 rectAreaLightFolder.add(rectAreaLight.position, 'y').onChange(() => {
    rectAreaLight.lookAt(new THREE.Vector3(0, 0, 0))
 })


spotLightFolder.addColor(sceneVariables, 'spotLightColor').name("light color").onChange(() => {
    spotLight.color.set(sceneVariables.spotLightColor)
 })
 spotLightFolder.add(spotLight, 'intensity')
 spotLightFolder.add(spotLight, 'distance')
 spotLightFolder.add(spotLight, 'angle')
 spotLightFolder.add(spotLight, 'penumbra')
 spotLightFolder.add(spotLight, 'decay')

 spotLightFolder.add(spotLight.target.position, 'x').name('spotlight target x position')
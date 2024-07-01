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

const gui = new GUI(
    {
        width: 300,
        title: "Debug GUI",
    }
).close();
const sphereFolder = gui.addFolder('Sphere Properties')
const planeFolder = gui.addFolder('Plane Properties').close()
const torusFolder = gui.addFolder('Torus Properties').close()
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const sphereValues = {
    color : 0x70DDF3,
    radius: 1,
    rotationY: true,
    rotationX: true

}
const planeValues = {
    color : 0x7ec4a5,
    width: 1,
    height: 1,
    rotationY: true,
    rotationX: true,
    sections: 1,
}

const torusValues = {
    color : 0xffd5ad,
    radius: .4,
    tubeRadius: .2,
    rotationY: true,
    rotationX: true
}

const sphereGeometry = new THREE.SphereGeometry(0.5)
const sphereMaterial = new THREE.MeshBasicMaterial({ color :sphereValues.color })
const sphereMesh = new THREE.Mesh (
    sphereGeometry,
    sphereMaterial
)
sphereMesh.position.x = -1.5

sphereFolder.add(sphereMaterial, 'wireframe');
sphereFolder.addColor(sphereValues, 'color').onChange((value) => {
    sphereMaterial.color.set(sphereValues.color)
})
sphereFolder.add(sphereMesh.position, 'x')
sphereFolder.add(sphereMesh.position, 'y')
sphereFolder.add(sphereValues, 'radius').min(.5).max(5).step(.5).onFinishChange(() => {
    sphereGeometry.dispose();
    sphereMesh.geometry = new THREE.SphereGeometry(sphereValues.radius)
})

const planeGeometry = new THREE.PlaneGeometry(1);
const planeMaterial = new THREE.MeshBasicMaterial({color : planeValues.color});
const planeMesh = new THREE.Mesh(
    planeGeometry,
    planeMaterial
)
planeFolder.add(planeMaterial, 'wireframe')
planeFolder.addColor(planeValues, 'color').onChange((value) => {
    planeMaterial.color.set(planeValues.color)
})
planeFolder.add(planeMesh.position, 'x')
planeFolder.add(planeMesh.position, 'y')
planeFolder.add(planeValues, 'width').onChange(() => {
    planeGeometry.dispose()
    planeMesh.geometry = new THREE.PlaneGeometry(
        planeValues.width, planeValues.height
    )

})

planeFolder.add(planeValues, 'height').onChange(() => {
    planeGeometry.dispose()
    planeMesh.geometry = new THREE.PlaneGeometry(
        planeValues.width, planeValues.height
    )
})
planeFolder.add(planeValues, 'sections').onChange((value) => {
    planeGeometry.dispose()
    planeMesh.geometry = new THREE.PlaneGeometry(
        planeValues.width, planeValues.height, planeValues.sections, planeValues.sections
    )
})  

const torusGeometry = new THREE.TorusGeometry(torusValues.radius, torusValues.tubeRadius);
const torusMaterial = new THREE.MeshBasicMaterial({color: torusValues.color});
const torusMesh = new THREE.Mesh(
    torusGeometry, 
    torusMaterial
)
torusMesh.position.x = 1.5
torusFolder.add(torusMaterial, 'wireframe')
torusFolder.addColor(torusValues, 'color').onChange((value) => {
    torusMaterial.color.set(torusValues.color)
})
torusFolder.add(torusMesh.position, 'x')
torusFolder.add(torusMesh.position, 'y')

torusFolder.add(torusValues, 'radius').onChange((value) => {
    torusGeometry.dispose()
    torusMesh.geometry = new THREE.TorusGeometry(torusValues.radius, 
        torusValues.tubeRadius)
})

torusFolder.add(torusValues, 'tubeRadius').onChange((value) => {
    torusGeometry.dispose()
    torusMesh.geometry = new THREE.TorusGeometry(torusValues.radius, 
        torusValues.tubeRadius)
})



scene.add(sphereMesh, planeMesh, torusMesh);



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
sphereFolder.add(sphereValues, 'rotationX')
planeFolder.add(planeValues, 'rotationX')
torusFolder.add(torusValues, 'rotationX')
sphereFolder.add(sphereValues, 'rotationY')
planeFolder.add(planeValues, 'rotationY')
torusFolder.add(torusValues, 'rotationY')
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    if (sphereValues.rotationY) {
        sphereMesh.rotation.y = elapsedTime * Math.PI * 0.25
    }
    if (sphereValues.rotationX) {
        sphereMesh.rotation.x = elapsedTime * Math.PI * 0.25
    }
    if (planeValues.rotationY) {
        planeMesh.rotation.y = elapsedTime * Math.PI * 0.25
    }
    if (planeValues.rotationX) {
        planeMesh.rotation.x = elapsedTime * Math.PI * -0.25
    }
    if (torusValues.rotationY) {
        torusMesh.rotation.y = elapsedTime * Math.PI * -0.25
    }
    if (torusValues.rotationX) {
        torusMesh.rotation.x = elapsedTime * Math.PI * -0.25
    }
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
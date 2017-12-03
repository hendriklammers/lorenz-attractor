import './styles.css'
import * as THREE from 'three'
import 'three-examples/controls/OrbitControls'

const colors = {
  green: 0xd2fb78,
  purple: 0xc13bfe,
  blue: 0x5821d4,
  cyan: 0x49cdf6,
  grey: 0x49496a,
}
const container = document.querySelector('#container')
const width = window.innerWidth
const height = window.innerHeight

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
let controls: THREE.OrbitControls

const createParticles = (): THREE.Points => {
  const geometry = new THREE.Geometry()
  const material = new THREE.PointsMaterial({
    size: 1,
    color: colors.green,
    sizeAttenuation: false,
  })
  const particles = new THREE.Points(geometry, material)

  let x = 0.01
  let y = 0
  let z = 0
  let a = 10
  let b = 28
  let c = 8 / 3

  for (let i = 0; i < 10000; i++) {
    const vertex = new THREE.Vector3()

    const dt = 0.005
    const dx = a * (y - x) * dt
    const dy = (x * (b - z) - y) * dt
    const dz = (x * y - c * z) * dt
    x = x + dx
    y = y + dy
    z = z + dz

    vertex.x = x
    vertex.y = y
    vertex.z = z
    geometry.vertices.push(vertex)
  }

  return particles
}

const main = () => {
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000)
  controls = new THREE.OrbitControls(camera)
  camera.position.z = 100
  controls.update()

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.0007)
  scene.add(camera)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  container.appendChild(renderer.domElement)

  const particles = createParticles()
  scene.add(particles)

  render()
}

const render = () => {
  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(render)
}

main()

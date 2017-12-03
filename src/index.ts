import "./styles.css"
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Geometry,
  Points,
  PointsMaterial,
  PointLight,
  FogExp2,
  Vector3,
  Math as Math3,
} from "three"

const colors = {
  green: 0xd2fb78,
  purple: 0xc13bfe,
  blue: 0x5821d4,
  cyan: 0x49cdf6,
  grey: 0x49496a,
}
const container = document.querySelector("#container")
const width = window.innerWidth
const height = window.innerHeight

let camera: PerspectiveCamera
let scene: Scene
let renderer: WebGLRenderer

const createParticles = (): Points => {
  const geometry = new Geometry()
  const material = new PointsMaterial({ size: 3, color: colors.green })
  const particles = new Points(geometry, material)

  let x = 0.05
  let y = 0
  let z = 0
  let a = 10
  let b = 28
  let c = 8 / 3

  for (let i = 0; i < 1000; i++) {
    const vertex = new Vector3()

    const dt = 0.01
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
  camera = new PerspectiveCamera(75, width / height, 1, 1000)
  camera.position.z = 1000

  scene = new Scene()
  scene.fog = new FogExp2(0x000000, 0.0007)
  scene.add(camera)

  renderer = new WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  container.appendChild(renderer.domElement)

  const pointLight = new PointLight(0xffffff)
  pointLight.position.x = 10
  pointLight.position.y = 50
  pointLight.position.z = 130
  scene.add(pointLight)

  const particles = createParticles()
  scene.add(particles)
  render()
}

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

main()

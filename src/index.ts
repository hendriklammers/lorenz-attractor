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

const createParticles = () => {
  const geometry = new Geometry()
  const material = new PointsMaterial({ size: 3, color: colors.green })
  const particles = new Points(geometry, material)
  scene.add(particles)

  const radius = 500
  for (let i = 0; i < 10000; i++) {
    const vertex = new Vector3()
    const theta = Math3.randFloatSpread(360)
    const phi = Math3.randFloatSpread(360)

    vertex.x = radius * Math.sin(theta) * Math.cos(phi)
    vertex.y = radius * Math.sin(theta) * Math.sin(phi)
    vertex.z = radius * Math.cos(theta)
    geometry.vertices.push(vertex)
  }
}

const main = () => {
  camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
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

  createParticles()
  render()
}

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

main()

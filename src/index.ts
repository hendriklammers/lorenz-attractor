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
} from "three"

const container = document.querySelector("#container")
const width = window.innerWidth
const height = window.innerHeight

let camera: PerspectiveCamera
let scene: Scene
let renderer: WebGLRenderer
let geometry: Geometry
let particles: Points

const init = () => {
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

  geometry = new Geometry()

  const vertex = new Vector3()
  vertex.x = 0
  vertex.y = 0
  vertex.z = 0
  geometry.vertices.push(vertex)

  const material = new PointsMaterial({ size: 5, color: 0xd2fb78 })
  particles = new Points(geometry, material)
  scene.add(particles)
}

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

init()
render()

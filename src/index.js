import './styles.css'
import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'
import { GUI } from 'dat.gui/build/dat.gui.js'

const settings = {
  sigma: 10,
  rho: 28,
  beta: 8 / 3,
  color: 0x49cdf6,
  scale: 1.5,
}
const container = document.querySelector('#container')
const width = window.innerWidth
const height = window.innerHeight
let lastSettings = { ...settings }
let camera
let scene
let renderer
let controls
let lorenz

function handleWindowResize() {
  const width = window.innerWidth
  const height = window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

function initScene() {
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000)
  camera.position.z = 100

  scene = new THREE.Scene()
  scene.add(camera)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  const geometry = new THREE.Geometry()
  geometry.vertices = createVertices()
  const material = new THREE.LineBasicMaterial({
    color: settings.color,
    linewidth: 3,
  })
  lorenz = new THREE.Line(geometry, material)
  scene.add(lorenz)
}

function initGui() {
  const gui = new GUI()
  gui.add(settings, 'sigma', 1, 20)
  gui.add(settings, 'rho', 10, 50)
  gui.add(settings, 'beta', 1, 5)
  gui.add(settings, 'scale', 0.5, 3)
  gui.addColor(settings, 'color')
}

function createVertices() {
  const dt = 0.005
  const vertices = []
  let x = 0.01
  let y = 0
  let z = 0

  for (let i = 0; i < 10000; i++) {
    const vertex = new THREE.Vector3()
    x += settings.sigma * (y - x) * dt
    y += (x * (settings.rho - z) - y) * dt
    z += (x * y - settings.beta * z) * dt
    vertex.x = x * settings.scale
    vertex.y = y * settings.scale
    vertex.z = z * settings.scale
    vertices.push(vertex)
  }
  return vertices
}

function render() {
  // Only update vertices when settings have changed
  if (JSON.stringify(lastSettings) !== JSON.stringify(settings)) {
    lorenz.geometry.vertices = createVertices()
    lorenz.geometry.verticesNeedUpdate = true
    lorenz.material.color.setHex(settings.color)
    lastSettings = { ...settings }
  }

  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(render)
}

function main() {
  initScene()
  initGui()
  window.addEventListener('resize', handleWindowResize)
  render()
}

main()

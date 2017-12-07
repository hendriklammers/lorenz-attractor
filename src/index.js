import './styles.css'
import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'
import { GUI } from 'dat.gui/build/dat.gui.js'

// const colors = {
//   green: 0xd2fb78,
//   purple: 0xc13bfe,
//   blue: 0x5821d4,
//   cyan: 0x49cdf6,
//   grey: 0x49496a,
// }
const container = document.querySelector('#container')
const width = window.innerWidth
const height = window.innerHeight
const settings = {
  sigma: 10,
  rho: 28,
  beta: 8 / 3,
  color: 0x49cdf6,
  scale: 1.5,
}

let camera
let scene
let renderer
let controls
let lorenz

function createVertices() {
  let x = 0.01
  let y = 0
  let z = 0
  const dt = 0.005
  const vertices = []

  for (let i = 0; i < 10000; i++) {
    const vertex = new THREE.Vector3()

    const dx = settings.sigma * (y - x) * dt
    const dy = (x * (settings.rho - z) - y) * dt
    const dz = (x * y - settings.beta * z) * dt
    x = x + dx
    y = y + dy
    z = z + dz

    vertex.x = x * settings.scale
    vertex.y = y * settings.scale
    vertex.z = z * settings.scale
    vertices.push(vertex)
  }
  return vertices
}

function handleWindowResize() {
  const width = window.innerWidth
  const height = window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

function main() {
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000)
  camera.position.z = 100

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.0007)
  scene.add(camera)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  const geometry = new THREE.Geometry()
  const material = new THREE.LineBasicMaterial({
    color: settings.color,
    linewidth: 3,
  })
  lorenz = new THREE.Line(geometry, material)
  scene.add(lorenz)

  window.addEventListener('resize', handleWindowResize)

  render()

  const gui = new GUI()
  gui.add(settings, 'sigma')
  gui.add(settings, 'rho')
  gui.add(settings, 'beta')
  gui.add(settings, 'scale', 1, 2)
  gui.addColor(settings, 'color')
}

function render() {
  lorenz.geometry.vertices = createVertices()
  lorenz.geometry.verticesNeedUpdate = true
  lorenz.material.color.setHex(settings.color)

  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(render)
}

main()

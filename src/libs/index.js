import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createScene } from "../scene.js";
import { handleKeyDown } from "../controls.js";

const scene = createScene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));
document.body.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10);
camera.position.set(0, 1.6, 3);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.6, 0);
controls.update();

/*// Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 10;
scene.add(cube);

// White Cube
const whiteCubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const whiteCubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const whiteCube = new THREE.Mesh(whiteCubeGeometry, whiteCubeMaterial);
whiteCube.position.y = 15;
cube.add(whiteCube);
*/

// Event listeners
window.addEventListener("resize", onWindowResize);
document.addEventListener("keydown", (event) => handleKeyDown(event, camera, 0.1));

// XR
renderer.xr.addEventListener("sessionstart", onSessionStart);
renderer.xr.addEventListener("sessionend", onSessionEnd);

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    //cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth-100, window.innerHeight-100);
}

function onSessionStart() {
    controls.enabled = false;
}

function onSessionEnd() {
    controls.enabled = true;
}

animate();

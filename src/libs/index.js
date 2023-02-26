import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createScene } from '../scene.js';
import { createCamera } from '../camera.js';
import { handleKeyDown } from '../controls.js';

const { scene, camera } = createScene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.6, 0);
controls.update();

// Event listeners
window.addEventListener('resize', onWindowResize);
document.addEventListener('keydown', (event) => handleKeyDown(event, camera, 0.1));

// XR
renderer.xr.addEventListener('sessionstart', onSessionStart);
renderer.xr.addEventListener('sessionend', onSessionEnd);

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onSessionStart() {
    controls.enabled = false;
}

function onSessionEnd() {
    controls.enabled = true;
}

animate();

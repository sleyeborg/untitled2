import * as THREE from 'three';
import { setupKeyControls, getKeys } from '../controls.js';
import {svgMatrix} from '../shaders.js'
import { CreateScene } from '../scene3.js';
const scene = CreateScene();
// Create a canvas and context for generating the SVG texture
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = canvas.height = 3;
const imageData = context.createImageData(3, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 2);

//c--
const clock = new THREE.Clock();

function render() {
    renderer.render(scene, camera);
}
function getElapsedTime() {
    return clock.getElapsedTime();
}
setupKeyControls();
function animate() {
    const keyBuffer = getKeys();
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    svgMatrix(imageData);
    context.putImageData(imageData, 0, 0);


    const elapsedTime = clock.getElapsedTime(); // Get the time elapsed since the last frame
   // mesh.rotation.y = elapsedTime *0.3; // Rotate the mesh around the y-axis
    const speed = 0.01;
    if (keyBuffer.includes(37)) { // left arrow
     //   planet.rotation.y += speed;

    }
    if (keyBuffer.includes(38)) { // up arrow
       // planet.rotation.x += speed;
    }
    if (keyBuffer.includes(39)) { // right arrow
       // planet.rotation.y -= speed;
    }
    if (keyBuffer.includes(40)) { // down arrow
    //    planet.rotation.x -= speed;
    }
    //const keys = getKeys();
    //console.log(keys);
    renderer.render(scene, camera);
    requestAnimationFrame(animate); // Call this function again on the next frame

}
animate();
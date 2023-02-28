import * as THREE from 'three';
import { setupKeyControls, getKeys } from '../controls.js';
import {svgMatrix} from '../shaders.js'

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

const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
const planetMaterial = new THREE.MeshBasicMaterial({ color: '#aa11ff' });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);

const meshGeometry = new THREE.SphereGeometry(50, 32, 32);
const meshMaterial = new THREE.MeshBasicMaterial({ color: '#5ada95', wireframe: true });
const mesh = new THREE.Mesh(meshGeometry, meshMaterial);

planet.add(mesh);

planet.position.set(3, 3, 3);
camera.lookAt(3, 3, 3);
const scene = new THREE.Scene();

// Add a skybox
// Define the vertex shader
const skyVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}`;

// Define the fragment shader
const skyFragmentShader = `
varying vec2 vUv;
uniform sampler2D texture1;
void main() {
  // Get the pixel value from the texture using the UV coordinates
  vec4 pixel = texture2D(texture1, vUv);

  // Convert the pixel value to grayscale
  float grayscale = dot(pixel.rgb, vec3(0.299, 0.587, 0.114));

  // Set the final color of the fragment
  gl_FragColor = vec4(vec3(grayscale), 1.0);
}`;

// Create the texture and set the pixel data
const texture = new THREE.CanvasTexture(canvas);
texture.needsUpdate = true;
texture.image = imageData;

// Create the shader material
const skyMaterial = new THREE.ShaderMaterial({
    vertexShader: skyVertexShader,
    fragmentShader: skyFragmentShader,
    side: THREE.BackSide,
    uniforms: {
        texture1: { value: texture },
    },
});

// Create the skybox geometry
const skyGeometry = new THREE.BoxGeometry(1000, 1000, 1000);

// Create the skybox mesh
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(planet);

// Add the skybox to the scene
scene.add(sky);

// Add a floor plane
const groundGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);
const groundMaterial = new THREE.MeshBasicMaterial({ color: '#5E5E5E' }); // Gray color
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate to lie flat on the ground
scene.add(ground);

// Add a blue point light
const pointLight1 = new THREE.PointLight(0x12BFaF, 1, 100);
//pointLight

// Add a blue point light
//const pointLight1 = new THREE.PointLight(0x12BFaF, 0,6, 100);
pointLight1.position.set(3, 3, 3);
scene.add(pointLight1);

// Add a purple directional light
const dirLight = new THREE.DirectionalLight(0xaa99bF, 0.2);
dirLight.position.set(3, 3, 3);
scene.add(dirLight);

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
    mesh.rotation.y = elapsedTime *0.3; // Rotate the mesh around the y-axis
    const speed = 0.01;
    if (keyBuffer.includes(37)) { // left arrow
        planet.rotation.y += speed;

    }
    if (keyBuffer.includes(38)) { // up arrow
        planet.rotation.x += speed;
    }
    if (keyBuffer.includes(39)) { // right arrow
        planet.rotation.y -= speed;
    }
    if (keyBuffer.includes(40)) { // down arrow
        planet.rotation.x -= speed;
    }
    //const keys = getKeys();
    //console.log(keys);
    renderer.render(scene, camera);
    requestAnimationFrame(animate); // Call this function again on the next frame

}
animate();
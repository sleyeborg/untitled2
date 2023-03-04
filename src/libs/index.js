/**********
* imports *
**********/
import * as THREE from 'three';
import {createCamera} from "./components/camera";
import {createScene} from "./components/scene";
import {createLights} from "./components/lights";
import { getCntrlflags, onKeyUp, onKeyDown } from './controls.js';
import { handleKeyDown, handleKeyUp } from "../eventHandlers.js";
import {createRenderer} from "./systems/renderer";
import {skymake} from "./components/worlds/skymake";
import {groundmake} from "./components/worlds/groundmake";
import {planetmake} from "./components/worlds/planetmake";


/******************************************************
* initialize canvas and add event listeners.dom stuff *
******************************************************/
const canvas = document.createElement('canvas');
canvas.width = canvas.height = 3;


document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

/******************************************************
 * render pipeline?                                   *
 *****************************************************/
//initialize
const renderer = createRenderer();
const camera = createCamera();
const scene = createScene();
const planet = planetmake();
const sky = skymake();
const ground = groundmake()
const pointLight1 = createLights();
const dirLight = createLights();
//populate
scene.add(ground);
scene.add(planet);
scene.add(sky);
scene.add(dirLight);
scene.add(pointLight1);
//manipulate
camera.position.set(0, 20, 2);
planet.position.set(1, 1, 5);
ground.rotation.x = -Math.PI / 2; // Rotate to lie flat on the ground
pointLight1.position.set(10, 5, 400);
dirLight.position.set(0, 100, 1);
camera.lookAt(0, 2, 5);

const clock = new THREE.Clock();
function render() {
    renderer.render(scene, camera);
}

function getCurrentTime() {
    return performance.now() - clock.start();
}
//setupKeyControls();
//const keyCombos = getKeys();

const fps = 54; // target frame rate
const interval = 1000 / fps; // time interval in ms per frame

let previousTime = 0;
let lag = 0;

function animate() {
    requestAnimationFrame(animate); // Call this function again on the next frame

    let cf = getCntrlflags();
    const elapsedTime = clock.getElapsedTime(); // Get the time elapsed since the last frame
    const currentTime = getCurrentTime();
    const elapsed = currentTime - previousTime;
    previousTime = currentTime;
    lag += elapsed;

    while (lag >= interval) {
        // update game state and render
        //update();
        render();

        lag -= interval;
    }

    const buffer = [];
    buffer.push(cf);

    //planet.rotation.y = elapsedTime *=1  ; // Rotate the planet around the y-axis
    planet.rotation.y = elapsedTime *0.2; // Rotate the mesh around the y-axis
    //const speed = 0.01;
    document.addEventListener("keydown", (event) =>
        handleKeyDown(event, camera)
    );
    document.addEventListener("keyup", handleKeyUp);


    renderer.render(scene, camera);
}




animate();





/* //this is a whole bunch of chat chpt generated SVG stuff
//const imageData = context.createImageData(3, 3);

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
  }


// Define the SVG matrix as a 3x3 array
const svgMatrix = [  [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1]
];
// Create a canvas and context for generating the SVG texture
// Loop through the SVG matrix and set the pixel data
for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        const value = svgMatrix[y][x] ? 255 : 0;
        const index = (y * 3 + x) * 4;
        imageData.data[index] = value;
        imageData.data[index + 1] = value;
        imageData.data[index + 2] = value;
        imageData.data[index + 3] = 255;
    }
}
// Create the texture and set the pixel data
//const texture = new THREE.CanvasTexture(canvas);
//texture.needsUpdate = true;
//texture.image = imageData;

// Create the shader material
const skyMaterial = new THREE.ShaderMaterial({
    vertexShader: skyVertexShader,
    fragmentShader: skyFragmentShader,
    side: THREE.BackSide,
    uniforms: {
        texture1: { value: texture }
    }
});
*/

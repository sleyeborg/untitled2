/**********
* imports *
**********/
import * as THREE from 'three';
import {createCamera} from "./components/camera";
import {createScene} from "./components/scene";
import {createLights} from "./components/lights";
import {createRenderer} from "./systems/renderer";
import {skymake} from "./components/worlds/skymake";
import {Planet} from "./components/worlds/planetmake";
import {UniversalScopeWorker}  from "./components/worlds/physics/UniversalScopeWorker";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import {Tablet} from "./components/worlds/Tablet";
import CameraController from "../eventhandlers.js";

/******************************************************
* initialize canvas and add event listeners.dom stuff *
******************************************************/

const canvas = document.createElement('canvas');
canvas.width = canvas.height = 3;



/******************************************************
 * init primitives                                    *
 *****************************************************/
const renderer = createRenderer();
const camera = createCamera();
const scene = createScene();
const planet = new Planet("red");
const sky = skymake();

const planet2 = new Planet("yellow");
const planet3 = new Planet("blue");
const planet4 = new Planet("orange");
const pointLight1 = createLights();
const dirLight = createLights();
/******************************************
*  populate scene                         *
******************************************/
scene.add(planet4);
scene.add(planet3);
scene.add(planet2);
scene.add(planet);
scene.add(sky);
scene.add(dirLight);
scene.add(pointLight1);
//manipulate
camera.position.set(0, 20, 40);
planet2.rotation.x = -Math.PI / 2; // Rotate to lie flat on the ground
planet2.position.set(3,3,3);
planet4.position.set (2,2,2);
planet3.position.set(4,4,4);
planet.position.set(1, 1, 5);
//change mass
planet4.changemass(10000);
planet.changemass(100000000);
planet2.changemass(0.03);
planet3.changemass(0.002);
pointLight1.position.set(10, 5, 400);
dirLight.position.set(0, 100, 1);
camera.lookAt(0, 2, 5);


/**************************************************
 * camera controls homebrew and orbit             *
 *************************************************/

const camcntrl =  new CameraController(camera);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

/***************************************************
 * initialize the universal scope worker           *
 **************************************************/

const uniworker = new UniversalScopeWorker();
uniworker.getScene(scene);
uniworker.getMeshes();

/***************************************************
 * initialize the tablet                           *
 **************************************************/

const tablet = new Tablet(uniworker);
scene.add(tablet.getThisMesh());


/****************************************
 * util functions                       *
 ***************************************/

function render() {
    renderer.render(scene, camera);
}
const clock = new THREE.Clock();
function getCurrentTime() {
    return performance.now() - clock.start();
}


const fps = 59; // target frame rate
const interval = 1000 / fps; // time interval in ms per frame
let previousTime = 0;
let lag = 0;

function animate() {


    requestAnimationFrame(animate); // Call this function again on the next frame

//    let cf = getCntrlflags();
    const elapsedTime = clock.getElapsedTime(); // Get the time elapsed since the last frame
    const currentTime = getCurrentTime();
    const elapsed = currentTime - previousTime;
    previousTime = currentTime;
    lag += elapsed;
    update();

//    const buffer = [];
//    buffer.push(cf);

//    planet.rotation.y = elapsedTime *=1  ; // Rotate the planet around the y-axis
    planet.rotation.y = elapsedTime * 0.2; // Rotate the mesh around the y-axis
//    const speed = 0.01;
//    document.addEventListener("keydown", (event) =>
//    handleKeyDown(event, camera)
//  );
//  document.addEventListener("keyup", handleKeyUp);
    document.addEventListener('keydown', (event) => {
        camcntrl.handleKeyDown(event);
        if (event.keyCode === 27) {
            tablet.toggleVisibility();
            console.log(tablet.visible);
        }
    });
    document.addEventListener('keyup', (event) => {
        camcntrl.handleKeyUp(event);
    });

    renderer.render(scene, camera);

}

function update(){
   //for every child of scene filter out the instances of Planet.
   const planetList = scene.children.filter((child) => child instanceof Planet);
   //each planet updates itself with the roster provided by uniworker.
    planetList.forEach((planet)=>{planet.update(uniworker)});
    tablet.updateLocation(camera);

}




animate();





// Description: This file contains the function that creates the scene
//import {createLights} from "./lights";
import * as THREE from "three";

function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    return scene;
}

export { createScene };
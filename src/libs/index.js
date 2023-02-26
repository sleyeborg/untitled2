import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer, controls, cube, whiteCube;

init();
animate();

function init() {
    // Renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.xr.enabled = true;
    document.body.appendChild( VRButton.createButton( renderer ) );
    document.body.appendChild( renderer.domElement );

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x808080 );

    // Camera
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10 );
    camera.position.set( 0, 1.6, 3 );

    // Controls
    controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 1.6, 0 );
    controls.update();

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
    cube = new THREE.Mesh( geometry, material );
    cube.position.y = 1;
    scene.add( cube );

    // White Cube
    const whiteCubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const whiteCubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    whiteCube = new THREE.Mesh(whiteCubeGeometry, whiteCubeMaterial);
    whiteCube.position.y = 1.5;
    cube.add(whiteCube);

    // Lights
    const light = new THREE.PointLight();
    light.position.set( 0, 2, 2 );
    camera.add( light );
    scene.add( camera );

    // Event listeners
    window.addEventListener( 'resize', onWindowResize );
    document.addEventListener( 'keydown', onDocumentKeyDown );

    // XR
    renderer.xr.addEventListener( 'sessionstart', onSessionStart );
    renderer.xr.addEventListener( 'sessionend', onSessionEnd );
}

function animate() {
    renderer.setAnimationLoop( render );
}

function render() {
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onSessionStart() {
    controls.enabled = false;
}

function onSessionEnd() {
    controls.enabled = true;
}

function onDocumentKeyDown( event ) {
    const keyCode = event.code;
    const speed = 0.1;
    switch (keyCode) {
        case 'ArrowUp':
            whiteCube.position.z -= speed;
            break;
        case 'ArrowDown':
            whiteCube.position.z += speed;
            break;
        case 'ArrowLeft':
            whiteCube.position.x -= speed;
            break;
        case 'ArrowRight':
            whiteCube.position.x += speed;
            break;
        case 'KeyW':
            whiteCube.position.y += speed;
            break;
        case 'KeyS':
            whiteCube.position.y -= speed;
            break;
    }
}
import * as THREE from 'three';

function skymake() {
// Create the skybox geometry
    const skyGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    const texture = new THREE.TextureLoader().load('assets/xs.png');
    const skyMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
    });
// Create the skybox mesh
    const sky = new THREE.Mesh(skyGeometry,skyMaterial);
    return (sky);
}
export {skymake}
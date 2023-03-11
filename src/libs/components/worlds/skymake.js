import * as THREE from 'three';

function skymake() {
// Create the skybox geometry
    const meshGeometry = new THREE.SphereGeometry(50, 32, 32);
    const meshMaterial = new THREE.MeshBasicMaterial({ color: '#ff00ff',wireframe:true });
    const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
// Create the skybox mesh
    const sky = new THREE.Mesh(meshGeometry,meshMaterial);

    return (sky);
}
export {skymake}
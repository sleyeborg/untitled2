import * as THREE from 'three';

function groundmake() {
    const groundGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: '#5E5E5E'}); // Gray color
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);

    return (ground);
}
export {groundmake}
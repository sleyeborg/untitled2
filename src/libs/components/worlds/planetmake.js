import * as THREE from 'three';

function planetmake() {
    const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: '#12bb12'});
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);

    const meshGeometry = new THREE.SphereGeometry(50, 32, 32);
    const meshMaterial = new THREE.MeshBasicMaterial({ color: '#5ada95',wireframe:true });
    const mesh = new THREE.Mesh(meshGeometry, meshMaterial);

    planet.add(mesh);

    return (planet);
}
export {planetmake}
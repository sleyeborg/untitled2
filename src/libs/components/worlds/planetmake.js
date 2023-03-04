import * as THREE from 'three';
//import {PhysicsObject} from "../../systems/physics";

function planetmake() {
    const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: '#12bb12'});
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
 // const planet = new PhysicsObject(1, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
  /*  const meshGeometry = new THREE.SphereGeometry(50, 32, 32);
    const meshMaterial = new THREE.MeshBasicMaterial({ color: '#ff00ff',wireframe:true });
    const mesh = new THREE.Mesh(meshGeometry, meshMaterial);

    planet.add(mesh);
*/
    return (planet);
}
export {planetmake}
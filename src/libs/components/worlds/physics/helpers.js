//experamental util funcs.
import * as THREE from "three";

function calculateDistance(pointA, pointB) {
    return Math.sqrt((pointB.x - pointA.x) ** 2 + (pointB.y - pointA.y) ** 2 + (pointB.z - pointA.z) ** 2);
}
function createVector(pointA, pointB) {
    return new THREE.Vector3().subVectors(pointB, pointA);
}
// helpers.js

function calculateDirectionVector(currentPosition, targetPosition) {
    const direction = new THREE.Vector3();
    if(targetPosition){
    direction.x = targetPosition.x - currentPosition.x;
    direction.y = targetPosition.y - currentPosition.y;
    direction.z = targetPosition.z - currentPosition.z;
    direction.normalize();
    return direction;
    }
}




export{calculateDistance, createVector,calculateDirectionVector}
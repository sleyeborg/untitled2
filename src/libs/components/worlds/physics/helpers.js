import  * as THREE  from  'three' ;
function calculateDirectionVector(currentPosition, otherPosition) {
    const isVector3 = currentPosition.x ? true : false;
    const isVector = otherPosition.x ? true : false;
    if(isVector&&isVector3){
        const directionvec = new THREE.Vector3().subVectors(otherPosition, currentPosition).normalize();

       // directionvec.subVectors(otherPosition, currentPosition);
    //directionvec.normalize();
    return directionvec;}else{ return 0}
}

function calculateDistance(currentPosition, otherPosition) {
    const isVector3 = currentPosition.x ? true : false;
    const isVector = otherPosition.x ? true : false;
    if (isVector3 && isVector) {
        return currentPosition.distanceTo(otherPosition);
    } else {
        return 0;
    }
}

function calculateGravForce(planet1position, planet2position, planet1mass, planet2mass) {
    const G = 6.6743e-11; // gravitational constant in m^3/(kg s^2)
    const m1 = planet1mass;
    const m2 = planet2mass;
    const r = calculateDistance(planet1position, planet2position);
    if(r === NaN){return 0}
   // console.log("r         r  r r  r  r  r",r);

    if (r === 0) {
        return 0;
    }

    let force = G * ((m1 * m2) / Math.pow(r, 2)+0.0001);

    return force;
}





export{calculateDistance, calculateDirectionVector, calculateGravForce}
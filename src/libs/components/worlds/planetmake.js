import * as THREE from 'three';
import {PlanetmakePhysics} from "./physics/planetmakephysics";
import {PlanetDirectory} from "./physics/UniversalScopeWorker";
import {Vector3} from "three";

class Planet extends PlanetmakePhysics {
    constructor(mass) {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: '#12bb12' });
        const mesh = new THREE.Mesh(geometry, material);
        super(geometry, material, mesh);
        this.planetRegistry = {};
        this.targetposition = new THREE.Vector3();
        this.mass = mass || 1;
        this.acceleration = new THREE.Vector3(0, 0, -0.981);
        }

    getPlanetData() {
        return {
            position: this.position.clone(),
            mass: this.mass
        };
    }
    checkPlanetDirectory(uniworker) {
        // convert the planetDirectory object to an array of planet objects
        const planets = Object.values(uniworker.planetDirectory);

        // sort the planets by mass in descending order
        planets.sort((a, b) => b.mass - a.mass);

        // create a new planetRegistry object with the sorted planets
        const planetRegistry = {};
        planets.forEach(planet => {
            planetRegistry[planet.uuid] = {
                position: planet.position,
                rotation: planet.rotation,
                scale: planet.scale,
            };
        });

        // update the instance variable with the new planetRegistry
        this.planetRegistry = planetRegistry;
    }


    update(uniworker) {
        //update the position of this planet.
        //get the planetDirectory from the uniworker instance of UniversalScopeWorker.js
        const uni = uniworker.planetDirectory;
        //make an array container to contain entries parsed from uni.
        const jar = [];
        //iterate over the entries in uni.
        for (let key in uni) {
            //push the entries into jar.
            jar.push(uni[key]);
        }
        //update the planets position with the planetmakephysics call to update position.
        //jar is normalized data.
        super.updatePlanetPositionMass(jar)
    }


}

export { Planet };

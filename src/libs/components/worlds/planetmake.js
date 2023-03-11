import * as THREE from 'three';
import {PlanetmakePhysics} from "./physics/planetmakephysics";
import {PlanetDirectory} from "./physics/UniversalScopeWorker";
import {Vector3} from "three";

class Planet extends PlanetmakePhysics {
    constructor() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: '#12bb12' });
        const mesh = new THREE.Mesh(geometry, material);
        super(geometry, material, mesh);
        this.planetRegistry = {};
        this.targetposition = new THREE.Vector3();
        this.mass = 1;
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
        const uni = uniworker.planetDirectory;
        const jar = [];
        for (let key in uni) {

            //console.log(uni[key]);
            jar.push(uni[key]);

        }

        super.updatePlanetPositionMass(jar);
    }


}

export { Planet };

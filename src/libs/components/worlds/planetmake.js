import * as THREE from 'three';
import {PlanetmakePhysics} from "./physics/planetmakephysics";
import {PlanetDirectory} from "./physics/UniversalScopeWorker";
import {Vector3} from "three";

class Planet extends PlanetmakePhysics {
    constructor(color) {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: '#12bb12' });
        const mesh = new THREE.Mesh(geometry, material);
        super(geometry, material, mesh);
        this.planetRegistry = {};
        this.targetposition = new THREE.Vector3();
        this.accelleration = 1;
        this.mass = 1;
        this.velocity = 0.01;

        //change color of planet
        this.material.color.set(color);
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
        const mmass = this.findMassivePlanets(jar);
        console.log("mmass ",mmass);

        const nextposition = this.nextposition(mmass);
        console.log("smullsblackson     ",nextposition);
        //this.position.x+=nextposition.x;
        //this.position.y+=nextposition.y;
        //this.position.z+=nextposition.z;
        //this.position.x += 0.001;
    }


}

export { Planet };

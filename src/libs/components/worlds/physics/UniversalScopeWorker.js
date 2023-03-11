// universalScopeWorker.js

import * as THREE from 'three';
import {Vector3} from "three";

class UniversalScopeWorker {
    constructor() {
        this.planetDirectory = {};
        this.scene = null;
    }

    getScene(scene) {
        this.scene = scene;
    }

    addPlanetToDirectory(planet) {
        const data = planet.getPlanetData();
        this.planetDirectory[planet.uuid] = data;
        // Queue write to update all nested scopes
    }

    updatePlanetInDirectory(planet) {
        const data = planet.getPlanetData();
        this.planetDirectory[planet.uuid] = data;
        // Queue write to update all nested scopes
    }

    removePlanetFromDirectory(planet) {
        delete this.planetDirectory[planet.uuid];
        // Queue write to update all nested scopes
    }

    getMeshes() {
        const meshes = [];
        if (this.scene) {
            this.scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    let n = new Vector3();
                    //copy object.position into n the new vector3
                    n.copy(object.position);
                    meshes.push(object);
                        const data = {
                            mass: 1,
                            uuid: object.uuid,
                            position: n,
                            rotation: object.rotation.toArray(),
                            scale: object.scale.toArray(),
                            // add any other relevant properties here
                        };
                        this.planetDirectory[object.uuid] = data;
                        // Queue write to update all nested scopes
                    }

                }
            );
        }
        return meshes;
    }


    // Other methods to interact with the directory
}

export {UniversalScopeWorker}

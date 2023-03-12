// universalScopeWorker.js

import * as THREE from 'three';
import {PlanetmakePhysics} from "./planetmakephysics";

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
                if (object instanceof PlanetmakePhysics) {
                    meshes.push(object);
                        const data = {
                            velocity : object.velocity,
                            accelleration: object.accelleration,
                            mass: object.mass,
                            uuid: object.uuid,
                            position: object.position.toArray(),
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

// universalScopeWorker.js

import * as THREE from 'three';

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
                    meshes.push(object);
                }
            });
        }
        return meshes;
    }

    // Other methods to interact with the directory
}

export {UniversalScopeWorker}

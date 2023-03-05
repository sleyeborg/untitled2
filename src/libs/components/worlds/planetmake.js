import * as THREE from 'three';
import {PlanetmakePhysics} from "./physics/planetmakephysics";
import {PlanetDirectory} from "./physics/UniversalScopeWorker";

class Planet extends PlanetmakePhysics {
    constructor() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: '#12bb12' });
        const mesh = new THREE.Mesh(geometry, material);
        super(geometry, material, mesh);
        //this.planetRegistry = [];
        this.targetposition = new THREE.Vector3();
        this.mass = 1;
    }
    updateTargetPosition(position) {
        this.targetposition.copy(position);
    }

    updateMass(mass) {
        this.mass = mass;
    }

    getPlanetData() {
        return {
            position: this.position.clone(),
            targetposition: this.targetposition.clone(),
            mass: this.mass
        };
    }
}

export { Planet };

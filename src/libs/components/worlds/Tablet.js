import * as THREE from 'three';

class Tablet extends THREE.Mesh {
    constructor(uniworker, material) {
        const tabletgeom = new THREE.PlaneGeometry(3, 3.4, 1.2, 1);
        super(tabletgeom, material);
        this.visible = false;

        // Create a canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.width = 512;
        this.canvas.height = 512;
        this.ctx = this.canvas.getContext('2d');

        // Create a texture from the canvas
        const texture = new THREE.CanvasTexture(this.canvas);
        this.material.map = texture;

        this.uniworker = uniworker;
        this.meshData = [];
        setInterval(async () => {
            const meshes = await this.uniworker.getMeshes();
            this.meshData = meshes.map(mesh => ({
                position: mesh.position.toArray(),
                rotation: mesh.rotation.toArray(),
                scale: mesh.scale.toArray(),
            }));
            this.updateDisplay();
        }, 1000);
    }

    updateDisplay() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = '#ffffff';
        let x = 10;
        let y = 30;
        this.meshData.forEach(mesh => {
            const meshString = `Mesh ${mesh.uuid} - Position: ${mesh.position} - Rotation: ${mesh.rotation} - Scale: ${mesh.scale}`;
            const textWidth = this.ctx.measureText(meshString).width;
            const segments = Math.ceil(textWidth / 480);
            for (let i = 0; i < segments; i++) {
                const segmentString = meshString.substr(i * 60, 60);
                this.ctx.fillText(segmentString, x, y);
                y += 20;
            }
        });
        this.material.map.needsUpdate = true;
    }

    updateLocation(camera) {
        const distance = 3;
        const tabletHeight = 1.13;
        const tabletWidth = tabletHeight * 0.833;
        const aspectRatio = window.innerWidth / window.innerHeight;
        const viewHeight = 2 * Math.tan(camera.fov * Math.PI / 360) * distance;
        const viewWidth = viewHeight * aspectRatio;
        const tabletPosition = new THREE.Vector3(
            camera.position.x - viewWidth*0.11- tabletWidth * 0.5,
            camera.position.y - viewHeight * 0.33 - tabletHeight * 0.5,
            camera.position.z - distance
        );
        // Set the position and rotation of the tablet mesh
        this.position.copy(tabletPosition);
        //this.position.y += 2.3;

        //this.tabletmesh.rotation.set(-2, 1, 0);
    }

    show() {
        super.visible = true;

    }

    hide() {
        super.visible = false;
    }

    toggleVisibility() {
        if(this.visible){
            this.hide();
        }else{this.show()}
    }

    getThisMesh() {
        // Return the tablet mesh object
        return this;
    }
}

export { Tablet };

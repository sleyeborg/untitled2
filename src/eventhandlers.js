import {Tablet} from "./libs/components/worlds/Tablet";
class CameraController {
    constructor(camera, tablet) {
        this.camera = camera;
        this.keysPressed = [];
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    moveCameraForward() {
        this.camera.rotation.x += 0.000051;
    }

    moveCameraBackward() {
        this.camera.rotation.x -= 0.000051;
    }

    moveCameraLeft() {
        this.camera.position.x -= 0.0005;
    }

    moveCameraRight() {
        this.camera.position.x += 0.0005;
    }

    moveCameraUp() {
        this.camera.position.y += 0.0005;
    }

    moveCameraDown() {
        this.camera.position.y -= 0.0005;
    }

    rotateCameraLeft() {
        this.camera.rotation.y += 0.000051;
    }

    rotateCameraRight() {
        this.camera.rotation.y -= 0.000051;
    }

    moveCameraZUp() {
        this.camera.position.z -= 0.0001;
    }

    moveCameraZDown() {
        this.camera.position.z += 0.0001;
    }

    handleKeyDown(event) {
        const code = event.code;

        if (!this.keysPressed.includes(code)) {
            this.keysPressed.push(code);
        }

        // Handle multiple key presses
        if (this.keysPressed.includes("KeyW")) {
            if (this.keysPressed.includes("KeyA")||this.keysPressed.includes("KeyD")) {
                if(this.keysPressed.includes("KeyA")){
                this.moveCameraUp();
                this.moveCameraLeft();}else{
                    this.moveCameraUp();
                    this.moveCameraRight()
                }
            } else if (this.keysPressed.includes("KeyD")) {
                this.moveCameraUp();
                this.moveCameraRight();
            } else {
                this.moveCameraUp();
            }
        } else if (this.keysPressed.includes("KeyS")) {
            if (this.keysPressed.includes("KeyA")) {
                this.moveCameraDown();
                this.moveCameraLeft();
            } else if (this.keysPressed.includes("KeyD")) {
                this.moveCameraDown();
                this.moveCameraRight();
            } else {
                this.moveCameraDown();
            }
        } else if (this.keysPressed.includes("KeyA")) {
            this.moveCameraLeft();
        } else if (this.keysPressed.includes("KeyD")) {
            this.moveCameraRight();
        } else if (this.keysPressed.includes("KeyQ")) {
            this.moveCameraZUp();
        } else if (this.keysPressed.includes("KeyX")) {
            this.moveCameraZDown();
        } else if (this.keysPressed.includes("ArrowUp")) {
            this.moveCameraForward();
        } else if (this.keysPressed.includes("ArrowDown")) {
            this.moveCameraBackward();
        } else if (this.keysPressed.includes("ArrowLeft")) {
            this.rotateCameraLeft();
        } else if (this.keysPressed.includes("ArrowRight")) {
            this.rotateCameraRight();
        }

    }

    handleKeyUp(event) {
        const code = event.code;

        if (this.keysPressed.includes(code)) {
            this.keysPressed.splice(this.keysPressed.indexOf(code), 1);
        }

        // Handle key up if needed
    }
}
export default CameraController;
















//it works from here down
/*&
..const
    ..const
    ..const
    ..

..










// eventHandler.js

const moveCameraForward = (camera) => {
    camera.rotation.x += 0.000051;
};

const moveCameraBackward = (camera) => {
    camera.rotation.x -= 0.000051;
};

const moveCameraLeft = (camera) => {
    camera.position.x -= 0.001;
};

const moveCameraRight = (camera) => {
    camera.position.x += 0.001;
};

const moveCameraUp = (camera) => {
    camera.position.y += 0.001;
};

const moveCameraDown = (camera) => {
    camera.position.y -= 0.001;
};

const rotateCameraLeft = (camera) => {
    camera.rotation.y += 0.000051;
};

const rotateCameraRight = (camera) => {
    camera.rotation.y -= 0.000051;
};
const moveCamerazup = (camera) => {
    camera.position.z -= 0.001;
};
const moveCamerazown = (camera) => {
    camera.position.z += 0.001;
};
const keysPressed = [];
const handleKeyDown = (event, camera) => {
    const code = event.code;

    if (!keysPressed.includes(code)) {
        keysPressed.push(code);
    }

    // Handle multiple key presses
    if (keysPressed.includes("KeyW")) {
        if (keysPressed.includes("KeyA")) {
            moveCameraUp(camera);
            moveCameraLeft(camera);
        } else if (keysPressed.includes("KeyD")) {
            moveCameraUp(camera);
            moveCameraRight(camera);
        } else {
            moveCameraUp(camera);
        }
    } else if (keysPressed.includes("KeyS")) {
        if (keysPressed.includes("KeyA")) {
            moveCameraDown(camera);
            moveCameraLeft(camera);
        } else if (keysPressed.includes("KeyD")) {
            moveCameraDown(camera);
            moveCameraRight(camera);
        } else {
            moveCameraDown(camera);
        }
    } else if (keysPressed.includes("KeyA")) {
        moveCameraLeft(camera);
    } else if (keysPressed.includes("KeyD")) {
        moveCameraRight(camera);
    } else if (keysPressed.includes("KeyQ")) {
        moveCamerazup(camera);
    } else if (keysPressed.includes("KeyX")) {
        moveCamerazown(camera);
    } else if (keysPressed.includes("ArrowUp")) {
        moveCameraForward(camera);
    } else if (keysPressed.includes("ArrowDown")) {
        moveCameraBackward(camera);
    } else if (keysPressed.includes("ArrowLeft")) {
        rotateCameraLeft(camera);
    } else if (keysPressed.includes("ArrowRight")) {
        rotateCameraRight(camera);
    } else {
        // No keys pressed
    }
};

const handleKeyUp = (event) => {
    const code = event.code;

    if (keysPressed.includes(code)) {
        keysPressed.splice(keysPressed.indexOf(code), 1);
    }

    // Handle key up if needed
};

export { handleKeyDown, handleKeyUp };















 */
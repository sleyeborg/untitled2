// eventHandler.js

const moveCameraForward = (camera) => {
    camera.rotation.x += 0.000051;
};

const moveCameraBackward = (camera) => {
    camera.rotation.x -= 0.000051;
};

const moveCameraLeft = (camera) => {
    camera.position.x += 0.001;
};

const moveCameraRight = (camera) => {
    camera.position.x -= 0.001;
};

const moveCameraUp = (camera) => {
    camera.position.y -= 0.001;
};

const moveCameraDown = (camera) => {
    camera.position.y += 0.001;
};

const rotateCameraLeft = (camera) => {
    camera.rotation.y -= 0.000051;
};

const rotateCameraRight = (camera) => {
    camera.rotation.y += 0.000051;
};
const moveCamerazup = (camera) => {
    camera.position.z += 0.001;
};
const moveCamerazown = (camera) => {
    camera.position.z -= 0.001;
};


const handleKeyDown = (event, camera) => {
    switch (event.code) {
        case "KeyW":
            moveCameraUp(camera);
            break;
        case "KeyS":
            moveCameraDown(camera);
            break;
        case "KeyA":
            moveCameraLeft(camera);
            break;
        case "KeyD":
            moveCameraRight(camera);
            break;
        case "KeyQ":
            moveCamerazup(camera);
            break;
        case "KeyX":
            moveCamerazown(camera);
            break;

        case "ArrowUp":
            moveCameraForward(camera);
            break;
        case "ArrowDown":
            moveCameraBackward(camera);
            break;
        case "ArrowLeft":
            rotateCameraLeft(camera);
            break;
        case "ArrowRight":
            rotateCameraRight(camera);
            break;
        default:
            break;
    }
};

const handleKeyUp = (event, camera) => {
    // Do something on key up if
};

export { handleKeyDown, handleKeyUp };

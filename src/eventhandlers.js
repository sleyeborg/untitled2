// eventHandler.js

const moveCameraForward = (camera) => {
    camera.position.z += 0.01;
};

const moveCameraBackward = (camera) => {
    camera.position.z -= 0.01;
};

const moveCameraLeft = (camera) => {
    camera.position.x += 0.01;
};

const moveCameraRight = (camera) => {
    camera.position.x -= 0.01;
};

const moveCameraUp = (camera) => {
    camera.position.y += 0.02;
};

const moveCameraDown = (camera) => {
    camera.position.y -= 0.02;
};

const rotateCameraLeft = (camera) => {
    camera.rotation.y -= 0.02;
};

const rotateCameraRight = (camera) => {
    camera.rotation.y += 0.02;
};

const handleKeyDown = (event, camera) => {
    switch (event.code) {
        case "KeyW":
            moveCameraForward(camera);
            break;
        case "KeyS":
            moveCameraBackward(camera);
            break;
        case "KeyA":
            moveCameraLeft(camera);
            break;
        case "KeyD":
            moveCameraRight(camera);
            break;
        case "ArrowUp":
            moveCameraUp(camera);
            break;
        case "ArrowDown":
            moveCameraDown(camera);
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

const handleKeyUp = (event) => {
    // Do something on key up if needed
};

export { handleKeyDown, handleKeyUp };

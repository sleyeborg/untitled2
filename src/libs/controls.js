// controls.js

let cntrlflags = {
    forward: false,
    backward: false,
    leftUp: false,
    rightUp: false,
    up: false,
    E: false,
    Q: false,
    space:false,
    arrup:false,
    arrdown:false,
    arrleft:false,
    arrright:false,

    // upleft: false,
};


function onKeyDown(event) {
    switch (event.code) {
        case 'ArrowUp': cntrlflags.arrup = true;
        break;
        case 'ArrowDown': cntrlflags.arrdown = true;
        break;
        case 'ArrowLeft': cntrlflags.arrleft = true;
        break;
        case 'ArrowRight': cntrlflags.arrright = true;
        break;
        case 'KeyW':
            cntrlflags.forward = true;
            break;
        case 'KeyS':
            cntrlflags.backward = true;
            break;
        case 'KeyA':
            cntrlflags.left = true;
            break;
        case 'KeyD':
            cntrlflags.right = true;
            break;
        case 'KeyQ':
            cntrlflags.up = true;
            break;
        case 'KeyE':
            cntrlflags.down = true;
            break;
        case 'space':
            cntrlflags.space = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'ArrowUp': cntrlflags.arrup = false;
        break;
        case 'ArrowDown': cntrlflags.arrdown = false;
        break;
        case 'ArrowLeft': cntrlflags.arrleft = false;
        break;
        case 'ArrowRight': cntrlflags.arrright = false;
        break;
        case 'KeyW':
            cntrlflags.forward = false;
            break;
        case 'KeyS':
            cntrlflags.backward = false;
            break;
        case 'KeyA':
            cntrlflags.left = false;
            break;
        case 'KeyD':
            cntrlflags.right = false;
            break;
        case 'KeyQ':
            cntrlflags.Q = false;
            break;
        case 'KeyE':
            cntrlflags.E = false;
            break;
        case 'space' :
            cntrlflags.space =false;
    }
}

function getCntrlflags() {
    return cntrlflags;
    cntrlflags = {
        forward: false,
        backward: false,
        leftUp: false,
        rightUp: false,
        up: false,
        E: false,
        Q: false,
        space:false,
        arrup:false,
        arrdown:false,
        arrleft:false,
        arrright:false,
    };

}

export { getCntrlflags, onKeyUp, onKeyDown};
//controls.js

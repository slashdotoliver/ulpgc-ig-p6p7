import * as THREE from "three";

export class FreeCameraControls {
    constructor(camera) {
        this.camera = camera;
        this.moveSpeed = 0.5;
        this.rotateSpeed = 0.005;
        this.dragging = false;
        this.prevMouseX = 0;
        this.prevMouseY = 0;
        this.radius = 30;
        this.theta = Math.PI / 4;
        this.phi = Math.PI / 4;

        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            up: false,
            down: false,
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    onMouseDown(event) {
        if (event.button === 0) {
            this.dragging = true;
            this.prevMouseX = event.clientX;
            this.prevMouseY = event.clientY;
        }
    }

    onMouseUp() {
        this.dragging = false;
    }

    onMouseMove(event) {
        if (this.dragging) {
            const deltaX = event.clientX - this.prevMouseX;
            const deltaY = event.clientY - this.prevMouseY;

            this.theta += deltaX * this.rotateSpeed;
            this.phi += deltaY * this.rotateSpeed;

            this.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.phi));
            this.prevMouseX = event.clientX;
            this.prevMouseY = event.clientY;
        }
    }

    onKeyDown(event) {
        switch (event.key) {
            case "w":
            case "ArrowUp":
                this.keys.forward = true;
                break;
            case "s":
            case "ArrowDown":
                this.keys.backward = true;
                break;
            case "a":
            case "ArrowLeft":
                this.keys.left = true;
                break;
            case "d":
            case "ArrowRight":
                this.keys.right = true;
                break;
            case "Shift":
                this.keys.up = true;
                break;
            case " ":
                this.keys.down = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.key) {
            case "w":
            case "W":
            case "ArrowUp":
                this.keys.forward = false;
                break;
            case "s":
            case "S":
            case "ArrowDown":
                this.keys.backward = false;
                break;
            case "a":
            case "A":
            case "ArrowLeft":
                this.keys.left = false;
                break;
            case "d":
            case "D":
            case "ArrowRight":
                this.keys.right = false;
                break;
            case "Shift":
                this.keys.up = false;
                break;
            case " ":
                this.keys.down = false;
                break;
        }
    }

    updateCameraPosition() {
        const moveDirection = new THREE.Vector3(0, 0, 0);

        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(
            this.camera.quaternion
        );
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(
            this.camera.quaternion
        );
        const up = new THREE.Vector3(0, 1, 0).applyQuaternion(
            this.camera.quaternion
        );

        if (this.keys.forward)
            moveDirection.add(forward.multiplyScalar(this.moveSpeed));
        if (this.keys.backward)
            moveDirection.add(forward.multiplyScalar(-this.moveSpeed));
        if (this.keys.left)
            moveDirection.add(right.multiplyScalar(-this.moveSpeed));
        if (this.keys.right)
            moveDirection.add(right.multiplyScalar(this.moveSpeed));
        if (this.keys.up)
            moveDirection.add(up.multiplyScalar(-this.moveSpeed));
        if (this.keys.down)
            moveDirection.add(up.multiplyScalar(this.moveSpeed));

        this.camera.position.add(moveDirection);
        const lookAtPosition = this.lookAtPositionFromCamera(this.radius);

        this.camera.lookAt(
            lookAtPosition.x,
            lookAtPosition.y,
            lookAtPosition.z
        );
    }

    lookAtPositionFromCamera(distance) {
        const x = distance * Math.sin(this.phi) * Math.cos(this.theta);
        const y = distance * Math.cos(this.phi);
        const z = distance * Math.sin(this.phi) * Math.sin(this.theta);

        const cameraPosition = this.camera.position;

        return new THREE.Vector3(
            x + cameraPosition.x,
            y + cameraPosition.y,
            z + cameraPosition.z
        );
    }

    attach() {
        window.addEventListener("mousedown", this.onMouseDown);
        window.addEventListener("mouseup", this.onMouseUp);
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("keyup", this.onKeyUp);
        document.getElementById("free-camera-button").classList.add("active");
        document.getElementById("free-controls-info").classList.add("active");
        document.getElementById("free-controls-info").classList.remove("inactive");
    }

    detach() {
        window.removeEventListener("mousedown", this.onMouseDown);
        window.removeEventListener("mouseup", this.onMouseUp);
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("keydown", this.onKeyDown);
        window.removeEventListener("keyup", this.onKeyUp);
        document.getElementById("free-camera-button").classList.remove("active");
        document.getElementById("free-controls-info").classList.add("inactive");
        document.getElementById("free-controls-info").classList.remove("active");
    }
}

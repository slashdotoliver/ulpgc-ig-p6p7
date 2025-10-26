import * as THREE from "three";

export class OrbitalCameraControls {
    constructor(camera, target) {
        this.camera = camera;
        this.target = target;

        this.radius = 30;
        this.theta = Math.PI / 4;
        this.phi = Math.PI / 4;

        this.dragging = false;
        this.prevMouseX = 0;
        this.prevMouseY = 0;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
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

            this.theta -= deltaX * -0.005;
            this.phi -= deltaY * 0.005;

            this.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.phi));

            this.prevMouseX = event.clientX;
            this.prevMouseY = event.clientY;
        }
    }

    onWheel(event) {
        const delta = Math.sign(event.deltaY) * -0.1 * this.radius;
        this.radius = Math.max(
            Math.max(this.target.objectRadius + 2, this.radius - delta),
            0
        );
    }

    onTouchStart(event) {
        if (event.touches.length === 1) {
            this.dragging = true;
            this.prevMouseX = event.touches[0].clientX;
            this.prevMouseY = event.touches[0].clientY;
        }

        if (event.touches.length === 2) {
            const dx = event.touches[0].clientX - event.touches[1].clientX;
            const dy = event.touches[0].clientY - event.touches[1].clientY;
            this.touchStartDist = Math.sqrt(dx * dx + dy * dy);
            this.touchStartTheta = this.theta;
            this.touchStartPhi = this.phi;
        }
    }

    onTouchMove(event) {
        if (event.touches.length === 1 && this.dragging) {
            const deltaX = event.touches[0].clientX - this.prevMouseX;
            const deltaY = event.touches[0].clientY - this.prevMouseY;

            this.theta -= deltaX * -0.005;
            this.phi -= deltaY * 0.005;

            this.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.phi));

            this.prevMouseX = event.touches[0].clientX;
            this.prevMouseY = event.touches[0].clientY;
        }

        if (event.touches.length === 2) {
            const dx = event.touches[0].clientX - event.touches[1].clientX;
            const dy = event.touches[0].clientY - event.touches[1].clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const delta = dist - this.touchStartDist;
            this.radius = Math.max(
                this.target.objectRadius + 2,
                this.radius - delta * 0.05
            );
        }
    }

    onTouchEnd() {
        this.dragging = false;
        this.touchStartDist = 0;
    }

    updateCameraPosition() {
        const [targetPositionX, targetPositionZ] = this.target.position();
        const targetPosition = new THREE.Vector3(
            targetPositionX,
            0,
            targetPositionZ
        );

        const x =
            targetPosition.x +
            this.radius * Math.sin(this.phi) * Math.cos(this.theta);
        const y =
            targetPosition.y +
            this.radius * Math.cos(this.phi);
        const z =
            targetPosition.z +
            this.radius * Math.sin(this.phi) * Math.sin(this.theta);

        //const currentObjectivePosition = this.camera.position.clone();
        //const finalObjectivePosition = currentObjectivePosition.lerp(new THREE.Vector3(x, y, z), 0.05);

        this.camera.position.set(x, y, z);
        this.camera.lookAt(targetPosition);
    }

    setTarget(target) {
        this.target = target;
    }

    attach() {
        window.addEventListener("mousedown", this.onMouseDown);
        window.addEventListener("mouseup", this.onMouseUp);
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("wheel", this.onWheel);
        window.addEventListener("touchstart", this.onTouchStart);
        window.addEventListener("touchmove", this.onTouchMove);
        window.addEventListener("touchend", this.onTouchEnd);
        document.getElementById("orbit-camera-button").classList.add("active");
        document.getElementById("orbit-controls-info").classList.add("active");
        document.getElementById("orbit-controls-info").classList.remove("inactive");
    }

    detach() {
        window.removeEventListener("mousedown", this.onMouseDown);
        window.removeEventListener("mouseup", this.onMouseUp);
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("wheel", this.onWheel);
        window.removeEventListener("touchstart", this.onTouchStart);
        window.removeEventListener("touchmove", this.onTouchMove);
        window.removeEventListener("touchend", this.onTouchEnd);
        document.getElementById("orbit-camera-button").classList.remove("active");
        document.getElementById("orbit-controls-info").classList.remove("active");
        document.getElementById("orbit-controls-info").classList.add("inactive");
    }
}

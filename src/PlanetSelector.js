import * as THREE from "three";

export class PlanetSelector {
    constructor(
        raycaster,
        plane,
        renderer,
        camera,
        scene,
        selectableObjects,
        state,
        clickThreshold = 250
    ) {
        this.raycaster = raycaster;
        this.plane = plane;
        this.renderer = renderer;
        this.camera = camera;
        this.scene = scene;
        this.selectables = selectableObjects;
        this.clickThreshold = clickThreshold;
        this.mouse = new THREE.Vector2();
        this.appState = state;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.attach();
    }

    onMouseDown(event) {
        this.mouseDownTime = Date.now();
        this.mouse.x =
            (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y =
            -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
    }

    onMouseUp(event) {
        this.mouseUpTime = Date.now();

        const clickDuration = this.mouseUpTime - this.mouseDownTime;

        if (clickDuration < this.clickThreshold) {
            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObject(this.plane);

            if (intersects.length > 0) {
                this.processIntersection(intersects[0].point);
            }
        }
    }

    processIntersection(point) {
        let [closestObject, minDistance] = [null, 2e10];
        for (let i in this.selectables) {
            const selectable = this.selectables[i];
            const [selectableX, selectableZ] = selectable.position();
            const distance = Math.sqrt(
                Math.pow(point.x - selectableX, 2) + Math.pow(point.z - selectableZ, 2)
            );

            if (distance < 50 && distance < minDistance) {
                closestObject = selectable;
                minDistance = distance;
            }
        }

        if (closestObject === null) return;
        this.appState.updateSelectedObject(closestObject);
    }

    attach() {
        window.addEventListener("mousedown", this.onMouseDown);
        window.addEventListener("mouseup", this.onMouseUp);
    }

    dispose() {
        window.removeEventListener("mousedown", this.onMouseDown);
        window.removeEventListener("mouseup", this.onMouseUp);
    }
}

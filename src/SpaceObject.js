export class SpaceObject {
    constructor(
        parent,
        mesh,
        objectRadius,
        orbitalRadius,
        orbitalAngularVelocity,
        initialPhase,
        info
    ) {
        this.mesh = mesh;
        this.orbitRadius = orbitalRadius;
        this.objectRadius = objectRadius;
        this.angularVelocity = orbitalAngularVelocity;
        this.angle = initialPhase;
        this.parent = parent;
        this.info = info;
    }

    position() {
        let [x, z] = [
            this.orbitRadius * Math.cos(this.angle * this.angularVelocity),
            this.orbitRadius * Math.sin(this.angle * this.angularVelocity),
        ];
        if (this.parent !== undefined) {
            const [pX, pZ] = this.parent.position();
            [x, z] = [x + pX, z + pZ];
        }
        return [x, z];
    }

    update() {
        const [x, z] = this.position();
        this.mesh.position.set(x, 0, z);
        this.angle += 0.00001;
    }
}

import * as THREE from "three";

export function addShip(scene) {
    const shipGroup = new THREE.Group();
    const colors = {
        trunk: 0xc29a32,
        trunkCore: 0xa56d20,
        wings: 0x434544,
        motorCover: 0x2c2c34,
        motorExhaust: 0x6ffcff,
    };

    {
        const geometry = new THREE.BoxGeometry(2, 2.2, 5);
        const material = new THREE.MeshStandardMaterial({color: colors.trunk});
        const trunk = new THREE.Mesh(geometry, material);
        trunk.receiveShadow = true;
        trunk.castShadow = true;
        shipGroup.add(trunk);
    }
    {
        const geometry = new THREE.BoxGeometry(5, 1.7, 8);
        const material = new THREE.MeshStandardMaterial({color: colors.trunkCore});
        const trunkCore = new THREE.Mesh(geometry, material);
        trunkCore.position.set(0, 0, +3);
        trunkCore.receiveShadow = true;
        trunkCore.castShadow = true;
        shipGroup.add(trunkCore);
    }
    {
        const geometry = new THREE.BoxGeometry(14, 0.6, 4);
        const material = new THREE.MeshStandardMaterial({color: colors.wings});
        const wings = new THREE.Mesh(geometry, material);
        wings.position.set(0, 0, +2);
        wings.receiveShadow = true;
        wings.castShadow = true;
        shipGroup.add(wings);
    }
    {
        const geometry = new THREE.BoxGeometry(2, 2, 4);
        const material = new THREE.MeshStandardMaterial({color: colors.motorCover});
        const leftMotor = new THREE.Mesh(geometry, material);
        leftMotor.position.set(-5, 0, +4);
        leftMotor.receiveShadow = true;
        leftMotor.castShadow = true;
        shipGroup.add(leftMotor);
    }
    {
        const geometry = new THREE.BoxGeometry(2, 2, 4);
        const material = new THREE.MeshStandardMaterial({color: colors.motorCover});
        const rightMotor = new THREE.Mesh(geometry, material);
        rightMotor.position.set(+5, 0, +4);
        rightMotor.receiveShadow = true;
        rightMotor.castShadow = true;
        shipGroup.add(rightMotor);
    }
    {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 1);
        const material = new THREE.MeshBasicMaterial({color: colors.motorExhaust});
        const leftMotorExhaust = new THREE.Mesh(geometry, material);
        leftMotorExhaust.position.set(-5, 0, +6);
        leftMotorExhaust.receiveShadow = true;
        leftMotorExhaust.castShadow = true;
        shipGroup.add(leftMotorExhaust);
    }
    {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 1);
        const material = new THREE.MeshBasicMaterial({color: colors.motorExhaust});
        const rightMotorExhaust = new THREE.Mesh(geometry, material);
        rightMotorExhaust.position.set(+5, 0, +6);
        rightMotorExhaust.receiveShadow = true;
        rightMotorExhaust.castShadow = true;
        shipGroup.add(rightMotorExhaust);
    }
    scene.add(shipGroup);
    shipGroup.position.set(0, -5, 0);
    shipGroup.scale.set(0.01, 0.01, 0.01);
    return shipGroup;
}
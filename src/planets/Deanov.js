import * as THREE from "three";
import deanovColorPath from "../../textures/deanov/color.png";
import deanovCloud1Path from "../../textures/deanov/clouds01.png";
import deanovCloud2Path from "../../textures/deanov/clouds02.png";
import deanovRingColorPath from "../../textures/deanov/rings_color.jpg";
import deanovRingAlphaPath from "../../textures/deanov/rings_alpha.png";
import systemInfo from "./info.json";
import {SpaceObject} from "../SpaceObject";
import {angularVelocityFromRadius, loadColorTexture} from "../utils";
import {AddGasPlanet, createOrbitLine, SphereWithAlpha} from "./PlanetUtils";

export function addDeanov(scene, meshes, spaceObjects, selectableObjects) {
    const deanovGroup = new THREE.Group();
    const deanov = AddGasPlanet(
        meshes,
        0,
        0,
        0,
        11,
        50,
        50,
        deanovColorPath
    );
    const deanovClouds1 = SphereWithAlpha(meshes, deanov, 11.2, 50, 50, deanovCloud1Path, 0xff0132);
    const deanovClouds2 = SphereWithAlpha(meshes, deanovClouds1, 11.3, 50, 50, deanovCloud1Path, 0xf3a172);
    const deanovClouds3 = SphereWithAlpha(meshes, deanovClouds2, 11.5, 50, 50, deanovCloud2Path, 0xf4a072);
    const deanovRing = DeanovRings(deanov)
    deanovGroup.add(deanov);
    deanovGroup.add(deanovClouds1);
    deanovGroup.add(deanovClouds2);
    deanovGroup.add(deanovClouds3);
    deanovGroup.add(deanovRing);
    scene.add(deanovGroup);
    scene.add(createOrbitLine(450, 0x645146));
    const deanovObject = new SpaceObject(undefined, deanovGroup, 12, 450, +angularVelocityFromRadius(450),  100, systemInfo.sistema.planetas[4]);
    selectableObjects.push(deanovObject);
    spaceObjects.push(deanovObject);
}

function DeanovRings(parent) {
    const [innerRadius, outerRadius] = [15, 24];

    const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);

    const ringMaterial = new THREE.MeshStandardMaterial({
        map: loadColorTexture(deanovRingColorPath, THREE.SRGBColorSpace),
        alphaMap: loadColorTexture(deanovRingAlphaPath, THREE.NoColorSpace),
        transparent: true,
        side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(ringGeometry, ringMaterial);
    parent.attach(mesh);
    const planetPosition = parent.position.clone();
    mesh.position.set(planetPosition.x, planetPosition.y, planetPosition.z);
    mesh.rotation.x = Math.PI / 8;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}
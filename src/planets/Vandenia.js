import * as THREE from "three";
import vandeniaColorPath from "../../textures/vandenia/color.png";
import vandeniaDisplacementPath from "../../textures/vandenia/displacement.png";
import vandeniaNormalPath from "../../textures/vandenia/normal.png";
import vandeniaAOPath from "../../textures/vandenia/occlusion.png";
import vandeniaSpecularPath from "../../textures/vandenia/specular.png";
import cloudsAlphaPath from "../../textures/clouds.png";
import vandeniaAtmospherePath from "../../textures/vandenia/atmosphere_alpha.png";
import systemInfo from "./info.json";
import {SpaceObject} from "../SpaceObject";
import {angularVelocityFromRadius} from "../utils";
import {createOrbitLine, Planet, SphereWithAlpha} from "./PlanetUtils";

export function addVandenia(scene, meshes, spaceObjects, selectableObjects) {
    const vandeniaGroup = new THREE.Group();
    const vandenia = Planet(
        meshes,
        0,
        0,
        0,
        3,
        50,
        50,
        vandeniaColorPath,
        vandeniaDisplacementPath,
        vandeniaNormalPath,
        vandeniaAOPath,
        vandeniaSpecularPath,
        0.5,
        0.1,
        0.7,
        0.9
    );
    const vandeniaClouds = SphereWithAlpha(meshes, vandenia, 3.347, 50, 50, cloudsAlphaPath, 0xffa0ff);
    const vandeniaAtmosphere = SphereWithAlpha(meshes, vandenia, 3.5, 50, 50, vandeniaAtmospherePath, 0xffb0ff);
    vandeniaGroup.add(vandenia);
    vandeniaGroup.add(vandeniaClouds);
    vandeniaGroup.add(vandeniaAtmosphere);
    scene.add(vandeniaGroup);
    scene.add(createOrbitLine(150, 0x795f9f));
    const vandeniaObject = new SpaceObject(undefined, vandeniaGroup, 3, 150, +angularVelocityFromRadius(150), 180, systemInfo.sistema.planetas[1]);
    selectableObjects.push(vandeniaObject);
    spaceObjects.push(vandeniaObject);
}
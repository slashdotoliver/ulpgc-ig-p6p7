import * as THREE from "three";
import ephichiColorPath from "../../textures/ephichi/color.png";
import ephichiDisplacementPath from "../../textures/ephichi/displacement.png";
import ephichiNormalPath from "../../textures/ephichi/normal.png";
import ephichiAOPath from "../../textures/ephichi/occlusion.png";
import ephichiSpecularPath from "../../textures/ephichi/specular.png";
import cloudsAlphaPath from "../../textures/clouds.png";
import ephichiAtmospherePath from "../../textures/ephichi/atmosphere_alpha.png";
import kiproColorPath from "../../textures/kepro/color.png";
import kiproDisplacementPath from "../../textures/kepro/displacement.png";
import kiproNormalPath from "../../textures/kepro/normal.png";
import kiproAOPath from "../../textures/kepro/occlusion.png";
import kiproSpecularPath from "../../textures/kepro/specular.png";
import systemInfo from "./info.json";
import {SpaceObject} from "../SpaceObject";
import {angularVelocityFromRadius} from "../utils";
import {AddPlanetWithEmission, createOrbitLine, Planet, SphereWithAlpha} from "./PlanetUtils";

export function addEphichi(scene, meshes, spaceObjects, selectableObjects) {
    const ephichiGroup = new THREE.Group();
    const ephichi = Planet(
        meshes,
        0,
        0,
        0,
        2.5,
        50,
        50,
        ephichiColorPath,
        ephichiDisplacementPath,
        ephichiNormalPath,
        ephichiAOPath,
        ephichiSpecularPath,
        0.2,
        0,
        0.9,
        0.2
    );

    const kepro = AddPlanetWithEmission(
        meshes,
        0,
        0,
        0,
        0.5,
        50,
        50,
        kiproColorPath,
        kiproDisplacementPath,
        kiproNormalPath,
        kiproAOPath,
        kiproSpecularPath,
        kiproSpecularPath,
        0x301000,
        0.05,
        0,
        0.9,
        0.1
    );

    const ephiciClouds = SphereWithAlpha(meshes, ephichi, 2.8, 50, 50, cloudsAlphaPath, 0xffffff);
    const ephichiAtmosphere = SphereWithAlpha(meshes, ephichi, 2.9, 50, 50, ephichiAtmospherePath, 0xadfff1);
    ephichiGroup.add(ephichi);
    ephichiGroup.add(ephiciClouds);
    ephichiGroup.add(ephichiAtmosphere);
    ephichiGroup.add(createOrbitLine(0.5 * 15 * 2, 0xa0a0a0));
    const ephichiObject = new SpaceObject(undefined, ephichiGroup, 2.5, 220, +angularVelocityFromRadius(220), 20, systemInfo.sistema.planetas[2]);
    selectableObjects.push(ephichiObject);
    spaceObjects.push(ephichiObject);

    const keproObject = new SpaceObject(ephichiObject, kepro, 0.5, 15, +angularVelocityFromRadius(15 * 3), 0, systemInfo.sistema.planetas[5]);
    selectableObjects.push(keproObject);
    spaceObjects.push(keproObject);

    scene.add(ephichiGroup);
    scene.add(kepro);
    scene.add(createOrbitLine(220, 0x6a9eae));
}
import * as THREE from "three";
import votusteaColorPath from "../../textures/votustea/color.png";
import votusteaDisplacementPath from "../../textures/votustea/displacement.png";
import votusteaNormalPath from "../../textures/votustea/normal.png";
import votusteaAOPath from "../../textures/votustea/occlusion.png";
import votusteaSpecularPath from "../../textures/votustea/specular.png";
import cloudsAlphaPath from "../../textures/clouds.png";
import deanovCloud1Path from "../../textures/deanov/clouds01.png";
import deanovCloud2Path from "../../textures/deanov/clouds02.png";
import systemInfo from "./info.json";
import {SpaceObject} from "../SpaceObject";
import {angularVelocityFromRadius} from "../utils";
import {AddPlanetWithEmission, createOrbitLine, SphereWithAlpha} from "./PlanetUtils";

export function addVotustea(scene, meshes, spaceObjects, selectableObjects) {
    const votusteaGroup = new THREE.Group();
    const votustea = AddPlanetWithEmission(
        meshes,
        0,
        0,
        0,
        4,
        50,
        50,
        votusteaColorPath,
        votusteaDisplacementPath,
        votusteaNormalPath,
        votusteaAOPath,
        votusteaSpecularPath,
        votusteaSpecularPath,
        0xff4600,
        0.4,
        1,
        0.9,
        0.5
    );
    const votusteaAtmosphere = SphereWithAlpha(meshes, votustea, 5.4, 50, 50, cloudsAlphaPath, 0x101010);
    const votusteaClouds1 = SphereWithAlpha(meshes, votustea, 5.5, 50, 50, deanovCloud1Path, 0x514d40);
    const votusteaClouds2 = SphereWithAlpha(meshes, votustea, 5.6, 50, 50, deanovCloud2Path, 0x7a735b);
    votusteaGroup.add(votustea);
    votusteaGroup.add(votusteaAtmosphere);
    votusteaGroup.add(votusteaClouds1);
    votusteaGroup.add(votusteaClouds2);
    scene.add(votusteaGroup);
    scene.add(createOrbitLine(320, 0xc96363));
    const votusteaObject = new SpaceObject(undefined, votusteaGroup, 4, 320, -angularVelocityFromRadius(320), 80, systemInfo.sistema.planetas[3]);
    selectableObjects.push(votusteaObject);
    spaceObjects.push(votusteaObject);
}
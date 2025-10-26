import merutaColorPath from "../../textures/meruta/color.png";
import merutaDisplacementPath from "../../textures/meruta/displacement.png";
import merutaNormalPath from "../../textures/meruta/normal.png";
import merutaAOPath from "../../textures/meruta/occlusion.png";
import merutaSpecularPath from "../../textures/meruta/specular.png";
import systemInfo from "./info.json";
import {SpaceObject} from "../SpaceObject";
import {angularVelocityFromRadius} from "../utils";
import {createOrbitLine, Planet} from "./PlanetUtils";

export function addMeruta(scene, meshes, spaceObjects, selectableObjects) {
    const meruta = Planet(
        meshes,
        0,
        0,
        0,
        2,
        50,
        50,
        merutaColorPath,
        merutaDisplacementPath,
        merutaNormalPath,
        merutaAOPath,
        merutaSpecularPath,
        1,
        0.2,
        0.9,
        0.5,
    );
    const merutaObject = new SpaceObject(undefined, meruta, 2, 50, -angularVelocityFromRadius(50), 90, systemInfo.sistema.planetas[0]);
    selectableObjects.push(merutaObject);
    spaceObjects.push(merutaObject);
    scene.add(meruta);
    scene.add(createOrbitLine(50, 0x6b7646));
}
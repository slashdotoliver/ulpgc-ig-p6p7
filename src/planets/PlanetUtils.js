import * as THREE from "three";
import {loadColorTexture, loadGrayTexture} from "../utils";
import sunTexturePath from "../../textures/sun/sun2_small.png";
import systemInfo from "./info.json";
import {SpaceObject} from "../SpaceObject";

export function AddSun(meshes, px, py, pz, radius, nx, ny, selectableObjects) {
    let geometry = new THREE.SphereGeometry(radius, nx, ny);
    let material = new THREE.MeshBasicMaterial({
        map: loadGrayTexture(sunTexturePath, THREE.SRGBColorSpace),
        transparent: true,
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(px, py, pz);
    meshes.push(mesh);
    selectableObjects.push(new SpaceObject(undefined, mesh, radius, 0, 0, 0, systemInfo.sistema.estrella));
    return mesh;
}

export function Planet(
    meshes,
    px,
    py,
    pz,
    radius,
    nx,
    ny,
    texturePath,
    displacementPath,
    normalPath,
    aoPath,
    specularPath,
    dScale,
    dBias,
    roughness,
    metalness
) {
    const geometry = new THREE.SphereGeometry(radius, nx, ny);

    const material = new THREE.MeshStandardMaterial({
        map: loadColorTexture(texturePath, THREE.SRGBColorSpace),
        displacementMap: loadColorTexture(displacementPath, THREE.NoColorSpace),
        displacementScale: dScale,
        displacementBias: dBias,
        normalMap: loadColorTexture(normalPath, THREE.NoColorSpace),
        aoMap: loadColorTexture(aoPath, THREE.NoColorSpace),
        roughness: roughness,
        metalness: metalness,
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(px, py, pz);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    meshes.push(mesh);
    return mesh;
}

export function AddGasPlanet(meshes, px, py, pz, radius, nx, ny, texturePath) {
    const geometry = new THREE.SphereGeometry(radius, nx, ny);

    const material = new THREE.MeshStandardMaterial({
        map: loadColorTexture(texturePath, THREE.SRGBColorSpace),
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(px, py, pz);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    meshes.push(mesh);
    return mesh;
}

export function AddPlanetWithEmission(
    meshes,
    px,
    py,
    pz,
    radio,
    nx,
    ny,
    texturePath,
    displacementPath,
    normalPath,
    aoPath,
    specularPath,
    emissivePath,
    emissiveColor,
    dScale,
    dBias,
    roughness,
    metalness
) {
    const geometry = new THREE.SphereGeometry(radio, nx, ny);

    const material = new THREE.MeshStandardMaterial({
        map: loadColorTexture(texturePath, THREE.SRGBColorSpace),
        displacementMap: loadColorTexture(displacementPath, THREE.NoColorSpace),
        displacementScale: dScale,
        displacementBias: dBias,
        normalMap: loadColorTexture(normalPath, THREE.NoColorSpace),
        aoMap: loadColorTexture(aoPath, THREE.NoColorSpace),
        emissiveMap: loadColorTexture(emissivePath, THREE.NoColorSpace),
        emissive: emissiveColor,
        roughness: roughness,
        metalness: metalness,
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(px, py, pz);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    meshes.push(mesh);
    return mesh;
}

export function SphereWithAlpha(meshes, parent, radio, nx, ny, alphaPath, color) {
    const geometry = new THREE.SphereGeometry(radio, nx, ny);

    const material = new THREE.MeshStandardMaterial({
        alphaMap: loadColorTexture(alphaPath, THREE.NoColorSpace),
        transparent: true,
        color: color,
        side: THREE.DoubleSide,
    });

    let mesh = new THREE.Mesh(geometry, material);
    parent.attach(mesh);
    const planetPosition = parent.position.clone();
    mesh.position.set(planetPosition.x, planetPosition.y, planetPosition.z);
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    meshes.push(mesh);
    meshes.push(mesh);
    return mesh;
}

export function createOrbitLine(radius, color, segments = 100) {
    //const geometry = new THREE.CircleGeometry(radius, segments);
    //geometry.vertices.shift();
    const points = [];
    for (let i = 0; i < segments; i += 1) {
        const theta = 2 * Math.PI * i / segments;
        points.push(new THREE.Vector3(radius * Math.cos(theta), 0, radius * Math.sin(theta)));
    }
    points.push(new THREE.Vector3(radius, 0, 0))

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
        color: color,
        opacity: 0.3,
        transparent: true,
    });

    const orbit = new THREE.Line(geometry, material);
    orbit.rotation.x = 0;
    return orbit;
}

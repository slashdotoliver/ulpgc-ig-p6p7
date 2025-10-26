import * as THREE from "three";
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {loadCubeTexture} from "./utils";

import rightSkyboxPath from "../textures/skybox/right.png";
import leftSkyboxPath from "../textures/skybox/left.png";
import bottomSkyboxPath from "../textures/skybox/bottom.png";
import frontSkyboxPath from "../textures/skybox/front.png";
import topSkyboxPath from "../textures/skybox/top.png";
import backSkyboxPath from "../textures/skybox/back.png";

import {AddSun} from "./planets/PlanetUtils";
import {addMeruta} from "./planets/Meruta";
import {addVandenia} from "./planets/Vandenia";
import {addEphichi} from "./planets/Ephichi";
import {addVotustea} from "./planets/Votustea";
import {addDeanov} from "./planets/Deanov";
import {OrbitalCameraControls} from "./OrbitalCameraControls";
import {PlanetSelector} from "./PlanetSelector";
import {addLeftPanelInfo} from "./LeftPanel";
import {FreeCameraControls} from "./FreeCameraControls";
import {addShip} from "./Spaceship";

// Fuentes
//https://threejs.org/docs/#manual/en/introduction/Creating-a-scene -->
//https://r105.threejsfundamentals.org/threejs/lessons/threejs-primitives.html  -->
let scene;
let camera;
let renderer;
let spinMeshes = [];
let spaceObjects = [];
let selectableObjects = [];
let grid;
let raycaster;
let raycastPlane;
let spaceShip;

//let orbitControls;
//let mapControls;
let orbitalCameraControls;
let freeCameraControls;

let state = {
    currentSelectedObject: null,
    updateSelectedObject: (selectedObject) => {
        state.currentSelectedObject = selectedObject;
        orbitalCameraControls.setTarget(selectedObject);
        addLeftPanelInfo(selectedObject.info);
    },
    flying: false,
    updateControls: (flying) => {
        if (flying === state.flying) return;
        state.flying = flying;
        if (flying) {
            orbitalCameraControls.detach();
            freeCameraControls.attach();
        } else {
            state.updateSelectedObject(selectableObjects[0]);
            freeCameraControls.detach();
            orbitalCameraControls.attach();
        }
    }
};

init();
animationLoop();

function addRaycastPlane() {
    let raycastPlaneGeometry = new THREE.PlaneGeometry(1000, 1000);
    let raycastPlaneMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    raycastPlane = new THREE.Mesh(raycastPlaneGeometry, raycastPlaneMaterial);
    raycastPlane.rotateX(Math.PI / 2);
    raycastPlane.visible = false;
    scene.add(raycastPlane);
}

function createThreeRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = "renderer";
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function addPlanets() {
    scene.add(
        AddSun(spinMeshes, 0, 0, 0, 18, 50, 50, selectableObjects)
    );
    addMeruta(scene, spinMeshes, spaceObjects, selectableObjects);
    addVandenia(scene, spinMeshes, spaceObjects, selectableObjects);
    addEphichi(scene, spinMeshes, spaceObjects, selectableObjects);
    addVotustea(scene, spinMeshes, spaceObjects, selectableObjects);
    addDeanov(scene, spinMeshes, spaceObjects, selectableObjects);
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
    );
    camera.position.set(0, 20, 60);
    createThreeRenderer();
    addRaycastPlane();
    addPlanets();
    spaceShip = addShip(scene);

    raycaster = new THREE.Raycaster();

    orbitalCameraControls = new OrbitalCameraControls(camera, selectableObjects[0]);
    freeCameraControls = new FreeCameraControls(camera);
    orbitalCameraControls.attach();
    state.updateSelectedObject(selectableObjects[0]);

    document.getElementById("orbit-camera-button").addEventListener("click", () => {
        state.updateControls(false);
    });
    document.getElementById("free-camera-button").addEventListener("click", () => {
        state.updateControls(true);
    });

    const raycastHandler = new PlanetSelector(raycaster, raycastPlane, renderer, camera, scene, selectableObjects, state);

    const light = new THREE.PointLight(0xffffff, 1, 1000, 0);
    light.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.04;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add(light);
    scene.background = loadCubeTexture(
        rightSkyboxPath,
        leftSkyboxPath,
        topSkyboxPath,
        bottomSkyboxPath,
        frontSkyboxPath,
        backSkyboxPath
    );
}

function animationLoop() {
    requestAnimationFrame(animationLoop);
    for (let object of spinMeshes) {
        object.rotation.y += 0.001;
    }
    for (let spaceObject of spaceObjects) {
        spaceObject.update();
    }
    renderer.render(scene, camera);
    if (state.flying) {
        freeCameraControls.updateCameraPosition();
        const cameraPosition = freeCameraControls.lookAtPositionFromCamera(0.3);
        const cameraRotation = camera.rotation.clone();
        const newSpaceshipPosition = new THREE.Vector3(
            cameraPosition.x,
            cameraPosition.y - 0.1,
            cameraPosition.z
        );
        spaceShip.position.set(newSpaceshipPosition.x, newSpaceshipPosition.y, newSpaceshipPosition.z);
        spaceShip.rotation.set(cameraRotation.x, cameraRotation.y, cameraRotation.z);
    } else {
        orbitalCameraControls.updateCameraPosition();
    }
}

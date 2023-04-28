import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Experience from "./Experience";

export default class Camera {
    constructor () {

        //options
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;

        this.debugProperties = { active: true };

        //options
        this.setCamera();
        this.setOrbitControls();
        this.setDebug();
    }
    setDebug() {
        if (this.debug.active) {

            this.uiFolder = this.debug.ui.addFolder("camera");

            this.uiFolder.add(this.debugProperties, 'active').name("orbit lock").onChange((value => {
                if (value) {
                    this.controls.maxDistance = 11;
                    this.controls.maxPolarAngle = Math.PI / 2;
                }
                else {

                    this.controls.maxDistance = 100;
                    this.controls.maxPolarAngle = Math.PI;
                }

            }));
        }
    }
    setCamera() {

        //camera instance
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.aspect, .1, 100);
        this.instance.position.set(10, 2, 7);
        this.scene.add(this.instance);
    }
    setOrbitControls() {

        //orbital controls
        this.controls = new OrbitControls(this.instance, this.canvas);

        this.controls.enableDamping = true;

        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = .5;
        this.controls.maxDistance = 11;
        this.controls.maxPolarAngle = Math.PI / 2;

    }

    resize() {
        this.instance.aspect = this.sizes.aspect;
        this.instance.updateProjectionMatrix();
    }
    update() {
        this.controls.update();
    }
}
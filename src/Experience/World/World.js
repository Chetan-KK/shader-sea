import * as THREE from 'three';
import Experience from "../Experience";
import ShaderPlane from './ShaderPlane/ShaderPlane';

export default class World {
    constructor () {

        //options
        this.experience = new Experience();
        this.time = this.experience.time;
        this.debug = this.experience.debug;

        //others
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.isLoaded = false;

        this.resources.on('ready', () => {
            this.loaded();
        });
    }

    //laod after all resources are loaded    
    loaded() {
        this.isLoaded = true;
        this.shaderPlane = new ShaderPlane();
    }
    update() {
        if (this.isLoaded) {
            this.shaderPlane.update();
        }
    }
}
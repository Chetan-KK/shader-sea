import * as THREE from 'three';
import Experience from "../../Experience";
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

export default class ShaderPlane {
    constructor () {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.debug = this.experience.debug;
        this.renderer = this.experience.renderer;
        this.debugProperties = {
            depthColor: 0x26,
            surfaceColor: 0x93ff
        };

        this.setPlane();

        if (this.debug.active) {
            this.setDebug();
        }
    }

    setPlane() {
        this.planeGeometry = new THREE.PlaneGeometry(20, 20, 264, 264);
        this.planeMaterial = new THREE.RawShaderMaterial(
            {
                side: THREE.DoubleSide,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: {
                    uTime: { value: 0 },
                    uFrequency: { value: new THREE.Vector2(.28, .23) },
                    uSpeed: { value: new THREE.Vector2(1.2, .5) },
                    uWaves: { value: new THREE.Vector2(1.5, 1.5) },

                    uSmallWaveElevation: { value: .3 },
                    uSmallWaveFrequency: { value: .8 },
                    uSmallWaveSpeed: { value: .2 },
                    uSmallWaveIterations: { value: .3 },

                    uDepthColor: { value: new THREE.Color(this.debugProperties.depthColor) },
                    uSurfaceColor: { value: new THREE.Color(this.debugProperties.surfaceColor) },

                    uOffset: { value: .8 },
                    uMultiply: { value: 0.7 },
                }
            });

        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.plane.rotation.x = -Math.PI / 2;
        this.scene.add(this.plane);

    }
    update() {
        this.planeMaterial.uniforms.uTime.value = this.time.elapsed / 1000;
    }
    setDebug() {
        this.uiFolder = this.debug.ui.addFolder('plane');

        this.uiFolder.add(this.planeMaterial.uniforms.uFrequency.value, "x").min(0).max(1).step(.001).name('frequency x');
        this.uiFolder.add(this.planeMaterial.uniforms.uFrequency.value, "y").min(0).max(1).step(.001).name('frequency z');

        this.uiFolder.add(this.planeMaterial.uniforms.uSpeed.value, "x").min(0).max(20).step(.001).name('speed x');
        this.uiFolder.add(this.planeMaterial.uniforms.uSpeed.value, "y").min(0).max(20).step(.001).name('speed z');

        this.uiFolder.add(this.planeMaterial.uniforms.uWaves.value, "x").min(0).max(20).step(.001).name('waves x');
        this.uiFolder.add(this.planeMaterial.uniforms.uWaves.value, "y").min(0).max(20).step(.001).name('waves z');

        this.uiFolder.addColor(this.debugProperties, "surfaceColor").onChange(() => {
            this.planeMaterial.uniforms.uSurfaceColor.value.set(this.debugProperties.surfaceColor);
        });

        this.uiFolder.addColor(this.debugProperties, "depthColor").onChange(() => {
            this.planeMaterial.uniforms.uDepthColor.value.set(this.debugProperties.depthColor);
            this.renderer.instance.setClearColor(this.debugProperties.depthColor);
        });


        this.uiFolder.add(this.planeMaterial.uniforms.uOffset, "value").min(0).max(2).step(.001).name('offset');
        this.uiFolder.add(this.planeMaterial.uniforms.uMultiply, "value").min(0).max(2).step(.001).name('multiply color');

        this.uiFolder.add(this.planeMaterial.uniforms.uSmallWaveElevation, "value").min(0).max(2).step(.001).name('small wave Elevation');
        this.uiFolder.add(this.planeMaterial.uniforms.uSmallWaveFrequency, "value").min(0).max(10).step(.001).name('small wave Frequency');
        this.uiFolder.add(this.planeMaterial.uniforms.uSmallWaveSpeed, "value").min(0).max(2).step(.001).name('small wave speed');
    }
}
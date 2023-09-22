<template>
    <div id="canvas-wrapper" ref="container">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

let model: THREE.Object3D | null;
const scene:THREE.Scene = new THREE.Scene();
const camera:THREE.Camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); 

let totalRotation:number = 0;
let rotationSpeed:number = 0.72;
const targetRotationSpeed:number = 0.00;

let modelYPosition:number = -1;
const targetPosition:number = -0.4;

let modelXRotation:number = 1.5;
const targetXRotation:number = 0;

const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );

export default defineComponent({
	name: 'ModelView',
    mounted() {
        this.init();
    },
	methods: {
        init () {
            const container = this.$refs.container as HTMLElement;
            camera.position.z = 1;

            renderer.setClearColor( 0x000000, 0 );
            renderer.setSize(window.innerWidth, window.innerHeight);

            container.appendChild(renderer.domElement);
            
            const light = new THREE.AmbientLight(0xffffff, 2.25);
            scene.add(light);

            const pointLight = new THREE.PointLight(0xffffff, 2.25);
            pointLight.position.set(1, 0, 0);
            camera.add(pointLight);
            scene.add(camera);

            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('/node_modules/three/examples/jsm/libs/draco/');

            const loader = new GLTFLoader();
            loader.setDRACOLoader(dracoLoader)

            loader.load('./src/assets/models/tokki_old.glb', (gltf) => {
                model = gltf.scene;
                model.position.set(0, -0.45, 0)
                model.scale.set(3.1, 3.1, 3.1);

                scene.add(model);
            });

            this.animateModel();

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enablePan = true;
            controls.enableRotate = true;
            controls.enableDamping = true;
            controls.enableZoom = false;
            controls.update();
        },

        animateModel() {
            requestAnimationFrame(this.animateModel);

            if (model) {
                rotationSpeed = this.lerp(rotationSpeed, targetRotationSpeed, 0.036);

                model.rotation.y += rotationSpeed;
                totalRotation += rotationSpeed;

                modelYPosition = this.lerp(modelYPosition, targetPosition, 0.046);
                model.position.y = modelYPosition;

                modelXRotation = this.lerp(modelXRotation, targetXRotation, 0.023);
                model.rotation.x = modelXRotation;
            }
            this.render();
        },

        lerp(a: any, b: any, t: any) {
            return a + (b - a) * t;
        },

        render() {
            renderer.render( scene, camera );
        }
	}
});
</script>

<style lang="scss">
#canvas-wrapper {
    position: relative;
}

canvas {
    height: 100% !important;
}
</style>

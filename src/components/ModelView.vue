<template>
    <div>
        <div id="canvas-wrapper" ref="container"></div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, watchEffect, ref } from 'vue';
import * as THREE from 'three';
import { useEditModeStore } from '../store/editMode';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

let totalRotation = 0;
let rotationSpeed = 0.72;
let targetRotationSpeed = 0.00;

let modelYPosition = -1;
let targetPosition = -0.45;

let modelXRotation = 1.5;
let targetXRotation = 0;

let modelScale = 3;
let targetScale = 3;

let yLerp = 0.037;

export default defineComponent({
    name: 'ModelView',
    setup() {
        const container = ref<HTMLElement | null>(null);
        const editModeStore = useEditModeStore();

        let model: THREE.Object3D | null;

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);

        const scene = new THREE.Scene();

        const light = new THREE.AmbientLight(0xffffff, 2.25);
        scene.add(light);

        const pointLight = new THREE.PointLight(0xffffff, 2.25);
        pointLight.position.set(1, 0, 0);
        camera.add(pointLight);
        scene.add(camera);

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/node_modules/three/examples/jsm/libs/draco/');

        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

        watchEffect(() => {
            const newState = editModeStore.isEditMode();
            console.log('Edit mode changed to:', newState);

            if (newState === true) {
                console.log('true');
                targetScale = 4.5;
                targetPosition = -0.65;
                yLerp = 0.11;
            } else {
                targetScale = 3;
                targetPosition = -0.45;
            }
        });

        onMounted(() => {
            if (container.value) {
                container.value.appendChild(renderer.domElement);
            }

            loader.load('./src/assets/models/tokki_old.glb', (gltf) => {
                model = gltf.scene;
                model.position.set(0, -0.45, 0);
                model.scale.set(modelScale, modelScale, modelScale);
                scene.add(model);
            });
            
            const animateModel = () => {
                requestAnimationFrame(animateModel);
                if (model) {
                    rotationSpeed = lerp(rotationSpeed, targetRotationSpeed, 0.036);
                    model.rotation.y += rotationSpeed;
                    totalRotation += rotationSpeed;

                    modelYPosition = lerp(modelYPosition, targetPosition, yLerp);
                    model.position.y = modelYPosition;

                    modelXRotation = lerp(modelXRotation, targetXRotation, 0.02);
                    model.rotation.x = modelXRotation;

                    modelScale = lerp(modelScale, targetScale, 0.12);
                    model.scale.set(modelScale, modelScale, modelScale);

                    console.log(modelScale);
                }
                renderer.render(scene, camera);
            };

            animateModel();

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enablePan = true;
            controls.enableRotate = true;
            controls.enableDamping = true;
            controls.enableZoom = false;
            controls.update();
        });

        // let currentScale = initialModelScale;
        // let currentYPos = initialModelY;

        // const moveModel = () => {
        //     requestAnimationFrame(moveModel);
        //     // console.log(this.model.scal);
        //     let targetScale:number = 5;
        //     // let targetPosition:number = -5;
            
        //     if (model) {
        //         currentScale = lerp(currentScale, targetScale, 0.1);
        //         model.scale.set(currentScale, currentScale, currentScale);

        //         // currentYPos = lerp(currentYPos, targetPosition, 0.05);
        //         // model.position.y = currentYPos;
        //         model.position.y = 2;
        //         console.log(model.position.y);
        //     }
        // };

        const lerp = (a: number, b: number, t: number) => {
            return a + (b - a) * t;
        };

        return {
            container,
            // moveModel,
            lerp
        };
    },
});
</script>
  
<style>
#canvas-wrapper {
    position: relative;
}

canvas {
    height: 100% !important;
}   
</style>

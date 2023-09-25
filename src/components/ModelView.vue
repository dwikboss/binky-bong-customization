<template>
    <div>
        <div id="canvas-wrapper" ref="container"></div>
    </div>
</template>

<script lang="ts">
import * as THREE from 'three';
import { defineComponent, onMounted, watchEffect, ref } from 'vue';
import { useEditModeStore } from '../store/editMode';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// let totalRotation = 0;
// let rotationSpeed = 0.72;
// let targetRotationSpeed = 0.00;

let modelYPosition = -1;
let targetPosition = -0.45;

let modelXRotation = 1.5;
let targetXRotation = 0;

let modelYRotation = 20;
let targetYRotation = 0;

let modelScale = 3;
let targetScale = 3;

let yLerp = 0.037;

export default defineComponent({
    name: 'ModelView',
    setup() {
        const container = ref<HTMLElement | null>(null);
        const editModeStore = useEditModeStore();

        let bunny: THREE.Object3D | null;

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
            if (newState === true) {
                targetScale = 4.5;
                targetPosition = -0.65;
                yLerp = 0.11;
            } else {
                targetScale = 3;
                targetPosition = -0.45;
                targetYRotation = 0;
            }
            // console.log(model ? model.rotation : '');
        });

        function loadEye(model: THREE.Object3D, eyePath: string, position: {x: number, y: number, z: number}, scale: {x: number, y: number, z: number}) {
            loader.load(eyePath, (eyeGltf) => {
                const eye = eyeGltf.scene;
                eye.position.set(position.x, position.y, position.z);
                eye.scale.set(scale.x, scale.y, scale.z);

                model.add(eye);
            });
        }

        onMounted(() => {
            if (container.value) {
                container.value.appendChild(renderer.domElement);
            }

            loader.load('./src/assets/models/tokki_old.glb', (gltf) => {
                bunny = gltf.scene;
                bunny.position.set(0, -0.45, 0);
                scene.add(bunny);

                loadEye(bunny, './src/assets/models/eyes/star-eye.glb', { x: -0.02, y: 0.168, z: 0.02 }, { x: 1.1, y: 1.1, z: 1.1 });
                loadEye(bunny, './src/assets/models/eyes/min-eye.glb', { x: 0.02, y: 0.168, z: 0.02 }, { x: 1.1, y: 1.1, z: 1.1 });
            });
            
            const animateModel = () => {
                requestAnimationFrame(animateModel);
                if (bunny) {
                    modelYRotation = lerp(modelYRotation, targetYRotation, 0.05);
                    bunny.rotation.y = modelYRotation;

                    modelYPosition = lerp(modelYPosition, targetPosition, yLerp);
                    bunny.position.y = modelYPosition;

                    modelXRotation = lerp(modelXRotation, targetXRotation, 0.023);
                    bunny.rotation.x = modelXRotation;

                    modelScale = lerp(modelScale, targetScale, 0.12);
                    bunny.scale.set(modelScale, modelScale, modelScale);

                    console.log(bunny.rotation.y);
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

<template>
    <div id="canvas-wrapper" ref="container"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export default defineComponent({
	name: 'ModelView',
    mounted() {
        this.init();
    },
	methods: {
        init () {
            const container = this.$refs.container as HTMLElement;

            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); 
            camera.position.z = 1;

            const renderer = new THREE.WebGLRenderer( { alpha: true } );
            renderer.setClearColor( 0x000000, 0 );
            renderer.setSize(window.innerWidth, window.innerHeight);

            container.appendChild(renderer.domElement);
            let model: THREE.Object3D;
            
            const light = new THREE.AmbientLight(0xffffff, 2.25);
            scene.add(light);

            // const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
            // directionalLight.position.set(0, 1, 0);
            // scene.add(directionalLight);

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
                model.position.set(0, -1, 0)
                model.scale.set(3.1, 3.1, 3.1);

                scene.add(model);
            });

            let totalRotation = 0;
            let rotationSpeed = 0.2;
            const targetRotationSpeed = 0.00;

            let modelYPosition = -1;
            const targetPosition = -0.45;

            const animateModel = () => {
                requestAnimationFrame(animateModel);
                

                if (model) {
                    rotationSpeed = lerp(rotationSpeed, targetRotationSpeed, 0.031);

                    model.rotation.y += rotationSpeed;
                    totalRotation += rotationSpeed;

                    if (totalRotation >= Math.PI * 2) {
                        return;
                    }

                    modelYPosition = lerp(modelYPosition, targetPosition, 0.031);
                    model.position.y = modelYPosition;
                }
                console.log(model.position);
                render();
            };

            function lerp(a: any, b: any, t: any) {
                return a + (b - a) * t;
            }

            animateModel();

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', render);
            controls.enablePan = true;
            controls.enableRotate = true;
            controls.enableDamping = true;
            controls.enableZoom = false;
            controls.update();

            function render() {
                renderer.render( scene, camera );
            }
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

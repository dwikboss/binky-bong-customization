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
            
            const light = new THREE.AmbientLight(0x404040, 20);
            scene.add(light);

            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('/node_modules/three/examples/jsm/libs/draco/');

            const loader = new GLTFLoader();
            loader.setDRACOLoader(dracoLoader)

            loader.load('./src/assets/models/tokki_old.glb', (gltf) => {
                model = gltf.scene;
                model.position.set(0, -0.45, 0)
                model.scale.set(3, 3, 3);

                const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
                directionalLight.position.copy(camera.position);
                scene.add(directionalLight);

                const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
                scene.add(ambientLight);

                scene.add(model);
                render();
            });

            let totalRotation = 0;
            let rotationSpeed = 0.5; // Starting rotation speed (fast)
            const targetRotationSpeed = 0.01; // Target rotation speed for easing

            const animateModel = () => {
                requestAnimationFrame(animateModel);

                if (model) {
                    rotationSpeed = lerp(rotationSpeed, targetRotationSpeed, 0.04); // Adjust the lerp factor

                    model.rotation.y += rotationSpeed;
                    totalRotation += rotationSpeed;

                    if (totalRotation >= Math.PI * 2 * 2) {
                        return;
                    }
                }

                renderer.render(scene, camera);
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

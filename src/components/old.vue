setup() {
    const container = ref<HTMLElement | null>(null);
    const model = ref<THREE.Object3D | null>(null);
    const camera = ref<THREE.PerspectiveCamera | null>(null);
    const controls = ref<OrbitControls | null>(null);

    onMounted(() => {
        const containerRef = container.value as HTMLElement;
        const scene = new THREE.Scene();

        const initCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        initCamera.position.z = 1;
        camera.value = initCamera;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);

        containerRef.appendChild(renderer.domElement);

        const light = new THREE.AmbientLight(0xffffff, 2.25);
        scene.add(light);

        const pointLight = new THREE.PointLight(0xffffff, 2.25);
        pointLight.position.set(1, 0, 0);
        initCamera.add(pointLight);
        scene.add(initCamera);

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/node_modules/three/examples/jsm/libs/draco/');

        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

        loader.load('./src/assets/models/tokki_old.glb', (gltf) => {
            model.value = gltf.scene;
            model.value.position.set(0, -0.45, 0);
            model.value.scale.set(3.1, 3.1, 3.1);

            scene.add(model.value);
            render();
        });

        const initControls = new OrbitControls(
            initCamera,
            renderer.domElement
        );

        initControls.enablePan = true;
        initControls.enableRotate = true;
        initControls.enableDamping = true;
        initControls.enableZoom = false;
        controls.value = initControls;

        function render() {
            renderer.render(scene, initCamera);
        }
    })

    return {
        container,
        camera,
        model,
        controls
    };
}
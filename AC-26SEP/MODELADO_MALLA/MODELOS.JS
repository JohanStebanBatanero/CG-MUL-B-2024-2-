    // Configurar la escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Cargar una textura
    const textureLoader = new THREE.TextureLoader();
    const cubeTexture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg');

    // Materiales para los objetos
    const cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture }); // Cubo con textura
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 }); // Esfera roja
    const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // Cono verde

    // Crear un cubo
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    // Crear una esfera
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 3; // Mover la esfera a la derecha
    scene.add(sphere);

    // Crear un cono
    const coneGeometry = new THREE.ConeGeometry(0.5, 1.5, 32);
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.x = -3; // Mover el cono a la izquierda
    scene.add(cone);

    // Añadir luz
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Posición inicial de la cámara
    camera.position.z = 5;

    // Variables para animación
    let cubeSpeedX = Math.random() * 0.05;
    let cubeSpeedY = Math.random() * 0.05;
    let sphereSpeedX = Math.random() * 0.05;
    let sphereSpeedY = Math.random() * 0.05;
    let coneSpeedX = Math.random() * 0.05;
    let coneSpeedY = Math.random() * 0.05;

    // Función de animación
    function animate() {
        requestAnimationFrame(animate);

        // Rotación y movimiento aleatorio del cubo
        cube.rotation.x += cubeSpeedX;
        cube.rotation.y += cubeSpeedY;
        cube.position.x += Math.sin(cube.rotation.x) * 0.02;
        cube.position.y += Math.cos(cube.rotation.y) * 0.02;

        // Rotación y movimiento aleatorio de la esfera
        sphere.rotation.x += sphereSpeedX;
        sphere.rotation.y += sphereSpeedY;
        sphere.position.x += Math.sin(sphere.rotation.x) * 0.02;
        sphere.position.y += Math.cos(sphere.rotation.y) * 0.02;

        // Rotación y movimiento aleatorio del cono
        cone.rotation.x += coneSpeedX;
        cone.rotation.y += coneSpeedY;
        cone.position.x += Math.sin(cone.rotation.x) * 0.02;
        cone.position.y += Math.cos(cone.rotation.y) * 0.02;

        // Renderizar la escena
        renderer.render(scene, camera);
    }

    animate();

    // Ajuste de la ventana cuando se cambia el tamaño
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
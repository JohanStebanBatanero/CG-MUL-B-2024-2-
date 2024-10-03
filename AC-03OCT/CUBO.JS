const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Configuración de OrbitControls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const numCubes = Math.floor(Math.random() * 5) + 1;
        const initialPosition = -((numCubes - 1) * 2) / 2;

        for (let i = 0; i < numCubes; i++) {
            const material = new THREE.MeshBasicMaterial({ visible: false });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = initialPosition + (i * 2);
            scene.add(cube);

            // Crear el wireframe (malla externa)
            const wireframeGeometry = new THREE.WireframeGeometry(geometry);
            const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
            const wireframeCube = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
            cube.add(wireframeCube);
        }

        camera.position.z = 5;

        function animate() {
            // Actualizar controles
            controls.update();

            // Rotar todos los cubos de manera sincronizada
            scene.children.forEach(cube => {
                cube.rotation.x += 0.02; // Ajusta la velocidad de rotación
                cube.rotation.y += 0.02; // Ajusta la velocidad de rotación
            });

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        // Manejar el redimensionamiento de la ventana
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Iniciar la animación
        animate();
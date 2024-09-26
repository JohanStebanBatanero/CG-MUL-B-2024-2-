// Configurar la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un material básico de color para el cubo
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Verde
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // Geometría del cubo
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial); // Crear el cubo
scene.add(cube); // Añadir el cubo a la escena

// Posicionar la cámara
camera.position.z = 5;

// Velocidades aleatorias para el movimiento y rotación del cubo
let rotationSpeedX = Math.random() * 0.05;
let rotationSpeedY = Math.random() * 0.05;
let movementSpeedX = Math.random() * 0.05;
let movementSpeedY = Math.random() * 0.05;

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Rotar el cubo
    cube.rotation.x += rotationSpeedX;
    cube.rotation.y += rotationSpeedY;

    // Mover el cubo de forma aleatoria
    cube.position.x += Math.sin(cube.rotation.x) * 0.01;
    cube.position.y += Math.cos(cube.rotation.y) * 0.01;

    // Renderizar la escena con la cámara
    renderer.render(scene, camera);
}

animate(); // Iniciar la animación

// Ajustar el tamaño del renderizado si cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
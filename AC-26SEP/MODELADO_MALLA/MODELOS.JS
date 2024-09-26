// Crear la escena, la cámara y el renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Materiales y geometrías
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Verde para el cubo
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Azul para la esfera

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // Geometría del cubo
const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32); // Geometría de la esfera

// Crear el cubo y la esfera
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Posicionamiento inicial
cube.position.x = -2; // Mover el cubo a la izquierda
sphere.position.x = 2; // Mover la esfera a la derecha

// Añadir los objetos a la escena
scene.add(cube);
scene.add(sphere);

// Posicionar la cámara
camera.position.z = 5;

// Velocidades aleatorias para el movimiento y rotación del cubo y la esfera
let cubeRotationSpeedX = Math.random() * 0.05;
let cubeRotationSpeedY = Math.random() * 0.05;
let sphereRotationSpeedX = Math.random() * 0.05;
let sphereRotationSpeedY = Math.random() * 0.05;

let sphereMovementSpeedX = Math.random() * 0.05;
let sphereMovementSpeedY = Math.random() * 0.05;

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Rotar el cubo (sin movimiento)
    cube.rotation.x += cubeRotationSpeedX;
    cube.rotation.y += cubeRotationSpeedY;

    // Rotar y mover la esfera
    sphere.rotation.x += sphereRotationSpeedX;
    sphere.rotation.y += sphereRotationSpeedY;
    sphere.position.x += Math.sin(sphere.rotation.x) * 0.01;
    sphere.position.y += Math.cos(sphere.rotation.y) * 0.01;

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
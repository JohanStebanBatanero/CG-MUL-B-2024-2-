const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );

// Genera un número aleatorio entre 1 y 5 para determinar el número de cubos
const numCubes = Math.floor(Math.random() * 5) + 1;

// Calcula la posición inicial para centrar los cubos
const initialPosition = -((numCubes - 1) * 2) / 2;

for (let i = 0; i < numCubes; i++) {
  const material = new THREE.MeshBasicMaterial( { visible: false } );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.x = initialPosition + (i * 2); // Establece la posición x de cada cubo
  scene.add( cube );

  const wireframeGeometry = new THREE.WireframeGeometry( geometry );
  const wireframeMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
  const wireframeCube = new THREE.LineSegments( wireframeGeometry, wireframeMaterial );
  cube.add( wireframeCube ); // Agrega la malla como hijo del cubo
}

camera.position.z = 5;

function animate () {
  for (let i = 0; i < numCubes; i++) {
    const cube = scene.children[i];
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  renderer.render( scene, camera );
}
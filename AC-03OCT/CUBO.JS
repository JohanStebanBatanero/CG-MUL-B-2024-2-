const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { 
  transparent: true, 
  opacity: 0 
} ); // Make the cube invisible
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const wireframeGeometry = new THREE.WireframeGeometry( geometry );
const wireframeMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } ); // Set wireframe color to white
const wireframeCube = new THREE.LineSegments( wireframeGeometry, wireframeMaterial );
cube.add( wireframeCube ); 

camera.position.z = 5;

function animate () {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
}
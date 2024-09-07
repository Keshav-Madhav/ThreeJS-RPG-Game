import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

const gui = new GUI();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );

const sun = new THREE.DirectionalLight();
sun.position.set( 1, 2, 3 );
scene.add( sun );

const ambientLight = new THREE.AmbientLight();
ambientLight.intensity = 0.5;
scene.add( ambientLight );

const geometry = new THREE.BoxGeometry( 1, 2, 3 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const stats = new Stats();
document.body.appendChild( stats.dom );

camera.position.z = 5;
controls.update();

function animate() {
	stats.update();
	controls.update();
	renderer.render( scene, camera );
}

window.addEventListener( 'resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
})

const folder = gui.addFolder('Cube')
folder.add(cube.position, 'x', -10, 10).name('position x');
folder.add(cube.position, 'y', -10, 10).name('position y');
folder.add(cube.position, 'z', -10, 10).name('position z');
folder.addColor(material, 'color').name('color');
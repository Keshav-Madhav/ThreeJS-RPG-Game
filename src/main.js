import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { World } from './terrain';
import { HumanPlayer } from './players/HumanPlayer';

const gui = new GUI();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(5, 0, 5);
camera.position.set(0, 2, 0);
controls.update();

const world = new World(10, 10);
scene.add(world);

const player = new HumanPlayer(new THREE.Vector3(1, 0, 5), camera, world);
scene.add(player);

const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set( 1, 2, 3 );
scene.add( sun );

const ambientLight = new THREE.AmbientLight();
ambientLight.intensity = 0.5;
scene.add( ambientLight );

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

const worldFolder = gui.addFolder('World');
worldFolder.add(world, 'width', 1, 100, 1).name('Width');
worldFolder.add(world, 'height', 1, 100, 1).name('Height');
worldFolder.add(world, 'treeCount', 0, 60, 1).name('Tree Count');
worldFolder.add(world, 'bushCount', 0, 30, 1).name('Bush Count');
worldFolder.add(world, 'rockCount', 0, 30, 1).name('Rock Count');
worldFolder.add(world, 'boulderCount',0, 10, 1).name('Boulder Count');
worldFolder.add(world, 'generate').name('Generate');

const action = await player.requestAction();
if( await action.canPerform()) {
	await action.perform();
}
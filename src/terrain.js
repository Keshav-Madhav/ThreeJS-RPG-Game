import * as THREE from 'three';
import { Bush } from './objects/Bush';
import { GameObject } from './objects/GameObject';
import { Boulder } from './objects/Boulder';
import { Rock } from './objects/Rock';
import { Tree } from './objects/Tree';
import { getKey } from '../utils';

const textureLoader = new THREE.TextureLoader();
const gridTexture = textureLoader.load('grid.png');

export class World extends THREE.Group {
  #objectMap = new Map();
  constructor(width, height){
    super();

    this.width = width;
    this.height = height;
    this.treeCount = 15;
    this.bushCount = 8;
    this.rockCount = 8;
    this.boulderCount = 4;

    this.trees = new THREE.Group();
    this.bushes = new THREE.Group();
    this.rocks = new THREE.Group();
    this.boulders = new THREE.Group();
    this.path = new THREE.Group();
  
    this.add(this.trees, this.bushes, this.rocks, this.boulders, this.path);

    this.generate();
  }

  getObject(coords){
    return this.#objectMap.get(getKey(coords)) ?? null;
  }

  generate(){
    this.clear();

    this.createTerrain();
    this.createTrees();
    this.createBushes();
    this.createRocks();
    this.createBoulders();
  }

  clear(){
    if(this.terrainMesh){
      this.terrainMesh.geometry.dispose();
      this.terrainMesh.material.dispose();
      this.remove(this.terrainMesh);
    }
    this.trees.clear();
    this.bushes.clear();
    this.rocks.clear();
    this.boulders.clear();
    this.#objectMap.clear();
  }

  createTerrain(){
    gridTexture.repeat = new THREE.Vector2(this.width, this.height);
    gridTexture.wrapS = THREE.RepeatWrapping;
    gridTexture.wrapT = THREE.RepeatWrapping;
    gridTexture.colorSpace = THREE.SRGBColorSpace;
    
    const terrainMaterial = new THREE.MeshStandardMaterial({ 
      map: gridTexture,
      side: THREE.DoubleSide,
    });
    const terrainGeometry = new THREE.PlaneGeometry(
      this.width, 
      this.height, 
      this.width, 
      this.height
    );
    this.terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);

    this.terrainMesh.rotation.x = -Math.PI / 2;
    this.terrainMesh.position.set(this.width / 2, 0, this.height / 2);

    this.add(this.terrainMesh);
  }

  createTrees(){
    for(let i = 0; i< this.treeCount; i++){
      const coords = new THREE.Vector3(
        Math.floor(Math.random() * this.width),
        0,
        Math.floor(Math.random() * this.height)
      );
      
      const tree = new Tree(coords);

      this.addObject(tree, coords, this.trees);
    }
  }

  createRocks(){
    for(let i = 0; i< this.rockCount; i++){
      const coords = new THREE.Vector3(
        Math.floor(Math.random() * this.width),
        0, 
        Math.floor(Math.random() * this.height)
      );
      
      const rock = new Rock(coords);
      this.addObject(rock, coords, this.rocks);
    }
  }

  createBoulders(){
    for(let i = 0; i< this.boulderCount; i++){
      const coords = new THREE.Vector3(
        Math.floor(Math.random() * this.width),
        0,
        Math.floor(Math.random() * this.height)
      );
      
      const boulder = new Boulder(coords);
      this.addObject(boulder, coords, this.boulders)
    }
  }

  createBushes(){
    for(let i = 0; i< this.bushCount; i++){
      const coords = new THREE.Vector3(
        Math.floor(Math.random() * this.width),
        0,
        Math.floor(Math.random() * this.height) 
      );

      const bush = new Bush(coords);
      this.addObject(bush, coords, this.bushes);
    }
  }

  /**
   * @param {GameObject} object
   * @param {THREE.Vector3} coords
   * @param {THREE.Group} group
   */
  addObject(object, coords, group){
    // Check if there is already an object at the current position
    if(this.#objectMap.has(getKey(coords))) return false;

    group.add(object);
    this.#objectMap.set(getKey(coords), object);

    return true;
  }
}
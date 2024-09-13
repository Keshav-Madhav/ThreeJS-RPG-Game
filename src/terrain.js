import * as THREE from 'three';

export class World extends THREE.Mesh {
  #objectMap = new Map();

  constructor(width, height){
    super();

    this.width = width;
    this.height = height;
    this.treeCount = 20;
    this.bushCount = 10;
    this.rockCount = 10;
    this.boulderCount = 3;

    this.trees = new THREE.Group();
    this.bushes = new THREE.Group();
    this.rocks = new THREE.Group();
    this.boulders = new THREE.Group();
    this.add(this.trees, this.bushes, this.rocks, this.boulders);

    this.generate();
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

    if(this.trees){
      this.trees.children.forEach(tree => {
        tree.geometry?.dispose();
        tree.material?.dispose();
      });
      this.trees.clear();
    }

    if(this.bushes){
      this.bushes.children.forEach(bush => {
        bush.geometry?.dispose();
        bush.material?.dispose();
      });
      this.bushes.clear();
    }

    if(this.rocks){
      this.rocks.children.forEach(rock => {
        rock.geometry?.dispose();
        rock.material?.dispose();
      });
      this.rocks.clear();
    }

    if(this.boulders){
      this.boulders.children.forEach(boulder => {
        boulder.geometry?.dispose();
        boulder.material?.dispose();
      });
      this.boulders.clear();
    }

    this.#objectMap.clear();
  }

  createTerrain(){
    const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0x50a000 });
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
    const treeHeight = 1;
    const treeRadius = 0.2;
    const treeGoemetry = new THREE.ConeGeometry(treeRadius, treeHeight, 8);
    const treeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x408015,
      flatShading: true,
    });

    for(let i = 0; i< this.treeCount; i++){
      const treeMesh = new THREE.Mesh(treeGoemetry, treeMaterial);
      const coords = new THREE.Vector2(
        Math.floor(Math.random() * this.width),
        Math.floor(Math.random() * this.height)
      );

      // Check if there is already an object at the current position
      if(this.#objectMap.has(`${coords.x},${coords.y}`)) continue;

      treeMesh.position.set(
        coords.x + 0.5,
        treeHeight / 2 - Math.random() * 0.2,
        coords.y + 0.5
      );

      this.trees.add(treeMesh);
      this.#objectMap.set(`${coords.x},${coords.y}`, treeMesh);
    }
  }

  createRocks(){
    const minRockRadius = 0.1;
    const maxRockRadius = 0.3;
    const minRockHeight = 0.5;
    const maxRockHeight = 0.8;
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0xb0b0b0, flatShading: true });

    for(let i = 0; i< this.rockCount; i++){
      const radius = minRockRadius +( Math.random() * (maxRockRadius - minRockRadius));
      const height = minRockHeight + (Math.random() * (maxRockHeight - minRockHeight));
      const rockGeometry = new THREE.SphereGeometry(radius, 6, 5);
      const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);
      const coords = new THREE.Vector2(
        Math.floor(Math.random() * this.width),
        Math.floor(Math.random() * this.height)
      );

      // Check if there is already an object at the current position
      if(this.#objectMap.has(`${coords.x},${coords.y}`)) continue;

      rockMesh.position.set(
        coords.x  + 0.5,
        0,
        coords.y  + 0.5
      )

      rockMesh.scale.y = height;
      this.rocks.add(rockMesh)
      this.#objectMap.set(`${coords.x},${coords.y}`, rockMesh);
    }
  }

  createBoulders(){
    const minBoulderRadius = 0.4;
    const maxBoulderRadius = 0.55;
    const minBouldHeight = 0.5;
    const maxBoulderHeight = 0.8;
    const boulderMaterial = new THREE.MeshStandardMaterial({ color: 0x606060, flatShading: true }); 
    
    for(let i = 0; i< this.boulderCount; i++){
      const radius = minBoulderRadius + (Math.random() * (maxBoulderRadius - minBoulderRadius));
      const height = minBouldHeight + (Math.random() * (maxBoulderHeight - minBouldHeight));
      const boulderGeometry = new THREE.IcosahedronGeometry(radius, 0);
      const boulderMesh = new THREE.Mesh(boulderGeometry, boulderMaterial);
      const coords = new THREE.Vector2(
        Math.floor(Math.random() * this.width),
        Math.floor(Math.random() * this.height)
      );

      // Check if there is already an object at the current position
      if(this.#objectMap.has(`${coords.x},${coords.y}`)) continue;

      boulderMesh.position.set(
        coords.x + 0.5,
        0,
        coords.y + 0.5
      )

      boulderMesh.scale.y = height;
      this.boulders.add(boulderMesh);
      this.#objectMap.set(`${coords.x},${coords.y}`, boulderMesh);
    }
  }

  
  createBushes(){
    const minBushRadius = 0.1;
    const maxBushRadius = 0.2;
    const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x204010, flatShading: true });

    for(let i = 0; i< this.bushCount; i++){
      const radius = minBushRadius + (Math.random() * (maxBushRadius - minBushRadius));
      const bushGeometry = new THREE.SphereGeometry(radius, 6, 5);
      const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial);
      const coords = new THREE.Vector2(
        Math.floor(Math.random() * this.width),
        Math.floor(Math.random() * this.height) 
      );

      // Check if there is already an object at the current position
      if(this.#objectMap.has(`${coords.x},${coords.y}`)) continue;

      bushMesh.position.set(
        coords.x + 0.5,
        radius/2,
        coords.y + 0.5
      )

      this.bushes.add(bushMesh);
      this.#objectMap.set(`${coords.x},${coords.y}`, bushMesh);
    }
  }
}
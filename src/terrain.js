import * as THREE from 'three';

export class Terrain extends THREE.Mesh {
  constructor(width, height){
    super();

    this.width = width;
    this.height = height;
    this.treeCount = 20;
    this.bushCount = 10;
    this.rockCount = 10;
    this.boulderCount = 3;

    this.createTerrain();
    this.createTrees();
    this.createBushes();
    this.createRocks();
    this.createBoulders();
  }

  createTerrain(){
    if(this.terrainMesh){
      this.terrainMesh.geometry.dispose();
      this.terrainMesh.material.dispose();
      this.remove(this.terrainMesh);
    }

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
    if(this.trees){
      this.remove(this.trees);
    }

    const treeHeight = 1;
    const treeRadius = 0.2;
    
    const treeGoemetry = new THREE.ConeGeometry(treeRadius, treeHeight, 8);
    const treeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x408015,
      flatShading: true,
    });

    this.trees = new THREE.Group();
    this.add(this.trees);

    for(let i = 0; i< this.treeCount; i++){
      const treeMesh = new THREE.Mesh(treeGoemetry, treeMaterial);

      treeMesh.position.set(
        Math.floor(Math.random() * this.width) + 0.5,
        treeHeight / 2 - Math.random() * 0.2,
        Math.floor(Math.random() * this.height) + 0.5,
      );

      this.trees.add(treeMesh);
    }
  }

  createRocks(){
    const minRockRadius = 0.1;
    const maxRockRadius = 0.3;
    const minRockHeight = 0.5;
    const maxRockHeight = 0.8;
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0xb0b0b0, flatShading: true });
    
    this.rocks = new THREE.Group();
    this.add(this.rocks);
    
    for(let i = 0; i< this.rockCount; i++){
      const radius = minRockRadius +( Math.random() * (maxRockRadius - minRockRadius));
      const height = minRockHeight + (Math.random() * (maxRockHeight - minRockHeight));
      const rockGeometry = new THREE.SphereGeometry(radius, 6, 5);
      const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);

      rockMesh.position.set(
        Math.floor(Math.random() * this.width) + 0.5,
        0,
        Math.floor(Math.random() * this.height) + 0.
      )

      rockMesh.scale.y = height;

      this.rocks.add(rockMesh)
    }
  }

  createBoulders(){
    const minBoulderRadius = 0.4;
    const maxBoulderRadius = 0.55;
    const minBouldHeight = 0.5;
    const maxBoulderHeight = 0.8;
    const boulderMaterial = new THREE.MeshStandardMaterial({ color: 0x606060, flatShading: true }); 

    this.boulders = new THREE.Group();
    this.add(this.boulders);
    
    for(let i = 0; i< this.boulderCount; i++){
      const radius = minBoulderRadius + (Math.random() * (maxBoulderRadius - minBoulderRadius));
      const height = minBouldHeight + (Math.random() * (maxBoulderHeight - minBouldHeight));
      const boulderGeometry = new THREE.IcosahedronGeometry(radius, 0);
      const boulderMesh = new THREE.Mesh(boulderGeometry, boulderMaterial);

      boulderMesh.position.set(
        Math.floor(Math.random() * this.width) + 0.5,
        0,
        Math.floor(Math.random() * this.height) + 0.5
      )

      boulderMesh.scale.y = height;

      this.boulders.add(boulderMesh);
    }
  }

  createBushes(){
    const minBushRadius = 0.1;
    const maxBushRadius = 0.2;
    const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x204010, flatShading: true });

    this.bushes = new THREE.Group();
    this.add(this.bushes);

    for(let i = 0; i< this.bushCount; i++){
      const radius = minBushRadius + (Math.random() * (maxBushRadius - minBushRadius));
      const bushGeometry = new THREE.SphereGeometry(radius, 6, 5);
      const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial);

      bushMesh.position.set(
        Math.floor(Math.random() * this.width) + 0.5,
        radius/2,
        Math.floor(Math.random() * this.height) + 0.5
      )

      this.bushes.add(bushMesh);
    }
  }
}
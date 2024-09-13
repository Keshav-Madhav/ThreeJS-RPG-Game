import * as THREE from 'three';

export class Terrain extends THREE.Mesh {
  constructor(width, height){
    super();

    this.width = width;
    this.height = height;
    this.treeCount = 20;

    this.createTerrain();
    this.createTrees();
  }

  createTerrain(){
    if(this.terrainMesh){
      this.terrainMesh.geometry.dispose();
      this.terrainMesh.material.dispose();
      this.remove(this.terrainMesh);
    }

    const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0x50a000, wireframe: true });
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
      color: 0x305010,
      flatShading: true,
    });

    this.trees = new THREE.Group();
    this.add(this.trees);

    for(let i = 0; i< this.treeCount; i++){
      const treeMesh = new THREE.Mesh(treeGoemetry, treeMaterial);

      treeMesh.position.set(
        Math.floor(Math.random() * this.width) + 0.5,
        treeHeight / 2 - Math.random() * 0.4,
        Math.floor(Math.random() * this.height) + 0.5,
      );

      this.trees.add(treeMesh);
    }
  }
}
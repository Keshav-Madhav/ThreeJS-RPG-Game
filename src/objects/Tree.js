import * as THREE from 'three';
import { GameObject } from './GameObject';

const treeGoemetry = new THREE.ConeGeometry(0.2, 1, 8);
const treeMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x408015,
  flatShading: true,
});

export class Tree extends GameObject{
  /**
   * @param {THREE.Vector3} coords
  */
  constructor(coords){
    super(coords, treeGoemetry, treeMaterial);
    
    this.name = `Tree (${coords.x},${coords.z})`;

    this.position.set(
      coords.x + 0.5,
      coords.y + 0.5 - Math.random() * 0.2,
      coords.z + 0.5
    );
  }
}
import * as THREE from 'three';
import { GameObject } from './GameObject';

const boulderMaterial = new THREE.MeshStandardMaterial({ color: 0x606060, flatShading: true }); 
const boulderGeometry = new THREE.IcosahedronGeometry(1, 0);

export class Boulder extends GameObject{
  minBoulderRadius = 0.4;
  maxBoulderRadius = 0.55;
  minBouldHeight = 0.5;
  maxBoulderHeight = 0.8;

  /**
   * @param {THREE.Vector3} coords
  */
  constructor(coords){
    super(coords, boulderGeometry, boulderMaterial);

    this.name = `Boulder (${coords.x},${coords.y})`;
    const radius = this.minBoulderRadius + (Math.random() * (this.maxBoulderRadius - this.minBoulderRadius));
    const height = this.minBouldHeight + (Math.random() * (this.maxBoulderHeight - this.minBouldHeight));

    this.scale.set(radius, radius * height, radius);

    this.position.set(
      coords.x + 0.5,
      coords.y,
      coords.z + 0.5
    )
  }
}
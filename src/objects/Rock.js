import * as THREE from 'three';
import { GameObject } from './GameObject';

const rockMaterial = new THREE.MeshStandardMaterial({ color: 0xb0b0b0, flatShading: true });
const rockGeometry = new THREE.SphereGeometry(1, 6, 5);

export class Rock extends GameObject{
  minRockRadius = 0.1;
  maxRockRadius = 0.3;
  minRockHeight = 0.5;
  maxRockHeight = 0.8;

  /**
   * @param {THREE.Vector3} coords
  */
  constructor(coords){
    super(coords, rockGeometry, rockMaterial);

    this.name = `Rock (${coords.x},${coords.z})`;
    
    const radius = this.minRockRadius +( Math.random() * (this.maxRockRadius - this.minRockRadius));
    const height = this.minRockHeight + (Math.random() * (this.maxRockHeight - this.minRockHeight));

    this.scale.set(radius, radius * height, radius);

    this.position.set(
      coords.x + 0.5,
      coords.y + 0,
      coords.z + 0.5
    )
  }
}
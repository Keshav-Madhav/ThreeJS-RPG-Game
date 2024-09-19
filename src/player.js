import * as THREE from 'three';

export class Player extends THREE.Mesh {
  constructor(){
    super();

    this.geometry = new THREE.CapsuleGeometry(0.15, 0.3);
    this.material = new THREE.MeshStandardMaterial({ color: 0x4040c0 });
    this.position.set(5.5, 0.3, 5.5);
  }
}
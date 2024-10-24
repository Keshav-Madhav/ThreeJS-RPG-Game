import * as THREE from 'three';
import { GameObject } from '../objects/GameObject';

const playerGeometry = new THREE.CapsuleGeometry(0.15, 0.3);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x4040c0 });

export class Player extends GameObject {
  name = 'player'

  constructor(coords, camera, world){
    super(coords, playerGeometry, playerMaterial);

    this.moveTo(coords);

    this.camera = camera;
    this.world = world;
  }

  async getTargetSquare(){
    return null;
  }

  async getTargetObject(){
    return null;
  }

  async requestAction(){
    return null
  }
}

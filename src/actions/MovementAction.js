import * as THREE from 'three';
import { Action } from "./Action";
import { search } from "../path_finding";

export class MovementAction extends Action {
  name = 'MovementAction';
  path = []
  pathIndex = 0;
  pathUpdater = null;

  constructor(source, world) {
    super(source);
    this.world = world;
  }

  async perform() {   
    return new Promise((resolve) => {
      function updatePosition(){
        if(this.pathIndex === this.path.length){
          clearInterval(this.pathUpdater);
          // Clear existing path
          this.world.path.clear();
          resolve();
        } else {
          const curr = this.path[this.pathIndex];
          this.source.moveTo(curr);
          this.pathIndex++;
        }
      }
      
      clearInterval(this.pathUpdater);
      
      this.drawPathLine(this.path);
      
      this.pathIndex = 0;
      this.pathUpdater = setInterval(updatePosition.bind(this), 200);
    });
  }

  async canPerform() {
    const selectedCoordinates = await this.source.getTargetSquare();

    this.path = search(this.source.coords, selectedCoordinates, this.world);

    return (this.path !== null && this.path.length > 0);
  }

  drawPathLine(path) {
    path.unshift(new THREE.Vector3(Math.floor(this.source.position.x), 0, Math.floor(this.source.position.z)));

    const points = path.map(coord => new THREE.Vector3(coord.x + 0.5, 0.1, coord.z + 0.5));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x40c040, linewidth: 2 });
    const line = new THREE.Line(geometry, material);

    this.world.path.add(line);
  }
}
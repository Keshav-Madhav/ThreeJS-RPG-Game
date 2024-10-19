import * as THREE from 'three';
import { search } from './path_finding';

export class Player extends THREE.Mesh {
  raycaster = new THREE.Raycaster();

  path = []
  pathIndex = 0;
  pathUpdater = null;

  constructor(camera, world){
    super();

    this.geometry = new THREE.CapsuleGeometry(0.15, 0.3);
    this.material = new THREE.MeshStandardMaterial({ color: 0x4040c0 });
    this.position.set(0.5, 0.3, 0.5);

    this.camera = camera;
    this.world = world;
    window.addEventListener('mousedown', this.onMousedown.bind(this));
  }

  onMousedown (event){
    const cursorX = (event.clientX / window.innerWidth) * 2 - 1;
    const cursorY = -(event.clientY / window.innerHeight) * 2 + 1;
    const coords = new THREE.Vector2(cursorX, cursorY);
    this.raycaster.setFromCamera(coords, this.camera);

    const intersects = this.raycaster.intersectObject(this.world.terrainMesh);

    if(intersects.length > 0){
      const { point } = intersects[0];
      const x = Math.floor(point.x);
      const z = Math.floor(point.z);

      const playerx = Math.floor(this.position.x);
      const playery = Math.floor(this.position.y);
      const playerz = Math.floor(this.position.z);

      clearInterval(this.pathUpdater);

      this.path = search(new THREE.Vector3(playerx, playery, playerz), new THREE.Vector3(x, 0, z), this.world);

      this.world.path.clear();

      if(this.path){
        this.drawPathLine(this.path);

        this.pathIndex = 0;
        this.pathUpdater = setInterval(this.updatePosition.bind(this), 200);
      }
    }
  }

  drawPathLine(path) {
    // Clear existing path
    this.world.path.clear();

    path.unshift(new THREE.Vector3(Math.floor(this.position.x), 0, Math.floor(this.position.z)));

    const points = path.map(coord => new THREE.Vector3(coord.x + 0.5, 0.1, coord.z + 0.5));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x40c040, linewidth: 2 });
    const line = new THREE.Line(geometry, material);

    this.world.path.add(line);
  }

  updatePosition(){
    if(this.pathIndex === this.path.length){
      clearInterval(this.pathUpdater);
      return;
    }

    const curr = this.path[this.pathIndex];
    this.position.set(curr.x + 0.5, 0.3, curr.z + 0.5);
    this.pathIndex++;
  }
}

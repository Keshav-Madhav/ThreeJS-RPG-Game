import * as THREE from 'three';
import { Player } from './Player';
import { MovementAction } from '../actions/MovementAction';

export class HumanPlayer extends Player {
  name = 'HumanPlayer';

  raycaster = new THREE.Raycaster();
  path = []
  pathIndex = 0;
  pathUpdater = null;

  async getTargetSquare(){
    return new Promise((resolve) => {
      function onMousedown(event) {
        const cursorX = (event.clientX / window.innerWidth) * 2 - 1;
        const cursorY = -(event.clientY / window.innerHeight) * 2 + 1;
        const coords = new THREE.Vector2(cursorX, cursorY);
        this.raycaster.setFromCamera(coords, this.camera);
    
        const intersects = this.raycaster.intersectObject(this.world.terrainMesh);
    
        if(intersects.length > 0){
          const { point } = intersects[0];

          const selectedCoords = new THREE.Vector3(Math.floor(point.x), 0, Math.floor(point.z));

          window.removeEventListener('mousedown', onMouseDownBinder);
          resolve(selectedCoords);
        }
      }

      const onMouseDownBinder = onMousedown.bind(this);

      window.addEventListener('mousedown', onMouseDownBinder);
    })
  }

  async getTargetObject(){
    return null;
  }

  async requestAction(){
    const selectedAction = new MovementAction(this, this.world);

    console.log(`Player ${this.name} requested action:`, selectedAction);

    return selectedAction;
  }
}

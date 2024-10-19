import * as THREE from 'three';
import { getKey } from '../utils';

export function search(start, end, world){
  // const o = world.getObject(start);
  if(start.equals(end)) return []

  const maxDistance = 20;
  const cameFrom = new Map();
  const cost = new Map();
  cost.set(getKey(start), 0);
  const frontier = [start];
  let found = false;

  while(frontier.length > 0){
    frontier.sort((v1, v2) => {
      const g1 = start.manhattanDistanceTo(v1);
      const g2 = start.manhattanDistanceTo(v2);

      const h1 = v1.manhattanDistanceTo(end);
      const h2 = v2.manhattanDistanceTo(end);

      const d1 = g1 + h1;
      const d2 = g2 + h2;

      return d1 - d2;
    })

    const candidate = frontier.shift();

    if(candidate.equals(end)){
      found = true;
      break;
    }
    // if(candidate.manhattanDistanceTo(start) > maxDistance){
    //   continue;
    // }

    const neighbors = getNeighbors(candidate, world, cost);
    frontier.push(...neighbors);

    neighbors.forEach(neighbor => {
      cameFrom.set(getKey(neighbor), candidate);
    });
  }

  if (!found) return null;

  let curr = end;
  const path = [curr]

  while (getKey(curr) !== getKey(start)){
    const prev = cameFrom.get(getKey(curr));
    path.push(prev);
    curr = prev;
  }

  path.reverse();
  path.shift();

  return path;
}

function getNeighbors(coords, world, cost){
  let neighbors = [];
  if(coords.x > 0){
    neighbors.push(new THREE.Vector3(coords.x - 1, 0, coords.z));
  }

  if(coords.x < world.width - 1){
    neighbors.push(new THREE.Vector3(coords.x + 1, 0, coords.z));
  }

  if(coords.z > 0){
    neighbors.push(new THREE.Vector3(coords.x, 0, coords.z - 1));
  }

  if(coords.z < world.height - 1){
    neighbors.push(new THREE.Vector3(coords.x, 0, coords.z + 1));
  }

  const newCost = cost.get(getKey(coords)) + 1;

  neighbors = neighbors.filter(neighbor => {
    let isCheaper = false
    if(!cost.has(getKey(neighbor)) || newCost < cost.get(getKey(neighbor))){
      cost.set(getKey(neighbor), newCost);
      isCheaper = true;
    }

    return isCheaper && !world.getObject(neighbor);
  });

  return neighbors;
}
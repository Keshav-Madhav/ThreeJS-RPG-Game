import * as THREE from 'three';

export function search(start, end, world){
  // const o = world.getObject(start);
  if(start.x === end.x && start.y === end.y) return []

  const maxDistance = 20;
  const cameFrom = new Map();
  const visited = new Set();
  const frontier = [start];
  let found = false;

  while(frontier.length > 0){
    frontier.sort((v1, v2) => {
      const d1 = start.manhattanDistanceTo(v1);
      const d2 = start.manhattanDistanceTo(v2);

      return d1 - d2;
    })

    const candidate = frontier.shift();
    if(candidate.x === end.x && candidate.y === end.y){
      found = true;
      break;
    }
    if(candidate.manhattanDistanceTo(start) > maxDistance){
      continue;
    }

    visited.add(`${candidate.x},${candidate.y}`);

    const neighbors = getNeighbors(candidate, world, visited);
    frontier.push(...neighbors);

    neighbors.forEach(neighbor => {
      cameFrom.set(`${neighbor.x},${neighbor.y}`, candidate);
    });
  }

  if (!found) return null;

  let curr = end;
  const path = [curr]

  while (`${curr.x},${curr.y}` !== `${start.x},${start.y}`){
    const prev = cameFrom.get(`${curr.x},${curr.y}`);
    path.push(prev);
    curr = prev;
  }

  path.reverse();
  path.shift();

  return path;
}

function getNeighbors(coords, world, visited){
  let neighbors = [];
  if(coords.x > 0){
    neighbors.push(new THREE.Vector2(coords.x - 1, coords.y));
  }

  if(coords.x < world.width - 1){
    neighbors.push(new THREE.Vector2(coords.x + 1, coords.y));
  }

  if(coords.y > 0){
    neighbors.push(new THREE.Vector2(coords.x, coords.y - 1));
  }

  if(coords.y < world.height - 1){
    neighbors.push(new THREE.Vector2(coords.x, coords.y + 1));
  }

  neighbors = neighbors.filter(neighbor => {
    return !visited.has(`${neighbor.x},${neighbor.y}`) && !world.getObject(neighbor);
  });

  return neighbors;
}
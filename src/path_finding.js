import * as THREE from 'three';

export function search(start, end, world){
  // const o = world.getObject(start);
  if(start.x === end.x && start.y === end.y) return []

  const maxDistance = 20;
  const visited = new Set();
  const frontier = [start];

  while(frontier.length > 0){
    frontier.sort((v1, v2) => {
      const d1 = start.manhattanDistanceTo(v1);
      const d2 = start.manhattanDistanceTo(v2);

      return d1 - d2;
    })

    const candidate = frontier.shift();
    console.log(candidate)

    if(candidate.x === end.x && candidate.y === end.y){
      console.log('Found the end');
      break;
    }
    if(candidate.manhattanDistanceTo(start) > maxDistance){
      continue;
    }

    visited.add(`${candidate.x},${candidate.y}`);

    const neighbors = getNeighbors(candidate, world, visited);
    frontier.push(...neighbors);
  }
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
    return !visited.has(`${neighbor.x},${neighbor.y}`);
  });

  return neighbors;
}
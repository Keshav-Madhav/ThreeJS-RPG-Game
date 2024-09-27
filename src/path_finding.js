import * as THREE from 'three';

export function search(start, end, world){
  // const o = world.getObject(start);
  if(start.x === end.x && start.y === end.y) return []

  const maxDistance = 20;
  const cameFrom = new Map();
  const cost = new Map();
  cost.set(`${start.x},${start.y}`, 0);
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

    if(candidate.x === end.x && candidate.y === end.y){
      found = true;
      break;
    }
    // if(candidate.manhattanDistanceTo(start) > maxDistance){
    //   continue;
    // }

    const neighbors = getNeighbors(candidate, world, cost);
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

function getNeighbors(coords, world, cost){
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

  const newCost = cost.get(`${coords.x},${coords.y}`) + 1;

  neighbors = neighbors.filter(neighbor => {
    let isCheaper = false
    if(!cost.has(`${neighbor.x},${neighbor.y}`) || newCost < cost.get(`${neighbor.x},${neighbor.y}`)){
      cost.set(`${neighbor.x},${neighbor.y}`, newCost);
      isCheaper = true;
    }

    return isCheaper && !world.getObject(neighbor);
  });

  return neighbors;
}
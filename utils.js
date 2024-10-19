import * as THREE from 'three';

/**
 * @param {THREE.Vector3} coords
 * @returns
 */
export const getKey = (coords) => {
  return `${coords.x},${coords.y},${coords.z}`;
};
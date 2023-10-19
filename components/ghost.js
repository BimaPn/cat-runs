import { 
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty
  } from "./updateCustomProperties.js"

const SPEED = 0.05;
const GHOST_INTERVAL_MIN = 1200;
const GHOST_INTERVAL_MAX = 2500;
const worldElement = document.querySelector("[data-world]");

let nextGhostTime;

export const setupGhost = () => {
  nextGhostTime = GHOST_INTERVAL_MIN;
  document.querySelectorAll("[data-ghost]").forEach(ghost => {
    ghost.remove();
  });
}

export const updateGhost = (delta,speedScale) => {
  document.querySelectorAll("[data-ghost]").forEach(ghost => {
    incrementCustomProperty(ghost,"--left",delta * speedScale * SPEED * -1);
    if(getCustomProperty(ghost,"--left") <= -100) {
      ghost.remove();
    }
  });
  
  if(nextGhostTime <= 0) {
    createGhost();
    nextGhostTime = randomNumberBetween(GHOST_INTERVAL_MIN,GHOST_INTERVAL_MAX) / speedScale;
  }
  nextGhostTime -= delta;
}
export const getGhostRects = () => {
  return [...document.querySelectorAll("[data-ghost]")].map(ghost => {
    return ghost.getBoundingClientRect();
  });
}
function createGhost () {
  const ghost = document.createElement("img");
  ghost.dataset.ghost = true;
  ghost.src = "images/ghost.png";
  ghost.classList.add("ghost");
  setCustomProperty(ghost,"--left",100);
  worldElement.append(ghost);
}
function randomNumberBetween(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

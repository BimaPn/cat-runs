import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty
  } from "./updateCustomProperties.js"
const SPEED = 0.05;
export const groundElement = document.querySelectorAll("[data-ground]");

export const setupGround = () => {
  setCustomProperty(groundElement[0],"--left",0);
  setCustomProperty(groundElement[1],"--left",100);
  groundElement.forEach(ground => {
    ground.src = "/images/background/background1/ground.png";
  });
}

export const updateGround = (delta, speedScale,scores) => {
  groundElement.forEach(ground => {
    incrementCustomProperty(ground,"--left",delta * speedScale * SPEED * -1);
    if(getCustomProperty(ground,"--left") <= -100) {
      incrementCustomProperty(ground,"--left",200);
    }
  });
}


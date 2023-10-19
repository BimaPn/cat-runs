import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty
  } from "./updateCustomProperties.js"

const SPEED = 0.03;
const backGround3Element = document.querySelectorAll("[data-background3]");

export const setupBackGround3 = () => {
  setCustomProperty(backGround3Element[0],"--left",0);
  setCustomProperty(backGround3Element[1],"--left",100);
}

export const updateBackGround3 = (delta, speedScale) => {
  backGround3Element.forEach(backGround => {
    incrementCustomProperty(backGround,"--left",delta * speedScale * SPEED * -1);
    if(getCustomProperty(backGround,"--left") <= -100) {
      incrementCustomProperty(backGround,"--left",200);
    }
  })
}


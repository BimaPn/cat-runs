import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty
  } from "./updateCustomProperties.js"

const SPEED = 0.02;
const backGround2Element = document.querySelectorAll("[data-background2]");

export const setupBackGround2 = () => {
  setCustomProperty(backGround2Element[0],"--left",0);
  setCustomProperty(backGround2Element[1],"--left",100);
}

export const updateBackGround2 = (delta, speedScale) => {
  backGround2Element.forEach(backGround => {
    incrementCustomProperty(backGround,"--left",delta * speedScale * SPEED * -1);
    if(getCustomProperty(backGround,"--left") <= -100) {
      incrementCustomProperty(backGround,"--left",200);
    }
  })
}


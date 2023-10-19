import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty
  } from "./updateCustomProperties.js"

import { groundElement } from "./groud.js";
import { firstLevelSound,transitionSound,finalLevelSound } from "./sounds.js";

finalLevelSound.loop = true;

const SPEED_BG1 = 0.006;
const SPEED_BG2 = 0.02;
const SPEED_BG3 = 0.03;

export const STAGE_2 = 50;
export const STAGE_3 = 120;
export const STAGE_4 = 200;
let currentStage = "background1";
// const backGroundElement0 = document.querySelector("[data-background0]")
const backGroundElement1 = document.querySelectorAll("[data-background1]");
const backGroundElement2 = document.querySelectorAll("[data-background2]");
const backGroundElement3 = document.querySelectorAll("[data-background3]");

export const setupBackGround = () => {
  for(let i = 0;i < 2;i++) {
    setCustomProperty(backGroundElement1[i],"--left",i*100);
    setCustomProperty(backGroundElement2[i],"--left",i*100);
    setCustomProperty(backGroundElement3[i],"--left",i*100);
    backGroundElement1[i].src = "images/background/background1/background1.png";
    backGroundElement2[i].src = "images/background/background1/background2.png";
    backGroundElement3[i].src = "images/background/background1/background3.png";
    currentStage = "background1";
  }
}

let isChange = false;
export const updateBackGround = (delta, speedScale,scores) => {
  if((scores >= STAGE_2 && scores < STAGE_3) && currentStage !== "background2") {
    currentStage = "background2";
    transitionSound.play();
    isChange = true;
  }else if((scores >= STAGE_3 && scores < STAGE_4) && currentStage !== "background3"){
    currentStage = "background3";
    transitionSound.play();
    isChange = true;
  }else if(scores >= STAGE_4 && currentStage !== "background4"){
    currentStage = "background4";
    transitionSound.play();
    firstLevelSound.pause();
    finalLevelSound.play();
    isChange = true;
  }

  if(isChange) {
    updateBackgroundImages(groundElement,"ground");
    updateBackgroundImages(backGroundElement1,"background1");
    updateBackgroundImages(backGroundElement2,"background2");
    updateBackgroundImages(backGroundElement3,"background3");
    isChange = false;
  }

  backGroundElement1.forEach(backGround => {
    incrementCustomProperty(backGround,"--left",delta * speedScale * SPEED_BG1 * -1);
    if(getCustomProperty(backGround,"--left") <= -100) {
      incrementCustomProperty(backGround,"--left",200);
    }
  });
  backGroundElement2.forEach(backGround => {
    incrementCustomProperty(backGround,"--left",delta * speedScale * SPEED_BG2 * -1);
    if(getCustomProperty(backGround,"--left") <= -100) {
      incrementCustomProperty(backGround,"--left",200);
    }
  });
  backGroundElement3.forEach(backGround => {
    incrementCustomProperty(backGround,"--left",delta * speedScale * SPEED_BG3 * -1);
    if(getCustomProperty(backGround,"--left") <= -100) {
      incrementCustomProperty(backGround,"--left",200);
    }
  });
} 

const updateBackgroundImages = (elements,backGroundName) => {
  elements.forEach(background => {
    updateImage(background,backGroundName);
  });
}
const updateImage = (backgroundEl,backgroundName) => {
  const prefix = "images/background";
  backgroundEl.src = `${prefix}/${currentStage}/${backgroundName}.png`;
}


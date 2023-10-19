import { 
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty
  } from "./updateCustomProperties.js"
import audioInit from "./Audio.js";

const catElement = document.querySelector("[data-cat]");
const JUMP_SPEED = 0.35;
const GRAVITY = 0.0010;
const CAT_FRAME_COUNT = 6;
const FRAME_TIME = 75;
const GROUND_BOTTOM = 7;

const jumpSound = audioInit("../audio/cartoon-jump-6462.mp3");
const loseSound = audioInit("../audio/bruh-1-120133.mp3");
let isJumping;
let catFrame;
let currentFrameTime;
let yVelocity;

export const setupCat = () => {
  isJumping = false;
  catFrame = 0;
  currentFrameTime  = 0;
  yVelocity = 0;
  setCustomProperty(catElement,"--bottom",GROUND_BOTTOM);
  document.removeEventListener("keydown",onJumpKey);
  document.addEventListener("keydown",onJumpKey);
}
export const updateCat = (delta,speedScale) => {
  handleRun(delta,speedScale);
  handleJump(delta);
}

export const getCatRect = () => {
  return catElement.getBoundingClientRect();
}

export const setCatLose = () => {
  jumpSound.pause()
  jumpSound.currentTime = 0;
  loseSound.play(); 
  catElement.src = "images/cat/cat3.png";
}

function handleRun (delta,speedScale) {
  if(isJumping) {
    catElement.src = "images/cat/cat3.png";
    return;
  }
  if(currentFrameTime >= FRAME_TIME) {
    catFrame = (catFrame + 1) % CAT_FRAME_COUNT;
    catElement.src = `images/cat/cat${catFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if(!isJumping) return;
  jumpSound.play();
  incrementCustomProperty(catElement,"--bottom",yVelocity * delta);
  if(getCustomProperty(catElement,"--bottom") <= GROUND_BOTTOM) {
    setCustomProperty(catElement,"--bottom",GROUND_BOTTOM);
    isJumping = false;
    jumpSound.pause();
    jumpSound.currentTime = 0;
  }
  yVelocity -= GRAVITY * delta;
}

function onJumpKey (e) {
  if(e.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
}
export const onJump = () => {
  if(isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
}

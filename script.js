import { setupBackGround,updateBackGround } from "./components/background.js"
import { setupGround,updateGround } from "./components/groud.js"
import { updateCat,setupCat,getCatRect,setCatLose, onJump } from "./components/cat.js"
import { updateGhost,setupGhost,getGhostRects } from "./components/ghost.js"
import { firstLevelSound,stopAllLevelSound } from "./components/sounds.js"
import showResultToScreen from "./components/screenStart.js"

const WORLD_WIDTH = 16;
const WORLD_HEIGHT = 9;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElement = document.querySelector("[data-world]");
const scoreElement = document.querySelector("[data-score]")
const startScreenElement = document.querySelector("[data-start-screen]");

setPixelToWorldScale()
window.addEventListener("resize",setPixelToWorldScale);
document.addEventListener("keydown",handleStart,{once : true});
document.addEventListener("touchstart",handleStart,{once : true});
firstLevelSound.loop = true;
let lastTime;
let speedScale;
let score;

const update = (time) => {
  if(lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  updateBackGround(delta,speedScale,score);
  updateGround(delta,speedScale,score);
  updateCat(delta,speedScale);
  updateGhost(delta,speedScale);
  updateScore(delta);
  updateSpeedScale(delta);

  if(checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkLose() {
  const catRect = getCatRect();
  return getGhostRects().some(rect => isCollision(rect,catRect));
}

function isCollision(rect1,rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function updateSpeedScale (delta) {
  if(speedScale >= 2) return;
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function handleStart () {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupBackGround();
  setupGround();
  setupCat();
  setupGhost();
  startScreenElement.classList.add("hide");
  firstLevelSound.play();
  window.requestAnimationFrame(update);
}

function handleLose() {
  setCatLose();
  stopAllLevelSound();
  setTimeout(() => {
    document.addEventListener("keydown",handleStart,{once:true});
    document.addEventListener("touchstart",handleStart,{once:true});
    startScreenElement.classList.remove("hide");
    showResultToScreen(score);
  },100);
}

function updateScore (delta) {
  score += delta * 0.01;
  scoreElement.textContent = Math.floor(score);
}

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }
  worldElement.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElement.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

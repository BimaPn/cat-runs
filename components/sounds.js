import audioInit from "./Audio.js"

export const firstLevelSound = audioInit("../audio/backsound.mp3");
export const jumpSound = audioInit("../audio/cartoon-jump-6462.mp3");
export const loseSound = audioInit("../audio/bruh-1-120133.mp3");
export const transitionSound = audioInit("../audio/transition.mp3");
export const finalLevelSound = audioInit("../audio/final.mp3");

export const stopAllLevelSound = () => {
  firstLevelSound.pause();
  firstLevelSound.currentTime = 0;
  finalLevelSound.pause();
  finalLevelSound.currentTime = 0;
}


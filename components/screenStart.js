import {STAGE_2,STAGE_3,STAGE_4} from "./background.js"

const headElement = document.querySelector(".start-head");
const scoresElement = document.querySelector(".start-scores");

const firstLevelQuotes = ["You noob...","What the F..","Need more practice:)","Jir nub bgt"];
const secondLevelQuotes = ["Bro ? really ?","Are you serious ?","Hell na :(","Let's try again :)"];
const thirdLevelQuotes = ["Hmmm not bad","Quite impressive..","Dangg bro","Anjay mabar.."];
const finalLevelQuotes = ["The real sigma :D","Eyyyo nice bro","UwU :3","You nailed it bro :D"];

const showResultToScreen = (scores) => {
  headElement.classList.remove("hide");
  scoresElement.classList.remove("hide");
  const random = Math.floor(Math.random() * 4);
  let randomQuote = "";
  if(scores >= STAGE_2 && scores < STAGE_3) {
    randomQuote = secondLevelQuotes[random];
  }else if(scores >= STAGE_3 && scores < STAGE_4){
    randomQuote = thirdLevelQuotes[random];
  }else if(scores >= STAGE_4) {
    randomQuote = finalLevelQuotes[random];
  }else {
    randomQuote = firstLevelQuotes[random];
  }
  headElement.innerText = randomQuote;
  scoresElement.innerText = `scores : ${Math.floor(scores)}`;
}

export default showResultToScreen;

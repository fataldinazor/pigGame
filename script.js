'use strict';

const player = {
  currScore: 0,
  holdScore: 0,
};

let playing =true;
const p1 = Object.create(player);
const p2 = Object.create(player);
(p1.currScore = 0), (p1.holdScore = 0);
(p2.currScore = 0), (p2.holdScore = 0);

const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const diceImage = document.querySelector('.dice');
const holdBtn = document.querySelector('.btn--hold');
//main SCore Board
const p1ScoreBrd = document.getElementById('score--0');
const p2ScoreBrd = document.getElementById('score--1');

//current Score Board
const p1CurrScoreBrd = document.getElementById('current--0');
const p2CurrScoreBrd = document.getElementById('current--1');


const player1Section=document.querySelector('.player--0');
const player2Section=document.querySelector('.player--1');

const player1Active=()=>{
player1Section.classList.add('player--active');
player2Section.classList.remove('player--active');
}

const player2Active=()=>{
  player1Section.classList.remove('player--active');
  player2Section.classList.add('player--active');
}

player1Active();

const rNumber = () => {
  let rNum = Math.ceil(Math.random() * 6);
  return rNum;
};

const rmvDiceImage=()=>{
    diceImage.classList.add('hidden')
}
const addDiceImage=()=>{
    diceImage.classList.remove('hidden');
}
rmvDiceImage();

p1ScoreBrd.textContent = 0;
p2ScoreBrd.textContent = 0;
 
p1CurrScoreBrd.textContent = 0;
p2CurrScoreBrd.textContent = 0; 

let flag = 0; //for deciding which player is playing

holdBtn.addEventListener('click', () => {
  if(playing===true){
    if (flag == 0) {
      player2Active();
      p1.currScore += p1.holdScore;
      p1ScoreBrd.textContent = p1.currScore;
      p1.holdScore = 0;
      p1CurrScoreBrd.textContent = p1.holdScore;
    } else {
      player1Active();
      p2.currScore += p2.holdScore;
      p2ScoreBrd.textContent = p2.currScore;
      p2.holdScore = 0;
      p2CurrScoreBrd.textContent = p2.holdScore;
    }
    flag = !flag;
    console.log(`value of flag is ${flag}`);
    if(p1.currScore>=10){
      console.log('gameEnded')
      rmvDiceImage();
      document.querySelector('.player--0').classList.add('player--winner');
      document.querySelector('.player--0').classList.remove('player--active')
      playing=false;
    }
    if(p2.currScore>=10){
      console.log('gameEnded')
      rmvDiceImage();
      document.querySelector('.player--1').classList.add('player--winner');
      document.querySelector('.player--1').classList.remove('player--active')
      playing=false;
    }
  }
});

const resetGame=()=>{
    p1.currScore = 0;
    p1.holdScore = 0;
    p2.currScore = 0;
    p2.holdScore = 0;
    playing=true;
  }
  
  newBtn.addEventListener('click',()=>{
    rmvDiceImage();
    resetGame();
    player1Active();
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    p1ScoreBrd.textContent=p1.currScore;
    p2ScoreBrd.textContent=p2.currScore;
    p1CurrScoreBrd.textContent=p1.holdScore;
    p2CurrScoreBrd.textContent=p2.holdScore;
})

rollBtn.addEventListener('click', () => {
  if(playing===true){
    addDiceImage();
    let random = rNumber();
    console.log(random);
    diceImage.src = `dice-${random}.png`;
    if (random > 1) {
      if (flag == 0) {
        player1Active();
        p1.holdScore += random;
        p1CurrScoreBrd.textContent = p1.holdScore;
      } else {
        player2Active();
        p2.holdScore += random;
        p2CurrScoreBrd.textContent = p2.holdScore;
      }
    } else if (random == 1) {
      if (flag == 0) {
        player2Active();
        p1.holdScore = 0;
        p1CurrScoreBrd.textContent = p1.holdScore;
      } else {
        player1Active();
        p2.holdScore = 0;
        p2CurrScoreBrd.textContent = p2.holdScore;
      }
      flag = !flag;
      console.log(`value of flag is ${flag}`);
    }
  }
});

let timer = 30;
let lastPot;
let timeUp = false;
let scoreCounter = 0;
let min = 500;
let max = 2000;

window.addEventListener('DOMContentLoaded', () => {

  const countdown = document.querySelector('.timer-countdown');

  const score = document.querySelector('.score-board');

  const startBtn = document.querySelector('.start-button');

  const pots = document.querySelectorAll('.pot');

  //random time for food to pop up and down
  score.textContent = scoreCounter;
  countdown.textContent = timer;

  function randomTime(min, max) {
    const popUpTime = Math.round(Math.random() * (max-min) + min);
    console.log(popUpTime);
    return popUpTime;
  }

  function randomPot(pots) {
    const index = Math.floor(Math.random() * pots.length);
    const pot = pots[index];
    if(pot === lastPot){
      return randomPot(pots);
    }
    lastPot = pot;
    return pot;
  }


  function peak (){
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    const newColor = 'rgb(' + x + ',' + y + ',' + z + ')';
    //check if commented out section below works properly
    // if(scoreCounter === 10 || scoreCounter === 20){
    //   max -= 500;
    // }
    // if(max < 1000){
    //   max = 1000;
    // }
    const time = randomTime(min, max);
    const pot = randomPot(pots);
    pot.classList.add('change-color');
    if(pot.classList.contains('change-color')){
      pot.style.background = newColor;
    }
    setTimeout(() => {
      pot.classList.remove('change-color');
      pot.style.background = 'pink';
      if(!timeUp) peak();
    }, time);
    return time, pot;
  }

  function startGame() {
    startBtn.disabled = true;
    timer = 30;
    countdown.textContent = timer;
    scoreCounter = 0;
    score.textContent = 0;
    timeUp = false;
    peak();
    const timerId = setInterval(() => {
      timer -= 1;
      countdown.textContent = timer;
      if(timer === 0){
        startBtn.disabled = false;
        clearInterval(timerId);
        timeUp = true;
      }
    }, 1000);
  }


  startBtn.addEventListener('click', startGame);

  function hit(e) {
    if(e.target.classList.contains('change-color')){
      scoreCounter++;
      this.classList.remove('change-color');
    }
    score.textContent = scoreCounter;
  }

  pots.forEach(pot => pot.addEventListener('click', hit));

});

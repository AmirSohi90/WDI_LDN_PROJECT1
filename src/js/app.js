let timer = 10;
let lastPot;
let timeUp = false;
let scoreCounter = 0;

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
    return popUpTime;
  }

  function randomPot(pots) {
    const index = Math.floor(Math.random() * pots.length);
    const pot = pots[index];
    if(pot === lastPot){
      return randomPot(pots);
    }

    lastPot = pot; // saves the reference of which one got popped up
    return pot;
  }


  function peak (){
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    const newColor = 'rgb(' + x + ',' + y + ',' + z + ')';
    const time = randomTime(100, 1000);
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
    timer = 10;
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
    if(!e.isTrusted) return;
    if(e.target.classList.contains('change-color')){
      scoreCounter++;
      this.classList.remove('change-color');
    }
    score.textContent = scoreCounter;
  }

  pots.forEach(pot => pot.addEventListener('click', hit));

});

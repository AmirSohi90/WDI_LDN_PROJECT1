window.addEventListener('DOMContentLoaded', () => {

  const countdown = document.querySelector('.timer-countdown');

  const score = document.querySelector('.score-board');

  const start = document.querySelector('.start');

  const pots = document.querySelectorAll('.pot');

  //random time for food to pop up and down
  let timer = 5;
  // let timerId = null;
  // let runningTimer = false;
  let lastPot;
  let timeUp = false;
  let scoreCounter = 0;
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
    const time = randomTime(200, 2000);
    const pot = randomPot(pots);
    pot.classList.add('change-color');
    setTimeout(() => {
      pot.classList.remove('change-color');
      if(!timeUp) peak();
    }, time);
    return time, pot;
  }

  function startGame() {
    timer = 5;
    scoreCounter = 0;
    score.textContent = 0;
    timeUp = false;
    peak();
    setInterval(() => {
      timeUp = true;
    }, 5000);
    let timerId = setInterval(() => {
      timer -= 1;
      countdown.textContent = timer;
      if(timer === 0){
        clearInterval(timerId);
      }
    }, 1000);
  }


  start.addEventListener('click', startGame);

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

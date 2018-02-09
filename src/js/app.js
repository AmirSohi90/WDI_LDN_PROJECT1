window.addEventListener('DOMContentLoaded', () => {

  const countdown = document.querySelector('.timer-countdown');
  console.log(countdown);

  const scoreCount = document.querySelector('.score');
  console.log(scoreCount);

  const pots = document.querySelectorAll('.whack');
  console.log(pots);

  const start = document.querySelector('.start');
  console.log(start);
  //random time for food to pop up and down
  function randomTime(min, max) {
    const popUpTime = Math.round(Math.random() * (max - min) + min);
    return popUpTime;
  }

  let timer = 30;
  countdown.innerHTML = timer;

  console.log(randomTime(200, 2000));

  //function to get random pots
  function randomPot(pots){
    const potIndex = Math.floor(Math.random() * pots.length);
    const pot = pots[potIndex];
    return pot;
  }
  console.log(randomPot(pots));

  let timerId = null;
  let runningTimer = false;

  start.addEventListener('click', function(){
    if(!runningTimer){
      runningTimer = true;
      timerId = setInterval(() => {
        timer -=  1;
        if(timer === 0){
          clearInterval(timerId);
        }
        countdown.innerHTML = timer;
        console.log(timer);
      }, 1000);
    } else {
      runningTimer = false;
      clearInterval(timerId);
    }
  });

});

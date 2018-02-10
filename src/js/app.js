window.addEventListener('DOMContentLoaded', () => {

  const countdown = document.querySelector('.timer-countdown');
  console.log(countdown);

  const start = document.querySelector('.start');
  console.log(start);

  const pots = document.querySelectorAll('.pot');

  //random time for food to pop up and down

  let timer = 30;
  let timerId = null;
  let runningTimer = false;
  let lastPot;
  countdown.innerHTML = timer;

  function randomTime(min, max) {
    const popUpTime = Math.round(Math.random() * (max-min) + min);
    return popUpTime;
  }

  function randomPot(pots) {
    const index = Math.floor(Math.random() * pots.length);
    const pot = pots[index];
    if(pot === lastPot){
      console.log('You stop that, you!');
      return randomPot(pots);
    }

    lastPot = pot; // saves the reference of which one got popped up
    return pot;
  }

  // console.log(randomPot(pots));
  // console.log(randomPot(pots));
  // console.log(randomPot(pots));
  // console.log(randomPot(pots));
  // console.log(randomPot(pots));
  // console.log(randomPot(pots));
  // console.log(randomPot(pots));
  // console.log(randomPot(pots));
  // console.log(randomPot(pots));
  // console.log(randomPot(pots));

  function peak (){
    const time = randomTime(200, 2000);
    const pot = randomPot(pots);
    pot.classList.add('change-color');
    setTimeout(() => {
      pot.classList.remove('change-color');
    }, time);
    return time, pot;
  }

  console.log(peak());

  start.addEventListener('click', function(){
    if(!runningTimer){
      runningTimer = true;
      timerId = setInterval(() => {
        timer -=  1;
        start.innerHTML = 'Pause';
        if(timer === 0){
          clearInterval(timerId);
        }
        countdown.innerHTML = timer;
        console.log(timer);
      }, 1000);
    } else {
      start.innerHTML = 'Start';
      runningTimer = false;
      clearInterval(timerId);
    }
  });

});

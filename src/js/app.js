window.addEventListener('DOMContentLoaded', () => {

  const countdown = document.querySelector('.timer-countdown');
  console.log(countdown);

  const scoreCount = document.querySelector('.score');
  console.log(scoreCount);

  const pots = document.querySelectorAll('.whack');
  console.log(pots);

  const start = document.querySelector('.start');
  console.log(start);

  function randomTime(min, max) {
    const popUpTime = Math.round(Math.random() * (max - min) + min);
    return popUpTime;
  }
  console.log(randomTime(200, 2000));

  function randomPot(pots){
    const potIndex = Math.floor(Math.random() * pots.length);
    // console.log(potIndex);
    // console.log(pots[0]);
    const pot = pots[potIndex];
    return pot;
  }
  console.log(randomPot(pots));
});

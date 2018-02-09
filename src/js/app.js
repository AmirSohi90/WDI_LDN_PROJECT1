window.addEventListener('DOMContentLoaded', () => {

  const score = document.querySelector('.score');
  console.log(score.innerHTML);

  const time = document.querySelector('.time');
  console.log(time.innerHTML);

  const pots = document.querySelectorAll('.whack');

  console.log(pots);

  let previousWhack;

  function randomTime(min, max){
    let randomPopUpTime = Math.round(Math.random() * (max - min) + min);
    return randomPopUpTime;
  }
  console.log(randomTime(200, 2000));

  function randomWhack(pots){
    const pot = pots[Math.floor(Math.random() * pots.length)];

    if(pot === previousWhack) {
      console.log('try again');
      return randomWhack(pots);
    }
    previousWhack = pot;
    return pot;
  }

  function showFood(){
    const time = randomTime(200, 10000);
    const pot = randomWhack(pots);
    pot.classList.add('change-color');
    setTimeout(() => {
      pot.classList.remove('change-color');
    }, time);
  }

  console.log(showFood());

});

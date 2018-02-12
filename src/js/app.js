let timer = 30;
let lastImage;
let timeUp = false;
let scoreCounter = 0;
let min = 500;
let max = 2000;

window.addEventListener('DOMContentLoaded', () => {

  const ingredients = [
    {
      name: 'carrot',
      image: '/images/carrot.png'
    },
    {
      name: 'beef',
      image: '/images/beef.png'
    },
    {
      name: 'garlic',
      image: '/images/garlic.png'
    },
    {
      name: 'tomato',
      image: '/images/tomato.png'
    },
    {
      name: 'onion',
      image: '/images/onion.png'
    }
  ];

  const countdown = document.querySelector('.timer-countdown');

  const score = document.querySelector('.score-board');

  const startBtn = document.querySelector('.start-button');

  const pots = document.querySelectorAll('.pot');

  const randomImages = document.querySelectorAll('.random-image');

  //random time for food to pop up and down
  score.textContent = scoreCounter;
  countdown.textContent = timer;

  function randomTime(min, max) {
    const popUpTime = Math.round(Math.random() * (max-min) + min);
    console.log(popUpTime);
    return popUpTime;
  }

  function ingredientPick(randomImages) {
    const index = Math.floor(Math.random() * randomImages.length);
    const randomImage = randomImages[index];
    if(randomImage === lastImage){
      return ingredientPick(randomImages);
    }
    lastImage = randomImage;
    return randomImage;
  }

  function randomIngredient (){
    const index = Math.floor(Math.random() * ingredients.length);
    const ingredientImage = ingredients[index].image;
    return ingredientImage;
  }


  function peak (){
    // const x = Math.floor(Math.random() * 256);
    // const y = Math.floor(Math.random() * 256);
    // const z = Math.floor(Math.random() * 256);
    // const newColor = 'rgb(' + x + ',' + y + ',' + z + ')';
    // // check if commented out section below works properly
    if(timer === 20 || scoreCounter === 10){
      max -= 500;
    }
    if(max < 1000){
      max = 1000;
    }
    const time = randomTime(min, max);
    const randomImage = ingredientPick(randomImages);
    randomImage.src = randomIngredient();
    randomImage.classList.add('point');
    // pot.classList.add('change-color');
    // if(pot.classList.contains('change-color')){
    //   pot.style.background = newColor;
    // }
    setTimeout(() => {
      randomImage.src = '';
      randomImage.style.background = 'green';
      if(!timeUp) peak();
    }, time);
    return time, randomImage;
  }

  function startGame() {
    startBtn.disabled = true;
    timer = 30;
    max = 2000;
    min = 500;
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
    if(e.target.classList.contains('point')){
      scoreCounter++;
      this.classList.remove('point');
    }
    score.textContent = scoreCounter;
  }

  pots.forEach(pot => pot.addEventListener('click', hit));

});

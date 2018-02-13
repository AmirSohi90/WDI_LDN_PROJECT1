let timer;
let lastImage;
let timeUp = false;
let scoreCounter = 0;
let min;
let max;
let difficulty = 0;
let level = 0;

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
  },
  {
    name: 'buns',
    image: '/images/buns.png'
  },
  {
    name: 'cheese',
    image: '/images/cheese.png'
  },
  {
    name: 'chicken',
    image: '/images/chicken.png'
  },
  {
    name: 'egg',
    image: '/images/egg.png'
  },
  {
    name: 'gherkin',
    image: '/images/gherkin.png'
  },
  {
    name: 'lemon',
    image: '/images/lemon.png'
  },
  {
    name: 'lettuce',
    image: '/images/lettuce.png'
  },
  {
    name: 'peas',
    image: '/images/peas.png'
  },
  {
    name: 'pepper',
    image: '/images/pepper.png'
  },
  {
    name: 'prawn',
    image: '/images/prawn.png'
  },
  {
    name: 'soy sauce',
    image: '/images/soysauce.png'
  }
];
window.addEventListener('DOMContentLoaded', () => {


  const countdown = document.querySelector('.timer-countdown');

  const score = document.querySelector('.score-board');

  const startBtn = document.querySelector('.start-button');

  // const pots = document.querySelectorAll('.pot');

  const randomImages = document.querySelectorAll('.random-image');
  console.log(randomImages);

  //next level buttons
  const nextLevel = document.querySelectorAll('.next-level-button');

  const mainContainer = document.querySelector('.main-container');

  //difficulty buttons
  const difficultyButtons = document.querySelectorAll('.difficulty-buttons');
  console.log(difficultyButtons);

  const difficultiesDiv = document.querySelector('.difficulties');

  const instructionsScreen = document.querySelector('.instructions-screen');

  for (let i = 0; i < difficultyButtons.length; i++){
    difficultyButtons[i].addEventListener('click', (e) => {
      if(e.target.classList.contains('easy')){
        level = 1;
        difficulty = 1;
        timer = 60;
        max = 4000;
        min = 2000;
        instructionsScreen.classList.add('hide');
        difficultiesDiv.classList.add('hide');
        mainContainer.classList.remove('hide');
      } else if(e.target.classList.contains('medium')){
        level = 1;
        difficulty = 2;
        timer = 50;
        max = 3500;
        min = 1500;
        instructionsScreen.classList.add('hide');
        difficultiesDiv.classList.add('hide');
        mainContainer.classList.remove('hide');
      } else if(e.target.classList.contains('hard')) {
        level = 1;
        difficulty = 3;
        timer = 45;
        max = 3000;
        min = 1000;
        instructionsScreen.classList.add('hide');
        difficultiesDiv.classList.add('hide');
        mainContainer.classList.remove('hide');
      }
    });
  }

  //different recipe IDs
  const burger = document.querySelector('#burger');
  const spaghetti = document.querySelector('#spaghetti');
  const stirFry = document.querySelector('#stir-fry');
  const paella = document.querySelector('#paella');
  const roast = document.querySelector('#roast');
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

  function randomIngredient() {
    const index = Math.floor(Math.random() * ingredients.length);
    return ingredients[index];
  }

  // const randomIng = randomIngredient();
  // console.log(randomIng);

  function peak (){
    if(timer === 10){
      max -= 750;
    }
    if(max < 1000){
      max = 1000;
    }
    const time = randomTime(min, max);
    const randomImage = ingredientPick(randomImages);
    const randomIng = randomIngredient();
    randomImage.innerHTML = `<img id="${randomIng.name}" src="${randomIng.image}" class="point popUp">`;
    console.log(randomImage);
    setTimeout(() => {
      // setTimeout(() => {
      //   randomImage.innerHTML = `<img src="${randomIngredient()}" class="point popDown">`;
      // }, 1000);
      randomImage.innerHTML = '';
      randomImage.classList.remove('point');
      randomImage.style.background = 'green';
      if(!timeUp) peak();
    }, time);
    return time, randomImage;
  }

  function startGame() {
    startBtn.disabled = true;
    if(difficulty === 1){
      timer = 60;
      max = 4000;
      min = 2000;
    } else if (difficulty === 2){
      timer = 50;
      max = 3500;
      min = 1500;
    } else if (difficulty === 3){
      timer = 45;
      max = 2500;
      min = 750;
    }
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
      console.log(e.target);
      e.target.innerHTML = '';
    }
    score.textContent = scoreCounter;
  }

  randomImages.forEach(pick => pick.addEventListener('click', hit));

});

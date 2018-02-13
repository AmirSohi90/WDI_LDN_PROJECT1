let timer;
let lastImage;
let timeUp = false;
let scoreCounter = 0;
let min = 0;
let max = 0;
let difficulty = 0;
let level = 0;
let hitIngredients = [];
let characterChosen = false;
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
  },
  {
    name: 'clock',
    image: '/images/clock.png'
  }
];
window.addEventListener('DOMContentLoaded', () => {


  const countdown = document.querySelector('.timer-countdown');

  const score = document.querySelector('.score-board');

  const levelDescription = document.querySelector('#level-description-span');

  const startBtn = document.querySelector('.start-button');

  // const pots = document.querySelectorAll('.pot');

  const randomImages = document.querySelectorAll('.random-image');
  console.log(randomImages);

  const spaghettiList = document.querySelector('#spaghetti-list');
  const stirFryList = document.querySelector('#stir-fry-list');
  const burgerList = document.querySelector('#burger-list');
  const paellaList = document.querySelector('#paella-list');
  const roastList = document.querySelector('#roast-list');
  const nextLevel = document.querySelectorAll('.next-level-button');

  const mainContainer = document.querySelector('.main-container');

  //difficulty buttons
  const difficultyButtons = document.querySelectorAll('.difficulty-buttons');
  console.log(difficultyButtons);

  const difficultiesDiv = document.querySelector('.difficulties');

  const instructionsScreen = document.querySelector('.instructions-screen');

  const tryAgain = document.querySelector('.try-again');

  const tryAgainButton = document.querySelector('#try-again');

  const fiftyPoints = document.querySelector('#fifty-points');

  const hundredPoints = document.querySelector('#hundred-points');

  const hundredFiftyPoints = document.querySelector('#hundred-fifty-points');

  const twoHundredPoints = document.querySelector('#two-hundred-points');

  const threeHundredPoints = document.querySelector('#three-hundred-points');

  const chefMan = document.querySelector('#chef-man-button');

  const ramenGirl = document.querySelector('#ramen-girl-button');

  const characterSelect = document.querySelector('#character-selection');

  const congratsButton = document.querySelector('#congratulations-button');

  const chefBox = document.querySelector('#chef');

  const finalLevelDone = document.querySelector('.password-shown');

  const finalLevelDoneButton = document.querySelector('.back-to-home-screen');

  function disabledButtons(){
    ramenGirl.disabled = false;
    chefMan.disabled = false;
    for(let i = 0; i < difficultyButtons.length; i++){
      difficultyButtons[i].disabled = true;
      ramenGirl.addEventListener('click', () => {
        chefBox.classList.add('ramen-girl-gif');
        ramenGirl.disabled = true;
        chefMan.disabled = true;
        difficultyButtons[i].disabled = false;
      });
      chefMan.addEventListener('click', () => {
        chefBox.classList.add('chef-man-gif');
        chefMan.disabled = true;
        ramenGirl.disabled = true;
        difficultyButtons[i].disabled = false;
      });
    }
  }

  disabledButtons();

  for (let i = 0; i < difficultyButtons.length; i++){
    difficultyButtons[i].addEventListener('click', (e) => {
      if(e.target.classList.contains('easy')){
        level = 1;
        difficulty = 1;
        timer = 60;
        characterSelect.classList.add('hide');
        instructionsScreen.classList.add('hide');
        difficultiesDiv.classList.add('hide');
        mainContainer.classList.remove('hide');
        spaghettiList.classList.remove('hide');
        fiftyPoints.classList.remove('hide');
        levelDescription.textContent = 'Level 1: Spaghetti Bolognese';
      } else if(e.target.classList.contains('medium')){
        level = 1;
        difficulty = 2;
        timer = 50;
        characterSelect.classList.add('hide');
        instructionsScreen.classList.add('hide');
        difficultiesDiv.classList.add('hide');
        mainContainer.classList.remove('hide');
        spaghettiList.classList.remove('hide');
        fiftyPoints.classList.remove('hide');
        levelDescription.textContent = 'Level 1: Spaghetti Bolognese';
      } else if(e.target.classList.contains('hard')) {
        level = 1;
        difficulty = 3;
        timer = 45;
        characterSelect.classList.add('hide');
        instructionsScreen.classList.add('hide');
        difficultiesDiv.classList.add('hide');
        mainContainer.classList.remove('hide');
        spaghettiList.classList.remove('hide');
        fiftyPoints.classList.remove('hide');
        levelDescription.textContent = 'Level 1: Spaghetti Bolognese';
      }
    });
  }

  //different recipe IDs
  const burger = document.querySelector('#burger');
  const spaghetti = document.querySelector('#spaghetti');
  const stirFry = document.querySelector('#stir-fry');
  const paella = document.querySelector('#paella');
  const roast = document.querySelector('#roast');

  const levelIngredients = document.querySelectorAll('.level-ingredients');
  console.log(levelIngredients);

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
      randomImage.innerHTML = '';
      randomImage.classList.remove('point');
      randomImage.style.background = 'green';
      if(!timeUp) peak();
    }, time);
    return time, randomImage;
  }

  function startGame() {
    console.log(level);
    startBtn.disabled = true;
    if(difficulty === 1){
      timer = 60;
      max = 2500;
      min = 1500;
    } else if (difficulty === 2){
      timer = 50;
      max = 2000;
      min = 1000;
    } else if (difficulty === 3){
      timer = 45;
      max = 1500;
      min = 500;
    }
    countdown.textContent = timer;
    if(level === 1) {
      scoreCounter = 0;
      score.textContent = 0;
    }
    timeUp = false;
    peak();
    const timerId = setInterval(() => {
      timer -= 1;
      countdown.textContent = timer;
      if(timer === 0){
        if(level === 1 && hitIngredients.includes('beef') && hitIngredients.includes('onion') && hitIngredients.includes('garlic') && hitIngredients.includes('carrot') && hitIngredients.includes('tomato') && hitIngredients.includes('cheese') && scoreCounter === 50) {
          mainContainer.classList.add('hide');
          spaghetti.classList.remove('hide');
        } else if(level === 2 && hitIngredients.includes('garlic') && hitIngredients.includes('chicken') && hitIngredients.includes('pepper') && hitIngredients.includes('soy sauce') && hitIngredients.includes('peas') && scoreCounter === 100){
          mainContainer.classList.add('hide');
          stirFry.classList.remove('hide');
        } else if(level === 3 && hitIngredients.includes('beef') && hitIngredients.includes('egg') && hitIngredients.includes('lettuce') && hitIngredients.includes('onion') && hitIngredients.includes('gherkin') && hitIngredients.includes('cheese') && hitIngredients.includes('buns') && scoreCounter === 150) {
          mainContainer.classList.add('hide');
          burger.classList.remove('hide');
        } else if(level === 4 && hitIngredients.includes('onion') && hitIngredients.includes('tomato') && hitIngredients.includes('chicken') && hitIngredients.includes('prawn') && hitIngredients.includes('lemon') && score === 200) {
          mainContainer.classList.add('hide');
          paella.classList.remove('hide');
          finalLevelDone.remove('hide');

        } else {
          mainContainer.classList.add('hide');
          tryAgain.classList.remove('hide');
        }
        startBtn.disabled = false;
        clearInterval(timerId);
        timeUp = true;
      }
    }, 1000);
  }

  finalLevelDoneButton.addEventListener('click', () => {
    finalLevelDone.classList.add('hide');
    instructionsScreen.classList.remove('hide');
    resetGame();
  });


  startBtn.addEventListener('click', startGame);

  function hit(e) {
    if(level === 1){
      if(e.target.id === 'beef' || e.target.id === 'onion' || e.target.id === 'garlic' || e.target.id === 'carrot' || e.target.id === 'tomato' || e.target.id === 'cheese'){
        scoreCounter += 5;
      } else if (e.target.id === 'clock') {
        timer += 5;
      } else {
        scoreCounter -= 2;
      }
    }
    if(level === 2){
      if(e.target.id === 'garlic' || e.target.id === 'chicken' || e.target.id === 'pepper' || e.target.id === 'soy sauce' || e.target.id === 'peas'){
        scoreCounter += 5;
      } else if (e.target.id === 'clock') {
        timer += 5;
      } else {
        scoreCounter -= 2;
      }
    }
    if(level === 3){
      if(e.target.id === 'beef' || e.target.id === 'egg' || e.target.id === 'lettuce' || e.target.id === 'onion' || e.target.id === 'gherkin' || e.target.id === 'cheese' || e.target.id === 'buns'){
        scoreCounter += 5;
      } else if (e.target.id === 'clock') {
        timer += 5;
      } else {
        scoreCounter -= 2;
      }
    }
    if(level === 4){
      if(e.target.id === 'onion' || e.target.id === 'tomato' || e.target.id === 'chicken' || e.target.id === 'prawn'){
        scoreCounter += 5;
      } else if (e.target.id === 'clock') {
        timer += 5;
      } else {
        scoreCounter -= 2;
      }
    }

    if(scoreCounter < 0){
      scoreCounter = 0;
    }

    if(e.target.classList.contains('point')){
      hitIngredients.push(e.target.id);
      e.target.classList.add('hide');
      // e.target.classList.remove('popUp');
      // e.target.classList.add('popDown');
    }
    score.textContent = scoreCounter;
  }

  for(let i = 0; i < nextLevel.length; i++){
    nextLevel[i].addEventListener('click', () => {
      if(level === 1){
        hitIngredients= [];
        level ++;
        spaghettiList.classList.add('hide');
        stirFryList.classList.remove('hide');
        spaghetti.classList.add('hide');
        mainContainer.classList.remove('hide');
        fiftyPoints.classList.add('hide');
        hundredPoints.classList.remove('hide');
        levelDescription.textContent = 'Level 2: Stir Fry';
      } else if(level === 2){
        hitIngredients= [];
        level ++;
        stirFry.classList.add('hide');
        burgerList.classList.remove('hide');
        stirFry.classList.add('hide');
        mainContainer.classList.remove('hide');
        hundredPoints.classList.add('hide');
        hundredFiftyPoints.classList.remove('hide');
        levelDescription.textContent = 'Level 3: Burger';
      } else if(level === 3){
        hitIngredients= [];
        level ++;
        burgerList.classList.add('hide');
        paella.classList.remove('hide');
        paellaList.classList.remove('hide');
        burger.classList.add('hide');
        mainContainer.classList.remove('hide');
        hundredFiftyPoints.classList.add('hide');
        twoHundredPoints.classList.remove('hide');
        levelDescription.textContent = 'Level 4: Paella';
      }
    });
  }
  function resetGame() {
    timer;
    lastImage;
    timeUp = false;
    scoreCounter = 0;
    score.textContent = scoreCounter;
    min= 0;
    max = 0;
    difficulty = 0;
    level = 0;
    hitIngredients = [];
    tryAgain.classList.add('hide');
    instructionsScreen.classList.remove('hide');
    difficultiesDiv.classList.remove('hide');
    characterSelect.classList.remove('hide');
    disabledButtons();
  }

  tryAgainButton.addEventListener('click', resetGame);

  randomImages.forEach(pick => pick.addEventListener('click', hit));

});

let timer = 0;
let lastImage;
let timeUp = false;
let scoreCounter = 0;
let min = 0;
let max = 0;
let difficulty = 0;
let level = 0;
let hitIngredients = [];
let timerId = null;

const level1Ings = ['beef', 'onion', 'garlic', 'carrot', 'tomato', 'cheese'];

const level2Ings = ['garlic', 'chicken', 'pepper', 'soy sauce', 'peas'];

const level3Ings = ['beef', 'egg', 'lettuce', 'onion', 'gherkin', 'cheese', 'buns'];

const level4Ings = ['onion', 'tomato', 'chicken', 'prawn', 'lemon'];

const level10Ings = ['chicken', 'onion', 'carrot', 'garlic', 'lemon', 'potato'];

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
  },
  {
    name: 'potato',
    image: '/images/potato.png'
  }
];
window.addEventListener('DOMContentLoaded', () => {


  const countdown = document.querySelector('.timer-countdown');

  const score = document.querySelector('.score-board');

  const levelDescription = document.querySelector('#level-description-span');

  const startBtn = document.querySelector('.start-button');

  // const pots = document.querySelectorAll('.pot');

  const randomImages = document.querySelectorAll('.random-image');

  const burger = document.querySelector('#burger');
  const spaghetti = document.querySelector('#spaghetti');
  const stirFry = document.querySelector('#stir-fry');
  const paella = document.querySelector('#paella');
  const roast = document.querySelector('#roast');
  const spaghettiList = document.querySelector('#spaghetti-list');
  const stirFryList = document.querySelector('#stir-fry-list');
  const burgerList = document.querySelector('#burger-list');
  const paellaList = document.querySelector('#paella-list');
  const roastList = document.querySelector('#roast-list');
  const nextLevel = document.querySelectorAll('.next-level-button');

  console.log(nextLevel);

  const mainContainer = document.querySelector('.main-container');

  const startBtnDiv = document.querySelector('.start-button-div');

  //difficulty buttons
  const difficultyButtons = document.querySelectorAll('.difficulty-buttons');

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

  const thanksForPlaying = document.querySelector('#thanks');
  const thanksForPlayingButton = document.querySelector('#thanks-button');

  const toCongratsPageButton = document.querySelector('#take-me-home');

  const chefBox = document.querySelector('#chef');

  const finalLevelDone = document.querySelector('#password-shown');

  const finalLevelDoneButton = document.querySelector('#back-to-home-screen');
  console.log(finalLevelDone);
  console.log(congratulationsText);

  const congratulationsText = document.querySelector('#congrats-and-password');

  const passwordButton = document.querySelector('.password-input-button');
  console.log(passwordButton);

  //sounds

  const chefManSound = document.querySelector('#chef-man-sound');

  const ramenGirlSound = document.querySelector('#ramen-girl-sound');

  const difficultySounds = document.querySelectorAll('.difficulty-sounds');

  const passwordCorrect = document.querySelector('#password-correct');

  const passwordIncorrect = document.querySelector('#password-incorrect');

  const startMusic = document.querySelector('#start-music');

  const loseSound = document.querySelector('#lose-music');

  finalLevelDoneButton.addEventListener('click', () =>{
    congratulationsText.classList.add('hide');
    finalLevelDone.classList.add('hide');
    tryAgainFunction();
  });

  function disabledButtons(){
    ramenGirl.disabled = false;
    chefMan.disabled = false;
    for(let i = 0; i < difficultyButtons.length; i++){
      difficultyButtons[i].disabled = true;
      ramenGirl.addEventListener('click', () => {
        chefBox.classList.add('ramen-girl-gif');
        ramenGirlSound.play();
        ramenGirl.disabled = true;
        chefMan.disabled = true;
        difficultyButtons[i].disabled = false;
      });
      chefMan.addEventListener('click', () => {
        chefManSound.play();
        chefBox.classList.add('chef-man-gif');
        chefMan.disabled = true;
        ramenGirl.disabled = true;
        difficultyButtons[i].disabled = false;
      });
    }
  }

  disabledButtons();

  passwordButton.addEventListener('click', () => {
    const password = window.prompt('Please Enter Password');
    if(password === 'iddqd'){
      passwordCorrect.play();
      level = 10;
      passwordButton.disabled = true;
    } else {
      passwordIncorrect.play();
    }
  });

  function firstLevelFunction() {
    characterSelect.classList.add('hide');
    instructionsScreen.classList.add('hide');
    difficultiesDiv.classList.add('hide');
    mainContainer.classList.remove('hide');
    startBtnDiv.classList.remove('hide');
    spaghettiList.classList.remove('hide');
    fiftyPoints.classList.remove('hide');
    levelDescription.textContent = 'Level 1: Spaghetti Bolognese';
  }

  for (let i = 0; i < difficultyButtons.length; i++){
    difficultyButtons[i].addEventListener('click', (e) => {
      difficultySounds[i].play();
      if(e.target.classList.contains('easy')){
        if(level === 10){
          characterSelect.classList.add('hide');
          instructionsScreen.classList.add('hide');
          difficultiesDiv.classList.add('hide');
          roastList.classList.remove('hide');
          threeHundredPoints.classList.remove('hide');
          mainContainer.classList.remove('hide');
          startBtnDiv.classList.remove('hide');
          difficulty = 1;
          timer = 90;
          levelDescription.textContent = 'Secret Level: Roast Chicken';
        } else {
          level = 1;
          difficulty = 1;
          timer = 60;
          firstLevelFunction();
        }
      } else if(e.target.classList.contains('medium')){
        if(level === 10){
          characterSelect.classList.add('hide');
          instructionsScreen.classList.add('hide');
          difficultiesDiv.classList.add('hide');
          roastList.classList.remove('hide');
          threeHundredPoints.classList.remove('hide');
          mainContainer.classList.remove('hide');
          startBtnDiv.classList.remove('hide');
          difficulty = 2;
          timer = 75;
          levelDescription.textContent = 'Secret Level: Roast Chicken';
        } else {
          level = 1;
          difficulty = 2;
          timer = 50;
          firstLevelFunction();
        }
      } else if(e.target.classList.contains('hard')) {
        if(level === 10){
          characterSelect.classList.add('hide');
          instructionsScreen.classList.add('hide');
          difficultiesDiv.classList.add('hide');
          roastList.classList.remove('hide');
          threeHundredPoints.classList.remove('hide');
          mainContainer.classList.remove('hide');
          startBtnDiv.classList.remove('hide');
          difficulty = 3;
          timer = 60;
          levelDescription.textContent = 'Secret Level: Roast Chicken';
        } else {
          level = 1;
          difficulty = 3;
          timer = 45;
          firstLevelFunction();
        }
      }
    });
  }

  const levelIngredients = document.querySelectorAll('.level-ingredients');

  score.textContent = scoreCounter;
  countdown.textContent = timer;

  function randomTime(min, max) {
    const popUpTime = Math.round(Math.random() * (max-min) + min);
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
    setTimeout(() => {
      randomImage.innerHTML = '';
      randomImage.classList.remove('point');
      // randomImage.style.background = 'green';
      if(!timeUp) peak();
    }, time);
    return time, randomImage;
  }

  function checkAnswers(ingredients, playerIngredients) {
    return ingredients.every(ing => playerIngredients.includes(ing));
  }

  function losingCondition () {
    mainContainer.classList.add('hide');
    startBtnDiv.classList.add('hide');
    tryAgain.classList.remove('hide');
    loseSound.play();
  }

  function difficultySettings() {
    if(difficulty === 1){
      if(level === 10){
        timer = 100;
        max = 2250;
        min = 1250;
      } else {
        timer = 60;
        max = 2500;
        min = 1500;
      }
    }
    if (difficulty === 2){
      if(level === 10){
        timer = 50;
        max = 1750;
        min = 1000;
      } else {
        timer = 45;
        max = 2000;
        min = 1000;
      }
    }
    if (difficulty === 3){
      if(level === 10){
        timer = 60;
        max = 1250;
        min = 500;
      } else {
        timer = 45;
        max = 1500;
        min = 500;
      }
    }
  }

  function winningConditions() {

    timer -= 1;
    countdown.textContent = timer;
    if(timer === 0){
      startMusic.pause();
      startMusic.currentTime = 0;
      for(let j = 0; j < levelIngredients.length; j++){
        if (levelIngredients[j].classList.contains('line-through')){
          levelIngredients[j].classList.remove('line-through');
        }
      }

      if (level === 1) {
        if (checkAnswers(level1Ings, hitIngredients) && scoreCounter >= 25) {
          mainContainer.classList.add('hide');
          startBtnDiv.classList.add('hide');
          spaghetti.classList.remove('hide');
        } else {
          losingCondition();
        }
      }
      if(level === 2){
        if(checkAnswers(level2Ings, hitIngredients) && scoreCounter >= 50) {
          mainContainer.classList.add('hide');
          startBtnDiv.classList.add('hide');
          stirFry.classList.remove('hide');
        } else {
          losingCondition();
        }
      }
      if(level === 3){
        if(checkAnswers(level3Ings, hitIngredients) && scoreCounter >= 75) {
          mainContainer.classList.add('hide');
          startBtnDiv.classList.add('hide');
          burger.classList.remove('hide');
        } else {
          losingCondition();
        }
      }
      if(level === 4){
        if(checkAnswers(level4Ings, hitIngredients) && scoreCounter >= 100) {
          mainContainer.classList.add('hide');
          startBtnDiv.classList.add('hide');
          paella.classList.remove('hide');
          finalLevelDone.remove('hide');
        } else {
          losingCondition();
        }
      }
      if(level === 10){
        if(checkAnswers(level10Ings, hitIngredients)){
          mainContainer.classList.add('hide');
          startBtnDiv.classList.add('hide');
          roast.classList.remove('hide');
        } else {
          losingCondition();
        }
      }
      startBtn.disabled = false;
      clearInterval(timerId);
      timeUp = true;
    }
  }

  function startGame() {
    startBtn.disabled = true;
    startMusic.play();
    difficultySettings();
    countdown.textContent = timer;
    if(level === 1) {
      scoreCounter = 0;
      score.textContent = 0;
    }
    timeUp = false;
    peak();
    timerId = setInterval(winningConditions, 1000);
  }


  startBtn.addEventListener('click', startGame);

  function scoreCondtions(e) {
    if(level === 1){
      if(level1Ings.includes(e.target.id)){
        scoreCounter += 5;
      } else if (e.target.id === 'clock') {
        timer += 5;
      } else {
        scoreCounter -= 2;
      }
    }
    if(level === 2){
      if(level2Ings.includes(e.target.id)){
        scoreCounter += 5;
      } else if (e.target.id === 'clock') {
        timer += 5;
      } else {
        scoreCounter -= 2;
      }
    }
    if(level === 3){
      if(level3Ings.includes(e.target.id)){
        scoreCounter += 5;
      } else if (e.target.id === 'clock') {
        timer += 5;
      } else {
        scoreCounter -= 2;
      }
    }
    if(level === 4){
      if(level4Ings.includes(e.target.id)){
        scoreCounter += 5;
      } else if (e.target.id === 'clock') {
        timer += 5;
      } else {
        scoreCounter -= 2;
      }
    }
    if(level === 10){
      if(level10Ings.includes(e.target.id)){
        scoreCounter +=5;
      } else if(e.target.id === 'clock'){
        timer += 5;
      } else {
        scoreCounter -= 2;
      }
    }
  }

  function hit(e) {

    for(let j = 0; j < levelIngredients.length; j++){
      if(e.target.id === levelIngredients[j].textContent){
        levelIngredients[j].classList.add('line-through');
      }
    }

    scoreCondtions(e);

    if(scoreCounter < 0){
      scoreCounter = 0;
    }
    if(e.target.classList.contains('point')){
      hitIngredients.push(e.target.id);
      e.target.classList.add('hide');
    }
    score.textContent = scoreCounter;
  }

  randomImages.forEach(pick => pick.addEventListener('click', hit));

  function nextLevelFunction() {
    hitIngredients= [];
    level ++;
    mainContainer.classList.remove('hide');
    startBtnDiv.classList.remove('hide');
  }

  function nextLevelRecipeFunction() {
    if(level === 1){
      nextLevelFunction();
      spaghettiList.classList.add('hide');
      stirFryList.classList.remove('hide');
      spaghetti.classList.add('hide');
      fiftyPoints.classList.add('hide');
      hundredPoints.classList.remove('hide');
      levelDescription.textContent = 'Level 2: Stir Fry';
      console.log(hitIngredients);
    } else if(level === 2){
      nextLevelFunction();
      stirFry.classList.add('hide');
      burgerList.classList.remove('hide');
      stirFry.classList.add('hide');
      stirFryList.classList.add('hide');
      hundredPoints.classList.add('hide');
      hundredFiftyPoints.classList.remove('hide');
      levelDescription.textContent = 'Level 3: Burger';
    } else if(level === 3){
      nextLevelFunction();
      burgerList.classList.add('hide');
      paellaList.classList.remove('hide');
      burger.classList.add('hide');
      hundredFiftyPoints.classList.add('hide');
      twoHundredPoints.classList.remove('hide');
      levelDescription.textContent = 'Level 4: Paella';
    } else if(level === 4){
      paellaList.classList.add('hide');
      paella.classList.add('hide');
      finalLevelDone.classList.remove('hide');
      congratulationsText.classList.remove('hide');
    }
  }

  for(let i = 0; i < nextLevel.length; i++){
    nextLevel[i].addEventListener('click', nextLevelRecipeFunction);
  }


  function tryAgainFunction() {
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
    burgerList.classList.add('hide');
    stirFryList.classList.add('hide');
    roastList.classList.add('hide');
    paellaList.classList.add('hide');
    fiftyPoints.classList.add('hide');
    hundredPoints.classList.add('hide');
    hundredFiftyPoints.classList.add('hide');
    twoHundredPoints.classList.add('hide');
    threeHundredPoints.classList.add('hide');
    passwordButton.disabled = false;
    disabledButtons();
  }

  tryAgainButton.addEventListener('click', tryAgainFunction);
  finalLevelDoneButton.addEventListener('click', tryAgainFunction);

  toCongratsPageButton.addEventListener('click', () => {
    roast.classList.add('hide');
    thanksForPlaying.classList.remove('hide');
    mainContainer.classList.add('hide');
    startBtnDiv.classList.add('hide');
  });

  thanksForPlayingButton.addEventListener('click', () => {
    thanksForPlaying.classList.add('hide');
    roast.classList.add('hide');
    tryAgainFunction();
  });


});

![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-30 Project 1 - Click 'n' Pick-a-Pot

For our first project, we were given a week to design and build an in-browser game using HTML, CSS and JavaScript. Click 'n' Pick-a-Pot was a product of my own design rather than a remake of an existing game. It requires the player to click on the correct ingredients shown on a list as they pop up whilst avoiding the wrong ones. If the player gets all of the ingredients and the required points they are shown the recipe for a certain dish, depending on the level. The game has 4 levels and a secret bonus level that is only accessed through a password after completing level 4. It also includes 3 difficulty settings.

##### [Visit website](https://wee-words.herokuapp.com/) for best playing experience (the game was not designed for mobile).

---

###### Click 'n' Pick-a-Pot takes place in a 100% CSS-built environment.

<p align="center"><img src="https://i.imgur.com/cVwtEj7.png" width="700"></p>

###### Each level gives the player 60/50/45 seconds (depending on difficulty) to collect the correct ingredients with the requirement of getting a certain number of points. The ingredients that are shown are random and stay on screen for a random amount of time, depending on the difficulty.

<p align="center"><img src="https://i.imgur.com/bV6dWH1.png" width="700"></p>

###### Once the level is completed and if the player has won they're shown a recipe using the ingredients they had to click on

<p align="center"><img src="https://i.imgur.com/yNoirS5.png" width="700"></p>

###### The win logic requires a submitted ingredient to fulfil the conditions depending on the level:

###### * The ingredients clicked on match the ingredients displayed
###### * The player has reached the required number of points

```
function levelOneWinningConditionsFunction() {
  if (level === 1) {
    if (checkAnswers(level1Ings, hitIngredients) && scoreCounter >= 25) {
      mainContainer.classList.add('hide');
      startBtnDiv.classList.add('hide');
      spaghetti.classList.remove('hide');
      winSound.play();
    } else {
      losingCondition();
    }
  }
}
```

###### If level 4 is beaten, the player is presented with a congratulatory message with a password to the secret level.

<p align="center"><img src="https://i.imgur.com/0olouaM.png" width="700"></p>

---
I found making a function that returns a random image pop up for a random amount of time challenging however when I made two separate functions calculating a random time and a random image, merging the two together helped.

---

I was pleased with the final product, which I feel looks good an plays well. The game could be developed into a larger game with new levels and challenges to further test the player’s skills.

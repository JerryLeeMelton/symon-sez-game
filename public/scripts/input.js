// Variables ==================================================================
let buttonColors = ["green", "magenta", "blue", "yellow"];
let gamePattern = [];
let userPattern = [];
let gameRunning = false;
let allowButtonClicks = false;
let delayInterval = 500;
let score = 0;

let gameButtons = $(".game-button");
let startButton = $("#StartButtonInner-Lit");
let scoreDisplay = $("#score-display");

// Functions ==================================================================

function startGame() {
  gameRunning = true;
  gamePattern = [];
  nextSequence();
  playSequence();
}

function nextSequence() {
  gamePattern.push(buttonColors[Math.floor(Math.random() * 4)]);
  userPattern = [];
}

function playSequence() {
  return new Promise((resolve) => {
    var promise = Promise.resolve();

    gamePattern.forEach(function(currentValue, index) {
      promise = promise.then(function() {
        animateButton(currentValue + "Button-Lit", "play");
        playSound(currentValue);
        return new Promise(function(resolve) {
          setTimeout(resolve, delayInterval);
        })
      });
    });
    resolve();
  })
}

function playSound(sound) {
  var output = new Audio("/audio/" + sound + ".mp3");
  output.volume = .1;
  output.play();
}

function animateButton(button) {
  let buttonToAnimate = $("#" + button);
  let animationDuration = 100;

  buttonToAnimate.animate({
    opacity: "1.0"
  }, animationDuration, "swing");

  setTimeout(() => {
    buttonToAnimate.animate({
      opacity: "0"
    }, animationDuration, "swing")
  }, 100);
}

function toggleButtonClicksAllowed() {
  allowButtonClicks = !allowButtonClicks;
}

function lightAllButtons() {
  let animationDuration = 50;
  gameButtons.animate({
    opacity: 1.0
  }, animationDuration, "swing");

  setTimeout(() => {
    gameButtons.animate({
      opacity: "0"
    }, animationDuration, "swing")
  }, 1000);
}

// Game Logic =================================================================

gameButtons.on("click", (event) => {

  if (!gameRunning && !allowButtonClicks) return;

  allowButtonClicks = false;
  userPattern.push(event.target.id.replace("Button-Lit", ""));

  if (userPattern[userPattern.length - 1] !== gamePattern[userPattern.length - 1]) {
    playSound("wrong");
    lightAllButtons();
    gameRunning = false;
    return;
  }

  animateButton(event.target.id);
  playSound(event.target.id.replace("Button-Lit", ""));

  if (userPattern.length !== gamePattern.length) {
    allowButtonClicks = true;
    return;
  }

  scoreDisplay.text(++score);
  nextSequence();
  setTimeout(function() {
    playSequence().then(toggleButtonClicksAllowed());
  }, delayInterval + delayInterval);
});


startButton.on("click", (event) => {
  if (!gameRunning) {
    animateButton(event.target.id);
    score = 0;
    startGame();
  }
});

// Variables ==================================================================
let buttonColors = ["green", "magenta", "blue", "yellow"];
let gamePattern = [];
let userPattern = [];
let gameRunning = false;
let allowButtonClicks = false;
let delayInterval = 500;

let gameButtons = $(".game-button");
let startButton = $("#StartButtonInner-Lit");

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
  var promise = Promise.resolve();

  // THIS PROMISE CODE IS IMPORTANT
  gamePattern.forEach(function(currentValue, index) {
    promise = promise.then(function() {
      animateButton(currentValue + "Button-Lit", "play");
      playSound(currentValue);
      return new Promise(function(resolve) {
        setTimeout(resolve, delayInterval);
      })
    });
  });

  allowButtonClicks = true;
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

// Game Logic =================================================================

gameButtons.on("click", (event) => {

  if (!gameRunning && !allowButtonClicks) return;

  allowButtonClicks = false;
  animateButton(event.target.id);
  userPattern.push(event.target.id.replace("Button-Lit", ""));

  if (userPattern[userPattern.length - 1] !== gamePattern[userPattern.length - 1]) {
    playSound("wrong");
    gameRunning = false;
    return;
  }

  playSound(event.target.id.replace("Button-Lit", ""));

  if (userPattern.length !== gamePattern.length) {
    allowButtonClicks = true;
    return;
  }

  nextSequence();
  setTimeout(function() {
    playSequence();
  }, delayInterval + delayInterval);
});


startButton.on("click", (event) => {
  if (!gameRunning) {
    animateButton(event.target.id);
    startGame();
  }
});

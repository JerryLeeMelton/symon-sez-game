// Variables ==================================================================
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let gameRunning = false;
let allowButtonClicks = false;
let delayInterval = 400;

let testing = true;

let gameButtons = $(".game-button");
let startButton = $("#StartButtonInner");

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
  gamePattern.forEach(function (currentValue, index) {
    promise = promise.then(function () {
      animateButton(currentValue, "play");
      playSound(currentValue);
      return new Promise(function (resolve) {
        setTimeout(resolve, delayInterval);
      })
    });
  });

  allowButtonClicks = true;
}

function playSound(sound) {
  var output = new Audio("sounds/" + sound + ".mp3");
  output.play();
}

function animateButton(button, animationType) {

  console.log($("#" + button));

  let buttonToAnimate = $("#" + button);
  let animationDuration = 100;

  buttonToAnimate.animate({
    opacity: "1.0"
  }, animationDuration, "swing");

  setTimeout(()=>{
    buttonToAnimate.animate({
      opacity: "0"
    }, animationDuration, "swing")
  }, 100);

}

// Game Logic =================================================================

gameButtons.on("click", (event)=> {

  animateButton(event.target.id, "press-button");

  if (gameRunning && allowButtonClicks && !testing) {
    allowButtonClicks = false;

    animateButton(this.id, "press-button");

    userPattern.push(this.id);

    if (userPattern[userPattern.length - 1] === gamePattern[userPattern.length - 1]) {
      playSound(this.id);

      if (userPattern.length === gamePattern.length) {
        nextSequence();
        setTimeout(function() {
          playSequence();
        }, delayInterval + delayInterval);
      } else {
        allowButtonClicks = true;
      }

    } else {
      playSound("wrong");
      $("body").toggleClass("game-over", 10);
      setTimeout(function(){
        $("body").toggleClass("game-over", 10);
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      gameRunning = false;

    }
  }

  $.ajax({
    type: "POST",
    url: "/"
  });
});

startButton.on("click", (event)=> {
  console.log("Start button clicked");
  startGame();
});

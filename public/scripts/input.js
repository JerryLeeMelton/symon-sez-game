let gameButtons = $(".game-button");
let startButton = $("#StartButtonInner");

gameButtons.on("click", (event)=> {
  console.log(event.target.id + " clicked");
});

startButton.on("click", (event)=> {
  console.log("Start button clicked");
});

console.log(gameButtons);

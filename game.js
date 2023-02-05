//empty arrays for game
var userClickedPattern = [];
var gamePattern = [];
var level = 0;

//Button colors
var buttonColor = ["red","blue","green","yellow"];
var randomChosenColor;

//sequence for building levels up
function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

// this starts the game
document.addEventListener("keydown", function(event) {
  if (event.code === "KeyA") {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("h1").text("Level " + level);
    nextSequence();
  }
});



//detects each clicked button and returns a value as id.
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userChosenColor);
});



//this plays sound for sequence
function playSound(color) {
  switch (color) {
    case "green":
      new Audio('sounds/green.mp3').play();
      break;
    case "red":
      new Audio('sounds/red.mp3').play();
      break;
    case "yellow":
      new Audio('sounds/yellow.mp3').play();
      break;
    case "blue":
      new Audio('sounds/blue.mp3').play();
      break;
    default:
      console.log('invalid color');
  }
}


function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}



function checkAnswer(userChosenColor) {
  if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
    //right answer
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    new Audio('sounds/wrong.mp3').play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press 'A' Key to Restart");
    userClickedPattern = [];
  }
}

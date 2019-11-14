var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;

$(document).keypress(function() {
  if (!gameStart) {
    $("#level-title").text("Level "+ level);
    nextSequence();
    gameStart = true;
  }
});

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer((userClickedPattern.length) - 1);

});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else{
    console.log("fail");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Gameover, Press any key to restart!");

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.round((Math.random() * 3));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(trigger) {
  var audio = new Audio("sounds/" + trigger + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}



function startOver(){
  level = 0;
  gamePattern = [];
  gameStart = false;
}

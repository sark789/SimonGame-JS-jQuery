
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keydown", function(event){
  if(!started){
    $("h1").html("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColour);


}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){

          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);

        }

      } else {

        playSound("wrong");
        console.log("wrong");

        $("body").addClass("game-over");
          setTimeout(function(){
            $("body").removeClass("game-over");
          }, 200);

        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
      }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

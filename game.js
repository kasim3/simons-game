var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function() {
    if(!started){
        nextSequence();
        started =true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    var currentLevel = userClickedPattern.length-1;
    checkAnswer(currentLevel);
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel] ){
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function() {
            nextSequence();
        },1000);
        }   
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");  
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
     
}




function playSound(name){
       
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
 }

function animatePress(currentColour){
   
     $("#"+currentColour).addClass("pressed");
    
    setTimeout(function() {
        
      $("#"+currentColour).removeClass("pressed");
      }, 100);

} 
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

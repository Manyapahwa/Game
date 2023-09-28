// ARRAY FOR STORING COLOURS OF BUTTON
var buttonColours=["red", "blue", "green", "yellow"];
//PATTERN OF COLOURS TO BE ADDED IN THIS ARRAY
var gamePattern=[];
//VARIABLE FOR REPRESENTING LEVELS
var level=0;
//VARIABLE FOR CHECKING CORRECT PATTERN CLICKED BY PLAYER
var counter=0;

//WHEN BUTTON IS CLICKED BY PLAYER, IT'LL CHECK FOR CORRECT PATTERN AND WORK ACCORDINGLY
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    play(userChosenColour);
});

$(".btn").on("tap", function(){
    var userChosenColour=$(this).attr("id");
    play(userChosenColour);
});

//PLAY FUNCTION
function play(userChosenColour){
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if(userChosenColour==gamePattern[counter]){
        if(counter==gamePattern.length-1){
            setTimeout(function(){nextSequence();} , 800);
        }
        else{
            counter++;
        }
    }
    else{


        
        gameOver();
    }
}

// GAME OVER FUNCTION
function gameOver(){
    level=0;
    gamePattern.length=0;
    $("h1").html("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    var gameOverSound= new Audio('sounds/wrong.mp3');
    gameOverSound.play();
}

//START FUNCTION
$(document).keypress(function(){
    if(level===0){
        nextSequence();
    }
});

$(document).on("tap", function(){
    if(level===0){
        nextSequence();
    }
});

//FOR COMPUTER'S CLICK
function nextSequence(){
    level+=1;
    $("h1").html("Level "+level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    counter=0;
}

//PLAYS SOUND WHEN PLAYER OR COMPUTER CLICKS A BUTTON
function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

//ANIMATION WHEN BUTTON IS PRESSES BY PLAYER
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

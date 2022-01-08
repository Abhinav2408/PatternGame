var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;
var colors = ["red", "blue" , "green" , "yellow"];
function startover(){
    started = false;
    userPattern = [];
    gamePattern = [];
    level = 0;
}

function check()
{
    if(userPattern[userPattern.length -1] == gamePattern[userPattern.length -1])
    {
        if(userPattern.length == gamePattern.length)
        {
            setTimeout(nextSequence , 1000);
        }
    }
    else
    {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startover();
    }
}
function nextSequence()
{
    level++;
    $("h1").text("Level " + level.toString());
    var x= 4*Math.random();
    x = Math.floor(x);
    $("#" + colors[x]).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + colors[x] + ".mp3");
    audio.play();
    gamePattern.push(colors[x]);
    userPattern = [];
}
function animatePress(color)
{
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    } , 100);
}
for(var i = 0; i<4; i++)
{
    $("#" + colors[i]).on("click" , function(){
        var audio = new Audio("sounds/" + this.id + ".mp3");
        audio.play();
        animatePress(this.id);
        userPattern.push(this.id);
        check();
    });
}
document.addEventListener("keypress", function(){
    if(!started)
    {
        started = true;
        nextSequence();

    }
});
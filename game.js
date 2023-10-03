var buttonColors = ["red","blue","green","yellow"];

var gamePattern =[];
var userClickedPattern =[];
var level=0

// console.log(gamePattern);
console.log("AtTop   "+gamePattern+"   "+userClickedPattern);



var once = false
$(document).keydown(function(){
    // console.log('clicked');
    if(!once){
        nextSequence();
        once = !once;
        
    }
   
   

})

function nextSequence(){
    userClickedPattern = []
    level++;
    $('h1').text(`Level  ${level}`);
    $('#score').text(localStorage.getItem('highScore')?"HighScore "+localStorage.getItem('highScore') : "").css('color','white')

    var randomNumber = Math.floor((Math.random()*4))
    // console.log(randomNumber);
    var randomChosenColor = buttonColors[randomNumber]
    // console.log(randomChosenColor);

    gamePattern.push(randomChosenColor)
    console.log("computer",gamePattern);
    setTimeout(()=>{
        $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);

    },500)

    

 
    //Handle user clicks
    
   
   
}


function animatePress(color){
    $(`#${color}`).addClass('pressed');
    setTimeout(()=>{
        $(`#${color}`).removeClass('pressed');

    },100)

}

$('.btn').click(function(event){
    // console.log(event);
    // console.log(this.id);
    var userChosenColor = this.id
    userClickedPattern.push(userChosenColor)
    console.log("user",userClickedPattern);
    playSound(userChosenColor)
    // music = new Audio(`sounds/${userChosenColor}.mp3`)
    // music.play();
    animatePress(userChosenColor);
    console.log("together   "+gamePattern+"   "+userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
    
})


function playSound(song){

    music = new Audio(`sounds/${song}.mp3`);
    music.play();
    
}


var first = true;
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(()=>{
                nextSequence();

            },500)

        }
        
    }else{
        console.log(level);
        playSound("wrong")
        $('h1').text("Game Over");
        $('h1').append(" At level "+level);
        console.log("reached level" ,level)
        checkHighScore(level);
        setTimeout(()=>{
            gamePattern=[]
            userClickedPattern=[]
            level=0
            nextSequence();

        },2000)
    }
    
    
}

function checkHighScore(level){
    var score = level;
    var highScore = localStorage.getItem('highScore');
    console.log("ggggggggg",highScore);
    if(highScore === null){
       localStorage.setItem('highScore',0)
    }
    if(score > highScore){
                localStorage.setItem('highScore',score)
            }else{
                localStorage.setItem('highScore',highScore)
            }
    

}
       

   
        




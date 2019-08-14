let countdownBoard;
let leftScoreBoard;
let rightScoreBoard;

var field;
var waves;
var balls;
var platforms;

var framerate = 120;                        //  120

var paused = false;

//INITIALIZING                              //  STD VALUES
//countdown
var countFrom = 3;                          //      3

//field
var backgroundClr = 0;                      //      0
var fieldWidth = 700;                        //      700
var fieldHeight = 350;                      //      350

var boxSpace = 1/5;//percentage of width    //      1/5

var fieldInnerLineColor = [10,20,30];       //      30,20,10
var fieldInnerLineCircleRadius = 70;        //      70
var fieldInnerLineThicknes = 3;             //      3

var fieldBoxLinesClr = [100,100,100];       //      100,100,100
var fieldBoxLineThickness = 2;              //      2

var fieldDangerLinesClr = [255,0,0];        //      255,0,0
var fieldDangerLinesThickness = 10;         //      10

var fieldSideLinesClr = [10,255,150]         //      10,20,150
var fieldSideLinesThickness = 10;           //      10




//ball
var numberOfBalls = 2;                      //      1
var ballRadius = 12;                        //      12
var ballSpeed = 0.7;                        //      0.7


//platforms
var numberOfPlatformsPerSide = 1;           //      1

var platformClr = [255,255,255]             //      255,255,255
var platformWidth = 24;                     //      16
var platformHeight = 64;                    //      64
var platformSpeed = 6;                      //      6

function setup() {

    //setting up
    frameRate(framerate);
    createCanvas(fieldWidth,fieldHeight);

    countdownBoard = createGraphics(width, height);
    countdownBoard.clear();
    leftScoreBoard = createGraphics(width, height);
    leftScoreBoard.clear();
    rightScoreBoard = createGraphics(width, height);
    rightScoreBoard.clear();

    field = new Field();
    balls = [];
    for(var i=0; i<numberOfBalls; i++){
        addBall();
    }
    platforms = [];
    for(var i=0; i<numberOfPlatformsPerSide; i++){
        addPlatform("left");
        addPlatform("right");
    }
    waves = [];
}

function draw() {

    background(backgroundClr);

    field.show();

    balls.forEach(ball => {
        ball.show();
        ball.update();
    });
    platforms.forEach(platform => {
        platform.show();
        platform.update();
    });
    
    waves.forEach(wave => {
        wave.show();
        wave.update();
    });

    //countdown();
    showScore();
}

function keyPressed(){
    if(keyCode === 32){
        if(paused){
            resume();
        }
        else{    
            pause();
        }
        this.paused = !this.paused;
    }
}

function addBall(){
    balls.unshift(new Ball(ballRadius, ballSpeed));
}
function removeBall(){
    balls.splice(0,1);
}
function addPlatform(leftOrRight){
    platforms.unshift(new Platform(leftOrRight, platformSpeed, platformWidth, platformHeight));
    return;
}

function pause(){
    balls.forEach(ball => {
        ball.pause();
    });
    platforms.forEach(platform => {
        platform.pause();
    });
    waves.forEach(wave => {
        wave.pause();
    });
}

function resume(){
    console.log("Resume");
    balls.forEach(ball => {
        ball.resume();
    });
    platforms.forEach(platform => {
        platform.resume();
    });
    waves.forEach(wave => {
        wave.resume();
    });
}

var timer = 3;
function countdown(){
    if(timer > 0){
        pause();
        image(countdownBoard,0,0);
    
        if(frameCount % 60 == 0 && timer >= 0){
            countdownBoard.clear();
            timer--;
        }
        countdownBoard.textAlign(CENTER,CENTER);
        countdownBoard.fill(255,0,0);
        countdownBoard.textSize(fieldHeight/6);
        if(timer > 0){
            countdownBoard.text(timer,fieldWidth/2,fieldHeight/2);
        }
        if(timer == 0){
            countdownBoard.text("START",fieldWidth/2,fieldHeight/2);
            resume();
        }
    }
}
var scoreClr = [255,0,0,30];
var hitsOnLeft = 0;
var hitsOnRight = 0;
function showScore(){
    image(leftScoreBoard,0,0);
    image(rightScoreBoard,0,0);
    leftScoreBoard.textAlign(CENTER, CENTER);
    leftScoreBoard.fill(scoreClr);
    leftScoreBoard.textSize(fieldHeight/18);
    leftScoreBoard.text(hitsOnLeft,fieldWidth/15,fieldHeight - fieldHeight/15);
    rightScoreBoard.textAlign(CENTER, CENTER);
    rightScoreBoard.fill(scoreClr);
    rightScoreBoard.textSize(fieldHeight/18);
    rightScoreBoard.text(hitsOnRight,fieldWidth - fieldWidth/15,fieldHeight - fieldHeight/15);
}

function hitsLeft(){
    leftScoreBoard.textAlign(CENTER, CENTER);
    leftScoreBoard.fill(scoreClr);
    leftScoreBoard.textSize(fieldHeight/18);
    leftScoreBoard.clear();
    leftScoreBoard.text(++hitsOnLeft,fieldWidth/15,fieldHeight - fieldHeight/15);
}

function hitsRight(){
    rightScoreBoard.textAlign(CENTER, CENTER);
    rightScoreBoard.fill(scoreClr);
    rightScoreBoard.textSize(fieldHeight/18);
    rightScoreBoard.clear();
    rightScoreBoard.text(++hitsOnRight,fieldWidth - fieldWidth/15,fieldHeight - fieldHeight/15);
}

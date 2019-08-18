let countdownBoard;
let leftScoreBoard;
let rightScoreBoard;

let field;
let waves;
let balls;
let platforms;

let framerate = 120;                        //  120

let paused = false;

//INITIALIZING                              //  STD VALUES
//countdown
let countFrom = 3;                          //      3

//field
let backgroundImg;
let backgroundClr = 0;                      //      0
let fieldWidth = 700;                       //      700
let fieldHeight = 350;                      //      350

let boxSpace = 1/5;//percentage of width    //      1/5

let fieldInnerLineColor = [10,20,30];       //      30,20,10
let fieldInnerLineCircleRadius = 70;        //      70
let fieldInnerLineThicknes = 3;             //      3

let fieldBoxLinesClr = [100,100,100];       //      100,100,100
let fieldBoxLineThickness = 2;              //      2

let fieldDangerLinesClr = [255,0,0];        //      255,0,0
let fieldDangerLinesThickness = 10;         //      10

let fieldSideLinesClr = [10,255,150]         //      10,20,150
let fieldSideLinesThickness = 10;           //      10




//ball
let numberOfBalls = 2;                      //      1
let ballRadius = 12;                        //      12
let ballSpeed = 0.7;                        //      0.7


//platforms
let numberOfPlatformsPerSide = 1;           //      1

let platformClr = [178,154,172];                    //      255,255,255
let platformWidth = 24;                     //      16
let platformHeight = 64;                    //      64
let platformSpeed = 6;                      //      6

function setup() {

    //setting up
    bg = loadImage('./bg.png');
    frameRate(framerate);
    createCanvas(fieldWidth,fieldHeight);

    countdownBoard = createGraphics(fieldWidth, height);
    countdownBoard.clear();
    leftScoreBoard = createGraphics(fieldWidth, height);
    leftScoreBoard.clear();
    rightScoreBoard = createGraphics(fieldWidth, height);
    rightScoreBoard.clear();

    field = new Field();
    balls = [];
    for(let i=0; i<numberOfBalls; i++){
        addBall();
    }
    platforms = [];
    for(let i=0; i<numberOfPlatformsPerSide; i++){
        addPlatform("left");
        addPlatform("right");
    }
    waves = [];

    paused = false;
}

function draw() {
    if(!paused){

        createCanvas(fieldWidth, fieldHeight);
    
        if(width == 700 && height == 350){
            background(bg);
        }else{
            background(backgroundClr);
        }
    
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
        showControlArea();
    }
}

function keyPressed(){
    if(keyCode === 32) paused = !paused;
}

function addPlatform(leftOrRight){
    platforms.unshift(new Platform(leftOrRight, platformSpeed, platformWidth, platformHeight));
    return;
}

let timer = 3;
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
let scoreClr = [255,0,0,30];
let hitsOnLeft = 0;
let hitsOnRight = 0;
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

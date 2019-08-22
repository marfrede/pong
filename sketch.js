let countdownBoard;
let gameOverBoard;

let field;
let waves;
let balls;
let platforms;
let obstacles;

let framerate = 120;                        //  120

let paused = false;
let gameIsOver = false;

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
let ballClr = [255,246,143];                //      255,246,143
let numberOfBalls = 1;                      //      1
let ballRadius = 12;                        //      12
let ballSpeed = 0.7;                        //      0.7


//platforms
let numberOfPlatformsPerSide = 1;           //      1
let mouseControllingR = false;              //      false
let mouseControllingL = false;              //      false

let platformClr = [178,154,172];                    //      255,255,255
let platformWidth = 24;                     //      16
let platformHeight = 64;                    //      64
let platformSpeed = 6;                      //      6

//obstacles
let numberOfObstacles = 0;                  //      0
let obstacleClr = [162,121,13];             //      162,121,13
let obstacleWidth = 40;                     //      70
let obstacleHeight = 40;                    //      30
let obstLifeTime = 30;                     //      30 Sekunden

//score II
let bounceCounter = 0;

function setup() {

    //setting up
    bg = loadImage('./bg.png');
    frameRate(framerate);
    createCanvas(fieldWidth,fieldHeight);

    countdownBoard = createGraphics(fieldWidth, height);
    gameOverBoard = createCanvas(fieldWidth, fieldHeight);

    field = new Field();
    balls = [];
    platforms = [];
    obstacles = [];
    for(let i=0; i<numberOfPlatformsPerSide; i++){
        addPlatform("left");
        addPlatform("right");
    }
    for(let i=0; i<numberOfObstacles; i++){
        addObstacle();
    }
    waves = [];
    addBall(numberOfBalls);

    paused = false;
}

function draw() {

    createCanvas(fieldWidth, fieldHeight);

    if(width == 700 && height == 350){
        background(bg);
    }else{
        background(backgroundClr);
    }

    field.showInner();

    balls.forEach((ball, index) => {
        if(!paused) ball.update();
        if(ball.lifetime == 0){
            balls.splice(index,1);
        }
        ball.show();
    });
    platforms.forEach(platform => {
        platform.show();
        if(!paused) platform.update();
    });
    
    obstacles.forEach((obstacle, index) => {
        obstacle.show();
        if(!paused){
            obstacle.update();
        }else{
            obstacle.spawnFrame++;
        }
        if(obstacle.dies()){
            obstacles.splice(index,1);
        }
    });
    
    waves.forEach(wave => {
        wave.show();
        if(!paused) wave.update();
    });

    showControlArea();
    gameOver();
    //countdown();

    field.showOuter();
    
}

function keyPressed(){
    if(keyCode === 32){
        paused = !paused;
        if(gameIsOver) location.reload();
    } 
}

function addPlatform(leftOrRight){
    platforms.unshift(new Platform(leftOrRight, platformSpeed, platformWidth, platformHeight));
    return;
}

let timer = 3;
function countdown(){
    if(timer >= 0){
        paused = true;
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
        else{
            paused = false;
            countdownBoard.text("START",fieldWidth/2,fieldHeight/2);
        }
    }
}

let leftLives = 10000;
let rightLives = 10000;

function hitsLeft(){
    if(!gameIsOver) leftLives = --leftLives < 0? 0 : leftLives;
}

function hitsRight(){
    if(!gameIsOver) rightLives = --rightLives < 0? 0 : rightLives;
}

function gameOver(){
    if(leftLives <= 0 || rightLives <= 0){
        //paused = true;
        if(!gameIsOver) addBall(250);
        if(frameCount % 20 == 0) if(balls.length < 250) addBall(5);
        gameIsOver = true;
        image(gameOverBoard,0,0);
        gameOverBoard.textAlign(CENTER,CENTER);
        gameOverBoard.textSize(fieldHeight/6);
        gameOverBoard.text("GAME OVER", fieldWidth/2, fieldHeight/2);
        gameOverBoard.textSize(fieldHeight/12);
        if(leftLives <= 0){
            gameOverBoard.text("Right Player Wins", fieldWidth/2, fieldHeight - fieldHeight/3);
        }else{
            gameOverBoard.text("Left Player Wins", fieldWidth/2, fieldHeight - fieldHeight/3);
        }
        gameOverBoard.textSize(fieldHeight/15);
        gameOverBoard.text("HIT SPACE FOR NEW GAME", fieldWidth/2, fieldHeight - fieldHeight/6);
        
    }
}

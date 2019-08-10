var field;
var waves;
var balls;
var platforms;

var leftBorderX;
var rightBorderX;

var framerate = 120;

//INITIALIZING                              //  STD VALUES
//field
var fieldWith = 700;                        //      700
var fieldHeigth = 350;                      //      350

var boxSpace = 1/5;//percentage of width    //      1/5

var fieldInnerLineColor = [10,20,30];       //      30,20,10
var fieldInnerLineCircleRadius = 70;        //      70
var fieldInnerLineThicknes = 3;             //      3

var fieldBoxLinesClr = [100,100,100];       //      100,100,100
var fieldBoxLineThickness = 2;              //      2

var fieldDangerLinesClr = [255,0,0];        //      255,0,0
var fieldDangerLinesThickness = 10;         //      10

var fieldSideLinesClr = [10,20,150]         //      10,20,150
var fieldSideLinesThickness = 10;           //      10



//waves

//ball
var numberOfBalls = 1;                      //      1
var ballRadius = 12;                        //      12
var ballSpeed = 0.7;                        //      0.7

//platforms
var numberOfPlatformsPerSide = 1;           //      1
var platformWidth = 16;                     //      16
var platformHeight = 64;                    //      64
var platformSpeed = 6;                      //      6

function setup() {

    //setting up
    createCanvas(fieldWith,fieldHeigth);
    frameRate(framerate);

    leftBorderX = width * boxSpace;
    rightBorderX = width - (width * boxSpace);

    field = new Field(
        fieldInnerLineColor,
        fieldInnerLineCircleRadius,
        fieldInnerLineThicknes,

        fieldBoxLinesClr,
        fieldBoxLineThickness,

        fieldDangerLinesClr,
        fieldDangerLinesThickness,

        fieldSideLinesClr,
        fieldSideLinesThickness
    );
    wave = new Wave(200,100);
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
    field.show(width, height, boxSpace);
    balls.forEach(ball => {
        ball.show();
        ball.update(width, height, platforms);
        if(ball.touchesLeftWall()) addWaveAt(0, ball.pos.y, fieldDangerLinesClr);
        if(ball.touchesBottomWall(height)) addWaveAt(ball.pos.x, height, fieldSideLinesClr);
        if(ball.touchesRightWall(width)) addWaveAt(width, ball.pos.y, fieldDangerLinesClr);
        if(ball.touchesTopWall()) addWaveAt(ball.pos.x, 0, fieldSideLinesClr);
    });
    platforms.forEach(platform => {
        platform.show();
        if(platform.left)
        platform.update(leftBorderX, width, height);
        else
        platform.update(rightBorderX, width, height);
    });
    
    waves.forEach(wave => {
        wave.show();
        wave.update();
    });
}

function addBall(){
    balls.unshift(new Ball(width, height,ballRadius,ballSpeed));
}
function addPlatform(leftOrRight){
    platforms.unshift(new Platform(leftOrRight,width, height, boxSpace,platformSpeed,platformWidth,platformHeight));
    return;
}
function addWaveAt(x, y, strkclr){
    waves.splice(5,1);
    waves.unshift(new Wave(x,y,strkclr));
}

var field;

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
}

function draw() {
    field.show(width, height, boxSpace);
    balls.forEach(ball => {
        ball.show();
        ball.update(width, height, platforms);
    });
    platforms.forEach(platform => {
        platform.show();
        if(platform.left)
        platform.update(leftBorderX, width, height);
        else
        platform.update(rightBorderX, width, height);
    });
    console.log("(",balls[0].pos.x,",",balls[0].pos.y,")");
}

function addBall(){
    balls.unshift(new Ball(width, height,ballRadius,ballSpeed));
}
function addPlatform(leftOrRight){
    platforms.unshift(new Platform(leftOrRight,width, height, boxSpace,platformSpeed,platformWidth,platformHeight));
    return;
}

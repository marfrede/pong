function showControlArea(){

    platforms.forEach(pl => {
        if(pl.left){
            $('#pllw').text(pl.w);    
            $('#pllh').text(pl.h);    
        }else{
            $('#plrw').text(pl.w);    
            $('#plrh').text(pl.h);  
        }
    });


    $(document).ready(function () {
        //DISPLAY CURRENT VALUES
        $('#ballNr').text(balls.length);    
        $('#fW').text(fieldWidth);    
        $('#fH').text(fieldHeight);    
        $('#leftscore').text(leftLives);    
        $('#rightscore').text(rightLives);    
        $('#numberOfObstacles').text(obstacles.length);    
        $('#bounceCounter').text(bounceCounter);    
        
        if(mouseControllingR){
            $('#rightCtrlToggle .active').addClass('btn-secondary');
            $('#rightCtrlToggle .active').removeClass('active');
            $('#rightCtrlToggle .mouse').addClass('btn-success');
            $('#rightCtrlToggle .mouse').addClass('active');
        }else{
            $('#rightCtrlToggle .active').addClass('btn-success');
            $('#rightCtrlToggle .mouse').addClass('btn-secondary');
        }
        
        if(mouseControllingL){
            $('#leftCtrlToggle .active').addClass('btn-secondary');
            $('#leftCtrlToggle .active').removeClass('active');
            $('#leftCtrlToggle .mouse').addClass('btn-success');
            $('#leftCtrlToggle .mouse').addClass('active');
        }else{
            $('#leftCtrlToggle .active').addClass('btn-success');
            $('#leftCtrlToggle .mouse').addClass('btn-secondary');
        }
    });
    
}

//BALLS
function addBall(nr=1){
    let maxLT = 50+obstacles.length*10;
    let minLT = 10+obstacles.length*10;
    for(; nr > 0; nr--){
        let lt1 = ceil(random(minLT/2,maxLT/2));
        let lt2 = ceil(random(minLT/2,maxLT/2));
        let lt = lt1+lt2;
        if(balls.length == 0) lt = -1;
        balls.unshift(new Ball(ballRadius, ballSpeed, lt));
    }
}
function removeBall(nr=1){
    for(;nr>0;nr--){
        balls.splice(random(0, balls.length-1),1);
    }
}

//FIELD
let stdFieldW = 700;
let stdFieldH = 350;
function moreWidth(){
    fieldWidth += 20;
}
function lessWidth(){
    if(fieldWidth > 180) fieldWidth -= 20;
}
function moreHeight(){
    fieldHeight += 20;
}
function lessHeight(){
    if(fieldHeight > 30) fieldHeight -= 20;
}
function defaultField(){
    fieldWidth = stdFieldW;
    fieldHeight = stdFieldH;
}

//PLATFORMs
let plFactor = 1.5;
let stdPlW = 24;
let stdPlH = 64;
function morePlWidth(leftBool){
    platforms.forEach(pl => {
        if((pl.left && leftBool) || (!pl.left && !leftBool)){
            let plw = ceil(pl.w + plFactor * stdPlW);
            if(plw < fieldWidth * boxSpace) pl.w = plw;
        }
    });
}

function lessPlWidth(leftBool){
    platforms.forEach(pl => {
        if((pl.left && leftBool) || (!pl.left && !leftBool)){
            let plw = ceil(pl.w - plFactor * stdPlW);
            if(plw > stdPlW) pl.w = plw;
            else{
                pl.w = stdPlW;
            }
        }
    });
}
function morePlHeight(leftBool){
    platforms.forEach(pl => {
        if((pl.left && leftBool) || (!pl.left && !leftBool)){
            let plh = ceil(pl.h + plFactor + stdPlH); 
            if(plh < fieldHeight) pl.h = plh;
        }
    });
}

function lessPlHeight(leftBool){
    platforms.forEach(pl => {
        if((pl.left && leftBool) || (!pl.left && !leftBool)){
            let plh = ceil(pl.h - plFactor * stdPlH);
            if(plh > stdPlH) pl.h = plh;
            else{
                pl.h = stdPlH;
            }
        }
    });
}

function changeCtrlR(){
    mouseControllingR = !mouseControllingR;
    $('#rightCtrlToggle .active').addClass('btn-secondary');
    $('#rightCtrlToggle .active').removeClass('btn-success');
    $('#rightCtrlToggle .btn:not(.active)').addClass('btn-success');
    $('#rightCtrlToggle .btn:not(.active)').removeClass('btn-secondary');
    $('#rightCtrlToggle .active').removeClass('active');
    $('#rightCtrlToggle .btn-success').addClass('active');
}

function changeCtrlL(){
    mouseControllingL = !mouseControllingL;
    $('#leftCtrlToggle .active').addClass('btn-secondary');
    $('#leftCtrlToggle .active').removeClass('btn-success');
    $('#leftCtrlToggle .btn:not(.active)').addClass('btn-success');
    $('#leftCtrlToggle .btn:not(.active)').removeClass('btn-secondary');
    $('#leftCtrlToggle .active').removeClass('active');
    $('#leftCtrlToggle .btn-success').addClass('active');
}

function turnPl(leftBool){

}

function defaultPlatform(leftBool){
    platforms.forEach(pl => {
        if((pl.left && leftBool) || (!pl.left && !leftBool)){
            pl.w = stdPlW;
            pl.h = stdPlH;
        }
    });
}

//OBSTACLEs
function addObstacle(){
    let o = new Obstacle(obstacleWidth, obstacleHeight);
    if(o.pos.x != 0){
        obstacles.unshift(o);
    }else{
        console.log("fail");
    }
    return;
}

function removeObstacle(){
    obstacles.splice(random(0, obstacles.length-1),1);
}


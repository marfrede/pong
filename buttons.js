function showControlArea(){

    platforms.forEach(pl => {
        if(pl.left){
            document.getElementById('pllw').innerHTML = pl.w;
            document.getElementById('pllh').innerHTML = pl.h; 
        }else{
            document.getElementById('plrw').innerHTML = pl.w;
            document.getElementById('plrh').innerHTML = pl.h; 
        }
    });

    document.getElementById('ballNr').innerHTML = balls.length;
    document.getElementById('fW').innerHTML = fieldWidth;
    document.getElementById('fH').innerHTML = fieldHeight;
    document.getElementById('leftscore').innerHTML = leftLives;
    document.getElementById('rightscore').innerHTML = rightLives;
}

//BALLS
let maxLT = 50;
let minLT = 10;
function addBall(nr=1){
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


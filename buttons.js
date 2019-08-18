function showControlArea(){

    document.getElementById('ballNr').innerHTML = balls.length;
    document.getElementById('fW').innerHTML = fieldWidth;
    document.getElementById('fH').innerHTML = fieldHeight;
}

function addBall(){
    balls.unshift(new Ball(ballRadius, ballSpeed));
}
function removeBall(){
    balls.splice(0,1);
}
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
    fieldWidth = 700;
    fieldHeight = 350;
}
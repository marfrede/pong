let timesToPush = 10;
let reductionFactor = 0.95;

class Platform{
    constructor(side, speed, platfW, platfH){
        this.w = platfW;
        this.h = platfH;
        this.speed = speed;
        this.pushSpeed = [0,0,0,0]; //left right up down
        this.pushCounter = [0,0,0,0];

        var y = random(this.h/2, fieldHeight - this.h/2);
        if(side === "left"){
            this.left = true;
            var x = (fieldWidth * boxSpace)/2;
            this.pos = createVector(x, y);
            this.boundaryX = fieldWidth * boxSpace;
        }
        if(side === "right"){
            this.left = false;
            var x = fieldWidth-((fieldWidth * boxSpace)/2);
            this.pos = createVector(x, y);
            this.boundaryX = fieldWidth - (fieldWidth * boxSpace);
        }
        this.lastPos = createVector(0,0);
    }

    show(){
        fill(platformClr);
        noStroke();
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    update(){

        //dynamic field width/height
        if(this.left){
            this.boundaryX = fieldWidth * boxSpace;
            if(this.pos.x + this.w/2 >= this.boundaryX) this.pos.x = this.boundaryX - this.w/2;
        }
        else{
            this.boundaryX = fieldWidth - (fieldWidth * boxSpace);
            if(this.pos.x - this.w/2 <= this.boundaryX) this.pos.x = this.boundaryX + this.w/2;
            if(this.pos.x + this.w/2 >= fieldWidth) this.pos.x = fieldWidth - this.w/2;
        }
        if(this.pos.y + this.h/2 > fieldHeight) this.pos.y = fieldHeight - this.h/2;
        //end dynamic field width/height

        this.lastPos = this.pos.copy();
        if(this.left){  //move left platform with w a s d
            if(keyIsDown(65)) this.moveLeftLeft();              //a
            if(keyIsDown(68)) this.moveLeftRight(this.boundaryX);    //d
            if(keyIsDown(87)) this.moveUp();                //w
            if(keyIsDown(83)) this.moveDown(fieldHeight);        //s
        }else{          //move right platform with arrows
            if(keyIsDown(LEFT_ARROW)) this.moveRightLeft(this.boundaryX);
            if(keyIsDown(RIGHT_ARROW)) this.moveRightRight(fieldWidth);
            if(keyIsDown(UP_ARROW)) this.moveUp();
            if(keyIsDown(DOWN_ARROW)) this.moveDown(fieldHeight);
            
        }
        this.push();

    }

    moveLeftLeft(){
        var posx = this.pos.x - this.speed;
        if(posx >= this.w/2) this.pos.x = posx;
    }
    moveLeftRight(boundaryX){
        var posx = this.pos.x + this.speed;
        if(posx <= this.boundaryX - this.w/2) this.pos.x = posx;
    }
    moveRightLeft(boundaryX){
        var posx = this.pos.x - this.speed;
        if(posx >= this.boundaryX + this.w/2) this.pos.x = posx;
    }
    moveRightRight(fieldWidth){
        var posx = this.pos.x + this.speed;
        if(posx <= fieldWidth - this.w/2) this.pos.x = posx;
    }
    moveUp(){
        var posy = this.pos.y - this.speed;
        if(posy >= this.h/2) this.pos.y = posy;
    }
    moveDown(fieldHeight){
        var posy = this.pos.y + this.speed;
        if(posy <= fieldHeight - this.h/2) this.pos.y = posy;
    }

    push(){
        if(this.pushCounter[0] > 0){
            let posx = this.pos.x + this.pushSpeed[0];
            if(this.left){     
                if(posx >= this.w/2) this.pos.x = posx;
            }else{
                if(posx >= this.boundaryX + this.w/2) this.pos.x = posx;
            }
            this.pushCounter[0]--;
            this.pushSpeed[0] *= reductionFactor;
            
        }
        if(this.pushCounter[1] > 0){
            let posx = this.pos.x + this.pushSpeed[1]; 
            if(this.left){     
                if(posx <= this.boundaryX - this.w/2) this.pos.x = posx;
            }else{
                if(posx <= fieldWidth - this.w/2) this.pos.x = posx;
            }
            this.pushCounter[1]--;
            this.pushSpeed[1] *= reductionFactor; 
        }
        if(this.pushCounter[2] > 0){
            let posy = this.pos.y + this.pushSpeed[2]; 
            if(posy >= this.h/2) this.pos.y = posy;
            this.pushCounter[2]--;
            this.pushSpeed[2] *= reductionFactor; 
        }
        if(this.pushCounter[3] > 0){
            let posy = this.pos.y + this.pushSpeed[3]; 
            if(posy <= fieldHeight - this.h/2) this.pos.y = posy;
            this.pushCounter[3]--;
            this.pushSpeed[3] *= reductionFactor; 
        }
        
    }

    pushLeft(ballxspeed){
        this.pushCounter[0] = timesToPush;
        this.pushSpeed[0] = ballxspeed;
    }
    pushRight(ballxspeed){
        this.pushCounter[1] = timesToPush;
        this.pushSpeed[1] = ballxspeed;
    }
    pushUp(ballyspeed){
        this.pushCounter[2] = timesToPush;
        this.pushSpeed[2] = ballyspeed;
    }
    pushDown(ballyspeed){
        this.pushCounter[3] = timesToPush;
        this.pushSpeed[3] = ballyspeed;
    }

    getTopLeft(){
        return createVector(this.pos.x - this.w/2, this.pos.y - this.h/2);
    }
    getBottomLeft(){
        return createVector(this.pos.x - this.w/2, this.pos.y - this.h/2 + this.h);
    }
    getTopRight(){
        return createVector(this.pos.x + this.w/2, this.pos.y - this.h/2);
    }
    getBottomRight(){
        return createVector(this.pos.x + this.w/2, this.pos.y - this.h/2 + this.h);
    }

    getInnerTop(){
        if(this.left)  return this.getTopRight();
        else            return this.getTopLeft();
    }
    getOuterBottom(){
        if(this.left)  return this.getBottomLeft();
        else            return this.getBottomRight();
    }

    isMoving(){
        return !(this.pos.equals(this.lastPos));
    }
    isMovingInwards(){
        if(this.isMoving()){
            if(!this.left){
                if(this.pos.x < this.lastPos.x){
                    return true;
                }
            }
            else{
                if(this.pos.x > this.lastPos.x){
                    return true;
                }
            }
        }
        return false;
    }
    isMovingOutwards(){
        if(this.isMoving()){
            if(!this.left){
                if(this.pos.x > this.lastPos.x){
                    return true;
                }
            }
            else{
                if(this.pos.x < this.lastPos.x){
                    return true;
                }
            }
        }
        return false;
    }

}
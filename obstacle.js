let timesToPush = 10;
let reductionFactor = 0.95;

let minX = boxSpace * fieldWidth + w/2;
let maxX = fieldWidth - minX;
let minY = h/2;
let maxY = fieldHeight - minY;

class Obstacle{
    constructor(w, h){
        this.w = w;
        this.h = h;
        this.pos = createVector(random(minX, maxX), random(minY, maxY));
        this.pushSpeed = [0,0,0,0]; //left right up down
        this.pushCounter = [0,0,0,0];
    }

    show(){
        fill([50]);
        noStroke();
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    update(){
        if(!this.paused){
        this.lastPos = this.pos.copy();
        this.moveRandom();
        this.push();
        }
    }

    moveRandom(){
        let x = this.pos.x + random(-5,5);
        let y = this.pos.y + random(-5,5);
        this.pos.x = constrain(x, minX, maxX);
        this.pos.y = constrain(y, minY, maxY);
    }

    pause(){
        this.paused = true;
    }

    resume(){
        this.paused = false;
    }

    push(){
        if(this.pushCounter[0] > 0){
            let x = this.pos.x + this.pushSpeed[0];
            this.pos.x = constrain(x, minX, maxX);
            this.pushCounter[0]--;
            this.pushSpeed[0] *= reductionFactor;
            
        }
        if(this.pushCounter[1] > 0){
            let posx = this.pos.x + this.pushSpeed[1]; 
            let x = this.pos.x + this.pushSpeed[0];
            this.pos.x = constrain(x, minX, maxX);
            this.pushCounter[1]--;
            this.pushSpeed[1] *= reductionFactor; 
        }
        if(this.pushCounter[2] > 0){
            let y = this.pos.y + this.pushSpeed[2]; 
            this.pos.y = constrain(y, minY, maxY);
            this.pushCounter[2]--;
            this.pushSpeed[2] *= reductionFactor; 
        }
        if(this.pushCounter[3] > 0){
            let posy = this.pos.y + this.pushSpeed[3]; 
            this.pos.y = constrain(y, minY, maxY);
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
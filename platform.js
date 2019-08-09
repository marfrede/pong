class Platform{
    constructor(side, fieldW, fieldH, boxSpace, speed=6, platfW=16, platfH=64){
        this.w = platfW;
        this.h = platfH;
        this.speed = speed;

        var y = random(this.h/2, fieldH - this.h/2);
        if(side === "left"){
            this.left = true;
            var x = (fieldW * boxSpace)/2;
            this.pos = createVector(x, y);
        }
        if(side === "right"){
            this.left = false;
            var x = fieldW-((fieldW * boxSpace)/2);
            this.pos = createVector(x, y);
        }
        this.lastPos = createVector(0,0);
    }

    show(){
        fill(255);
        noStroke();
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    update(boundaryX, fieldW, fieldH){
        this.lastPos = this.pos.copy();
        if(this.left){  //move left platform with w a s d
            if(keyIsDown(65)) this.moveLeftLeft();              //a
            if(keyIsDown(68)) this.moveLeftRight(boundaryX);    //d
            if(keyIsDown(87)) this.moveUp();                //w
            if(keyIsDown(83)) this.moveDown(fieldH);        //s
        }else{          //move right platform with arrows
            if(keyIsDown(LEFT_ARROW)) this.moveRightLeft(boundaryX);
            if(keyIsDown(RIGHT_ARROW)) this.moveRightRight(fieldW);
            if(keyIsDown(UP_ARROW)) this.moveUp();
            if(keyIsDown(DOWN_ARROW)) this.moveDown(fieldH);
        }
    }

    moveLeftLeft(){
        var posx = this.pos.x - this.speed;
        if(posx >= this.w/2) this.pos.x = posx;
    }
    moveLeftRight(boundaryX){
        var posx = this.pos.x + this.speed;
        if(posx <= boundaryX - this.w/2) this.pos.x = posx;
    }
    moveRightLeft(boundaryX){
        var posx = this.pos.x - this.speed;
        if(posx >= boundaryX + this.w/2) this.pos.x = posx;
    }
    moveRightRight(fieldW){
        var posx = this.pos.x + this.speed;
        if(posx <= fieldW - this.w/2) this.pos.x = posx;
    }
    moveUp(){
        var posy = this.pos.y - this.speed;
        if(posy >= this.h/2) this.pos.y = posy;
    }
    moveDown(fieldH){
        var posy = this.pos.y + this.speed;
        if(posy <= fieldH - this.h/2) this.pos.y = posy;
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
let randMovm = 10;
class Obstacle{
    constructor(w, h){

        this.spawnFrame = frameCount;
        this.initLifeTime = random(obstLifeTime/3,obstLifeTime*3) * 60;
        this.lifeTime = this.initLifeTime;
        this.w = random(w/2,w*2);
        this.h = random(h/2,h*2);
       
        this.pos = findFreeSpot(w, h);
        
        this.pushSpeed = [0,0,0,0]; //left right up down
        this.pushCounter = [0,0,0,0];
        this.lastPos = this.pos.copy();
    }

    show(){
        this.alpha = map(this.lifeTime,0,this.initLifeTime,30,255)
        let clr = obstacleClr;
        clr[3] = this.alpha;
        fill(clr);
        noStroke();
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    update(){
        if(!this.paused){
        this.lastPos = this.pos.copy();
        if(frameCount%ceil(random(2,6)) == 0){
            this.moveRandom(this.w, this.h);
        }
        this.push(this.w, this.h);
        }
        this.lifeTime--;
        this.dies();
    }

    moveRandom(w, h){
        let minX = boxSpace * fieldWidth + w/2;
        let maxX = fieldWidth - minX;
        let minY = h/2;
        let maxY = fieldHeight - minY;

        let x = this.pos.x + random(-randMovm,randMovm);
        let y = this.pos.y + random(-randMovm,randMovm);
        x = constrain(x, minX, maxX);
        y = constrain(y, minY, maxY);
        if(isFree(x, y, w, h, false)){
            this.pos.x = x;
            this.pos.y = y;
        }
    }

    pause(){
        this.paused = true;
    }

    resume(){
        this.paused = false;
    }

    push(w, h){
        
        let minX = boxSpace * fieldWidth + w/2;
        let maxX = fieldWidth - minX;
        let minY = h/2;
        let maxY = fieldHeight - minY;

        if(this.pushCounter[0] > 0){
            let x = this.pos.x + this.pushSpeed[0];
            this.pos.x = constrain(x, minX, maxX);
            this.pushCounter[0]--;
            this.pushSpeed[0] *= reductionFactor;
            
        }
        if(this.pushCounter[1] > 0){
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
            let y = this.pos.y + this.pushSpeed[3]; 
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
    approachesX(something){
        if(something.pos){
            if(this.pos.x >= something.pos.x && this.goesLeft())    return true;
            if(this.pos.x <= something.pos.x && this.goesRight())   return true;
            return false;
        }else{
            return new Error("Wrong Type!");
        }
        //performance!
    }
    goesLeft(){
        if(this.pos.x < this.lastPos.x){
            return true;
        }
    }
    goesRight(){
        if(this.pos.x > this.lastPos.x){
            return true;
        }
    }

    approachesY(something){
        if(something.pos){
            if(this.pos.y >= something.pos.y && this.goesUp())      return true;
            if(this.pos.y <= something.pos.y && this.goesDown())    return true;
            return false;
        }else{
            return new Error("Wrong Type!");
        }
        //performance!
    }

    dies(){
        if(this.lifeTime - 15 <= 0){
            if(frameCount%2==0){
                addWaveAt(this.pos.x, this.pos.y, this.h+this.w, obstacleClr, this.alpha);
            }
        }
        if(this.lifeTime <= 0){
            addWaveAt(this.pos.x, this.pos.y, this.h+this.w, obstacleClr, this.alpha);
            return true;
        }
        return false;
        // if(frameCount + 15 > this.spawnFrame + this.initLifeTime ){
        //     if(frameCount%2==0){
        //         addWaveAt(this.pos.x, this.pos.y, this.h+this.w, obstacleClr);
        //     }
        // }
    }

}

function findFreeSpot(w, h){
    let minX = boxSpace * fieldWidth + w/2;
    let maxX = fieldWidth - minX;
    let minY = h/2;
    let maxY = fieldHeight - minY;

    let x;
    let y;
    let nrOfTries = 0;

    do{
        x = random(minX,maxX);
        y = random(minY,maxY);
        if(nrOfTries >= 1000){
            return createVector(0,0);
        }
        nrOfTries++;
        if(nrOfTries > 1) console.log(nrOfTries);
    }while(!isFree(x,y,w,h,true));
    

    return createVector(x, y);
}

function isFree(myX, myY, myW, myH, isInitial){
   // if(isInitial) return true;
    if(obstacles.length == 0) return true;
    let counter = 0;
    for(let i = 0; i<obstacles.length; i++){
        let o = obstacles[i];
        //x
        if(!(abs(myX - o.pos.x) < myW/2 + o.w/2 && abs(myY - o.pos.y) < myH/2 + o.h/2)){
            //y
                counter++;
        }
    }
    if(isInitial){
        if(counter == obstacles.length){
            return true;
        }
        return false;
    }else{
        if(counter == obstacles.length-1){
            return true;
        }
        return false;
    }
}
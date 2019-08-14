class Ball{
    constructor(radius,speedfactor){
        this.paused = false;
        this.r = random(radius-radius*1/3,radius+radius*1/3);
        var dir = (random(0,9)<=4)? -1 : 1;
        this.speedX = dir * random(4,5) * speedfactor; 
        dir = (random(0,9)<=4)? -1 : 1;
        this.speedY = dir * random(3,4) * speedfactor;
        this.initSpeedX =  this.speedX;
        let xMin = fieldWith/2 - fieldInnerLineCircleRadius + this.r;
        let xMax = fieldWith/2 + fieldInnerLineCircleRadius - this.r;
        let yMin = fieldHeigth/2 - fieldInnerLineCircleRadius + this.r;
        let yMax = fieldHeigth/2 + fieldInnerLineCircleRadius - this.r;
        this.pos = createVector( random(xMin, xMax),random(yMin, yMax));
        this.field = field;
    }

    show(){
        ellipseMode(CENTER);
        fill(255,246,143);
        noStroke(); 
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }

    update(){ 
        if(!this.paused){

        this.pos.x += this.speedX;
        this.pos.y += this.speedY;

        if(this.touchesLeftWall()){
            addWaveAt(0, this.pos.y, this.r + this.r * 1/2, fieldDangerLinesClr);
            this.goRight();
            this.goSlower();
            rightScores();
        }

        if(this.touchesRightWall(width)){
            addWaveAt(width, this.pos.y,  this.r + this.r * 1/2, fieldDangerLinesClr)
            this.goLeft();
            this.goSlower();
            leftScores();
        }

        if(this.touchesTopWall()){
            addWaveAt(this.pos.x, 0, this.r + this.r * 1/2, fieldSideLinesClr);
            this.goDown();
        }

        if(this.touchesBottomWall(height)){
            addWaveAt(this.pos.x, height,  this.r + this.r * 1/2, fieldSideLinesClr);
            this.goUp();
        }

        platforms.forEach(platform => {
            if(this.approachesX(platform)){
                if(this.touchesPlatformInner(platform)){
                    if(platform.isMovingInwards()){
                        this.goFaster();
                    }else{
                        this.goSlower();
                    }
                    if(platform.left){
                        platform.pushLeft(this.speedX);
                        this.goRight();
                    }   
                    else{
                        platform.pushRight(this.speedX);
                        this.goLeft();
                    }   

                }
                if(this.touchesPlatformOuter(platform)){
                    if(platform.isMovingOutwards()){
                        this.goFaster();
                    }else{
                        this.goSlower();
                    }
                    if(platform.left){
                        platform.pushRight(this.speedX);
                        this.goLeft();
                    }
                    else{
                        console.log("this.speedx=",this.speedX);
                        platform.pushLeft(this.speedX);
                        this.goRight();
                    }

                }
            }else{
                if(this.touchesPlatformInner(platform)){
                    if(platform.isMovingInwards()){
                        if(platform.left){
                            this.stickRight();
                        }
                        else{
                            this.stickLeft();
                        }
                    }
                }
                if(this.touchesPlatformOuter(platform)){
                    if(platform.isMovingOutwards()){
                        if(platform.left){
                            this.stickLeft();
                        }
                        else{
                            this.stickRight();
                        }
                    }
                }
            }

            if(this.approachesY(platform)){
                if(this.touchesPlatformBottom(platform)){
                    platform.pushUp(this.speedY);
                    this.goDown();
                }
                if(this.touchesPlatformTop(platform)){
                    platform.pushDown(this.speedY);
                    this.goUp();
                }
            }
            else{
                if(this.touchesPlatformBottom(platform)){
                    this.stickDown(platform);
                }
                if(this.touchesPlatformTop(platform)){
                    this.stickUp(platform);
                }
            }
        });

        }
    }

    pause(){
        this.paused = true;
    }

    resume(){
        this.paused = false;
    }

    setNewRandomSpeedY(){
        var newSpeedY = random(-4,+4);
        if(newSpeedY < 0){
            this.speedY = constrain(newSpeedY,-4,-2);
        }else{
            this.speedY = constrain(newSpeedY,2,4);
        }
    }

    touchesTopWall(){ if(this.pos.y <= this.r) return true;}
    touchesBottomWall(h){ if(this.pos.y >= h-this.r) return true;}
    touchesLeftWall(){ if(this.pos.x <= this.r) return true;  }
    touchesRightWall(w){ if(this.pos.x >= w-this.r) return true; }

    touchesPlatformInner(platform){
        var it = platform.getInnerTop();
        var ob = platform.getOuterBottom();
        var dist = abs(this.pos.x - it.x);
        if(dist <= this.r){
            if(this.pos.y >= it.y && this.pos.y <= ob.y){
                return true;
            }
        }
    }

    touchesPlatformOuter(platform) {
        var it = platform.getInnerTop();
        var ob = platform.getOuterBottom();
        var dist = abs(this.pos.x - ob.x);
        if(dist <= this.r){
            if(this.pos.y >= it.y && this.pos.y <= ob.y){
                return true;
            }
        }
    }

    touchesPlatformBottom(platform){
        var br = platform.getBottomRight();
        var tl = platform.getTopLeft();
        var dist = abs(this.pos.y - br.y);
        if(dist <= this.r){
            if(this.pos.x >= tl.x && this.pos.x <= br.x){
                return true;
            }
        }

    }
    
    touchesPlatformTop(platform){
        var br = platform.getBottomRight();
        var tl = platform.getTopLeft();
        var dist = abs(this.pos.y - tl.y);
        if(dist <= this.r){
            if(this.pos.x >= tl.x && this.pos.x <= br.x){
                return true;
            }
        }

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

    goLeft(){ 
        this.speedX = abs(this.speedX) * -1;
        this.setNewRandomSpeedY();
    }
    goRight(){
        this.speedX = abs(this.speedX);
        this.setNewRandomSpeedY();
    }
    goUp(){
        this.speedY = abs(this.speedY) * -1;
    }
    goDown(){
        this.speedY = abs(this.speedY);
    }
    stickLeft(platform){
        if(!(platform instanceof Platform)) return;
        this.pos.x = platform.getTopLeft().x - this.r;
    }
    stickRight(platform){
        if(!(platform instanceof Platform)) return;
        this.pos.x = platform.getTopRight().x + this.r;
    }
    stickUp(platform){
        if(!(platform instanceof Platform)) return;
        this.pos.y = platform.getInnerTop().y - this.r;
    }
    stickDown(platform){
        if(!(platform instanceof Platform)) return;
        this.pos.y = platform.getOuterBottom().y + this.r;
    }

    goFaster(){
        this.speedX *= 1.8;
    }
    goSlower(){
        if(abs(this.speedX) > abs(this.initSpeedX)) this.speedX /= 1.3;
    }

    goesLeft(){return (this.speedX < 0);}
    goesUp(){return (this.speedY < 0);}
    goesRight(){ return (this.speedX > 0);}
    goesDown(){return (this.speedY > 0);}
}

function addWaveAt(x, y, radius, strkclr){
    waves.splice(20,1);
    waves.unshift(new Wave(x, y, radius, strkclr));
}
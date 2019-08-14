
class Ball{

    //CONSTRUCTOR
    constructor(radius,speedfactor){
        this.paused = false;
        this.r = this.setRadius(radius, (1/5));
        this.pos = this.setStartPosition();
        this.speedX = oneOrMinusOne() * random(4.2,4.8) * speedfactor; 
        this.speedY = oneOrMinusOne() * random(3.2,3.8) * speedfactor;
        this.minimumSpeed =  this.speedX;

        this.dentingX = false;
        this.dentingY = false;
        this.maxWr = this.r;
        this.maxHr = this.r;
        this.wr = this.r;
        this.hr = this.r;
    }

    //SHOW
    show(){
        ellipseMode(CENTER);
        fill(255,246,143);
        noStroke(); 
        ellipse(this.pos.x, this.pos.y, this.wr*2, this.hr*2);
    }

    //UPDATE
    update(){ 
        if(!this.paused){

        //normal movement
        this.pos.x += this.speedX;
        this.pos.y += this.speedY;

        if(this.touchesLeftWall()){
            hitsLeft();
            addWaveAt(0, this.pos.y, this.r + this.r * 1/2, fieldDangerLinesClr);
            this.goRight();
            this.goSlower();
        }

        if(this.touchesRightWall(fieldWidth)){
            hitsRight();
            addWaveAt(fieldWidth, this.pos.y,  this.r + this.r * 1/2, fieldDangerLinesClr)
            this.goLeft();
            this.goSlower();
        }

        if(this.touchesTopWall()){
            addWaveAt(this.pos.x, 0, this.r + this.r * 1/2, fieldSideLinesClr);
            this.goDown();
        }

        if(this.touchesBottomWall(fieldHeight)){
            addWaveAt(this.pos.x, fieldHeight,  this.r + this.r * 1/2, fieldSideLinesClr);
            this.goUp();
        }

        if(this.dentingX){
            console.log(this.wr);
            if(this.wr > this.maxWr / 2){
                this.wr -= this.maxWr / 64;
            }else{
                console.log("stopdenting")
                this.dentingX = false;
                this.goRight();
            }
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
                    else{w
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
    
    //SETTER
    setRadius(r, variance){
        var v = variance;
        return random(r-r*v,r+r*v);
    }

    setStartPosition(){
        let xMin = fieldWidth/2 - fieldInnerLineCircleRadius + this.r;
        let xMax = fieldWidth/2 + fieldInnerLineCircleRadius - this.r;
        let yMin = fieldHeight/2 - fieldInnerLineCircleRadius + this.r;
        let yMax = fieldHeight/2 + fieldInnerLineCircleRadius - this.r;
        return createVector( random(xMin, xMax),random(yMin, yMax));
    }

    setNewRandomSpeedY(){
        var newSpeedY = random(-4,+4);
        if(newSpeedY < 0){
            this.speedY = constrain(newSpeedY,-4,-2);
        }else{
            this.speedY = constrain(newSpeedY,2,4);
        }
    }

    //CHANGER
    goLeft(){ 
        this.speedX = abs(this.speedX) * -1;
        this.setNewRandomSpeedY();
    }
    goRight(){
        //testzone
        if(this.wr > this.maxWr / 2){
            this.wr-=this.maxWr / 16;
        }else{
            this.speedX = abs(this.speedX);
            this.setNewRandomSpeedY();
        }
        //testzone end
        // this.speedX = abs(this.speedX);
        // this.setNewRandomSpeedY();
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
        if(abs(this.speedX) > abs(this.minimumSpeed)){
            this.speedX /= 1.3;
        } 
    }

    pause(){
        this.paused = true;
    }

    resume(){
        this.paused = false;
    }

    //GETTER - NON CHANGING
    touchesTopWall(){
        if(this.pos.y <= this.r) return true;
    }
    touchesBottomWall(h){
        if(this.pos.y >= h-this.r) return true;
    }
    touchesLeftWall(){
        if(this.pos.x <= this.r) return true;
    }
    touchesRightWall(w){
        if(this.pos.x >= w-this.r) return true;
    }

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

    goesLeft(){
        return (this.speedX < 0);
    }
    goesUp(){
        return (this.speedY < 0);
    }
    goesRight(){
        return (this.speedX > 0);
    }
    goesDown(){
        return (this.speedY > 0);
    }
}

//Functions used by Ball
function addWaveAt(x, y, radius, waveClr){
    waves.splice(20,1);
    waves.unshift(new Wave(x, y, radius, waveClr));
}

function oneOrMinusOne(){
    if (random() < 0.5) return -1;
    return 1;
}
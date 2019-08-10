class Ball{
    constructor(fieldW,fieldH,radius=12,speedfactor=0.7){
        this.r = radius;
        var dir = (random(0,9)<=4)? -1 : 1;
        this.speedX = dir * random(4,5) * speedfactor; 
        dir = (random(0,9)<=4)? -1 : 1;
        this.speedY = dir * random(3,4) * speedfactor;
        this.initSpeedX =  this.speedX;
        this.pos = createVector( random(this.r,fieldW-this.r),random(this.r,fieldH-this.r));
    }

    show(){
        ellipseMode(CENTER);
        fill(255,246,143);
        noStroke(); 
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }

    update(fieldW,fieldH, platforms){ 
        this.pos.x += this.speedX;
        this.pos.y += this.speedY;

        if(this.touchesLeftWall()){
            this.goRight();
        }

        if(this.touchesRightWall(fieldW)){
            this.goLeft();
        }

        if(this.touchesTopWall()){
            this.goDown();
        }

        if(this.touchesBottomWall(fieldH)){
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
                    //this.changeXdir();
                    if(platform.left)   this.goRight();
                    else                this.goLeft();
                }
                if(this.touchesPlatformOuter(platform)){
                    if(platform.isMovingOutwards()){
                        this.goFaster();
                    }else{
                        this.goSlower();
                    }
                    //this.changeXdir();
                    if(platform.left)   this.goLeft();
                    else                this.goRight();

                }
            }else{
                if(this.touchesPlatformInner(platform)){
                    if(platform.isMovingInwards()){
                        if(platform.left)   this.stickRight();
                        else                 this.stickLeft();
                    }
                }
                if(this.touchesPlatformOuter(platform)){
                    if(platform.isMovingOutwards()){
                        if(platform.left)   this.stickLeft();
                        else                 this.stickRight();
                    }
                }
            }

            if(this.approachesY(platform)){
                if(this.touchesPlatformBottom(platform)){
                    console.log("CHANGING Y in plat Bot");
                    //this.changeYdir();
                    this.goDown();
                }
                if(this.touchesPlatformTop(platform)){
                    console.log("CHANGING Y in plat Top");
                    //this.changeYdir();
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
    touchesWall(w,h){
        return (this.touchesBottomWall(h) || this.touchesLeftWall() || this.touchesRightWall(w) || this.touchesTopWall())
    }

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

    goLeft(){
        this.speedX = abs(this.speedX) * -1;
    }
    stickLeft(platform){
        if(!(platform instanceof Platform)) return;
        this.pos.x = platform.getTopLeft().x - this.r;
    }

    goRight(){
        this.speedX = abs(this.speedX);
    }
    stickRight(platform){
        if(!(platform instanceof Platform)) return;
        this.pos.x = platform.getTopRight().x + this.r;
    }


    goUp(){
        this.speedY = abs(this.speedY) * -1;
    }
    stickUp(platform){
        if(!(platform instanceof Platform)) return;
        this.pos.y = platform.getInnerTop().y - this.r;
    }

    goDown(){
        this.speedY = abs(this.speedY);
    }
    stickDown(platform){
        if(!(platform instanceof Platform)) return;
        this.pos.y = platform.getOuterBottom().y + this.r;
    }

    goFaster(){
        this.speedX *= 1.3;
    }
    goSlower(){
        if(abs(this.speedX) > abs(this.initSpeedX)){
            this.speedX /= 1.3;
        }
    }

    goesLeft(){
        return (this.speedX < 0);
    }
    goesUp(){
        return (this.speedY < 0);
    }
    goesDown(){
        return (this.speedY > 0);
    }
    goesRight(){
        return (this.speedX > 0);
    }
}
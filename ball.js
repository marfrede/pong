
class Ball{

    //CONSTRUCTOR
    constructor(radius,speedfactor,lifetime = -1){
        this.r = this.setRadius(radius, (1/5));
        this.pos = this.setStartPosition();
        this.speedX = oneOrMinusOne() * random(4.2,4.8) * speedfactor; 
        this.speedY = oneOrMinusOne() * random(3.2,3.8) * speedfactor;
        this.minimumSpeed =  this.speedX;
        this.lifetime = lifetime;
        this.origLifeTime = lifetime;
    }

    //SHOW
    show(){
        ellipseMode(CENTER);
        let alpha_ = map(this.lifetime, 0, this.origLifeTime, 30, 255);
        let clrs = ballClr;
        clrs[3] = alpha_;
        noStroke(); 
        fill(clrs);
        if(this.lifetime == 0){
            fill(255,0,0);
            ellipse(this.pos.x, this.pos.y, this.r*8, this.r*8);
            addWaveAt(this.pos.x,this.pos.y,this.r*8,ballClr);
        }
        push();
        translate(this.pos.x,this.pos.y);
        beginShape();
        for(let a = 0; a <= TWO_PI; a+=0.5){
            let rs = paused? this.r : this.r + random(-this.r/5,this.r/5);
            let x = rs*cos(a);
            let y = rs*sin(a);
            vertex(x,y);
        }
        endShape();
        pop();
        

    }

    //UPDATE
    update(){ 
        //normal movement
        this.pos.x += this.speedX;
        this.pos.y += this.speedY;

        if(this.touchesLeftWall()){
            this.decrLifetime();;
            hitsLeft();
            addWaveAt(0, this.pos.y, this.r + this.r * 1/2, fieldDangerLinesClr);
            this.goRight();
            this.goSlower();
        }

        if(this.touchesRightWall(fieldWidth)){
            this.decrLifetime();;
            hitsRight();
            addWaveAt(fieldWidth, this.pos.y,  this.r + this.r * 1/2, fieldDangerLinesClr)
            this.goLeft();
            this.goSlower();
        }

        if(this.touchesTopWall()){
            this.decrLifetime();;
            addWaveAt(this.pos.x, 0, this.r + this.r * 1/2, fieldSideLinesClr);
            this.goDown();
        }

        if(this.touchesBottomWall(fieldHeight)){
            this.decrLifetime();;
            addWaveAt(this.pos.x, fieldHeight,  this.r + this.r * 1/2, fieldSideLinesClr);
            this.goUp();
        }

        platforms.forEach(platform => {
            if(this.approachesX(platform)){
                if(this.touchesObjInner(platform)){
                    this.decrLifetime();;
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
                if(this.touchesObjOuter(platform)){
                    console.log('outer2');
                    this.decrLifetime();
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
                        platform.pushLeft(this.speedX);
                        this.goRight();
                    }

                }
            }else{
                if(this.touchesObjInner(platform)){
                    this.decrLifetime();;
                    if(platform.isMovingInwards()){
                        if(platform.left){
                            this.stickRight();
                        }
                        else{
                            this.stickLeft();
                        }
                    }
                }
                if(this.touchesObjOuter(platform)){
                    console.log('outer');
                    this.decrLifetime();;
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
                if(this.touchesObjBottom(platform)){
                    this.decrLifetime();;
                    platform.pushUp(this.speedY);
                    this.goDown();
                }
                if(this.touchesObjTop(platform)){
                    this.decrLifetime();;
                    platform.pushDown(this.speedY);
                    this.goUp();
                }
            }
            else{
                if(this.touchesObjBottom(platform)){
                    this.decrLifetime();;
                    this.stickDown(platform);
                }
                if(this.touchesObjTop(platform)){
                    this.decrLifetime();;
                    this.stickUp(platform);
                }
            }
        });

        obstacles.forEach(obstacle => {
            if(this.approachesX(obstacle) && obstacle.approachesX(this)){
                if(this.touchesObjLeft(obstacle)){
                    this.decrLifetime();
                    this.goFaster();
                    this.goLeft(); 

                }
                if(this.touchesObjRight(obstacle)){
                    this.decrLifetime();
                    this.goFaster();
                    this.goRight();
                }
            }else{
                if(this.touchesObjLeft(obstacle)){
                    this.decrLifetime();
                    this.goSlower();
                    this.goLeft(); 

                }
                if(this.touchesObjRight(obstacle)){
                    this.decrLifetime();
                    this.goSlower();
                    this.goRight();
                }
            }

            if(this.approachesY(obstacle)){
                if(this.touchesObjBottom(obstacle)){
                    this.decrLifetime();;
                    //obstacle.pushUp(this.speedY);
                    this.goDown();
                }
                if(this.touchesObjTop(obstacle)){
                    this.decrLifetime();;
                    //obstacle.pushDown(this.speedY);
                    this.goUp();
                }
            }
            else{
                if(this.touchesObjBottom(obstacle)){
                    this.decrLifetime();;
                    this.stickDown(obstacle);
                }
                if(this.touchesObjTop(obstacle)){
                    this.decrLifetime();;
                    this.stickUp(obstacle);
                }
            }
        });

        
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

    decrLifetime(){
        if(this.lifetime > 0 ) this.lifetime--;
    }

    //CHANGER
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
        if(abs(this.speedX) > abs(this.minimumSpeed)){
            this.speedX /= 1.3;
        } 
    }
    explode(){
        this.exploding = true;
    }

    //GETTER - NON CHANGING
    touchesTopWall(){
        if(this.pos.y <= this.r) {
            bounce();
            return true;
        }
    }
    touchesBottomWall(h){
        if(this.pos.y >= h-this.r) {
            bounce();
            return true;
        }
    }
    touchesLeftWall(){
        if(this.pos.x <= this.r) {
            bounce();
            return true;
        }
    }
    touchesRightWall(w){
        if(this.pos.x >= w-this.r) {
            bounce();
            return true;
        }
    }

    touchesObjInner(obj){
        var it = obj.getInnerTop();
        var ob = obj.getOuterBottom();
        var dist = abs(this.pos.x - it.x);
        if(dist <= this.r){
            if(this.pos.y >= it.y && this.pos.y <= ob.y){
                bounce();
                return true;
            }
        }
    }

    touchesObjOuter(obj) {
        var it = obj.getInnerTop();
        var ob = obj.getOuterBottom();
        var dist = abs(this.pos.x - ob.x);
        if(dist <= this.r){
            if(this.pos.y >= it.y && this.pos.y <= ob.y){
                bounce();
                return true;
            }
        }
    }

    touchesObjBottom(obj){
        var br = obj.getBottomRight();
        var tl = obj.getTopLeft();
        var dist = abs(this.pos.y - br.y);
        if(dist <= this.r){
            if(this.pos.x >= tl.x && this.pos.x <= br.x){
                bounce();
                return true;
            }
        }

    }
    
    touchesObjTop(obj){
        var br = obj.getBottomRight();
        var tl = obj.getTopLeft();
        var dist = abs(this.pos.y - tl.y);
        if(dist <= this.r){
            if(this.pos.x >= tl.x && this.pos.x <= br.x){
                bounce();
                return true;
            }
        }

    }

    touchesObjLeft(obj){
        var br = obj.getBottomRight();
        var tl = obj.getTopLeft();
        var dist = abs(this.pos.x - tl.x);
        if(dist <= this.r){
            if(this.pos.y <= br.y && this.pos.y >= tl.y){
                bounce();
                return true;
            }
        }

    }
    
    touchesObjRight(obj){
        var br = obj.getBottomRight();
        var tl = obj.getTopLeft();
        var dist = abs(this.pos.x - br.x);
        if(dist <= this.r){
            if(this.pos.y <= br.y && this.pos.y >= tl.y){
                bounce();
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

function oneOrMinusOne(){
    if (random() < 0.5) return -1;
    return 1;
}

function bounce(){
    bounceCounter++;
}
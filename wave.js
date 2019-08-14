

class Wave{
    constructor(posx,posy,radius,strokeclr){
        this.paused = false;
        
        this.pos = createVector(posx,posy);
        this.r = radius/3;
        this.color = strokeclr;
        
        this.strikeStroke = false;
        this.alpha = 255;

        this.minR = radius;
        this.maxR = radius * 3;
    }

    show(){
        if(this.strikeStroke){
            noStroke();
        }else{
            stroke(this.color[0],this.color[1], this.color[2],this.alpha);
        }
        strokeWeight(2);
        noFill();
        ellipse(this.pos.x,this.pos.y,this.r,this.r);
        ellipse(this.pos.x,this.pos.y,this.r+5,this.r+5);
        ellipse(this.pos.x,this.pos.y,this.r+15,this.r+15);
    }

    update(){
        if(!this.paused){
            this.alpha = map(this.r, this.minR, this.maxR, 255, 0)
            if(this.r >= this.maxR){
                this.strikeStroke = true;
            }
            this.r+=this.maxR*(1/35);
        }
    }

    pause(){
        this.paused = true;
    }
    resume(){
        this.paused = false;
    }

}
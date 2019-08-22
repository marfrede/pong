

class Wave{
    constructor(posx,posy,radius,strokeclr, startAlpha = 255){
        this.paused = false;
        
        this.pos = createVector(posx,posy);
        this.r = radius/3;
        this.color = strokeclr;
        
        this.strikeStroke = false;
        this.startAlpha = startAlpha;
        this.alpha = this.startAlpha;

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
            this.alpha = map(this.r, this.minR, this.maxR, this.startAlpha, 0)
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

function addWaveAt(x, y, radius, waveClr, startAlpha=255){
    waves.splice(20,1);
    waves.unshift(new Wave(x, y, radius, waveClr, startAlpha));
}
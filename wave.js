class Wave{
    constructor(posx,posy,strokeclr=255){
        this.pos = createVector(posx,posy);
        this.r = 15;
        this.color = strokeclr;
        this.alpha = 255;
        this.strikeStroke = false;
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
        this.alpha = map(this.r, 15, 50, 255, 0)
        if(this.r >= 50){
            this.strikeStroke = true;
        }
        this.r++;
    }

}
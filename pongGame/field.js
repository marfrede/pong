class Field{

    constructor(circleR=70, redLineThickness=10, fieldLineThickness=3){
        this.cR = circleR;
        this.rlt = redLineThickness;
        this.flt = fieldLineThickness;
    }

    show(w, h, bS){
        background(0);

        //field lines
        //circle
        translate(w/2, h/2); //center
        stroke(10,20,30);
        strokeWeight(this.flt);
        noFill();
        ellipseMode(CENTER); //center
        ellipse(0, 0, this.cR*2, this.cR*2);
        ellipseMode(CORNER); //normal
        translate(-w/2,-h/2); //normal
        //lines
        line(0, height/2, width/2-this.cR, height/2);
        line(width - (width/2-this.cR), height/2, width, height/2);

        //boxlines
        stroke(100);
        strokeWeight(this.flt);
        line(width*bS,0,width*bS,height);
        line(width - width*bS,0,width - width*bS,height);

        //redlines
        stroke(255,0,0);
        strokeWeight(this.rlt);
        line(0,0,0,height);
        line(width,0,width,height);

        //greenlines
        stroke(10,20,150);
        strokeWeight(this.rlt);
        line(0,0,width,0);
        line(0,height,width,height);

    }
}
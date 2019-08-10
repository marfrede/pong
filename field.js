class Field{

    constructor(flCol,flcR, flTh, fboxCol, fboxTh, fdangerCol, fdangerTh, sidelCol, sidelTh){
        this.flC = flCol;
        this.cR = flcR;
        this.flt = flTh;

        this.fbC = fboxCol;
        this.fbt = fboxTh;

        this.dlC = fdangerCol;
        this.dlt = fdangerTh;

        this.slC = sidelCol;
        this.slt = sidelTh;

    }

    show(w, h, bS){
        background(0);

        //fieldLines
        //innerCircle
        translate(w/2, h/2); //center
        stroke(this.flC);
        strokeWeight(this.flt);
        noFill();
        ellipse(0, 0, this.cR*2, this.cR*2);
        translate(-w/2,-h/2); //normal
        //innerLines
        line(0, height/2, width/2-this.cR, height/2);
        line(width - (width/2-this.cR), height/2, width, height/2);

        //boxLines
        stroke(this.fbC);
        strokeWeight(this.fbt);
        line(width*bS,0,width*bS,height);
        line(width - width*bS,0,width - width*bS,height);

        //dangerLines
        stroke(this.dlC);
        strokeWeight(this.dlt);
        line(0,0,0,height);
        line(width,0,width,height);

        //sideLines
        stroke(this.slC);
        strokeWeight(this.slt);
        line(0,0,width,0);
        line(0,height,width,height);
    }
}
class Field{

    constructor(){}

    show(){
        background(backgroundClr);

        //fieldLines
        //innerCircle
        translate(width/2, height/2); //center
        stroke(fieldInnerLineColor);
        strokeWeight(fieldInnerLineThicknes);
        noFill();
        ellipse(0, 0, fieldInnerLineCircleRadius*2, fieldInnerLineCircleRadius*2);
        translate(-width/2,-height/2); //normal
        //innerLines
        line(0, height/2, width/2-fieldInnerLineCircleRadius, height/2);
        line(width - (width/2-fieldInnerLineCircleRadius), height/2, width, height/2);

        //boxLines
        stroke(fieldBoxLinesClr);
        strokeWeight(fieldBoxLineThickness);
        line(width*boxSpace,0,width*boxSpace,height);
        line(width - width*boxSpace,0,width - width*boxSpace,height);

        //dangerLines
        stroke(fieldDangerLinesClr);
        strokeWeight(fieldDangerLinesThickness);
        line(0,0,0,height);
        line(width,0,width,height);

        //sideLines
        stroke(fieldSideLinesClr);
        strokeWeight(fieldSideLinesThickness);
        line(0,0,width,0);
        line(0,height,width,height);
    }
}
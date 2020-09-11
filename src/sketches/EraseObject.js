class EraseObject {

    constructor(points, weight, p5) {
      this.points = points;
      this.strokeWeight = weight*5;
      this.p = p5;
    }
  
    display() {
      this.p.strokeWeight(this.strokeWeight);
      this.p.stroke(250);
      this.p.beginShape();
      this.p.noFill();
      this.p.curveVertex(this.points[0].x, this.points[0].y);
      for (let i = 0; i < this.points.length; i+= 2){
        this.p.curveVertex(this.points[i].x, this.points[i].y);
       }
      this.p.curveVertex(this.points[this.points.length-1].x, this.points[this.points.length-1].y);
      this.p.endShape();
    }
  }
  export default EraseObject;
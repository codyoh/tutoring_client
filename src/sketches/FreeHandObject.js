class FreeHandObject {

    constructor(points, weight, color, p5) {
      this.points = points;
      this.strokeWeight = weight;
      this.color = color;
      this.p = p5;
    }
  
    scale(scalar) {
      for (var i = 0; i<this.points.length; i++) {
        this.points[i].x = this.points[i].x + scalar;
      }
    }
  
    display(color) {
      this.p.strokeWeight(this.strokeWeight);
      this.p.stroke(this.color);
      this.p.beginShape();
      this.p.noFill();
      this.p.curveVertex(this.points[0].x, this.points[0].y);
      for (let i = 0; i < this.points.length; i+= 2){
        this.p.curveVertex(this.points[i].x, this.points[i].y);
       }
      this.p.curveVertex(this.points[this.points.length-1].x, this.points[this.points.length-1].y);
      this.p.endShape();
      //console.log(this.points[0])
    }
  }
  export default FreeHandObject;
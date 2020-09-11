class CircleObject {

    constructor(aX, aY, bX, bY, weight, color, p5) {
      this.centerX = aX;
      this.centerY = aY;
      this.edgeX = bX;
      this.edgeY = bY;
      this.weight = weight;
      this.color = color;
      this.p = p5;
    }
    clicked(xClick, yClick) {
      // console.log(this.center.xPosition);
      // console.log(xClick);
      // console.log(yClick);
      // console.log("-_-_-_-_")
      let distance = this.p.dist(xClick, yClick, this.x + window.innerWidth/2, this.y + window.innerHeight*.75/2);
      // console.log(distance);
      // console.log(this.radius);
      // console.log("________");
      if (distance < this.radius) {
        this.x = xClick - window.innerWidth/2;
        this.y = yClick - window.innerHeight*.75/2;
      }
    }
    setEdge(bX, bY) {
      this.edgeX = bX;
      this.edgeY = bY;
    }
    display() {
      this.radius = this.p.dist(this.centerX, this.centerY, this.edgeX, this.edgeY);
      this.p.noFill();
      this.p.stroke(this.color);
      this.p.strokeWeight(this.weight);
      this.p.ellipse(this.centerX, this.centerY, this.radius*2);
    }
  }
  export default CircleObject;
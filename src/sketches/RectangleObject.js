class RectangleObject {

    constructor(aX, aY, bX, bY, weight, color, p5) {
      this.aCornerX = aX;
      this.aCornerY = aY;
      this.bCornerX = bX;
      this.bCornerY = bY;
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
    setCorner(bX, bY) {
      this.bCornerX = bX;
      this.bCornerY = bY;
    }
    display() {
      // this.width = Math.abs(this.aCornerX - this.bCornerX);
      // this.height = Math.abs(this.aCornerY - this.bCornerY);
      this.p.noFill();
      this.p.rectMode(this.p.CORNERS);
      this.p.stroke(this.color);
      this.p.strokeWeight(this.weight);
      this.p.rect(this.aCornerX, this.aCornerY, this.bCornerX, this.bCornerY);
    }
  }
  export default RectangleObject;
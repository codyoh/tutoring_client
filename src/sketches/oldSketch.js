// export default function sketch(p){
//     let canvas;

//     var history = [];

//     p.setup = () => {
//         canvas = p.createCanvas(300,300);
//         const obj = new FreeDraw(p);
//         history.push(obj)
        
//     }

//     p.draw = () => {
//         p.background('blue')
//         // p.ellipse(150,100,100,100);
//         // history[0].display()
//         p.noFill();
//         p.strokeWeight(5);
//         for (var i=0; i<history.length; i++) {
//             history[i].display();
//         }
        
//         // p.stroke('#fff');
//         // p.beginShape();
//         // p.curveVertex(0,0);
//         // p.curveVertex(0,0);
//         // p.curveVertex(40,90);
//         // p.curveVertex(100,100)
//         // p.curveVertex(300,300);
//         // p.curveVertex(300,300);
//         // p.endShape();
        
//     }

//     p.mouseClicked = () => {
//         const coords = { x: p.mouseX, y: p.mouseY }
//         const stroke = new FreeDraw(p)
//         stroke.history.push(coords)
//         history.push(stroke)
//         console.log(history)
//         //console.log(coords)
//     }

//     p.mouseDragged = () => {
//         const coords = { x: p.mouseX, y: p.mouseY }
//         // console.log(history)
//         const strokeToUpdate = history[history.length - 1]
//         strokeToUpdate.history.push(coords)
//     }

//     p.mouseReleased = () => {
//         const coords = { x: p.mouseX, y: p.mouseY }
//         const strokeToUpdate = history[history.length - 1]
//         strokeToUpdate.history.push(coords)
//         console.log(history)
//     }

//     class FreeDraw{
//         constructor(p5){
//         this.p = p5;
//         this.history = [];
//         }

//         display() {
//             p.beginShape();
//             this.history.forEach(stroke => p.curveVertex(stroke.x, stroke.y))
//             p.endShape();
//             //p.noFill();
//             //console.log('drawing')
//             // this.p.strokeWeight(50);
//             // this.p.stroke('black')
//             // this.p.beginShape();
//             // this.p.curveVertex(this.history[0].x, this.history[0].y);
//             // this.p.curveVertex(this.history[1].x, this.history[1].y);
//             // this.p.curveVertex(this.history[2].x, this.history[2].y);
//             // this.p.curveVertex(this.history[3].x, this.history[3].y);
//             // this.p.endShape()
            
//         }
//     }
// }

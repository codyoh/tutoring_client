
import PointObject from './PointObject';
import CircleObject from './CircleObject';
import FreeHandObject from './FreeHandObject';
import EraseObject from './EraseObject';
import RectangleObject from './RectangleObject';
import io from 'socket.io-client';
import Peer from 'simple-peer';


export default function sketch(p5){

//   constructor(){
//     super()
//   }
  // const roomID;
//   const roomID = sessionStorage.getItem('roomID');
//   const socket = io.connect('localhost:5000');
//   socket.emit('joinRoom', roomID);

//   var stream = navigator.mediaDevices.getUserMedia({video: false, audio: true})
//   	.then(function (stream) {
//   		console.log("got media");
//       return stream
// })

//   		var peer = new SimplePeer({
//   			initiator: true,
//   			trickle: false,
//   			//stream: stream
//   		})

//       peer.on('signal', function(data) {
//   			console.log(data);
//         socket.emit('peerData', data);
//   		})

//       peer.on('connect', () => {
//         console.log("Peers are connected!!");
//       })
//       //
//       // document.getElementById("connect").onclick = function(){
//   		// 	var otherId = JSON.parse(document.getElementById('otherId').value);
//   		// 	peer.signal(otherId);
//   		// }
//       //
//       // peer.on('stream', function(stream){
//   		// 	var video = document.createElement('video');
//   		// 	document.getElementById("workspace").appendChild(video);
//   		// 	video.srcObject = stream;
//       //
//   		// 	video.play();


//   socket.on('peerData', gotPeerData);

//   function gotPeerData(data){
//     console.log(JSON.stringify(data));
//   }


const socket = io('https://fast-tutor-api.herokuapp.com/', {secure: true})

var peers = {}

    //when signaled that someone has joined the chat
    //create a new peer as initiator and send p2pOffer to new participant
    socket.on('newParticipant', (socketId)=>{
        socket.emit('screenSize', canvasSize);
        console.log('received new participant ' + socketId)
        const newPeer = new Peer({ initiator: true })
        peers[socketId] = newPeer
        peers[socketId].on('signal', data => {
          const socketIdsAndSignal = {
            toSocketId: socketId,
            fromSocketId: socket.id,
            signalData: data
          }
          p2pOffer(socketIdsAndSignal);
          
        })
      })  
  
      //when receiving a p2pOffer
      socket.on('p2pOffer', payload => {
        console.log('received p2pOffer')
        console.log(payload)
        //create a new peer to receive
        const receivingPeer = new Peer();
        //add new peer to the peers array
        const socketId = socket.id
        peers[socketId] = receivingPeer
        //signal new peer, referenced from peer array
        peers[socketId].signal(payload.signalData)
  
        peers[socketId].on('signal', data=> {
          console.log('receiving peer has signaled itself')
          const signalReply = {
            toSocketId: payload.fromSocketId,
            fromSocketId: payload.toSocketId,
            signalData: data
          }
          p2pAnswer(signalReply)
        })
      })
  
      socket.on('p2pAnswer', payload => {
        const socketId = payload.fromSocketId
        console.log('answerers socket id: ' + socketId)
        console.log('payload: ')
        console.log(payload)
        console.log('peers: ')
        console.log(peers)
        // this.peers.socketId.signal(payload.signalData)
        peers[socketId].signal(payload.signalData)
        peers[socketId].on('connect', ()=>{
        // this.peers.socketId.on('connect', () => { 
          console.log('peers have connected!')
        })
      })

      function p2pOffer(data){
        socket.emit('p2pOffer', data)
      }
    
      function p2pAnswer(data){
        socket.emit('p2pAnswer', data)
      }

  // socket.on('sessionWillStart', askEmotionalState);
  socket.on('startFreeHand', startFreeHandReceiver);
  socket.on('freeHand', freeHandReceiver);
  socket.on('release', releaseReceiver);
  socket.on('point', pointReceiver);
  socket.on('startCircle', startCircleReceiver);
  socket.on('circle', circleReceiver);
  socket.on('startRectangle', startRectangleReceiver);
  socket.on('rectangle', rectangleReceiver);
  socket.on('startErase', startEraseReceiver);
  socket.on('erase', eraseReceiver);
  socket.on('screenSize', screenSizeReceiver);
  socket.on('requestScreenSize', sendScreenSize);
  socket.on('undo', undoReceiver);
  socket.on('redo', redoReceiver);
  socket.on('clear', clearReceiver);
  // socket.on('disconnect', disconnect);

  var hist = [];
  var redo = [];
  var stroke = [];

  var backgroundColor=250;
  var color='black';
  var drawType='freeHand';
  var weight=1;
  var font;
  var toolBarDisplayed = false;
  var canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight*.9
  }
  var otherCanvasSize = {
    width: window.innerWidth,
    height: window.innerHeight*.9
  }
  var scaleBetweenCanvases = {
    width: 1,
    height: 1
  }
  var mouseOffset = { //Reconciles the mouse coordinate system with the drawing coordinate system
    x: canvasSize.width/2,
    y: canvasSize.height/2
  }
  var client = {
    type: 'unknown'
  }
  var scalar;

  p5.preload = function() {
    font = p5.loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf");
  };

  sketch.askEmotionalState = function() {
    var response = prompt("How are you feeling young padowon?");
    console.log(response);
  }

  function sendScreenSize() {
    socket.emit('screenSize', canvasSize);
  }

  function screenSizeReceiver(otherCanvas) {
    console.log("screen size received")
    otherCanvasSize.height = otherCanvas.height;
    otherCanvasSize.width = otherCanvas.width;
    // canvasSize = {
    //   width: window.innerWidth,
    //   height: window.innerHeight*.9
    // }
    // if (otherCanvas.width*otherCanvas.height<canvasSize.width*canvasSize.height) {
    //   client.type = 'tutor';
    // }
    // //console.log(client.type);
    // if (client.type === "tutor") {
    //   scaleBetweenCanvases.width = otherCanvas.width/canvasSize.width;
    //   scaleBetweenCanvases.height = otherCanvas.height/canvasSize.height;
    //   //console.log(scaleBetweenCanvases);
    //   if (scaleBetweenCanvases.width > scaleBetweenCanvases.height) {
    //     canvasSize.width = otherCanvas.width/scaleBetweenCanvases.width;
    //     canvasSize.height = otherCanvas.height/scaleBetweenCanvases.width;
    //     scalar = scaleBetweenCanvases.width;
    //   }
    //   else {
    //     canvasSize.width = otherCanvas.width/scaleBetweenCanvases.height;
    //     canvasSize.height = otherCanvas.height/scaleBetweenCanvases.height;
    //     scalar = scaleBetweenCanvases.height;
    //   }
    //   mouseOffset.x = canvasSize.width/2;
    //   mouseOffset.y = canvasSize.height/2;
    //   p5.resizeCanvas(canvasSize.width, canvasSize.height);
    //   socket.emit('screenSize', canvasSize);
    // }
    // scaleBetweenCanvases.width = otherCanvas.width/canvasSize.width;
    // scaleBetweenCanvases.height = otherCanvas.height/canvasSize.height;
    // //console.log(scaleBetweenCanvases);
    // // console.log(otherCanvas);
    // // console.log(canvasSize);
  }
  p5.windowResized = function() {
    p5.resizeCanvas(window.innerWidth, window.innerHeight*.75);
    if (client.type !== "tutor") {
      canvasSize.width = window.innerWidth;
      canvasSize.height = window.innerHeight*.9;
      p5.resizeCanvas(canvasSize.width, canvasSize.height);
      socket.emit('screenSize', canvasSize);
    }
    else {
      console.log(otherCanvasSize);
      screenSizeReceiver(otherCanvasSize);
    }
    mouseOffset.x = canvasSize.width/2;
    mouseOffset.y = canvasSize.height/2;
    for (var i=0; i<hist.length; i++) {
      hist[i].display();
    }
  }

  p5.setup = function () {
    //socket.emit('requestScreenSize');
    p5.createCanvas(canvasSize.width, canvasSize.height, p5.WEBGL);
    p5.background(backgroundColor);
    p5.strokeWeight(weight);
    p5.stroke(color);
    p5.cursor(p5.CROSS);
    p5.textFont(font);
    p5.textSize(32);
    p5.fill(0);
    p5.circle(0,0,50);
    socket.emit('screenSize', canvasSize);
  };


  function receiveImage(file) {
    console.log(file.name);
  }
  function insideCanvas() { //Used to determine if the mouse is clicking within the viewable canvas
    if (toolBarDisplayed) {
      if (p5.mouseX>0 && p5.mouseX<canvasSize.width && p5.mouseY>0 && p5.mouseY<canvasSize.height*.92) {
        console.log("insideCanvas");
        return true;
      }
      else {
        console.log("outside canvas");
        return false;
      }
    }
    else {
      if (p5.mouseX>0 && p5.mouseX<canvasSize.width && p5.mouseY>0 && p5.mouseY<canvasSize.height) {
        console.log("insideCanvas");
        return true;
      }
      else {
        console.log("outside canvas");
        return false;
      }
    }
  }
  function undoReceiver() {
    redo.push(hist[hist.length-1]);
    hist.pop();
  }
  sketch.undo = function() {
    if (hist.length > 0) {
      redo.push(hist[hist.length-1]);
      hist.pop();
      console.log(hist);
      console.log(redo);
      socket.emit('undo');
    }
  }
  function redoReceiver() {
    hist.push(redo[redo.length-1]);
    redo.pop();
  }
  sketch.redo = function() {
    if (redo.length > 0) {
      hist.push(redo[redo.length-1]);
      redo.pop();
      console.log(hist);
      console.log(redo);
      socket.emit('redo');
    }
  }
  function clearReceiver() {
    p5.clear();
    p5.setup();
    hist = [];
    redo = [];
  }
  sketch.clearButtonPressed = function() {
    p5.clear();
    p5.setup();
    hist = [];
    redo = [];
  }
  sketch.strokeWeightChange = function(aWeight) {
    weight = aWeight
    p5.strokeWeight(weight);
  }
  sketch.changeDrawType = function(aDrawType) {
    drawType = aDrawType;
  }
  sketch.changeColor = function(aColor) {
    if (drawType == 'erase') {
      drawType = 'freeHand';
    }
    console.log(aColor);
    color = aColor;
  }
  sketch.addText = function(text) {
    p5.text(text, 50, -55);
  }
  sketch.historyChange = function(aPosition) {
    for (var i=0; i<hist.length-aPosition; i++) {
      redo.push(hist[hist.length-1]);
      hist.pop();
    }
  }

  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    console.log(props.displayToolBar);
    if (toolBarDisplayed !== props.displayToolBar) {
      hist.pop(); //Eliminates object created when the toggle menu button is clicked
    }
    toolBarDisplayed = props.displayToolBar;
  };

  function startFreeHandReceiver(data) { // Recipient for mousePressed
    stroke.push({'x': data.x, 'y': data.y});
    drawFreeHand(stroke, data.weight, data.color);
  }
  function freeHandReceiver(data) { // Recipient for mouseDragged
    stroke.push({'x': data.x/scaleBetweenCanvases.width, 'y': data.y/scaleBetweenCanvases.height});
  }
  function drawFreeHand(stroke, weight, color) {
    var freeHandTest = new FreeHandObject(stroke, weight, color, p5);
    hist.push(freeHandTest);
  }

  function startCircleReceiver(data) {
    hist.push(new CircleObject(data.x, data.y, data.x, data.y, data.weight, data.color, p5));
  }
  function circleReceiver(data) {
    hist[hist.length-1].setEdge(data.x, data.y);
  }
  function drawCircle(stroke, weight, color) {
      console.log(stroke);
      console.log(stroke[0]);
      var circleTest = new CircleObject(stroke[0].x, stroke[0].y, stroke[stroke.length-1].x, stroke[stroke.length-1].y, weight, color, p5);
      hist.push(circleTest);
      console.log(circleTest);
      console.log(stroke);
  }

  function startRectangleReceiver(data) {
    hist.push(new RectangleObject(data.x, data.y, data.x, data.y, data.weight, data.color, p5));
  }
  function rectangleReceiver(data) {
    hist[hist.length-1].setCorner(data.x, data.y);
  }
  function drawRectangle() {
    hist.push(new RectangleObject(stroke[0].x, stroke[0].y, stroke[stroke.length-1].x, stroke[stroke.length-1].y, weight, color, p5));
  }

  function startEraseReceiver(data) {
    stroke.push({'x': data.x, 'y': data.y});
    console.log(data.color);
    drawErase(stroke, data.weight);
  }
  function eraseReceiver(data) {
    stroke.push({'x': data.x, 'y': data.y})
  }
  function drawErase(stroke, weight) {
    hist.push(new EraseObject(stroke, weight, p5));
    var data = {
      x: stroke[0].x,
      y: stroke[0].y
    }
    socket.emit('erase', data);
  }

  function pointReceiver(data) {  // Recipient for drawPoint
    hist.push(new PointObject(data.x, data.y, data.color, p5));
  }
  function drawPoint() {
    hist.push(new PointObject(stroke[0].x, stroke[0].y, color, p5));
    var data = {
      color: color,
      x: stroke[0].x*scaleBetweenCanvases.width,
      y: stroke[0].y*scaleBetweenCanvases.height,
    }
    socket.emit('point', data);
  }


  p5.mousePressed = function () {
    if (insideCanvas()) {
      stroke.push({'x': p5.mouseX-mouseOffset.x, 'y': p5.mouseY-mouseOffset.y});
      // stroke.push({'x': p5.mouseX, 'y': p5.mouseY});
      console.log(p5.mouseX + " , " + p5.mouseY)
      switch(drawType) {
        case 'freeHand':
          drawFreeHand(stroke, weight, color);
          var data = {
            color: color,
            weight: weight,
            x: (p5.mouseX-mouseOffset.x)*scaleBetweenCanvases.width,
            // x: (p5.mouseX)*scaleBetweenCanvases.width,
            y: (p5.mouseY-mouseOffset.y)*scaleBetweenCanvases.height
            // y: (p5.mouseY)*scaleBetweenCanvases.height
          }
          console.log(hist[0].points)
          socket.emit('startFreeHand', data)
          break;
        case 'circle':
          var data = {
            color: color,
            weight: weight,
            x: (p5.mouseX-mouseOffset.x)*scaleBetweenCanvases.width,
            y: (p5.mouseY-mouseOffset.y)*scaleBetweenCanvases.height
          }
          drawCircle(stroke, weight, color);
          socket.emit('startCircle', data);
          break;
        case 'rectangle':
          var data = {
            color: color,
            weight: weight,
            x: (p5.mouseX-mouseOffset.x)*scaleBetweenCanvases.width,
            y: (p5.mouseY-mouseOffset.y)*scaleBetweenCanvases.height
          }
          drawRectangle(stroke, weight, color);
          socket.emit('startRectangle', data);
          break;
        case 'erase':
          drawErase(stroke, weight);
          var data = {
            weight: weight,
            x: p5.mouseX-mouseOffset.x,
            y: p5.mouseY-mouseOffset.y
          }
          socket.emit('startErase', data)
          break;
        case 'point':
          drawPoint();
          break;
      }
    }
  }

  p5.mouseDragged = function () {
    stroke.push({'x': p5.mouseX-mouseOffset.x, 'y': p5.mouseY-mouseOffset.y});
    // stroke.push({'x': p5.mouseX, 'y': p5.mouseY});
    var data = {
      x: (p5.mouseX-mouseOffset.x),
      y: (p5.mouseY-mouseOffset.y)
    }
    if (drawType === 'freeHand') {
      socket.emit('freeHand', data);
    }
    else if (drawType === 'circle') {
      hist[hist.length-1].setEdge(stroke[stroke.length-1].x, stroke[stroke.length-1].y);
      socket.emit('circle', data);
    }
    else if (drawType === 'rectangle') {
      hist[hist.length-1].setCorner(stroke[stroke.length-1].x, stroke[stroke.length-1].y);
      socket.emit('rectangle', data);
    }
    else {
      socket.emit('erase', data);
    }
    return false;
  }

  function releaseReceiver() {  // Recipient for mouseReleased
    stroke = []
  }
  p5.mouseReleased =  function () {
    console.log(hist);
    stroke = [];
    socket.emit('release');
  }

  p5.draw = function () {
    p5.background(backgroundColor); //this line is to reset the background color to freshly draw over it
    for (var i=0; i<hist.length; i++) {
      hist[i].display();
    }
    p5.stroke('red')
    p5.circle(-otherCanvasSize.width/2, otherCanvasSize.height/2, 8)
    p5.circle(-otherCanvasSize.width/2, -otherCanvasSize.height/2, 8)
    p5.circle(otherCanvasSize.width/2, otherCanvasSize.height/2, 8)
    p5.circle(otherCanvasSize.width/2, -otherCanvasSize.height/2, 8)
    
    // console.log(otherCanvasSize.width)
    // p5.line(0, otherCanvasSize.height, otherCanvasSize.width, otherCanvasSize.height)
    // p5.line(otherCanvasSize.width, 0, otherCanvasSize.width, otherCanvasSize.height)
  };

};
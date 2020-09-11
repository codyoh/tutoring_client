import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { render } from '@testing-library/react';
import Canvas from './components/Canvas'

//need to create function that finds within array of objects
//use above function to update/signal appropriate peer in peers list, by socketId
//setup function to handle incoming data from p2p channel (add strokes to history)

//use later lifecycle method or a callback to add media stream to p2p channel

// canvas work and history

//create a disconnect function that cleans up all connections when leaving,
// and notifies server to relay message to all other participants

//add support for rooms from url params

//DEPLOYMENT
//add axios and env variables to app. Change ip addresses
//deploy to github pages
//change gh pages url
//deploy server

//TESTING
//test rubberbanding of page
//test connections on other devices (laptop, phone, tablet) from diff networks

//BACKUP PLAN
//create optional use to send data via sockets rather than p2p

// const socket = io('http://localhost:4000')

class App extends React.Component {

  constructor(props){
    super(props)
    // this.peers = {}
  }

  componentDidMount(){
    // //when signaled that someone has joined the chat
    // //create a new peer as initiator and send p2pOffer to new participant
    // socket.on('newParticipant', (socketId)=>{
    //   console.log('received new participant ' + socketId)
    //   const newPeer = new Peer({ initiator: true })
    //   this.peers[socketId] = newPeer
    //   this.peers[socketId].on('signal', data => {
    //     const socketIdsAndSignal = {
    //       toSocketId: socketId,
    //       fromSocketId: socket.id,
    //       signalData: data
    //     }
    //     this.p2pOffer(socketIdsAndSignal);
        
    //   })
    // })  

    // //when receiving a p2pOffer
    // socket.on('p2pOffer', payload => {
    //   console.log('received p2pOffer')
    //   console.log(payload)
    //   //create a new peer to receive
    //   const receivingPeer = new Peer();
    //   //add new peer to the peers array
    //   const socketId = socket.id
    //   this.peers[socketId] = receivingPeer
    //   //signal new peer, referenced from peer array
    //   this.peers[socketId].signal(payload.signalData)

    //   this.peers[socketId].on('signal', data=> {
    //     console.log('receiving peer has signaled itself')
    //     const signalReply = {
    //       toSocketId: payload.fromSocketId,
    //       fromSocketId: payload.toSocketId,
    //       signalData: data
    //     }
    //     this.p2pAnswer(signalReply)
    //   })
    // })

    // socket.on('p2pAnswer', payload => {
    //   const socketId = payload.fromSocketId
    //   console.log('answerers socket id: ' + socketId)
    //   console.log('payload: ')
    //   console.log(payload)
    //   console.log('peers: ')
    //   console.log(this.peers)
    //   // this.peers.socketId.signal(payload.signalData)
    //   this.peers[socketId].signal(payload.signalData)
    //   this.peers[socketId].on('connect', ()=>{
    //   // this.peers.socketId.on('connect', () => { 
    //     console.log('peers have connected!')
    //   })
    // })
  }

  // p2pOffer = (data) => {
  //   socket.emit('p2pOffer', data)
  // }

  // p2pAnswer = (data) => {
  //   socket.emit('p2pAnswer', data)
  // }

  render() {
    return(
      <div>
        <Canvas />
      </div>
    )
  }
}

// function App(){
  
//   useEffect(()=> {
//     const socket = io('http://localhost:4000');
//     socket.on('newParticipant', ()=>{
//       console.log('received new participant')
//     })
//   })

//   return (
//     <div>
//       Chat test in console
//     </div>
//   );
// }


export default App;

import React from 'react';
import p5 from 'p5';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../sketches/sketch'
import CanvasToolBar from './CanvasToolBar';

import './Canvas.css'


class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {redirect: false,
                    color: 'black',
                    drawType: 'circle',
                    strokeWeight: '1',
                    displayToolBar: true,
                                    };
    };
    
    toggleDisplayToolBar() {
        this.setState({displayToolBar: !this.state.displayToolBar});
        console.log(this.state);
    }
    undo(e) {
        sketch.undo();
    }
    redo(e) {
        sketch.redo();
    }
    clearButtonPressed(e) {
        sketch.clearButtonPressed();
    }
    
    changeColor(e) {
        sketch.changeColor(e.target.value);
    }
    
    strokeWeightChange(e) {
        this.setState({strokeWeight:e.target.value});
        sketch.strokeWeightChange(e.target.value);
        console.log("slider: " + this.state.strokeWeight);
    }
    changeDrawType(e) {
        sketch.changeDrawType(e.target.value);
    }
    addText(e) {
        if (e.key === 'Enter') {
        sketch.addText(e.target.value);
        }
    }
    historyChange(e) {
        sketch.historyChange(e.target.value);
    }
    // RequestEmotionalResponse() {
    //     this.setState({redirect: false});
    // }
    // displayDropDown() {
    //   console.log("ran")
    //   var dropdown = document.getElementsByClassName("drop-down-contents")[0];
    //   (dropdown.style.display == "block") ? dropdown.style.display = "none" : dropdown.style.display = "block";
    // }
    render() {
        // if(this.state.redirect) {
        //   return <PreSessionSurvey RequestEmotionalResponse={this.RequestEmotionalResponse.bind(this)}/>
        // }
        return(
        <div className="canvas">
            <P5Wrapper sketch={sketch} displayToolBar={this.state.displayToolBar} strokeWeight={this.state.strokeWeight} drawType={this.state.drawType} color={this.state.color}/>
            <CanvasToolBar sketch={sketch} toggleDisplayToolBar={this.toggleDisplayToolBar.bind(this)} displayToolBar={this.state.displayToolBar} undo={this.undo} redo={this.redo} historyChange={this.historyChange} addText={this.addText} changeDrawType={this.changeDrawType} strokeWeight={this.state.strokeWeight} strokeWeightChange={this.strokeWeightChange.bind(this)} clearButtonPressed={this.clearButtonPressed.bind(this)} changeColor={this.changeColor.bind(this)}/> {/*onClick={this.changeHandler.bind(this)}*/}
        </div>
        )
    }
    }
    

export default Canvas;
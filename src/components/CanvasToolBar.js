import React, {Component} from 'react';
import './CanvasToolBar.css';
// import ArrowIcon from '../../assets/Arrow-Icon.svg';

class CanvasToolBar extends Component {
  constructor(props) {
    super(props);
    // this.state = {display: false};
  }
  // toggleDisplayToolBar() {
  //   this.setState({display : !this.state.display});
  //   console.log(this.state);
  // }
  render() {
    return (
      <div className="canvas-tool-bar">

      <div className={this.props.displayToolBar ? 'toggle-button' : 'display-toggle-button'}>
        {/* <img id="arrow-icon" className={this.props.displayToolBar ? 'down-arrow-icon' : 'up-arrow-icon'} alt="arrow icon" src={ArrowIcon} onClick={this.props.toggleDisplayToolBar}/> */}
      </div>
      <div className={this.props.displayToolBar ? 'tool-bar' : 'display-tool-bar'}>
        {/* <div className="history-slider">
          <input type="range"  min="1"  max="100" step="1" onChange={this.props.historyChange.bind(this)}/>
        </div> */}
        <label for="strokeWeight">Stroke</label>
        <input id="strokeWeight" type="range" defaultValue={this.props.strokeWeight}  min="1"  max="10" step="1" onInput={this.props.strokeWeightChange.bind(this)}/>
        {/* <input type="text" className="text-input" onKeyPress={this.props.addText}></input> */}
        <div className="drop-down">
          <div className="drop-down-contents">
            <ul>
              <li><button value='green' onClick={this.props.changeColor}>Green</button></li>
              <li><button value='blue' onClick={this.props.changeColor}>Blue</button></li>
              <li><button value='red' onClick={this.props.changeColor}>Red</button></li>
              <li><button value='black' onClick={this.props.changeColor}>Black</button></li>
            </ul>
          </div>
          <button>Colors</button>
        </div>
        <div className="drop-down">
          <div className="drop-down-contents">
            <ul>
              <li><button value='rectangle' onClick={this.props.changeDrawType}>Rectangle</button></li>
              <li><button value='circle' onClick={this.props.changeDrawType}>Circle</button></li>
              <li><button value='point' onClick={this.props.changeDrawType}>Point</button></li>
              <li><button value='freeHand' onClick={this.props.changeDrawType}>Free Hand</button></li>
              <li><button value='erase' onClick={this.props.changeDrawType}>Erase</button></li>
            </ul>
          </div>
          <button>Draw Tools</button>
        </div>
        <button onClick={this.props.clearButtonPressed}>Clear</button>
        <button onClick={this.props.undo}>Undo</button>
        <button onClick={this.props.redo}>Redo</button>
      </div>
      </div>
    )
  }
}

export default CanvasToolBar;
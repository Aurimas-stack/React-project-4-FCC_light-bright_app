import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: [],
      lastID: '',
      lastColor: '',
      isTRUE: true,
    }
    this.handleCompleteReset = this.handleCompleteReset.bind(this);
    this.handleResetColor = this.handleResetColor.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
  }
  handleColorChange = (e) => {
    let newColor = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    let currValue = e.target.id;
    if(!this.state.color.includes(currValue)) {   
      this.setState({
        color: [...this.state.color, currValue],
        lastID: currValue,
        lastColor: newColor
      })
      e.target.style.backgroundColor = newColor;
    } else {
      e.target.style.backgroundColor = newColor;
      this.setState({
        lastID: currValue,
        lastColor: newColor
      })
    }
  }
  handleDrag = (event) => {
    if(this.state.lastColor !== '') {
      event.target.style.backgroundColor = this.state.lastColor;
    }
    event.dataTransfer.effectAllowed = "copyMove";
    event.stopPropagation();
    event.preventDefault();
  }
  handleDragLeave = (event) => {
    this.setState({
      lastID: event.target.id
    })
    event.stopPropagation();
    event.preventDefault();
  }
  handleColorReset = (event) => {
     if(event.target.id === this.state.lastID) {
        event.target.style.backgroundColor = null;
        this.setState({
          lastColor: '',
        })
     }
     event.preventDefault();
  }
  handleCompleteReset(event) {
    this.setState({
      color:[],
      lastID: '',
      lastColor: '',
      isTRUE: false
    })
    event.preventDefault();
  }
  componentDidUpdate() {
    if(this.state.isTRUE === false) {
      this.setState({
        isTRUE: true
      })
    }
  }
  handleResetColor(event) {
    if(this.state.lastID !== '') {
      const lastCircle = document.getElementById(this.state.lastID);
      lastCircle.style.backgroundColor = null;
      this.setState({
        lastID: ''
      })
    }
    event.preventDefault();
  }
  render() {
    let circleArr = [];
    for(let i = 0; i < 741; i++) {
        circleArr.push(
            <div className='circle' 
            key={i}
            id={i}
            onDragLeave = {this.handleDragLeave}
            onDragEnter = {this.handleDrag}
            onClick={this.handleColorChange}
            onDoubleClick={this.handleColorReset}
            style={this.state.isTRUE === false ? {backgroundColor: null} : {} }>
            </div>
        )
    }
    return (
      <div className='app'>
        <div className='header'>
          <h1 className='app-name'>Light-bright Colour Changing Circles</h1>
          <div className='button-container'>
            <button value={this.state.lastID} onClick={this.handleResetColor}>Reset Colour</button>
            <button onClick={this.handleCompleteReset}>Reset All</button>
          </div>
        </div>
        <div className='main-circle-container'>
                {
                    circleArr.map(circle => {
                        return circle;
                    })
                }
            </div>
      </div>
    )
  }
}

export default App;

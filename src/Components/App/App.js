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
    this.myRef = React.createRef();
    this.handleCompleteReset = this.handleCompleteReset.bind(this);
    this.handleResetColor = this.handleResetColor.bind(this);
  }
  handleColorChange = (e) => {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let newColor = '#' + ("000000" + hex.toString(16)).substr(-6);
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
  handleColorReset = (event) => {
     if(this.state.color.map(el => el === this.state.lastID)) {
        this.setState({
          lastID: '',
          lastColor: ''
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
            ref={this.myRef}
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

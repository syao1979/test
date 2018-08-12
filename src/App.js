import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './games/tictactoe'



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <img src={require('./images/yinyang.png')} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the fun site</h1>

        </header>
        <div id="potrait">
          <img src={require('./images/p2018b.png')} width="80px" height="80px" className="personal-logo" alt="owner" />
        </div>


        {/* <Board className="board" /> */}
        <Board className="board" />
      </div>
    );
  }
}


export default App;

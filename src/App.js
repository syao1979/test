import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './games/tictactoe.css';
import Board from './games/tictactoe'



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* A JSX comment */}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}

          <img src={require('./images/yinyang.png')} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the fun site</h1>

        </header>
        <div id="potrait">
          <img src={require('./images/head.png')} width="80px" height="80px" className="personal-logo" alt="owner" />
        </div>

        {/*
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          It will reload the page.
        </p>
      */}

        <Board className="board" />
      </div>
    );
  }
}


export default App;

import React, { Component } from 'react';
import './tictactoe.css' 

//now, make Square a functional component - no state 
function Square(props) {
  return (
    <button className="square" title="click me" onClick={props.onClick}>
    {/* in regular component : <button onClick={() => this.props.onClick()} > */}
      {props.value}
    
    </button>
  );
}

function Reset(props) {
  return (
    <button className="reset" title="reset" onClick={props.onClick}>
    New Game
    </button>
  );
}

class Board extends Component {


  constructor(props) {
    super(props);
    this.tiles = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.state = {
      squares: Array(9).fill(null),
      ingame : false,
    };
  }

  renderSquare(i) {
    // We split the returned element into multiple lines for readability, 
    // and added parentheses so that JavaScript doesn’t insert a semicolon after return and break our code.
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  resetGame(i) {
    this.state.ingame = false;
    this.setState({
      squares: new Array(9).fill(null),
    })
  }

  makeMove(squares, i, robat=false) { // ES6 param default
      // const squares = this.state.squares.slice();
      let symbal = 'X';
      if (robat){
        symbal = 'O';
      }
      // console.log(`${symbal}; ${i}`);   // ES6 Template Literals
      squares[i] = symbal; 
      this.setState({
        squares: squares,
      });
  }

  handleClick(i) {
    let squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return; // if has winner or sq already used, do nothing
      this.state.ingame = false;
    } else {
      this.state.ingame = true;
    }

    this.makeMove(squares, i);

    if (!this.calculateWinner(squares)) {
      // const idx = this.randomPickNextTile(squares);
      const idx = this.aiPickNextTile(squares);
      this.makeMove(squares, idx, true); 
    }
  }

  randomPickNextTile(squares){
    const index = (max)=>Math.floor(Math.random() * max)  // randomly gen 0..max 
    const avail_tile = []
    for (let i = 0; i < 3; i++) {
      const row = this.tiles[i];
      for (let idx of row){
        if ( !squares[idx] &&  !(idx in avail_tile) ){
            avail_tile.push(idx)
        }
      }
    }
    
    const idx = avail_tile[index(avail_tile.length-1)]
    console.dir(avail_tile)
    console.log(`random idx = ${idx}`)
    return idx

  }

  aiPickNextTile(squares){
    const index = (max)=>Math.floor(Math.random() * max)  // randomly gen 0..max 
    const atiles = []
    for (let i = 0; i < 3; i++) {
      const row = this.tiles[i];
      for (let idx of row){
        if ( !squares[idx] &&  !(idx in atiles) ){
            atiles.push(idx)
        }
      }
    }
    
    //atiles contain tiles robat can play on

    // found 1st idx to make play win
    let idx = null;
    for (let i = 0; i < this.tiles.length; i++) {
      let triple = this.tiles[i].map((idx)=>squares[idx]);  // a triple of squares
      let pcnt = triple.filter((v)=>v=='O').length
      // if me play make a win, play it
      if (pcnt === 2){
        idx = this.tiles[i][triple.indexOf(null)] // null index in triple 
        console.log(`robat play ${idx} to win`)
        break
      } else {
        // if user play one make a win, block it
        pcnt = triple.filter((v)=>v=='X').length
        if (pcnt === 2){
          console.log(`user ${i} will win!`)
          idx = this.tiles[i][triple.indexOf(null)] // null index in triple 
          console.log(`robat play ${idx}`)
          break
        } else {
          console.log(`row ${i} safe`)
        } 
      }
    }

    if (!idx){
      idx = atiles[index(atiles.length-1)]
    } 

    return idx

  }

  calculateWinner(squares) {

    for (let i = 0; i < this.tiles.length; i++) {
      const [a, b, c] = this.tiles[i];  // ES6 destructuring assignments
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  tie() {
    let tie = true;
    for (let i = 0; i < this.tiles.length; i++) {
      let triple = this.tiles[i].map((idx)=>this.state.squares[idx]);
      if (triple.indexOf(null) > -1){
        tie = false
        break
      }
    }
    return false;
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status = '';
    if (winner === 'X') {
      status = 'You win!';
    } else if (winner === 'O'){
      status = 'Computer win!'
    } else if (this.tie(this.state.squares)){
      status = 'It is a draw!'
    } 

    let timmer = '';
    if (this.state.ingame){
      // timmer = 'Time : '
      timmer = '';
    }

    return (
      <div id="tictactoe-board-div">
          <div className="status">{status}</div>
          <table id="tictactoe-board">
            <tbody>
              <tr className="board-row">
                <td className="board-td">{this.renderSquare(0)}</td>
                <td className="board-td">{this.renderSquare(1)}</td>
                <td className="board-td">{this.renderSquare(2)}</td>
              </tr>
              <tr className="board-row">
                <td className="board-td">{this.renderSquare(3)}</td>
                <td className="board-td">{this.renderSquare(4)}</td>
                <td className="board-td">{this.renderSquare(5)}</td>
              </tr>
              <tr className="board-row">
                <td className="board-td">{this.renderSquare(6)}</td>
                <td className="board-td">{this.renderSquare(7)}</td>
                <td className="board-td">{this.renderSquare(8)}</td>
              </tr>
              <tr>
                <td colSpan="3"><Reset onClick={() => this.resetGame()} /></td>
              </tr>
              <tr><td colSpan="3">{timmer}</td></tr>
            </tbody>

          </table>
      </div>
    );
  }
}

export default Board; 
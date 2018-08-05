import React, { Component } from 'react';
import './tictactoe.js' /*didn't work!*/

/*
class Square extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: null,
    // };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
*/

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
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
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
    this.setState({
      squares: new Array(9).fill(null),
    })
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return; // if has winner or sq already used, do nothing
    }

    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        
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
              </tbody>
  
            </table>
        </div>

      </div>
    );
  }
}

export default Board; 
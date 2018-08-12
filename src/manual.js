import React, { Component } from 'react';
import 'menual.css' /*didn't work!*/


class Manual extends Component {


  constructor(props) {
    super(props);
    this.tabs = ['About me', 'Games']

    this.state = {

    };
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



  render() {


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
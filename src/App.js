import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const containerStyle = {
  marginTop: '8rem',
  marginBottom: '8rem',
  padding: '2rem',
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
}

const divStyle = {
  paddingTop: '.5rem',
  paddingBottom: '2.5rem'
}

const buttonStyle = {
  color: '#404040'
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <table className="board-row">
          <tbody>
            <tr>
              <td>{this.renderSquare(0)}</td>
              <td className="vertical">{this.renderSquare(1)}</td>
              <td>{this.renderSquare(2)}</td>
            </tr>
          </tbody>
        </table>
        <table className="board-row">
          <tbody>
            <tr>
              <td className="horizontal">{this.renderSquare(3)}</td>
              <td className="vertical horizontal">{this.renderSquare(4)}</td>
              <td className="horizontal">{this.renderSquare(5)}</td>
            </tr>
          </tbody>
        </table>
        <table className="board-row">
          <tbody>
            <tr>
              <td>{this.renderSquare(6)}</td>
              <td className="vertical">{this.renderSquare(7)}</td>
              <td>{this.renderSquare(8)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class Game extends Component {

  constructor(props) {
    super(props);
    this.resetGame = this.resetGame.bind(this);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  resetGame() {
    this.setState(() => {
      return {
        squares: Array(9).fill(null),
        xIsNext: true,
      }
    });
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <Grid container spacing={32}>
        <Paper style={containerStyle}>
          <div className="game">
            <div style={divStyle} className="game-board">
              <Board
                squares={this.state.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            <Divider />
            <div style={divStyle} className="game-info">
              <div>{status}</div>
            </div>
            <Button style={buttonStyle} variant="contained" color="default" onClick={this.resetGame}>Reset Game</Button>
          </div>
        </Paper>
      </Grid>
    );
  }
}

//helper function
function calculateWinner(squares) {
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


export default Game;

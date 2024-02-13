import React, { useState } from 'react';
import './App.css'; // Create a corresponding CSS file for styling

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameActive, setGameActive] = useState(true);
  const [resultMessage, setResultMessage] = useState('');

  const startNewGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameActive(true);
    setResultMessage('');
  };

  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const checkDraw = () => {
    return board.every(cell => cell !== '');
  };

  const handleCellClick = (index) => {
    if (!gameActive || board[index] !== '') return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWin();
    const draw = checkDraw();

    if (winner) {
      setGameActive(false);
      setResultMessage(`Player ${winner} wins!`);
    } else if (draw) {
      setGameActive(false);
      setResultMessage('It\'s a draw!');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  return (
    <div className="App">
      <div id="game-board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleCellClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <div id="result-screen" style={{ display: resultMessage ? 'flex' : 'none' }}>
        <h1>{resultMessage}</h1>
        <button id="new-game-btn" onClick={startNewGame}>New Game</button>
      </div>
    </div>
  );
};

export default App;
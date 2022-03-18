import React, { useState , useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [winner, setWinner] = useState(null);
  const [playCount, setPlayCount] = useState(0);
  const handleCellClick = (index) => {
    if(board[index] !== "") return null;
    if(winner) return null;
    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));
    setCurrentPlayer(currentPlayer === 'X' ? "O" : "X");
    setPlayCount(playCount + 1);
  }

  function calculateWinner() {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
      }
    }
    if(playCount === 9) setWinner("E");
  }

  useEffect(calculateWinner, [board, playCount]);
  const resetGame = () => {
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setWinner(null);
    setPlayCount(0);
  }

  return (
    <main>
      <h1 className='title'>Jogo da Velha</h1>

      <div className={`board ${winner ? "game over" : ""}`}>
        {board.map((item, index) => (
          <div
          key={index}
          className={`cell ${item}`}
          onClick={() => handleCellClick(index)}
        >
            {item}
        </div>
        ))}
      </div>
      {winner &&
        <footer>
          {winner === "E" ?
          <h2 className='winner-message'>
            <span className={winner}>Empatou!</span>
          </h2>
          :
          <h2 className='winner-message'>
            <span className={winner}>{winner} venceu!</span>
          </h2>
          }
          <button className="btn" onClick={resetGame}>Recomeçar o jogo!</button>
        </footer>
      }
    </main>
  );
}

export default TicTacToe;

'use client'

import { useState } from 'react';

function Square({ value, onSquareClick }) {  
  return <button className="square" onClick={onSquareClick}>{ value }</button>;
}

function Header() {
  return (
    <header className="p-3 bg-zinc-900 text-zinc-200 font-bold flex justify-between leading-6 content-center">
      <h1 className="text-4xl px-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        Tres en Línea</h1>      
      <nav className="p-2 inline-block">
        <ul>
          <li className='inline mx-5'><a href="/">Inicio</a></li>
          <li className='inline'><a href="/juegos">Juegos</a></li>
        </ul>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-200 text-xs absolute bottom-0.5">
      Elaborado por Edalmava con ❤️
    </footer>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

    return (
      <>   
        <div className="status m-5">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </>          
    ) 
  }

  export default function Game() {    
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
      setHistory(nextHistory)
      setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(nextMove) {
      setCurrentMove(nextMove)
    }

    const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Ir al movimiento #' + move;
      } else {
        description = 'Ir al inicio del juego';
      }
      return (
        <li key={move}>
          <button className="border-2" onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    })

    return (
      <div className="container p-4">
        <Header />

        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>

        <Footer />
      </div> 
    );
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
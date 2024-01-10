import { useState } from "react";
import Game from "./Game";

export default function App() {

  const [score, setScore] = useState(2)
  const [gameOver, setGameOver] = useState(false)
  const [gameWin, setGameWin] = useState(false)

  function restart() {
    setGameOver(false)
    setGameWin(false)
    setScore(2)
  }

  return (
    <div className="App">
      <div className="score">
        <span>Score: {score}</span>
      </div>
      {gameOver ?
        <div className="the-end">
          <span className="title">Ну и хуй с ним...</span>
          <button onClick={restart}>RESTART</button>
        </div> :
        gameWin ?
          <div className="the-end">
            <span className="title">Поздравляю победил...</span>
            <button onClick={restart}>RESTART</button>
          </div> :
          <Game setScore={setScore} setGameOver={setGameOver} setGameWin={setGameWin} />
      }
    </div>
  );
}


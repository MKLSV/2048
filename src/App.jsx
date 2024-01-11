import { useState } from "react";
import Game from "./Game";
import JSConfetti from 'js-confetti'


export default function App() {

  const [score, setScore] = useState(2)
  const [gameOver, setGameOver] = useState(false)
  const [gameWin, setGameWin] = useState(false)

  function restart() {
    setGameOver(false)
    setGameWin(false)
    setScore(2)
  }

  function winner() {
    setGameWin(true)
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()
  }
  function lose() {
    setGameOver(true)
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()
  }

  return (
    <div className="App">
      <div className="score">
        <span>Score: {score}</span>
      </div>
      {gameOver ?
        <div className="the-end">
          <span className="title">Ну и хуй с ним, вот салютик...</span>
          <button onClick={restart}>RESTART</button>
        </div> :
        gameWin ?
          <div className="the-end">
            <span className="title">Поздравляю, но кроме салютика ты все равно ничего не получишь...</span>
            <button onClick={restart}>RESTART</button>
          </div> :
          <Game setScore={setScore} lose={lose} winner={winner} />
      }
    </div>
  );
}


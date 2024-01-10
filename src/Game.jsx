import { useEffect, useState } from "react"

export default function Game({ setScore, setGameOver, setGameWin }) {


    const [board, setBoard] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ])

    const [startTouchPosition, setStartTouchPosition] = useState(null);

    useEffect(() => {
        let newBoard = [...board]
        const randomRow = Math.floor(Math.random() * newBoard.length)
        const randomCol = Math.floor(Math.random() * newBoard[0].length)
        newBoard[randomRow][randomCol] = 2
        setBoard(newBoard)
    }, []);

    function handleTouchStart(event) {
        const touch = event.touches[0];
        setStartTouchPosition({ x: touch.clientX, y: touch.clientY });
    }

    function handleTouchEnd(event) {
        if (!startTouchPosition) {
            return;
        }

        const touch = event.changedTouches[0];
        const endTouchPosition = { x: touch.clientX, y: touch.clientY };
        const deltaX = endTouchPosition.x - startTouchPosition.x;
        const deltaY = endTouchPosition.y - startTouchPosition.y;

        if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) return
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                console.log('Swiped right');
                goRight()
            } else {
                console.log('Swiped left');
                goLeft()
            }
        } else {
            if (deltaY > 0) {
                console.log('Swiped down');
                goDown()
            } else {
                goUp()
                console.log('Swiped up');
            }
        }

        setStartTouchPosition(null);
    }

    const keyDown = (event) => {
        console.log(event.key)
        switch (event.key) {
            case 'ArrowUp':
                goUp();
                break;
            case 'ArrowDown':
                goDown()
                break;
            case 'ArrowRight':
                goRight()
                break;
            case 'ArrowLeft':
                goLeft()
                break;
            default:
                break;
        }
    }

    const onTouch = (event) => {
        console.log(event)
    };

    function goUp() {
        const newBoard = [...board];
        const numRows = newBoard.length;
        const numCols = newBoard[0].length;

        for (let col = 0; col < numCols; col++) {
            let merged = false;
            let rowIndex = 0;

            for (let row = 0; row < numRows; row++) {
                if (newBoard[row][col] !== 0) {
                    newBoard[rowIndex][col] = newBoard[row][col];

                    if (row !== rowIndex) {
                        newBoard[row][col] = 0;
                    }

                    rowIndex++;
                }
            }

            for (let row = 0; row < numRows - 1; row++) {
                if (newBoard[row][col] === newBoard[row + 1][col] && newBoard[row][col] !== 0) {
                    newBoard[row][col] *= 2;
                    newBoard[row + 1][col] = 0;
                    merged = true;
                }
            }

            if (merged) {
                rowIndex = 0;
                for (let row = 0; row < numRows; row++) {
                    if (newBoard[row][col] !== 0) {
                        newBoard[rowIndex][col] = newBoard[row][col];

                        if (row !== rowIndex) {
                            newBoard[row][col] = 0;
                        }

                        rowIndex++;
                    }
                }
            }
        }

        updateBoard(newBoard)

    }

    function goDown() {
        const newBoard = [...board];
        const numRows = newBoard.length;
        const numCols = newBoard[0].length;

        for (let col = 0; col < numCols; col++) {
            let merged = false;
            let rowIndex = numRows - 1;

            for (let row = numRows - 1; row >= 0; row--) {

                if (newBoard[row][col] !== 0) {
                    newBoard[rowIndex][col] = newBoard[row][col];

                    if (row !== rowIndex) {
                        newBoard[row][col] = 0;
                    }

                    rowIndex--;
                }
            }

            for (let row = numRows - 1; row > 0; row--) {

                if (newBoard[row][col] === newBoard[row - 1][col] && newBoard[row][col] !== 0) {
                    newBoard[row][col] *= 2;
                    newBoard[row - 1][col] = 0;
                    merged = true;
                }
            }

            if (merged) {
                rowIndex = numRows - 1;
                for (let row = numRows - 1; row >= 0; row--) {
                    if (newBoard[row][col] !== 0) {
                        newBoard[rowIndex][col] = newBoard[row][col];

                        if (row !== rowIndex) {
                            newBoard[row][col] = 0;
                        }

                        rowIndex--;
                    }
                }
            }
        }
        updateBoard(newBoard)
    }


    function goRight() {
        const newBoard = [...board];

        for (let row = 0; row < board.length; row++) {
            let rowIndex = 3;
            let merged = false;
            for (let col = newBoard[row].length - 1; col >= 0; col--) {

                if (newBoard[row][col] !== 0) {
                    newBoard[row][rowIndex] = newBoard[row][col];

                    if (col !== rowIndex) {
                        newBoard[row][col] = 0;
                    }

                    rowIndex--;
                }
            }
            for (let col = newBoard[row].length - 1; col >= 0; col--) {
                if (newBoard[row][col] === newBoard[row][col - 1] && newBoard[row][col] !== 0) {
                    newBoard[row][col] *= 2;
                    newBoard[row][col - 1] = 0;
                    merged = true
                }
            }
            if (merged) {
                let rowIndex = 3;
                for (let col = newBoard[row].length - 1; col >= 0; col--) {

                    if (newBoard[row][col] !== 0) {
                        newBoard[row][rowIndex] = newBoard[row][col];

                        if (col !== rowIndex) {
                            newBoard[row][col] = 0;
                        }

                        rowIndex--;
                    }
                }
            }
        }
        updateBoard(newBoard)


    }
    function goLeft() {
        const newBoard = [...board];
        for (let row = 0; row < board.length; row++) {
            let rowIndex = 0;
            let merged = false;
            for (let col = 0; col < newBoard[row].length; col++) {
                if (newBoard[row][col] !== 0) {
                    newBoard[row][rowIndex] = newBoard[row][col];

                    if (col !== rowIndex) {
                        newBoard[row][col] = 0;
                    }

                    rowIndex++;
                }
            }
            for (let col = 0; col < newBoard[row].length - 1; col++) {
                if (newBoard[row][col] === newBoard[row][col + 1] && newBoard[row][col] !== 0) {
                    newBoard[row][col] *= 2;
                    newBoard[row][col + 1] = 0;
                    merged = true
                }
            }
            if (merged) {
                let rowIndex = 0;
                for (let col = 0; col < newBoard[row].length; col++) {
                    if (newBoard[row][col] !== 0) {
                        newBoard[row][rowIndex] = newBoard[row][col];

                        if (col !== rowIndex) {
                            newBoard[row][col] = 0;
                        }

                        rowIndex++;
                    }
                }

            }
        }
        updateBoard(newBoard)
    }

    function updateBoard(newBoard) {
        let emptyCell = []
        let score = 0

        for (let row = 0; row < newBoard.length; row++) {
            for (let col = 0; col < newBoard[row].length; col++) {
                if (newBoard[row][col] > score) score = newBoard[row][col]
                if (newBoard[row][col] === 0) emptyCell.push({ row, col })
            }
        }
        if (!emptyCell.length) {
            setGameOver(true)
            return
        }
        if (score === 2048) {
            setGameWin(true)
            return
        }
        const randomIndex = Math.floor(Math.random() * emptyCell.length)
        const randomCell = emptyCell[randomIndex]

        let randomNum = score > 8 ? score / 4 : 2
        newBoard[randomCell.row][randomCell.col] = randomNum
        setBoard(newBoard)
        setScore(score)
    }

    return (
        <div className="game-container" onKeyDown={keyDown} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} tabIndex="0">
            {board.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="board-row">
                    {row.map((tile, colIndex) => (
                        <div key={`tile-${rowIndex}-${colIndex}`} className={'tile t' + tile}>
                            {tile !== 0 ? <span>{tile}</span> : ''}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

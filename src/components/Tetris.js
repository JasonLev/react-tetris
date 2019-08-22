import React, { useState } from "react";

import { createStage, checkCollision } from "../gameHelpers";

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

// Custom Hooks
import { useStage } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

//Components
import Stage from './Stage';
import StartButton from './StartButton';
import Display from './Display';

const Tetris = () => {
    const [droptime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const playerMoveHorizontal = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0})) {
            updatePlayerPos({ x: dir, y: 0 })
        }
    }
    const startGame = () => {
        //Reset the Game
        setStage(createStage())
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }
    const drop = () => {
        // level-up when a player clears 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1)
            // increase the speed
            setDropTime(1000 / (level + 1) + 250)
        }
        if (!checkCollision(player, stage, { x: 0, y: 1})) {
            updatePlayerPos({ x: 0, y: 1, collided: false})
        } else {
            // check for game over condition
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true})
        }

    }
    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 250);
            }
        }
    }
    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }
    const move = ({keyCode}) => {
        if (!gameOver) {
         if (keyCode === 37) {
             playerMoveHorizontal(-1);
         } else if (keyCode === 39) {
             playerMoveHorizontal(1);
         } else if (keyCode === 40) {
             dropPlayer();
         } else if (keyCode === 38) {
             playerRotate(stage, 1);
         }
        }
    }

    useInterval(() => {
        drop();
    }, droptime);

    return (
        <StyledTetrisWrapper 
            role="button"
            tabIndex="0"
            onKeyDown={e => move(e)}
            onKeyUp={keyUp}
        >
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over!" />
                    ) : (
                        <div>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Rows: ${rows}`} />
                            <Display text={`Level: ${level}`} />
                        </div>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}
export default Tetris;

import React, { useState } from "react";

import { createStage, checkCollision } from "../gameHelpers";

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

// Custom Hooks
import { useStage } from "../hooks/useStage";
import { usePlayer } from "../hooks/usePlayer";

//Components
import Stage from './Stage';
import StartButton from './StartButton';
import Display from './Display';

const Tetris = () => {
    const [droptime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    const playerMoveHorizontal = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0})) {
            updatePlayerPos({ x: dir, y: 0 })
        }
    }
    const startGame = () => {
        //Reset the Game
        setStage(createStage())
        resetPlayer();
        setGameOver(false);
    }
    const drop = () => {
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
    const dropPlayer = () => {
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

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over!" />
                    ) : (
                        <div>
                            <Display text="Score"/>
                            <Display text="Rows"/>
                            <Display text="Level"/>
                        </div>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}
export default Tetris;

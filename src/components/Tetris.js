import React, { useState } from "react";

import { createStage } from "../gameHelpers";

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

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    const playerMove = dir => {
        updatePlayerPos({ x: dir, y: 0 })
    }
    const startGame = () => {
        //Reset the Game
        setStage(createStage())
        resetPlayer();
    }
    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false})

    }
    const dropPlayer = () => {
        drop();
    }
    const move = ({keyCode}) => {
        if (!gameOver) {
         if (keyCode === 37) {
             playerMove(-1);
         } else if (keyCode === 39) {
             playerMove(1);
         } else if (keyCode === 40) {
             dropPlayer();
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

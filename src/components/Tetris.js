import React, { useState } from "react";

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

    const [player] = usePlayer();
    const [stage, setStage] = useStage(player);

    return (
        <StyledTetrisWrapper>
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
                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}
export default Tetris;

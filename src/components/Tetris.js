import React from "react";

import { createStage } from '../gameHelpers'
//Components
import Stage from './Stage';
import StartButton from './StartButton';
import Display from './Display';

const Tetris = () => {
    return (
        <div>
            <Stage stage={createStage()}/>
            <aside>
                <div>
                    <Display text="Score"/>
                    <Display text="Rows"/>
                    <Display text="Level"/>
                </div>
                <StartButton />
            </aside>
        </div>
    )
}
export default Tetris;

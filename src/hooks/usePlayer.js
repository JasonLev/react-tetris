import { useState, useCallback } from "react";

import { randomTetromino, TETROMINOS } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    })

    const rotate = (matrix, dir) => {
        // make the rows to become columns (transpose)
        const rotatedTetromino = matrix.map((_, index) => 
            matrix.map(col => col[index])
        );
        // reverse each row to rotate the matrix
        if (dir > 0) {
            return rotatedTetromino.map(row => row.reverse());
        }
        return rotatedTetromino.reverse();
    }
    const playerRotate = (stage, dir) => {
        const playerClone = JSON.parse(JSON.stringify(player));
        playerClone.tetromino = rotate(playerClone.tetromino, dir);
        // don't allow rotate when beside a boundary
        const pos = playerClone.pos.x
        let offset = 1;
        while (checkCollision(playerClone, stage, { x: 0, y: 0 })) {
            playerClone.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > playerClone.tetromino[0].length) {
                rotate(playerClone.tetromino, -dir);
                playerClone.pos.x = pos;
                return;
            }
        }
        
        
        setPlayer(playerClone);
    }
    const updatePlayerPos = ({ x, y, collided}) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided
        }))
    }
    const resetPlayer = useCallback(() => {
      setPlayer({
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false
      });
    }, []);

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}
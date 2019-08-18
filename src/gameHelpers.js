export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () => 
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

export const checkCollision = (player, stage, { x: moveX, y: moveY}) => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[y].length; x++) {
            // check that we're on a tetromino cell
            if (player.tetromino[y][x] !== 0) {
                // check that the move is inside the game area
                if (!stage[y + player.pos.y + moveY] ||
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1 ] !== 'clear') {
                    return true;
                }
            }
            
        }
    }
}
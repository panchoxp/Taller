import { Coordenadas } from "../types/types";


export const checkGameOver = (snakeHead: Coordenadas, limite: any ): boolean => {
    return (
        snakeHead.x < limite.xMin ||
        snakeHead.x > limite.xMax ||
        snakeHead.y < limite.yMin ||
        snakeHead.y > limite.yMax 
    )
};
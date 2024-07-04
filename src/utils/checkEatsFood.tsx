import { Coordenadas } from "../types/types";

export const checkEatsFood = (
    head: Coordenadas,
    food: Coordenadas,
    area: number,

):boolean => {
        const distaceBetweenFoodAndSnakeX: number = Math.abs(head.x - food.x);
        const distaceBetweenFoodAndSnakeY: number = Math.abs(head.y - food.y);
        return (
            distaceBetweenFoodAndSnakeX < area && distaceBetweenFoodAndSnakeY < area
        )
}

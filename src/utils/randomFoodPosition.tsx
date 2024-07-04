import { Coordenadas } from "../types/types";

export const randomFoodPosition = (maxX: number, maxY : number): Coordenadas => {
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),

    }
}
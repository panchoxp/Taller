export enum  Direccion {
    Right,
    Up,
    Left,
    Down,
}

export interface GestureEventType {
    nativeEvent: {translationX: number, translationY: number}
}

export interface Coordenadas {
    x: number;
    y: number;
} 
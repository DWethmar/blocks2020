import { Component, ComponentType } from './component';
import { createUniqueId } from './id';

export interface Point3D {
    x: number;
    y: number;
    z: number;
}

export interface Position {
    position: Point3D,
    velocity : Point3D,
}

export function createPoint(x: number = 0, y: number = 0, z: number = 0): Point3D {
    return {x: x, y: y, z: z};
}

export function createPositionComponent(gameObjectId: string, point?: Point3D): Component<Position> {
    return {
        id:             createUniqueId(),
        gameObjectId:   gameObjectId,
        type:           ComponentType.POSITION,
        state: {
            position: point ? point : createPoint(),
            velocity: createPoint(),
        }
    };
}

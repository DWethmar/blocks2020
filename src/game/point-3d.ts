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
    acceleration : Point3D,
}

export function createPoint(): Point3D {
    return {x: 0, y: 0, z: 0};
}

export function createPositionComponent(gameObjectId: string, point?: Point3D): Component<Position> {
    return {
        id: createUniqueId(),
        gameObjectId: gameObjectId,
        type: ComponentType.POSITION,
        state: {
            position: point ? point : createPoint(),
            velocity: createPoint(),
            acceleration: createPoint(),
        }
    };
}

import { Component } from './component';
import { Point3D } from '../point';
import { createUniqueId } from '../id';

export const POSITION_COMPONENT = 'POSITION';

export interface Position extends Component {
    data: {
        position: Point3D;
        velocity: Point3D;
    };
}

export function createPoint(
    x: number = 0,
    y: number = 0,
    z: number = 0
): Point3D {
    return { x: x, y: y, z: z };
}

export function createPositionComponent(
    gameObjectId: string,
    point?: Point3D
): Position {
    return {
        ID: createUniqueId(),
        gameObjectID: gameObjectId,
        type: POSITION_COMPONENT,
        data: {
            position: point ? point : createPoint(),
            velocity: createPoint(),
        },
    };
}

import { Component } from '../core/engine/component';
import { Point3D } from '../core/point-3d';
import { POSITION_COMPONENT } from './spec';
import { createUniqueId } from '../core/id';

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
        id: createUniqueId(),
        gameObjectId: gameObjectId,
        type: POSITION_COMPONENT,
        data: {
            position: point ? point : createPoint(),
            velocity: createPoint()
        }
    };
}

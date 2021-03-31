import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';
import { Point2D } from '../../core/point';

export const DIRECTION_COMPONENT = 'Direction';

export interface Direction extends Component {
    data: {
        direction: Point2D;
    };
}

export interface createDirectionComponentConfig {
    gameObjectId: string;
    direction: Point2D;
}

export function createDirectionComponent(
    config: createDirectionComponentConfig
): Direction {
    return {
        ID: createUniqueId(),
        gameObjectID: config.gameObjectId,
        type: DIRECTION_COMPONENT,
        data: {
            direction: config.direction,
        },
    };
}

export function isUp(p: Point2D): boolean {
    return p.y < 0;
}

export function isRight(p: Point2D): boolean {
    return p.x > 0;
}

export function isDown(p: Point2D): boolean {
    return p.y > 0;
}

export function isLeft(p: Point2D): boolean {
    return p.x < 0;
}

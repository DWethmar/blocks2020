import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';
import { Point2D } from '../../core/point';

export const BULLET_COMPONENT = 'BULLET';

export interface Bullet extends Component {
    data: {
        direction: Point2D;
    };
}

export interface createBulletComponentConfig {
    gameObjectId: string;
    direction: Point2D;
}

export function createBulletComponent(
    config: createBulletComponentConfig
): Bullet {
    return {
        ID: createUniqueId(),
        gameObjectID: config.gameObjectId,
        type: BULLET_COMPONENT,
        data: {
            direction: config.direction,
        },
    };
}

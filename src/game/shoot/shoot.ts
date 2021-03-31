import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';
import { Point3D } from '../../core/point';

export const SHOOTER_COMPONENT = 'SHOOTER';

export interface Shooter extends Component {
    data: {
        direction: Point3D;
    };
}

export interface createShooterComponentConfig {
    gameObjectId: string;
    direction: Point3D;
}

export function createFollowComponent(
    config: createShooterComponentConfig
): Shooter {
    return {
        ID: createUniqueId(),
        gameObjectID: config.gameObjectId,
        type: SHOOTER_COMPONENT,
        data: {
            direction: config.direction,
        },
    };
}

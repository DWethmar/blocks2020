import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';
import { Point3D } from '../../core/point';

export const SHOOTER_COMPONENT = 'SHOOTER';

export interface Shooter extends Component {
    data: {
        coolDownMS: number;
    };
}

export interface createShooterComponentConfig {
    gameObjectId: string;
}

export function createShooterComponent(
    config: createShooterComponentConfig
): Shooter {
    return {
        ID: createUniqueId(),
        gameObjectID: config.gameObjectId,
        type: SHOOTER_COMPONENT,
        data: {
            coolDownMS: 1000,
        },
    };
}

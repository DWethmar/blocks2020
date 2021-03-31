import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';

export const SHOOTER_COMPONENT = 'SHOOTER';

export interface Shooter extends Component {
    data: {
        coolDownMS: number;
        last: number;
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
            coolDownMS: 100,
            last: 0,
        },
    };
}

import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';

export const MOVEMENT_CONTROLS_COMPONENT = 'MOVEMENT_CONTROLS';

export interface MovementControls extends Component {
    data: {
        maxSpeed: number;
        speed: number;
    };
}

export function createMovementControlsComponent(
    gameObjectId: string
): MovementControls {
    return {
        ID: createUniqueId(),
        gameObjectID: gameObjectId,
        type: MOVEMENT_CONTROLS_COMPONENT,
        data: {
            maxSpeed: 2,
            speed: 0.2,
        },
    };
}

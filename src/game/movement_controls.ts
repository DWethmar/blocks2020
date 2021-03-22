import { Component } from '../core/component/component';
import { createUniqueId } from '../core/id';
import { MOVEMENT_CONTROLS_COMPONENT } from './game_engine';

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
        id: createUniqueId(),
        gameObjectId: gameObjectId,
        type: MOVEMENT_CONTROLS_COMPONENT,
        data: {
            maxSpeed: 2,
            speed: 0.2,
        },
    };
}

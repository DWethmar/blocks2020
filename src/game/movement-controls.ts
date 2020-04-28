import { Component, ComponentType } from './engine/component';
import { createUniqueId } from './id';

export interface MovementControls {
    maxSpeed: number;
    speed: number;
}

export function createMovementControlsComponent(
    gameObjectId: string
): Component<MovementControls> {
    return {
        id: createUniqueId(),
        gameObjectId: gameObjectId,
        type: ComponentType.MOVEMENT_CONTROLS,
        state: {
            maxSpeed: 2,
            speed: 0.2
        }
    };
}

import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';
import { Point3D } from '../../core/point';

export const DEBUG_COMPONENT = 'DEBUG';

export interface Debug extends Component {}

export interface createDebugComponentConfig {
    gameObjectId: string;
}

export function createDebugComponent(gameObjectID: string): Debug {
    return {
        ID: createUniqueId(),
        gameObjectID: gameObjectID,
        type: DEBUG_COMPONENT,
        data: null,
    };
}

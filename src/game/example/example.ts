import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';
import { Point3D } from '../../core/point';

export const Example_COMPONENT = 'Example';

export interface Example extends Component {
    data: {
        direction: Point3D;
    };
}

export interface createExampleComponentConfig {
    gameObjectId: string;
    direction: Point3D;
}

export function createFollowComponent(
    config: createExampleComponentConfig
): Example {
    return {
        ID: createUniqueId(),
        gameObjectID: config.gameObjectId,
        type: Example_COMPONENT,
        data: {
            direction: config.direction,
        },
    };
}

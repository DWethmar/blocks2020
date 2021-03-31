import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';
import { Point3D } from '../../core/point';

export const FOLLOW_COMPONENT = 'FOLLOW';

export interface Follow extends Component {
    data: {
        path: Point3D[];
    };
}

export interface createFollowComponentConfig {
    gameObjectId: string;
    path: Point3D[];
}

export function createFollowComponent(
    config: createFollowComponentConfig
): Follow {
    return {
        ID: createUniqueId(),
        gameObjectID: config.gameObjectId,
        type: FOLLOW_COMPONENT,
        data: {
            path: [...config.path],
        },
    };
}

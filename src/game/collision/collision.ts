import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';
import { Point3D } from '../../core/point-3d';
import { Dimensions } from '../dimensions';

export const COLLISION_COMPONENT = 'COLLISION';

export interface Collision extends Component {
    data: Dimensions & {
        offSet: Point3D;
    };
}

export interface createCollisionComponentConfig {
    gameObjectId: string;
    width: number;
    height: number;
    offSet: Point3D;
}

export function createCollisionComponent(
    config: createCollisionComponentConfig
): Collision {
    return {
        ID: createUniqueId(),
        gameObjectID: config.gameObjectId,
        type: COLLISION_COMPONENT,
        data: {
            width: config.width,
            height: config.height,
            offSet: config.offSet,
        },
    };
}

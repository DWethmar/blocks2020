import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';
import { Point3D } from '../../core/point';
import { Dimensions } from '../dimensions';

export const SPRITE_COMPONENT = 'SPRITE';

export interface Sprite extends Component {
    data: Dimensions & {
        name: string;
        offSet: Point3D;
    };
}

export interface createSpriteComponentConfig {
    gameObjectId: string;
    spriteName: string;
    width: number;
    height: number;
    offSet: Point3D;
}

export function createSpriteComponent(
    config: createSpriteComponentConfig
): Sprite {
    return {
        ID: createUniqueId(),
        gameObjectID: config.gameObjectId,
        type: SPRITE_COMPONENT,
        data: {
            name: config.spriteName,
            width: config.width,
            height: config.height,
            offSet: config.offSet,
        },
    };
}

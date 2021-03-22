import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';
import { Point3D } from '../../core/point-3d';
import { SPRITE_COMPONENT } from '../game_engine';

export interface Sprite extends Component {
    data: {
        name: string;
        width: number;
        height: number;
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
        id: createUniqueId(),
        gameObjectId: config.gameObjectId,
        type: SPRITE_COMPONENT,
        data: {
            name: config.spriteName,
            width: config.width,
            height: config.height,
            offSet: config.offSet,
        },
    };
}

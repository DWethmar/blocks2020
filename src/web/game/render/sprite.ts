import { Component, ComponentType } from '../engine/component';
import { createUniqueId } from '../id';
import { Point3D } from '../point-3d';

export interface Sprite {
    name: string;
    width: number;
    height: number;
    offSet: Point3D
}

export interface createSpriteComponentConfig {
    gameObjectId: string,
    spriteName: string,
    width: number,
    height: number,
    offSet: Point3D
}

export function createSpriteComponent(
    config: createSpriteComponentConfig
): Component<Sprite> {
    return {
        id: createUniqueId(),
        gameObjectId: config.gameObjectId,
        type: ComponentType.SPRITE,
        state: {
            name:       config.spriteName,
            width:      config.width,
            height:     config.height,
            offSet:     config.offSet
        }
    };
}

import { Component, ComponentType } from './component';
import { createUniqueId } from './id';

export interface Sprite {
    name: string;
    width: number;
    height: number;
}

export function createSpriteComponent(gameObjectId: string, spriteName: string, width: number, height: number): Component<Sprite> {
    return {
        id: createUniqueId(),
        gameObjectId: gameObjectId,
        type: ComponentType.SPRITE,
        state: {
            name: spriteName,
            width: width,
            height: height,
        }
    };
}

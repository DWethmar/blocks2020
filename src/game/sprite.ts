import { Component, ComponentType } from './component';
import { createUniqueId } from './id';

export interface Sprite {
    name: string;
}

export function createSpriteComponent(gameObjectId: string, spriteName: string): Component<Sprite> {
    return {
        id: createUniqueId(),
        gameObjectId: gameObjectId,
        type: ComponentType.SPRITE,
        state: {
            name: spriteName
        }
    };
}

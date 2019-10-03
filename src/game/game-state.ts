import { GameObject } from './game-object';
import { Component } from './component';

export interface GameState {
    gameObjects: { [id: string]: GameObject };
    components: {
        [id: string]: Component<any>
    }
    componentIdsByType: {
        [type: string]: string[]
    },
    componentIdByGameObject: { // gameObjectId -> componentType -> componentId
        [gameObjectId: string]: {
            [type: string]: string
        }
    }
}

export const initState: GameState = {
    gameObjects: {},
    components: {},
    // Cache
    componentIdsByType: {},
    componentIdByGameObject: {}
};

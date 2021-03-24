import { GameObject, GameObjects } from './gameobject/gameobject';
import { Components } from './component/component';

export interface State {
    gameObjects: GameObjects;
    components: Components;
    componentIdsByType: {
        [type: string]: string[];
    };
    componentIdByGameObject: {
        // gameObjectId -> componentType -> componentId
        [gameObjectId: string]: {
            [type: string]: string;
        };
    };
}

export function newState(): State {
    return {
        gameObjects: {},
        components: {},
        componentIdsByType: {},
        componentIdByGameObject: {},
    };
}

import { createUniqueId } from '../id';

export interface GameObject {
    ID: string;
    name: string;
    parentGameObjectID: string | null;
}

export function createGameObject(name?: string): GameObject {
    return {
        ID: createUniqueId(),
        name: name ? name : '',
        parentGameObjectID: null,
    };
}

export type GameObjects = {
    [ID: string]: GameObject;
};

export const addGameObject = (gameObjects: GameObjects) => (
    g: GameObject
): void => {
    if (!gameObjects[g.ID]) {
        gameObjects[g.ID] = g;
    } else {
        throw `Game object with id ${g.ID} already exists`;
    }
};

export const getGameObject = (gameObjects: GameObjects) => (
    ID: string
): GameObject | null => {
    if (!gameObjects[ID]) {
        return null;
    }
    return gameObjects[ID];
};

export const deleteGameObject = (gameObjects: GameObjects) => (
    ID: string
): void => {
    if (!gameObjects[ID]) {
        throw `'Game object with id ${ID} does not exist'`;
    }
    delete gameObjects[ID];
};

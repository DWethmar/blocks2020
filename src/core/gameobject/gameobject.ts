import { createUniqueId } from '../id';

export interface GameObject {
    id: string;
    name: string;
}

export function createGameObject(name?: string): GameObject {
    return {
        id: createUniqueId(),
        name: name ? name : '',
    };
}

export type GameObjects = {
    [id: string]: GameObject;
};

export const addGameObject = (gameObjects: GameObjects) => (
    g: GameObject
): void => {
    if (!gameObjects[g.id]) {
        gameObjects[g.id] = g;
    } else {
        throw `'Game object with id ${g.id} already exists'`;
    }
};

export const getGameObject = (gameObjects: GameObjects) => (
    id: string
): GameObject | null => {
    if (!gameObjects[id]) {
        return null;
    }
    return gameObjects[id];
};

export const deleteGameObject = (gameObjects: GameObjects) => (
    id: string
): void => {
    if (!gameObjects[id]) {
        throw `'Game object with id ${id} does not exist'`;
    }
    delete gameObjects[id];
};

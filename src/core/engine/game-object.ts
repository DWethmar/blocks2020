import { createUniqueId } from '../id';

export interface GameObject {
    id: string;
    name: string;
}

export function createGameObject(name?: string): GameObject {
    return {
        id: createUniqueId(),
        name: name ? name : ''
    };
}

import { createGameObject, GameObject } from '../core/gameobject/gameobject';
import { Point3D } from '../core/point-3d';
import { createSpriteComponent } from './render/sprite';
import { Component } from '../core/component/component';
import { createMovementControlsComponent } from './movement_controls';
import { GameEngine } from './game_engine';
import {
    createPositionComponent,
    createPoint,
} from '../core/component/position';

export interface Prefab {
    gameObject: GameObject;
    components: Component[];
}

export const createFromPrefab = (engine: GameEngine) => (prefab: Prefab) => {
    engine.addGameObject(prefab.gameObject);
    prefab.components.forEach((component) => engine.addComponent(component));
};

export function createPlayerPrefab(position: Point3D) {
    const player = createGameObject('player');
    return {
        gameObject: player,
        components: [
            createPositionComponent(player.id, position),
            createMovementControlsComponent(player.id),
            createSpriteComponent({
                gameObjectId: player.id,
                spriteName: 'colored_transparent-30.png',
                width: 16,
                height: 16,
                offSet: createPoint(-8, -16, 0),
            }),
        ],
    };
}

export function createWallPrefab(position: Point3D): Prefab {
    const wall = createGameObject('wall');
    return {
        gameObject: wall,
        components: [
            createPositionComponent(wall.id, position),
            createSpriteComponent({
                gameObjectId: wall.id,
                spriteName: 'colored_transparent-118.png',
                width: 16,
                height: 16,
                offSet: createPoint(-8, -16, 0),
            }),
        ],
    };
}

export function createTreePrefab(position: Point3D): Prefab {
    const wall = createGameObject('tree');
    return {
        gameObject: wall,
        components: [
            createPositionComponent(wall.id, position),
            createSpriteComponent({
                gameObjectId: wall.id,
                spriteName: 'colored_transparent-31.png',
                width: 16,
                height: 16,
                offSet: createPoint(-8, -16, 0),
            }),
        ],
    };
}

export function createGrassPrefab(position: Point3D): Prefab {
    const grass = createGameObject('grass');
    return {
        gameObject: grass,
        components: [
            createPositionComponent(grass.id, position),
            createSpriteComponent({
                gameObjectId: grass.id,
                spriteName: 'colored_transparent-4.png',
                width: 16,
                height: 16,
                offSet: createPoint(-8, -16, 0),
            }),
        ],
    };
}

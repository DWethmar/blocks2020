import { createGameObject, GameObject } from '../core/gameobject/gameobject';
import { Point3D } from '../core/point-3d';
import { createSpriteComponent } from './render/sprite';
import { Component } from '../core/component/component';
import { createMovementControlsComponent } from './input/movement_controls';
import { GameEngine } from './game_engine';
import {
    createPositionComponent,
    createPoint,
} from '../core/component/position';
import { createCollisionComponent } from './collision/collision';

export interface Prefab {
    gameObject: GameObject;
    components: Component[];
}

export const createFromPrefab = (engine: GameEngine) => (prefab: Prefab) => {
    engine.addGameObject(prefab.gameObject);
    prefab.components.forEach((component) => engine.addComponent(component));
};

export function createPlayerPrefab(position: Point3D): Prefab {
    const player = createGameObject('player');
    return {
        gameObject: player,
        components: [
            createPositionComponent(player.ID, position),
            createCollisionComponent({
                gameObjectId: player.ID,
                width: 16,
                height: 16,
                offSet: createPoint(-8, -16, 0),
            }),
            createMovementControlsComponent(player.ID),
            createSpriteComponent({
                gameObjectId: player.ID,
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
            createPositionComponent(wall.ID, position),
            createCollisionComponent({
                gameObjectId: wall.ID,
                width: 16,
                height: 16,
                offSet: createPoint(-8, -16, 0),
            }),
            createSpriteComponent({
                gameObjectId: wall.ID,
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
            createPositionComponent(wall.ID, position),
            createSpriteComponent({
                gameObjectId: wall.ID,
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
            createPositionComponent(grass.ID, position),
            createSpriteComponent({
                gameObjectId: grass.ID,
                spriteName: 'colored_transparent-4.png',
                width: 16,
                height: 16,
                offSet: createPoint(-8, -16, 0),
            }),
        ],
    };
}

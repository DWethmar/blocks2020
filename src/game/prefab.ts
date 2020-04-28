import { Engine } from './engine/engine';
import { createGameObject, GameObject } from './engine/game-object';
import { createPositionComponent, createPoint, Point3D } from './point-3d';
import { createSpriteComponent } from './render/sprite';
import { Component } from './engine/component';
import { createMovementControlsComponent } from './movement-controls';

export interface Prefab {
    gameObject: GameObject;
    components: Component<any>[];
}

export const createFromPrefab = (engine: Engine) => (prefab: Prefab) => {
    engine.addGameObject(prefab.gameObject);
    prefab.components.forEach(component => engine.addComponent(component));
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
                offSet: createPoint(-8, -16, 0)
            })
        ]
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
                offSet: createPoint(-8, -16, 0)
            })
        ]
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
                offSet: createPoint(-8, -16, 0)
            })
        ]
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
                offSet: createPoint(-8, -16, 0)
            })
        ]
    };
}

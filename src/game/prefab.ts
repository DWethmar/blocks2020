import { createGameObject, GameObject } from '../core/gameobject/gameobject';
import { Point2D, Point3D } from '../core/point';
import { createSpriteComponent } from './render/sprite';
import { Component } from '../core/component/component';
import { createMovementControlsComponent } from './input/movement_controls';
import { GameEngine } from './game_engine';
import {
    createPositionComponent,
    createPoint3D,
} from '../core/component/position';
import { createColliderComponent } from './collision/collider';
import { createFollowComponent } from './behavior/follow';
import { createDebugComponent } from './debug/debug';
import { createDirectionComponent } from './direction/direction';
import { createShooterComponent } from './shoot/shoot';
import { createBulletComponent } from './shoot/bullet';

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
            createColliderComponent({
                shape: {
                    kind: 'square',
                    width: 16,
                    height: 16,
                },
                gameObjectId: player.ID,
                isStatic: false,
                density: 0.005,
                friction: 1,
                frictionStatic: 0,
                frictionAir: 1,
                restitution: 0.5,
            }),
            createMovementControlsComponent(player.ID),
            createSpriteComponent({
                gameObjectId: player.ID,
                spriteName: 'colored_transparent-30.png',
                width: 16,
                height: 16,
                offSet: createPoint3D(), // createPoint3D(-8, -16, 0),
            }),
            createDebugComponent(player.ID),
            createDirectionComponent({
                gameObjectId: player.ID,
                direction: { x: 1, y: 0 },
            }),
            createShooterComponent({
                gameObjectId: player.ID,
            }),
        ],
    };
}

export function createBulletPrefab(
    position: Point3D,
    direction: Point2D
): Prefab {
    const bullet = createGameObject('bullet');
    return {
        gameObject: bullet,
        components: [
            createPositionComponent(bullet.ID, position),
            createColliderComponent({
                shape: {
                    kind: 'circle',
                    radius: 4,
                },
                gameObjectId: bullet.ID,
                isStatic: false,
                density: 0.01,
                friction: 0.2,
                frictionStatic: 0.01,
                frictionAir: 0.1,
                restitution: 0.1,
                // collisionFilterGroup: 2,
                // collisionFilterMask: 1,
            }),
            createBulletComponent({
                gameObjectId: bullet.ID,
                direction: direction,
            }),
            createSpriteComponent({
                gameObjectId: bullet.ID,
                spriteName: 'colored_transparent-666.png',
                width: 16,
                height: 16,
                offSet: createPoint3D(), // createPoint3D(-8, -16, 0),
            }),
        ],
    };
}

export function createMobPrefab(position: Point3D): Prefab {
    const mob = createGameObject('mob');
    return {
        gameObject: mob,
        components: [
            createPositionComponent(mob.ID, position),
            createColliderComponent({
                shape: {
                    kind: 'square',
                    width: 16,
                    height: 16,
                },
                gameObjectId: mob.ID,
                isStatic: false,
                density: 0.01,
                friction: 1,
                frictionStatic: 1,
                frictionAir: 1,
                restitution: 0.1,
            }),
            createSpriteComponent({
                gameObjectId: mob.ID,
                spriteName: 'colored_transparent-26.png',
                width: 16,
                height: 16,
                offSet: createPoint3D(), // createPoint3D(-8, -16, 0),
            }),
            createFollowComponent({
                gameObjectId: mob.ID,
                path: [createPoint3D(300, 200, 0), createPoint3D(23, 190, 0)],
            }),
            createDebugComponent(mob.ID),
        ],
    };
}

export function createBoxPrefab(position: Point3D): Prefab {
    const box = createGameObject('box');
    return {
        gameObject: box,
        components: [
            createPositionComponent(box.ID, position),
            createColliderComponent({
                shape: {
                    kind: 'square',
                    width: 16,
                    height: 16,
                },
                gameObjectId: box.ID,
                isStatic: false,
                density: 0.005,
                friction: 0.14,
                frictionStatic: 0,
                frictionAir: 0.13,
                restitution: 0.15,
            }),
            createSpriteComponent({
                gameObjectId: box.ID,
                spriteName: 'colored_transparent-578.png',
                width: 16,
                height: 16,
                offSet: createPoint3D(), // createPoint3D(-8, -16, 0),
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
            createColliderComponent({
                shape: {
                    kind: 'square',
                    width: 16,
                    height: 16,
                },
                gameObjectId: wall.ID,
                isStatic: true,
                density: 0.005,
                friction: 1,
                frictionStatic: 0,
                frictionAir: 1,
                restitution: 0.5,
            }),
            createSpriteComponent({
                gameObjectId: wall.ID,
                spriteName: 'colored_transparent-118.png',
                width: 16,
                height: 16,
                offSet: createPoint3D(), // createPoint3D(-8, -16, 0),
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
                offSet: createPoint3D(), // createPoint3D(-8, -16, 0),
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
                offSet: createPoint3D(), // createPoint3D(-8, -16, 0),
            }),
        ],
    };
}

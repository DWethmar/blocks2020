import { Component } from '../../core/component/component';
import { createUniqueId } from '../../core/id';
import { Point3D } from '../../core/point';
import { Dimensions } from '../dimensions';

export const COLLISION_COMPONENT = 'COLLISION';

type shapes = Circle | Square;

export interface Circle {
    kind: 'circle';
    radius: number;
}

export interface Square extends Dimensions {
    kind: 'square';
}

export interface Collider extends Component {
    data: {
        shape: Circle | Square;
        offSet: Point3D;
        isStatic: boolean;
        density: number;
        friction: number;
        frictionStatic: number;
        frictionAir: number;
        restitution: number;
        collisionFilterGroup: number;
        collisionFilterMask?: number;
    };
}

/**
 * This is the description of the interface
 *
 * @interface createColliderComponentConfig
 * @member {member} collisionFilterGroup If the two bodies have the same non-zero value of collisionFilterGroup, they will always collide if the value is positive, and they will never collide if the value is negative
 */
export interface createColliderComponentConfig {
    gameObjectId: string;
    shape: shapes;
    offSet: Point3D;
    isStatic: boolean;
    density?: number;
    friction?: number;
    frictionStatic?: number;
    frictionAir?: number;
    restitution?: number;
    collisionFilterGroup?: number;
    collisionFilterMask?: number;
}

export function createColliderComponent(
    config: createColliderComponentConfig
): Collider {
    return {
        ID: createUniqueId(),
        gameObjectID: config.gameObjectId,
        type: COLLISION_COMPONENT,
        data: {
            shape: config.shape,
            offSet: config.offSet,
            isStatic: config.isStatic,
            density: config.density || 0.005,
            friction: config.friction || 1,
            frictionStatic: config.frictionStatic || 0,
            frictionAir: config.frictionAir || 1,
            restitution: config.restitution || 0.5,
            collisionFilterGroup: config.collisionFilterGroup || 1,
            collisionFilterMask: config.collisionFilterMask || 0,
        },
    };
}

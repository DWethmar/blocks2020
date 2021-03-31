export interface Point2D {
    x: number;
    y: number;
}

export type Point3D = Point2D & {
    z: number;
};

export function addPoints(a: Point3D, b: Point3D) {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + a.z,
    };
}

export function subPoints(a: Point3D, b: Point3D) {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - a.z,
    };
}

export function equal(a: Point3D, b: Point3D) {
    return a.x == b.x && a.y == b.y && a.z == a.z;
}

export function distance(a: Point2D, b: Point2D): number {
    return Math.hypot(b.x - a.x, b.y - a.y);
}

export function newUpDirection(): Point2D {
    return { x: 0, y: -1 };
}

export function newUpRightDirection(): Point2D {
    return { x: 1, y: -1 };
}

export function newUpLeftDirection(): Point2D {
    return { x: -1, y: -1 };
}

export function newRightDirection(): Point2D {
    return { x: 1, y: 0 };
}

export function newDownDirection(): Point2D {
    return { x: 0, y: 1 };
}

export function newDownRightDirection(): Point2D {
    return { x: 1, y: 1 };
}

export function newDownLeftDirection(): Point2D {
    return { x: -1, y: 1 };
}

export function newLeftDirection(): Point2D {
    return { x: -1, y: 0 };
}

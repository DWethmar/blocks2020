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

export function distance(a: Point2D, b: Point2D): number {
    return Math.hypot(b.x - a.x, b.y - a.y);
}

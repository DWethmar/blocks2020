export interface Point3D {
    x: number;
    y: number;
    z: number;
}

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

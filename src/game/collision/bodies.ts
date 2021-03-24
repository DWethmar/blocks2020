import Matter from 'matter-js';

export type Bodies = {
    [id: string]: Matter.Body;
};

export const addBody = (bodies: Bodies) => (id: string, r: Matter.Body) =>
    (bodies[id] = r);
export const getBody = (bodies: Bodies) => (id: string): Matter.Body =>
    bodies[id];
export const deleteBody = (bodies: Bodies) => (id: string) => delete bodies[id];

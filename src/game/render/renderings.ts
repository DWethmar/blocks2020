import * as PIXI from 'pixi.js';

export type Renderings = {
    [id: string]: PIXI.DisplayObject;
};

export const addRendering = (renderings: Renderings) => (
    id: string,
    r: PIXI.DisplayObject
) => (renderings[id] = r);
export const getRendering = (renderings: Renderings) => (id: string) =>
    renderings[id];
export const deleteRendering = (renderings: Renderings) => (id: string) =>
    delete renderings[id];

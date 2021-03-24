import { Events } from '../../core/events';
import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { System } from '../../core/system';
import { Collision, COLLISION_COMPONENT } from './collision';
import { Dimensions } from '../dimensions';
import { Renderings, addRendering, getRendering } from '../render/renderings';

import SpatialManager, { Geometry } from 'spatial-hashmap';
import * as PIXI from 'pixi.js';
import { addPoints } from '../../core/point-3d';

// function* walk(sX: number, sY: number, eX: number, eY: number, steps: number) {
//     const stepsX = Math.round(+(sX - eX) / steps);
//     const stepsY = Math.round(+(sY - eY) / steps);

//     if (stepsX == 0 || stepsY == 0) {
//         return [0, 0];
//     }

//     console.log('Steps: ', stepsX, stepsY);

//     for (let x = sX; sX !== eX; sX < eX ? sX + stepsX : sX - stepsX) {
//         for (let y = sY; sY !== eY; sY < eY ? sY + stepsY : sY - stepsY) {
//             yield [x, y];
//         }
//     }
// }

// https://impactjs.com/forums/code/top-down-rpg-style-tile-based-grid-movement
// https://gamedev.stackexchange.com/questions/50074/how-to-create-simple-acceleration-in-a-2d-sprite?noredirect=1&lq=1
// https://codepen.io/Tobsta/post/implementing-velocity-acceleration-and-friction-on-a-canvas
// https://dev.to/martyhimmel/moving-a-sprite-sheet-character-with-javascript-3adg
// http://tim.hibal.org/blog/2d-character-movement/
export class CollisionSystem implements System {
    private events: Events;
    private stage: PIXI.Container;
    private spatialManager: SpatialManager<Collision>;
    private debugRenderings: Renderings;

    static friction = 0.98;

    constructor(events: Events, sceneSize: Dimensions, stage: PIXI.Container) {
        console.log('Created CollisionSystem');
        this.events = events;

        this.spatialManager = new SpatialManager(
            sceneSize.width,
            sceneSize.height,
            10
        );
        this.debugRenderings = {};
        this.stage = stage;
    }

    onAttach(engine: GameEngine) {}

    update(engine: GameEngine, deltaTime: number) {
        this.spatialManager.clearMap();

        const collisions = engine.getComponentsByType(COLLISION_COMPONENT);
        // register collisions
        for (const c of collisions) {
            const position = engine.getComponent(
                c.gameObjectID,
                POSITION_COMPONENT
            );
            if (!position) continue;

            const collisionPos = addPoints(
                position.data.position,
                c.data.offSet
            );

            const geometry: Geometry = {
                pos: {
                    x: collisionPos.x,
                    y: collisionPos.y,
                },
                aabb: {
                    min: {
                        x: 0,
                        y: 0,
                    },
                    max: {
                        x: c.data.width,
                        y: c.data.height,
                    },
                },
            };
            this.spatialManager.registerObject(c, geometry);

            let graphics = getRendering(this.debugRenderings)(
                c.ID
            ) as PIXI.Graphics;

            if (!graphics) {
                graphics = new PIXI.Graphics();
                // set the line style to have a width of 5 and set the color to red
                graphics.lineStyle(1, 0xff0000);
                // draw a rectangle
                graphics.drawRect(0, 0, c.data.width, c.data.height);
                this.stage.addChild(graphics);
                addRendering(this.debugRenderings)(c.ID, graphics);
            }

            graphics.transform.position.x = collisionPos.x;
            graphics.transform.position.y = collisionPos.y;
        }

        for (const c of engine.getComponentsByType(POSITION_COMPONENT)) {
            c.data.position.x += c.data.velocity.x * deltaTime;
            c.data.position.y += c.data.velocity.y * deltaTime;
            engine.updateComponent(c);
        }
    }
}

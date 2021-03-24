import { Events } from '../../core/events';
import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { System } from '../../core/system';
import { COLLISION_COMPONENT } from './collision';
import { Dimensions } from '../dimensions';
import { Renderings, addRendering, getRendering } from '../render/renderings';
import { addBody, Bodies, getBody } from './bodies';

import * as PIXI from 'pixi.js';
import { addPoints, subPoints } from '../../core/point-3d';

import Matter from 'matter-js';
import { createPoint } from '../../core/component/position';

// https://impactjs.com/forums/code/top-down-rpg-style-tile-based-grid-movement
// https://gamedev.stackexchange.com/questions/50074/how-to-create-simple-acceleration-in-a-2d-sprite?noredirect=1&lq=1
// https://codepen.io/Tobsta/post/implementing-velocity-acceleration-and-friction-on-a-canvas
// https://dev.to/martyhimmel/moving-a-sprite-sheet-character-with-javascript-3adg
// http://tim.hibal.org/blog/2d-character-movement/
export class CollisionSystem implements System {
    private events: Events;
    private stage: PIXI.Container;
    private debugRenderings: Renderings;
    private collisionEngine: Matter.Engine;

    // Matter JS
    private bodies: Bodies;
    private renderer?: Matter.Render;

    constructor(events: Events, sceneSize: Dimensions, stage: PIXI.Container) {
        console.log('Created CollisionSystem');
        this.events = events;
        this.debugRenderings = {};
        this.stage = stage;

        // Matter JS
        this.bodies = {};
        // create an engine
        this.collisionEngine = Matter.Engine.create();
        const pEl = document.getElementById('game-physics');
        if (pEl) {
            this.renderer = Matter.Render.create({
                element: pEl,
                engine: this.collisionEngine,
            });
            Matter.Render.run(this.renderer);
        }
    }

    onAttach(engine: GameEngine) {}

    update(engine: GameEngine, deltaTime: number) {
        const colEng = this.collisionEngine;
        colEng.world.gravity.y = 0;

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

            // Debug graphics
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

            let body = getBody(this.bodies)(c.ID);
            if (!body) {
                body = Matter.Bodies.rectangle(
                    collisionPos.x,
                    collisionPos.y,
                    c.data.width,
                    c.data.height,
                    {
                        density: c.data.density,
                        friction: c.data.friction,
                        frictionStatic: c.data.frictionStatic,
                        frictionAir: c.data.frictionAir,
                        restitution: c.data.restitution,
                    }
                );
                body.isStatic = c.data.isStatic;
                Matter.Body.setInertia(body, Infinity);
                Matter.World.add(colEng.world, body);
                addBody(this.bodies)(c.ID, body);
            }

            body.force = {
                x: position.data.velocity.x,
                y: position.data.velocity.y,
            };
        }

        Matter.Engine.update(colEng, deltaTime);

        for (const c of collisions) {
            const position = engine.getComponent(
                c.gameObjectID,
                POSITION_COMPONENT
            );
            if (!position) continue;

            const body = getBody(this.bodies)(c.ID);

            const colPos = subPoints(
                createPoint(body.position.x, body.position.y, 0),
                c.data.offSet
            );

            position.data.position.x = colPos.x;
            position.data.position.y = colPos.y;

            engine.updateComponent(c);
        }
    }
}

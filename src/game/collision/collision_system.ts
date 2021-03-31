import { Events } from '../../core/events';
import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { System } from '../../core/system';
import { COLLISION_COMPONENT } from './collider';
import { Dimensions } from '../dimensions';
import { Renderings, addRendering, getRendering } from '../render/renderings';
import { addBody, Bodies, getBody } from './bodies';

import * as PIXI from 'pixi.js';
import { addPoints, subPoints } from '../../core/point';

import Matter from 'matter-js';
import { createPoint3D } from '../../core/component/position';

// https://impactjs.com/forums/code/top-down-rpg-style-tile-based-grid-movement
// https://gamedev.stackexchange.com/questions/50074/how-to-create-simple-acceleration-in-a-2d-sprite?noredirect=1&lq=1
// https://codepen.io/Tobsta/post/implementing-velocity-acceleration-and-friction-on-a-canvas
// https://dev.to/martyhimmel/moving-a-sprite-sheet-character-with-javascript-3adg
// http://tim.hibal.org/blog/2d-character-movement/
export class CollisionSystem implements System {
    private events: Events;
    private collisionEngine: Matter.Engine;

    // Matter JS
    private bodies: Bodies;
    private renderer?: Matter.Render;

    constructor(events: Events, sceneSize: Dimensions) {
        console.log('Created CollisionSystem');
        this.events = events;

        // Matter JS
        this.bodies = {};
        this.collisionEngine = Matter.Engine.create();
        const pEl = document.getElementById('game-physics');
        if (pEl) {
            this.renderer = Matter.Render.create({
                element: pEl,
                engine: this.collisionEngine,
            });
            Matter.Render.run(this.renderer);
        }

        const collEng = this.collisionEngine;
        collEng.world.gravity.y = 0;
    }

    onAttach(engine: GameEngine) {}

    beforeUpdate(engine: GameEngine): void {
        const collisions = engine.getComponentsByType(COLLISION_COMPONENT);
        const collEng = this.collisionEngine;

        Matter.Engine.update(collEng, engine.getDeltaTime());

        // Apply changes to positions
        for (const c of collisions) {
            const position = engine.getComponent(
                c.gameObjectID,
                POSITION_COMPONENT
            );
            if (!position) continue;

            const body = getBody(this.bodies)(c.ID);
            if (!body) continue;

            const colPos = subPoints(
                createPoint3D(body.position.x, body.position.y, 0),
                c.data.offSet
            );

            position.data.position.x = colPos.x;
            position.data.position.y = colPos.y;

            engine.updateComponent(c);
        }
    }

    update(engine: GameEngine) {
        const collEng = this.collisionEngine;

        const collisions = engine.getComponentsByType(COLLISION_COMPONENT);
        // register and/or create collisions
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
                Matter.World.add(collEng.world, body);
                addBody(this.bodies)(c.ID, body);
            }

            if (
                position.data.velocity.x != 0 ||
                position.data.velocity.y != 0
            ) {
                Matter.Body.applyForce(
                    body,
                    {
                        x: position.data.position.x,
                        y: position.data.position.y,
                    },
                    {
                        x: position.data.velocity.x,
                        y: position.data.velocity.y,
                    }
                );
            }
        }
    }

    afterUpdate(engine: GameEngine): void {}
}

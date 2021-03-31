import { Events } from '../../core/events';
import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { System } from '../../core/system';
import { COLLISION_COMPONENT, Square } from './collider';
import { Dimensions } from '../dimensions';
import { addBody, Bodies, getBody } from './bodies';

import { addPoints, subPoints } from '../../core/point';

import Matter from 'matter-js';
import { createPoint3D } from '../../core/component/position';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CollisionEvent } from './event';

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

    onAttach(engine: GameEngine) {
        // Events
        Matter.Events.on(this.collisionEngine, 'collisionStart', (event) => {
            for (const pair of event.pairs) {
                const a = engine.getComponent(
                    pair.bodyA.label,
                    COLLISION_COMPONENT
                );
                const b = engine.getComponent(
                    pair.bodyA.label,
                    COLLISION_COMPONENT
                );

                if (!!a && !!b) {
                    this.events.dispatch(new CollisionEvent(a, b));
                }
            }
        });
    }

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

            if (!body.isStatic) {
                const colPos = createPoint3D(
                    body.position.x,
                    body.position.y,
                    0
                );

                position.data.position.x = colPos.x;
                position.data.position.y = colPos.y;

                engine.updateComponent(c);
            }
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

            let body = getBody(this.bodies)(c.ID);
            if (!body) {
                if (c.data.shape.kind == 'square') {
                    const collisionPos = position.data.position;

                    body = Matter.Bodies.rectangle(
                        collisionPos.x,
                        collisionPos.y,
                        c.data.shape.width,
                        c.data.shape.height,
                        {
                            density: c.data.density,
                            friction: c.data.friction,
                            frictionStatic: c.data.frictionStatic,
                            frictionAir: c.data.frictionAir,
                            restitution: c.data.restitution,
                            label: c.ID,
                        }
                    );
                } else if (c.data.shape.kind == 'circle') {
                    // const collisionPos = addPoints(
                    //     position.data.position,
                    //     c.data.offSet
                    // );
                    const collisionPos = position.data.position;

                    body = Matter.Bodies.circle(
                        collisionPos.x,
                        collisionPos.y,
                        c.data.shape.radius,
                        {
                            density: c.data.density,
                            friction: c.data.friction,
                            frictionStatic: c.data.frictionStatic,
                            frictionAir: c.data.frictionAir,
                            restitution: c.data.restitution,
                            label: c.ID,
                        }
                    );

                    body.collisionFilter = {
                        category: c.data.collisionFilterGroup,
                        mask: c.data.collisionFilterMask,
                    };

                    Matter.Body.setVelocity(body, {
                        x: position.data.velocity.x,
                        y: position.data.velocity.y,
                    });
                }

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

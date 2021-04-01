import { Events } from '../../core/events';
import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { System } from '../../core/system';
import { COLLISION_COMPONENT, Square } from './collider';
import { Dimensions } from '../dimensions';
import { addBody, Bodies, getBody } from './bodies';

import { addPoints2D, addPoints3D, subPoints2D, subPoints3D } from '../../core/point';

import Matter from 'matter-js';
import { createPoint3D } from '../../core/component/position';
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
        const collEng = this.collisionEngine;
        Matter.Engine.update(collEng, engine.getDeltaTime());

        // Apply changes to positions
        for (const col of engine.getComponentsByType(COLLISION_COMPONENT)) {
            const position = engine.getComponent(
                col.gameObjectID,
                POSITION_COMPONENT
            );
            if (!position) continue;

            const body = getBody(this.bodies)(col.ID);
            if (!body) continue;

            if (!body.isStatic) {
                // Remove collision offset so the poisition 
                const newPos = subPoints2D(
                    {
                        x: body.position.x,
                        y: body.position.y,
                    },
                    col.data.offSet,
                )

                position.data.position.x = newPos.x;
                position.data.position.y = newPos.y;

                engine.updateComponent(col);
            }
        }
    }

    update(engine: GameEngine) {
        const collEng = this.collisionEngine;

        // register and/or create collisions
        for (const col of engine.getComponentsByType(COLLISION_COMPONENT)) {
            const position = engine.getComponent(
                col.gameObjectID,
                POSITION_COMPONENT
            );
            if (!position) continue;

            let body = getBody(this.bodies)(col.ID);
            if (!body) {
                if (col.data.shape.kind == 'square') {
                    const collisionPos = addPoints2D(
                        position.data.position,
                        col.data.offSet
                    );

                    body = Matter.Bodies.rectangle(
                        collisionPos.x,
                        collisionPos.y,
                        col.data.shape.width,
                        col.data.shape.height,
                        {
                            density: col.data.density,
                            friction: col.data.friction,
                            frictionStatic: col.data.frictionStatic,
                            frictionAir: col.data.frictionAir,
                            restitution: col.data.restitution,
                            label: col.ID,
                        }
                    );
                } else if (col.data.shape.kind == 'circle') {
                    const collisionPos = addPoints2D(
                        position.data.position,
                        col.data.offSet
                    );

                    body = Matter.Bodies.circle(
                        collisionPos.x,
                        collisionPos.y,
                        col.data.shape.radius,
                        {
                            density: col.data.density,
                            friction: col.data.friction,
                            frictionStatic: col.data.frictionStatic,
                            frictionAir: col.data.frictionAir,
                            restitution: col.data.restitution,
                            label: col.ID,
                        }
                    );

                    body.collisionFilter = {
                        category: col.data.collisionFilterGroup,
                        mask: col.data.collisionFilterMask,
                    };

                    Matter.Body.setVelocity(body, {
                        x: position.data.velocity.x,
                        y: position.data.velocity.y,
                    });
                }

                body.isStatic = col.data.isStatic;
                Matter.Body.setInertia(body, Infinity);
                Matter.World.add(collEng.world, body);
                addBody(this.bodies)(col.ID, body);
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

    afterUpdate(engine: GameEngine): void { }
}

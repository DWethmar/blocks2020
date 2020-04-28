import { System } from '../system';
import { Events } from '../engine/events';
import { Engine } from '../engine/engine';
import { ComponentType } from '../engine/component';

// https://impactjs.com/forums/code/top-down-rpg-style-tile-based-grid-movement
// https://gamedev.stackexchange.com/questions/50074/how-to-create-simple-acceleration-in-a-2d-sprite?noredirect=1&lq=1
// https://codepen.io/Tobsta/post/implementing-velocity-acceleration-and-friction-on-a-canvas
// https://dev.to/martyhimmel/moving-a-sprite-sheet-character-with-javascript-3adg
// http://tim.hibal.org/blog/2d-character-movement/
export class PhysicsSystem implements System {
    private events: Events;

    static friction = 0.98;

    constructor(events: Events) {
        console.log('Created PhysicsSystem');
        this.events = events;
    }

    onAttach(engine: Engine) {}

    update(engine: Engine, deltaTime: number) {
        for (const c of engine.getComponentsByType(ComponentType.POSITION)) {
            c.state.position.x += c.state.velocity.x * deltaTime;
            c.state.position.y += c.state.velocity.y * deltaTime;
            engine.updateComponent(c);
        }
    }
}

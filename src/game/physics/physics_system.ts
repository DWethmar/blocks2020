import { Events } from '../../core/events';
import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { System } from '../../core/system';

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

    onAttach(engine: GameEngine) {}

    update(engine: GameEngine, deltaTime: number) {
        for (const c of engine.getComponentsByType(POSITION_COMPONENT)) {
            c.data.position.x += c.data.velocity.x * deltaTime;
            c.data.position.y += c.data.velocity.y * deltaTime;
            engine.updateComponent(c.id, c.data);
        }
    }
}

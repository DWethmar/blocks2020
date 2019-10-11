import { System } from './system';
import { Events } from './events';
import { Engine } from './engine';
import { ComponentType, Component } from './component';
import { Position } from './point-3d';

// https://impactjs.com/forums/code/top-down-rpg-style-tile-based-grid-movement
// https://gamedev.stackexchange.com/questions/50074/how-to-create-simple-acceleration-in-a-2d-sprite?noredirect=1&lq=1
// https://codepen.io/Tobsta/post/implementing-velocity-acceleration-and-friction-on-a-canvas
// https://dev.to/martyhimmel/moving-a-sprite-sheet-character-with-javascript-3adg
// http://tim.hibal.org/blog/2d-character-movement/
export class PhysicsSystem implements System {

    private events: Events;

    static friction = .98;

    constructor(events: Events) {
        console.log('Created PhysicsSystem');
        this.events = events;
    }

    onAttach(engine: Engine) {

    }

    update(engine: Engine, deltaTime: number) {

        engine.getComponentsByType(ComponentType.POSITION).forEach((component: Component<Position>) => {
            component.state.position.x += component.state.velocity.x * deltaTime;
            component.state.position.y += component.state.velocity.y * deltaTime;
            engine.updateComponent(component);
        });

    }
}

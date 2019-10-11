import { System } from './system';
import { Events } from './events';
import { Engine } from './engine';
import { withLatestFrom } from 'rxjs/operators';
import { ComponentType, Component } from './component';
import { Position } from './point-3d';

export class PhysicsSystem implements System {

    private events: Events;

    static friction = .98;

    constructor(events: Events) {
        console.log('Created PhysicsSystem');
        this.events = events;
    }

    // https://impactjs.com/forums/code/top-down-rpg-style-tile-based-grid-movement
    // https://gamedev.stackexchange.com/questions/50074/how-to-create-simple-acceleration-in-a-2d-sprite?noredirect=1&lq=1
    // https://codepen.io/Tobsta/post/implementing-velocity-acceleration-and-friction-on-a-canvas
    // https://dev.to/martyhimmel/moving-a-sprite-sheet-character-with-javascript-3adg

    // http://tim.hibal.org/blog/2d-character-movement/
    onAttach(engine: Engine) {
        engine.frames.pipe(
            withLatestFrom(engine.getComponentsByType(ComponentType.POSITION))
        ).subscribe(([deltaTime, components]) => {
            components.forEach((component: Component<Position>) => {

                // component.state.velocity.x += component.state.acceleration.x * tick.delta;
                // component.state.velocity.y += component.state.acceleration.y * tick.delta;

                // // Normalize to prevent high speed diagonals
                // const length = Math.sqrt(
                //     component.state.velocity.x * component.state.velocity.x 
                //     + component.state.velocity.y * component.state.velocity.y
                // );
                // if (length === 0) {
                //     component.state.velocity.x = 0;
                //     component.state.velocity.x = 0;
                // } else {
                //     var invScalar = 1 / length;
                //     component.state.velocity.x *= invScalar;
                //     component.state.velocity.x *= invScalar;
                // }

                // component.state.velocity.x *= PhysicsSystem.friction;
                // component.state.velocity.y *= PhysicsSystem.friction;

                component.state.position.x += component.state.velocity.x * deltaTime;
                component.state.position.y += component.state.velocity.y * deltaTime;

                engine.updateComponent(component);
            });
        });
    }
}

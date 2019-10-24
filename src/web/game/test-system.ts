import { System } from './system';
import { Events } from './engine/events';
import { Engine } from './engine/engine';

export class TestSystem implements System {

    private events: Events;

    constructor(events: Events) {
        console.log('Created TestSystem');
        this.events = events;
    }

    onAttach(engine: Engine) { }
    
    update(engine: Engine, deltaTime: number) {

    }
}

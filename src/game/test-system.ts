import { System } from './system';
import { Events } from './events';
import { Engine } from './engine';

export class TestSystem implements System {

    private events: Events;

    constructor(events: Events) {
        console.log('Created TestSystem');
        this.events = events;
    }

    onAttach(engine: Engine) {  }
}

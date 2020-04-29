import { System } from '../core/engine/system';
import { Events } from '../core/engine/events';
import { Engine } from '../core/engine/engine';

export class TestSystem implements System {
    private events: Events;

    constructor(events: Events) {
        console.log('Created TestSystem');
        this.events = events;
    }

    onAttach(engine: Engine) {}

    update(engine: Engine, deltaTime: number) {}
}

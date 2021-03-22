import { System } from '../core/system';
import { Events } from '../core/events';
import { GameEngine } from './game_engine';

export class TestSystem implements System {
    private events: Events;

    constructor(events: Events) {
        console.log('Created TestSystem');
        this.events = events;
    }

    onAttach(engine: GameEngine) {}

    update(engine: GameEngine, deltaTime: number) {}
}

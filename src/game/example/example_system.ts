import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { System } from '../../core/system';

import { Example_COMPONENT } from './example';

export class ExampleSystem implements System {
    constructor() {}

    onAttach(engine: GameEngine) {}

    beforeUpdate(engine: GameEngine): void {}

    update(engine: GameEngine) {
        for (const c of engine.getComponentsByType(Example_COMPONENT)) {
        }
    }

    afterUpdate(engine: GameEngine): void {}
}

import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { System } from '../../core/system';

import { SHOOTER_COMPONENT } from './shoot';

export class ShooterSystem implements System {
    constructor() {}

    onAttach(engine: GameEngine) {}

    beforeUpdate(engine: GameEngine): void {}

    update(engine: GameEngine) {
        for (const c of engine.getComponentsByType(SHOOTER_COMPONENT)) {
        }
    }

    afterUpdate(engine: GameEngine): void {}
}

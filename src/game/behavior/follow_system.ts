import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { System } from '../../core/system';

import { FOLLOW_COMPONENT } from './follow';
import { distance } from '../../core/point';
import { createPoint } from '../../core/component/position';

export class FollowSystem implements System {
    constructor() {}

    onAttach(engine: GameEngine) {}

    beforeUpdate(engine: GameEngine): void {}

    update(engine: GameEngine) {
        for (const c of engine.getComponentsByType(FOLLOW_COMPONENT)) {
            const p = engine.getComponent(c.gameObjectID, POSITION_COMPONENT);

            if (!p) continue;

            const SPEED = 1.65;

            const target = c.data.path[0];
            if (!target) {
                p.data.velocity = createPoint();
                engine.updateComponent(p);
                continue;
            }

            const position = p.data.position;

            const d = distance(position, target);
            if (d < SPEED) {
                c.data.path.shift();
                engine.updateComponent(c);
                continue;
            }

            // subtract (= difference vector)
            var dx = target.x - position.x;
            var dy = target.y - position.y;

            // normalize (= direction vector)
            // (a direction vector has a length of 1)
            var length = Math.sqrt(dx * dx + dy * dy);
            if (length) {
                dx /= length;
                dy /= length;
            }

            // move
            // delta is the elapsed time in seconds
            // SPEED is the speed in units per second (UPS)
            p.data.velocity.x = dx * SPEED;
            p.data.velocity.y = dy * SPEED;

            engine.updateComponent(p);
        }
    }

    afterUpdate(engine: GameEngine): void {}
}

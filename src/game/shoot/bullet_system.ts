import { GameEngine } from '../game_engine';
import { System } from '../../core/system';
import { POSITION_COMPONENT } from '../../core/component/position';
import { isDown, isLeft, isRight, isUp } from '../direction/direction';
import { BULLET_COMPONENT } from './bullet';

export class BulletSystem implements System {
    onAttach(engine: GameEngine) {}

    beforeUpdate(engine: GameEngine): void {}

    update(engine: GameEngine) {
        for (const c of engine.getComponentsByType(BULLET_COMPONENT)) {
            const position = engine.getComponent(
                c.gameObjectID,
                POSITION_COMPONENT
            );
            if (!position) continue;

            const d = c.data.direction;
            if (d.x == 0 || d.y == 0) {
                if (isUp(d)) {
                    position.data.velocity.y = -1;
                }

                if (isRight(d)) {
                    position.data.velocity.x = 1;
                }

                if (isDown(d)) {
                    position.data.velocity.y = 1;
                }

                if (isLeft(d)) {
                    position.data.velocity.x = -1;
                }
            }
            engine.updateComponent(position);
        }
    }

    afterUpdate(engine: GameEngine): void {}
}

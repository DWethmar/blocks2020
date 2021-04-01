import { GameEngine } from '../game_engine';
import { System } from '../../core/system';

import { SHOOTER_COMPONENT } from './shoot';
import { KeyInput } from '../input/key_input';
import { createBulletPrefab, createFromPrefab } from '../prefab';
import {
    createPoint2D,
    createPoint3D,
    POSITION_COMPONENT,
} from '../../core/component/position';
import {
    DIRECTION_COMPONENT,
    isDown,
    isLeft,
    isRight,
    isUp,
} from '../direction/direction';

export class ShooterSystem implements System {
    private keyInput: KeyInput;

    constructor(keyInput: KeyInput) {
        this.keyInput = keyInput;
    }

    onAttach(engine: GameEngine) { }

    beforeUpdate(engine: GameEngine): void { }

    update(engine: GameEngine) {
        for (const c of engine.getComponentsByType(SHOOTER_COMPONENT)) {
            const shoot = this.keyInput.isKeyPressed('spacebar');
            const position = engine.getComponent(
                c.gameObjectID,
                POSITION_COMPONENT
            );
            if (!position) continue;

            const direction = engine.getComponent(
                c.gameObjectID,
                DIRECTION_COMPONENT
            );
            if (!direction) continue;

            if (shoot) {
                const now = Date.now();
                if (now > c.data.last + c.data.coolDownMS) {
                    c.data.last = now;
                } else {
                    continue;
                }

                const shooterDirection = direction.data.direction;
                const bulletPos = createPoint2D(
                    position.data.position.x,
                    position.data.position.y
                );

                if (isUp(shooterDirection)) {
                    bulletPos.y -= 24;
                }

                if (isRight(shooterDirection)) {
                    bulletPos.x += 24;
                }

                if (isDown(shooterDirection)) {
                    bulletPos.y += 24;
                }

                if (isLeft(shooterDirection)) {
                    bulletPos.x -= 24;
                }

                const bulletPrefab = createBulletPrefab(
                    createPoint3D(bulletPos.x, bulletPos.y),
                    Object.assign({}, shooterDirection)
                );
                createFromPrefab(engine)(bulletPrefab);
            }

            engine.updateComponent(c);
        }
    }

    afterUpdate(engine: GameEngine): void { }
}

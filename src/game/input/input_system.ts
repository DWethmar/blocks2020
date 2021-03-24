import { KeyInput } from './key_input';
import { System } from '../../core/system';
import { GameEngine, POSITION_COMPONENT } from '../game_engine';
import { MOVEMENT_CONTROLS_COMPONENT } from './movement_controls';

export class InputSystem implements System {
    private keyInput: KeyInput;

    constructor(keyInput: KeyInput) {
        this.keyInput = keyInput;
    }

    onAttach(engine: GameEngine) {}

    update(engine: GameEngine, deltaTime: number) {
        for (const c of engine.getComponentsByType(
            MOVEMENT_CONTROLS_COMPONENT
        )) {
            const p = engine.getComponent(c.gameObjectID, POSITION_COMPONENT);

            if (!p) {
                return;
            }

            const maxSpeed = c.data.maxSpeed;
            const speed = c.data.speed;

            const keyUp = this.keyInput.isKeyPressed('w');
            const keyDown = this.keyInput.isKeyPressed('s');
            const keyLeft = this.keyInput.isKeyPressed('a');
            const keyRight = this.keyInput.isKeyPressed('d');

            if (keyUp && !keyDown) {
                if (p.data.velocity.y - speed < -maxSpeed) {
                    p.data.velocity.y = -maxSpeed;
                } else {
                    p.data.velocity.y -= speed;
                }
            } else {
                if (p.data.velocity.y < 0) {
                    p.data.velocity.y += speed;
                }
            }

            if (keyDown && !keyUp) {
                if (p.data.velocity.y + speed > maxSpeed) {
                    p.data.velocity.y = maxSpeed;
                } else {
                    p.data.velocity.y += speed;
                }
            } else {
                if (p.data.velocity.y > 0) {
                    p.data.velocity.y -= speed;
                }
            }

            if (keyLeft && !keyRight) {
                if (p.data.velocity.x - speed < -maxSpeed) {
                    p.data.velocity.x = -maxSpeed;
                } else {
                    p.data.velocity.x -= speed;
                }
            } else {
                if (p.data.velocity.x < 0) {
                    p.data.velocity.x += speed;
                }
            }

            if (keyRight && !keyLeft) {
                if (p.data.velocity.x + speed > maxSpeed) {
                    p.data.velocity.x = maxSpeed;
                } else {
                    p.data.velocity.x += speed;
                }
            } else {
                if (p.data.velocity.x > 0) {
                    p.data.velocity.x -= speed;
                }
            }

            p.data.velocity.y = Math.round(p.data.velocity.y * 1000) / 1000;
            p.data.velocity.x = Math.round(p.data.velocity.x * 1000) / 1000;

            engine.updateComponent(c);
        }
    }
}

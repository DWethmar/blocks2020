import * as PIXI from 'pixi.js';
import { Engine } from '../core/engine';
import { Events } from '../core/events';
import { RenderSystem } from './render/render_system';
import { TestSystem } from './test-system';
import { InputSystem } from './input/input_system';
import { CollisionSystem } from './collision/collision_system';
import { KeyInput } from './input/key_input';
import { GameEngine } from './game_engine';
import { Dimensions } from './dimensions';

export class Game {
    public engine: GameEngine;
    public events: Events;

    private keyInput: KeyInput;

    constructor(container: HTMLElement) {
        const sceneSize: Dimensions = {
            width: 400,
            height: 400,
        };

        const app = new PIXI.Application({
            width: 400,
            height: 400,
        });

        container.appendChild(app.view);

        this.events = new Events();
        this.engine = new Engine();
        this.keyInput = new KeyInput();

        this.engine.addSystem(new TestSystem(this.events, app.stage));
        this.engine.addSystem(new RenderSystem(app.stage));
        this.engine.addSystem(new InputSystem(this.keyInput));
        this.engine.addSystem(
            new CollisionSystem(this.events, sceneSize, app.stage)
        );

        app.ticker.add((delta: number) => {
            app.stage.sortChildren();
            this.engine.update(delta);
            this.keyInput.update();
        });
    }
}

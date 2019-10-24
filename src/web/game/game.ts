import * as PIXI from 'pixi.js'
import { Engine } from './engine/engine';
import { Events } from './engine/events';
import { RenderSystem } from './render/render-system';
import { TestSystem } from './test-system';
import { InputSystem } from './input/input-system';
import { PhysicsSystem } from './physics/physics-system';
import { KeyInput } from './input/key-input';

export class Game {
    
    public engine: Engine;
    public events: Events;
    
    private keyInput: KeyInput;

    constructor(container: HTMLElement) {
        const app = new PIXI.Application({
            width: 200,
            height: 200,
        });
        container.appendChild(app.view);

        this.events = new Events();
        this.engine = new Engine();
        this.keyInput = new KeyInput();

        this.engine.addSystem(new TestSystem(this.events));
        this.engine.addSystem(new RenderSystem(app.stage));
        this.engine.addSystem(new InputSystem(this.keyInput));
        this.engine.addSystem(new PhysicsSystem(this.events));

        app.ticker.add((delta: number) => {
            app.stage.sortChildren();
            this.engine.update(delta);
            this.keyInput.update();
        });
    }
}

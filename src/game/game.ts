import * as PIXI from 'pixi.js'
import { Engine } from './engine';
import { Events } from './events';
import { RenderSystem } from './render-system';
import { TestSystem } from './test-system';
import { InputSystem } from './input-system';
import { PhysicsSystem } from './physics-system';

export class Game {
    
    public engine: Engine;
    public events: Events;

    constructor(container: HTMLElement) {
        const app = new PIXI.Application();
        container.appendChild(app.view);

        this.events = new Events();
        this.engine = new Engine();

        this.engine.addSystem(new TestSystem(this.events));
        this.engine.addSystem(new RenderSystem(app.stage));
        this.engine.addSystem(new InputSystem());
        this.engine.addSystem(new PhysicsSystem(this.events));

        app.ticker.add((delta: number) => {
            this.engine.update(delta);
        });
    }
}
